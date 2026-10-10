import React, { useState, useEffect, useCallback } from 'react';
import { Users, KeyRound, UserCheck, UserX, RefreshCw, Search } from 'lucide-react';
import { adminFetch, getAdminCachedData, setAdminCachedData } from '../../utils/adminApi';

interface U {
  sno: number; id: string; name: string; phone: string; email: string;
  hasPassword: boolean; loginCount: number; lastLogin: string | null;
  lastDevice: string; lastIp: string; status: string; createdAt: string;
}

const AdminUsers: React.FC = () => {
  const [stats, setStats] = useState<any>(() => getAdminCachedData('admin_users_stats'));
  const [users, setUsers] = useState<U[]>(() => getAdminCachedData<U[]>('admin_users_list') || []);
  const [recent, setRecent] = useState<any[]>(() => getAdminCachedData<any[]>('admin_users_recent') || []);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(() => !getAdminCachedData('admin_users_list'));

  const load = useCallback(async (search?: string) => {
    const cacheKeyUsers = search ? `admin_users_list_${search.trim()}` : 'admin_users_list';
    const cachedUsers = getAdminCachedData<U[]>(cacheKeyUsers);
    if (cachedUsers && cachedUsers.length > 0) {
      setUsers(cachedUsers);
    } else {
      setLoading(true);
    }
    try {
      const res = await adminFetch(`/api/admin/users-overview${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      const d = await res.json();
      setStats(d.stats);
      setUsers(d.users || []);
      setRecent(d.recentLogins || []);
      if (!search) {
        setAdminCachedData('admin_users_stats', d.stats);
        setAdminCachedData('admin_users_recent', d.recentLogins || []);
      }
      setAdminCachedData(cacheKeyUsers, d.users || []);
    } catch { /* keep old data */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const when = (v?: string | null) => {
    if (!v) return '—';
    const d = new Date(v);
    return isNaN(d.getTime()) ? '—' : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const card = (icon: React.ReactNode, label: string, value: any, color: string) => (
    <div className={`p-4 rounded-2xl border border-slate-200 dark:border-slate-800 ${color}`}>
      <div className="flex items-center gap-2 mb-1.5">{icon}<span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span></div>
      <div className="text-2xl font-black text-slate-900 dark:text-white">{value ?? '—'}</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" /> Users & Logins
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Kitne users, kitno ne login kiya — number aur naam ke saath.</p>
        </div>
        <button onClick={() => load(q.trim() || undefined)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/20 transition cursor-pointer">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {card(<Users className="w-4 h-4 text-emerald-600" />, 'Total Users', stats?.totalUsers, 'bg-emerald-50 dark:bg-emerald-950/40')}
        {card(<KeyRound className="w-4 h-4 text-indigo-600" />, 'Password Set', stats?.withPassword, 'bg-indigo-50 dark:bg-indigo-950/40')}
        {card(<UserCheck className="w-4 h-4 text-blue-600" />, 'Logged In', stats?.loggedIn, 'bg-blue-50 dark:bg-blue-950/40')}
        {card(<UserX className="w-4 h-4 text-rose-600" />, 'Never Logged In', stats?.neverLoggedIn, 'bg-rose-50 dark:bg-rose-950/40')}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); load(q.trim() || undefined); }} className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, phone number or email..." className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white" />
        </div>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold cursor-pointer shadow-sm shadow-brand-600/20">Search</button>
      </form>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-3 py-3 text-left">#</th>
                <th className="px-3 py-3 text-left">Name</th>
                <th className="px-3 py-3 text-left">Mobile Number</th>
                <th className="px-3 py-3 text-center">Password</th>
                <th className="px-3 py-3 text-center">Logins</th>
                <th className="px-3 py-3 text-left">Last Login</th>
                <th className="px-3 py-3 text-left">Device / IP</th>
                <th className="px-3 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={8} className="px-3 py-10 text-center text-slate-400 font-bold">Loading...</td></tr>}
              {!loading && users.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-slate-400 font-bold">No users found.</td></tr>}
              {!loading && users.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-3 py-2.5 text-slate-400 font-bold">{u.sno}</td>
                  <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-slate-700 dark:text-slate-200">{u.phone || '—'}</td>
                  <td className="px-3 py-2.5 text-center">
                    {u.hasPassword
                      ? <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 text-[10px] font-black">SET</span>
                      : <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 text-[10px] font-black">NO</span>}
                  </td>
                  <td className="px-3 py-2.5 text-center font-black text-slate-900 dark:text-white">{u.loginCount}</td>
                  <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300">{when(u.lastLogin)}</td>
                  <td className="px-3 py-2.5 text-slate-500">
                    <div>{u.lastDevice || '—'}</div>
                    <div className="text-[10px] font-mono">{u.lastIp || ''}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${u.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>{u.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-500" /> Recent Logins — Active Sessions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {recent.map((r, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white">{r.name}</span>
                  <span className="text-[10px] text-slate-400">{when(r.when)}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">{r.phone || '—'} · {r.device} · {r.ip}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { AdminUsers };
export default AdminUsers;
