import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Formula from '../models/Formula.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

async function ensureSeededFormulas() {
  try {
    const count = await Formula.countDocuments();
    if (count === 0) {
      const p = path.resolve('server/data/canonicalFormulas.json');
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8');
        const formulas = JSON.parse(raw);
        await Formula.insertMany(formulas);
        console.log(`[AutoSeed] Seeded ${formulas.length} canonical formulas into MongoDB.`);
      }
    }
  } catch (e) {
    console.warn('[AutoSeed Formulas Error]', e);
  }
}

// ==========================================
// 1. STUDENT FORMULAS QUERY (Public / Student)
// ==========================================
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    await ensureSeededFormulas();
    const { subject, chapter, topic, search, importance, classLevel } = req.query;

    const query: any = { isActive: true };
    if (subject) query.subject = new RegExp(`^${String(subject).trim()}$`, 'i');
    if (chapter) query.chapter = new RegExp(`^${String(chapter).trim()}$`, 'i');
    if (topic) query.topic = new RegExp(`^${String(topic).trim()}$`, 'i');
    if (classLevel) query.classLevel = String(classLevel);
    if (importance) query.importance = String(importance);

    if (search) {
      const q = String(search).trim();
      query.$or = [
        { title: new RegExp(q, 'i') },
        { formula: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
        { explanation: new RegExp(q, 'i') }
      ];
    }

    const formulas = await Formula.find(query).sort({ order: 1, importance: -1, createdAt: 1 }).limit(100);

    return res.json({
      success: true,
      count: formulas.length,
      formulas
    });
  } catch (err: any) {
    console.error('[FORMULA_QUERY_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch formulas.' });
  }
});

// ==========================================
// 2. QUICK REVISION FOR A CHAPTER (task1.md Section 28)
// ==========================================
router.get('/quick-revision/:chapter', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { chapter } = req.params;
    const { subject } = req.query;

    const query: any = {
      isActive: true,
      chapter: new RegExp(`^${String(chapter).trim()}$`, 'i')
    };
    if (subject) {
      query.subject = new RegExp(`^${String(subject).trim()}$`, 'i');
    }

    const formulas = await Formula.find(query).sort({ order: 1, importance: -1 });

    return res.json({
      success: true,
      chapter,
      count: formulas.length,
      formulas
    });
  } catch (err: any) {
    console.error('[QUICK_REVISION_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch quick revision.' });
  }
});

// ==========================================
// 3. ADMIN: ADD FORMULA
// ==========================================
router.post('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      formula,
      subject,
      chapter,
      topic = '',
      classLevel = '11',
      variables = '',
      explanation = '',
      example = '',
      examTip = '',
      trap = '',
      tags = [],
      importance = 'High'
    } = req.body;

    if (!title || !formula || !subject || !chapter) {
      return res.status(400).json({ success: false, message: 'Title, formula, subject, and chapter are required.' });
    }

    const id = `fml_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const newFormula = new Formula({
      id,
      title,
      formula,
      subject,
      chapter,
      topic,
      classLevel,
      variables,
      explanation,
      example,
      examTip,
      trap,
      tags: Array.isArray(tags) ? tags : [tags],
      importance,
      isActive: true
    });

    await newFormula.save();

    return res.json({
      success: true,
      message: 'Formula created successfully!',
      formula: newFormula
    });
  } catch (err: any) {
    console.error('[FORMULA_CREATE_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to create formula.' });
  }
});

// ==========================================
// 4. ADMIN: UPDATE / DELETE FORMULA
// ==========================================
router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Formula.findOneAndUpdate(
      { $or: [{ id }, { _id: id }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Formula not found.' });
    }
    return res.json({ success: true, formula: updated });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to update formula.' });
  }
});

router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Formula.findOneAndDelete({ $or: [{ id }, { _id: id }] });
    return res.json({ success: true, message: 'Formula deleted.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete formula.' });
  }
});

export default router;
