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

export const adminFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const token = getAuthToken();
  const headers = new Headers(init?.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(input, {
    ...init,
    headers
  });
};
