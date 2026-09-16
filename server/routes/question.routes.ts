import express, { Request, Response } from 'express';
import Question from '../models/Question.js';
import QuestionVersion from '../models/QuestionVersion.js';
import AuditLog from '../models/AuditLog.js';
import { compareQuestions } from '../utils/similarity.js';

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
    const { question, options, topic, correctAnswer, excludeId } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, message: 'Question text is required.' });
    }

    // Query candidate questions from database
    const query: any = {};
    if (excludeId) {
      query.id = { $ne: excludeId };
    }

    const candidateQuestions = await Question.find(query).limit(500);

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

// GET /api/questions - List with filters & pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      exam,
      classLevel,
      subject,
      chapter,
      topic,
      difficulty,
      status,
      search,
      page = '1',
      limit = '50'
    } = req.query;

    const filter: any = {};
    if (exam && exam !== 'All') filter.exam = exam;
    if (classLevel && classLevel !== 'All') filter.class = classLevel;
    if (subject && subject !== 'All') filter.subject = subject;
    if (chapter && chapter !== 'All') filter.chapter = chapter;
    if (topic && topic !== 'All') filter.topic = topic;
    if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;
    if (status && status !== 'All') filter.status = status;

    if (search && typeof search === 'string') {
      const qRegex = new RegExp(escapeRegex(search), 'i');
      filter.$or = [
        { question: qRegex },
        { chapter: qRegex },
        { topic: qRegex },
        { concept: qRegex }
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 200);

    const questions = await Question.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(filter);

    res.json({
      success: true,
      questions,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
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
    const { chapter } = req.query;
    const filter: any = {};
    if (chapter && chapter !== 'All') filter.chapter = chapter;

    const topics = await Question.distinct('topic', filter);
    res.json({ success: true, topics });
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

// GET /api/questions/:id - Single question
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, question });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/questions - Create new question (Admin)
router.post('/', async (req: Request, res: Response) => {
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
router.patch('/bulk-edit', async (req: Request, res: Response) => {
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
router.patch('/:id', async (req: Request, res: Response) => {
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
router.post('/bulk-import', async (req: Request, res: Response) => {
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
router.delete('/:id', async (req: Request, res: Response) => {
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
