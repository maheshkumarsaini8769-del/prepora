export interface AuthorizedAdmin {
  email: string;
  role: 'SUPER ADMIN' | 'CONTENT MANAGER' | 'REVIEWER';
  addedAt: string;
  addedBy: string;
  isPrimary?: boolean;
}

const STORAGE_KEY = 'prepora_authorized_admins';

// Primary Super Admin emails (permanent)
export const PRIMARY_ADMIN_EMAILS = [
  'maheshkumarsaini8769@gmail.com',
  'admin@prepora.com'
];

class AdminAuthorityService {
  private cache: AuthorizedAdmin[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    // Load from localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
      }
    } catch {
      this.cache = [];
    }

    // Ensure primary admins are always present in the whitelist
    PRIMARY_ADMIN_EMAILS.forEach(email => {
      const norm = email.toLowerCase().trim();
      if (!this.cache.some(a => a.email.toLowerCase().trim() === norm)) {
        this.cache.unshift({
          email: norm,
          role: 'SUPER ADMIN',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'System Primary',
          isPrimary: true
        });
      }
    });

    this.isInitialized = true;
    this.syncFromCloud();
  }

  private async syncFromCloud() {
    try {
      const res = await fetch('/api/admin/authorities');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.authorities) && data.authorities.length > 0) {
          const map = new Map<string, AuthorizedAdmin>();
          // Cloud authorities
          data.authorities.forEach((a: AuthorizedAdmin) => map.set(a.email.toLowerCase().trim(), a));
          // Permanent primary admins
          PRIMARY_ADMIN_EMAILS.forEach(email => {
            const norm = email.toLowerCase().trim();
            if (!map.has(norm)) {
              map.set(norm, {
                email: norm,
                role: 'SUPER ADMIN',
                addedAt: '2026-01-01T00:00:00.000Z',
                addedBy: 'System Primary',
                isPrimary: true
              });
            }
          });
          this.cache = Array.from(map.values());
          this.saveLocal();
        }
      }
    } catch {
      // Offline fallback to local cache
    }
  }

  private saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
    } catch {}
  }

  public getAuthorizedAdmins(): AuthorizedAdmin[] {
    if (!this.isInitialized) this.init();
    return [...this.cache];
  }

  public isAuthorizedAdmin(email?: string | null): boolean {
    if (!email) return false;
    const cleanEmail = email.toLowerCase().trim();
    
    // Check primary hardcoded
    if (PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase().trim() === cleanEmail)) {
      return true;
    }

    // Check loaded cache
    return this.getAuthorizedAdmins().some(a => a.email.toLowerCase().trim() === cleanEmail);
  }

  public async addAuthorizedAdmin(
    email: string,
    role: 'SUPER ADMIN' | 'CONTENT MANAGER' | 'REVIEWER' = 'SUPER ADMIN',
    addedBy: string = 'Super Admin'
  ): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (this.isAuthorizedAdmin(cleanEmail)) {
      return { success: false, message: `Email "${cleanEmail}" is already authorized as an Administrator.` };
    }

    const newAdmin: AuthorizedAdmin = {
      email: cleanEmail,
      role,
      addedAt: new Date().toISOString(),
      addedBy,
      isPrimary: false
    };

    this.cache.push(newAdmin);
    this.saveLocal();

    // Push to server/MongoDB
    try {
      await fetch('/api/admin/authorities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
    } catch {}

    return { success: true, message: `Successfully granted Administrator authority to ${cleanEmail}!` };
  }

  public async revokeAuthorizedAdmin(email: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.toLowerCase().trim();
    if (PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase().trim() === cleanEmail)) {
      return { success: false, message: 'Cannot revoke access for the Primary System Owner.' };
    }

    this.cache = this.cache.filter(a => a.email.toLowerCase().trim() !== cleanEmail);
    this.saveLocal();

    try {
      await fetch(`/api/admin/authorities?email=${encodeURIComponent(cleanEmail)}`, {
        method: 'DELETE'
      });
    } catch {}

    return { success: true, message: `Successfully revoked Admin authority for ${cleanEmail}.` };
  }
}

export const adminAuthorityService = new AdminAuthorityService();
