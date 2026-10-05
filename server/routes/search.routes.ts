import express, { Request, Response } from 'express';
import Formula from '../models/Formula.js';
import Lecture from '../models/Lecture.js';
import { Note } from '../models/Entities.js';
import SyllabusChapter from '../models/Syllabus.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

/**
 * Normalizes query string for safe regex matching (escapes regex special chars)
 */
function sanitizeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
}

// ==========================================
// 1. FAST AUTOCOMPLETE SUGGESTIONS (task3.md Section 3)
// ==========================================
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const rawQ = String(req.query.q || '').trim();
    if (!rawQ || rawQ.length < 2) {
      return res.json({ success: true, suggestions: [] });
    }

    const safeQ = sanitizeRegex(rawQ);
    const regex = new RegExp(safeQ, 'i');

    const [chapters, formulas, lectures] = await Promise.all([
      SyllabusChapter.find({
        $or: [{ name: regex }, { 'topics.name': regex }]
      })
        .select('name subjectName topics')
        .limit(5)
        .lean(),
      Formula.find({ title: regex }).select('title subject chapter').limit(5).lean(),
      Lecture.find({ title: regex, isActive: true }).select('title chapter subject').limit(5).lean()
    ]);

    const suggestionsSet = new Set<string>();

    chapters.forEach((ch: any) => {
      if (regex.test(ch.name)) suggestionsSet.add(ch.name);
      (ch.topics || []).forEach((t: any) => {
        if (regex.test(t.name)) suggestionsSet.add(t.name);
      });
    });

    formulas.forEach((f: any) => {
      suggestionsSet.add(`${f.title} (Formula)`);
    });

    lectures.forEach((l: any) => {
      suggestionsSet.add(`${l.chapter} (Lecture)`);
    });

    return res.json({
      success: true,
      suggestions: Array.from(suggestionsSet).slice(0, 8)
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, suggestions: [] });
  }
});

// ==========================================
// 2. UNIFIED STUDY SEARCH (task3.md Section 14)
// ==========================================
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const rawQ = String(req.query.q || '').trim();
    const type = String(req.query.type || 'all').toLowerCase();
    const subject = req.query.subject ? String(req.query.subject).trim() : null;
    const classLevel = req.query.classLevel ? String(req.query.classLevel).trim() : null;

    if (!rawQ) {
      return res.json({
        success: true,
        query: '',
        total: 0,
        results: {
          formulas: [],
          lectures: [],
          notes: [],
          planner: [],
          relatedTopics: []
        }
      });
    }

    const safeQ = sanitizeRegex(rawQ);
    const regex = new RegExp(safeQ, 'i');

    // 1. Search Formulas
    let formulas: any[] = [];
    if (type === 'all' || type === 'formulas') {
      const fQuery: any = {
        isActive: true,
        $or: [
          { title: regex },
          { formula: regex },
          { chapter: regex },
          { topic: regex },
          { tags: regex }
        ]
      };
      if (subject) fQuery.subject = new RegExp(`^${subject}$`, 'i');
      if (classLevel) fQuery.classLevel = classLevel;

      formulas = await Formula.find(fQuery)
        .sort({ importance: -1, createdAt: -1 })
        .limit(10)
        .lean();
    }

    // 2. Search Lectures
    let lectures: any[] = [];
    if (type === 'all' || type === 'lectures') {
      const lQuery: any = {
        isActive: true,
        $or: [
          { title: regex },
          { chapter: regex },
          { topic: regex },
          { description: regex }
        ]
      };
      if (subject) lQuery.subject = new RegExp(`^${subject}$`, 'i');
      if (classLevel) lQuery.classLevel = classLevel;

      lectures = await Lecture.find(lQuery)
        .sort({ isRecommended: -1, priority: -1, score: -1 })
        .limit(10)
        .lean();
    }

    // 3. Search Notes (User's own private notes if logged in)
    let notes: any[] = [];
    if (type === 'all' || type === 'notes') {
      const userId = req.user?.id || req.user?.studentId;
      if (userId) {
        notes = await Note.find({
          userId,
          $or: [{ title: regex }, { content: regex }, { chapter: regex }]
        })
          .limit(5)
          .lean();
      }
    }

    // 4. Planner / Revision Task Suggestions
    let planner: any[] = [];
    if (type === 'all' || type === 'planner') {
      // Suggest concrete revision items
      const matchedSubject = formulas[0]?.subject || lectures[0]?.subject || 'Physics';
      const matchedChapter = formulas[0]?.chapter || lectures[0]?.chapter || rawQ;
      planner = [
        {
          id: `plan_rev_${Date.now()}_1`,
          title: `Revise ${rawQ}`,
          subject: matchedSubject,
          chapter: matchedChapter,
          topic: rawQ,
          suggestedDuration: '45 mins',
          type: 'Revision'
        },
        {
          id: `plan_rev_${Date.now()}_2`,
          title: `Solve 15 Practice Questions on ${rawQ}`,
          subject: matchedSubject,
          chapter: matchedChapter,
          topic: rawQ,
          suggestedDuration: '30 mins',
          type: 'Practice'
        }
      ];
    }

    // 5. Related Curriculum Topics (from SyllabusChapter)
    let relatedTopics: any[] = [];
    try {
      const syllabusMatches = await SyllabusChapter.find({
        $or: [{ name: regex }, { 'topics.name': regex }]
      })
        .select('name subjectName topics')
        .limit(3)
        .lean();

      const topicSet = new Set<string>();
      syllabusMatches.forEach((ch: any) => {
        (ch.topics || []).forEach((t: any) => {
          if (!t.name.toLowerCase().includes(rawQ.toLowerCase())) {
            topicSet.add(t.name);
          }
        });
      });
      relatedTopics = Array.from(topicSet).slice(0, 6);
    } catch {}

    const total = formulas.length + lectures.length + notes.length + planner.length;

    return res.json({
      success: true,
      query: rawQ,
      total,
      results: {
        formulas,
        lectures,
        notes,
        planner,
        relatedTopics
      }
    });
  } catch (err: any) {
    console.error('[STUDY_SEARCH_ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'Study search encountered an error.',
      results: { formulas: [], lectures: [], notes: [], planner: [], relatedTopics: [] }
    });
  }
});

export default router;
