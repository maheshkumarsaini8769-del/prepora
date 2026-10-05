import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Target,
  ChevronRight,
  BookOpen,
  TrendingUp,
  RotateCw,
  Bot,
  FileText,
  BarChart2,
  Flame,
  Check,
  BrainCircuit,
  Settings,
  X,
  Sparkles,
  Calendar,
  Layers,
  Award,
  AlertCircle,
  GraduationCap,
  Trophy,
  Zap,
  Crown
} from 'lucide-react';
import { soundFeedback } from '../utils/audioFeedback';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { testService } from '../services/testService';
import { syncEngine } from '../services/syncEngine';
import { progressService } from '../services/progressService';
import { syllabusService } from '../services/syllabusService';
import { getColorMode, ColorMode } from '../utils/theme';
import { HeroStudentIllustration, ScenicMountainBanner } from '../components/home/HomeVisualAssets';
import { DailyPlan, MistakeItem, PreparationType, CanonicalExam, ClassLevel, UserProfile } from '../types';

// Helper Vector Icons for Subject Progress
const AtomIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" strokeLinecap="round" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" strokeLinecap="round" />
  </svg>
);

const FlaskIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <path d="M10 2v5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 7V2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8.5" y1="2" x2="15.5" y2="2" strokeLinecap="round" />
    <path d="M7 16h10" strokeLinecap="round" />
  </svg>
);

const SigmaIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M18 4H6l6 8-6 8h12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DnaIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <path d="M4 4c4 4 12 4 16 0M4 20c4-4 12-4 16 0M4 12h16M8 8h8M8 16h8" strokeLinecap="round" />
  </svg>
);

// High-precision Circular Progress Ring
const RadialProgress: React.FC<{ percentage: number; size?: number }> = ({ percentage, size = 64 }) => {
  const strokeWidth = 5.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center my-0.5" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs sm:text-sm font-black text-slate-900 dark:text-white">
        {percentage}%
      </span>
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>(() => userService.getProfile());

  // Color Mode state listener
  const [isDark, setIsDark] = useState<boolean>(() => getColorMode() === 'dark');

  useEffect(() => {
    // Check and trigger streak safety notification if study time reached
    userService.checkAndTriggerStreakWarning();

    const handleProfileUpdate = () => {
      setUser(userService.getProfile());
    };
    window.addEventListener('prepora:profile_updated', handleProfileUpdate);
    window.addEventListener('prepora:daily_goal_reached', handleProfileUpdate);
    return () => {
      window.removeEventListener('prepora:profile_updated', handleProfileUpdate);
      window.removeEventListener('prepora:daily_goal_reached', handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const handleColorChange = (e: Event) => {
      const ce = e as CustomEvent<ColorMode>;
      if (ce.detail) {
        setIsDark(ce.detail === 'dark');
      }
    };
    window.addEventListener('prepora-colormode-change', handleColorChange);
    return () => window.removeEventListener('prepora-colormode-change', handleColorChange);
  }, []);

  const prepProfile = user.preparationProfile || {
    preparationType: (user.targetExam || 'JEE') as PreparationType,
    exam: (user.targetExam === 'NEET' ? 'NEET_UG' : user.targetExam === 'CBSE' ? 'CBSE' : user.targetExam === 'RBSE' ? 'RBSE' : 'JEE_MAIN') as CanonicalExam,
    classLevel: (user.classLevel || 'Dropper') as ClassLevel,
    subjects: user.targetExam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'],
    onboardingCompleted: true,
    targetYear: user.targetYear || 2026
  };

  const prepType: PreparationType = prepProfile.preparationType || 'JEE';
  const classLevel = prepProfile.classLevel || user.classLevel || 'Dropper';
  const studentName = user.name ? user.name.split(' ')[0] : 'Mahesh';

  // Live Ecosystem Data
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => ecosystemService.getDailyPlan());
  const completedTasksCount = dailyPlan.items.filter(i => i.status === 'completed').length;
  const totalTasksCount = Math.max(5, dailyPlan.items.length || 5);

  // Modals state
  const [showPrepProfileModal, setShowPrepProfileModal] = useState<boolean>(false);

  // Initial questions popup on first open if not already set
  useEffect(() => {
    const hasCompleted = localStorage.getItem('prepora_onboarding_completed') === 'true';
    if (!hasCompleted) {
      setShowPrepProfileModal(true);
    }
  }, []);

  // Exam Countdown calculation based on prep type
  const examDaysRemaining = prepType === 'NEET' ? 127 : prepType === 'JEE' ? 94 : 61;

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-md sm:max-w-xl md:max-w-3xl mx-auto space-y-4 sm:space-y-5 pb-16 px-1 sm:px-2 animate-in fade-in duration-200">

      {/* ========================================================================= */}
      {/* 1. HERO GREETING SECTION (Left Text + Right Student Mascot Art)           */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-1">
        {/* Left: Greeting & Motivational Quote */}
        <div className="space-y-1.5 max-w-[62%] sm:max-w-md">
          <div className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300">
            {getGreeting()},
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-300">
            {studentName} <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic font-medium leading-relaxed pt-0.5">
            &ldquo;{isDark ? 'Consistent effort today builds the rank tomorrow.' : 'Discipline today creates your success tomorrow.'}&rdquo;
          </p>
        </div>

        {/* Right: Mascot Student with Laptop & Angled Exam Badge */}
        <div className="shrink-0">
          <HeroStudentIllustration
            examLabel={prepType}
            classLevel={classLevel}
            year={prepProfile.targetYear || 2026}
            isDark={isDark}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TARGET COUNTDOWN CARD                                                 */}
      {/* ========================================================================= */}
      <div
        onClick={() => setShowPrepProfileModal(true)}
        className="w-full p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.99] bg-gradient-to-r from-emerald-100/90 to-teal-50/90 dark:from-[#0d231d] dark:to-[#081814] border border-emerald-300 dark:border-emerald-500/50 shadow-sm dark:shadow-[0_0_20px_rgba(16,185,129,0.18)] flex items-center justify-between gap-3 group"
      >
        {/* Left: Target Bullseye Icon */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
              {prepType} Main • {classLevel === 'Dropper' ? 'Dropper' : `Class ${classLevel}`}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Target {prepProfile.targetYear || 2026}
            </div>
          </div>
        </div>

        {/* Middle & Right: Divider, Days Left, and Chevron */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="h-8 w-px bg-emerald-300 dark:bg-emerald-800/80" />
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {examDaysRemaining}
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400/90 leading-tight">
              days left
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TODAY'S PROGRESS & DAILY PRACTICE GOAL CARD                            */}
      {/* ========================================================================= */}
      <div className="w-full p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        {/* Header: Today's Progress & completed fraction */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white block leading-tight">
                Daily Practice Goal
              </span>
              <span className="text-[11px] text-slate-400 font-semibold leading-tight">
                Target: {user.dailyGoalQuestions || 25} Questions / Day
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">
              {user.todayQuestionsCount || 0}/{user.dailyGoalQuestions || 25} Qs
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.round(((user.todayQuestionsCount || 0) / (user.dailyGoalQuestions || 25)) * 100))}%`
            }}
          />
        </div>

        {/* Subtitle / Status */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {completedTasksCount} of {totalTasksCount} daily study tasks completed
          </p>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {Math.min(100, Math.round(((user.todayQuestionsCount || 0) / (user.dailyGoalQuestions || 25)) * 100))}% achieved
          </span>
        </div>
      </div>

      {/* Dynamic Streak Motivation Warning / In-Progress Tracker / Goal Achieved Alert */}
      {(user.todayQuestionsCount || 0) === 0 ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/40 dark:border-amber-500/25 text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-xl font-black">
              ⚠️
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span>Streak toot jayegi!</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">Action Required</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Tumhara goal <strong>{prepType}</strong> todna hai na? Aaj ke <strong>{user.dailyGoalQuestions || 25} sawal</strong> abhi start karo aur apni streak bachao!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs shrink-0 shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            Daily Goal Start Karo ({user.dailyGoalQuestions || 25} Qs) →
          </button>
        </div>
      ) : (user.todayQuestionsCount || 0) < (user.dailyGoalQuestions || 25) ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-teal-500/15 border border-teal-500/40 dark:border-teal-500/30 text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 text-xl font-black animate-pulse">
              🔥
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <span>Streak Safe Rakhne Ka Target Chalu Hai!</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                  {user.todayQuestionsCount}/{user.dailyGoalQuestions || 25} Solved
                </span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Great momentum! Bas <strong>{(user.dailyGoalQuestions || 25) - (user.todayQuestionsCount || 0)} sawal aur</strong> solve karo aur aaj ki streak 100% secure karo!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice');
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shrink-0 shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            Target Continue Karo →
          </button>
        </div>
      ) : (
        <div className="w-full p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-950 dark:text-emerald-200 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-2xl animate-bounce">
              🎉
            </div>
            <div>
              <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">
                Congratulations! Today's Goal Completed ({user.todayQuestionsCount}/{user.dailyGoalQuestions || 25} Qs)
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Shaandar dedication! Aaj ki streak 100% secure ho chuki hai. Tumhara {prepType} crack karne ka dream zaroor poora hoga!
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs shrink-0 shadow-sm">
            Goal Done ✓
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MOTIVATIONAL SCENIC BANNER CARD                                       */}
      {/* ========================================================================= */}
      <ScenicMountainBanner
        isDark={isDark}
        onActionClick={() => navigate('/practice')}
      />

      {/* ========================================================================= */}
      {/* 4.5 DAILY HIGH-YIELD CHALLENGE & COHORT LEADERBOARD WIDGET               */}
      {/* ========================================================================= */}
      <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/10 dark:from-[#1b1706] dark:to-[#081f17] border border-amber-300/80 dark:border-amber-500/30 shadow-xs space-y-3">
        {/* Top: Header with Trophy, Streak Saver XP, and Active status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Trophy className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Daily Challenge Question</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-extrabold text-[10px] border border-amber-500/30">
            +50 XP • Protects Streak 🔥
          </span>
        </div>

        {/* Middle: Challenge Topic tailored to student target */}
        <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5 min-w-0">
            <div className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {prepType === 'NEET' ? 'NEET 2024 High-Yield Biology' : prepType === 'CBSE' || prepType === 'RBSE' ? `${prepType} Board Core Problem` : 'JEE Main 2024 Hot Topic'}
            </div>
            <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
              {prepType === 'NEET' ? 'Genetics: Dihybrid Cross Linkage Ratio' : 'Kinematics: Velocity Vector on Inclined Plane'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice/session?subject=Physics&chapter=Kinematics');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Solve Now</span>
          </button>
        </div>

        {/* Bottom Strip: Cohort Standing */}
        <div className="flex items-center justify-between pt-1 border-t border-amber-200/40 dark:border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>Rank <strong>#4</strong> in {prepType} {classLevel} Batch</span>
            <span className="text-slate-400 dark:text-slate-500">• Top 3%</span>
          </div>

          <Link
            to="/leaderboard"
            onClick={() => soundFeedback.playClick()}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Leaderboard</span>
            <ChevronRight className="w-3 h-3 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. DAILY ACTION CENTER (6 Action Cards in 2 Columns)                     */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-1">
        {/* Header: Daily Action Center & See All */}
        <div className="flex items-center justify-between">
          <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
            Daily Action Center
          </h2>
          <Link
            to="/practice"
            onClick={() => soundFeedback.playClick()}
            className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* 6 Action Cards in 2 columns */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* 1. Practice */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#eff6ff] dark:bg-[#0c1829] border border-blue-200/80 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(59,130,246,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Practice
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  Questions
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {/* 2. Take a Test */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/tests');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#ecfdf5] dark:bg-[#09221b] border border-emerald-200/80 dark:border-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(16,185,129,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Take a Test
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  Mock & Chapter
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {/* 3. Fix Weakness */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/weakness');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#fff1f2] dark:bg-[#251019] border border-rose-200/80 dark:border-rose-900/40 hover:border-rose-400 dark:hover:border-rose-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(244,63,94,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Fix Weakness
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  Detailed Analysis
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {/* 4. Revise */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/revision');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#fffbeb] dark:bg-[#221c0c] border border-amber-200/80 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(245,158,11,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <RotateCw className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Revise
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  Formulas & Notes
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {/* 5. Solve Doubt */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/doubts');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#f5f3ff] dark:bg-[#1a112c] border border-purple-200/80 dark:border-purple-900/40 hover:border-purple-400 dark:hover:border-purple-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(168,85,247,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Solve Doubt
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  AI Teacher
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {/* 6. Practice PYQs */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/papers');
            }}
            className="p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] bg-[#f0f9ff] dark:bg-[#0c1c2e] border border-sky-200/80 dark:border-sky-900/40 hover:border-sky-400 dark:hover:border-sky-500/50 shadow-2xs dark:shadow-[0_0_15px_rgba(14,165,233,0.12)] flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Practice PYQs
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  Real Papers
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SUBJECT PROGRESS (3 Subject Radial Progress Cards)                     */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-1">
        {/* Header: Subject Progress & Full Syllabus */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500 stroke-[2.5]" />
            <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
              Subject Progress
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              to="/videos"
              className="text-xs sm:text-sm font-bold text-rose-500 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>Videos</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700 text-xs">•</span>
            <Link
              to="/syllabus"
              className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
            >
              <span>Syllabus</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* 3 Subject Cards Side-by-Side */}
        {(() => {
          const realAttempts = testService.getAllAttempts();
          const realMistakes = userService.getMistakes();

          const getSubjMetric = (subName: string) => {
            const fromMistakes = realMistakes.filter(m => m.subject === subName).length;
            const fromAttempts = realAttempts.reduce((acc, a) => {
              const match = a.subjectBreakdown?.find(sb => sb.subject === subName);
              return acc + (match ? (match.correct + match.wrong) : 0);
            }, 0);
            const count = fromMistakes + fromAttempts;
            const target = 500;
            const pct = Math.min(100, Math.round((count / target) * 100));
            return { count, target, pct };
          };

          const physicsMetric = getSubjMetric('Physics');
          const chemistryMetric = getSubjMetric('Chemistry');
          const thirdSubjName = prepType === 'NEET' ? 'Biology' : 'Mathematics';
          const thirdMetric = getSubjMetric(thirdSubjName);

          return (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Subject 1: Physics */}
              <div
                onClick={() => navigate('/practice?subject=Physics')}
                className="p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-emerald-500 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 text-[11px] sm:text-xs font-black">
                  <AtomIcon className="w-3.5 h-3.5" />
                  <span>Physics</span>
                </div>
                <RadialProgress percentage={physicsMetric.pct} size={64} />
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                  {physicsMetric.count}/{physicsMetric.target}
                </div>
              </div>

              {/* Subject 2: Chemistry */}
              <div
                onClick={() => navigate('/practice?subject=Chemistry')}
                className="p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-emerald-500 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] sm:text-xs font-black">
                  <FlaskIcon className="w-3.5 h-3.5" />
                  <span>Chemistry</span>
                </div>
                <RadialProgress percentage={chemistryMetric.pct} size={64} />
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                  {chemistryMetric.count}/{chemistryMetric.target}
                </div>
              </div>

              {/* Subject 3: Maths or Biology */}
              <div
                onClick={() => navigate(`/practice?subject=${prepType === 'NEET' ? 'Biology' : 'Mathematics'}`)}
                className="p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-emerald-500 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40 text-[11px] sm:text-xs font-black">
                  {prepType === 'NEET' ? (
                    <>
                      <DnaIcon className="w-3.5 h-3.5" />
                      <span>Biology</span>
                    </>
                  ) : (
                    <>
                      <SigmaIcon className="w-3.5 h-3.5" />
                      <span>Maths</span>
                    </>
                  )}
                </div>
                <RadialProgress percentage={thirdMetric.pct} size={64} />
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                  {thirdMetric.count}/{thirdMetric.target}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ========================================================================= */}
      {/* 7. STUDY STREAK CARD                                                     */}
      {/* ========================================================================= */}
      <div
        onClick={() => navigate('/performance')}
        className="w-full p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400/50 transition-all active:scale-[0.99]"
      >
        {/* Left: Flame Icon & Streak Days */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
              Study Streak
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 leading-tight">
              {user.streakDays || 0} {user.streakDays === 1 ? 'day' : 'days'}
            </div>
            <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 leading-tight">
              {(user.streakDays || 0) > 0 ? 'Keep the fire burning!' : 'Start your streak today!'}
            </div>
          </div>
        </div>

        {/* Right: Weekday Checkmark Indicators M T W T F S S */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
            const todayDayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
            const isToday = idx === todayDayIdx;
            const isCompleted = isToday
              ? (user.todayQuestionsCount || 0) > 0
              : (user.streakDays || 0) > (todayDayIdx - idx) && idx < todayDayIdx;
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className={`text-[10px] sm:text-[11px] font-bold ${isToday ? 'text-amber-500 font-black' : 'text-slate-400 dark:text-slate-500'}`}>
                  {day}
                </span>
                {isCompleted ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${isToday ? 'border-amber-400 animate-pulse' : 'border-slate-300 dark:border-slate-700'} bg-transparent`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Exam & Prep Profile Modal (Asks 1-2 core questions on initial open or when target card is clicked) */}
      {showPrepProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">Choose Your Goal</h3>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('prepora_onboarding_completed', 'true');
                  setShowPrepProfileModal(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your exam and class level so Prepora can configure your syllabus, countdown & daily targets.
            </p>

            <div className="space-y-3 text-xs">
              {/* Question 1: Target Exam */}
              <div className="space-y-1.5">
                <span className="font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-emerald-500" />
                  1. Which exam are you preparing for?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'JEE', label: 'JEE (IIT)', sub: 'Engineering' },
                    { key: 'NEET', label: 'NEET', sub: 'Medical UG' },
                    { key: 'CBSE', label: 'CBSE', sub: 'Class 11/12' },
                    { key: 'RBSE', label: 'RBSE', sub: 'State Board' }
                  ].map(item => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        const canonicalExam = item.key === 'NEET' ? 'NEET_UG' : item.key === 'CBSE' ? 'CBSE' : item.key === 'RBSE' ? 'RBSE' : 'JEE_MAIN';
                        const subs = item.key === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'];
                        const updated = {
                          ...prepProfile,
                          preparationType: item.key as PreparationType,
                          exam: canonicalExam,
                          subjects: subs,
                          onboardingCompleted: true
                        };
                        localStorage.setItem('prepora_preparation_profile', JSON.stringify(updated));
                        localStorage.setItem('prepora_onboarding_completed', 'true');
                        userService.updateProfile({ targetExam: item.key as any, preparationProfile: updated as any });
                        window.location.reload();
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        prepType === item.key
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      <div className="font-bold text-xs">{item.label}</div>
                      <div className={`text-[10px] ${prepType === item.key ? 'text-emerald-100' : 'text-slate-400'}`}>{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Class Level */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                  2. Select your class / category:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['11', '12', 'Dropper'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...prepProfile,
                          classLevel: lvl,
                          targetYear: lvl === '11' ? 2027 : 2026,
                          onboardingCompleted: true
                        };
                        localStorage.setItem('prepora_preparation_profile', JSON.stringify(updated));
                        localStorage.setItem('prepora_onboarding_completed', 'true');
                        userService.updateProfile({ classLevel: lvl as any, targetYear: updated.targetYear, preparationProfile: updated as any });
                        window.location.reload();
                      }}
                      className={`py-2 px-1 rounded-xl border text-center font-bold text-xs transition-all ${
                        classLevel === lvl
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      {lvl === 'Dropper' ? 'Dropper' : `Class ${lvl}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('prepora_onboarding_completed', 'true');
                    setShowPrepProfileModal(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-xs transition-colors"
                >
                  Confirm & Start Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
