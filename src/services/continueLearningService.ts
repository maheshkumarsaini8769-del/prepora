import { SubjectName } from '../types';

export interface LearningActivity {
  id: string;
  type: 'practice' | 'lecture' | 'formula' | 'chapter';
  title: string;
  subtitle: string;
  subject: SubjectName;
  chapter?: string;
  topic?: string;
  url: string;
  progressPercent?: number;
  timestamp: number;
}

function getActiveUserKey(): string {
  try {
    const raw = localStorage.getItem('prepora_auth_user');
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.id) return `prepora_continue_learning_${u.id}`;
      if (u?.phone) return `prepora_continue_learning_${u.phone}`;
    }
  } catch {}
  return 'prepora_continue_learning_guest';
}

export const continueLearningService = {
  recordActivity(activity: Omit<LearningActivity, 'id' | 'timestamp'>) {
    try {
      const entry: LearningActivity = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: Date.now()
      };
      const key = getActiveUserKey();
      localStorage.setItem(key, JSON.stringify(entry));
      window.dispatchEvent(new CustomEvent('prepora:continue_learning_updated', { detail: entry }));
    } catch {}
  },

  getLatestActivity(): LearningActivity | null {
    try {
      const key = getActiveUserKey();
      const saved = localStorage.getItem(key);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Valid if less than 14 days old
      if (parsed && Date.now() - parsed.timestamp < 14 * 86400 * 1000) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  },

  clearActivity() {
    try {
      const key = getActiveUserKey();
      localStorage.removeItem(key);
      localStorage.removeItem('prepora_continue_learning'); // Also clean legacy global key
    } catch {}
  }
};
