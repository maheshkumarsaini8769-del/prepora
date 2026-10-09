import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question.js';
import QuestionVersion from '../models/QuestionVersion.js';
import AuditLog from '../models/AuditLog.js';
import { compareQuestions } from '../utils/similarity.js';
import { questionRepo, normalizeCanonicalChapter } from '../services/questionRepository.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Field whitelist for question updates — prevents mass assignment
const QUESTION_UPDATE_FIELDS = ['question','questionHi','options','optionsHi','correctAnswer','explanation','explanationHi','concept','difficulty','subject','chapter','topic','status','exam','class'];

function pickFields(obj: Record<string, any>, allowed: string[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of allowed) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
}

// Escape regex special characters to prevent ReDoS
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to log admin actions
async function recordAudit(
  adminEmail: string,
  action: string,
  entityId: string,
  beforeVal: any,
  afterVal: any,
  metadata: any = {}
) {
  try {
    const log = new AuditLog({
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      adminId: 'admin',
      adminEmail: adminEmail || 'admin@prepora.internal',
      adminRole: 'admin',
      action,
      entityType: 'Question',
      entityId,
      beforeValue: beforeVal,
      afterValue: afterVal,
      metadata
    });
    await log.save();
  } catch (err) {
    console.error('AuditLog error:', err);
  }
}

// POST /api/questions/check-duplicate - Check if question is a duplicate
router.post('/check-duplicate', async (req: Request, res: Response) => {
  try {
    const { question, options, topic, correctAnswer, excludeId, subject, chapter } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, message: 'Question text is required.' });
    }

    // Query candidate questions from database
    const query: any = {};
    if (excludeId) {
      query.id = { $ne: excludeId };
    }
    if (subject && subject !== 'All') {
      query.subject = subject;
    }
    if (chapter && chapter !== 'All') {
      query.chapter = chapter;
    }

    let candidateQuestions = await Question.find(query).limit(150);
    if (candidateQuestions.length < 20 && (subject || chapter)) {
      candidateQuestions = await Question.find(excludeId ? { id: { $ne: excludeId } } : {}).limit(150);
    }

    let highestMatch: any = {
      isDuplicate: false,
      similarityScore: 0,
      matchType: 'none'
    };

    for (const cand of candidateQuestions) {
      const match = compareQuestions(
        { question, options, topic, correctAnswer },
        {
          id: cand.id,
          question: cand.question,
          options: cand.options,
          topic: cand.topic,
          source: cand.source,
          correctAnswer: cand.correctAnswer
        }
      );

      if (match.similarityScore > highestMatch.similarityScore) {
        highestMatch = match;
        if (match.matchType === 'exact') break;
      }
    }

    res.json({
      success: true,
      result: highestMatch
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/questions/inventory-stats - Real database inventory metrics (task3.md Phase 2, 3, 26)
router.get('/inventory-stats', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const total = await Question.countDocuments();
      if (total > 0) {
        const difficulties = await Question.aggregate([{ $group: { _id: '$difficulty', count: { $sum: 1 } } }]);
        const exams = await Question.aggregate([{ $group: { _id: '$exam', count: { $sum: 1 } } }]);
        const subjects = await Question.aggregate([{ $group: { _id: '$subject', count: { $sum: 1 } } }]);
        const statuses = await Question.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
        const contentTypes = await Question.aggregate([{ $group: { _id: '$contentType', count: { $sum: 1 } } }]);

        const diffMap: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
        difficulties.forEach(d => { if (d._id) diffMap[d._id] = d.count; });

        const statusMap: Record<string, number> = { Approved: 0, Pending: 0, Draft: 0, Rejected: 0 };
        statuses.forEach(s => { if (s._id) statusMap[s._id] = s.count; });

        return res.json({
          success: true,
          total,
          difficulties: diffMap,
          statuses: statusMap,
          exams: exams.reduce((acc, curr) => { if (curr._id) acc[curr._id] = curr.count; return acc; }, {} as Record<string, number>),
          subjects: subjects.reduce((acc, curr) => { if (curr._id) acc[curr._id] = curr.count; return acc; }, {} as Record<string, number>),
          contentTypes: contentTypes.reduce((acc, curr) => { if (curr._id) acc[curr._id] = curr.count; return acc; }, {} as Record<string, number>)
        });
      }
    }

    // Repository fallback (51,665 real questions)
    const stats = questionRepo.getInventoryStats();
    res.json({ success: true, ...stats });
  } catch (error: any) {
    const stats = questionRepo.getInventoryStats();
    res.json({ success: true, ...stats });
  }
});

// GET /api/questions/taxonomy - Chapter and topic hierarchy with live question counts
router.get('/taxonomy', async (req: Request, res: Response) => {
  try {
    const { subject, classLevel } = req.query;
    const taxonomy = questionRepo.getTaxonomy(subject as string, classLevel as string);
    res.json({ success: true, ...taxonomy });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

function buildQuestionFilter(query: any): any {
  const {
    exam,
    classLevel,
    subject,
    chapter,
    topic,
    difficulty,
    status,
    contentType,
    includePYQs,
    includeModelPapers,
    search
  } = query;

  const filter: any = {};
  if (exam && exam !== 'All') {
    if (exam === 'JEE_MAIN' || exam === 'JEE_ADVANCED' || exam === 'JEE') {
      filter.exam = { $in: ['JEE', 'JEE_MAIN', 'JEE_ADVANCED'] };
    } else if (exam === 'CBSE' || exam === 'RBSE' || exam === 'Board') {
      filter.exam = { $in: ['Board', 'CBSE', 'RBSE'] };
    } else {
      filter.exam = exam;
    }
  }
  if (classLevel && classLevel !== 'All' && classLevel !== 'ALL' && classLevel !== 'Dropper') {
    filter.class = classLevel;
  }
  if (subject && subject !== 'All') filter.subject = subject;
  if (chapter && chapter !== 'All' && chapter !== 'ALL') {
    const rawCh = String(chapter).trim();
    const normCh = normalizeCanonicalChapter(rawCh, subject ? String(subject) : undefined);
    const escCh = escapeRegex(rawCh);
    const escNorm = escapeRegex(normCh);
    if (!normCh || rawCh.toLowerCase() === normCh.toLowerCase()) {
      filter.chapter = new RegExp(`^${escCh}$`, 'i');
    } else {
      filter.chapter = new RegExp(`(^${escCh}$)|(^${escNorm}$)`, 'i');
    }
  }
  if (topic && topic !== 'All' && topic !== 'ALL') {
    const cleanTopicStr = String(topic).trim();
    const escaped = escapeRegex(cleanTopicStr);
    const words = cleanTopicStr.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 3);
    if (words.length >= 2) {
      const wordPattern = words.slice(0, 3).map(escapeRegex).join('.*');
      filter.topic = new RegExp(`(^${escaped}$)|(${wordPattern})`, 'i');
    } else {
      filter.topic = new RegExp(`^${escaped}$`, 'i');
    }
  }
  if (difficulty && difficulty !== 'All' && difficulty !== 'Mixed') {
    filter.difficulty = new RegExp(`^${escapeRegex(String(difficulty).trim())}$`, 'i');
  }
  if (status && status !== 'All') filter.status = status;
  if (contentType && contentType !== 'All') filter.contentType = contentType;

  if (includeModelPapers === 'false') {
    filter.source = { $ne: 'Model Paper' };
  }
  if (includePYQs === 'false') {
    filter.source = { $nin: ['Model Paper', 'PYQ', 'Official PYQ'] };
  }

  if (search && typeof search === 'string' && search.trim()) {
    const qRegex = new RegExp(escapeRegex(search.trim()), 'i');
    filter.$or = [
      { question: qRegex },
      { chapter: qRegex },
      { topic: qRegex },
      { concept: qRegex }
    ];
  }

  if (query.excludeIds) {
    const arr = Array.isArray(query.excludeIds)
      ? query.excludeIds
      : typeof query.excludeIds === 'string'
      ? query.excludeIds.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    if (arr.length > 0) {
      filter.id = { $nin: arr };
    }
  }

  return filter;
}

// GET /api/questions/count - Fast count for arbitrary filter combinations
router.get('/count', async (req: Request, res: Response) => {
  try {
    const queryOptions: any = { ...req.query };
    if (typeof queryOptions.excludeIds === 'string') {
      queryOptions.excludeIds = queryOptions.excludeIds.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    // Repo-first: the expanded in-memory bank (~1 lakh) is the canonical source,
    // so counts stay correct without inflating MongoDB storage.
    const repoCount = questionRepo.count(queryOptions);
    if (repoCount > 0) {
      return res.json({ success: true, count: repoCount, filter: req.query });
    }
    if (mongoose.connection.readyState === 1) {
      const filter = buildQuestionFilter(queryOptions);
      const count = await Question.countDocuments(filter);
      if (count > 0) {
        return res.json({ success: true, count, filter });
      }
    }
    res.json({ success: true, count: 0, filter: req.query });
  } catch (error: any) {
    const queryOptions: any = { ...req.query };
    if (typeof queryOptions.excludeIds === 'string') {
      queryOptions.excludeIds = queryOptions.excludeIds.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    const count = questionRepo.count(queryOptions);
    res.json({ success: true, count, filter: req.query });
  }
});

// GET /api/questions - List with filters & pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const pageNum = parseInt(req.query.page as string, 10) || 1;
    const limitNum = Math.min(parseInt(req.query.limit as string, 10) || 50, 500);

    const queryOptions: any = { ...req.query };
    if (typeof queryOptions.excludeIds === 'string') {
      queryOptions.excludeIds = queryOptions.excludeIds.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    // Repo-first: expanded in-memory bank (~1 lakh) is the canonical source
    const repoPool = questionRepo.filter(queryOptions);
    if (repoPool.length > 0) {
      const sorted = [...repoPool].sort((a, b) =>
        String(b.createdAt || '').localeCompare(String(a.createdAt || ''))
      );
      const total = sorted.length;
      const startIndex = (pageNum - 1) * limitNum;
      return res.json({
        success: true,
        questions: sorted.slice(startIndex, startIndex + limitNum),
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum)
      });
    }

    if (mongoose.connection.readyState === 1) {
      const filter = buildQuestionFilter(req.query);
      const total = await Question.countDocuments(filter);
      if (total > 0) {
        const questions = await Question.find(filter)
          .skip((pageNum - 1) * limitNum)
          .limit(limitNum)
          .sort({ createdAt: -1 });

        return res.json({
          success: true,
          questions,
          total,
          page: pageNum,
          totalPages: Math.ceil(total / limitNum)
        });
      }
    }

    res.json({
      success: true,
      questions: [],
      total: 0,
      page: pageNum,
      totalPages: 0
    });
  } catch (error: any) {
    const pageNum = parseInt(req.query.page as string, 10) || 1;
    const limitNum = Math.min(parseInt(req.query.limit as string, 10) || 50, 500);
    const pool = questionRepo.filter(req.query as any);
    const total = pool.length;
    const startIndex = (pageNum - 1) * limitNum;
    const questions = pool.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      questions,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  }
});

// GET /api/questions/meta/chapters - Unique chapters list
router.get('/meta/chapters', async (req: Request, res: Response) => {
  try {
    const { subject, classLevel } = req.query;
    const filter: any = {};
    if (subject && subject !== 'All') filter.subject = subject;
    if (classLevel && classLevel !== 'All') filter.class = classLevel;

    const chapters = await Question.distinct('chapter', filter);
    res.json({ success: true, chapters });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/questions/meta/topics - Unique topics list
router.get('/meta/topics', async (req: Request, res: Response) => {
  try {
    const { chapter, exam, subject } = req.query;
    if (chapter && chapter !== 'All') {
      const cleanTopics = questionRepo.getTopics(String(chapter), exam ? String(exam) : undefined, subject ? String(subject) : undefined);
      return res.json({ success: true, topics: cleanTopics });
    }

    const filter: any = {};
    const topics = await Question.distinct('topic', filter);
    const cleanTopics = topics.filter(t => t && !/High Yield Application|Core Concept Drill|Reaction & Synthesis|Mechanism & Analysis|Calculus & Geometry|Analytic Problem/i.test(t));
    res.json({ success: true, topics: cleanTopics });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/questions/:id/versions - Question change history
router.get('/:id/versions', async (req: Request, res: Response) => {
  try {
    const versions = await QuestionVersion.find({ questionId: req.params.id }).sort({ versionNumber: -1 });
    res.json({ success: true, versions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/questions/by-ids - Fetch multiple questions by IDs
router.post('/by-ids', async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Array of ids required.' });
    }

    // 1. Populate from in-memory questionRepo (all bank questions & -v2 variants)
    const repoQuestions = questionRepo.getByIds(ids);
    const qMap = new Map<string, any>();
    for (const q of repoQuestions) {
      if (q && q.id) qMap.set(String(q.id), q);
    }

    // 2. Overlay from MongoDB Question collection (for admin-created/edited/AI questions)
    if (mongoose.connection.readyState === 1) {
      try {
        const mongoQuestions = await Question.find({ id: { $in: ids } }).lean();
        for (const q of mongoQuestions) {
          if (q && (q as any).id) {
            qMap.set(String((q as any).id), q);
          }
        }
      } catch (err) {
        console.warn('[Questions] MongoDB overlay query warning:', err);
      }
    }

    const orderedQuestions = ids.map(id => qMap.get(String(id))).filter(Boolean);
    res.json({ success: true, questions: orderedQuestions });
  } catch (error: any) {
    const questions = questionRepo.getByIds(req.body?.ids || []);
    res.json({ success: true, questions });
  }
});

// GET /api/questions/:id - Single question
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const question = await Question.findOne({ id: req.params.id });
      if (question) {
        return res.json({ success: true, question });
      }
    }

    const question = questionRepo.getById(String(req.params.id));
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, question });
  } catch (error: any) {
    const question = questionRepo.getById(String(req.params.id));
    if (question) {
      return res.json({ success: true, question });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/questions - Create new question (Admin)
router.post('/', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id || `q-mongo-${Date.now()}`;
    const newQuestion = new Question({
      ...data,
      id,
      status: data.status || 'Approved'
    });
    await newQuestion.save();

    await recordAudit(
      req.body.adminEmail || 'admin@prepora.internal',
      'Create',
      id,
      null,
      newQuestion.toObject()
    );

    res.status(201).json({ success: true, question: newQuestion });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/questions/bulk-edit - Bulk edit multiple questions (MUST be before /:id route)
router.patch('/bulk-edit', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { questionIds, updates, adminEmail } = req.body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Array of questionIds required.' });
    }

    const allowedFields = ['subject', 'chapter', 'topic', 'difficulty', 'status', 'exam', 'class'];
    const safeUpdates: any = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined && updates[key] !== 'keep') {
        safeUpdates[key] = updates[key];
      }
    }

    if (Object.keys(safeUpdates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid update fields specified.' });
    }

    const result = await Question.updateMany(
      { id: { $in: questionIds } },
      { $set: safeUpdates }
    );

    await recordAudit(
      adminEmail || 'admin@prepora.internal',
      'Bulk Edit',
      `bulk-${questionIds.length}-questions`,
      { affectedIds: questionIds },
      safeUpdates,
      { modifiedCount: result.modifiedCount }
    );

    res.json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: `Successfully updated ${result.modifiedCount} questions.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/questions/:id - Update question with versioning & audit trail
router.patch('/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const existing = await Question.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    // Determine current version count
    const versionCount = await QuestionVersion.countDocuments({ questionId: existing.id });
    const nextVersion = versionCount + 1;

    // Snapshot existing state into QuestionVersion before modifying
    const versionEntry = new QuestionVersion({
      id: `qv-${existing.id}-v${nextVersion}`,
      questionId: existing.id,
      versionNumber: nextVersion,
      snapshot: {
        question: existing.question,
        questionHi: existing.questionHi,
        options: existing.options,
        optionsHi: existing.optionsHi,
        correctAnswer: existing.correctAnswer,
        explanation: existing.explanation,
        explanationHi: existing.explanationHi,
        concept: existing.concept,
        difficulty: existing.difficulty,
        subject: existing.subject,
        chapter: existing.chapter,
        topic: existing.topic
      },
      changedBy: req.body.adminEmail || 'admin@prepora.internal',
      changeReason: req.body.changeReason || 'Question content modified via Admin portal'
    });
    await versionEntry.save();

    // Now update Question document (with field whitelist to prevent mass assignment)
    const updated = await Question.findOneAndUpdate(
      { id: req.params.id },
      { $set: pickFields(req.body, QUESTION_UPDATE_FIELDS) },
      { new: true }
    );

    // Audit log
    let actionType = 'Edit';
    if (req.body.correctAnswer !== undefined && req.body.correctAnswer !== existing.correctAnswer) {
      actionType = 'Change Answer';
    } else if (req.body.explanation !== undefined && req.body.explanation !== existing.explanation) {
      actionType = 'Change Explanation';
    }

    await recordAudit(
      req.body.adminEmail || 'admin@prepora.internal',
      actionType,
      existing.id,
      existing.toObject(),
      updated!.toObject(),
      { changeReason: req.body.changeReason, previousVersion: nextVersion }
    );

    res.json({ success: true, question: updated, versionArchived: nextVersion });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/questions/bulk-import - Bulk import questions with validation
router.post('/bulk-import', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { questions, adminEmail } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'Questions array is required.' });
    }

    const validRows: any[] = [];
    const invalidRows: any[] = [];
    const duplicateRows: any[] = [];

    // Pre-fetch all questions for duplicate comparison
    const existingList = await Question.find({}).limit(500);

    questions.forEach((rawQ: any, index: number) => {
      const rowNum = index + 1;
      const errors: string[] = [];

      // Validation
      if (!rawQ.question || typeof rawQ.question !== 'string' || rawQ.question.trim().length < 5) {
        errors.push('Question text is missing or too short.');
      }
      if (!Array.isArray(rawQ.options) || rawQ.options.length < 2) {
        errors.push('Must have at least 2 options.');
      }
      if (rawQ.correctAnswer === undefined || rawQ.correctAnswer < 0 || (rawQ.options && rawQ.correctAnswer >= rawQ.options.length)) {
        errors.push('Correct answer index is invalid.');
      }
      if (!rawQ.subject) errors.push('Subject is required.');
      if (!rawQ.chapter) errors.push('Chapter is required.');

      if (errors.length > 0) {
        invalidRows.push({ rowNum, question: rawQ.question, errors });
        return;
      }

      // Check duplicates
      const dupMatch = existingList.find(ex => {
        const comp = compareQuestions(
          { question: rawQ.question, options: rawQ.options, topic: rawQ.topic },
          { id: ex.id, question: ex.question, options: ex.options, topic: ex.topic }
        );
        return comp.isDuplicate && comp.similarityScore >= 85;
      });

      if (dupMatch) {
        duplicateRows.push({
          rowNum,
          question: rawQ.question,
          matchedId: dupMatch.id,
          matchedQuestion: dupMatch.question
        });
        return; // Skip duplicate — do NOT add to validRows
      }

      validRows.push({
        id: rawQ.id || `q-imp-${Date.now()}-${index}`,
        exam: rawQ.exam || 'JEE',
        class: rawQ.class || '12',
        subject: rawQ.subject,
        chapter: rawQ.chapter,
        topic: rawQ.topic || 'General',
        difficulty: rawQ.difficulty || 'Medium',
        question: rawQ.question,
        questionHi: rawQ.questionHi || '',
        options: rawQ.options,
        optionsHi: rawQ.optionsHi || [],
        correctAnswer: Number(rawQ.correctAnswer),
        explanation: rawQ.explanation || 'Step-by-step solution provided.',
        explanationHi: rawQ.explanationHi || '',
        concept: rawQ.concept || '',
        source: rawQ.source || 'Original',
        status: rawQ.status || 'Approved'
      });
    });

    // If client requested check-only (preview)
    if (req.query.dryRun === 'true') {
      return res.json({
        success: true,
        summary: {
          totalRows: questions.length,
          validCount: validRows.length,
          invalidCount: invalidRows.length,
          duplicateCount: duplicateRows.length
        },
        invalidRows,
        duplicateRows,
        previewRows: validRows.slice(0, 10)
      });
    }

    // Insert valid questions
    if (validRows.length > 0) {
      await Question.insertMany(validRows, { ordered: false });

      await recordAudit(
        adminEmail || 'admin@prepora.internal',
        'Import',
        `import-${validRows.length}-questions`,
        null,
        { importedCount: validRows.length, duplicateCount: duplicateRows.length, invalidCount: invalidRows.length }
      );
    }

    res.json({
      success: true,
      summary: {
        totalRows: questions.length,
        importedCount: validRows.length,
        invalidCount: invalidRows.length,
        duplicateCount: duplicateRows.length
      },
      invalidRows,
      duplicateRows
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/questions/:id - Delete question (Admin)
router.delete('/:id', authenticateUser, requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await Question.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    await recordAudit(
      (req.query.adminEmail as string) || 'admin@prepora.internal',
      'Delete',
      String(req.params.id),
      deleted.toObject(),
      null
    );

    res.json({ success: true, message: 'Question deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
