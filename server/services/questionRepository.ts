import fs from 'fs';
import path from 'path';
import { getChapterSortRank } from '../../src/utils/chapterOrder.js';
import { canonicalSyllabus } from '../../src/data/canonicalSyllabusData.js';

export interface QuestionFilterOptions {
  exam?: string;
  classLevel?: string;
  subject?: string;
  subjects?: string[];
  chapter?: string;
  chapters?: string[];
  topic?: string;
  topics?: string[];
  difficulty?: string;
  status?: string;
  contentType?: string;
  includePYQs?: boolean | string;
  includeModelPapers?: boolean | string;
  search?: string;
  excludeIds?: string[];
}

function clean(s: any): string {
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchesFuzzy(val1: any, val2: any): boolean {
  const c1 = clean(val1);
  const c2 = clean(val2);
  if (!c1 || !c2) return false;
  if (c1 === c2) return true;

  const minLen = Math.min(c1.length, c2.length);
  const maxLen = Math.max(c1.length, c2.length);
  if (c1.includes(c2) || c2.includes(c1)) {
    if (minLen / maxLen >= 0.75 || minLen >= 12) return true;
  }

  const w1 = String(val1).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const w2 = String(val2).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  if (w1.length === 0 || w2.length === 0) return false;
  const common = w1.filter(w => w2.includes(w));
  const minWords = Math.min(w1.length, w2.length);
  const required = minWords === 1 ? 1 : Math.max(2, Math.ceil(minWords * 0.7));
  return common.length >= required;
}

export class QuestionRepository {
  private static instance: QuestionRepository;
  private questions: any[] = [];
  private isLoaded = false;
  private idMap = new Map<string, any>();

  private constructor() {}

  public static getInstance(): QuestionRepository {
    if (!QuestionRepository.instance) {
      QuestionRepository.instance = new QuestionRepository();
    }
    return QuestionRepository.instance;
  }

  public load(): void {
    if (this.isLoaded && this.questions.length > 0) return;

    const baseDir = path.resolve(process.cwd(), 'server/data/questions');
    const files = ['physicsBank.json', 'chemistryBank.json', 'biologyBank.json', 'mathBank.json'];

    for (const f of files) {
      const fullPath = path.join(baseDir, f);
      if (fs.existsSync(fullPath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (Array.isArray(raw)) {
            for (const q of raw) {
              if (q && q.id) {
                this.questions.push(q);
                this.idMap.set(q.id, q);
              }
            }
          }
        } catch (err) {
          console.warn(`[QuestionRepository] Error loading ${f}:`, err);
        }
      }
    }

    this.isLoaded = true;
    console.log(`[QuestionRepository] Successfully indexed ${this.questions.length} questions in memory (Question Bank).`);
  }

  public getAll(): any[] {
    this.load();
    return this.questions;
  }

  public getById(id: string): any | undefined {
    this.load();
    const direct = this.idMap.get(id);
    if (direct) return direct;
    if (id && (id.endsWith('-v2') || id.includes('-var-'))) {
      const baseId = id.endsWith('-v2') ? id.slice(0, -3) : id.split('-var-')[0];
      const counter = id.includes('-var-') ? parseInt(id.split('-var-')[1], 10) || 1 : 1;
      const base = this.idMap.get(baseId);
      if (base) {
        const origCa = typeof base.correctAnswer === 'number' ? base.correctAnswer : 0;
        const targetCa = (origCa + counter) % 4;
        let newOpts = Array.isArray(base.options) ? [...base.options] : [];
        let newOptsHi = Array.isArray(base.optionsHi) ? [...base.optionsHi] : undefined;
        if (newOpts.length === 4) {
          const correctText = newOpts[origCa];
          const otherOpts = newOpts.filter((_, idx) => idx !== origCa);
          newOpts = [null, null, null, null] as any;
          newOpts[targetCa] = correctText;
          let oi = 0;
          for (let k = 0; k < 4; k++) {
            if (newOpts[k] === null) newOpts[k] = otherOpts[oi++];
          }
        }
        if (newOptsHi && newOptsHi.length === 4) {
          const correctTextHi = newOptsHi[origCa];
          const otherOptsHi = newOptsHi.filter((_, idx) => idx !== origCa);
          newOptsHi = [null, null, null, null] as any;
          newOptsHi[targetCa] = correctTextHi;
          let oi = 0;
          for (let k = 0; k < 4; k++) {
            if (newOptsHi[k] === null) newOptsHi[k] = otherOptsHi[oi++];
          }
        }
        return {
          ...base,
          id,
          options: newOpts,
          optionsHi: newOptsHi || newOpts,
          correctAnswer: targetCa,
          source: base.source === 'Official PYQ' ? 'PYQ Practice Variant' : (base.source || 'Study Up Question Bank'),
          isVariant: true
        };
      }
    }
    return undefined;
  }

  public getByIds(ids: string[]): any[] {
    this.load();
    return ids.map(id => this.getById(id)).filter(Boolean);
  }

  public count(filters: QuestionFilterOptions = {}): number {
    return this.filter(filters).length;
  }

  public filter(filters: QuestionFilterOptions = {}): any[] {
    this.load();
    const {
      exam,
      classLevel,
      subject,
      subjects,
      chapter,
      chapters,
      topic,
      topics,
      difficulty,
      status,
      contentType,
      includePYQs,
      includeModelPapers,
      search,
      excludeIds
    } = filters;

    const normExam = (exam || '').trim().toUpperCase();
    const isCompetitive = normExam === 'JEE' || normExam === 'JEE_MAIN' || normExam === 'JEE_ADVANCED' || normExam === 'NEET';
    const norm = (v: any) => String(v ?? '').trim().toLowerCase();
    const excludeSet = excludeIds && Array.isArray(excludeIds) && excludeIds.length > 0 ? new Set(excludeIds) : null;

    return this.questions.filter(q => {
      // Exclude already attempted/seen questions if requested
      if (excludeSet && excludeSet.has(q.id)) return false;

      // Content type / model paper
      const isModel = q.contentType === 'MODEL_PAPER' || q.source === 'Model Paper';
      const isPYQ = q.contentType === 'PYQ' || q.source === 'PYQ' || q.source === 'Official PYQ';

      if (includeModelPapers === false || includeModelPapers === 'false') {
        if (isModel) return false;
      }
      if (includePYQs === false || includePYQs === 'false') {
        if (isPYQ) return false;
      }

      // Exam matching (case-insensitive and tolerant)
      if (normExam && normExam !== 'ALL') {
        const qExam = (q.exam || '').trim().toUpperCase();
        if (normExam === 'JEE' || normExam === 'JEE_MAIN' || normExam === 'JEE_ADVANCED') {
          if (qExam && qExam !== 'JEE' && qExam !== 'JEE_MAIN' && qExam !== 'JEE_ADVANCED' && qExam !== 'ALL' && qExam !== 'BOARD' && qExam !== 'CBSE') return false;
        } else if (normExam === 'NEET') {
          if (qExam && qExam !== 'NEET' && qExam !== 'ALL' && qExam !== 'BOARD' && qExam !== 'CBSE') return false;
        } else if (normExam === 'BOARD' || normExam === 'CBSE' || normExam === 'RBSE') {
          if (qExam !== 'BOARD' && qExam !== 'CBSE' && qExam !== 'RBSE') return false;
        } else if (qExam !== normExam) {
          return false;
        }
      }

      // Subject matching
      if (subject && subject !== 'All' && norm(q.subject) !== norm(subject)) return false;
      if (subjects && subjects.length > 0 && !subjects.some(s => norm(s) === norm(q.subject))) return false;

      // Chapter matching with resilient fuzzy matching
      if (chapter && chapter !== 'All' && chapter !== 'ALL') {
        if (!q.chapter || !matchesFuzzy(q.chapter, chapter)) return false;
      }
      if (chapters && chapters.length > 0 && !chapters.includes('ALL') && !chapters.some(c => matchesFuzzy(q.chapter, c))) return false;

      // Topic matching with resilient fuzzy matching
      if (topic && topic !== 'All' && topic !== 'ALL') {
        if (!q.topic || !matchesFuzzy(q.topic, topic)) return false;
      }
      if (topics && topics.length > 0 && !topics.includes('ALL') && !topics.some(t => matchesFuzzy(q.topic, t))) return false;

      // ClassLevel: if student specifies Class 11 or 12, enforce strict class isolation
      if (classLevel && classLevel !== 'All' && classLevel !== 'ALL' && classLevel !== 'Dropper') {
        const qClass = String(q.class || q.classLevel || '');
        if (qClass && qClass !== classLevel && qClass !== 'Both' && qClass !== 'All') return false;
      }

      // Difficulty (case-insensitive)
      if (difficulty && difficulty !== 'All' && difficulty !== 'Mixed' && String(q.difficulty || '').trim().toLowerCase() !== String(difficulty).trim().toLowerCase()) return false;

      // Status & content type
      if (status && status !== 'All' && (q.status || 'Approved') !== status) return false;
      if (contentType && contentType !== 'All') {
        const resolved = q.contentType || (isModel ? 'MODEL_PAPER' : isPYQ ? 'PYQ' : 'QUESTION_BANK');
        if (resolved !== contentType) return false;
      }

      // Search query
      if (search && typeof search === 'string' && search.trim()) {
        const s = search.toLowerCase().trim();
        const mQ = q.question && q.question.toLowerCase().includes(s);
        const mCh = q.chapter && q.chapter.toLowerCase().includes(s);
        const mTop = q.topic && q.topic.toLowerCase().includes(s);
        if (!mQ && !mCh && !mTop) return false;
      }

      return true;
    });
  }

  // Admin-created questions join the in-memory bank so every endpoint (count/list/build) sees them instantly
  public add(question: any): void {
    this.load();
    if (!question || !question.id) return;
    if (this.idMap.has(question.id)) return;
    this.questions.push(question);
    this.idMap.set(question.id, question);
  }

  public addMany(questions: any[]): void {
    for (const q of questions || []) this.add(q);
  }

  // Startup hydration: pull Mongo-only questions (admin-created, persisted across restarts) into the bank
  public async hydrateFromMongo(model: any): Promise<number> {
    this.load();
    try {
      let added = 0;
      // Projection with cursor to avoid memory spikes
      const cursor = model.find({}, { id: 1 }).cursor();
      const missingIds: string[] = [];
      for await (const doc of cursor) {
        const id = doc.id || String(doc._id);
        if (!this.idMap.has(id)) {
          missingIds.push(id);
        }
      }
      if (missingIds.length > 0) {
        const mongoOnly = await model.find({ id: { $in: missingIds } }).lean();
        for (const doc of mongoOnly) {
          const q = { ...doc, id: doc.id || String(doc._id) };
          if (!this.idMap.has(q.id)) {
            this.questions.push(q);
            this.idMap.set(q.id, q);
            added++;
          }
        }
      }
      if (added > 0) console.log(`[QuestionRepository] Hydrated ${added} Mongo-only questions into memory bank.`);
      return added;
    } catch (err) {
      console.warn('[QuestionRepository] Mongo hydration skipped:', err);
      return 0;
    }
  }

  public getInventoryStats(): {
    total: number;
    difficulties: Record<string, number>;
    statuses: Record<string, number>;
    exams: Record<string, number>;
    subjects: Record<string, number>;
    contentTypes: Record<string, number>;
  } {
    this.load();
    const diffs: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    const statuses: Record<string, number> = { Approved: 0, Pending: 0, Draft: 0, Rejected: 0 };
    const exams: Record<string, number> = {};
    const subjects: Record<string, number> = {};
    const contentTypes: Record<string, number> = {};

    for (const q of this.questions) {
      if (q.difficulty) diffs[q.difficulty] = (diffs[q.difficulty] || 0) + 1;
      const st = q.status || 'Approved';
      statuses[st] = (statuses[st] || 0) + 1;
      if (q.exam) exams[q.exam] = (exams[q.exam] || 0) + 1;
      if (q.subject) subjects[q.subject] = (subjects[q.subject] || 0) + 1;
      const ct = q.contentType || (q.source === 'PYQ' ? 'PYQ' : 'QUESTION_BANK');
      contentTypes[ct] = (contentTypes[ct] || 0) + 1;
    }

    return {
      total: this.questions.length,
      difficulties: diffs,
      statuses,
      exams,
      subjects,
      contentTypes
    };
  }

  public getTaxonomy(subject?: string, classLevel?: string): {
    chapters: { name: string; classLevel?: string; count: number; topics: { name: string; count: number }[] }[];
  } {
    this.load();
    const chapterMap = new Map<string, { classLevel?: string; count: number; topics: Map<string, number> }>();
    const normSub = subject ? String(subject).toLowerCase().trim() : null;

    for (const q of this.questions) {
      if (normSub && String(q.subject || '').toLowerCase().trim() !== normSub) continue;
      if (classLevel && classLevel !== 'All' && String(q.class || '') !== String(classLevel)) continue;

      const ch = String(q.chapter || 'General').trim();
      const top = String(q.topic || 'General Concepts').trim();

      // Skip non-authentic or dummy topics
      if (/High Yield Application|Core Concept Drill|Reaction & Synthesis|Mechanism & Analysis|Calculus & Geometry|Analytic Problem/i.test(top)) continue;

      if (!chapterMap.has(ch)) {
        chapterMap.set(ch, { classLevel: q.class, count: 0, topics: new Map() });
      }
      const entry = chapterMap.get(ch)!;
      entry.count++;
      entry.topics.set(top, (entry.topics.get(top) || 0) + 1);
    }

    const chapters = Array.from(chapterMap.entries()).map(([name, data]) => ({
      name,
      classLevel: data.classLevel,
      count: data.count,
      topics: Array.from(data.topics.entries()).map(([tName, tCount]) => ({ name: tName, count: tCount })).sort((a, b) => b.count - a.count)
    })).sort((a, b) => {
      const rankA = getChapterSortRank(a.name, normSub || undefined);
      const rankB = getChapterSortRank(b.name, normSub || undefined);
      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name);
    });

    return { chapters };
  }

  public getTopics(chapter: string, exam?: string, subject?: string): string[] {
    if (!chapter || chapter === 'ALL' || chapter === 'All') return [];
    this.load();

    const norm = (s: any) => String(s || '').toLowerCase().replace(/\bsome\b/g, '').replace(/[^a-z0-9]/g, '');
    const chNorm = norm(chapter);
    const subNorm = subject ? norm(subject) : '';
    const exNorm = exam ? String(exam).toUpperCase() : '';

    const isAuthentic = (t: string) => {
      if (!t || typeof t !== 'string' || t.length < 3) return false;
      if (/High Yield Application|Core Concept Drill|Reaction & Synthesis|Mechanism & Analysis|Calculus & Geometry|Analytic Problem|Practice Drill|Set \d+|Drill \d+|Application \d+/i.test(t)) return false;
      return true;
    };

    // 0. Canonical syllabus topics (authoritative source)
    let foundChapter = canonicalSyllabus.find(c => {
      if (norm(c.name) !== chNorm && !matchesFuzzy(c.name, chapter)) return false;
      if (subNorm && norm(c.subjectName) !== subNorm && !matchesFuzzy(c.subjectName, subject)) return false;
      if (exNorm && c.examId && !c.examId.toUpperCase().includes(exNorm) && !exNorm.includes(c.examId.toUpperCase())) return false;
      return true;
    });

    if (!foundChapter && subNorm) {
      foundChapter = canonicalSyllabus.find(c => {
        return (norm(c.name) === chNorm || matchesFuzzy(c.name, chapter)) &&
               (norm(c.subjectName) === subNorm || matchesFuzzy(c.subjectName, subject));
      });
    }

    if (!foundChapter) {
      foundChapter = canonicalSyllabus.find(c => norm(c.name) === chNorm || matchesFuzzy(c.name, chapter));
    }

    if (foundChapter && Array.isArray(foundChapter.topics) && foundChapter.topics.length > 0) {
      const canonicalTopicNames = foundChapter.topics
        .map((t: any) => (typeof t === 'string' ? t : t?.name))
        .filter((t: any): t is string => isAuthentic(t));
      if (canonicalTopicNames.length > 0) {
        return canonicalTopicNames;
      }
    }

    // Fallback: clean question topics from repo
    const topics = new Set<string>();
    const chapLower = (chapter || '').trim().toLowerCase();
    for (const q of this.questions) {
      if (q.chapter && (q.chapter.trim().toLowerCase() === chapLower || q.chapter.toLowerCase().includes(chapLower) || chapLower.includes(q.chapter.toLowerCase()))) {
        if (q.topic && isAuthentic(q.topic)) topics.add(q.topic);
      }
    }
    return Array.from(topics).sort();
  }
}

export const questionRepo = QuestionRepository.getInstance();
