import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Bookmark,
  Wrench,
  FileText,
  Zap,
  TrendingUp,
  Clock,
  Play,
  Award,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Check,
  Target,
  ChevronRight,
  ShieldCheck,
  Radio,
  BarChart3,
  Calendar,
  Compass,
  ArrowUpRight,
  Activity,
  Layers,
  Sparkle,
  AlertTriangle,
  TrendingDown
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { progressService } from '../services/progressService';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
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

  const recommendations = ecosystemService.getStudyRecommendations();
  const topRecommendation = ecosystemService.getTopStudyRecommendation();
  const readiness = ecosystemService.getExamReadiness(user.targetExam);
  const weaknesses = progressService.getTopicWeaknesses().slice(0, 3);
  const leaderboard = ecosystemService.getLeaderboard();

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
  const remainingMinutes = Math.max(0, dailyPlan.totalDurationMinutes - dailyPlan.completedMinutes);

  return (
    <div className="space-y-7 max-w-7xl mx-auto pb-20 animate-slide-up">
      {/* 1. TOP LIVE APEX BAR (OriginUI inspired pill strip with live radar) */}
      <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 p-2.5 sm:px-4 sm:py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tracking-tight flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              1,540+ Aspirants In Arena
            </span>
          </div>

          <span className="hidden md:inline text-slate-300">•</span>
          
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Target Exam:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-800 border border-slate-200">
              {user.targetExam} {user.targetYear}
            </span>
            <span className="text-slate-400">Class {user.classLevel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-300/60 text-amber-800 text-xs font-black shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{user.streakDays} Days</span>
          </div>

          <button
            onClick={() => setShowStudyModal(true)}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200/70 text-purple-700 text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-12 transition-transform" />
            <span>AI Advice</span>
          </button>
        </div>
      </div>

      {/* 2. 21ST.DEV STYLE AURORA HERO + DYNAMIC HUD GAUGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Aurora Interactive Command Hero (8 cols) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-mesh-purple p-7 sm:p-9 text-white shadow-2xl border border-white/10 flex flex-col justify-between">
          {/* Subtle 21st.dev dot overlay */}
          <div className="absolute inset-0 bg-dot-pattern-dark pointer-events-none opacity-40" />

          {/* Glowing Animated Ambient Orbs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl pointer-events-none animate-float" />
          <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

          {/* Card Content */}
          <div className="relative z-10 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-purple-200 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Personalized Prep Engine Active</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Hi, {user.name.split(' ')[0]} 👋
            </h1>

            <p className="text-purple-100/90 text-xs sm:text-sm max-w-xl leading-relaxed font-normal">
              Here's your preparation overview. Complete your daily targets and fix your weak areas.
            </p>
          </div>

          {/* Action Row */}
          <div className="relative z-10 pt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowStudyModal(true)}
              className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-purple-50 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-purple-600 transition-transform group-hover:scale-110" />
              <span>What Should I Study Today?</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                setSelectedSprintTime(20);
                setStudySessionModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Launch 20-Min Sprint</span>
            </button>
          </div>
        </div>

        {/* Right Executive KPI Tiles (4 cols) */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Readiness Index Tile (OriginUI card with progress ring vibe) */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Exam Readiness</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Tier 1 Aspirant
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black tracking-tight text-slate-900">{readiness.score}</span>
                  <span className="text-sm font-bold text-slate-400">/100</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Top 15% Percentile in Cohort
                </p>
              </div>

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 shrink-0">
                <Target className="w-8 h-8" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Next target: 85/100</span>
              <Link to="/performance" className="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-0.5">
                Analyze <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Daily Practice Target Tile */}
          <div className="relative overflow-hidden bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover-lift flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Daily Target</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold">
                Goal: {user.dailyGoalQuestions || 50} Qs
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black tracking-tight text-slate-900">{user.todayQuestionsCount || 24}</span>
                  <span className="text-sm font-bold text-slate-400">/{user.dailyGoalQuestions || 50} Qs</span>
                </div>
                <p className="text-xs font-semibold text-purple-700 mt-1">
                  {Math.max(0, (user.dailyGoalQuestions || 50) - (user.todayQuestionsCount || 24))} questions to reach target
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 shrink-0">
                <Flame className="w-8 h-8 fill-white" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.round(((user.todayQuestionsCount || 24) / (user.dailyGoalQuestions || 50)) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.1 WHAT SHOULD I STUDY NOW? (task2.md Section 1: The Smartest Screen on PREPORA) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 border border-purple-500/40 p-6 sm:p-7 shadow-2xl text-white">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Header Tag Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-purple-300">
                WHAT SHOULD I STUDY NOW?
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                {topRecommendation.priorityBadge}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-purple-200/90 font-medium">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{topRecommendation.estimatedMinutes} Mins</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>{topRecommendation.questionCount} Questions</span>
              </span>
            </div>
          </div>

          {/* Main Focus Area */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-lg bg-brand-600 text-white font-bold">
                  {topRecommendation.subject}
                </span>
                <span className="text-purple-300 font-semibold">{topRecommendation.chapter}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {topRecommendation.topic}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(topRecommendation.actionUrl)}
                className="font-black text-xs px-5 py-3 bg-white text-purple-950 hover:bg-purple-50 shadow-xl shadow-purple-900/40 transform hover:-translate-y-0.5 transition-all"
              >
                <span>{topRecommendation.actionLabel}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <button
                onClick={() => navigate(topRecommendation.secondaryActionUrl)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
              >
                {topRecommendation.secondaryActionText}
              </button>

              <button
                onClick={() => setShowStudyModal(true)}
                className="px-3 py-2.5 rounded-xl text-purple-300 hover:text-white font-semibold text-xs transition-colors"
              >
                Pick Different Topic
              </button>
            </div>
          </div>

          {/* 3 Diagnostic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Accuracy Diagnostic</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {topRecommendation.reasons[0]}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Repeated Mistake Pattern</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {topRecommendation.reasons[1]}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Exam Yield & Weightage</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {topRecommendation.reasons[2]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 CONTINUE WHERE YOU LEFT (Task.md Section 7) */}
      {(activeTest || activePractice) && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-500/30 p-5 sm:p-6 shadow-xl text-white animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <RotateCcw className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-300">
                  Universal Session Recovery
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  CONTINUE WHERE YOU LEFT
                </h3>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              Auto-Saved State Safe
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Active Test Card */}
            {activeTest && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                      Active Examination
                    </span>
                    <button
                      onClick={() => {
                        syncEngine.clearActiveTest(activeTest.testId);
                        setActiveTest(null);
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {activeTest.state.testTitle || 'Full Mock CBT Test'}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                    <span>
                      Question <b className="text-white">{(activeTest.state.currentIndex || 0) + 1}</b> / {activeTest.state.totalQuestions || 30}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-300 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {Math.floor((activeTest.state.timeLeftSeconds || 0) / 60)}m {(activeTest.state.timeLeftSeconds || 0) % 60}s left
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full justify-center bg-purple-600 hover:bg-purple-500 text-xs py-2 mt-1 shadow-md shadow-purple-600/30"
                  onClick={() => navigate(`/tests/${activeTest.testId}/start`)}
                >
                  Continue Test <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )}

            {/* Active Practice Card */}
            {activePractice && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Practice Session
                    </span>
                    <button
                      onClick={() => {
                        syncEngine.clearActivePractice();
                        setActivePractice(null);
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    Continue {activePractice.chapter || 'Kinematics'} Practice
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                    <span>
                      Question <b className="text-white">{(activePractice.currentQuestionIndex || 0) + 1}</b> / {activePractice.totalQuestions || 20}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-300 font-bold">
                      {activePractice.completedPercentage || 68}% completed
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full justify-center bg-indigo-600 hover:bg-indigo-500 text-xs py-2 mt-1 shadow-md shadow-indigo-600/30"
                  onClick={() => navigate(`/practice/session?subject=${encodeURIComponent(activePractice.subject || 'Physics')}&chapter=${encodeURIComponent(activePractice.chapter || 'Kinematics')}`)}
                >
                  Continue Practice <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK ACTIONS ROW (Task.md Section 6: Practice, Take a Test, Study Hub, Doubts, Fix Weakness) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Quick Actions</span>
          <span className="text-[11px] font-bold text-brand-600">Direct Launch</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { label: 'Practice', path: '/practice', icon: BookOpen, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', desc: 'Custom drills' },
            { label: 'Take a Test', path: '/tests', icon: GraduationCap, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', desc: 'Full mock CBT' },
            { label: 'Study Hub', path: '/study-hub', icon: Bookmark, color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100', desc: 'Notes & formulas' },
            { label: 'Doubts', path: '/doubts', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', desc: 'Ask mentors' },
            { label: 'Fix Weakness', path: '/weakness', icon: Zap, color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100', desc: 'Targeted recovery' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.path}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${action.color} group hover:shadow-sm`}
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">{action.label}</div>
                  <div className="text-[10px] text-slate-500">{action.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. BENTO 2-COLUMN COCKPIT (7 COLS LEFT / 5 COLS RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* ================= LEFT COLUMN: STUDY WORKFLOW ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Today's Action Plan (OriginUI Interactive Checklist) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  📋
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">Today's Study Plan</h2>
                  <p className="text-xs text-slate-500">
                    {completedTasksCount} of {totalTasksCount} tasks completed • {remainingMinutes} min remaining
                  </p>
                </div>
              </div>

              <span className={`self-start sm:self-auto text-xs font-black px-3 py-1 rounded-full ${
                planProgressPercent === 100
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {planProgressPercent}% Completed
              </span>
            </div>

            {/* Plan Progress Track */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${planProgressPercent}%` }}
              />
            </div>

            {/* Task Items */}
            <div className="space-y-2.5">
              {dailyPlan.items.map((item, idx) => {
                const isDone = item.status === 'completed';
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200/70'
                        : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
                      <button
                        onClick={() => handleToggleDailyPlan(item.id)}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-800'
                        }`}
                        title={isDone ? 'Click to mark pending' : 'Click to mark completed'}
                      >
                        {isDone ? '✓' : idx + 1}
                      </button>

                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold truncate ${isDone ? 'text-slate-700' : 'text-slate-900'}`}>
                            {item.title}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isDone ? 'Completed' : item.type}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{item.durationMinutes} mins</span>
                          <span>•</span>
                          <span className="text-purple-600 font-semibold">{item.subject}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={item.actionUrl}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-purple-600 text-white hover:bg-purple-700 shadow-xs'
                        }`}
                      >
                        {isDone ? 'Review' : 'Start Task →'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: AI Study Recommendation Engine (Shimmer Border Effect) */}
          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-purple-500/30 shimmer-overlay">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300">Continuous Mastery</span>
                  <h3 className="text-base font-black text-white">#1 Priority: {recommendations.priorities[0].chapter}</h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[11px] font-bold">
                {recommendations.priorities[0].priorityLabel}
              </span>
            </div>

            <p className="text-xs text-purple-100/80 leading-relaxed">
              {recommendations.priorities[0].reason} Current mastery stands at <strong className="text-white">{recommendations.priorities[0].mastery}%</strong>. 
              Running a targeted 10-question drill will seal calculation mistakes.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-purple-200 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Recommended: 12 Practice Qs</span>
              </div>

              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate(`/practice?chapter=${encodeURIComponent(recommendations.priorities[0].chapter)}`)}
                className="font-bold text-xs bg-white text-purple-950 hover:bg-purple-50 shadow-md"
              >
                <span>Drill {recommendations.priorities[0].chapter}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Card 3: Priority Weak Topics (Pulse alert with 1-click drill) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Priority Weak Topics</h3>
                  <p className="text-xs text-slate-500">Topics requiring immediate reinforcement</p>
                </div>
              </div>
              <Link to="/weakness" className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {weaknesses.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <span className="relative flex h-2.5 w-2.5 mt-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="brand" size="sm">{w.subject}</Badge>
                        <span className="font-bold text-xs text-slate-900">{w.chapter}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{w.topic}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pl-5 sm:pl-0">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-black text-rose-600">{w.accuracy}% Accuracy</div>
                      <div className="text-[10px] text-slate-400">{w.wrongCount} errors logged</div>
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/practice?chapter=${encodeURIComponent(w.chapter)}&topic=${encodeURIComponent(w.topic)}`)}
                      className="text-xs font-bold px-3 py-1"
                    >
                      <span>Drill</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: DIAGNOSTICS & BENCHMARK ================= */}
        <div className="lg:col-span-5 space-y-6">

          {/* Widget 1: Time-Boxed Study Sprint Runner (OriginUI interactive chips) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 rounded-3xl p-6 border border-purple-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  ⚡
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Study Sprint Runner</h3>
                  <p className="text-[11px] text-slate-500">Time-boxed high focus intervals</p>
                </div>
              </div>
              <Badge variant="brand" size="sm">Sprint Mode</Badge>
            </div>

            <div>
              <span className="text-xs text-slate-600 font-semibold">Choose session duration:</span>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {([10, 20, 30, 45, 60] as const).map(mins => (
                  <button
                    key={mins}
                    onClick={() => setSelectedSprintTime(mins)}
                    className={`py-2 rounded-xl text-xs font-black transition-all ${
                      selectedSprintTime === mins
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-[1.03]'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 text-xs text-purple-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>{selectedSprintTime}-Minute Structured Interval:</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                • Formula Review (3m) • Focus Practice ({selectedSprintTime - 8}m) • Quick Check Quiz (5m)
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setStudySessionModalOpen(true)}
              className="w-full font-black text-xs shadow-lg shadow-purple-500/25 py-3 rounded-2xl"
            >
              <Play className="w-4 h-4 mr-2 fill-white" />
              <span>Launch {selectedSprintTime}-Minute Sprint</span>
            </Button>
          </div>

          {/* Widget 2: 5-Pillar Exam Readiness Diagnostic */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">Diagnostic Breakdown</span>
                <h3 className="font-black text-base text-slate-900 mt-0.5">5 Readiness Pillars</h3>
              </div>
              <span className="text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full">
                {readiness.score >= 80 ? 'High Mastery' : readiness.score >= 60 ? 'Moderate Mastery' : 'Foundation Level'}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Concepts Mastery', val: readiness.concepts, color: 'bg-purple-600' },
                { label: 'Accuracy Rate', val: readiness.accuracy, color: 'bg-emerald-500' },
                { label: 'Speed Index', val: readiness.speed, color: 'bg-sky-500' },
                { label: 'Consistency', val: readiness.consistency, color: 'bg-amber-500' },
                { label: 'Hard Questions', val: readiness.hardQuestions, color: 'bg-rose-500' },
              ].map(metric => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{metric.label}</span>
                    <span className="font-bold text-slate-800">{metric.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`${metric.color} h-full rounded-full transition-all duration-500`} style={{ width: `${metric.val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-purple-950">
              <strong>Key Recommendation:</strong> {readiness.recommendedAction}
            </div>
          </div>

          {/* Widget 3: Cohort Leaderboard Benchmark */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-base text-slate-900">Cohort Benchmark</h3>
              </div>
              <Link to="/leaderboard" className="text-xs font-bold text-purple-600 hover:text-purple-700">
                Full Board →
              </Link>
            </div>

            <div className="space-y-2">
              {leaderboard.entries.slice(0, 3).map(entry => (
                <div key={entry.rank} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full font-bold flex items-center justify-center text-[10px] ${
                      entry.rank === 1 ? 'bg-amber-100 text-amber-800' :
                      entry.rank === 2 ? 'bg-slate-200 text-slate-800' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      #{entry.rank}
                    </span>
                    <span className="font-bold text-slate-800">{entry.studentName}</span>
                  </div>
                  <span className="font-black text-purple-700">{entry.score} pts</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
              <span className="text-purple-900 font-semibold">Your Rank: <strong>#14 (Top 8%)</strong></span>
              <span className="text-purple-700 font-bold">1,820 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WORKSPACE DIRECTORY: 3-COLUMN BENTO SYSTEM CARDS */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Ecosystem Directory</h2>
            <p className="text-xs text-slate-500">Every module built for complete exam mastery</p>
          </div>
          <span className="text-xs font-bold text-slate-400">9 Core Hubs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Test & Exam Hall */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 card-hover-lift flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Assessment</span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Exam Hall & Mocks</h3>
                <p className="text-xs text-slate-500 mt-0.5">Full simulation with timer</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience actual TCS exam screen conditions with section switching, marking scheme, and immediate post-test analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              <Link to="/tests" className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors">
                Full Mocks →
              </Link>
              <Link to="/build-test" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                Build Test →
              </Link>
              <Link to="/papers" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                PYQs →
              </Link>
            </div>
          </div>

          {/* Card 2: Improvement Engine */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 card-hover-lift flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Remediation</span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Improvement Engine</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mistakes & spaced repetition</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Blind retry on failed questions, formula flashcards with Leitner intervals, and deep analytics on calculation errors.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              <Link to="/mistakes" className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors">
                Mistake Book →
              </Link>
              <Link to="/weakness" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                Fix Weakness →
              </Link>
              <Link to="/revision" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                Smart Revision →
              </Link>
            </div>
          </div>

          {/* Card 3: Support & Guidance */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 card-hover-lift flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Mentorship</span>
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Support & Mentorship</h3>
                <p className="text-xs text-slate-500 mt-0.5">Doubts & weekly audits</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ask doubts with pre-attached question context, chat safely with peer aspirants, and inspect comprehensive weekly audits.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              <Link to="/doubts" className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors">
                Doubt Center →
              </Link>
              <Link to="/messages" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                Messages →
              </Link>
              <Link to="/weekly-report" className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors">
                Weekly Audit →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* "WHAT SHOULD I STUDY?" MODAL */}
      <Modal
        isOpen={showStudyModal}
        onClose={() => setShowStudyModal(false)}
        title="What Should I Study Today?"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setShowStudyModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowStudyModal(false);
                navigate(`/practice?chapter=${encodeURIComponent(recommendations.priorities[0].chapter)}`);
              }}
              className="font-bold shadow-xs"
            >
              Start Priority 1 Practice
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <p className="text-xs text-slate-500">
            Based on your test attempts and mistake notebook, here is your ranked study priority:
          </p>

          <div className="space-y-3">
            {recommendations.priorities.map(p => (
              <div key={p.rank} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {p.rank}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{p.chapter}</span>
                    <Badge variant="brand" size="sm">{p.subject}</Badge>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    p.priorityLabel === 'HIGH PRIORITY' 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.priorityLabel}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Current Mastery: <strong>{p.mastery}%</strong> • {p.reason}
                </div>
              </div>
            ))}
          </div>

          {/* "Don't Study This Now" Guard */}
          {recommendations.strongAdvisory && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span>🟢 High Mastery Advisory:</span>
                <span>{recommendations.strongAdvisory.chapter} ({recommendations.strongAdvisory.mastery}%)</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Your performance is already very strong here. Consider redirecting your study time today towards <strong>{recommendations.strongAdvisory.recommendedAlternative}</strong> instead.
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Study Session Modal Runner */}
      <StudySessionModal
        isOpen={studySessionModalOpen}
        onClose={() => setStudySessionModalOpen(false)}
        initialDuration={selectedSprintTime}
      />
    </div>
  );
};
