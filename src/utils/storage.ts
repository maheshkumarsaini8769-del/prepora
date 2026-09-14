export const StorageKeys = {
  USER_PROFILE: 'prepora_user_profile',
  BOOKMARKS: 'prepora_bookmarks',
  MISTAKES: 'prepora_mistakes',
  TEST_ATTEMPTS: 'prepora_test_attempts',
  NOTES: 'prepora_notes',
  NOTIFICATIONS: 'prepora_notifications',
  QUESTIONS: 'prepora_custom_questions',
  REVISION: 'prepora_revision_schedule',
} as const;

export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
}

export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}
