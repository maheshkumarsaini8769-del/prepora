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

const STORAGE_KEY = 'prepora_continue_learning';

export const continueLearningService = {
  recordActivity(activity: Omit<LearningActivity, 'id' | 'timestamp'>) {
    try {
      const entry: LearningActivity = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      window.dispatchEvent(new CustomEvent('prepora:continue_learning_updated', { detail: entry }));
    } catch {}
  },

  getLatestActivity(): LearningActivity | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
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
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
};
