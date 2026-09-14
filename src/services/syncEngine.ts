/**
 * PREPORA Reliable Sync Engine
 * Handles offline persistence, idempotent request queuing, and network recovery
 */

export interface SyncQueueItem {
  id: string;
  idempotencyKey: string;
  type: 'test_submission' | 'profile_update' | 'bookmark_sync' | 'mistake_sync';
  endpoint: string;
  payload: any;
  timestamp: number;
  retryCount: number;
}

const QUEUE_STORAGE_KEY = 'prepora_sync_queue';
const ACTIVE_TEST_PREFIX = 'prepora_active_test_';
const ACTIVE_PRACTICE_KEY = 'prepora_active_practice';

class SyncEngine {
  private queue: SyncQueueItem[] = [];
  private isProcessing = false;

  constructor() {
    this.loadQueue();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.processQueue());
      window.addEventListener('prepora:network-reconnected', () => this.processQueue());
    }
  }

  public generateIdempotencyKey(prefix: string = 'req'): string {
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${Date.now()}-${randomPart}`;
  }

  private loadQueue(): void {
    try {
      const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
      this.queue = raw ? JSON.parse(raw) : [];
    } catch {
      this.queue = [];
    }
  }

  private persistQueue(): void {
    try {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(this.queue));
    } catch (e) {
      console.error('Failed to save sync queue:', e);
    }
  }

  public enqueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>): string {
    const id = `sq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const fullItem: SyncQueueItem = {
      ...item,
      id,
      timestamp: Date.now(),
      retryCount: 0
    };
    this.queue.push(fullItem);
    this.persistQueue();

    if (navigator.onLine) {
      this.processQueue();
    }
    return id;
  }

  public async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0 || !navigator.onLine) return;
    this.isProcessing = true;

    try {
      const items = [...this.queue];
      for (const item of items) {
        try {
          const res = await fetch(item.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Idempotency-Key': item.idempotencyKey
            },
            body: JSON.stringify({
              ...item.payload,
              idempotencyKey: item.idempotencyKey
            })
          });

          if (res.ok || res.status === 409) {
            // Success or already processed idempotently
            this.queue = this.queue.filter(q => q.id !== item.id);
            this.persistQueue();
          } else {
            item.retryCount += 1;
            if (item.retryCount > 5) {
              // Too many failures, drop item to avoid blocking queue
              this.queue = this.queue.filter(q => q.id !== item.id);
              this.persistQueue();
            }
          }
        } catch {
          // Network drop during request; stop processing queue
          break;
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  // Active Test Auto-Save & Recovery
  public saveActiveTest(testId: string, state: {
    testTitle: string;
    totalQuestions: number;
    currentIndex: number;
    answers: Record<string, any>;
    timeLeftSeconds: number;
    updatedAt: string;
  }): void {
    try {
      localStorage.setItem(`${ACTIVE_TEST_PREFIX}${testId}`, JSON.stringify(state));
      // Also update generic latest active test pointer
      localStorage.setItem('prepora_latest_active_test_id', testId);
    } catch (e) {
      console.warn('Failed to auto-save test state:', e);
    }
  }

  public getActiveTest(testId: string): any | null {
    try {
      const raw = localStorage.getItem(`${ACTIVE_TEST_PREFIX}${testId}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public getLatestActiveTest(): { testId: string; state: any } | null {
    try {
      const latestId = localStorage.getItem('prepora_latest_active_test_id');
      if (!latestId) return null;
      const state = this.getActiveTest(latestId);
      if (!state) return null;
      return { testId: latestId, state };
    } catch {
      return null;
    }
  }

  public clearActiveTest(testId: string): void {
    try {
      localStorage.removeItem(`${ACTIVE_TEST_PREFIX}${testId}`);
      const latestId = localStorage.getItem('prepora_latest_active_test_id');
      if (latestId === testId) {
        localStorage.removeItem('prepora_latest_active_test_id');
      }
    } catch (e) {
      console.warn('Failed to clear active test state:', e);
    }
  }

  // Active Practice Auto-Save & Recovery
  public saveActivePractice(state: {
    subject: string;
    chapter: string;
    currentQuestionIndex: number;
    totalQuestions: number;
    completedPercentage: number;
    updatedAt: string;
  }): void {
    try {
      localStorage.setItem(ACTIVE_PRACTICE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to auto-save practice state:', e);
    }
  }

  public getActivePractice(): any | null {
    try {
      const raw = localStorage.getItem(ACTIVE_PRACTICE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public clearActivePractice(): void {
    try {
      localStorage.removeItem(ACTIVE_PRACTICE_KEY);
    } catch {}
  }
}

export const syncEngine = new SyncEngine();
