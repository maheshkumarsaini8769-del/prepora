import {
  CanonicalSyllabusChapter,
  SyllabusTopic,
  CanonicalExam,
  CanonicalSubjectId,
  SubjectName,
  ExamType,
  ClassLevel,
  PreparationType,
  SyllabusChapterStatus
} from '../types';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { testService } from './testService';
import { userService } from './userService';

const USER_SYLLABUS_PROGRESS_KEY = 'prepora_user_syllabus_progress';

export interface ChapterProgressRecord {
  status: SyllabusChapterStatus;
  progressPercent: number;
  lastPracticedDate?: string;
  totalAttempts?: number;
  correctAttempts?: number;
}

export interface SyllabusMasterySummary {
  totalChapters: number;
  practicedChapters: number;
  masteredChapters: number;
  coveragePercent: number;
  masteryPercent: number;
  bySubject: Record<string, {
    total: number;
    practiced: number;
    mastered: number;
    coveragePercent: number;
    masteryPercent: number;
  }>;
}

class SyllabusService {
  private memoryCache: CanonicalSyllabusChapter[] = canonicalSyllabus;
  private hasSynced = false;

  public getAllChapters(): CanonicalSyllabusChapter[] {
    return this.memoryCache;
  }

  /**
   * Resolve various exam strings ('JEE', 'JEE Main', 'JEE_MAIN') to CanonicalExam.
   */
  public resolveCanonicalExam(exam: string): CanonicalExam {
    const norm = (exam || '').toUpperCase().trim();
    if (norm === 'JEE' || norm === 'JEE_MAIN' || norm === 'JEE MAIN') return 'JEE_MAIN';
    if (norm.includes('ADVANCED') || norm === 'JEE_ADVANCED') return 'JEE_ADVANCED';
    if (norm.includes('NEET') || norm === 'NEET_UG') return 'NEET_UG';
    if (norm.includes('RBSE')) return 'RBSE';
    if (norm.includes('CBSE') || norm === 'BOARD') return 'CBSE';
    return 'JEE_MAIN';
  }

  /**
   * Filter chapters by exam, class, and optionally subject.
   */
  public getChapters(filters?: {
    exam?: string;
    classLevel?: string;
    subject?: string;
    preparationType?: PreparationType;
  }): CanonicalSyllabusChapter[] {
    let list = this.memoryCache;
    if (!filters) return list;

    const targetExam = filters.exam ? this.resolveCanonicalExam(filters.exam) : undefined;

    return list.filter(ch => {
      if (targetExam && ch.examId !== targetExam) return false;
      if (filters.classLevel && filters.classLevel !== 'All' && filters.classLevel !== 'Dropper') {
        if (ch.classLevel !== filters.classLevel) return false;
      }
      if (filters.subject && filters.subject !== 'All') {
        const subUpper = filters.subject.toUpperCase();
        if (ch.subjectId !== subUpper && ch.subjectName.toUpperCase() !== subUpper) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Find a specific chapter by ID, chapterId, or name.
   */
  public getChapter(identifier: string, exam?: string, classLevel?: string): CanonicalSyllabusChapter | undefined {
    const norm = (identifier || '').toLowerCase().trim();
    const canExam = exam ? this.resolveCanonicalExam(exam) : undefined;

    return this.memoryCache.find(ch => {
      const matchExam = !canExam || ch.examId === canExam;
      const matchClass = !classLevel || ch.classLevel === classLevel;
      const matchName = ch.name.toLowerCase() === norm ||
                        ch.chapterId.toLowerCase() === norm.replace(/[^a-z0-9]+/g, '_') ||
                        ch.id.toLowerCase() === norm;
      return matchExam && matchClass && matchName;
    }) || this.memoryCache.find(ch => ch.name.toLowerCase() === norm || ch.chapterId.toLowerCase() === norm.replace(/[^a-z0-9]+/g, '_'));
  }

  /**
   * Get list of subjects for a given preparation/exam.
   */
  public getSubjectsForPreparation(prepTypeOrExam: string): Array<{ id: CanonicalSubjectId; name: SubjectName }> {
    const norm = (prepTypeOrExam || '').toUpperCase();
    if (norm.includes('NEET')) {
      return [
        { id: 'PHYSICS', name: 'Physics' },
        { id: 'CHEMISTRY', name: 'Chemistry' },
        { id: 'BIOLOGY', name: 'Biology' }
      ];
    }
    if (norm.includes('JEE')) {
      return [
        { id: 'PHYSICS', name: 'Physics' },
        { id: 'CHEMISTRY', name: 'Chemistry' },
        { id: 'MATHEMATICS', name: 'Mathematics' }
      ];
    }
    // CBSE / RBSE
    return [
      { id: 'PHYSICS', name: 'Physics' },
      { id: 'CHEMISTRY', name: 'Chemistry' },
      { id: 'MATHEMATICS', name: 'Mathematics' },
      { id: 'BIOLOGY', name: 'Biology' }
    ];
  }

  /**
   * Get student's personal progress for a chapter.
   */
  public getChapterProgress(chapterId: string): ChapterProgressRecord {
    const map = getStorageItem<Record<string, ChapterProgressRecord>>(USER_SYLLABUS_PROGRESS_KEY, {});
    if (map[chapterId]) {
      return map[chapterId];
    }
    // Calculate dynamically from real test attempts and mistake book
    const attempts = testService.getAllAttempts();
    const mistakes = userService.getMistakes();

    let attemptsCount = 0;
    let correctCount = 0;

    const chapterObj = this.getChapter(chapterId);
    const chapterName = chapterObj ? chapterObj.name.toLowerCase() : chapterId.toLowerCase();

    attempts.forEach(att => {
      // If attempt recorded subject breakdown
      if (att.testTitle && att.testTitle.toLowerCase().includes(chapterName)) {
        attemptsCount += att.totalQuestions || 0;
        correctCount += att.correctCount || 0;
      }
    });

    const chapterMistakes = mistakes.filter(m => m.chapter.toLowerCase() === chapterName);

    if (attemptsCount === 0 && chapterMistakes.length === 0) {
      return {
        status: 'Not Started',
        progressPercent: 0,
        totalAttempts: 0,
        correctAttempts: 0
      };
    }

    const accuracy = attemptsCount > 0 ? Math.round((correctCount / attemptsCount) * 100) : 0;
    let status: SyllabusChapterStatus = 'Learning';
    if (accuracy >= 80 && attemptsCount >= 10) status = 'Strong';
    else if (accuracy >= 60) status = 'Practicing';
    else if (chapterMistakes.length > 2) status = 'Needs Revision';

    return {
      status,
      progressPercent: accuracy,
      totalAttempts: attemptsCount,
      correctAttempts: correctCount
    };
  }

  /**
   * Update student chapter progress.
   */
  public updateChapterProgress(chapterId: string, updates: Partial<ChapterProgressRecord>): void {
    const map = getStorageItem<Record<string, ChapterProgressRecord>>(USER_SYLLABUS_PROGRESS_KEY, {});
    const current = map[chapterId] || this.getChapterProgress(chapterId);
    map[chapterId] = {
      ...current,
      ...updates,
      lastPracticedDate: new Date().toISOString().split('T')[0]
    };
    setStorageItem(USER_SYLLABUS_PROGRESS_KEY, map);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prepora:syllabus_updated', { detail: { chapterId, updates } }));
    }
  }

  /**
   * Real Mastery & Coverage Calculation (Strictly distinguishes Coverage from Mastery).
   */
  public getMasterySummary(exam?: string, filterParam?: string): SyllabusMasterySummary {
    let classLevel: string | undefined = undefined;
    let subject: string | undefined = undefined;

    if (filterParam === '11' || filterParam === '12') {
      classLevel = filterParam;
    } else if (filterParam && filterParam !== 'All') {
      subject = filterParam;
    }

    const chapters = this.getChapters({ exam, classLevel, subject });
    const progressMap = getStorageItem<Record<string, ChapterProgressRecord>>(USER_SYLLABUS_PROGRESS_KEY, {});

    let practicedChapters = 0;
    let masteredChapters = 0;

    const bySubject: SyllabusMasterySummary['bySubject'] = {};

    chapters.forEach(ch => {
      const p = progressMap[ch.id] || progressMap[ch.chapterId] || this.getChapterProgress(ch.chapterId);
      const isPracticed = p.status !== 'Not Started' || (p.totalAttempts || 0) > 0;
      const isMastered = p.status === 'Strong' || p.status === 'Completed' || p.progressPercent >= 80;

      if (isPracticed) practicedChapters++;
      if (isMastered) masteredChapters++;

      if (!bySubject[ch.subjectName]) {
        bySubject[ch.subjectName] = { total: 0, practiced: 0, mastered: 0, coveragePercent: 0, masteryPercent: 0 };
      }
      bySubject[ch.subjectName].total++;
      if (isPracticed) bySubject[ch.subjectName].practiced++;
      if (isMastered) bySubject[ch.subjectName].mastered++;
    });

    Object.keys(bySubject).forEach(sub => {
      const s = bySubject[sub];
      s.coveragePercent = s.total > 0 ? Math.round((s.practiced / s.total) * 100) : 0;
      s.masteryPercent = s.total > 0 ? Math.round((s.mastered / s.total) * 100) : 0;
    });

    const total = chapters.length || 1;
    return {
      totalChapters: chapters.length,
      practicedChapters,
      masteredChapters,
      coveragePercent: Math.round((practicedChapters / total) * 100),
      masteryPercent: Math.round((masteredChapters / total) * 100),
      bySubject
    };
  }

  /**
   * Sync with Express backend /api/syllabus non-blockingly.
   */
  public async syncWithBackend(): Promise<void> {
    if (this.hasSynced) return;
    try {
      const res = await fetch('/api/syllabus');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.chapters) && data.chapters.length > 0) {
          this.memoryCache = data.chapters;
          this.hasSynced = true;
        }
      }
    } catch {
      // Keep authoritative canonicalSyllabus
    }
  }
}

export const syllabusService = new SyllabusService();
syllabusService.syncWithBackend().catch(() => {});
