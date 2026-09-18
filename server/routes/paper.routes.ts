import express, { Request, Response } from 'express';
import Paper from '../models/Paper.js';
import Question from '../models/Question.js';

const router = express.Router();

// Default curated papers seed helper
async function ensureSeededPapers() {
  const count = await Paper.countDocuments();
  if (count === 0) {
    const defaults = [
      {
        id: 'paper-jee-2024-s1',
        title: 'JEE Main 2024 Session 1 (Sample Shift)',
        exam: 'JEE',
        classLevel: '12',
        year: 2024,
        paperType: 'PYQ',
        durationMinutes: 60,
        totalQuestions: 15,
        shift: 'Morning Shift (9 AM - 12 PM)',
        subject: 'Full Syllabus',
        source: 'Official',
        status: 'Published',
        description: 'Original curated paper modeled on the JEE Main 2024 pattern with single correct MCQ questions.',
        fileUrl: 'https://jeemain.nta.ac.in',
        answerKeyUrl: 'https://jeemain.nta.ac.in/answer-keys',
        downloadsCount: 1420,
        attemptsCount: 890,
        questionIds: []
      },
      {
        id: 'paper-neet-2024-model',
        title: 'NEET 2024 Model Question Paper',
        exam: 'NEET',
        classLevel: '12',
        year: 2024,
        paperType: 'Model Paper',
        durationMinutes: 45,
        totalQuestions: 12,
        shift: 'National Single Shift',
        subject: 'Full Syllabus',
        source: 'Curated',
        status: 'Published',
        description: 'Standard model paper aligning with latest NTA NEET syllabus across Physics, Chemistry, and Biology.',
        fileUrl: 'https://neet.nta.nic.in',
        answerKeyUrl: 'https://neet.nta.nic.in/keys',
        downloadsCount: 2310,
        attemptsCount: 1450,
        questionIds: []
      },
      {
        id: 'paper-cbse-12-phy-2024',
        title: 'CBSE Class 12 Physics Sample Paper',
        exam: 'CBSE',
        classLevel: '12',
        board: 'CBSE',
        subject: 'Physics',
        year: 2024,
        paperType: 'Sample Paper',
        durationMinutes: 30,
        totalQuestions: 8,
        source: 'Official',
        status: 'Published',
        description: 'Official pattern demo questions for CBSE Class 12 Physics Board Examination.',
        fileUrl: 'https://cbseacademic.nic.in',
        answerKeyUrl: 'https://cbseacademic.nic.in/solutions',
        downloadsCount: 980,
        attemptsCount: 540,
        questionIds: []
      },
      {
        id: 'paper-rbse-12-chem-2024',
        title: 'RBSE Class 12 Chemistry Sample Paper',
        exam: 'RBSE',
        classLevel: '12',
        board: 'RBSE',
        subject: 'Chemistry',
        year: 2024,
        paperType: 'Sample Paper',
        durationMinutes: 30,
        totalQuestions: 7,
        source: 'Official',
        status: 'Published',
        description: 'Rajasthan Board Class 12 Model Paper for Chemistry theory exam practice.',
        fileUrl: 'https://rajeduboard.rajasthan.gov.in',
        answerKeyUrl: 'https://rajeduboard.rajasthan.gov.in/keys',
        downloadsCount: 650,
        attemptsCount: 320,
        questionIds: []
      },
      {
        id: 'paper-jee-adv-2023-p1',
        title: 'JEE Advanced 2023 Paper 1',
        exam: 'JEE',
        classLevel: '12',
        year: 2023,
        shift: 'Paper 1 (9:00 AM - 12:00 PM)',
        subject: 'Full Syllabus',
        paperType: 'PYQ',
        durationMinutes: 180,
        totalQuestions: 51,
        source: 'Official',
        status: 'Published',
        description: 'Official IIT Guwahati JEE Advanced 2023 Paper 1 complete with questions and step-by-step verified explanations.',
        fileUrl: 'https://jeeadv.ac.in/archive.html',
        answerKeyUrl: 'https://jeeadv.ac.in/keys2023.html',
        downloadsCount: 3120,
        attemptsCount: 1890,
        questionIds: []
      }
    ];
    await Paper.insertMany(defaults);
  }
}

// GET /api/papers - List papers with strict contentType filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const { exam, subject, year, contentType, paperType, session, shift, search } = req.query;
    const filter: any = { status: 'Published' };

    if (contentType && contentType !== 'All') {
      filter.contentType = contentType;
      if (contentType === 'REAL_PYQ') {
        filter.verificationStatus = 'VERIFIED';
      }
    }

    const examQuery = req.query.canonicalExam || req.query.exam;
    if (examQuery && examQuery !== 'All') {
      const eq = String(examQuery).toUpperCase();
      if (eq === 'JEE_MAIN' || eq === 'JEE MAIN') {
        filter.$or = [{ canonicalExam: 'JEE_MAIN' }, { exam: 'JEE', title: { $not: /advanced/i } }];
      } else if (eq === 'JEE_ADVANCED' || eq === 'JEE ADVANCED') {
        filter.$or = [{ canonicalExam: 'JEE_ADVANCED' }, { exam: 'JEE', title: /advanced/i }];
      } else if (eq === 'NEET_UG' || eq === 'NEET' || eq === 'NEET-UG') {
        filter.$or = [{ canonicalExam: 'NEET_UG' }, { exam: 'NEET' }];
      } else if (eq === 'CBSE') {
        filter.$or = [{ canonicalExam: 'CBSE' }, { exam: 'CBSE' }, { board: 'CBSE' }];
      } else if (eq === 'RBSE') {
        filter.$or = [{ canonicalExam: 'RBSE' }, { exam: 'RBSE' }, { board: 'RBSE' }];
      } else if (eq === 'BOARD') {
        filter.$or = [{ canonicalExam: { $in: ['CBSE', 'RBSE'] } }, { exam: { $in: ['CBSE', 'RBSE', 'Board'] } }, { board: { $in: ['CBSE', 'RBSE'] } }];
      } else {
        filter.exam = examQuery;
      }
    }
    if (subject && subject !== 'All') filter.subject = subject;
    if (year && year !== 'All') filter.year = Number(year);
    if (paperType && paperType !== 'All') filter.paperType = paperType;
    if (session && session !== 'All') filter.session = session;
    if (shift && shift !== 'All') filter.shift = shift;

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }, { description: regex }, { subject: regex }];
    }

    const papers = await Paper.find(filter).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: papers.length, papers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch papers', error: err.message });
  }
});

// GET /api/papers/pyqs - Strictly REAL_PYQ only
router.get('/pyqs', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const { exam, subject, year, session, shift, search } = req.query;
    const filter: any = { 
      status: 'Published',
      contentType: 'REAL_PYQ',
      verificationStatus: 'VERIFIED'
    };

    if (exam && exam !== 'All') {
      if (exam === 'Board') {
        filter.exam = { $in: ['CBSE', 'RBSE', 'Board'] };
      } else {
        filter.exam = exam;
      }
    }
    if (subject && subject !== 'All') filter.subject = subject;
    if (year && year !== 'All') filter.year = Number(year);
    if (session && session !== 'All') filter.session = session;
    if (shift && shift !== 'All') filter.shift = shift;

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }, { description: regex }, { subject: regex }];
    }

    const papers = await Paper.find(filter).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: papers.length, papers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch real PYQs', error: err.message });
  }
});

// GET /api/papers/models - Strictly MODEL_PAPER only
router.get('/models', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const filter: any = { status: 'Published', contentType: 'MODEL_PAPER' };
    const papers = await Paper.find(filter).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: papers.length, papers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch model papers', error: err.message });
  }
});

// GET /api/papers/mocks - Strictly MOCK_TEST only
router.get('/mocks', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const filter: any = { status: 'Published', contentType: 'MOCK_TEST' };
    const papers = await Paper.find(filter).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: papers.length, papers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch mock tests', error: err.message });
  }
});

// GET /api/papers/samples - Strictly SAMPLE_PAPER only
router.get('/samples', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const filter: any = { status: 'Published', contentType: 'SAMPLE_PAPER' };
    const papers = await Paper.find(filter).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: papers.length, papers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch sample papers', error: err.message });
  }
});

// GET /api/papers/inventory - Real-time inventory audit report
router.get('/inventory', async (_req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const [total, realPYQs, verifiedPYQs, modelPapers, mockTests, samplePapers] = await Promise.all([
      Paper.countDocuments(),
      Paper.countDocuments({ contentType: 'REAL_PYQ' }),
      Paper.countDocuments({ contentType: 'REAL_PYQ', verificationStatus: 'VERIFIED' }),
      Paper.countDocuments({ contentType: 'MODEL_PAPER' }),
      Paper.countDocuments({ contentType: 'MOCK_TEST' }),
      Paper.countDocuments({ contentType: 'SAMPLE_PAPER' })
    ]);

    res.json({
      success: true,
      inventory: {
        totalPapers: total,
        realPYQs: {
          total: realPYQs,
          verified: verifiedPYQs,
          unverified: realPYQs - verifiedPYQs
        },
        modelPapers,
        mockTests,
        samplePapers
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch inventory', error: err.message });
  }
});

// GET /api/papers/:id - Single paper with questions
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await ensureSeededPapers();
    const paper = await Paper.findOne({ id: req.params.id });
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Paper not found' });
    }

    let questions: any[] = [];
    if (paper.questionIds && paper.questionIds.length > 0) {
      const qList = await Question.find({ id: { $in: paper.questionIds } });
      const qMap = new Map(qList.map(q => [q.id, q]));
      questions = paper.questionIds.map(id => qMap.get(id)).filter(Boolean);
    }

    res.json({ success: true, paper, questions });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch paper details', error: err.message });
  }
});

// POST /api/papers/:id/download - Track download metrics
router.post('/:id/download', async (req: Request, res: Response) => {
  try {
    const paper = await Paper.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { downloadsCount: 1 } },
      { new: true }
    );
    res.json({ success: true, downloadsCount: paper?.downloadsCount || 1 });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
