import express, { Request, Response } from 'express';
import SyllabusChapter from '../models/Syllabus.js';

const router = express.Router();

function normalizeCanonicalExam(exam: string): string {
  const norm = (exam || '').toUpperCase().trim();
  if (norm === 'JEE' || norm === 'JEE_MAIN' || norm === 'JEE MAIN') return 'JEE_MAIN';
  if (norm.includes('ADVANCED') || norm === 'JEE_ADVANCED') return 'JEE_ADVANCED';
  if (norm.includes('NEET') || norm === 'NEET_UG') return 'NEET_UG';
  if (norm.includes('RBSE')) return 'RBSE';
  if (norm.includes('CBSE') || norm === 'BOARD') return 'CBSE';
  return norm;
}

// GET /api/syllabus - Full or filtered list
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { exam, classLevel, subject, status = 'active' } = req.query;
    const query: any = {};

    if (status !== 'all') query.status = status;
    if (exam && exam !== 'All') query.examId = normalizeCanonicalExam(String(exam));
    if (classLevel && classLevel !== 'All' && classLevel !== 'Dropper') query.classLevel = String(classLevel);
    if (subject && subject !== 'All') {
      const subUpper = String(subject).toUpperCase();
      query.$or = [{ subjectId: subUpper }, { subjectName: new RegExp('^' + subject + '$', 'i') }];
    }

    const chapters = await SyllabusChapter.find(query).sort({ examId: 1, subjectId: 1, classLevel: 1, order: 1 });
    console.log('[SYLLABUS] GET / count=' + chapters.length);

    res.json({
      success: true,
      count: chapters.length,
      chapters
    });
  } catch (err: any) {
    console.error('[SYLLABUS] Query Error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving syllabus.' });
  }
});

// GET /api/syllabus/:exam - Exam-specific syllabus
router.get('/:exam', async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = normalizeCanonicalExam(req.params.exam);
    const chapters = await SyllabusChapter.find({ examId, status: 'active' }).sort({ subjectId: 1, classLevel: 1, order: 1 });

    if (chapters.length === 0) {
      res.status(404).json({
        success: false,
        code: 'SYLLABUS_NOT_CONFIGURED',
        message: 'Syllabus configuration is missing or not yet configured for exam ' + req.params.exam
      });
      return;
    }

    res.json({ success: true, exam: examId, count: chapters.length, chapters });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/syllabus/:exam/:class - Exam and Class specific syllabus
router.get('/:exam/:class', async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = normalizeCanonicalExam(req.params.exam);
    const classLevel = req.params.class;
    const query: any = { examId, status: 'active' };
    if (classLevel !== 'Dropper') {
      query.classLevel = classLevel;
    }

    const chapters = await SyllabusChapter.find(query).sort({ subjectId: 1, order: 1 });

    if (chapters.length === 0) {
      res.status(404).json({
        success: false,
        code: 'SYLLABUS_NOT_CONFIGURED',
        message: 'Syllabus configuration is missing for ' + req.params.exam + ' Class ' + classLevel
      });
      return;
    }

    res.json({ success: true, exam: examId, classLevel, count: chapters.length, chapters });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/syllabus/:exam/:class/:subject - Subject specific chapters and topics
router.get('/:exam/:class/:subject', async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = normalizeCanonicalExam(req.params.exam);
    const classLevel = req.params.class;
    const subUpper = req.params.subject.toUpperCase();

    const query: any = {
      examId,
      status: 'active',
      $or: [{ subjectId: subUpper }, { subjectName: new RegExp('^' + req.params.subject + '$', 'i') }]
    };
    if (classLevel !== 'Dropper') {
      query.classLevel = classLevel;
    }

    const chapters = await SyllabusChapter.find(query).sort({ order: 1 });

    if (chapters.length === 0) {
      res.status(404).json({
        success: false,
        code: 'SYLLABUS_NOT_CONFIGURED',
        message: 'Syllabus configuration is missing for ' + req.params.subject + ' in ' + req.params.exam + ' Class ' + classLevel
      });
      return;
    }

    res.json({ success: true, exam: examId, classLevel, subject: subUpper, count: chapters.length, chapters });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/syllabus/:exam/:class/:subject/:chapter - Chapter detail with topics
router.get('/:exam/:class/:subject/:chapter', async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = normalizeCanonicalExam(req.params.exam);
    const classLevel = req.params.class;
    const subUpper = req.params.subject.toUpperCase();
    const chParam = req.params.chapter;
    const chNorm = chParam.toUpperCase().replace(/[^A-Z0-9]+/g, '_');

    const query: any = {
      examId,
      status: 'active',
      $or: [{ subjectId: subUpper }, { subjectName: new RegExp('^' + req.params.subject + '$', 'i') }],
      $and: [
        {
          $or: [
            { chapterId: chNorm },
            { name: new RegExp('^' + chParam + '$', 'i') },
            { id: chParam }
          ]
        }
      ]
    };
    if (classLevel !== 'Dropper') {
      query.classLevel = classLevel;
    }

    const chapter = await SyllabusChapter.findOne(query);

    if (!chapter) {
      res.status(404).json({
        success: false,
        code: 'CHAPTER_NOT_FOUND',
        message: 'Chapter not found: ' + chParam
      });
      return;
    }

    res.json({ success: true, chapter });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ADMIN: POST /api/syllabus - Create new chapter
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const chapterId = body.chapterId || body.name.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
    const id = body.id || (body.examId + '|' + body.subjectId + '|' + body.classLevel + '|' + chapterId);

    const created = await SyllabusChapter.create({ ...body, chapterId, id });
    res.status(201).json({ success: true, chapter: created });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ADMIN: PUT /api/syllabus/:id - Update chapter
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await SyllabusChapter.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { _id: req.params.id }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ success: false, message: 'Chapter not found.' });
      return;
    }
    res.json({ success: true, chapter: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
