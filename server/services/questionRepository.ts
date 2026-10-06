import fs from 'fs';
import path from 'path';

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
  if (c1 === c2 || c1.includes(c2) || c2.includes(c1)) return true;

  const w1 = String(val1).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const w2 = String(val2).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  if (w1.length === 0 || w2.length === 0) return false;
  const common = w1.filter(w => w2.includes(w));
  return common.length >= Math.min(w1.length, w2.length, 1);
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
    if (id && id.endsWith('-v2')) {
      const baseId = id.slice(0, -3);
      const base = this.idMap.get(baseId);
      if (base) {
        return {
          ...base,
          id,
          source: base.source === 'Official PYQ' ? 'PYQ Practice Variant' : (base.source || 'Prepora Question Bank'),
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

    const isCompetitive = exam === 'JEE' || exam === 'JEE_MAIN' || exam === 'JEE_ADVANCED' || exam === 'NEET';
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

      // Exam matching
      if (exam && exam !== 'All') {
        if (exam === 'JEE' || exam === 'JEE_MAIN' || exam === 'JEE_ADVANCED') {
          if (q.exam && q.exam !== 'JEE' && q.exam !== 'JEE_MAIN' && q.exam !== 'JEE_ADVANCED' && q.exam !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
        } else if (exam === 'NEET') {
          if (q.exam && q.exam !== 'NEET' && q.exam !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
        } else if (exam === 'Board' || exam === 'CBSE' || exam === 'RBSE') {
          if (q.exam !== 'Board' && q.exam !== 'CBSE' && q.exam !== 'RBSE') return false;
        } else if (q.exam !== exam) {
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

      // ClassLevel: only apply if explicitly non-competitive boards
      if (classLevel && classLevel !== 'All' && !isCompetitive) {
        if (String(q.class) !== classLevel && String(q.class) !== 'Both' && String(q.class) !== 'All') return false;
      }

      // Difficulty
      if (difficulty && difficulty !== 'All' && difficulty !== 'Mixed' && q.difficulty !== difficulty) return false;

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
    })).sort((a, b) => a.name.localeCompare(b.name));

    return { chapters };
  }
}

export const questionRepo = QuestionRepository.getInstance();
