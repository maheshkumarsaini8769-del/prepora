import { UserProfile, Bookmark, StudyNote, NotificationItem, MistakeItem, TopicWeakness, ExamType, SubjectName, TestAttempt } from '../types';
import { initialUserProfile, initialNotes, initialNotifications } from '../data/mockData';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';

export const createFreshStudentProfile = (): UserProfile => {
  const uniqueId = `student_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return {
    id: uniqueId,
    name: 'Aspirant',
    email: '',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    classLevel: '12',
    targetExam: 'JEE',
    targetYear: 2026,
    streakDays: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    dailyGoalQuestions: 20,
    todayQuestionsCount: 0,
    overallAccuracy: 0,
    testsCompletedCount: 0
  };
};

class MockUserService {
  // User Profile
  public getProfile(): UserProfile {
    let profile = getStorageItem<UserProfile | null>(StorageKeys.USER_PROFILE, null);

    // If no profile exists, or if legacy demo Aryan profile was stored, create a fresh clean student
    if (!profile || profile.id === 'usr-demo-01' || profile.name === 'Aryan Sharma') {
      profile = createFreshStudentProfile();
      setStorageItem(StorageKeys.USER_PROFILE, profile);
      return profile;
    }

    // Daily active check & streak rollover
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate && profile.lastActiveDate !== today) {
      const last = new Date(profile.lastActiveDate).getTime();
      const curr = new Date(today).getTime();
      const diffDays = Math.floor((curr - last) / (1000 * 60 * 60 * 24));

      // Reset today's questions counter for the new day
      profile.todayQuestionsCount = 0;

      // If more than 1 day missed, streak resets to 0
      if (diffDays > 1) {
        profile.streakDays = 0;
      }
      setStorageItem(StorageKeys.USER_PROFILE, profile);
    }

    return profile;
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    setStorageItem(StorageKeys.USER_PROFILE, updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prepora:profile_updated', { detail: updated }));
    }
    return updated;
  }

  // Bookmarks
  public getBookmarks(): Bookmark[] {
    const list = getStorageItem<Bookmark[]>(StorageKeys.BOOKMARKS, []);
    // Clean out legacy demo bookmarks if present
    const cleaned = list.filter(b => b.id !== 'bm-1' && b.id !== 'bm-2');
    if (cleaned.length !== list.length) {
      setStorageItem(StorageKeys.BOOKMARKS, cleaned);
    }
    return cleaned;
  }

  public isBookmarked(type: Bookmark['type'], targetId: string): boolean {
    const list = this.getBookmarks();
    return list.some(b => b.type === type && b.targetId === targetId);
  }

  public toggleBookmark(item: Omit<Bookmark, 'id' | 'dateAdded'>): boolean {
    const list = this.getBookmarks();
    const existingIndex = list.findIndex(b => b.type === item.type && b.targetId === item.targetId);

    if (existingIndex !== -1) {
      list.splice(existingIndex, 1);
      setStorageItem(StorageKeys.BOOKMARKS, list);
      return false; // removed
    } else {
      list.unshift({
        ...item,
        id: `bm-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0]
      });
      setStorageItem(StorageKeys.BOOKMARKS, list);
      return true; // added
    }
  }

  // Mistakes
  public getMistakes(): MistakeItem[] {
    const list = getStorageItem<MistakeItem[]>(StorageKeys.MISTAKES, []);
    // Clean out legacy demo mistakes if present
    const cleaned = list.filter(m => m.id !== 'm-demo-1' && m.id !== 'm-demo-2');
    if (cleaned.length !== list.length) {
      setStorageItem(StorageKeys.MISTAKES, cleaned);
    }
    return cleaned;
  }

  public removeMistake(id: string): void {
    const list = this.getMistakes().filter(m => m.id !== id);
    setStorageItem(StorageKeys.MISTAKES, list);
  }

  public resolveMistake(id: string): void {
    const list = this.getMistakes();
    const item = list.find(m => m.id === id);
    if (item) {
      item.resolved = true;
      setStorageItem(StorageKeys.MISTAKES, list);
    }
  }

  public getWeaknesses(): TopicWeakness[] {
    const mistakes = this.getMistakes();
    if (mistakes.length === 0) {
      return [];
    }

    const grouped: Record<string, TopicWeakness> = {};
    mistakes.forEach(m => {
      const key = `${m.chapter}-${m.topic}`;
      if (!grouped[key]) {
        grouped[key] = {
          subject: m.subject,
          chapter: m.chapter,
          topic: m.topic,
          accuracy: Math.max(20, Math.min(85, 80 - (m.mistakeCount || 1) * 15)),
          totalAttempts: (m.mistakeCount || 1) + 2,
          wrongCount: m.mistakeCount || 1,
          status: (m.mistakeCount || 1) >= 2 ? 'red' : 'yellow',
          lastPracticedDate: m.lastAttemptedDate
        };
      } else {
        grouped[key].wrongCount += (m.mistakeCount || 1);
        grouped[key].totalAttempts += (m.mistakeCount || 1);
        if (grouped[key].wrongCount >= 2) {
          grouped[key].status = 'red';
        }
      }
    });
    return Object.values(grouped);
  }

  // Record question practice activity
  public recordQuestionAnswered(payload: {
    questionId: string;
    subject: SubjectName;
    chapter: string;
    topic: string;
    isCorrect: boolean;
    timeSpentSeconds?: number;
    selectedAnswer?: number;
    correctAnswer?: number;
    exam?: ExamType;
    reason?: string;
  }): void {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    profile.lastActiveDate = today;
    profile.todayQuestionsCount = (profile.todayQuestionsCount || 0) + 1;
    if (!profile.streakDays || profile.streakDays === 0) {
      profile.streakDays = 1;
    }

    // Handle mistake tracking
    const mistakes = this.getMistakes();
    const existingIndex = mistakes.findIndex(m => m.questionId === payload.questionId);

    if (!payload.isCorrect) {
      if (existingIndex !== -1) {
        mistakes[existingIndex].mistakeCount = (mistakes[existingIndex].mistakeCount || 1) + 1;
        mistakes[existingIndex].lastAttemptedDate = today;
        mistakes[existingIndex].userWrongAnswer = payload.selectedAnswer ?? 0;
        mistakes[existingIndex].resolved = false;
        if (payload.reason) mistakes[existingIndex].mistakeReason = payload.reason as any;
      } else {
        mistakes.unshift({
          id: `m-${Date.now()}-${payload.questionId}`,
          questionId: payload.questionId,
          exam: payload.exam || profile.targetExam || 'JEE',
          subject: payload.subject,
          chapter: payload.chapter,
          topic: payload.topic,
          lastAttemptedDate: today,
          userWrongAnswer: payload.selectedAnswer ?? 0,
          correctAnswer: payload.correctAnswer ?? 0,
          mistakeCount: 1,
          mistakeReason: (payload.reason as any) || 'Calculation Error',
          resolved: false
        });
      }
      setStorageItem(StorageKeys.MISTAKES, mistakes);
    } else if (existingIndex !== -1) {
      mistakes[existingIndex].resolved = true;
      setStorageItem(StorageKeys.MISTAKES, mistakes);
    }

    this.updateProfile(profile);
  }

  // Record completed mock test activity
  public recordTestCompleted(attempt: TestAttempt): void {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    profile.lastActiveDate = today;
    profile.testsCompletedCount = (profile.testsCompletedCount || 0) + 1;
    if (!profile.streakDays || profile.streakDays === 0) {
      profile.streakDays = 1;
    }
    profile.todayQuestionsCount = (profile.todayQuestionsCount || 0) + (attempt.totalQuestions || 0);

    const attempts = getStorageItem<TestAttempt[]>(StorageKeys.TEST_ATTEMPTS, []);
    const totalCorrect = attempts.reduce((sum, a) => sum + (a.correctCount || 0), 0);
    const totalAttempted = attempts.reduce((sum, a) => sum + ((a.correctCount || 0) + (a.wrongCount || 0)), 0);

    if (totalAttempted > 0) {
      profile.overallAccuracy = Math.round((totalCorrect / totalAttempted) * 100);
    }

    this.updateProfile(profile);
  }

  // Notes
  public getNotes(): StudyNote[] {
    return getStorageItem<StudyNote[]>(StorageKeys.NOTES, []);
  }

  public saveNote(note: Omit<StudyNote, 'id' | 'updatedAt'> & { id?: string }): StudyNote {
    const list = this.getNotes();
    const now = new Date().toISOString().split('T')[0];

    if (note.id) {
      const idx = list.findIndex(n => n.id === note.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...note, updatedAt: now };
        setStorageItem(StorageKeys.NOTES, list);
        return list[idx];
      }
    }

    const newNote: StudyNote = {
      ...note,
      id: `note-${Date.now()}`,
      updatedAt: now
    };
    list.unshift(newNote);
    setStorageItem(StorageKeys.NOTES, list);
    return newNote;
  }

  public deleteNote(id: string): void {
    const list = this.getNotes().filter(n => n.id !== id);
    setStorageItem(StorageKeys.NOTES, list);
  }

  // Notifications
  public getNotifications(): NotificationItem[] {
    const welcomeNotifs: NotificationItem[] = [
      {
        id: 'notif-welcome',
        title: 'Welcome to PREPORA!',
        message: 'Practice verified questions, test yourself with full mocks, and resolve doubts with the AI Quality Engine.',
        timestamp: 'Just now',
        isRead: false,
        type: 'practice',
        actionUrl: '/practice'
      }
    ];
    return getStorageItem<NotificationItem[]>(StorageKeys.NOTIFICATIONS, welcomeNotifs);
  }

  public markNotificationAsRead(id: string): void {
    const list = this.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.isRead = true;
      setStorageItem(StorageKeys.NOTIFICATIONS, list);
    }
  }

  public markAllNotificationsAsRead(): void {
    const list = this.getNotifications().map(n => ({ ...n, isRead: true }));
    setStorageItem(StorageKeys.NOTIFICATIONS, list);
  }
}

export const userService = new MockUserService();
