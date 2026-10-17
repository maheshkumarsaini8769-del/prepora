import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Radio,
  Search,
  RefreshCw,
  Smartphone,
  Monitor,
  Bell,
  Clock,
  Shield,
  Send,
  Sparkles,
  Wifi,
  ExternalLink,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { adminFetch } from '../../utils/adminApi';

interface ActiveStudent {
  id: string;
  sessionId: string;
  name: string;
  phone: string;
  email: string;
  targetExam: string;
  classLevel: string;
  device: string;
  browser: string;
  ipAddress: string;
  isOnlineNow: boolean;
  lastActiveAgoSec: number;
  lastActive: string;
  sessionDurationMinutes: number;
  studyTimeMinutes: number;
}

export const AdminActiveUsers: React.FC = () => {
  const [users, setUsers] = useState<ActiveStudent[]>([]);
  const [stats, setStats] = useState({ onlineNow: 0, activeInWindow: 0, activeToday: 0, windowMinutes: 15 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState<'ALL' | 'JEE' | 'NEET' | 'CBSE'>('ALL');
  const [windowMinutes, setWindowMinutes] = useState<number>(15);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const navigate = useNavigate();

  // Quick Inline Name Edit State
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditName, setInlineEditName] = useState<string>('');
  const [savingInlineId, setSavingInlineId] = useState<string | null>(null);

  const handleSaveInlineName = async (st: ActiveStudent) => {
    if (!inlineEditName.trim()) return;
    setSavingInlineId(st.id);
    try {
      const res = await adminFetch(`/api/admin/students/${encodeURIComponent(st.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inlineEditName.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === st.id ? { ...u, name: inlineEditName.trim() } : u))
        );
        setInlineEditingId(null);
      }
    } catch (e) {
      console.error('Failed to update student name in active users:', e);
    } finally {
      setSavingInlineId(null);
    }
  };

  const fetchActiveUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('window', String(windowMinutes));
      if (examFilter !== 'ALL') params.set('exam', examFilter);
      if (search.trim()) params.set('search', search.trim());

      const res = await adminFetch(`/api/admin/active-users?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        setStats(data.stats || { onlineNow: 0, activeInWindow: 0, activeToday: 0, windowMinutes });
        setLastRefreshedAt(new Date());
      }
    } catch (e) {
      console.error('Failed to fetch active users:', e);
    } finally {
      setLoading(false);
    }
  }, [windowMinutes, examFilter, search]);

  useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]);

  // Real-time polling every 12 seconds when autoRefresh is enabled
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchActiveUsers();
    }, 12000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchActiveUsers]);

  const formatAgo = (sec: number) => {
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    return `${hr}h ago`;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with Live Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>REAL-TIME ONLINE TELEMETRY</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-emerald-500 animate-pulse" />
            <span>Active Users Monitor</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live monitoring dashboard displaying students currently studying or browsing PREPORA right now.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              autoRefresh
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Wifi className={`w-3.5 h-3.5 ${autoRefresh ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>{autoRefresh ? 'Live Auto-Poll (12s)' : 'Polling Paused'}</span>
          </button>

          <button
            type="button"
            onClick={fetchActiveUsers}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-brand-600/20 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <Link
            to="/admin/notifications"
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Send Alert to Students</span>
          </Link>
        </div>
      </div>

      {/* Top 3 Live Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Online Right Now
            </span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
            <span>{stats.onlineNow}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Students Active (&lt; 5m)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Active in Window ({windowMinutes}m)
            </span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
            <span>{stats.activeInWindow}</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Unique Students</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Total Active Today
            </span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
            <span>{stats.activeToday}</span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Cumulative Sessions</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, mobile or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Time Window Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Window:</span>
            {[5, 15, 30, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setWindowMinutes(mins)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  windowMinutes === mins
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mins} mins
              </button>
            ))}
          </div>

          {/* Exam Filter Tabs */}
          <div className="flex items-center gap-1">
            {(['ALL', 'JEE', 'NEET', 'CBSE'] as const).map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setExamFilter(ex)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  examFilter === ex
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Users Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>Active Students List</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
              {users.length} Active
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Updated: {lastRefreshedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {users.length === 0 ? (
          <div className="py-14 text-center space-y-2">
            <Radio className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No Active Students in Selected Window ({windowMinutes}m)
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Students who open the website or solve questions will automatically appear here live.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="px-3.5 py-3 text-left">Student</th>
                  <th className="px-3.5 py-3 text-left">Mobile & Email</th>
                  <th className="px-3.5 py-3 text-left">Target Exam</th>
                  <th className="px-3.5 py-3 text-left">Status</th>
                  <th className="px-3.5 py-3 text-left">Device / IP</th>
                  <th className="px-3.5 py-3 text-left">Online For</th>
                  <th className="px-3.5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map((st) => (
                  <tr key={st.sessionId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    {/* Name + Avatar */}
                    <td className="px-3.5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs">
                          {st.name ? st.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          {inlineEditingId === st.id ? (
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                value={inlineEditName}
                                onChange={(e) => setInlineEditName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveInlineName(st);
                                  if (e.key === 'Escape') setInlineEditingId(null);
                                }}
                                placeholder="Real name"
                                autoFocus
                                className="px-2 py-0.5 text-xs font-bold rounded border border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveInlineName(st)}
                                disabled={savingInlineId === st.id || !inlineEditName.trim()}
                                className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition disabled:opacity-50"
                                title="Save Real Name"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setInlineEditingId(null)}
                                className="p-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 cursor-pointer transition"
                                title="Cancel"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="group flex items-center gap-1.5">
                              <div className="font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5 flex-wrap">
                                <span>{st.name}</span>
                                {(st.name.startsWith('Student ') || /^Student \d+/i.test(st.name) || st.name === 'Aspirant') && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                    Set Name
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setInlineEditingId(st.id);
                                  setInlineEditName(st.name.startsWith('Student ') ? '' : st.name);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-emerald-500 rounded transition cursor-pointer"
                                title="Edit Real Name"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-400 font-mono">
                            ID: {st.id.slice(0, 12)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Mobile & Email */}
                    <td className="px-3.5 py-3 font-mono">
                      <div className="font-semibold text-slate-900 dark:text-slate-200">
                        {st.phone && st.phone !== '—' ? `+91 ${st.phone}` : '—'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans truncate max-w-[140px]">
                        {st.email}
                      </div>
                    </td>

                    {/* Target Exam & Class */}
                    <td className="px-3.5 py-3">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-extrabold text-[10px] text-slate-700 dark:text-slate-300">
                        {st.targetExam} • Class {st.classLevel}
                      </span>
                    </td>

                    {/* Online / Active Status */}
                    <td className="px-3.5 py-3">
                      {st.isOnlineNow ? (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Online Now ({formatAgo(st.lastActiveAgoSec)})</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Away ({formatAgo(st.lastActiveAgoSec)})</span>
                        </div>
                      )}
                    </td>

                    {/* Device & IP */}
                    <td className="px-3.5 py-3 text-[11px] text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1 font-medium">
                        {st.device.toLowerCase().includes('mobile') || st.device.toLowerCase().includes('phone') ? (
                          <Smartphone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="truncate max-w-[120px]">{st.device}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">{st.ipAddress || '127.0.0.1'}</div>
                    </td>

                    {/* Online Duration */}
                    <td className="px-3.5 py-3 font-semibold text-slate-700 dark:text-slate-300">
                      {st.sessionDurationMinutes} mins
                    </td>

                    {/* Actions */}
                    <td className="px-3.5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/notifications?phone=${encodeURIComponent(st.phone)}&name=${encodeURIComponent(st.name)}`)}
                          title="Send Direct Notification / Push Alert"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 transition cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          to={`/admin/students`}
                          title="Open Student Profile"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActiveUsers;
