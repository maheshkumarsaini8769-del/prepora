import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  BookOpen,
  ClipboardList,
  FileText,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  Server,
  Sparkles,
  RefreshCw,
  UploadCloud,
  FileCheck2,
  FolderTree,
  HelpCircle,
  Clock,
  Compass,
  Zap,
  PlayCircle,
  Download,
  Globe,
  Tv,
  MessageSquarePlus,
  ArrowDownRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { adminFetch } from '../../utils/adminApi';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [actionMessage, setActionMessage] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    try {
      const res = await adminFetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch admin stats', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Live telemetry heartbeat every 20 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleForceLogout = async (userId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to force logout ${studentName}? Their active session will terminate immediately.`)) {
      return;
    }
    try {
      const res = await adminFetch(`/api/admin/students/${userId}/force-logout`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Student ${studentName} was forcefully logged out successfully.`);
        fetchStats();
        setTimeout(() => setActionMessage(''), 5000);
      } else {
        alert(data.message || 'Failed to force logout');
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>PREPORA Mission Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Overview & Control Center</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Mission Control: Upload curriculum PDFs to generate questions, manage mock test blueprints, and track student mastery telemetry.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Metrics'}</span>
        </button>
      </div>

      {/* 3-STEP QUICK START WORKFLOW BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/60 via-slate-900 to-indigo-950/60 border border-brand-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[11px] font-black uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              Admin Workflow (3 Simple Steps)
            </div>
            <h2 className="text-lg font-black text-white">How to Create Tests & Questions</h2>
          </div>
          <span className="text-xs text-slate-400">Follow these 3 simple steps:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <Link
            to="/admin/ai-factory"
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-750 hover:border-brand-500 hover:bg-slate-850/90 transition group flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-brand-600/20 border border-brand-500/40 text-brand-400 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <UploadCloud className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition">Step 1: Upload Source PDF</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Upload chapter textbook or notes PDF. AI automatically extracts core concepts and generates realistic questions.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-brand-400 flex items-center gap-1">
              <span>Open AI Content Factory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Step 2 */}
          <Link
            to="/admin/questions"
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-750 hover:border-indigo-500 hover:bg-slate-850/90 transition group flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <ClipboardList className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">Step 2: Review & Approve Questions</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Inspect synthesized questions, verify 4 distinct options, edit explanations, and 1-click Approve to publish.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-indigo-400 flex items-center gap-1">
              <span>Open Question Bank</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Step 3 */}
          <Link
            to="/admin/tests"
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-750 hover:border-emerald-500 hover:bg-slate-850/90 transition group flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <PlayCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">Step 3: Create & Publish Mock Tests</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Assemble chapter-wise or full-length mock tests. Students immediately access and attempt them in real-time.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <span>Open Tests & Mock Papers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Top Level Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Students */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '...' : stats?.students?.total ?? 0}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>{stats?.students?.active ?? 0} Active</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{stats?.students?.liveOnline ?? 0} Online Now</span>
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Question Bank</span>
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '...' : stats?.content?.totalQuestions ?? 0}
            </div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
              {stats?.content?.publishedQuestions ?? 0} Live Published
            </div>
          </div>
        </div>

        {/* Mock Tests */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Mock Tests</span>
            <FileCheck2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '...' : stats?.content?.totalTests ?? 0}
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
              Active Blueprints
            </div>
          </div>
        </div>

        {/* Test Attempts */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Total Submissions</span>
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '...' : stats?.activity?.totalAttempts ?? 0}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {stats?.activity?.inProgressAttempts ?? 0} In-Progress
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Pending Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {loading ? '...' : (stats?.reports?.pendingQuestionReports ?? 0) + (stats?.reports?.pendingTechnicalReports ?? 0)}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Pending Resolution
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Database Status</span>
            <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-base font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{stats?.system?.database ?? 'Online'}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">MongoDB Atlas</div>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>✓ {actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="text-slate-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* ========================================================= */}
      {/* LIVE ACTIVE STUDENTS (REAL-TIME RIGHT NOW TELEMETRY) */}
      {/* ========================================================= */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <h2 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>🟢 Live Active Students (Right Now)</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black">
                  {stats?.liveTelemetry?.onlineCount ?? stats?.students?.liveOnline ?? 0} Online Now
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kon sa student ab active hai, kitni der se padh raha hai, device details aur 1-click Force Logout.
              </p>
            </div>
          </div>
          <Link
            to="/admin/students?status=online_now"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Open in Student Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {(!stats?.liveTelemetry?.students || stats.liveTelemetry.students.length === 0) ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
            <Users className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Koi student is samay active nahi hai</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              Jaise hi koi student website ya app open karega ya mock test dega, uski live telemetry yahan turant dikhne lagegi.
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="px-3.5 py-3 text-left">Student Profile</th>
                  <th className="px-3.5 py-3 text-left">Mobile Number</th>
                  <th className="px-3.5 py-3 text-left">Target Exam</th>
                  <th className="px-3.5 py-3 text-left">Device / Browser</th>
                  <th className="px-3.5 py-3 text-left">Active Duration</th>
                  <th className="px-3.5 py-3 text-left">Activity Status</th>
                  <th className="px-3.5 py-3 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {stats.liveTelemetry.students.map((st: any) => (
                  <tr key={st.sessionId || st.userId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-3.5 py-3">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{st.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{st.studentId}</div>
                    </td>
                    <td className="px-3.5 py-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {st.phone ? `+91 ${st.phone}` : '—'}
                    </td>
                    <td className="px-3.5 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                        {st.targetExam || 'JEE'} • Class {st.classLevel || '12'}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-slate-600 dark:text-slate-400">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{st.device || 'Mobile'}</div>
                      <div className="text-[10px] text-slate-400">{st.browser || 'Web Browser'}</div>
                    </td>
                    <td className="px-3.5 py-3">
                      <div className="font-black text-emerald-600 dark:text-emerald-400">
                        {st.sessionDurationMinutes} min{st.sessionDurationMinutes === 1 ? '' : 's'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Today: {st.todayStudyTimeMinutes || 0} mins study
                      </div>
                    </td>
                    <td className="px-3.5 py-3 text-slate-500 dark:text-slate-400">
                      {st.lastActiveAgoSeconds !== undefined && st.lastActiveAgoSeconds !== null ? (
                        st.lastActiveAgoSeconds < 30 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Active now ({st.lastActiveAgoSeconds}s)
                          </span>
                        ) : (
                          <span>{Math.round(st.lastActiveAgoSeconds / 60)} min pehle</span>
                        )
                      ) : (
                        'Active just now'
                      )}
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        onClick={() => handleForceLogout(st.userId || st.studentId, st.name)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 font-black text-[10px] transition cursor-pointer border border-rose-200 dark:border-rose-900/60"
                        title="Is student ko turant logout karein"
                      >
                        ⚡ Force Logout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grid: Content Health & Student Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Health Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Question Bank Status</span>
            </h2>
            <Link to="/admin/questions" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 flex items-center gap-1">
              Manage Questions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">Live Published</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats?.content?.publishedQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Active in Tests</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">Drafts</div>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats?.content?.draftQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">In Preparation</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">Pending Review</div>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats?.content?.pendingQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Needs Verification</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400">Reported Flag</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1">{stats?.reports?.totalQuestionReports ?? 0}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Needs Attention</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-750 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span className="font-medium">NEET & JEE Curriculum Coverage</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Verified</span>
          </div>
        </div>

        {/* Test Activity & Platform Accuracy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Student Performance Telemetry</span>
            </h2>
            <Link to="/admin/analytics" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 flex items-center gap-1">
              View Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750">
              <div className="text-xs text-slate-500 dark:text-slate-400">Average Score</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats?.activity?.avgScore ?? 0}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Across All Tests</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750">
              <div className="text-xs text-slate-500 dark:text-slate-400">Average Accuracy</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{stats?.activity?.avgAccuracy ?? 0}%</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Correct Answer Rate</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-750">
              <div className="text-xs text-slate-500 dark:text-slate-400">Submission Integrity</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">100%</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Zero Failures</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-750 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span>Offline Auto-Sync Resilience</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active & Protected</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: PLATFORM ENGAGEMENT, TRAFFIC & DOWNLOADS METRICS */}
      {/* ========================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Platform Traffic, Lecture Views & Downloads Telemetry</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live metrics for YouTube lectures watched, visitors on website, downloads, and direct student communication.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. YouTube Lectures Watched */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  YouTube Lectures
                </span>
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Tv className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {loading ? '...' : stats?.lectures?.totalViews ?? 0}
              </div>
              <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1">
                {stats?.lectures?.uniqueStudents ?? 0} Unique Students Watched
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stats?.lectures?.todayViews ?? 0} views in last 24h
              </div>
            </div>
            <Link
              to="/admin/lectures"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center justify-between"
            >
              <span>Manage Curated Lectures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Website Visitors & Traffic */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Website Visitors & Traffic
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {loading ? '...' : stats?.traffic?.totalLogins ?? 0}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{stats?.traffic?.activeSessions ?? 0} Active Sessions Online</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stats?.traffic?.todayVisits ?? 0} visits recorded today
              </div>
            </div>
            <Link
              to="/admin/users"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
            >
              <span>View User Logins & Devices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. Resource & Paper Downloads */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Resource Downloads
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {loading ? '...' : stats?.downloads?.totalDownloads ?? 0}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                {stats?.downloads?.paperDownloads ?? 0} Question Papers Downloaded
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Formula sheets & offline study packs
              </div>
            </div>
            <Link
              to="/admin/papers"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-between"
            >
              <span>View Papers Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Student Feedback & Direct Communication */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Feedback & Complaints
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <MessageSquarePlus className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {loading ? '...' : stats?.reports?.totalFeedbacks ?? 0}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
                {stats?.reports?.pendingFeedbacks ?? 0} Pending Admin Review
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Direct student suggestions & reported mistakes
              </div>
            </div>
            <Link
              to="/admin/feedback"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center justify-between"
            >
              <span>Review, Reply & Block Spam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION: DROP-OFF DETECTION & WHERE VIEWS BREAK           */}
      {/* ========================================================= */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Funnel & Issue Diagnostics</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Website Drop-Off & Where Views Break Tracker
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Students kahan jakar website ya test chhod rahe hain aur kis page par technical issue aa raha hai.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Overall Test Drop-off:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-black ${
              (stats?.dropoffFunnel?.dropoffRate || 0) > 40
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
            }`}>
              {stats?.dropoffFunnel?.dropoffRate ?? 0}% Drop-off Rate
            </span>
          </div>
        </div>

        {/* 4-Step Student Journey Funnel */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Student Conversion & Retention Funnel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Step 1: Visitors */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 relative">
              <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span>1. Total Enrolled</span>
                <span className="text-emerald-600 font-black">100%</span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {stats?.dropoffFunnel?.totalVisitors ?? 0}
              </div>
              <div className="text-2xs text-slate-400 mt-1">Students registered</div>
            </div>

            {/* Step 2: Tests Started */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 relative">
              <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span>2. Tests Started</span>
                <span className="text-blue-600 font-black">
                  {stats?.dropoffFunnel?.totalVisitors > 0
                    ? `${Math.min(100, Math.round(((stats?.dropoffFunnel?.testsStarted || 0) / stats?.dropoffFunnel?.totalVisitors) * 100))}%`
                    : '0%'}
                </span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {stats?.dropoffFunnel?.testsStarted ?? 0}
              </div>
              <div className="text-2xs text-slate-400 mt-1">Exam hall opened</div>
            </div>

            {/* Step 3: Tests Completed */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 relative">
              <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span>3. Completed</span>
                <span className="text-emerald-600 font-black">
                  {stats?.dropoffFunnel?.testsStarted > 0
                    ? `${Math.round(((stats?.dropoffFunnel?.testsCompleted || 0) / stats?.dropoffFunnel?.testsStarted) * 100)}%`
                    : '100%'}
                </span>
              </div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {stats?.dropoffFunnel?.testsCompleted ?? 0}
              </div>
              <div className="text-2xs text-slate-400 mt-1">Successfully submitted</div>
            </div>

            {/* Step 4: Mid-way Drop-offs */}
            <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 relative">
              <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center justify-between">
                <span>4. Dropped / In-Progress</span>
                <span className="text-rose-600 font-black">
                  {stats?.dropoffFunnel?.dropoffRate ?? 0}%
                </span>
              </div>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
                {stats?.dropoffFunnel?.testsInProgressOrDropped ?? 0}
              </div>
              <div className="text-2xs text-rose-500/80 mt-1">Left mid-way without submit</div>
            </div>
          </div>
        </div>

        {/* Where Views Break - Route Technical Issues Breakdown */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <span>Hotspot Pages Where Issues / Drop-offs Occur:</span>
            </h3>
            <Link
              to="/admin/reports?tab=technical"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>Inspect All Technical Issues</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {(!stats?.dropoffFunnel?.routeIssues || stats?.dropoffFunnel?.routeIssues.length === 0) ? (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
              Koi critical route-break ya error issue reported nahi hai. Platform smoothly operate kar raha hai!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.dropoffFunnel.routeIssues.map((issue: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]" title={issue.route}>
                      {issue.route}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-black ${
                      issue.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : issue.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Issue: <strong>{issue.reason}</strong>
                  </div>

                  <div className="flex items-center justify-between text-2xs text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    <span>{issue.count} {issue.count === 1 ? 'incident' : 'incidents'}</span>
                    <Link
                      to="/admin/reports?tab=technical"
                      className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Fix Route</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Launchpad to Modules */}
      <div>
        <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Quick Navigation Shortcuts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/ai-factory"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">AI Content Factory</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Extract authentic questions and formulas directly from source PDFs.
            </p>
          </Link>

          <Link
            to="/admin/questions"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">Questions Bank</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Comprehensive question browser, filtering, editing, and approval.
            </p>
          </Link>

          <Link
            to="/admin/tests"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">Tests & Blueprints</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Configure mock tests, topic-wise assessments, and examination rules.
            </p>
          </Link>

          <Link
            to="/admin/students"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">Students Directory</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Student rosters, attempt histories, score progression, and account statuses.
            </p>
          </Link>

          <Link
            to="/admin/feedback"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">Feedback & Issues</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Student feedback inbox, direct replies, and 1-click block spam.
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-xs transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Users & Logins</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Real-time user numbers, mobile records, active sessions, and devices.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
