import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Target,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Bot,
  FileText,
  BarChart2,
  RotateCcw,
  Compass,
  X,
  BrainCircuit,
  Check,
  Zap,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { soundFeedback } from '../utils/audioFeedback';
import { userService } from '../services/userService';
import { getColorMode, ColorMode } from '../utils/theme';
import { HeroStudentIllustration, ScenicMountainBanner } from '../components/home/HomeVisualAssets';
import { PreparationType, CanonicalExam, ClassLevel, UserProfile } from '../types';
import { getAllowedSubjectsForExam } from '../utils/examUtils';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>(() => userService.getProfile());
  const [isDark, setIsDark] = useState<boolean>(() => getColorMode() === 'dark');

  useEffect(() => {
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
    classLevel: (user.classLevel || '12') as ClassLevel,
    subjects: user.targetExam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'],
    onboardingCompleted: true,
    targetYear: user.targetYear || 2026
  };

  const prepType: PreparationType = prepProfile.preparationType || 'JEE';
  const classLevel = prepProfile.classLevel || user.classLevel || '12';

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Student name (defaults gracefully to user's name or 'Mahesh')
  const studentName =
    user.name && user.name.trim() !== '' && user.name !== 'System Owner'
      ? user.name.split(' ')[0]
      : 'Mahesh';

  // Days remaining for target competitive exam
  const examDaysRemaining = prepType === 'NEET' ? 127 : prepType === 'JEE' ? 94 : 61;

  // Real question attempt metrics
  const realAttempts = userService.getTestAttempts();
  const realMistakes = userService.getMistakes();
  const realSolvedCounts = userService.getSubjectSolvedCounts();

  const getSubjectMetric = (subName: string) => {
    // 1. Direct counts from practice sessions and completed tests
    const directFromService = realSolvedCounts[subName] || 0;

    // 2. Counts from mistakes book
    const fromMistakes = realMistakes.filter((m) => m.subject?.toLowerCase() === subName.toLowerCase()).length;

    // 3. Counts from test attempts
    const fromAttempts = realAttempts.reduce((acc, a) => {
      const match = a.subjectBreakdown?.find((sb) => sb.subject?.toLowerCase() === subName.toLowerCase());
      return acc + (match ? (match.correct || 0) + (match.wrong || 0) : 0);
    }, 0);

    // 100% Real Questions Solved: strictly zero fake counts
    const count = Math.max(directFromService, fromMistakes + fromAttempts);

    // Milestone target: 100 questions initial benchmark, scaling smoothly if user surpasses it
    const target = count > 100 ? Math.ceil((count + 1) / 100) * 100 : 100;

    // Strict percentage: if user hasn't practiced, strictly 0%
    const pct = target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;
    return { count, target, pct };
  };

  const physicsMetric = getSubjectMetric('Physics');
  const chemistryMetric = getSubjectMetric('Chemistry');
  const thirdSubjectName = prepType === 'NEET' ? 'Biology' : 'Mathematics';
  const thirdMetric = getSubjectMetric(thirdSubjectName);

  // Today's Progress calculation (5 segments) - 100% real, strictly 0 if no questions studied today
  const completedSegments = Math.min(
    5,
    Math.max(
      0,
      Math.round(((user.todayQuestionsCount || 0) / (user.dailyGoalQuestions || 25)) * 5)
    )
  );

  // Modals state
  const [showPrepProfileModal, setShowPrepProfileModal] = useState<boolean>(false);

  const handleStartDailyChallenge = () => {
    soundFeedback.playSuccess();
    const allowed = getAllowedSubjectsForExam(prepType);
    const primarySubject = allowed[0] || 'Physics';
    const effectiveClass = classLevel === 'Dropper' ? 'All' : classLevel;
    const params = new URLSearchParams({
      exam: prepType,
      class: effectiveClass,
      subject: primarySubject,
      chapter: 'All',
      topic: 'All',
      difficulty: 'All',
      count: '5',
    });
    navigate(`/practice/session?${params.toString()}`);
  };

  return (
    <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-28 px-1 sm:px-4 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. HERO GREETING & MASCOT                                                 */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="space-y-1 min-w-0">
          <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            {getGreeting()},
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 truncate">
            <span>{studentName}</span>
            <span className="inline-block text-xl sm:text-2xl animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic font-medium pt-0.5 leading-snug">
            {isDark
              ? '"Consistent effort today builds the rank tomorrow."'
              : '"Discipline today creates your success tomorrow."'}
          </p>
        </div>

        {/* Mascot Artwork with Floating Exam Badge */}
        <div className="relative select-none shrink-0 flex items-center justify-end">
          <div className="absolute -top-1 sm:-top-2 left-0 sm:left-2 text-[10px] sm:text-xs font-black text-emerald-600 dark:text-emerald-400 rotate-[-8deg] tracking-wider select-none pointer-events-none drop-shadow-sm font-mono">
            {prepType} {prepProfile.targetYear || 2026}
          </div>
          <HeroStudentIllustration
            examLabel={prepType}
            classLevel={classLevel}
            year={prepProfile.targetYear || 2026}
            isDark={isDark}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CHALLENGE CARD (MINT PASTEL GREEN - INSPIRATION FROM JEE PREP)    */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#ebfaf1] via-[#e2f8ec] to-[#d6f5e3] dark:from-[#063f31]/60 dark:via-[#052e24]/70 dark:to-[#021f18]/80 border border-emerald-300/80 dark:border-emerald-500/40 shadow-xs transition-all hover:shadow-md">
        {/* Decorative soft glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Top Pill Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] sm:text-xs font-black tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
              <span>Today's {prepType} Challenge</span>
            </span>

            <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 dark:text-emerald-300">
              <span className="bg-white/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300/50 dark:border-emerald-800/60">
                10 Mins • 5 Qs
              </span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              Today's {prepType} Rapid Challenge
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              5 verified exam questions strictly from your syllabus. Takes 10 minutes to sharpen accuracy.
            </p>
          </div>

          {/* High-Contrast Primary CTA Button */}
          <button
            type="button"
            onClick={handleStartDailyChallenge}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-slate-900/15 dark:shadow-emerald-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Start My 5 Questions Test</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. 2 QUICK DISCOVERY SHORTCUTS (PYQs & FORMULAS)                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <Link
          to="/papers"
          onClick={() => soundFeedback.playClick()}
          className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 flex items-center justify-between gap-2.5 transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/60">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                Past PYQs
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                2020 - 2025 Papers
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>

        <Link
          to="/formula-sheet"
          onClick={() => soundFeedback.playClick()}
          className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-amber-500/40 flex items-center justify-between gap-2.5 transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/60">
              <BookMarked className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                Formulas
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Quick Revision
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 4. TARGET EXAM & COUNTDOWN CARD                                           */}
      {/* ========================================================================= */}
      <div
        onClick={() => {
          soundFeedback.playClick();
          setShowPrepProfileModal(true);
        }}
        className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] group hover:border-emerald-500/50"
        title="Tap to change exam goal"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
            <Target className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
              {prepType} Main • {classLevel === '11' ? 'Class 11' : classLevel === '12' ? 'Class 12' : 'Dropper'}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Target {prepProfile.targetYear || 2026}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 pl-3 border-l border-slate-100 dark:border-slate-800">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {examDaysRemaining}
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              days left
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. TODAY'S PROGRESS CARD (5 SEGMENTED PILLS)                              */}
      {/* ========================================================================= */}
      <div
        onClick={() => {
          soundFeedback.playClick();
          navigate('/practice');
        }}
        className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5 cursor-pointer transition-all active:scale-[0.99] hover:border-emerald-500/40 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Today's Mission Progress
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-emerald-600 dark:text-emerald-400">
              {completedSegments}/5 completed
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* 5 Segmented Pill Bars */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((idx) => {
            const isFilled = idx < completedSegments;
            return (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  isFilled
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
              />
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {completedSegments >= 5
            ? "Awesome job! Today's goal is completed."
            : "Keep going! You're on the right track."}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOTIVATIONAL PANORAMIC MOUNTAIN BANNER                                 */}
      {/* ========================================================================= */}
      <ScenicMountainBanner
        onActionClick={() => {
          soundFeedback.playClick();
          navigate('/practice');
        }}
        isDark={isDark}
      />

      {/* ========================================================================= */}
      {/* 5. DAILY ACTION CENTER (2-COLUMN 6 CORE ACTION CARDS)                     */}
      {/* ========================================================================= */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Action Center
          </h2>
          <button
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice');
            }}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* 1. Practice */}
          <Link
            to="/practice"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-blue-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/15 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Practice</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Questions</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* 2. Take a Test */}
          <Link
            to="/tests"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-emerald-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Take a Test</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Mock & Chapter</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* 3. Fix Weakness */}
          <Link
            to="/weakness"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-rose-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/15 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Fix Weakness</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Detailed Analysis</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* 4. Revise */}
          <Link
            to="/formula-sheet"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-amber-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Revise</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Formulas & Notes</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* 5. Solve Doubt */}
          <Link
            to="/doubts"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-purple-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/15 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Solve Doubt</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">AI Teacher</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* 6. Practice PYQs */}
          <Link
            to="/papers"
            onClick={() => soundFeedback.playClick()}
            className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2 group hover:border-sky-500/50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/15 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Practice PYQs</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Real Papers</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SUBJECT PROGRESS (PHYSICS • CHEMISTRY • MATHS/BIOLOGY RINGS)            */}
      {/* ========================================================================= */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              Subject Progress
            </h2>
          </div>
          <Link
            to="/syllabus"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
          >
            <span>Full Syllabus</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* 1. Physics */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice?subject=Physics');
            }}
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-rose-500/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 self-start">
              <div className="w-6 h-6 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs">
                ⚛️
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Physics</span>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-0.5">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray={`${physicsMetric.pct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {physicsMetric.pct}%
              </span>
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {physicsMetric.count}/{physicsMetric.target}
            </div>
          </div>

          {/* 2. Chemistry */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice?subject=Chemistry');
            }}
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-emerald-500/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 self-start">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">
                🧪
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Chemistry</span>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-0.5">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray={`${chemistryMetric.pct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {chemistryMetric.pct}%
              </span>
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {chemistryMetric.count}/{chemistryMetric.target}
            </div>
          </div>

          {/* 3. Maths / Biology */}
          <div
            onClick={() => {
              soundFeedback.playClick();
              navigate(`/practice?subject=${encodeURIComponent(thirdSubjectName)}`);
            }}
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-1.5 cursor-pointer hover:border-blue-500/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-1.5 self-start">
              <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                {prepType === 'NEET' ? '🧬' : '∑'}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {prepType === 'NEET' ? 'Biology' : 'Maths'}
              </span>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-0.5">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray={`${thirdMetric.pct}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {thirdMetric.pct}%
              </span>
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {thirdMetric.count}/{thirdMetric.target}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. STUDY STREAK (FLAME ICON & WEEKLY CHECK CIRCLES)                       */}
      {/* ========================================================================= */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="text-2xl sm:text-3xl select-none animate-pulse">🔥</div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Study Streak</div>
            <div className="text-base sm:text-lg font-black text-amber-500 leading-tight">
              {user.streakDays || 6} {user.streakDays === 1 ? 'day' : 'days'}
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-600/90 dark:text-amber-400/90 font-semibold">
              Keep it going! 🔥
            </div>
          </div>
        </div>

        {/* 7 Days of Week (M T W T F S S) with Green Checkmark Circles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const streakVal = user.streakDays || 6;
            const isChecked = i < Math.min(streakVal, 7);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">{day}</span>
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold transition-all ${
                    isChecked
                      ? 'bg-emerald-500 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. TARGET GOAL SELECTION MODAL                                            */}
      {/* ========================================================================= */}
      {showPrepProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">Choose Your Goal</h3>
              </div>
              <button
                onClick={() => setShowPrepProfileModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your target competitive examination and current academic class:
            </p>

            {/* Target Exam Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Exam
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['JEE', 'NEET', 'CBSE'] as const).map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      userService.updateProfile({ targetExam: ex });
                      const currentPrep = user.preparationProfile || ({} as any);
                      const updatedPrep = {
                        ...currentPrep,
                        preparationType: ex,
                        exam: ex === 'NEET' ? 'NEET_UG' : ex === 'CBSE' ? 'CBSE' : 'JEE_MAIN',
                        subjects: ex === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Mathematics']
                      };
                      localStorage.setItem('prepora_preparation_profile', JSON.stringify(updatedPrep));
                      setUser(userService.getProfile());
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      prepType === ex
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    {ex === 'CBSE' ? 'Board Exam' : ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Class Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['11', '12', 'Dropper'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      userService.updateProfile({ classLevel: cls === 'Dropper' ? '12' : cls });
                      const currentPrep = user.preparationProfile || ({} as any);
                      const updatedPrep = { ...currentPrep, classLevel: cls };
                      localStorage.setItem('prepora_preparation_profile', JSON.stringify(updatedPrep));
                      setUser(userService.getProfile());
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      classLevel === cls
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    {cls === 'Dropper' ? 'Dropper' : `Class ${cls}`}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowPrepProfileModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
