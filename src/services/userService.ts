import { UserProfile, Bookmark, StudyNote, NotificationItem, MistakeItem, TopicWeakness } from '../types';
import { initialUserProfile, initialNotes, initialNotifications } from '../data/mockData';
import { getStorageItem, setStorageItem, StorageKeys } from '../utils/storage';

class MockUserService {
  // User Profile
  public getProfile(): UserProfile {
    return getStorageItem<UserProfile>(StorageKeys.USER_PROFILE, initialUserProfile);
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    setStorageItem(StorageKeys.USER_PROFILE, updated);
    return updated;
  }

  // Bookmarks
  public getBookmarks(): Bookmark[] {
    return getStorageItem<Bookmark[]>(StorageKeys.BOOKMARKS, [
      {
        id: 'bm-1',
        type: 'question',
        targetId: 'phy-11-003',
        title: 'Projectile Launch Angle vs Range Formula',
        subtitle: 'Physics • Kinematics',
        dateAdded: '2026-09-13'
      },
      {
        id: 'bm-2',
        type: 'test',
        targetId: 'test-jee-mock-1',
        title: 'JEE Main 2025 Full Mock #1',
        subtitle: '15 Questions • 45 Mins',
        dateAdded: '2026-09-12'
      }
    ]);
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
    return getStorageItem<MistakeItem[]>(StorageKeys.MISTAKES, [
      {
        id: 'm-demo-1',
        questionId: 'phy-11-006',
        exam: 'JEE',
        subject: 'Physics',
        chapter: 'Work, Energy & Power',
        topic: 'Conservative Forces',
        lastAttemptedDate: '2026-09-12',
        userWrongAnswer: 1,
        correctAnswer: 0,
        mistakeCount: 2,
        resolved: false
      },
      {
        id: 'm-demo-2',
        questionId: 'chem-11-003',
        exam: 'JEE',
        subject: 'Chemistry',
        chapter: 'Thermodynamics',
        topic: 'Spontaneity & Gibbs Energy',
        lastAttemptedDate: '2026-09-11',
        userWrongAnswer: 2,
        correctAnswer: 0,
        mistakeCount: 1,
        resolved: false
      }
    ]);
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
      return [
        {
          subject: 'Physics',
          chapter: 'Kinematics',
          topic: 'Relative Motion in 2D',
          accuracy: 45,
          totalAttempts: 12,
          wrongCount: 6,
          status: 'red',
          lastPracticedDate: '2026-09-13'
        },
        {
          subject: 'Chemistry',
          chapter: 'Thermodynamics',
          topic: 'Spontaneity & Gibbs Energy',
          accuracy: 52,
          totalAttempts: 10,
          wrongCount: 5,
          status: 'red',
          lastPracticedDate: '2026-09-12'
        }
      ];
    }
    const grouped: Record<string, TopicWeakness> = {};
    mistakes.forEach(m => {
      const key = `${m.chapter}-${m.topic}`;
      if (!grouped[key]) {
        grouped[key] = {
          subject: m.subject,
          chapter: m.chapter,
          topic: m.topic,
          accuracy: Math.max(30, 80 - (m.mistakeCount || 1) * 20),
          totalAttempts: (m.mistakeCount || 1) + 2,
          wrongCount: m.mistakeCount || 1,
          status: 'red',
          lastPracticedDate: m.lastAttemptedDate
        };
      }
    });
    return Object.values(grouped);
  }

  // Notes
  public getNotes(): StudyNote[] {
    return getStorageItem<StudyNote[]>(StorageKeys.NOTES, initialNotes);
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
    return getStorageItem<NotificationItem[]>(StorageKeys.NOTIFICATIONS, initialNotifications);
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
