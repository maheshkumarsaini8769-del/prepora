import express, { Request, Response } from 'express';
import Test from '../models/Test.js';
import Question from '../models/Question.js';

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
      questionCount = 10,
      difficulty = 'Mixed',
      durationMinutes = 30,
      negativeMarking = true
    } = req.body;

    if (!exam || !subjects || subjects.length === 0) {
      return res.status(400).json({ success: false, message: 'Exam and subjects are required.' });
    }

    const filter: any = {
      exam,
      subject: { $in: subjects }
    };
    if (classLevel && classLevel !== 'All') filter.class = classLevel;
    if (difficulty && difficulty !== 'Mixed' && difficulty !== 'All') filter.difficulty = difficulty;
    if (chapters && chapters.length > 0) filter.chapter = { $in: chapters };

    const pool = await Question.find(filter);

    if (pool.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No questions found matching ${subjects.join(', ')} for ${exam}.`
      });
    }

    if (pool.length < questionCount) {
      return res.status(400).json({
        success: false,
        message: `Only ${pool.length} suitable questions are available for this combination (requested ${questionCount}). Please reduce the question count or expand topics.`
      });
    }

    // Shuffle and pick
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    const questionIds = selected.map(q => q.id);

    const markPerQ = 4;
    const maxScore = questionCount * markPerQ;

    const newTest = new Test({
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
    });

    await newTest.save();
    res.status(201).json({ success: true, test: newTest });
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
