import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../types';
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
      if (filters.exam && filters.exam !== 'All') {
        if (filters.exam === 'Board') {
          if (q.exam !== 'Board' && q.exam !== 'CBSE' && q.exam !== 'RBSE') return false;
        } else if (q.exam !== filters.exam) {
          return false;
        }
      }
      if (filters.classLevel && filters.classLevel !== 'All' && q.class !== filters.classLevel) return false;
      if (filters.subject && filters.subject !== 'All' && q.subject !== filters.subject) return false;
      if (filters.chapter && filters.chapter !== 'All' && q.chapter !== filters.chapter) return false;
      if (filters.topic && filters.topic !== 'All' && q.topic !== filters.topic) return false;
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

  public getSubjectsForExam(exam?: ExamType | 'All'): SubjectName[] {
    if (exam === 'NEET') return ['Physics', 'Chemistry', 'Biology'];
    if (exam === 'JEE') return ['Physics', 'Chemistry', 'Mathematics'];
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  }

  public getChapters(subject?: SubjectName, classLevel?: ClassLevel | 'All'): string[] {
    const questions = this.getAllQuestions().filter(q => {
      if (subject && q.subject !== subject) return false;
      if (classLevel && classLevel !== 'All' && q.class !== classLevel) return false;
      return true;
    });
    return Array.from(new Set(questions.map(q => q.chapter))).sort();
  }

  public getTopics(chapter: string): string[] {
    const questions = this.getAllQuestions().filter(q => q.chapter === chapter);
    return Array.from(new Set(questions.map(q => q.topic))).sort();
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
