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
  Flame,
  Check,
  BrainCircuit,
  Sparkles,
  Calendar,
  Layers,
  Award,
  BookMarked,
  Play,
  ArrowRight,
  Compass,
  Tv,
  GraduationCap,
  HelpCircle,
  X
} from 'lucide-react';
import { soundFeedback } from '../utils/audioFeedback';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { testService } from '../services/testService';
import { getColorMode, ColorMode } from '../utils/theme';
import { HeroStudentIllustration } from '../components/home/HomeVisualAssets';
import { continueLearningService, LearningActivity } from '../services/continueLearningService';
import { StudentGuideModal } from '../components/common/StudentGuideModal';
import { DailyPlan, PreparationType, CanonicalExam, ClassLevel, UserProfile } from '../types';

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

  // Clean student name with zero hardcoded demo fallbacks
  const studentName =
    user.name && user.name.trim() !== '' && user.name !== 'Mahesh Kumar (System Owner)' && user.name !== 'Aryan Sharma'
      ? user.name.split(' ')[0]
      : 'Student';

  const [continueLearning, setContinueLearning] = useState<LearningActivity | null>(() =>
    continueLearningService.getLatestActivity()
  );

  useEffect(() => {
    const handleContinueUpdate = () => {
      setContinueLearning(continueLearningService.getLatestActivity());
    };
    window.addEventListener('prepora:continue_learning_updated', handleContinueUpdate);
    return () => window.removeEventListener('prepora:continue_learning_updated', handleContinueUpdate);
  }, []);

  // Modals state
  const [showPrepProfileModal, setShowPrepProfileModal] = useState<boolean>(false);
  const [studentGuideOpen, setStudentGuideOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenGuide = () => setStudentGuideOpen(true);
    window.addEventListener('prepora:open_student_guide', handleOpenGuide);
    return () => window.removeEventListener('prepora:open_student_guide', handleOpenGuide);
  }, []);

  const examDaysRemaining = prepType === 'NEET' ? 127 : prepType === 'JEE' ? 94 : 61;

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Determine if student is brand new (0 questions solved & 0 tests)
  const isNewStudent = (user.testsCompletedCount || 0) === 0 && (user.todayQuestionsCount || 0) === 0;

  // Real question attempt metrics
  const realAttempts = testService.getAllAttempts();
  const realMistakes = userService.getMistakes();

  const getSubjectMetric = (subName: string) => {
    const fromMistakes = realMistakes.filter((m) => m.subject === subName).length;
    const fromAttempts = realAttempts.reduce((acc, a) => {
      const match = a.subjectBreakdown?.find((sb) => sb.subject === subName);
      return acc + (match ? match.correct + match.wrong : 0);
    }, 0);
    const count = fromMistakes + fromAttempts;
    const target = 250;
    const pct = Math.min(100, Math.round((count / target) * 100));
    return { count, target, pct };
  };

  const physicsMetric = getSubjectMetric('Physics');
  const chemistryMetric = getSubjectMetric('Chemistry');
  const thirdSubjectName = prepType === 'NEET' ? 'Biology' : 'Mathematics';
  const thirdMetric = getSubjectMetric(thirdSubjectName);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 px-3 sm:px-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER: WELCOMING GREETING & EXAM TARGET BADGE                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left: Greeting & Target Info */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/30 dark:via-transparent dark:to-transparent border border-emerald-500/20 dark:border-emerald-500/10 flex items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {getGreeting()},
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {studentName} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Targeting <span className="font-bold text-slate-900 dark:text-white">{prepType}</span> • Class {classLevel} • Target Year {prepProfile.targetYear || 2026}
            </p>
          </div>

          <div className="hidden sm:block shrink-0">
            <HeroStudentIllustration
              examLabel={prepType}
              classLevel={classLevel}
              year={prepProfile.targetYear || 2026}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Right: Target Countdown & Quick Change Goal */}
        <div
          onClick={() => setShowPrepProfileModal(true)}
          className="lg:col-span-4 p-5 rounded-3xl cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-xs flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Countdown to Exam
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {examDaysRemaining} Days Left
              </div>
              <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1 mt-0.5">
                <span>Change Target Goal</span>
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PRIMARY ACTION HUB: 4 CORE JUMP CARDS (WHAT DO YOU WANT TO STUDY?)    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>What do you want to study today?</span>
          </h2>
          <button
            type="button"
            onClick={() => setStudentGuideOpen(true)}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Guide for Students</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Practice Questions */}
          <Link
            to="/practice"
            onClick={() => soundFeedback.playClick()}
            className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                  1 Lakh+ MCQs
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Practice Questions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Chapter-wise practice with step-by-step solutions, hints & instant answer feedback.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Start Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: CBT Mock Tests */}
          <Link
            to="/tests"
            onClick={() => soundFeedback.playClick()}
            className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                  Real CBT Exam
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Take a Mock Test
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Official CBT exam interface with countdown timer, negative marking & rank prediction.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Take Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Video Lectures */}
          <Link
            to="/lectures"
            onClick={() => soundFeedback.playClick()}
            className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Tv className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800">
                  Chapter Order S.No
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Video Lectures
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  High-yield one-shots & topic deep dives by top educators sorted by NCERT sequence.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>Watch Lectures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 4: Formula Notes Hub */}
          <Link
            to="/formula-sheet"
            onClick={() => soundFeedback.playClick()}
            className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BookMarked className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
                  900+ Formulas
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Formula Sheets
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Dedicated chapter formula sheets, KaTeX rendered math & solved numerical examples.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View Formulas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. NEW STUDENT ORIENTATION GUIDE (IF ZERO QUESTIONS SOLVED)               */}
      {/* ========================================================================= */}
      {isNewStudent ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-blue-500/10 border border-emerald-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                🚀
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Welcome to STUDY UP! How to start your preparation:
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Here is your recommended 3-step path to begin scoring high:
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/practice')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-sm self-start sm:self-auto cursor-pointer"
            >
              Start Practice Session →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c141d] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Practice 10-15 Questions</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pick Physics, Chemistry, or Maths/Biology and solve a small set of questions to test your basics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c141d] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Watch Verified Lectures</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Whenever you get stuck on a tough concept, watch the curated one-shot video lecture.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c141d] border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">Revise Chapter Formulas</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Use the dedicated formula sheets before every mock test to memorize equations & units.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* 4. CONTINUE LEARNING (RESUME UNFINISHED LECTURE OR FORMULA)                */}
      {/* ========================================================================= */}
      {continueLearning && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-50/90 via-white to-blue-50/40 dark:from-[#0b1622] dark:via-[#0e1620] dark:to-[#0b1622] border border-blue-200/80 dark:border-blue-900/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              {continueLearning.type === 'lecture' ? (
                <Play className="w-5 h-5 fill-current" />
              ) : continueLearning.type === 'formula' ? (
                <BookMarked className="w-5 h-5" />
              ) : (
                <BookOpen className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  Continue Learning
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-500">{continueLearning.subject}</span>
              </div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white truncate mt-0.5">
                {continueLearning.title}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {continueLearning.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFeedback.playClick();
              navigate(continueLearning.url);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition active:scale-95 flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>Resume Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DAILY PRACTICE GOAL & PROGRESS TRACKER                                 */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Daily Practice Goal
              </h3>
              <p className="text-xs text-slate-400">
                Solve questions daily to build consistency and exam speed
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              {user.todayQuestionsCount || 0} / {user.dailyGoalQuestions || 25} Qs
            </span>
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            {(user.todayQuestionsCount || 0) === 0
              ? `Solve ${user.dailyGoalQuestions || 25} questions today to establish your daily study streak.`
              : (user.todayQuestionsCount || 0) < (user.dailyGoalQuestions || 25)
              ? `Great progress! Solve ${(user.dailyGoalQuestions || 25) - (user.todayQuestionsCount || 0)} more questions to finish today's goal.`
              : "Outstanding work! Today's practice goal is completed."}
          </p>
          <button
            onClick={() => {
              soundFeedback.playClick();
              navigate('/practice');
            }}
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Practice Now</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SUBJECT PRACTICE BREAKDOWN (PHYSICS • CHEMISTRY • MATHS/BIO)           */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500 stroke-[2.5]" />
            <span>Subject Practice Overview</span>
          </h2>
          <Link
            to="/syllabus"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
          >
            <span>View Syllabus Tracker</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject 1: Physics */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40">
                  Physics
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {physicsMetric.count} Solved
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                Mechanics, Electrodynamics & Modern Physics
              </h4>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${Math.max(4, physicsMetric.pct)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => navigate('/practice?subject=Physics')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Practice Physics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subject 2: Chemistry */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40">
                  Chemistry
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {chemistryMetric.count} Solved
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                Physical, Inorganic & Organic Chemistry
              </h4>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.max(4, chemistryMetric.pct)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => navigate('/practice?subject=Chemistry')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Practice Chemistry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subject 3: Mathematics or Biology */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
                  {thirdSubjectName}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {thirdMetric.count} Solved
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {prepType === 'NEET' ? 'Botany, Zoology & Genetics' : 'Calculus, Algebra & Vectors'}
              </h4>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.max(4, thirdMetric.pct)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => navigate(`/practice?subject=${encodeURIComponent(thirdSubjectName)}`)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Practice {thirdSubjectName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. QUICK ACADEMIC TOOLS (AI DOUBTS • PAPERS • WEAKNESS • SYLLABUS)        */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
          Helpful Study Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Tool 1: AI Doubts */}
          <Link
            to="/doubts"
            className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-2xs transition group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-purple-600 transition">
                AI Doubt Solver
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Upload image or type any question
              </p>
            </div>
          </Link>

          {/* Tool 2: Previous Year Papers */}
          <Link
            to="/papers"
            className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-sky-500 shadow-2xs transition group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-sky-600 transition">
                Previous Papers
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Official JEE & NEET past years
              </p>
            </div>
          </Link>

          {/* Tool 3: Fix Weakness */}
          <Link
            to="/weakness"
            className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-rose-500 shadow-2xs transition group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-rose-600 transition">
                Fix Weak Areas
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Personalized mistake correction
              </p>
            </div>
          </Link>

          {/* Tool 4: Syllabus Tracker */}
          <Link
            to="/syllabus"
            className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-2xs transition group space-y-2"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                Syllabus Tracker
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Full chapter completion status
              </p>
            </div>
          </Link>
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
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
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
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition ${
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
              onClick={() => {
                localStorage.setItem('prepora_onboarding_completed', 'true');
                setShowPrepProfileModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}

      {/* Student Guide Modal */}
      <StudentGuideModal
        isOpen={studentGuideOpen}
        onClose={() => setStudentGuideOpen(false)}
      />
    </div>
  );
};

export default Home;
