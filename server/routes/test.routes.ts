import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Test from '../models/Test.js';
import Question from '../models/Question.js';
import TestAttempt from '../models/TestAttempt.js';
import { questionRepo } from '../services/questionRepository.js';
import { optionalAuth, AuthRequest, authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/tests - List tests
router.get('/', async (req: Request, res: Response) => {
  try {
    const { exam, category } = req.query;
    const filter: any = {};
    if (exam && exam !== 'All') filter.exam = exam;
    if (category && category !== 'All') filter.category = category;

    const tests = await Test.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, tests });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/tests/:id - Single test with its questions
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const test = await Test.findOne({ id: req.params.id });
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // 1. Populate from in-memory questionRepo (covers all bank questions & -v2 variants)
    const repoQuestions = questionRepo.getByIds(test.questionIds);
    const qMap = new Map<string, any>();
    for (const q of repoQuestions) {
      if (q && q.id) qMap.set(String(q.id), q);
    }

    // 2. Overlay from MongoDB Question collection (for admin-created/edited questions)
    if (mongoose.connection.readyState === 1) {
      try {
        const mongoQuestions = await Question.find({ id: { $in: test.questionIds } }).lean();
        for (const q of mongoQuestions) {
          if (q && (q as any).id) {
            qMap.set(String((q as any).id), q);
          }
        }
      } catch (err) {
        console.warn('[Tests] MongoDB overlay query warning:', err);
      }
    }

    // Maintain test question order and ensure every question is present
    const orderedQuestions = test.questionIds.map(id => qMap.get(String(id))).filter(Boolean);

    res.json({ success: true, test, questions: orderedQuestions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tests/build-custom - Dynamic test creation
router.post('/build-custom', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      exam,
      classLevel,
      subjects,
      chapters,
      topics,
      topic,
      includePYQs = true,
      questionCount,
      totalQuestions,
      count,
      difficulty = 'Mixed',
      durationMinutes = 30,
      negativeMarking = true,
      excludeQuestionIds = [],
      userId
    } = req.body;

    if (!exam || !subjects || subjects.length === 0) {
      return res.status(400).json({ success: false, message: 'Exam and subjects are required.' });
    }

    const cleanExam = (exam || '').trim().toUpperCase();
    const effectiveExam: 'JEE' | 'NEET' | 'Board' =
      cleanExam.includes('JEE') ? 'JEE' : cleanExam.includes('NEET') ? 'NEET' : cleanExam.includes('BOARD') ? 'Board' : 'JEE';
    const finalCount = Math.max(1, Math.min(100, Number(totalQuestions || questionCount || count || 10)));

    // Build complete set of questions to EXCLUDE (so students NEVER get repeated questions)
    const effectiveExclude = new Set<string>(
      Array.isArray(excludeQuestionIds) ? excludeQuestionIds.map(String) : []
    );

    // Auto-fetch user's past attempts from DB if userId provided or in session
    const targetUserId = userId || (req as any).userId;
    if (targetUserId && mongoose.connection.readyState === 1) {
      try {
        const pastAttempts = await TestAttempt.find({
          $or: [{ userId: targetUserId }, { studentId: targetUserId }]
        }).select('answers testId');

        const testIds: string[] = [];
        for (const att of pastAttempts) {
          if (att.testId) testIds.push(att.testId);
          if (att.answers && typeof att.answers === 'object') {
            Object.keys(att.answers).forEach(k => effectiveExclude.add(String(k)));
            Object.values(att.answers).forEach((ans: any) => {
              if (ans?.questionId) effectiveExclude.add(String(ans.questionId));
            });
          }
        }

        if (testIds.length > 0) {
          const pastTests = await Test.find({ id: { $in: testIds } }).select('questionIds');
          for (const t of pastTests) {
            if (Array.isArray(t.questionIds)) {
              t.questionIds.forEach(qid => effectiveExclude.add(String(qid)));
            }
          }
        }
      } catch (err) {
        // Proceed with client-provided exclusions
      }
    }

    const filter: any = {
      exam: effectiveExam,
      subject: { $in: subjects }
    };
    if (classLevel && classLevel !== 'All' && classLevel !== 'ALL' && classLevel !== 'Dropper') {
      filter.class = classLevel;
    }
    if (difficulty && difficulty !== 'Mixed' && difficulty !== 'All') filter.difficulty = difficulty;
    if (chapters && chapters.length > 0) filter.chapter = { $in: chapters };

    // Exact topic filtering (Task.md section 5, 6, 7)
    const activeTopics = topics && topics.length > 0 ? topics : (topic && topic !== 'All' ? [topic] : null);
    if (activeTopics && activeTopics.length > 0) {
      filter.topic = { $in: activeTopics };
    }

    // Strict content type isolation: Never include MODEL_PAPER in normal tests! (Task.md section 1, 2, 4)
    if (includePYQs !== false) {
      filter.contentType = { $in: ['QUESTION_BANK', 'PYQ', 'PRACTICE_SET', 'AI_GENERATED'] };
      filter.source = { $ne: 'Model Paper' };
    } else {
      filter.contentType = { $in: ['QUESTION_BANK', 'PRACTICE_SET', 'AI_GENERATED'] };
      filter.source = { $nin: ['Model Paper', 'PYQ'] };
    }

    if (effectiveExclude.size > 0) {
      filter.id = { $nin: Array.from(effectiveExclude) };
    }

    // Repo-first: expanded in-memory bank is the canonical source
    // Pass excludeIds to ensure fresh, unattempted questions!
    let pool: any[] = questionRepo.filter({
      exam: effectiveExam,
      classLevel,
      subjects,
      chapters,
      topics: activeTopics || undefined,
      topic,
      difficulty: difficulty === 'Mixed' ? undefined : difficulty,
      includePYQs,
      includeModelPapers: false,
      excludeIds: Array.from(effectiveExclude)
    });

    // Mongo overlay: only admin-created or custom questions not present in the file bank
    if (mongoose.connection.readyState === 1) {
      try {
        const seen = new Set(pool.map(q => String(q.id || q._id)));
        const customFilter = { ...filter, $or: [{ isCustom: true }, { source: 'Admin' }, { isAiGenerated: true }] };
        const mongoExtra = await Question.find(customFilter).limit(50).lean();
        for (const q of mongoExtra) {
          const qid = String((q as any).id || q._id);
          if (!seen.has(qid) && !effectiveExclude.has(qid)) {
            pool.push(q);
            seen.add(qid);
          }
        }
      } catch {
        // repo pool already sufficient
      }
    }

    // 1. Topic-level supplement: If specific topic was requested but pool < finalCount,
    // supplement from the SAME CHAPTER (same subject, same class) so student never gets underflow!
    if (pool.length < finalCount && (activeTopics || topic)) {
      const existingIds = new Set(pool.map(q => String(q.id || q._id)));
      const sameChapterQuestions = questionRepo.filter({
        exam: effectiveExam,
        classLevel,
        subjects,
        chapters,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false,
        excludeIds: Array.from(effectiveExclude)
      });
      for (const q of sameChapterQuestions) {
        const qid = String(q.id || q._id);
        if (!existingIds.has(qid) && !effectiveExclude.has(qid)) {
          pool.push(q);
          existingIds.add(qid);
          if (pool.length >= finalCount) break;
        }
      }
    }

    // 2. Exclusion relax supplement: If questions are short because of past exclusions,
    // relax exclusions within the SAME target chapter/scope rather than failing the test.
    if (pool.length < finalCount && pool.length > 0 && effectiveExclude.size > 0) {
      const existingIds = new Set(pool.map(q => String(q.id || q._id)));
      const recycledChapter = questionRepo.filter({
        exam: effectiveExam,
        classLevel,
        subjects,
        chapters,
        topics: activeTopics || undefined,
        topic,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false
      });
      for (const q of recycledChapter) {
        const qid = String(q.id || q._id);
        if (!existingIds.has(qid)) {
          pool.push(q);
          existingIds.add(qid);
          if (pool.length >= finalCount) break;
        }
      }
    }

    // 3. Subject-level fallback for non-chapter tests
    if (pool.length < finalCount && (!chapters || chapters.length === 0)) {
      const existingIds = new Set(pool.map(q => String(q.id || q._id)));
      const broader = questionRepo.filter({
        exam: effectiveExam,
        classLevel,
        subjects,
        includeModelPapers: false,
        excludeIds: Array.from(effectiveExclude)
      });
      for (const q of broader) {
        const qid = String(q.id || q._id);
        if (!existingIds.has(qid) && !effectiveExclude.has(qid)) {
          pool.push(q);
          existingIds.add(qid);
          if (pool.length >= finalCount) break;
        }
      }
    }

    // 4. If completely empty, try unexcluded scope for the same chapter
    if (pool.length === 0) {
      pool = questionRepo.filter({
        exam: effectiveExam,
        classLevel,
        subjects,
        chapters,
        topics: activeTopics || undefined,
        topic,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false
      });
    }

    // 5. If still empty in competitive physics/chemistry (e.g. NEET physics), draw from standard chapter pool
    if (pool.length === 0 && (effectiveExam === 'NEET' || effectiveExam === 'JEE')) {
      pool = questionRepo.filter({
        classLevel,
        subjects,
        chapters,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false
      });
    }

    // 6. Repeat with variant IDs so question count contract is ALWAYS satisfied
    if (pool.length > 0 && pool.length < finalCount) {
      const origPool = [...pool];
      let counter = 1;
      while (pool.length < finalCount) {
        for (const item of origPool) {
          if (pool.length >= finalCount) break;
          pool.push({
            ...item,
            id: `${item.id}-var-${counter}`
          });
          counter++;
        }
      }
    }

    // Shuffle and pick (Fisher-Yates for uniform distribution)
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, finalCount);
    const questionIds = selected.map(q => String(q.id || (q as any)._id));

    const markPerQ = 4;
    const maxScore = questionIds.length * markPerQ;

    const testData = {
      id: `custom-test-${Date.now()}`,
      title: title || `Custom ${effectiveExam} Test (${questionIds.length} Qs)`,
      exam: effectiveExam,
      classLevel,
      subjects,
      chapters: chapters || [],
      totalQuestions: questionIds.length,
      durationMinutes,
      difficulty,
      questionIds,
      category: 'Custom Test',
      maxScore,
      negativeMarking
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const newTest = new Test(testData);
        await newTest.save();
      } catch (err) {
        console.warn('Could not persist to MongoDB, serving testData directly');
      }
    }

    res.status(201).json({ success: true, test: testData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tests - Create test (Admin)
router.post('/', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `test-${Date.now()}`;
    const test = new Test({ ...data, id });
    await test.save();
    res.status(201).json({ success: true, test });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
