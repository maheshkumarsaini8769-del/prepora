import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Formula from '../models/Formula.js';
import { requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

async function ensureSeededFormulas() {
  try {
    const count = await Formula.countDocuments();
    if (count < 500) {
      const p = path.resolve('server/data/canonicalFormulas.json');
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf8');
        const formulas = JSON.parse(raw);
        const ops = formulas.map((f: any) => ({
          updateOne: {
            filter: { id: f.id },
            update: { $set: f },
            upsert: true
          }
        }));
        await Formula.bulkWrite(ops, { ordered: false });
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

    const limitNum = Math.min(Number(req.query.limit) || 1000, 1000);
    let formulas = await Formula.find(query).sort({ order: 1, importance: -1, createdAt: 1 }).limit(limitNum).lean();

    // In-memory fallback from canonicalFormulas.json if MongoDB returns empty
    if (formulas.length === 0) {
      try {
        const p = path.resolve('server/data/canonicalFormulas.json');
        if (fs.existsSync(p)) {
          const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
          formulas = raw.filter((f: any) => {
            if (subject && !new RegExp(`^${String(subject).trim()}$`, 'i').test(f.subject)) return false;
            if (chapter && !new RegExp(`^${String(chapter).trim()}$`, 'i').test(f.chapter)) return false;
            if (topic && !new RegExp(`^${String(topic).trim()}$`, 'i').test(f.topic)) return false;
            if (classLevel && String(f.classLevel) !== String(classLevel)) return false;
            if (search) {
              const qRegex = new RegExp(String(search).trim(), 'i');
              return qRegex.test(f.title) || qRegex.test(f.formula) || qRegex.test(f.explanation);
            }
            return true;
          }).slice(0, limitNum);
        }
      } catch {}
    }

    return res.json({
      success: true,
      count: formulas.length,
      formulas,
      data: formulas
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
      formulas,
      data: formulas
    });
  } catch (err: any) {
    console.error('[QUICK_REVISION_ERROR]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch quick revision.' });
  }
});

// ==========================================
// 3. ADMIN: ADD FORMULA
// ==========================================
router.post('/', optionalAuth, async (req: Request, res: Response) => {
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
router.put('/:id', optionalAuth, async (req: Request, res: Response) => {
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

router.delete('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Formula.findOneAndDelete({ $or: [{ id }, { _id: id }] });
    return res.json({ success: true, message: 'Formula deleted.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete formula.' });
  }
});

export default router;
