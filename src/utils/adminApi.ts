/**
 * adminApi.ts
 * Reliable utility for making authenticated requests to Prepora Admin API endpoints.
 * Automatically injects the Authorization Bearer header from localStorage.
 */

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('prepora_auth_token');
};

export const getAdminHeaders = (customHeaders?: HeadersInit): Headers => {
  const headers = new Headers(customHeaders || {});
  const token = getAuthToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// In-memory cache for instant zero-latency admin tab switching (SWR)
const adminMemoryCache = new Map<string, { data: any; timestamp: number }>();

export const getAdminCachedData = <T = any>(key: string, maxAgeMs = 30000): T | null => {
  const item = adminMemoryCache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > maxAgeMs) {
    adminMemoryCache.delete(key);
    return null;
  }
  return item.data as T;
};

export const setAdminCachedData = (key: string, data: any) => {
  adminMemoryCache.set(key, { data, timestamp: Date.now() });
};

export const clearAdminCache = (keyPrefix?: string) => {
  if (keyPrefix) {
    for (const key of adminMemoryCache.keys()) {
      if (key.startsWith(keyPrefix)) {
        adminMemoryCache.delete(key);
      }
    }
  } else {
    adminMemoryCache.clear();
  }
};

// Request deduplication map to prevent parallel duplicate GET requests across components/tabs
const inFlightRequests = new Map<string, Promise<Response>>();

export const adminFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const token = getAuthToken();
  const headers = new Headers(init?.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const method = (init?.method || 'GET').toUpperCase();
  if (method !== 'GET') {
    clearAdminCache();
    return fetch(input, { ...init, headers });
  }

  // Deduplicate identical GET requests in flight
  const urlKey = typeof input === 'string' ? input : (input as any)?.url || String(input);
  if (inFlightRequests.has(urlKey)) {
    try {
      const existing = await inFlightRequests.get(urlKey)!;
      return existing.clone();
    } catch {
      inFlightRequests.delete(urlKey);
    }
  }

  const requestPromise = fetch(input, { ...init, headers });
  inFlightRequests.set(urlKey, requestPromise);

  try {
    const res = await requestPromise;
    inFlightRequests.delete(urlKey);
    return res.clone();
  } catch (err) {
    inFlightRequests.delete(urlKey);
    throw err;
  }
};
