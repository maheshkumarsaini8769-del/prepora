import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GraduationCap,
  FileText,
  Zap,
  Clock,
  Play,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Target,
  ChevronRight,
  ShieldCheck,
  Radio,
  Layers,
  AlertTriangle,
  AlertCircle,
  BarChart2,
  Calendar,
  X
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { progressService } from '../services/progressService';
import { ecosystemService } from '../services/ecosystemService';
import { syncEngine } from '../services/syncEngine';
import { StudySessionModal } from '../components/common/StudySessionModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const [dailyPlan, setDailyPlan] = useState(() => ecosystemService.getDailyPlan());
  const [showStudyModal, setShowStudyModal] = useState<boolean>(false);
  const [studySessionModalOpen, setStudySessionModalOpen] = useState<boolean>(false);
  const [selectedSprintTime, setSelectedSprintTime] = useState<10 | 20 | 30 | 45 | 60>(20);

  // Active Session Continuation
  const [activeTest, setActiveTest] = useState(() => syncEngine.getLatestActiveTest());
  const [activePractice, setActivePractice] = useState(() => syncEngine.getActivePractice());

  const topRecommendation = ecosystemService.getTopStudyRecommendation();
  const readiness = ecosystemService.getExamReadiness(user.targetExam);
  const weaknesses = progressService.getTopicWeaknesses().slice(0, 3);

  const handleToggleDailyPlan = (id: string) => {
    const updated = ecosystemService.toggleDailyPlanItem(id);
    setDailyPlan({ ...updated });
  };

  const completedTasksCount = dailyPlan.items.filter(i => i.status === 'completed').length;
  const totalTasksCount = dailyPlan.items.length;
  const planProgressPercent = Math.min(
    100,
    Math.round((dailyPlan.completedMinutes / Math.max(1, dailyPlan.totalDurationMinutes)) * 100)
  );

  const todayQuestions = user.todayQuestionsCount || 24;
  const targetQuestions = user.dailyGoalQuestions || 50;
  const dailyProgressPercent = Math.min(100, Math.round((todayQuestions / targetQuestions) * 100));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fadeIn">
      {/* 1. TOP STUDENT STATUS BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:px-5 sm:py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-50 border border-brand-200/60 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
            </span>
            <span className="text-xs font-bold text-brand-700 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-brand-600 animate-pulse" />
              1,540+ Aspirants Studying Now
            </span>
          </div>

          <span className="hidden md:inline text-slate-300">•</span>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Target:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 font-bold text-slate-800 border border-slate-200">
              {user.targetExam || 'JEE'} {user.targetYear || 2026}
            </span>
            <span className="text-slate-400 font-normal">Class {user.classLevel || 12}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-300/60 text-amber-800 text-xs font-black shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{user.streakDays || 1} Day Streak</span>
          </div>

          <button
            onClick={() => setStudySessionModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Quick Sprint</span>
          </button>
        </div>
      </div>

      {/* 2. WELCOME BANNER & DAILY GOAL SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Friendly Greeting & Clear Next Step */}
        <div className="lg:col-span-8 bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Aspirant Dashboard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Hi, {user.name ? user.name.split(' ')[0] : 'Student'} 👋
            </h1>

            <p className="text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
              Welcome to PREPORA! Choose a study hub below or follow your personalized daily recommendation to boost your score.
            </p>
          </div>

          <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(topRecommendation.actionUrl)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-black text-xs shadow-md shadow-black/10 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Recommended Topic</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </button>

            <button
              onClick={() => navigate('/practice')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 backdrop-blur-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse All Chapters</span>
            </button>
          </div>
        </div>

        {/* Right: Daily Target Progress Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Daily Goal
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold">
                {dailyProgressPercent}% Achieved
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tight">{todayQuestions}</span>
              <span className="text-base font-bold text-slate-400">/{targetQuestions} Questions</span>
            </div>

            <p className="text-xs font-semibold text-slate-500 mt-1.5">
              {todayQuestions >= targetQuestions
                ? '🎉 Daily question goal completed! Great job!'
                : targetQuestions - todayQuestions + ' more questions to finish today target.'}
            </p>
          </div>

          <div className="mt-5 space-y-2">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-700"
                style={{ width: dailyProgressPercent + '%' }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
              <span>0 Qs</span>
              <span className="text-brand-600 font-bold">{Math.round(targetQuestions / 2)} Qs</span>
              <span>{targetQuestions} Qs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 QUICK START GUIDANCE FOR STUDENTS (तैयारी यहाँ से शुरू करें - 3 आसान विकल्प) */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 rounded-3xl p-5 sm:p-7 border border-purple-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-700 text-white text-[11px] font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Student Guide • शुरू कैसे करें</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Where would you like to begin today?
              <span className="text-purple-700 font-bold text-base sm:text-lg block sm:inline sm:ml-2">
                (तैयारी के 3 मुख्य विकल्प)
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            अपनी सुविधा अनुसार पेपर्स चेक करें, चैप्टर वाइज प्रैक्टिस करें, या टाइमर के साथ टेस्ट दें।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Card 1: Previous Year Papers */}
          <div
            onClick={() => navigate('/papers')}
            className="group p-5 rounded-2xl bg-white border border-purple-200/80 shadow-xs hover:shadow-lg hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-black uppercase">
                  2020 – 2025 PYQs
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1 group-hover:text-purple-700 transition">
                  Previous Year Papers (हल सहित)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                JEE Main, NEET, RBSE, CBSE 11th & 12th के आधिकारिक पेपर्स पूरे उत्तर और स्टेप-बाय-स्टेप हल के साथ चेक करें।
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-700">
              <span>पेपर्स व उत्तर देखें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Chapter-wise Practice */}
          <div
            onClick={() => navigate('/practice')}
            className="group p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs hover:shadow-lg hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                  18,000+ Questions
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                  Subject & Chapter Practice
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physics, Chemistry, Maths, Bio के प्रत्येक चैप्टर और टॉपिक के सवाल फ़िल्टर करके हल करें और तुरंत उत्तर जानें।
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
              <span>चैप्टर प्रैक्टिस शुरू करें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Mock Test Center */}
          <div
            onClick={() => navigate('/tests')}
            className="group p-5 rounded-2xl bg-white border border-indigo-200/80 shadow-xs hover:shadow-lg hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase">
                  Live Exam Simulation
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1 group-hover:text-indigo-700 transition">
                  Mock Tests (मॉक टेस्ट)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                टाइमर, नेगेटिव मार्किंग और डिटेल्ड स्कोरकार्ड के साथ फुल सिलेबस या सब्जेक्ट टेस्ट देकर परीक्षा का अभ्यास करें।
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-700">
              <span>टेस्ट सेंटर जाएं</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RESUME IN-PROGRESS SESSION (Conditional) */}
      {(activeTest || activePractice) && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <RotateCcw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-black text-amber-900 uppercase tracking-wide">
                Session In Progress
              </div>
              <div className="text-sm font-bold text-slate-800">
                {activeTest ? activeTest.state?.testTitle || 'Active Mock Test' : 'Practice: ' + (activePractice?.chapter || 'Chapter')}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {activeTest
                  ? 'Question ' + ((activeTest.state?.currentIndex || 0) + 1) + ' of ' + (activeTest.state?.totalQuestions || 30) + ' • ' + Math.floor((activeTest.state?.timeLeftSeconds || 0) / 60) + 'm left'
                  : 'Question ' + ((activePractice?.currentQuestionIndex || 0) + 1) + ' • ' + (activePractice?.completedPercentage || 50) + '% completed'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={() => {
                if (activeTest) syncEngine.clearActiveTest(activeTest.testId);
                if (activePractice) syncEngine.clearActivePractice();
                setActiveTest(null);
                setActivePractice(null);
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              Discard
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (activeTest) navigate('/tests/' + activeTest.testId + '/start');
                else if (activePractice) navigate('/practice/session?subject=' + encodeURIComponent(activePractice.subject || 'Physics') + '&chapter=' + encodeURIComponent(activePractice.chapter || 'Kinematics'));
              }}
              className="font-bold text-xs"
            >
              <span>Resume Session</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* 4. TODAY'S FOCUS: WHAT TO STUDY NEXT (The Smart AI Recommendation) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-700">
              Today Recommended Focus
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {topRecommendation.priorityBadge || 'High Priority'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{topRecommendation.estimatedMinutes} Mins</span>
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Target className="w-3 h-3 text-slate-500" />
              <span>{topRecommendation.questionCount} Questions</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-800 font-bold border border-brand-200/70">
                {topRecommendation.subject}
              </span>
              <span className="text-slate-500 font-semibold">{topRecommendation.chapter}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {topRecommendation.topic}
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {topRecommendation.reasons?.[0] || 'Targeted practice in this topic will help reinforce formula application and eliminate calculation mistakes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(topRecommendation.actionUrl)}
              className="font-black text-xs px-5 py-2.5 shadow-sm"
            >
              <span>Start 15-Min Focused Drill</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <button
              onClick={() => navigate(topRecommendation.secondaryActionUrl)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              {topRecommendation.secondaryActionText || 'Revise Theory'}
            </button>
          </div>
        </div>
      </div>

      {/* 5. CORE 4 PILLARS OF PREPORA (High-Clarity 2x2 Student Hubs) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Core Study Hubs
            </h2>
            <p className="text-xs text-slate-500">Everything you need to crack your exam</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: Chapter Practice */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                  Topic-wise Qs
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                  Chapter Practice
                </h3>
                <div className="text-[11px] font-semibold text-slate-400">Physics, Chemistry, Maths practice</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Topic-wise questions with instant hints, step-by-step solutions, and detailed difficulty levels.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Link
                  to="/practice?subject=Physics"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Physics
                </Link>
                <Link
                  to="/practice?subject=Chemistry"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Chemistry
                </Link>
                <Link
                  to="/practice?subject=Mathematics"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Mathematics
                </Link>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4">
              <Link
                to="/practice"
                className="inline-flex items-center gap-1.5 text-xs font-black text-brand-600 hover:text-brand-700 group-hover:translate-x-0.5 transition-all"
              >
                <span>Start Practicing Questions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Mock Tests & Past Papers */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Real NTA CBT
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  Mock Tests & PYQs
                </h3>
                <div className="text-[11px] font-semibold text-slate-400">Full Tests & Past 10 Years Papers</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Real exam CBT interface with countdown timer, negative marking, predicted AIR rank, and detailed solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Link
                  to="/tests"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Full Mock Tests
                </Link>
                <Link
                  to="/papers"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Past 10 Years PYQ
                </Link>
                <Link
                  to="/build-test"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Build Custom Test
                </Link>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4">
              <Link
                to="/tests"
                className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
              >
                <span>Take a CBT Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: AI Doubt Solver */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Instant 24/7 AI
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  AI Doubt Solver
                </h3>
                <div className="text-[11px] font-semibold text-slate-400">Instant AI Step-by-Step Solutions</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Stuck on a tricky problem? Upload a photo or type the question. Get detailed step-by-step solutions instantly.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Link
                  to="/doubts"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Photo Scanner
                </Link>
                <Link
                  to="/doubts"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Formula Explainer
                </Link>
                <Link
                  to="/notes"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Revision Notes
                </Link>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4">
              <Link
                to="/doubts"
                className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 hover:text-amber-800 group-hover:translate-x-0.5 transition-all"
              >
                <span>Ask AI Doubt Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 4: Mistake Notebook */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-rose-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Score Booster
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-700 transition-colors">
                  Mistake Notebook
                </h3>
                <div className="text-[11px] font-semibold text-slate-400">Auto-saved Errors & Weak Topics</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Every question you get wrong is automatically logged here. Re-attempt your mistakes until you master them.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Link
                  to="/mistakes"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Re-test Wrong Qs
                </Link>
                <Link
                  to="/weakness"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Weak Chapters
                </Link>
                <Link
                  to="/speed-practice"
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-[11px] font-semibold text-slate-600 transition-colors"
                >
                  Speed Drills
                </Link>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-4">
              <Link
                to="/mistakes"
                className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 group-hover:translate-x-0.5 transition-all"
              >
                <span>Review & Fix Mistakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 6. WEAK AREAS & TODAY'S CHECKLIST (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weak Areas To Fix */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div>
                <h3 className="text-base font-black text-slate-900">Weak Areas to Fix</h3>
                <p className="text-xs text-slate-500">Topics where your accuracy was low</p>
              </div>
            </div>
            <Link
              to="/weakness"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {weaknesses.length > 0 ? (
              weaknesses.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-200/60">
                        {w.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">{w.chapter}</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{w.topic}</div>
                    <div className="text-[11px] text-rose-600 font-bold mt-1">
                      {w.accuracy}% accuracy • {w.wrongCount} errors
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate('/practice?chapter=' + encodeURIComponent(w.chapter) + '&topic=' + encodeURIComponent(w.topic))}
                    className="text-xs font-bold px-3 py-1.5 shrink-0"
                  >
                    <span>Practice Drill</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                No weak topics detected yet! Complete a practice set or mock test to find areas to improve.
              </div>
            )}
          </div>
        </div>

        {/* Right: Today's Study Checklist */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Today's Study Checklist</h3>
              <p className="text-xs text-slate-500">
                {completedTasksCount} of {totalTasksCount} tasks completed
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              {planProgressPercent}% Done
            </span>
          </div>

          <div className="space-y-2">
            {dailyPlan.items.slice(0, 4).map((item, idx) => {
              const isDone = item.status === 'completed';
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                    <button
                      onClick={() => handleToggleDailyPlan(item.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-brand-100 hover:text-brand-800'
                      }`}
                      title={isDone ? 'Mark as pending' : 'Mark as done'}
                    >
                      {isDone ? '✓' : idx + 1}
                    </button>
                    <div className="truncate">
                      <div className={`text-xs font-bold truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.durationMinutes} mins • {item.subject}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={item.actionUrl}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 shrink-0 px-2 py-1 rounded-lg hover:bg-brand-50"
                  >
                    {isDone ? 'Review' : 'Start →'}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Modals */}
      <StudySessionModal
        isOpen={studySessionModalOpen}
        onClose={() => setStudySessionModalOpen(false)}
      />
    </div>
  );
};
