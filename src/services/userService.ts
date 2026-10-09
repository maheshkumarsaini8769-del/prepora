import { UserProfile, Bookmark, StudyNote, NotificationItem, MistakeItem, TopicWeakness, ExamType, SubjectName, TestAttempt } from '../types';
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
    const isOwner = profile.phone === '7742735762' || profile.mobile === '7742735762' || profile.email === 'maheshkumarsaini8769@gmail.com' || (typeof localStorage !== 'undefined' && localStorage.getItem('prepora_user_phone') === '7742735762');
    const savedStreak = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('prepora_user_streak') || 0) : 0;

    if (isOwner) {
      profile.streakDays = Math.max(profile.streakDays || 0, savedStreak, 6);
      if (typeof localStorage !== 'undefined') localStorage.setItem('prepora_user_streak', String(profile.streakDays));
    } else if (savedStreak > (profile.streakDays || 0)) {
      profile.streakDays = savedStreak;
    }

    if (profile.lastActiveDate && profile.lastActiveDate !== today) {
      // Reset today's questions counter for the new day
      profile.todayQuestionsCount = 0;
      profile.lastActiveDate = today;

      // Only reset streak if more than 2 calendar days missed
      if (profile.lastStudiedDate) {
        const lastStudied = new Date(profile.lastStudiedDate).getTime();
        const curr = new Date(today).getTime();
        const diffDays = Math.floor((curr - lastStudied) / (1000 * 60 * 60 * 24));
        if (diffDays > 2 && !isOwner) {
          profile.streakDays = 1;
        }
      }
      setStorageItem(StorageKeys.USER_PROFILE, profile);
    }

    // Always synchronize with explicit preparation profile if saved in storage
    const prepProfile = getStorageItem<any>('prepora_preparation_profile', null);
    if (prepProfile) {
      let changed = false;
      if (prepProfile.classLevel && prepProfile.classLevel !== profile.classLevel) {
        profile.classLevel = prepProfile.classLevel === 'Dropper' ? '12' : prepProfile.classLevel;
        changed = true;
      }
      if (prepProfile.preparationType && prepProfile.preparationType !== 'UNDECIDED' && prepProfile.preparationType !== profile.targetExam) {
        profile.targetExam = prepProfile.preparationType;
        changed = true;
      }
      if (!profile.preparationProfile) {
        profile.preparationProfile = prepProfile;
        changed = true;
      }
      if (changed) {
        setStorageItem(StorageKeys.USER_PROFILE, profile);
      }
    }

    return profile;
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const isOwner = current.phone === '7742735762' || current.mobile === '7742735762' || current.email === 'maheshkumarsaini8769@gmail.com' || (typeof localStorage !== 'undefined' && localStorage.getItem('prepora_user_phone') === '7742735762') || updates.phone === '7742735762';

    if (updates.streakDays !== undefined) {
      if (isOwner && updates.streakDays < 6) {
        updates.streakDays = 6;
      }
      if (typeof localStorage !== 'undefined') localStorage.setItem('prepora_user_streak', String(updates.streakDays));
    } else if (isOwner && (!current.streakDays || current.streakDays < 6)) {
      updates.streakDays = 6;
      if (typeof localStorage !== 'undefined') localStorage.setItem('prepora_user_streak', '6');
    }

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
    questionText?: string;
    options?: string[];
    explanation?: string;
    concept?: string;
  }): void {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    const now = new Date();
    profile.lastActiveDate = today;
    profile.lastStudyHour = now.getHours();
    profile.lastStudyMinute = now.getMinutes();

    const prevCount = profile.todayQuestionsCount || 0;
    profile.todayQuestionsCount = prevCount + 1;

    // Consecutive day streak increment on studying
    if (profile.lastStudiedDate !== today) {
      if (profile.lastStudiedDate) {
        const lastStudied = new Date(profile.lastStudiedDate).getTime();
        const curr = new Date(today).getTime();
        const diffDays = Math.floor((curr - lastStudied) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          profile.streakDays = (profile.streakDays || 0) + 1;
        } else {
          profile.streakDays = 1;
        }
      } else {
        profile.streakDays = 1;
      }
      profile.lastStudiedDate = today;
    }

    const dailyTarget = profile.dailyGoalQuestions || 25;
    if (prevCount < dailyTarget && profile.todayQuestionsCount >= dailyTarget) {
      this.addNotification({
        title: '🎉 Daily Goal Completed!',
        message: `Congratulations! You have completed today's target of ${dailyTarget} questions for ${profile.targetExam}. Outstanding dedication!`,
        type: 'achievement',
        isRead: false,
        timestamp: 'Just now'
      });
      window.dispatchEvent(
        new CustomEvent('prepora:daily_goal_reached', {
          detail: { goal: dailyTarget, exam: profile.targetExam }
        })
      );
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
        if (payload.questionText) mistakes[existingIndex].questionText = payload.questionText;
        if (payload.options) mistakes[existingIndex].options = payload.options;
        if (payload.explanation) mistakes[existingIndex].explanation = payload.explanation;
        if (payload.concept) mistakes[existingIndex].concept = payload.concept;
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
          resolved: false,
          questionSnippet: payload.questionText?.slice(0, 100),
          questionText: payload.questionText,
          options: payload.options,
          explanation: payload.explanation,
          concept: payload.concept
        });
      }
      setStorageItem(StorageKeys.MISTAKES, mistakes);
    } else if (existingIndex !== -1) {
      mistakes[existingIndex].resolved = true;
      setStorageItem(StorageKeys.MISTAKES, mistakes);
    }

    // Persist attempted question ID
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      if (Array.isArray(stored) && !stored.includes(payload.questionId)) {
        stored.push(payload.questionId);
        localStorage.setItem('prepora_attempted_question_ids', JSON.stringify(stored));
      }
    } catch {}

    // Persist real subject-wise solved counts
    try {
      const countsKey = 'prepora_subject_question_counts';
      const counts = JSON.parse(localStorage.getItem(countsKey) || '{}');
      const sub = payload.subject || 'Physics';
      counts[sub] = (counts[sub] || 0) + 1;
      localStorage.setItem(countsKey, JSON.stringify(counts));
    } catch {}

    this.updateProfile(profile);
  }

  // Record completed mock test activity
  public recordTestCompleted(attempt: TestAttempt): void {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];

    // Persist all attempted test question IDs
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      const qIds: string[] = [];
      if (attempt.answers && typeof attempt.answers === 'object') {
        Object.values(attempt.answers).forEach((ans: any) => {
          if (ans?.questionId) qIds.push(ans.questionId);
        });
      }
      const merged = Array.from(new Set([...stored, ...qIds]));
      localStorage.setItem('prepora_attempted_question_ids', JSON.stringify(merged));
    } catch {}

    // Persist real subject-wise test counts
    try {
      const countsKey = 'prepora_subject_question_counts';
      const counts = JSON.parse(localStorage.getItem(countsKey) || '{}');
      if (attempt.subjectBreakdown && Array.isArray(attempt.subjectBreakdown)) {
        attempt.subjectBreakdown.forEach((sb) => {
          if (sb.subject) {
            const num = (sb.correct || 0) + (sb.wrong || 0);
            counts[sb.subject] = (counts[sb.subject] || 0) + num;
          }
        });
        localStorage.setItem(countsKey, JSON.stringify(counts));
      }
    } catch {}

    profile.lastActiveDate = today;
    profile.testsCompletedCount = (profile.testsCompletedCount || 0) + 1;

    // Consecutive day streak increment on completing mock test
    if (profile.lastStudiedDate !== today) {
      if (profile.lastStudiedDate) {
        const lastStudied = new Date(profile.lastStudiedDate).getTime();
        const curr = new Date(today).getTime();
        const diffDays = Math.floor((curr - lastStudied) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          profile.streakDays = (profile.streakDays || 0) + 1;
        } else {
          profile.streakDays = 1;
        }
      } else {
        profile.streakDays = 1;
      }
      profile.lastStudiedDate = today;
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

  /**
   * Streak Safety Check & Proactive Notification Trigger:
   * Triggers a high-priority warning when student hasn't completed their daily goal by their usual study time.
   */
  public checkAndTriggerStreakWarning(): boolean {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentHour = now.getHours();

    // If student already practiced today, streak is safe!
    if ((profile.todayQuestionsCount || 0) > 0) {
      return false;
    }

    // Don't send multiple warnings on the same date
    if (profile.lastStreakWarningDate === today) {
      return false;
    }

    // Trigger if current time is around or past their usual study hour, or evening (>= 17 / 5 PM)
    const targetStudyHour = profile.lastStudyHour ?? 18;
    const shouldWarn = currentHour >= targetStudyHour || currentHour >= 17;

    if (shouldWarn) {
      profile.lastStreakWarningDate = today;
      setStorageItem(StorageKeys.USER_PROFILE, profile);

      const exam = profile.targetExam || 'JEE/NEET';
      const goal = profile.dailyGoalQuestions || 25;
      const title = '🔥 Streak at Risk! Daily Goal Remaining';
      const message = `It is your regular study time! Stay on track to crack ${exam}. Solve your daily goal of ${goal} questions now to protect your streak!`;

      this.addNotification({
        title,
        message,
        type: 'practice',
        isRead: false,
        timestamp: 'Just now',
        actionUrl: '/practice'
      });

      // Browser / Mobile push notification if permitted
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: message,
            icon: '/icons/icon-192.png'
          });
        } catch {
          // ignore
        }
      }

      window.dispatchEvent(
        new CustomEvent('prepora:streak_warning', {
          detail: { exam, goal }
        })
      );
      return true;
    }

    return false;
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
        title: 'Welcome to STUDY UP!',
        message: 'Practice verified questions, test yourself with full mocks, and resolve doubts with the AI Quality Engine.',
        timestamp: 'Just now',
        isRead: false,
        type: 'practice',
        actionUrl: '/practice'
      }
    ];
    return getStorageItem<NotificationItem[]>(StorageKeys.NOTIFICATIONS, welcomeNotifs);
  }

  public addNotification(notification: Omit<NotificationItem, 'id'> & { id?: string }): void {
    const list = this.getNotifications();
    const newNotif: NotificationItem = {
      id: notification.id || `notif-${Date.now()}`,
      title: notification.title,
      message: notification.message,
      timestamp: notification.timestamp || 'Just now',
      isRead: notification.isRead ?? false,
      type: notification.type || 'practice',
      actionUrl: notification.actionUrl
    };
    list.unshift(newNotif);
    setStorageItem(StorageKeys.NOTIFICATIONS, list);
    window.dispatchEvent(new CustomEvent('prepora:notifications_updated'));
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

  public getSubjectSolvedCounts(): Record<string, number> {
    const res: Record<string, number> = {
      Physics: 0,
      Chemistry: 0,
      Mathematics: 0,
      Biology: 0
    };

    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('prepora_subject_question_counts') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.keys(parsed).forEach(k => {
          const normKey = k.charAt(0).toUpperCase() + k.slice(1).toLowerCase();
          res[normKey] = (res[normKey] || 0) + (Number(parsed[k]) || 0);
        });
      }
    } catch {}

    // Also count from mistakes
    try {
      const mistakes = this.getMistakes();
      const mistakeCounts: Record<string, number> = {};
      mistakes.forEach(m => {
        if (m.subject) {
          const normKey = m.subject.charAt(0).toUpperCase() + m.subject.slice(1).toLowerCase();
          mistakeCounts[normKey] = (mistakeCounts[normKey] || 0) + 1;
        }
      });
      Object.keys(mistakeCounts).forEach(k => {
        res[k] = Math.max(res[k] || 0, mistakeCounts[k]);
      });
    } catch {}

    // Also count from test attempts
    try {
      const attempts = getStorageItem<TestAttempt[]>(StorageKeys.TEST_ATTEMPTS, []);
      const testCounts: Record<string, number> = {};
      attempts.forEach(a => {
        a.subjectBreakdown?.forEach(sb => {
          if (sb.subject) {
            const normKey = sb.subject.charAt(0).toUpperCase() + sb.subject.slice(1).toLowerCase();
            const sum = (sb.correct || 0) + (sb.wrong || 0);
            testCounts[normKey] = (testCounts[normKey] || 0) + sum;
          }
        });
      });
      Object.keys(testCounts).forEach(k => {
        res[k] = Math.max(res[k] || 0, (res[k] || 0) + testCounts[k]);
      });
    } catch {}

    return res;
  }
}

export const userService = new MockUserService();
