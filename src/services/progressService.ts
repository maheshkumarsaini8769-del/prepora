import { TopicWeakness, RevisionItem, SubjectName } from '../types';
import { initialWeaknesses } from '../data/mockData';
import { testService } from './testService';
import { userService } from './userService';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';

class MockProgressService {
  public getTopicWeaknesses(): TopicWeakness[] {
    const defaultList = getStorageItem<TopicWeakness[]>('prepora_topic_weaknesses', initialWeaknesses);
    const mistakes = userService.getMistakes();
    const attempts = testService.getAllAttempts();

    if (attempts.length === 0 && mistakes.length === 0) {
      return defaultList;
    }

    return defaultList;
  }

  public getRevisionItems(): RevisionItem[] {
    return getStorageItem<RevisionItem[]>(StorageKeys.REVISION, [
      {
        id: 'rev-01',
        questionId: 'phy-11-006',
        subject: 'Physics',
        chapter: 'Work, Energy & Power',
        topic: 'Conservative Forces',
        intervalStage: 1,
        nextDueDate: new Date().toISOString().split('T')[0], // Due today
        status: 'due-today',
        lastPracticedDate: '2026-09-12'
      },
      {
        id: 'rev-02',
        questionId: 'chem-11-003',
        subject: 'Chemistry',
        chapter: 'Thermodynamics',
        topic: 'Spontaneity & Gibbs Energy',
        intervalStage: 3,
        nextDueDate: new Date().toISOString().split('T')[0], // Due today
        status: 'due-today',
        lastPracticedDate: '2026-09-11'
      },
      {
        id: 'rev-03',
        questionId: 'math-12-001',
        subject: 'Mathematics',
        chapter: 'Limits, Continuity and Differentiability',
        topic: 'L\'Hopital\'s Rule',
        intervalStage: 7,
        nextDueDate: '2026-09-18',
        status: 'upcoming',
        lastPracticedDate: '2026-09-11'
      },
      {
        id: 'rev-04',
        questionId: 'bio-11-002',
        subject: 'Biology',
        chapter: 'Plant Physiology',
        topic: 'Photosynthesis & Light Reaction',
        intervalStage: 14,
        nextDueDate: '2026-09-24',
        status: 'upcoming',
        lastPracticedDate: '2026-09-10'
      }
    ]);
  }

  public completeRevisionItem(id: string): void {
    const list = this.getRevisionItems();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = 'completed';
      if (item.intervalStage === 1) item.intervalStage = 3;
      else if (item.intervalStage === 3) item.intervalStage = 7;
      else if (item.intervalStage === 7) item.intervalStage = 14;
      
      setStorageItem(StorageKeys.REVISION, list);
    }
  }

  public getPerformanceMetrics() {
    const profile = userService.getProfile();
    const attempts = testService.getAllAttempts();
    const mistakes = userService.getMistakes();

    let totalScoreSum = 0;
    let totalMaxSum = 0;
    let totalQuestionsAttempted = 0;
    let totalCorrectCount = 0;
    let totalWrongCount = 0;
    let totalTimeSpentSeconds = 0;

    const subjectStats: Record<SubjectName, { attempted: number; correct: number; total: number }> = {
      Physics: { attempted: 0, correct: 0, total: 0 },
      Chemistry: { attempted: 0, correct: 0, total: 0 },
      Mathematics: { attempted: 0, correct: 0, total: 0 },
      Biology: { attempted: 0, correct: 0, total: 0 },
    };

    attempts.forEach(a => {
      totalScoreSum += a.totalScore;
      totalMaxSum += a.maxScore;
      totalQuestionsAttempted += (a.correctCount + a.wrongCount);
      totalCorrectCount += a.correctCount;
      totalWrongCount += a.wrongCount;
      totalTimeSpentSeconds += a.timeTakenSeconds;

      if (a.subjectBreakdown) {
        a.subjectBreakdown.forEach(s => {
          if (subjectStats[s.subject]) {
            subjectStats[s.subject].attempted += s.attempted;
            subjectStats[s.subject].correct += s.correct;
            subjectStats[s.subject].total += s.totalQuestions;
          }
        });
      }
    });

    const hasRealAttempts = attempts.length > 0;

    const overallAccuracy = (totalCorrectCount + totalWrongCount > 0)
      ? Math.round((totalCorrectCount / (totalCorrectCount + totalWrongCount)) * 100)
      : (hasRealAttempts ? 0 : profile.overallAccuracy);

    const averageTestScorePct = totalMaxSum > 0 
      ? Math.round((totalScoreSum / totalMaxSum) * 100) 
      : (hasRealAttempts ? 0 : 75);

    const testsCompleted = attempts.length;
    const studyHours = Math.round((totalTimeSpentSeconds / 3600) * 10) / 10;

    // 7-day trend calculation
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const orderedDays = [];
    for (let i = 6; i >= 0; i--) {
      const dIndex = (todayIndex - i + 7) % 7;
      orderedDays.push(daysOfWeek[dIndex]);
    }

    const accuracyTrend = orderedDays.map((day, idx) => {
      const matching = attempts.filter(a => {
        const d = new Date(a.timestamp);
        return daysOfWeek[d.getDay()] === day;
      });

      if (matching.length > 0) {
        const correct = matching.reduce((sum, m) => sum + m.correctCount, 0);
        const wrong = matching.reduce((sum, m) => sum + m.wrongCount, 0);
        const acc = (correct + wrong > 0) ? Math.round((correct / (correct + wrong)) * 100) : 0;
        return { day, accuracy: acc };
      }

      // Default baseline when user has not yet taken tests
      const baseline = [68, 72, 70, 78, 74, 82, overallAccuracy || 75][idx] || 70;
      return { day, accuracy: hasRealAttempts ? 0 : baseline };
    });

    const subjectMastery = (Object.keys(subjectStats) as SubjectName[]).map(sub => {
      const stats = subjectStats[sub];
      const acc = stats.attempted > 0 
        ? Math.round((stats.correct / stats.attempted) * 100) 
        : (hasRealAttempts ? 0 : (sub === 'Physics' ? 72 : sub === 'Chemistry' ? 84 : sub === 'Mathematics' ? 66 : 88));

      return {
        subject: sub,
        accuracy: acc,
        total: stats.attempted > 0 ? stats.attempted : (hasRealAttempts ? 0 : 25)
      };
    });

    return {
      overallAccuracy,
      questionsAttempted: totalQuestionsAttempted > 0 ? totalQuestionsAttempted : (hasRealAttempts ? 0 : 45),
      testsCompleted,
      studyHours: studyHours > 0 ? studyHours : (hasRealAttempts ? 0 : 1.2),
      streakDays: profile.streakDays,
      averageTestScorePct,
      unresolvedMistakesCount: mistakes.filter(m => !m.resolved).length,
      accuracyTrend,
      subjectMastery
    };
  }
}

export const progressService = new MockProgressService();
