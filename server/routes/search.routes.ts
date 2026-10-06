import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
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

// Cached static assets for instant resilient search
let cachedFormulas: any[] | null = null;
let cachedLectures: any[] | null = null;
let cachedChapterNotes: any[] | null = null;

function getStaticFormulas(): any[] {
  if (!cachedFormulas) {
    try {
      const p = path.resolve('server/data/canonicalFormulas.json');
      if (fs.existsSync(p)) {
        cachedFormulas = JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch {}
    cachedFormulas = cachedFormulas || [];
  }
  return cachedFormulas;
}

function getStaticLectures(): any[] {
  if (!cachedLectures) {
    try {
      const p = path.resolve('server/data/curatedLectures.json');
      if (fs.existsSync(p)) {
        cachedLectures = JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch {}
    cachedLectures = cachedLectures || [];
  }
  return cachedLectures;
}

function getStaticChapterNotes(): any[] {
  if (!cachedChapterNotes) {
    try {
      const p = path.resolve('server/data/chapterNotes.json');
      if (fs.existsSync(p)) {
        cachedChapterNotes = JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch {}
    cachedChapterNotes = cachedChapterNotes || [];
  }
  return cachedChapterNotes;
}

// ==========================================
// 1. FAST AUTOCOMPLETE SUGGESTIONS
// ==========================================
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const rawQ = String(req.query.q || '').trim();
    if (!rawQ || rawQ.length < 2) {
      return res.json({ success: true, suggestions: [] });
    }

    const safeQ = sanitizeRegex(rawQ);
    const regex = new RegExp(safeQ, 'i');
    const suggestionsSet = new Set<string>();

    // 1. Syllabus Chapters
    try {
      const chapters = await SyllabusChapter.find({
        $or: [{ name: regex }, { 'topics.name': regex }]
      })
        .select('name subjectName topics')
        .limit(5)
        .lean();

      chapters.forEach((ch: any) => {
        if (regex.test(ch.name)) suggestionsSet.add(ch.name);
        (ch.topics || []).forEach((t: any) => {
          if (regex.test(t.name)) suggestionsSet.add(t.name);
        });
      });
    } catch {}

    // 2. Formulas (Static + Mongo)
    const staticFormulas = getStaticFormulas();
    staticFormulas.forEach((f: any) => {
      if (regex.test(f.title) || regex.test(f.chapter) || regex.test(f.topic)) {
        suggestionsSet.add(`${f.title} (Formula)`);
      }
    });

    // 3. Lectures (Static + Mongo)
    const staticLectures = getStaticLectures();
    staticLectures.forEach((l: any) => {
      if (regex.test(l.title) || regex.test(l.chapter)) {
        suggestionsSet.add(`${l.chapter} (Lecture)`);
      }
    });

    // 4. Notes
    const staticNotes = getStaticChapterNotes();
    staticNotes.forEach((n: any) => {
      if (regex.test(n.topic) || regex.test(n.chapter)) {
        suggestionsSet.add(`${n.topic} (Notes)`);
      }
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
// 2. UNIFIED STUDY SEARCH
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

    // ----------------------------------------------------
    // 1. SEARCH FORMULAS (Mongo + Canonical Bank Overlay)
    // ----------------------------------------------------
    let formulas: any[] = [];
    if (type === 'all' || type === 'formulas') {
      const formulaMap = new Map<string, any>();

      // 1a. Query from in-memory canonical formulas (922 formulas across all chapters)
      const staticList = getStaticFormulas();
      staticList.forEach((f: any) => {
        if (!f.isActive && f.isActive !== undefined) return;
        if (subject && f.subject && !new RegExp(`^${subject}$`, 'i').test(f.subject)) return;
        if (classLevel && f.classLevel && String(f.classLevel) !== String(classLevel)) return;

        const matches =
          regex.test(f.title) ||
          regex.test(f.formula) ||
          regex.test(f.chapter) ||
          regex.test(f.topic) ||
          (Array.isArray(f.tags) && f.tags.some((t: string) => regex.test(t))) ||
          regex.test(f.explanation);

        if (matches) {
          formulaMap.set(f.id || f.title, f);
        }
      });

      // 1b. Overlay from MongoDB Formula collection
      try {
        const fQuery: any = {
          isActive: true,
          $or: [
            { title: regex },
            { formula: regex },
            { chapter: regex },
            { topic: regex },
            { tags: regex },
            { explanation: regex }
          ]
        };
        if (subject) fQuery.subject = new RegExp(`^${subject}$`, 'i');
        if (classLevel) fQuery.classLevel = classLevel;

        const mongoFormulas = await Formula.find(fQuery)
          .sort({ importance: -1, createdAt: -1 })
          .limit(20)
          .lean();

        mongoFormulas.forEach((f: any) => {
          formulaMap.set(f.id || String(f._id), f);
        });
      } catch (err) {
        // Fallback to static list already populated
      }

      formulas = Array.from(formulaMap.values()).slice(0, 20);
    }

    // ----------------------------------------------------
    // 2. SEARCH LECTURES (Mongo + Curated Lectures Overlay)
    // ----------------------------------------------------
    let lectures: any[] = [];
    if (type === 'all' || type === 'lectures') {
      const lectureMap = new Map<string, any>();

      // 2a. Query in-memory curated lectures (115 one-shot lectures)
      const staticLectures = getStaticLectures();
      staticLectures.forEach((l: any) => {
        if (!l.isActive && l.isActive !== undefined) return;
        if (subject && l.subject && !new RegExp(`^${subject}$`, 'i').test(l.subject)) return;
        if (classLevel && l.classLevel && String(l.classLevel) !== String(classLevel)) return;

        const matches =
          regex.test(l.title) ||
          regex.test(l.chapter) ||
          regex.test(l.topic) ||
          regex.test(l.description);

        if (matches) {
          const key = l.youtubeVideoId || l.id;
          lectureMap.set(key, l);
        }
      });

      // 2b. Overlay from MongoDB Lecture collection
      try {
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

        const mongoLectures = await Lecture.find(lQuery)
          .sort({ isRecommended: -1, priority: -1, score: -1 })
          .limit(15)
          .lean();

        mongoLectures.forEach((l: any) => {
          const key = l.youtubeVideoId || l.id || String(l._id);
          lectureMap.set(key, l);
        });
      } catch (err) {}

      lectures = Array.from(lectureMap.values()).slice(0, 15);
    }

    // ----------------------------------------------------
    // 3. SEARCH NOTES (531 High-Yield Curriculum Notes + User Personal Notes)
    // ----------------------------------------------------
    let notes: any[] = [];
    if (type === 'all' || type === 'notes') {
      const noteMap = new Map<string, any>();

      // 3a. High-Yield Curriculum Notes (531 chapters & topics)
      const staticNotes = getStaticChapterNotes();
      staticNotes.forEach((n: any) => {
        if (subject && n.subject && !new RegExp(`^${subject}$`, 'i').test(n.subject)) return;
        if (classLevel && n.classLevel && String(n.classLevel) !== String(classLevel)) return;

        const matches =
          regex.test(n.title) ||
          regex.test(n.chapter) ||
          regex.test(n.topic) ||
          regex.test(n.content) ||
          (Array.isArray(n.bullets) && n.bullets.some((b: string) => regex.test(b))) ||
          (Array.isArray(n.keyPoints) && n.keyPoints.some((k: string) => regex.test(k)));

        if (matches) {
          noteMap.set(n.id, {
            ...n,
            isCurriculumNote: true
          });
        }
      });

      // 3b. User's Personal Notes (if logged in)
      const userId = req.user?.id || req.user?.studentId;
      if (userId) {
        try {
          const userNotes = await Note.find({
            userId,
            $or: [{ title: regex }, { content: regex }, { chapter: regex }]
          })
            .limit(10)
            .lean();

          userNotes.forEach((un: any) => {
            noteMap.set(un.id || String(un._id), {
              ...un,
              isCurriculumNote: false
            });
          });
        } catch {}
      }

      notes = Array.from(noteMap.values()).slice(0, 15);
    }

    // ----------------------------------------------------
    // 4. PLANNER / REVISION TASK SUGGESTIONS
    // ----------------------------------------------------
    let planner: any[] = [];
    if (type === 'all' || type === 'planner') {
      const matchedSubject = formulas[0]?.subject || lectures[0]?.subject || notes[0]?.subject || 'Physics';
      const matchedChapter = formulas[0]?.chapter || lectures[0]?.chapter || notes[0]?.chapter || rawQ;

      planner = [
        {
          id: `plan_rev_${Date.now()}_1`,
          title: `Revise ${matchedChapter} High-Yield Formulas`,
          subject: matchedSubject,
          chapter: matchedChapter,
          topic: rawQ,
          suggestedDuration: '30 mins',
          type: 'Revision'
        },
        {
          id: `plan_rev_${Date.now()}_2`,
          title: `Solve 15 Target PYQ Questions on ${rawQ}`,
          subject: matchedSubject,
          chapter: matchedChapter,
          topic: rawQ,
          suggestedDuration: '45 mins',
          type: 'Practice'
        },
        {
          id: `plan_rev_${Date.now()}_3`,
          title: `Watch One-Shot Video Lecture for ${matchedChapter}`,
          subject: matchedSubject,
          chapter: matchedChapter,
          topic: rawQ,
          suggestedDuration: '60 mins',
          type: 'Lecture'
        }
      ];
    }

    // ----------------------------------------------------
    // 5. RELATED TOPICS (from SyllabusChapter)
    // ----------------------------------------------------
    let relatedTopics: any[] = [];
    try {
      const syllabusMatches = await SyllabusChapter.find({
        $or: [{ name: regex }, { 'topics.name': regex }]
      })
        .select('name subjectName topics')
        .limit(4)
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
