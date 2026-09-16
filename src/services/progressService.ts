import { TopicWeakness, RevisionItem, SubjectName } from '../types';
import { initialWeaknesses } from '../data/mockData';
import { testService } from './testService';
import { userService } from './userService';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';

class MockProgressService {
  public getTopicWeaknesses(): TopicWeakness[] {
    return userService.getWeaknesses();
  }

  public getRevisionItems(): RevisionItem[] {
    return getStorageItem<RevisionItem[]>(StorageKeys.REVISION, []);
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

  public addRevisionItem(item: Partial<RevisionItem> & { subject: SubjectName; chapter: string; topic: string }): RevisionItem {
    const list = this.getRevisionItems();
    const newItem: RevisionItem = {
      id: item.id || `rev-${Date.now()}`,
      questionId: item.questionId || `q-${Date.now()}`,
      subject: item.subject,
      chapter: item.chapter,
      topic: item.topic,
      intervalStage: 1,
      nextDueDate: new Date().toISOString().split('T')[0],
      status: 'due-today',
      lastPracticedDate: new Date().toISOString().split('T')[0]
    };
    list.unshift(newItem);
    setStorageItem(StorageKeys.REVISION, list);
    return newItem;
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
      : (profile.overallAccuracy || 0);

    const averageTestScorePct = totalMaxSum > 0 
      ? Math.round((totalScoreSum / totalMaxSum) * 100) 
      : 0;

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

    const accuracyTrend = orderedDays.map((day) => {
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

      return { day, accuracy: 0 };
    });

    const subjectMastery = (Object.keys(subjectStats) as SubjectName[]).map(sub => {
      const stats = subjectStats[sub];
      const acc = stats.attempted > 0 
        ? Math.round((stats.correct / stats.attempted) * 100) 
        : 0;

      return {
        subject: sub,
        accuracy: acc,
        total: stats.attempted
      };
    });

    return {
      overallAccuracy,
      questionsAttempted: totalQuestionsAttempted > 0 ? totalQuestionsAttempted : (profile.todayQuestionsCount || 0),
      testsCompleted: testsCompleted > 0 ? testsCompleted : (profile.testsCompletedCount || 0),
      studyHours,
      streakDays: profile.streakDays || 0,
      averageTestScorePct,
      unresolvedMistakesCount: mistakes.filter(m => !m.resolved).length,
      accuracyTrend,
      subjectMastery
    };
  }
}

export const progressService = new MockProgressService();
