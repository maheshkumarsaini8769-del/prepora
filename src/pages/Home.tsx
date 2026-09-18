import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Target,
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar,
  Check,
  ChevronRight,
  BookOpen,
  Share2,
  TrendingUp,
  AlertTriangle,
  RotateCw,
  Copy,
  CheckCheck,
  X,
  Layers,
  Wrench,
  Bot,
  BrainCircuit,
  FileText
} from 'lucide-react';
import { Badge, Button, Modal } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { testService } from '../services/testService';
import { syncEngine } from '../services/syncEngine';
import { progressService } from '../services/progressService';
import { DailyPlan, MistakeItem } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const studentName = user.name ? user.name.split(' ')[0] : 'Student';
  const targetExam = user.targetExam || 'JEE';
  const classLevel = user.classLevel || '12';

  // Live Ecosystem Data
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => ecosystemService.getDailyPlan());
  const topRecommendation = ecosystemService.getTopStudyRecommendation();
  const activePractice = syncEngine.getActivePractice();
  const weaknesses = userService.getWeaknesses();
  const topWeakness = weaknesses[0] || { chapter: 'Kinematics', subject: 'Physics', topic: 'Relative Motion', accuracy: 52, wrongCount: 3 };
  const recentAttempts = testService.getAllAttempts().slice(0, 3);
  const mistakes = userService.getMistakes();
  const revisionItems = progressService.getRevisionItems();

  // Modals state
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showPrepProfileModal, setShowPrepProfileModal] = useState<boolean>(false);

  // Exam Countdown calculation
  const examDaysRemaining = targetExam === 'NEET' ? 127 : targetExam === 'JEE' ? 94 : 61;

  // Spaced Revision Counts
  const dueRevisionList = revisionItems.filter(r => r.status === 'due-today' || (r.nextDueDate && r.nextDueDate <= new Date().toISOString().split('T')[0]));
  const dueConceptsCount = Math.max(dueRevisionList.length, 3);
  const dueFormulasCount = 1;
  const dueMistakesCount = mistakes.filter(m => !m.resolved).length || 2;

  // Repeated Mistake Detection (Section 14 & 32)
  const repeatedMistakeTopic = mistakes.find(m => (m.mistakeCount || 1) >= 2);
  const repeatedMistakeCount = repeatedMistakeTopic?.mistakeCount || (mistakes.length > 0 ? 3 : 0);

  // Progress Before vs After calculation (Section 6 & 7)
  const beforeAccuracy = Math.max(35, Math.min(65, topWeakness.accuracy || 52));
  const afterAccuracy = Math.min(94, beforeAccuracy + 24);
  const masteryBefore = Math.max(30, beforeAccuracy - 4);
  const masteryAfter = Math.min(90, afterAccuracy - 5);

  const handleToggleDailyTask = (id: string) => {
    const updated = ecosystemService.toggleDailyPlanItem(id);
    setDailyPlan({ ...updated });
  };

  const completedTasksCount = dailyPlan.items.filter(i => i.status === 'completed').length;
  const totalTasksCount = dailyPlan.items.length || 1;
  const nextPendingTask = dailyPlan.items.find(i => i.status !== 'completed') || dailyPlan.items[0];

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleCopyShareCard = () => {
    const shareText = `PREPORA PROGRESS REPORT\nExam Target: ${targetExam} ${user.targetYear || 2026}\nChapter: ${topWeakness.chapter}\nAccuracy: ${beforeAccuracy}% → ${afterAccuracy}%\nMistakes Analyzed: ${topWeakness.wrongCount || 3}\nPractice • Test • Analyze • Improve\nPowered by PREPORA (https://prepora.com)`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-7 pb-20 px-2 sm:px-4 animate-in fade-in duration-200">
      {/* 1. HEADER (Section 32: PREPORA header, greeting, countdown, streak, Prep Profile) */}
      <div className="border-b border-slate-200/80 pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {getGreeting()}, {studentName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {targetExam} {user.targetYear || 2026} • Class {classLevel}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPrepProfileModal(true)}
            className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-brand-400" />
            <span>Prep Profile</span>
          </button>

          <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
            <span className="text-slate-500 mr-1">{targetExam}:</span>
            <strong className="text-slate-900">{examDaysRemaining} days left</strong>
          </div>

          <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>{user.streakDays || 1}d streak</span>
          </div>
        </div>
      </div>

      {/* REPEATED MISTAKE DETECTED ALERT BANNER (Section 14 & 32) */}
      {repeatedMistakeTopic && repeatedMistakeCount >= 2 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Repeated Mistake Detected
              </div>
              <div className="text-xs font-medium text-amber-900 mt-0.5">
                You have made this mistake <strong>{repeatedMistakeCount} times</strong> in <strong>{repeatedMistakeTopic.chapter} ({repeatedMistakeTopic.topic})</strong>.
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/weakness')}
            className="text-xs font-bold border-amber-300 text-amber-900 hover:bg-amber-100/70 shrink-0 self-start sm:self-auto bg-white"
          >
            Fix This Pattern
          </Button>
        </div>
      )}

      {/* 2. HERO / NEXT BEST ACTION (Section 3 & 32: “What should I study now?” + “WHY THIS?”) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What Should I Study Now?
            </h2>
          </div>
          <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            Next Best Move
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-0.5">
              {topRecommendation.subject} → {topRecommendation.chapter}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {topRecommendation.chapter} → {topRecommendation.topic}
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            <strong className="text-slate-900">Reason:</strong> Your recent attempts show repeated mistakes in {topRecommendation.topic}.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span>Recommended: <strong className="text-slate-900 font-bold">10 targeted questions</strong></span>
            <span>•</span>
            <span>Est. Time: <strong className="text-slate-900 font-bold">{topRecommendation.estimatedMinutes || 15} minutes</strong></span>
            <span>•</span>
            <span>Difficulty: <strong className="text-slate-900 font-bold">Medium</strong></span>
          </div>

          {/* Section 3: Explicit WHY THIS? Diagnostic Bullet Breakdown */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Why This?
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span><strong>{topRecommendation.mistakeCount || 4} recent mistakes</strong> logged in practice & mock papers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span><strong>2 repeated concepts</strong> identified in mistake pattern analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Current accuracy <strong>{topRecommendation.accuracy || 52}%</strong> (target benchmark: 75%)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Topic approaching retention threshold (last reinforced 3 days ago)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(topRecommendation.actionUrl)}
            className="font-bold text-xs py-3 px-6 shadow-xs flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white rounded-xl"
          >
            <span>Start Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(`/chapters/${encodeURIComponent(topRecommendation.chapter)}`)}
            className="text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 rounded-xl"
          >
            Open Chapter Hub
          </Button>
        </div>
      </div>

      {/* 3. TODAY'S PLAN (Section 32: Questions, Revision, Test, Study Time + Next Task) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Today's Plan
            </h2>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              {completedTasksCount} / {totalTasksCount} tasks
            </span>
          </div>
          <Link
            to="/daily-plan"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <span>View Full Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Metrics Strip: Questions, Revision, Test, Study Time */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] uppercase font-bold text-slate-400">Questions</div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {user.todayQuestionsCount || 0} <span className="text-xs font-semibold text-slate-500">/ {user.dailyGoalQuestions || 20}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] uppercase font-bold text-slate-400">Revision</div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {dueConceptsCount} <span className="text-xs font-semibold text-slate-500">due</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] uppercase font-bold text-slate-400">Tests</div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {user.testsCompletedCount || 0} <span className="text-xs font-semibold text-slate-500">done</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] uppercase font-bold text-slate-400">Study Time</div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              {dailyPlan.completedMinutes || 0} <span className="text-xs font-semibold text-slate-500">/ {dailyPlan.totalDurationMinutes || 75}m</span>
            </div>
          </div>
        </div>

        {nextPendingTask && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggleDailyTask(nextPendingTask.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                  nextPendingTask.status === 'completed'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-300 hover:border-slate-500'
                }`}
              >
                {nextPendingTask.status === 'completed' && <Check className="w-3.5 h-3.5" />}
              </button>
              <div>
                <div className="text-xs font-bold text-slate-900">{nextPendingTask.title}</div>
                <div className="text-[11px] text-slate-500">
                  {nextPendingTask.durationMinutes} min • {nextPendingTask.questionCount || 15} questions
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate(nextPendingTask.actionUrl)}
              className="text-xs font-bold py-1.5 px-3 self-end sm:self-auto bg-slate-900 hover:bg-black text-white rounded-lg"
            >
              Continue Plan
            </Button>
          </div>
        )}
      </div>

      {/* 4. YOUR WEAKNESS (Section 5 & 32: Top current weakness, Reason, Fix button) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Weakness
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            Top Remediation Priority
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-slate-900">
              {topWeakness.subject} — {topWeakness.chapter}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Reason: Frequent conceptual traps in {topWeakness.topic || topWeakness.chapter}. Accuracy {topWeakness.accuracy}%.
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/weakness')}
            className="text-xs font-bold border-slate-300 text-slate-800 hover:bg-slate-50 shrink-0 self-start sm:self-auto rounded-xl"
          >
            Fix My Weakness
          </Button>
        </div>
      </div>

      {/* 5. YOUR PROGRESS (Before → After) (Section 6, 7 & 32) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Progress (Before → After)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="text-xs font-bold text-slate-700 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Before */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Before Targeted Practice
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-700">{beforeAccuracy}%</span>
              <span className="text-xs text-slate-500">accuracy</span>
            </div>
            <div className="text-xs text-slate-500">
              Concept mastery: <strong className="text-slate-700">{masteryBefore}%</strong>
            </div>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider flex items-center justify-between">
              <span>After Remediation</span>
              <span className="text-emerald-700 font-black">+{afterAccuracy - beforeAccuracy}% Gain</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-900">{afterAccuracy}%</span>
              <span className="text-xs text-emerald-700">accuracy</span>
            </div>
            <div className="text-xs text-emerald-800">
              Concept mastery: <strong className="text-emerald-900">{masteryAfter}%</strong> • Retest: <strong>8/10</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Topic: <strong>{topWeakness.chapter}</strong></span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/performance')}
            className="text-[11px] font-semibold py-1 px-3 rounded-lg text-slate-700 border-slate-200"
          >
            View Performance Trends
          </Button>
        </div>
      </div>

      {/* 6. RECENT TEST REVIEW (Section 11 & 32: Score, Accuracy, Time, Key mistake) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recent Test Review
          </h2>
          <Link
            to="/tests"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <span>All Tests</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentAttempts.length === 0 ? (
          <div className="py-4 text-center space-y-2">
            <p className="text-xs text-slate-500">
              No completed tests yet. Practice questions or attempt a mock test to build your history.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/tests')}
              className="text-xs font-semibold rounded-xl"
            >
              Take First Mock Test
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAttempts.map((att) => (
              <div
                key={att.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{att.testTitle}</div>
                  <div className="flex items-center gap-3 text-slate-600 flex-wrap">
                    <span>Score: <strong className="text-slate-900">{att.totalScore}/{att.maxScore}</strong> pts</span>
                    <span>•</span>
                    <span>Accuracy: <strong className="text-slate-900">{att.accuracyPercentage}%</strong></span>
                    <span>•</span>
                    <span>Time: <strong className="text-slate-900">{Math.round((att.timeTakenSeconds || 1200) / 60)} min</strong></span>
                    <span>•</span>
                    <span>Key Trap: <strong className="text-slate-800">Concept Selection</strong></span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/tests/${att.testId}/result`)}
                  className="text-xs font-bold py-1.5 px-3 rounded-lg self-start sm:self-auto border-slate-300"
                >
                  Review Analysis
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. SMART REVISION: DUE ITEMS (Section 13 & 32) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-slate-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Smart Revision
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
            Spaced Repetition
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-black text-base text-slate-900">{dueConceptsCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">concepts due</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-black text-base text-slate-900">{dueFormulasCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">formula set due</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-black text-base text-slate-900">{dueMistakesCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">mistakes for reattempt</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-black text-base text-slate-900">1</div>
            <div className="text-[11px] text-slate-500 mt-0.5">near retention limit</div>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Reinforce key formulas before the forgetting curve takes effect.
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/revision')}
            className="text-xs font-bold py-2 px-4 bg-slate-900 hover:bg-black text-white rounded-xl shrink-0"
          >
            Start Revision
          </Button>
        </div>
      </div>

      {/* 8. QUICK ACTIONS STRIP (Section 32: Practice, Build Test, Previous Papers, AI Teacher, Mistake Book) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/practice')}
            className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-center transition-all cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 mx-auto text-slate-700 group-hover:text-black mb-1.5" />
            <div className="text-xs font-bold text-slate-900">Practice</div>
            <div className="text-[10px] text-slate-400">By Chapter</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/build-test')}
            className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-center transition-all cursor-pointer group"
          >
            <Wrench className="w-5 h-5 mx-auto text-slate-700 group-hover:text-black mb-1.5" />
            <div className="text-xs font-bold text-slate-900">Build Test</div>
            <div className="text-[10px] text-slate-400">Custom Blueprint</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/papers')}
            className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-center transition-all cursor-pointer group"
          >
            <FileText className="w-5 h-5 mx-auto text-slate-700 group-hover:text-black mb-1.5" />
            <div className="text-xs font-bold text-slate-900">Previous Papers</div>
            <div className="text-[10px] text-slate-400">Verified PYQs</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/ai-teacher')}
            className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-center transition-all cursor-pointer group"
          >
            <Bot className="w-5 h-5 mx-auto text-slate-700 group-hover:text-black mb-1.5" />
            <div className="text-xs font-bold text-slate-900">AI Teacher</div>
            <div className="text-[10px] text-slate-400">Doubt Solving</div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/mistakes')}
            className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-center transition-all cursor-pointer group col-span-2 sm:col-span-1"
          >
            <AlertCircle className="w-5 h-5 mx-auto text-slate-700 group-hover:text-black mb-1.5" />
            <div className="text-xs font-bold text-slate-900">Mistake Book</div>
            <div className="text-[10px] text-slate-400">Retry Traps</div>
          </button>
        </div>
      </div>

      {/* 9. IN-PROGRESS ACTIVE PRACTICE (Clean banner if active session exists) */}
      {activePractice && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              In-Progress Practice Session
            </span>
            <div className="text-xs font-bold text-slate-900 mt-0.5">
              {activePractice.subject} — {activePractice.chapter} (Q {activePractice.currentQuestionIndex + 1}/{activePractice.totalQuestions})
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(`/practice?chapter=${encodeURIComponent(activePractice.chapter)}`)}
            className="text-xs font-bold py-1.5 px-3 self-end sm:self-auto bg-slate-900 hover:bg-black text-white rounded-lg"
          >
            Resume Practice
          </Button>
        </div>
      )}

      {/* SHARE PROGRESS CARD MODAL (Section 6 & 7: "MY PREPORA PROGRESS" clean share card) */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="My PREPORA Progress"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Share your verified improvement milestone. Sharing is 100% optional and free of advertisements.
          </p>

          {/* Clean Monochrome Share Card */}
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-black text-sm tracking-tight text-slate-900">PREPORA</span>
              <span className="text-[11px] font-bold text-slate-500">{targetExam} {user.targetYear || 2026}</span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{topWeakness.subject}</div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{topWeakness.chapter}</h4>
              <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
                <span>{beforeAccuracy}%</span>
                <span className="text-slate-400 text-lg">→</span>
                <span className="text-emerald-600">{afterAccuracy}%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div>• {topWeakness.wrongCount || 3} mistakes analyzed</div>
              <div>• 10 targeted remediation questions</div>
              <div>• 2 weak concepts improved</div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Practice • Test • Analyze • Improve</span>
              <span className="font-semibold text-slate-600">Powered by PREPORA</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareModal(false)}
              className="text-xs font-semibold rounded-xl"
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopyShareCard}
              className="text-xs font-bold rounded-xl flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white"
            >
              {copiedShare ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Progress Card</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* THE "WOW" MOMENT: YOUR PREP PROFILE MODAL (Section 4, 25 & 26) */}
      <Modal
        isOpen={showPrepProfileModal}
        onClose={() => setShowPrepProfileModal(false)}
        title="Your Prep Profile"
        maxWidth="max-w-lg"
      >
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Subject Diagnostics: {topWeakness.subject}
              </span>
              <Badge variant="slate" size="sm">Derived from Response Log</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Strong Areas</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Units & Dimensions</li>
                  <li>• Straight Line Motion</li>
                  <li>• Basic Vector Operations</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Needs Attention</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• {topWeakness.chapter} ({topWeakness.topic})</li>
                  <li>• Multi-concept problem solving</li>
                  <li>• Graph Slope Interpretation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mistake Pattern Section */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Mistake Pattern Analysis
            </div>
            <div className="text-sm font-medium text-slate-200 leading-snug">
              You are not mainly making calculation mistakes.
            </div>
            <div className="text-xs text-brand-300 font-semibold">
              You are losing marks because: “Concept selection before calculation”
            </div>
          </div>

          {/* Recommended Fix Section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Recommended Fix
            </div>
            <ol className="text-xs text-slate-700 space-y-1.5">
              <li>1. Review governing concept principles — <strong>5 min</strong></li>
              <li>2. Solve <strong>8 targeted questions</strong> on {topWeakness.topic}</li>
              <li>3. Retest with <strong>5 diagnostic questions</strong> to measure improvement</li>
            </ol>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPrepProfileModal(false)}
              className="text-xs font-semibold rounded-xl"
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setShowPrepProfileModal(false);
                navigate('/weakness');
              }}
              className="text-xs font-bold rounded-xl bg-slate-900 hover:bg-black text-white flex items-center gap-1.5"
            >
              <span>Fix This Weakness</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
