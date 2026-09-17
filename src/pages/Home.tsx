import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Dna,
  Calendar,
  CheckCircle2,
  Check,
  ShieldCheck,
  RotateCcw,
  Layers,
  Award,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  HelpCircle,
  Play,
  ChevronRight
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { testService } from '../services/testService';
import { syncEngine } from '../services/syncEngine';
import { DailyPlan, DailyPlanItem } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const studentName = user.name ? user.name.split(' ')[0] : 'Student';
  const targetExam = user.targetExam || 'JEE';
  const classLevel = user.classLevel || '12';

  // Live Ecosystem Data
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => ecosystemService.getDailyPlan());
  const topRecommendation = ecosystemService.getTopStudyRecommendation();
  const recommendations = ecosystemService.getStudyRecommendations();
  const activePractice = syncEngine.getActivePractice();
  const readiness = ecosystemService.getExamReadiness(targetExam);
  const recentAttempts = testService.getAllAttempts().slice(0, 2);
  const mistakes = userService.getMistakes();

  // Exam Countdown calculation
  const examDaysRemaining = targetExam === 'NEET' ? 127 : targetExam === 'JEE' ? 94 : 61;

  const handleToggleDailyTask = (id: string) => {
    const updated = ecosystemService.toggleDailyPlanItem(id);
    setDailyPlan({ ...updated });
  };

  const completedTasksCount = dailyPlan.items.filter(i => i.status === 'completed').length;
  const totalTasksCount = dailyPlan.items.length || 1;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 px-2 sm:px-4 animate-in fade-in duration-300">
      
      {/* 1. TOP STUDENT WELCOME & EXAM COUNTDOWN BANNER */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Welcome back, {studentName} 👋
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-[11px] font-black border border-purple-400/30">
              {targetExam} 2026 • Class {classLevel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Every practice question and review moves you closer to your target percentile. Let's make today count.
          </p>
        </div>

        {/* Live Exam Countdown & Streak */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center min-w-[130px]">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              {targetExam} Countdown
            </span>
            <div className="text-2xl font-black text-amber-300">{examDaysRemaining} Days</div>
            <span className="text-[10px] text-slate-300">Remaining</span>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center min-w-[110px]">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              Daily Streak
            </span>
            <div className="text-2xl font-black text-white flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>{user.streakDays || 1}</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-semibold">Active Streak</span>
          </div>
        </div>
      </div>

      {/* 2. "WHAT SHOULD I STUDY NOW?" (task4.md Section 5, 14, 24, 35) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900/10 via-purple-500/5 to-slate-900/5 border-2 border-purple-300/80 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 block">
                WHAT SHOULD I STUDY NOW?
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Your Primary Study Recommendation
              </h2>
            </div>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
            HIGH PRIORITY BOTTLENECK
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand">{topRecommendation.subject}</Badge>
              <h3 className="text-xl font-black text-slate-900">
                {topRecommendation.chapter} — {topRecommendation.topic}
              </h3>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <strong className="text-slate-800 font-bold block text-xs">Why focus on this right now?</strong>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {topRecommendation.reasons.map((r, i) => (
                  <li key={i} className="text-slate-700">{r}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span>Current Accuracy: <strong className="text-rose-600">{topRecommendation.accuracy}%</strong></span>
              <span>•</span>
              <span>Estimated Time: <strong className="text-slate-700">{topRecommendation.estimatedMinutes} Minutes</strong></span>
              <span>•</span>
              <span>Questions: <strong className="text-slate-700">{topRecommendation.questionCount} Qs</strong></span>
            </div>
          </div>

          {/* Action Callout */}
          <div className="space-y-2.5 bg-white p-5 rounded-2xl border border-purple-200/70 shadow-xs flex flex-col justify-between">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(topRecommendation.actionUrl)}
              className="w-full font-black text-xs py-3 shadow-md shadow-purple-600/20"
            >
              <span>{topRecommendation.actionLabel}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/chapters/${encodeURIComponent(topRecommendation.chapter)}`)}
                className="text-xs font-bold py-2"
              >
                Learn Chapter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/revision')}
                className="text-xs font-bold py-2"
              >
                Formula Sheet
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary Priorities */}
        <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Next Priorities:</span>
            {recommendations.priorities.slice(1, 3).map((p) => (
              <button
                key={p.chapter}
                type="button"
                onClick={() => navigate(`/practice?chapter=${encodeURIComponent(p.chapter)}`)}
                className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:border-purple-400 font-bold text-slate-700 transition cursor-pointer"
              >
                #{p.rank} {p.subject} — {p.chapter} ({p.mastery}%)
              </button>
            ))}
          </div>

          <Link to="/syllabus" className="text-xs font-black text-purple-700 hover:underline flex items-center gap-1">
            <span>View Full Syllabus Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. "DON'T STUDY THIS NOW" (task4.md Section 6 - Strong Topic Advisory) */}
      {recommendations.strongAdvisory && (
        <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-emerald-950 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                  🟢 STRONG TOPIC — STUDY STRATEGY ADVISORY
                </span>
                <span className="px-2 py-0.2 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-bold">
                  {recommendations.strongAdvisory.mastery}% Mastery
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                You are performing exceptionally well in <strong>{recommendations.strongAdvisory.subject} — {recommendations.strongAdvisory.chapter}</strong>.
                Consider spending today's valuable hours on a weaker topic like <strong>{recommendations.strongAdvisory.recommendedAlternative}</strong> instead.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/chapters/${encodeURIComponent(recommendations.strongAdvisory?.chapter || '')}`)}
              className="text-xs font-bold bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-100"
            >
              Open Anyway
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/weakness')}
              className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              Fix Weaker Topic →
            </Button>
          </div>
        </div>
      )}

      {/* 4. SMART DAILY PLAN WIDGET (task4.md Section 3, 25, 35) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {dailyPlan.totalDurationMinutes} MINUTES TARGET
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Today's Recommended Study Plan
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
              {completedTasksCount} / {totalTasksCount} tasks completed
            </span>
            <Link
              to="/daily-plan"
              className="text-xs font-black text-purple-700 hover:underline flex items-center gap-1"
            >
              <span>Manage Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-Item Daily Tasks List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {dailyPlan.items.map((item, idx) => {
            const isDone = item.status === 'completed';
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isDone
                    ? 'bg-slate-50/80 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200/80 hover:border-purple-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleDailyTask(item.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 mt-0.5 transition-colors cursor-pointer ${
                      isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white hover:border-purple-500'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400">#{idx + 1}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-100 uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold truncate mt-0.5 ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.durationMinutes} min • {item.questionCount || 15} Qs
                    </span>
                  </div>
                </div>

                {!isDone && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(item.actionUrl)}
                    className="text-[11px] font-bold py-1.5 px-3 shrink-0"
                  >
                    Start
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. QUICK ACTIONS RIBBON (task4.md Section 35) */}
      <div className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <span>Essential Quick Actions</span>
          </h3>
          <span className="text-xs text-slate-400">1-click direct study launchers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => navigate('/practice')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-purple-700">Practice Qs</div>
            <div className="text-[10px] text-slate-400">Chapter drills</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/tests')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-indigo-700">Take Mock Test</div>
            <div className="text-[10px] text-slate-400">Full CBT papers</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/build-test')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-blue-700">Build My Test</div>
            <div className="text-[10px] text-slate-400">Custom exam generator</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/papers')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-purple-700">Official PYQs</div>
            <div className="text-[10px] text-slate-400">2020-2025 papers</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/weakness')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-amber-700">Fix Weakness</div>
            <div className="text-[10px] text-slate-400">Error diagnostic doctor</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/tutor')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-xs transition text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="text-xs font-black text-slate-900 group-hover:text-emerald-700">AI Teacher</div>
            <div className="text-[10px] text-slate-400">8 tutoring modes</div>
          </button>
        </div>
      </div>

      {/* 6. ACTIVE PRACTICE CONTINUATION (If session exists) */}
      {activePractice && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider">
              CONTINUE IN-PROGRESS PRACTICE
            </span>
            <h4 className="text-base font-black">
              {activePractice.subject} — {activePractice.chapter}
            </h4>
            <p className="text-xs text-purple-200">
              Question {activePractice.currentQuestionIndex + 1} of {activePractice.totalQuestions} ({activePractice.completedPercentage}% completed)
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/practice?chapter=${encodeURIComponent(activePractice.chapter)}`)}
            className="bg-white text-purple-950 hover:bg-purple-50 font-black text-xs py-2.5 px-5 shadow-md shrink-0"
          >
            <span>Resume Drill</span>
            <ArrowRight className="w-4 h-4 ml-1 text-purple-800" />
          </Button>
        </div>
      )}

      {/* 7. THE 3 MAIN GATEWAYS (HERO ACTION CARDS) */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Primary Preparation Pathways</span>
          </h2>
          <p className="text-xs text-slate-500">
            Official past papers with solutions, comprehensive chapter practice, or full-length timed mocks.
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
                  (With Solutions & Answer Keys)
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official past 5-year exam papers for NEET, JEE, and Board exams. View <strong>verified answers and step-by-step solutions</strong> instantly.
              </p>
            </div>

            <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-black text-purple-700 flex items-center gap-1">
                View Papers & Solutions
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
                  100,000+ Question Pool
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1.5 group-hover:text-emerald-700 transition">
                  Chapter-Wise Practice
                </h3>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  (Chapter & Topic Drills)
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice questions across all chapters in Physics, Chemistry, Mathematics, and Biology. Choose your topic, solve questions, and verify your answers.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                Start Practice Drill
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
                  (Timed Online Examination)
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simulate real exam conditions with live countdown timers, standard +4/-1 marking, and comprehensive rank & scorecards immediately upon submission.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-black text-indigo-700 flex items-center gap-1">
                Go to Mock Test Center
              </span>
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. DIRECT SUBJECT JUMP */}
      <div className="space-y-3 pt-2">
        <div className="px-1">
          <h2 className="text-base font-black text-slate-900">
            Direct Subject Jump
          </h2>
          <p className="text-xs text-slate-500">
            Select a subject to start practicing immediately:
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
              8,250 Questions • 29 Chapters
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
              8,250 Questions • 28 Chapters
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
              8,250 Questions • 29 Chapters
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
              8,250 Questions • 20 Chapters
            </div>
          </button>
        </div>
      </div>

      {/* 9. ESSENTIAL UTILITIES (Mistake Book, Readiness, Mind Map, Weakness) */}
      <div className="space-y-3 pt-2">
        <div className="px-1 flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900">
            Learning Diagnostics & Tools
          </h2>
          <Link to="/readiness" className="text-xs font-black text-purple-700 hover:underline">
            Readiness Score: {readiness.score}/100 →
          </Link>
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
              {mistakes.length} Logged Errors
            </div>
          </div>

          {/* Exam Readiness */}
          <div
            onClick={() => navigate('/readiness')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition">
              Exam Readiness
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {readiness.score}/100 PREPORA Score
            </div>
          </div>

          {/* Mind Map */}
          <div
            onClick={() => navigate('/mind-map')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
              Curriculum Mind Map
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Visual topic trees
            </div>
          </div>

          {/* Performance Analytics */}
          <div
            onClick={() => navigate('/performance')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition">
              Performance Telemetry
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              AIR predictor & accuracy
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
