import { Test, TestAttempt, TestAnswer, SubjectScoreBreakdown, Question, ExamType, SubjectName, DifficultyLevel, ClassLevel } from '../types';
import { mockTests } from '../data/mockData';
import { questionService } from './questionService';
import { userService } from './userService';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';

import { apiRequest } from './apiClient';

export interface CustomTestOptions {
  title?: string;
  exam: ExamType;
  classLevel?: ClassLevel;
  subjects: SubjectName[];
  chapters?: string[];
  topics?: string[];
  topic?: string;
  includePYQs?: boolean;
  questionCount: number;
  difficulty: DifficultyLevel | 'Mixed';
  durationMinutes: number;
  negativeMarking: boolean;
  excludeQuestionIds?: string[];
  userId?: string;
}

class ApiTestService {
  private localTestsCache: Test[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const { data } = await apiRequest<{ success: boolean; tests: Test[] }>('/tests');
      if (data && data.success && data.tests) {
        this.localTestsCache = data.tests;
      }
    } catch {
      // fallback
    }
  }

  private getCustomTests(): Test[] {
    return getStorageItem<Test[]>('prepora_custom_tests', []);
  }

  public getAllTests(): Test[] {
    const custom = this.getCustomTests();
    const attempts = this.getAllAttempts();
    const attemptedTestIds = new Set(attempts.map(a => a.testId));

    const sourceTests = this.localTestsCache;
    return [...custom, ...sourceTests].map(t => ({
      ...t,
      isAttempted: attemptedTestIds.has(t.id),
      lastAttemptScore: attempts.find(a => a.testId === t.id)?.totalScore
    }));
  }

  public async fetchAllTestsAsync(): Promise<Test[]> {
    const { data } = await apiRequest<{ success: boolean; tests: Test[] }>('/tests');
    if (data && data.success && data.tests) {
      this.localTestsCache = data.tests;
    }
    return this.getAllTests();
  }

  public getTestById(id: string): Test | undefined {
    return this.getAllTests().find(t => t.id === id);
  }

  public async getTestByIdAsync(id: string): Promise<{ test?: Test; questions?: Question[] } | null> {
    const { data } = await apiRequest<{ success: boolean; test: Test; questions: Question[] }>(`/tests/${id}`);
    if (data && data.success) {
      return { test: data.test, questions: data.questions };
    }
    const local = this.getTestById(id);
    if (local) {
      const qList = questionService.getQuestionsByIds(local.questionIds);
      return { test: local, questions: qList };
    }
    return null;
  }

  public async buildCustomTestAsync(options: CustomTestOptions): Promise<{
    success: boolean;
    test?: Test;
    message?: string;
    isUnderflow?: boolean;
    availableCount?: number;
    requestedCount?: number;
  }> {
    try {
      const activeUserId = options.userId || userService.getProfile()?.id;
      const payload = {
        ...options,
        userId: activeUserId
      };
      const { data, error } = await apiRequest<{
        success: boolean;
        test?: Test;
        message?: string;
        isUnderflow?: boolean;
        availableCount?: number;
        requestedCount?: number;
      }>('/tests/build-custom', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (data && data.success && data.test) {
        const custom = this.getCustomTests();
        custom.unshift(data.test);
        setStorageItem('prepora_custom_tests', custom);
        return { success: true, test: data.test };
      }

      if (data && data.isUnderflow) {
        // Chapter/topic-specific underflow: surface to UI (its underflow modal offers
        // "Continue with N" / "Generate more with AI"). Never pad off-chapter here.
        return {
          success: false,
          isUnderflow: true,
          availableCount: data.availableCount ?? 0,
          requestedCount: data.requestedCount ?? options.questionCount
        };
      }

      if (error || (data && !data.success)) {
        return this.buildCustomTest(options);
      }
    } catch {
      // offline fallback
    }

    return this.buildCustomTest(options);
  }

  public buildCustomTest(options: CustomTestOptions): { 
    success: boolean; 
    test?: Test; 
    message?: string;
    isUnderflow?: boolean;
    availableCount?: number;
    requestedCount?: number;
  } {
    // Build complete set of questions to EXCLUDE (so students NEVER get repeated questions)
    const excludeSet = new Set<string>(
      Array.isArray(options.excludeQuestionIds) ? options.excludeQuestionIds : []
    );
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      if (Array.isArray(stored)) {
        stored.forEach((id: string) => excludeSet.add(id));
      }
    } catch {}

    let pool = questionService.filterQuestions({
      exam: options.exam,
      classLevel: (options.exam === 'JEE' || options.exam === 'NEET') ? undefined : options.classLevel,
      difficulty: options.difficulty === 'Mixed' ? 'All' : options.difficulty,
      includePYQs: options.includePYQs !== false,
      includeModelPapers: false, // Model Papers must NEVER accidentally enter normal tests! (Task.md section 1, 2)
      topic: options.topic && options.topic !== 'All' ? options.topic : undefined
    }).filter(q => {
      if (excludeSet.has(q.id)) return false;
      if (!options.subjects.includes(q.subject)) return false;
      if (options.chapters && options.chapters.length > 0 && !options.chapters.includes('ALL') && !options.chapters.some(c => c.toLowerCase() === (q.chapter || '').toLowerCase())) return false;
      if (options.topics && options.topics.length > 0 && !options.topics.includes('ALL') && !options.topics.some(t => t.toLowerCase() === (q.topic || '').toLowerCase())) return false;
      return true;
    });

    const hasChapterOrTopic =
      (options.chapters && options.chapters.length > 0 && !options.chapters.includes('ALL')) ||
      (options.topics && options.topics.length > 0 && !options.topics.includes('ALL')) ||
      !!(options.topic && options.topic !== 'All' && options.topic !== 'ALL');

    // Chapter/topic-specific tests must NEVER pad with off-chapter/off-topic questions —
    // surface underflow to the UI modal (Continue with N / Generate more with AI) instead.
    if (pool.length < options.questionCount && hasChapterOrTopic) {
      return {
        success: false,
        isUnderflow: true,
        availableCount: pool.length,
        requestedCount: options.questionCount
      };
    }

    // Supplement from broader subject pool if exact criteria is underflow, so student test generation never fails
    if (pool.length < options.questionCount) {
      const existingIds = new Set(pool.map(q => q.id));
      const fallbackQuestions = questionService.getAllQuestions().filter(q => 
        options.subjects.includes(q.subject) && !existingIds.has(q.id) && !excludeSet.has(q.id)
      );
      const shuffledFallback = [...fallbackQuestions].sort(() => 0.5 - Math.random());
      for (const q of shuffledFallback) {
        pool.push(q);
        existingIds.add(q.id);
        if (pool.length >= options.questionCount) break;
      }
    }

    // If still underflow, repeat questions with variant IDs
    if (pool.length > 0 && pool.length < options.questionCount) {
      const origPool = [...pool];
      let counter = 1;
      while (pool.length < options.questionCount) {
        for (const item of origPool) {
          if (pool.length >= options.questionCount) break;
          pool.push({
            ...item,
            id: `${item.id}-var-${counter}`
          });
          counter++;
        }
      }
    }

    if (pool.length === 0) {
      return {
        success: false,
        message: `No questions found matching ${options.subjects.join(', ')} for ${options.exam}.`
      };
    }

    // Uniform random selection without duplicate questions (Task.md section 32, 34)
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, options.questionCount);
    const questionIds = Array.from(new Set(selected.map(q => q.id)));

    const markPerQ = 4;
    const maxScore = questionIds.length * markPerQ;

    const newTest: Test = {
      id: `custom-test-${Date.now()}`,
      title: options.title || `Custom ${options.exam} Test (${questionIds.length} Qs)`,
      exam: options.exam,
      classLevel: options.classLevel,
      subjects: options.subjects,
      chapters: options.chapters,
      totalQuestions: questionIds.length,
      durationMinutes: options.durationMinutes,
      difficulty: options.difficulty,
      questionIds,
      category: 'Custom Test',
      isAttempted: false,
      maxScore,
      negativeMarking: options.negativeMarking
    };

    const custom = this.getCustomTests();
    custom.unshift(newTest);
    setStorageItem('prepora_custom_tests', custom);

    return { success: true, test: newTest };
  }

  // Attempts Management
  public getAllAttempts(): TestAttempt[] {
    return getStorageItem<TestAttempt[]>(StorageKeys.TEST_ATTEMPTS, []);
  }

  public getAttemptById(attemptId: string): TestAttempt | undefined {
    return this.getAllAttempts().find(a => a.id === attemptId);
  }

  public calculateAndSaveAttempt(
    test: Test,
    answers: Record<string, TestAnswer>,
    timeTakenSeconds: number
  ): TestAttempt {
    const questions = questionService.getQuestionsByIds(test.questionIds).slice(0, test.totalQuestions);
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    let speedMasterCount = 0;
    let timeDrainerCount = 0;
    let negativeTrapCount = 0;

    let fastestQ: { questionId: string; timeSpentSeconds: number; isCorrect: boolean } | undefined;
    let slowestQ: { questionId: string; timeSpentSeconds: number; isCorrect: boolean } | undefined;

    const subjectData: Record<SubjectName, { 
      total: number; 
      attempted: number; 
      correct: number; 
      wrong: number; 
      score: number;
      timeSpentSeconds: number;
    }> = {
      Physics: { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpentSeconds: 0 },
      Chemistry: { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpentSeconds: 0 },
      Mathematics: { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpentSeconds: 0 },
      Biology: { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpentSeconds: 0 }
    };

    const topicStats: Record<string, { correct: number; total: number }> = {};
    const updatedAnswers: Record<string, TestAnswer> = { ...answers };

    questions.forEach(q => {
      const sub = q.subject;
      if (!subjectData[sub]) {
        subjectData[sub] = { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSpentSeconds: 0 };
      }
      subjectData[sub].total += 1;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0 };
      }
      topicStats[q.topic].total += 1;

      const userAnsObj = updatedAnswers[q.id];
      const userAns = userAnsObj?.selectedAnswer;
      const isAns = userAns !== null && userAns !== undefined;

      const recTime = q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150);
      const timeSpent = userAnsObj?.timeSpentSeconds || 0;
      subjectData[sub].timeSpentSeconds += timeSpent;

      let tag: import('../types').TimeTag = 'Normal';

      if (!isAns) {
        unattemptedCount += 1;
        tag = 'Unattempted';
      } else {
        subjectData[sub].attempted += 1;
        const isCorrect = userAns === q.correctAnswer;

        if (isCorrect) {
          correctCount += 1;
          const marks = 4;
          totalScore += marks;
          subjectData[sub].correct += 1;
          subjectData[sub].score += marks;
          topicStats[q.topic].correct += 1;

          if (timeSpent <= recTime) {
            tag = 'Speed Master';
            speedMasterCount += 1;
          } else if (timeSpent >= recTime * 2.2) {
            tag = 'Time Drainer';
            timeDrainerCount += 1;
          }
        } else {
          wrongCount += 1;
          const penalty = test.negativeMarking ? 1 : 0;
          totalScore -= penalty;
          subjectData[sub].wrong += 1;
          subjectData[sub].score -= penalty;

          if (timeSpent >= recTime * 1.5) {
            tag = 'Negative Trap';
            negativeTrapCount += 1;
          }

          // Automatically record into Mistake Book
          this.recordMistake(q, userAns);
        }

        // Check fastest/slowest
        if (!fastestQ || timeSpent < fastestQ.timeSpentSeconds) {
          fastestQ = { questionId: q.id, timeSpentSeconds: timeSpent, isCorrect };
        }
        if (!slowestQ || timeSpent > slowestQ.timeSpentSeconds) {
          slowestQ = { questionId: q.id, timeSpentSeconds: timeSpent, isCorrect };
        }
      }

      // Update answer with analytics
      updatedAnswers[q.id] = {
        ...(userAnsObj || {
          questionId: q.id,
          selectedAnswer: null,
          isAnswered: false,
          isMarkedForReview: false,
          isVisited: true,
          timeSpentSeconds: 0
        }),
        recommendedTimeSeconds: recTime,
        timeTag: tag
      };
    });

    const totalQuestions = questions.length;
    const accuracyPercentage = (correctCount + wrongCount > 0)
      ? Math.round((correctCount / (correctCount + wrongCount)) * 100)
      : 0;

    const subjectBreakdown: SubjectScoreBreakdown[] = Object.entries(subjectData)
      .filter(([_, stats]) => stats.total > 0)
      .map(([name, stats]) => {
        const subName = name as SubjectName;
        const recMin = test.subjectTimePlan?.[subName] || Math.round((stats.total / totalQuestions) * test.durationMinutes);
        return {
          subject: subName,
          totalQuestions: stats.total,
          attempted: stats.attempted,
          correct: stats.correct,
          wrong: stats.wrong,
          score: stats.score,
          maxScore: stats.total * 4,
          accuracyPercentage: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
          timeSpentSeconds: stats.timeSpentSeconds,
          recommendedMinutes: recMin
        };
      });

    const strongTopics: string[] = [];
    const weakTopics: string[] = [];

    Object.entries(topicStats).forEach(([topic, stats]) => {
      const acc = Math.round((stats.correct / stats.total) * 100);
      if (acc >= 75) strongTopics.push(topic);
      else weakTopics.push(topic);
    });

    // Generate rule-based Time Coach Insights
    const timeCoachInsights: string[] = [];

    if (negativeTrapCount > 0) {
      timeCoachInsights.push(
        `Negative Trap Warning: You spent excessive time on ${negativeTrapCount} question(s) that resulted in negative marks (-${negativeTrapCount}). Consider applying a strict 2-minute cutoff rule.`
      );
    }

    if (speedMasterCount > 0) {
      timeCoachInsights.push(
        `High Velocity: ${speedMasterCount} questions were solved accurately within recommended time limits (Speed Master). Keep up this direct formula application!`
      );
    }

    if (timeDrainerCount > 0) {
      timeCoachInsights.push(
        `Time Leaks: ${timeDrainerCount} questions took more than double the target duration despite being correct. Work on algebraic shortcuts and dimensional elimination.`
      );
    }

    // Check subject over-allocation
    subjectBreakdown.forEach(sub => {
      const spentMin = Math.round((sub.timeSpentSeconds || 0) / 60);
      const recMin = sub.recommendedMinutes || 0;
      if (recMin > 0 && spentMin > recMin + 3) {
        timeCoachInsights.push(
          `Subject Budgeting: You spent ${spentMin} mins on ${sub.subject} against a recommended plan of ${recMin} mins (+${spentMin - recMin}m overrun).`
        );
      }
    });

    if (timeCoachInsights.length === 0) {
      timeCoachInsights.push('Solid pacing! Your time allocation was well-balanced across all tested sections.');
    }

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      timestamp: new Date().toISOString(),
      durationMinutes: test.durationMinutes,
      timeTakenSeconds,
      totalScore: Math.max(0, totalScore),
      maxScore: test.maxScore,
      totalQuestions,
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracyPercentage,
      answers: updatedAnswers,
      subjectBreakdown,
      strongTopics,
      weakTopics,
      avgTimePerQuestionSeconds: Math.round(timeTakenSeconds / Math.max(1, totalQuestions)),
      fastestQuestion: fastestQ,
      slowestQuestion: slowestQ,
      speedMasterCount,
      timeDrainerCount,
      negativeTrapCount,
      timeCoachInsights
    };

    const attempts = this.getAllAttempts();
    attempts.unshift(attempt);
    setStorageItem(StorageKeys.TEST_ATTEMPTS, attempts);
    userService.recordTestCompleted(attempt);

    // Persist all attempted question IDs so they are never repeated in future tests
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      const qIds: string[] = [];
      if (Array.isArray(test.questionIds)) {
        qIds.push(...test.questionIds);
      }
      if (attempt.answers && typeof attempt.answers === 'object') {
        Object.keys(attempt.answers).forEach(k => qIds.push(k));
        Object.values(attempt.answers).forEach((ans: any) => {
          if (ans?.questionId) qIds.push(ans.questionId);
        });
      }
      const merged = Array.from(new Set([...stored, ...qIds]));
      localStorage.setItem('prepora_attempted_question_ids', JSON.stringify(merged));
    } catch {}

    // Asynchronously submit to MongoDB backend for persistence & server evaluation
    const currentUserId = userService.getProfile()?.id || 'usr-default';
    apiRequest('/attempts/submit', {
      method: 'POST',
      body: JSON.stringify({
        testId: test.id,
        userId: currentUserId,
        answers: updatedAnswers,
        timeTakenSeconds
      })
    }).catch(err => console.warn('Background backend sync failed:', err));

    return attempt;
  }

  public saveAttempt(attempt: TestAttempt): void {
    const attempts = this.getAllAttempts();
    const existingIndex = attempts.findIndex(a => a.id === attempt.id);
    if (existingIndex !== -1) {
      attempts[existingIndex] = attempt;
    } else {
      attempts.unshift(attempt);
    }
    setStorageItem(StorageKeys.TEST_ATTEMPTS, attempts);
    userService.recordTestCompleted(attempt);

    // Persist all attempted question IDs so they are never repeated in future tests
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      const qIds: string[] = [];
      const targetTest = this.getTestById(attempt.testId);
      if (targetTest && Array.isArray(targetTest.questionIds)) {
        qIds.push(...targetTest.questionIds);
      }
      if (attempt.answers && typeof attempt.answers === 'object') {
        Object.keys(attempt.answers).forEach(k => qIds.push(k));
        Object.values(attempt.answers).forEach((ans: any) => {
          if (ans?.questionId) qIds.push(ans.questionId);
        });
      }
      const merged = Array.from(new Set([...stored, ...qIds]));
      localStorage.setItem('prepora_attempted_question_ids', JSON.stringify(merged));
    } catch {}
  }

  public updateMistakeTag(
    questionId: string, 
    mistakeReason: import('../types').MistakeReason, 
    mistakeNote?: string
  ): void {
    // 1. Update in Mistake Book
    const mistakes = getStorageItem<any[]>(StorageKeys.MISTAKES, []);
    const idx = mistakes.findIndex(m => m.questionId === questionId);
    if (idx !== -1) {
      mistakes[idx].mistakeReason = mistakeReason;
      if (mistakeNote !== undefined) {
        mistakes[idx].mistakeNote = mistakeNote;
      }
      setStorageItem(StorageKeys.MISTAKES, mistakes);
    }

    // 2. Update in most recent test attempt answers if applicable
    const attempts = this.getAllAttempts();
    if (attempts.length > 0) {
      let updated = false;
      for (const att of attempts) {
        if (att.answers[questionId]) {
          att.answers[questionId].mistakeReason = mistakeReason;
          if (mistakeNote !== undefined) {
            att.answers[questionId].mistakeNote = mistakeNote;
          }
          updated = true;
          break;
        }
      }
      if (updated) {
        setStorageItem(StorageKeys.TEST_ATTEMPTS, attempts);
      }
    }
  }

  private recordMistake(question: Question, userAns: number): void {
    const mistakes = getStorageItem<any[]>(StorageKeys.MISTAKES, []);
    const existingIndex = mistakes.findIndex(m => m.questionId === question.id);
    if (existingIndex !== -1) {
      mistakes[existingIndex].mistakeCount += 1;
      mistakes[existingIndex].lastAttemptedDate = new Date().toISOString().split('T')[0];
      mistakes[existingIndex].userWrongAnswer = userAns;
      mistakes[existingIndex].resolved = false;
    } else {
      mistakes.unshift({
        id: `mistake-${Date.now()}-${question.id}`,
        questionId: question.id,
        exam: question.exam,
        subject: question.subject,
        chapter: question.chapter,
        topic: question.topic,
        lastAttemptedDate: new Date().toISOString().split('T')[0],
        userWrongAnswer: userAns,
        correctAnswer: question.correctAnswer,
        mistakeCount: 1,
        resolved: false
      });
    }
    setStorageItem(StorageKeys.MISTAKES, mistakes);
  }
}

export const testService = new ApiTestService();
