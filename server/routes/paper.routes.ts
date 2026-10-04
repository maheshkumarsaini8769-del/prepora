import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Paper from '../models/Paper.js';
import Question from '../models/Question.js';

const router = express.Router();

// Real curated papers seed helper
async function ensureSeededPapers() {
  const count = await Paper.countDocuments();
  if (count === 0) {
    try {
      const pPath = path.resolve('server/data/realPapers.json');
      if (fs.existsSync(pPath)) {
        const raw = fs.readFileSync(pPath, 'utf8');
        const papers = JSON.parse(raw);
        await Paper.insertMany(papers.map((p: any) => ({ ...p, status: 'Published' })));
        return;
      }
    } catch (e) {
      console.warn('[Paper Seed Error]', e);
    }
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
