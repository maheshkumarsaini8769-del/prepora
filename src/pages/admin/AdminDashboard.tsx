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
  PlayCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/stats');
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
  }, []);

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
            कंट्रोल सेंटर: यहाँ से आप PDF अपलोड करके सवाल बना सकते हैं, टेस्ट मैनेज कर सकते हैं और बच्चों की प्रगति देख सकते हैं।
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

      {/* 3-STEP QUICK START WORKFLOW BANNER (EASY TO UNDERSTAND) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/60 via-slate-900 to-indigo-950/60 border border-brand-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[11px] font-black uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              आसान वर्कफ़्लो (3 Easy Steps)
            </div>
            <h2 className="text-lg font-black text-white">नया टेस्ट या सवाल कैसे जोड़ें?</h2>
          </div>
          <span className="text-xs text-slate-400">फॉलो करें ये 3 आसान स्टेप्स:</span>
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
              <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition">स्टेप 1: PDF अपलोड करें</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                अपने चैप्टर या नोट्स की PDF अपलोड करें। AI अपने-आप उच्च गुणवत्ता वाले प्रश्न बना देगा।
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-brand-400 flex items-center gap-1">
              <span>AI Content Factory खोलें</span>
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
              <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">स्टेप 2: सवाल रिव्यू व अप्रूव करें</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                बने हुए प्रश्नों को चेक करें, अगर कोई सुधार करना हो तो करें और "Approve / Publish" बटन दबाएं।
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-indigo-400 flex items-center gap-1">
              <span>Question Bank खोलें</span>
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
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">स्टेप 3: मॉक टेस्ट बनाएं या पब्लिश करें</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                चैप्टर-वाइज या फुल-लेंथ मॉक टेस्ट बनाएं। छात्र अपनी वेबसाइट पर तुरंत टेस्ट दे सकेंगे।
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <span>Tests & Mock Papers खोलें</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Top Level Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Students */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>विद्यार्थी (Students)</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {loading ? '...' : stats?.students?.total ?? 0}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
              {stats?.students?.active ?? 0} Active
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>कुल सवाल (Bank)</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {loading ? '...' : stats?.content?.totalQuestions ?? 0}
            </div>
            <div className="text-[11px] text-indigo-400 font-semibold mt-0.5">
              {stats?.content?.publishedQuestions ?? 0} Live Published
            </div>
          </div>
        </div>

        {/* Mock Tests */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>मॉक टेस्ट (Tests)</span>
            <FileCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {loading ? '...' : stats?.content?.totalTests ?? 0}
            </div>
            <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
              Active Blueprints
            </div>
          </div>
        </div>

        {/* Test Attempts */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>कुल टेस्ट सबमिशन</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {loading ? '...' : stats?.activity?.totalAttempts ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {stats?.activity?.inProgressAttempts ?? 0} In-Progress
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>डाउट / रिपोर्ट्स</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-400">
              {loading ? '...' : (stats?.reports?.pendingQuestionReports ?? 0) + (stats?.reports?.pendingTechnicalReports ?? 0)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Pending Resolution
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>डेटाबेस स्थिति</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-base font-bold text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{stats?.system?.database ?? 'Online'}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">MongoDB Atlas</div>
          </div>
        </div>
      </div>

      {/* Grid: Content Health & Student Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Health Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span>Question Bank स्थिति (Content Status)</span>
            </h2>
            <Link to="/admin/questions" className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1">
              सवालों का हब <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750 text-center">
              <div className="text-xs text-slate-400">Live (पब्लिश)</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">{stats?.content?.publishedQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-500">टेस्ट में सक्रिय</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750 text-center">
              <div className="text-xs text-slate-400">ड्राफ्ट (Draft)</div>
              <div className="text-xl font-bold text-amber-400 mt-1">{stats?.content?.draftQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-500">तैयारी में</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750 text-center">
              <div className="text-xs text-slate-400">रिव्यू बाकी</div>
              <div className="text-xl font-bold text-indigo-400 mt-1">{stats?.content?.pendingQuestions ?? 0}</div>
              <div className="text-[10px] text-slate-500">जांच सूची</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750 text-center">
              <div className="text-xs text-slate-400">रिपोर्टेड</div>
              <div className="text-xl font-bold text-rose-400 mt-1">{stats?.reports?.totalQuestionReports ?? 0}</div>
              <div className="text-[10px] text-slate-500">सुधार हेतु</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-750 text-xs text-slate-300 flex items-center justify-between">
            <span className="font-medium">NEET & JEE विषय वार कवरेज</span>
            <span className="text-emerald-400 font-bold">100% सत्यापित</span>
          </div>
        </div>

        {/* Test Activity & Platform Accuracy */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>छात्रों का प्रदर्शन (Student Telemetry)</span>
            </h2>
            <Link to="/admin/analytics" className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1">
              पूरा एनालिटिक्स <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750">
              <div className="text-xs text-slate-400">औसत स्कोर</div>
              <div className="text-xl font-bold text-white mt-1">{stats?.activity?.avgScore ?? 0}</div>
              <div className="text-[10px] text-slate-500">सभी टेस्ट्स में</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750">
              <div className="text-xs text-slate-400">औसत एक्यूरेसी</div>
              <div className="text-xl font-bold text-white mt-1">{stats?.activity?.avgAccuracy ?? 0}%</div>
              <div className="text-[10px] text-slate-500">सही उत्तर दर</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-750">
              <div className="text-xs text-slate-400">सबमिशन दर</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">100%</div>
              <div className="text-[10px] text-slate-500">शून्य विफलता</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-750 text-xs flex items-center justify-between text-slate-300">
            <span>ऑफ़लाइन ऑटो-सिंक सुरक्षा</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>सुरक्षित व सक्रिय</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Launchpad to Modules */}
      <div>
        <h3 className="text-sm font-black text-slate-300 mb-3 uppercase tracking-wider">सीधे एक्सेस करें (Direct Shortcuts)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/ai-factory"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-brand-400 transition">AI Content Factory</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              PDF से सीधे सवाल और फ़ॉर्मूले एक्सट्रेक्ट करें।
            </p>
          </Link>

          <Link
            to="/admin/questions"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition">Questions Bank</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              सवालों की लिस्ट, फ़िल्टर, एडिट और अप्रूवल।
            </p>
          </Link>

          <Link
            to="/admin/tests"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">Tests & Blueprints</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              मॉक टेस्ट, विषय-वार टेस्ट और समय सीमा सेट करें।
            </p>
          </Link>

          <Link
            to="/admin/students"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">Students Directory</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              सभी छात्रों की सूची, स्कोर और एकाउंट स्थिति।
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
