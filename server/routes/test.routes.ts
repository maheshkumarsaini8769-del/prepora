import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Test from '../models/Test.js';
import Question from '../models/Question.js';
import TestAttempt from '../models/TestAttempt.js';
import { questionRepo } from '../services/questionRepository.js';

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

    // Populate question objects
    const questions = await Question.find({ id: { $in: test.questionIds } });
    
    // Maintain test question order
    const qMap = new Map(questions.map(q => [q.id, q]));
    const orderedQuestions = test.questionIds.map(id => qMap.get(id)).filter(Boolean);

    res.json({ success: true, test, questions: orderedQuestions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tests/build-custom - Dynamic test creation
router.post('/build-custom', async (req: Request, res: Response) => {
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
      questionCount = 10,
      difficulty = 'Mixed',
      durationMinutes = 30,
      negativeMarking = true,
      excludeQuestionIds = [],
      userId
    } = req.body;

    if (!exam || !subjects || subjects.length === 0) {
      return res.status(400).json({ success: false, message: 'Exam and subjects are required.' });
    }

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
      exam,
      subject: { $in: subjects }
    };
    if (classLevel && classLevel !== 'All' && exam !== 'JEE' && exam !== 'NEET') {
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

    // Repo-first: expanded in-memory bank (~1 lakh) is the canonical source
    // Pass excludeIds to ensure fresh, unattempted questions!
    let pool: any[] = questionRepo.filter({
      exam,
      subjects,
      chapters,
      topics: activeTopics || undefined,
      topic,
      difficulty: difficulty === 'Mixed' ? undefined : difficulty,
      includePYQs,
      includeModelPapers: false,
      excludeIds: Array.from(effectiveExclude)
    });

    // Mongo overlay: admin-created questions not present in the file bank
    if (mongoose.connection.readyState === 1) {
      try {
        const seen = new Set(pool.map(q => String(q.id || q._id)));
        const mongoExtra = await Question.find(filter);
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

    // Chapter/topic-specific tests must NEVER include off-chapter/off-topic questions.
    // If the bank is short, surface underflow to the UI (Continue with N / Generate more with AI).
    const hasChapterOrTopic = (chapters && chapters.length > 0) || !!(activeTopics && activeTopics.length > 0);
    if (pool.length < questionCount && hasChapterOrTopic) {
      return res.json({
        success: true,
        isUnderflow: true,
        availableCount: pool.length,
        requestedCount: questionCount,
        message: `Only ${pool.length} fresh questions available for the selected chapter/topic.`
      });
    }

    // Subject-wide tests (no chapter/topic) may pad from the broader subject pool without repeating past questions
    if (pool.length < questionCount) {
      const existingIds = new Set(pool.map(q => String(q.id || q._id)));
      const broader = questionRepo.filter({
        exam,
        subjects,
        excludeIds: Array.from(effectiveExclude)
      });
      for (const q of broader) {
        if (!existingIds.has(q.id) && !effectiveExclude.has(q.id)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= questionCount) break;
        }
      }
    }

    // If all questions in the bank were exhausted, safely recycle unexcluded pool
    if (pool.length === 0) {
      pool = questionRepo.filter({
        exam,
        subjects,
        chapters,
        topics: activeTopics || undefined,
        topic,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false
      });
    }

    // Shuffle and pick (Fisher-Yates for uniform distribution)
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, questionCount);
    const questionIds = selected.map(q => String(q.id || (q as any)._id));

    const markPerQ = 4;
    const maxScore = questionCount * markPerQ;

    const testData = {
      id: `custom-test-${Date.now()}`,
      title: title || `Custom ${exam} Test (${questionCount} Qs)`,
      exam,
      classLevel,
      subjects,
      chapters: chapters || [],
      totalQuestions: questionCount,
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
router.post('/', async (req: Request, res: Response) => {
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
