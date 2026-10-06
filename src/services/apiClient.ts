const API_BASE = '/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('prepora_auth_token') : null;
    const authHeaders: Record<string, string> = {};
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const isAuthError = res.status === 401 || (res.status === 403 && (errJson?.message?.toLowerCase().includes('block') || errJson?.message?.toLowerCase().includes('suspend')));

      if (isAuthError && typeof window !== 'undefined') {
        localStorage.removeItem('prepora_auth_token');
        try {
          localStorage.setItem('prepora_logout_signal', String(Date.now()));
        } catch {}
        window.dispatchEvent(
          new CustomEvent('prepora:session_revoked', {
            detail: {
              reason: errJson?.code || 'SESSION_REVOKED',
              message: errJson?.message || 'Your session has ended or was terminated by an administrator. Please log in again.'
            }
          })
        );
      }
      return {
        data: null,
        error: errJson?.message || `Request failed with status ${res.status}`
      };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message || 'Network error / API unreachable'
    };
  }
}
