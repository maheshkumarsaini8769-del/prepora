import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel, ContentType } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';
import { apiRequest } from './apiClient';

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
}

class ApiQuestionService {
  private localQuestionsCache: Question[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const { data, error } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=15000');
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
    const { data } = await apiRequest<{ success: boolean; questions: Question[] }>('/questions?limit=15000');
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

  public filterQuestions(filters: QuestionFilters): Question[] {
    return this.getAllQuestions().filter(q => {
      // Content Type Isolation (Task.md section 1, 2, 4, 6)
      const isModelPaper = q.contentType === 'MODEL_PAPER' || q.source === 'Model Paper';
      const isPYQ = q.contentType === 'PYQ' || q.source === 'PYQ';

      if (filters.contentType && filters.contentType !== 'All') {
        const resolvedType = q.contentType || (isModelPaper ? 'MODEL_PAPER' : isPYQ ? 'PYQ' : 'QUESTION_BANK');
        if (resolvedType !== filters.contentType) return false;
      } else {
        // By default: NEVER include Model Papers in normal test/practice pool
        if (!filters.includeModelPapers && isModelPaper) return false;
        // By default: Do not mix PYQs unless explicitly enabled
        if (!filters.includePYQs && isPYQ) return false;
      }

      if (filters.exam && filters.exam !== 'All') {
        if (filters.exam === 'Board') {
          if (q.exam !== 'Board' && q.exam !== 'CBSE' && q.exam !== 'RBSE') return false;
        } else if (q.exam !== filters.exam) {
          return false;
        }
      }
      if (filters.classLevel && filters.classLevel !== 'All' && q.class !== filters.classLevel) return false;
      if (filters.subject && filters.subject !== 'All' && q.subject !== filters.subject) return false;
      if (filters.chapter && filters.chapter !== 'All' && q.chapter.toLowerCase() !== filters.chapter.toLowerCase()) return false;
      
      // Exact topic filtering (Task.md section 5, 6, 7)
      if (filters.topic && filters.topic !== 'All' && q.topic.toLowerCase() !== filters.topic.toLowerCase()) return false;
      
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

  public getChapters(subject?: SubjectName, classLevel?: ClassLevel | 'All'): string[] {
    const chapters = new Set<string>();

    // 1. From stored syllabus
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        savedSyllabus.forEach((ch: any) => {
          if (subject && ch.subject !== subject) return;
          if (classLevel && classLevel !== 'All' && ch.classLevel !== classLevel) return;
          if (ch.name) chapters.add(ch.name);
        });
      }
    } catch {
      // fallback
    }

    // 2. From all questions
    this.getAllQuestions().forEach(q => {
      if (subject && q.subject !== subject) return;
      if (classLevel && classLevel !== 'All' && q.class !== classLevel) return;
      if (q.chapter) chapters.add(q.chapter);
    });

    return Array.from(chapters).sort();
  }

  public getTopics(chapter: string): string[] {
    const topics = new Set<string>();

    // 1. Full syllabus hierarchy topics (Task.md section 5)
    try {
      const savedSyllabus = getStorageItem<any[]>('prepora_syllabus', []);
      if (Array.isArray(savedSyllabus)) {
        const sylChapter = savedSyllabus.find((c: any) => c.name?.toLowerCase() === chapter.toLowerCase());
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
      if (q.chapter?.toLowerCase() === chapter.toLowerCase() && q.topic) {
        topics.add(q.topic);
      }
    });

    return Array.from(topics).sort();
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
