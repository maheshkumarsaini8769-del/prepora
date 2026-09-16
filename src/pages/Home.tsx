import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  Clock,
  Target,
  ArrowRight,
  Flame,
  Bookmark,
  AlertCircle,
  BarChart3,
  Sparkles,
  Zap,
  Atom,
  FlaskConical,
  Calculator,
  Dna
} from 'lucide-react';
import { userService } from '../services/userService';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const studentName = user.name ? user.name.split(' ')[0] : 'Student';
  const targetExam = user.targetExam || 'JEE';
  const classLevel = user.classLevel || '12';

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 px-2 sm:px-4 animate-in fade-in duration-300">
      
      {/* 1. TOP STUDENT WELCOME BAR (Clean & Uncluttered) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              नमस्ते, {studentName} 👋
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold border border-purple-200">
              {targetExam} 2026
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            कक्षा {classLevel}वीं • अपनी पसंद का विकल्प चुनें और तैयारी शुरू करें।
          </p>
        </div>

        {/* Streak & Exam Target Pill */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{user.streakDays > 0 ? `${user.streakDays} Day Streak` : '0 Day Streak'}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="px-3.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            Change Target
          </button>
        </div>
      </div>

      {/* 2. THE 3 MAIN GATEWAYS (HERO ACTION CARDS - क्रिस्टल क्लियर) */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>यहाँ से शुरू करें (Choose What You Want to Do)</span>
          </h2>
          <p className="text-xs text-slate-500">
            तैयारी के 3 मुख्य रास्ते — पेपर्स देखें, चैप्टर अभ्यास करें या मॉक टेस्ट दें
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Previous Year Papers */}
          <div
            onClick={() => navigate('/papers')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-purple-50/60 to-white border-2 border-purple-200/90 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer flex flex-col justify-between space-y-6 transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <FileText className="w-7 h-7" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
                  2020 – 2025 Official Papers
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1.5 group-hover:text-purple-700 transition">
                  Previous Year Papers
                </h3>
                <p className="text-xs font-bold text-purple-700 mt-0.5">
                  (हल और उत्तर कुंजी सहित)
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                NEET, JEE, RBSE और CBSE के पिछले 5 वर्षों के सभी असली पेपर्स। प्रत्येक सवाल का <strong>सही उत्तर व विस्तृत हल (Step-by-Step Solutions)</strong> सीधे देखें।
              </p>
            </div>

            <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-black text-purple-700 flex items-center gap-1">
                पेपर्स व उत्तर देखें
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Chapter & Topic Practice */}
          <div
            onClick={() => navigate('/practice')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-emerald-50/60 to-white border-2 border-emerald-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-6 transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <Target className="w-7 h-7" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  18,000+ Questions Pool
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1.5 group-hover:text-emerald-700 transition">
                  Chapter-Wise Practice
                </h3>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  (चैप्टर व टॉपिक अभ्यास)
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Physics, Chemistry, Maths और Biology के सभी 106 चैप्टर्स। अपनी पसंद का टॉपिक चुनें, सवाल हल करें और तुरंत सही उत्तर जानें।
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                अभ्यास शुरू करें
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Timed Mock Tests */}
          <div
            onClick={() => navigate('/tests')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white border-2 border-indigo-200/90 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between space-y-6 transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <Clock className="w-7 h-7" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider">
                  Real Exam Simulation
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1.5 group-hover:text-indigo-700 transition">
                  Full Mock Tests
                </h3>
                <p className="text-xs font-bold text-indigo-700 mt-0.5">
                  (टाइमर के साथ ऑनलाइन टेस्ट)
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                असली परीक्षा माहौल में 3 घंटे का टेस्ट दें। लाइव टाइमर, +4/-1 निगेटिव मार्किंग और टेस्ट सबमिट करते ही पूरी रैंक व स्कोरकार्ड देखें।
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-black text-indigo-700 flex items-center gap-1">
                मॉक टेस्ट सेंटर जाएं
              </span>
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. QUICK SUBJECT JUMP (सीधे विषय अनुसार प्रश्न हल करें) */}
      <div className="space-y-3 pt-2">
        <div className="px-1">
          <h2 className="text-base font-black text-slate-900">
            Direct Subject Jump (विषय अनुसार प्रश्न)
          </h2>
          <p className="text-xs text-slate-500">
            जिस विषय की तैयारी करनी है उस पर सीधे क्लिक करें:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Physics */}
          <button
            type="button"
            onClick={() => navigate('/practice?subject=Physics')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Atom className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-slate-900 group-hover:text-purple-700 transition">
              Physics
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              4,529 Questions • 29 Chapters
            </div>
          </button>

          {/* Chemistry */}
          <button
            type="button"
            onClick={() => navigate('/practice?subject=Chemistry')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition">
              Chemistry
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              4,205 Questions • 28 Chapters
            </div>
          </button>

          {/* Mathematics */}
          <button
            type="button"
            onClick={() => navigate('/practice?subject=Mathematics')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-slate-900 group-hover:text-indigo-700 transition">
              Mathematics
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              4,552 Questions • 29 Chapters
            </div>
          </button>

          {/* Biology */}
          <button
            type="button"
            onClick={() => navigate('/practice?subject=Biology')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Dna className="w-5 h-5" />
            </div>
            <div className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition">
              Biology
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              4,950 Questions • 20 Chapters
            </div>
          </button>
        </div>
      </div>

      {/* 4. ESSENTIAL STUDENT UTILITIES (चार जरूरी टूल्स) */}
      <div className="space-y-3 pt-2">
        <div className="px-1">
          <h2 className="text-base font-black text-slate-900">
            Quick Tools (जरूरी टूल्स)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Mistake Book */}
          <div
            onClick={() => navigate('/mistakes')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition">
              Mistake Book
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              गलत सवालों की लिस्ट
            </div>
          </div>

          {/* Fix Weakness */}
          <div
            onClick={() => navigate('/weakness')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition">
              Weakness Doctor
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              कमजोर चैप्टर सुधारें
            </div>
          </div>

          {/* Bookmarks */}
          <div
            onClick={() => navigate('/bookmarks')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <Bookmark className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition">
              Bookmarks
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              सेव किए गए प्रश्न
            </div>
          </div>

          {/* Performance Analytics */}
          <div
            onClick={() => navigate('/performance')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
              My Performance
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              एक्यूरेसी और स्कोर
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
