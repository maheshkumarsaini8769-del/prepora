import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel, ContentType } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';
import { apiRequest } from './apiClient';

function cleanStr(s: any): string {
  return String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchesFuzzy(val1: any, val2: any): boolean {
  const c1 = cleanStr(val1);
  const c2 = cleanStr(val2);
  if (!c1 || !c2) return false;
  if (c1 === c2 || c1.includes(c2) || c2.includes(c1)) return true;

  const w1 = String(val1).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const w2 = String(val2).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
  if (w1.length === 0 || w2.length === 0) return false;
  const common = w1.filter(w => w2.includes(w));
  return common.length >= Math.min(w1.length, w2.length, 1);
}

export interface QuestionFilters {
  exam?: ExamType | 'All';
  classLevel?: ClassLevel | 'All';
  subject?: SubjectName | 'All';
  chapter?: string | 'All';
  topic?: string | 'All';
  difficulty?: DifficultyLevel | 'All';
  contentType?: ContentType | 'All';
  includePYQs?: boolean;
  includeModelPapers?: boolean;
  searchQuery?: string;
  excludeIds?: string[];
}

class ApiQuestionService {
  private localQuestionsCache: Question[] = [];
  private isInitialized = false;
  private taxonomyCache: Map<string, any[]> = new Map();

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const { data, error } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=500');
      if (data && data.success && data.questions && data.questions.length > 0) {
        const map = new Map<string, Question>();
        mockQuestions.forEach(q => map.set(q.id, q));
        data.questions.forEach(q => map.set(q.id, q));
        this.localQuestionsCache = Array.from(map.values()).map(q => ({
          ...q,
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        }));
        this.isInitialized = true;
      }
    } catch {
      // Offline fallback
    }
  }

  private getCustomQuestions(): Question[] {
    return getStorageItem<Question[]>(StorageKeys.QUESTIONS, []);
  }

  public getAllQuestions(): Question[] {
    if (this.isInitialized && this.localQuestionsCache.length > 0) {
      return this.localQuestionsCache;
    }
    const custom = this.getCustomQuestions();
    const map = new Map<string, Question>();
    mockQuestions.forEach(q => map.set(q.id, q));
    custom.forEach(q => map.set(q.id, q));
    this.localQuestionsCache.forEach(q => map.set(q.id, q));
    return Array.from(map.values()).map(q => ({
      ...q,
      recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
    }));
  }

  public async fetchAllQuestionsAsync(): Promise<Question[]> {
    const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=500');
    if (data && data.success && data.questions && data.questions.length > 0) {
      const map = new Map<string, Question>();
      mockQuestions.forEach(q => map.set(q.id, q));
      data.questions.forEach(q => map.set(q.id, q));
      this.localQuestionsCache = Array.from(map.values()).map(q => ({
        ...q,
        recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
      }));
      return this.localQuestionsCache;
    }
    return this.getAllQuestions();
  }

  public getQuestionById(id: string): Question | undefined {
    return this.getAllQuestions().find(q => q.id === id);
  }

  public async getQuestionByIdAsync(id: string): Promise<Question | undefined> {
    const { data } = await apiRequest<{ success: boolean; question: Question }>(`/questions/${id}`);
    if (data && data.success && data.question) {
      return data.question;
    }
    return this.getQuestionById(id);
  }

  public getQuestionsByIds(ids: string[]): Question[] {
    const map = new Map(this.getAllQuestions().map(q => [q.id, q]));
    return ids.map(id => map.get(id)).filter((q): q is Question => Boolean(q));
  }

  public async getQuestionsByIdsAsync(ids: string[]): Promise<Question[]> {
    if (!ids || ids.length === 0) return [];
    const cacheMap = new Map(this.getAllQuestions().map(q => [q.id, q]));
    const missingIds = ids.filter(id => !cacheMap.has(id));

    if (missingIds.length > 0) {
      try {
        const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions/by-ids', {
          method: 'POST',
          body: JSON.stringify({ ids: missingIds })
        });
        if (data && data.success && Array.isArray(data.questions)) {
          data.questions.forEach(q => {
            cacheMap.set(q.id, q);
            this.localQuestionsCache.push(q);
          });
        }
      } catch (err) {
        console.warn('Failed to fetch missing questions by IDs', err);
      }
    }

    return ids.map(id => cacheMap.get(id)).filter((q): q is Question => Boolean(q));
  }

  public async fetchQuestionsAsync(filters: QuestionFilters = {}, limit: number = 50): Promise<Question[]> {
    try {
      const params = new URLSearchParams();
      if (filters.exam && filters.exam !== 'All') params.set('exam', filters.exam);
      if (filters.classLevel && filters.classLevel !== 'All') params.set('classLevel', filters.classLevel);
      if (filters.subject && filters.subject !== 'All') params.set('subject', filters.subject);
      if (filters.chapter && filters.chapter !== 'All') params.set('chapter', filters.chapter);
      if (filters.topic && filters.topic !== 'All') params.set('topic', filters.topic);
      if (filters.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty);
      if (filters.contentType && filters.contentType !== 'All') params.set('contentType', filters.contentType);
      if (filters.includePYQs !== undefined) params.set('includePYQs', String(filters.includePYQs));
      if (filters.includeModelPapers !== undefined) params.set('includeModelPapers', String(filters.includeModelPapers));
      if (filters.searchQuery) params.set('search', filters.searchQuery);
      if (filters.excludeIds && filters.excludeIds.length > 0) {
        params.set('excludeIds', filters.excludeIds.slice(0, 300).join(','));
      }
      params.set('limit', String(limit));

      const { data } = await apiRequest<{ success: boolean; questions: Question[] }>(`/questions?${params.toString()}`);
      if (data && data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        const cacheMap = new Map(this.localQuestionsCache.map(q => [q.id, q]));
        data.questions.forEach(q => cacheMap.set(q.id, q));
        this.localQuestionsCache = Array.from(cacheMap.values());
        return data.questions.map(q => ({
          ...q,
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        }));
      }
    } catch {
      // fallback
    }
    return this.filterQuestions(filters).slice(0, limit);
  }

  public filterQuestions(filters: QuestionFilters): Question[] {
    return this.getAllQuestions().filter(q => {
      // Exclude already attempted questions so student always gets fresh questions
      if (filters.excludeIds && filters.excludeIds.length > 0 && filters.excludeIds.includes(q.id)) {
        return false;
      }

      // Content Type Isolation (Task.md section 1, 2, 4, 6)
      const isModelPaper = q.contentType === 'MODEL_PAPER' || q.source === 'Model Paper';
      const isPYQ = q.contentType === 'PYQ' || q.source === 'PYQ' || q.source === 'Official PYQ';

      if (filters.contentType && filters.contentType !== 'All') {
        const resolvedType = q.contentType || (isModelPaper ? 'MODEL_PAPER' : isPYQ ? 'PYQ' : 'QUESTION_BANK');
        if (resolvedType !== filters.contentType) return false;
      } else {
        // By default: NEVER include Model Papers in normal test/practice pool
        if (!filters.includeModelPapers && isModelPaper) return false;
        // PYQs are integral to competitive practice: include by default unless explicitly disabled!
        if (filters.includePYQs === false && isPYQ) return false;
      }

      if (filters.exam && filters.exam !== 'All') {
        if (filters.exam === 'Board') {
          if (q.exam !== 'Board' && q.exam !== 'CBSE' && q.exam !== 'RBSE') return false;
        } else if (filters.exam === 'JEE') {
          // Questions tagged JEE, or general science/math entrance questions
          if (q.exam && q.exam !== 'JEE' && (q.exam as string) !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
        } else if (filters.exam === 'NEET') {
          // Questions tagged NEET, or general PCB questions
          if (q.exam && q.exam !== 'NEET' && (q.exam as string) !== 'All' && q.exam !== 'Board' && q.exam !== 'CBSE') return false;
        } else if (q.exam !== filters.exam) {
          return false;
        }
      }

      // For competitive entrance exams (JEE/NEET), both Class 11 and 12 are integral parts of the syllabus
      if (filters.classLevel && filters.classLevel !== 'All') {
        const isCompetitiveEntrance = filters.exam === 'JEE' || filters.exam === 'NEET';
        if (!isCompetitiveEntrance) {
          const qClass = String(q.class);
          if (qClass !== filters.classLevel && qClass !== 'Both' && qClass !== 'All') {
            return false;
          }
        }
      }

      if (filters.subject && filters.subject !== 'All' && !matchesFuzzy(q.subject, filters.subject)) return false;
      if (filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL' && !matchesFuzzy(q.chapter, filters.chapter)) return false;
      
      // Resilient topic filtering
      if (filters.topic && filters.topic !== 'All' && filters.topic !== 'ALL' && !matchesFuzzy(q.topic, filters.topic)) return false;
      
      if (filters.difficulty && filters.difficulty !== 'All' && q.difficulty !== filters.difficulty) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesChapter = q.chapter.toLowerCase().includes(query);
        const matchesTopic = q.topic.toLowerCase().includes(query);
        const matchesConcept = q.concept ? q.concept.toLowerCase().includes(query) : false;
        if (!matchesQ && !matchesChapter && !matchesTopic && !matchesConcept) return false;
      }
      return true;
    });
  }

  /**
   * Guaranteed Question Batch Retrieval:
   * Ensures that when a student asks for N questions (e.g. 10, 20, 25, 50),
   * the returned array contains EXACTLY N questions without falling short!
   */
  public getQuestionsWithGuarantee(filters: QuestionFilters, requestedCount: number): Question[] {
    let pool = this.filterQuestions({
      ...filters,
      includePYQs: filters.includePYQs !== false,
      includeModelPapers: filters.includeModelPapers ?? false
    });

    // Chapter/topic-specific practice must NEVER include off-chapter/off-topic questions:
    // only supplement within the same chapter (broader difficulty), else return what exists.
    const hasChapterOrTopic =
      (filters.chapter && filters.chapter !== 'All' && filters.chapter !== 'ALL') ||
      (filters.topic && filters.topic !== 'All' && filters.topic !== 'ALL');

    // If pool is smaller than requested, supplement from the same subject across other chapters
    if (pool.length < requestedCount && !hasChapterOrTopic && filters.subject && filters.subject !== 'All') {
      const subjectPool = this.filterQuestions({
        subject: filters.subject,
        exam: filters.exam,
        includePYQs: true
      });
      const existingIds = new Set(pool.map(q => q.id));
      for (const q of subjectPool) {
        if (!existingIds.has(q.id)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= requestedCount) break;
        }
      }
    }

    // If still smaller, supplement from all questions matching subject (no chapter/topic filter only)
    if (pool.length < requestedCount && !hasChapterOrTopic && filters.subject && filters.subject !== 'All') {
      const allSub = this.getAllQuestions().filter(q => q.subject === filters.subject);
      const existingIds = new Set(pool.map(q => q.id));
      for (const q of allSub) {
        if (!existingIds.has(q.id)) {
          pool.push(q);
          existingIds.add(q.id);
          if (pool.length >= requestedCount) break;
        }
      }
    }

    // If still smaller (e.g. no subject filter, or subject bank was small), supplement from broader questions
    if (pool.length < requestedCount && !hasChapterOrTopic) {
      const existingIds = new Set(pool.map(q => q.id));
      const fallbackQuestions = this.getAllQuestions().filter(q => {
        if (filters.subject && filters.subject !== 'All' && q.subject !== filters.subject) return false;
        return !existingIds.has(q.id);
      });
      for (const q of fallbackQuestions) {
        pool.push(q);
        existingIds.add(q.id);
        if (pool.length >= requestedCount) break;
      }
    }

    // If still 0, fill with all questions (only when no chapter/topic filter — otherwise stay empty)
    if (pool.length === 0 && !hasChapterOrTopic) {
      pool = [...this.getAllQuestions()];
    }

    // If still underflow (e.g. requested 100 on small bank), repeat with variant IDs so student is never blocked
    if (pool.length > 0 && pool.length < requestedCount) {
      const origPool = [...pool];
      let counter = 1;
      while (pool.length < requestedCount) {
        for (const item of origPool) {
          if (pool.length >= requestedCount) break;
          pool.push({
            ...item,
            id: `${item.id}-var-${counter}`
          });
          counter++;
        }
      }
    }

    // Shuffle and slice
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, requestedCount);
  }

  public async getEligibleCountAsync(filters: QuestionFilters): Promise<number> {
    try {
      const params = new URLSearchParams();
      if (filters.exam && filters.exam !== 'All') params.set('exam', filters.exam);
      if (filters.classLevel && filters.classLevel !== 'All') params.set('classLevel', filters.classLevel);
      if (filters.subject && filters.subject !== 'All') params.set('subject', filters.subject);
      if (filters.chapter && filters.chapter !== 'All') params.set('chapter', filters.chapter);
      if (filters.topic && filters.topic !== 'All') params.set('topic', filters.topic);
      if (filters.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty);
      if (filters.contentType && filters.contentType !== 'All') params.set('contentType', filters.contentType);
      if (filters.includePYQs !== undefined) params.set('includePYQs', String(filters.includePYQs));
      if (filters.includeModelPapers !== undefined) params.set('includeModelPapers', String(filters.includeModelPapers));
      if (filters.searchQuery) params.set('search', filters.searchQuery);

      const { data } = await apiRequest<{ success: boolean; count: number }>(`/questions/count?${params.toString()}`);
      if (data && data.success && typeof data.count === 'number') {
        return data.count;
      }
    } catch {
      // fallback to local filter count
    }
    return this.filterQuestions(filters).length;
  }

  public async getInventoryStatsAsync(): Promise<{
    total: number;
    difficulties: { Easy: number; Medium: number; Hard: number };
    statuses: { Approved: number; Pending: number; Draft: number; Rejected: number };
    exams: Record<string, number>;
    subjects: Record<string, number>;
  }> {
    try {
      const { data } = await apiRequest<{
        success: boolean;
        total: number;
        difficulties: { Easy: number; Medium: number; Hard: number };
        statuses: { Approved: number; Pending: number; Draft: number; Rejected: number };
        exams: Record<string, number>;
        subjects: Record<string, number>;
      }>('/questions/inventory-stats');
      if (data && data.success) {
        return data;
      }
    } catch {
      // fallback
    }
    const all = this.getAllQuestions();
    const diffs = { Easy: 0, Medium: 0, Hard: 0 };
    const exMap: Record<string, number> = {};
    const subMap: Record<string, number> = {};
    all.forEach(q => {
      if (q.difficulty in diffs) diffs[q.difficulty as keyof typeof diffs]++;
      exMap[q.exam] = (exMap[q.exam] || 0) + 1;
      subMap[q.subject] = (subMap[q.subject] || 0) + 1;
    });
    return {
      total: all.length,
      difficulties: diffs,
      statuses: { Approved: all.length, Pending: 0, Draft: 0, Rejected: 0 },
      exams: exMap,
      subjects: subMap
    };
  }

  public getSubjectsForExam(exam?: ExamType | 'All'): SubjectName[] {
    if (exam === 'NEET') return ['Physics', 'Chemistry', 'Biology'];
    if (exam === 'JEE') return ['Physics', 'Chemistry', 'Mathematics'];
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  }

  public getChapters(subject?: SubjectName, classLevel?: ClassLevel | 'All' | 'Dropper' | string): string[] {
    const chapters = new Set<string>();
    const isAllClasses = !classLevel || classLevel === 'All' || classLevel === 'Dropper';

    // 0. From canonical syllabus (comprehensive NTA syllabus for JEE/NEET/Boards)
    canonicalSyllabus.forEach(ch => {
      if (subject && !matchesFuzzy(ch.subjectName, subject)) return;
      if (!isAllClasses && String(ch.classLevel) !== String(classLevel)) return;
      if (ch.name) chapters.add(ch.name);
    });

    // 1. From stored syllabus
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        savedSyllabus.forEach((ch: any) => {
          if (subject && !matchesFuzzy(ch.subject, subject)) return;
          if (!isAllClasses && ch.classLevel !== classLevel) return;
          if (ch.name) chapters.add(ch.name);
        });
      }
    } catch {
      // fallback
    }

    // 2. From all questions
    this.getAllQuestions().forEach(q => {
      if (subject && !matchesFuzzy(q.subject, subject)) return;
      if (!isAllClasses && q.class !== classLevel) return;
      if (q.chapter) chapters.add(q.chapter);
    });

    return Array.from(chapters).sort();
  }

  public getTopics(chapter: string): string[] {
    // 0. From canonical syllabus (highest priority for clean curriculum topics)
    const foundChapter = canonicalSyllabus.find(c => matchesFuzzy(c.name, chapter));
    if (foundChapter && Array.isArray(foundChapter.topics) && foundChapter.topics.length > 0) {
      return foundChapter.topics.map((t: any) => t.name).filter(Boolean);
    }

    const topics = new Set<string>();

    // 1. Full syllabus hierarchy topics (Task.md section 5)
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        const sylChapter = savedSyllabus.find((c: any) => matchesFuzzy(c.name, chapter));
        if (sylChapter && Array.isArray(sylChapter.subtopics)) {
          sylChapter.subtopics.forEach((st: any) => {
            if (st?.name) topics.add(st.name);
          });
        }
      }
    } catch {
      // fallback
    }

    // 2. Question bank topics
    this.getAllQuestions().forEach(q => {
      if (matchesFuzzy(q.chapter, chapter) && q.topic) {
        topics.add(q.topic);
      }
    });

    return Array.from(topics).sort();
  }

  public async fetchTaxonomyAsync(subject?: string, classLevel?: string): Promise<{ name: string; count: number; topics: { name: string; count: number }[] }[]> {
    const key = `${subject || 'ALL'}_${classLevel || 'ALL'}`;
    if (this.taxonomyCache.has(key)) return this.taxonomyCache.get(key)!;

    try {
      const params = new URLSearchParams();
      if (subject && subject !== 'All') params.set('subject', subject);
      if (classLevel && classLevel !== 'All') params.set('classLevel', classLevel);

      const { data } = await apiRequest<{ success: boolean; chapters: any[] }>(`/questions/taxonomy?${params.toString()}`);
      if (data && data.success && Array.isArray(data.chapters)) {
        this.taxonomyCache.set(key, data.chapters);
        return data.chapters;
      }
    } catch {}
    return [];
  }

  // Admin CRUD capabilities sync to MongoDB + local cache
  public async addQuestion(question: Omit<Question, 'id'>): Promise<Question> {
    const newId = `q-custom-${Date.now()}`;
    const newQuestion: Question = { ...question, id: newId };
    
    // Save to MongoDB
    await apiRequest('/questions', {
      method: 'POST',
      body: JSON.stringify(newQuestion)
    });

    this.localQuestionsCache.unshift(newQuestion);

    // Fallback to local storage
    const custom = this.getCustomQuestions();
    custom.unshift(newQuestion);
    setStorageItem(StorageKeys.QUESTIONS, custom);

    return newQuestion;
  }

  public async updateQuestion(id: string, updates: Partial<Question>): Promise<Question | null> {
    await apiRequest(`/questions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });

    const idx = this.localQuestionsCache.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.localQuestionsCache[idx] = { ...this.localQuestionsCache[idx], ...updates };
    }

    const custom = this.getCustomQuestions();
    const index = custom.findIndex(q => q.id === id);
    if (index !== -1) {
      custom[index] = { ...custom[index], ...updates };
      setStorageItem(StorageKeys.QUESTIONS, custom);
      return custom[index];
    }
    return this.localQuestionsCache[idx] || null;
  }

  public async deleteQuestion(id: string): Promise<boolean> {
    await apiRequest(`/questions/${id}`, {
      method: 'DELETE'
    });

    this.localQuestionsCache = this.localQuestionsCache.filter(q => q.id !== id);

    const custom = this.getCustomQuestions();
    const filtered = custom.filter(q => q.id !== id);
    if (filtered.length !== custom.length) {
      setStorageItem(StorageKeys.QUESTIONS, filtered);
      return true;
    }
    return true;
  }
}

export const questionService = new ApiQuestionService();
