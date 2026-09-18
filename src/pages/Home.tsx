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
  BookOpen
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { testService } from '../services/testService';
import { syncEngine } from '../services/syncEngine';
import { DailyPlan } from '../types';

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
  const weaknesses = userService.getWeaknesses();
  const topWeakness = weaknesses[0] || { chapter: 'Kinematics', subject: 'Physics' };
  const recentAttempts = testService.getAllAttempts().slice(0, 2);

  // Exam Countdown calculation
  const examDaysRemaining = targetExam === 'NEET' ? 127 : targetExam === 'JEE' ? 94 : 61;

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

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 px-2 sm:px-4 animate-in fade-in duration-200">
      {/* 1. CLEAN ACADEMIC HEADER */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {getGreeting()}, {studentName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {targetExam} {user.targetYear || 2026} • Class {classLevel}
          </p>
        </div>

        {/* Minimal Exam Countdown & Streak */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
            <span className="text-slate-500 mr-1">{targetExam}:</span>
            <strong className="text-slate-900">{examDaysRemaining} days left</strong>
          </div>
          <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-slate-700 fill-slate-700" />
            <span>{user.streakDays || 1}d</span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY ACTION: WHAT SHOULD I STUDY NOW? (task5.md Section 74) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What Should I Study Now?
            </h2>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
            Top Priority
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-0.5">
              {topRecommendation.subject}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {topRecommendation.chapter} — {topRecommendation.topic}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Accuracy: <strong className="text-slate-900 font-bold">{topRecommendation.accuracy}%</strong></span>
            <span>•</span>
            <span>Mistakes: <strong className="text-slate-900 font-bold">{topRecommendation.mistakeCount}</strong></span>
            <span>•</span>
            <span>Est. Time: <strong className="text-slate-900 font-bold">{topRecommendation.estimatedMinutes} min</strong></span>
          </div>

          {topRecommendation.reasons && topRecommendation.reasons.length > 0 && (
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Why: {topRecommendation.reasons[0]}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(topRecommendation.actionUrl)}
            className="font-bold text-xs py-3 px-6 shadow-xs flex items-center justify-center gap-2"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(`/chapters/${encodeURIComponent(topRecommendation.chapter)}`)}
            className="text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50"
          >
            Open Chapter Hub
          </Button>
        </div>
      </div>

      {/* 3. TODAY'S PLAN (task5.md Section 74) */}
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
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {nextPendingTask && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggleDailyTask(nextPendingTask.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                  nextPendingTask.status === 'completed'
                    ? 'bg-brand-600 border-brand-600 text-white'
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
              className="text-xs font-bold py-1.5 px-3 self-end sm:self-auto"
            >
              Continue Plan
            </Button>
          </div>
        )}
      </div>

      {/* 4. WEAKNESS (task5.md Section 74) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Diagnosed Weakness
          </h2>
          <span className="text-[11px] text-slate-400">Derived from mistake log</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-slate-900">
              {topWeakness.subject} — {topWeakness.chapter}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Requires focused question retest and concept review.
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/weakness')}
            className="text-xs font-bold border-slate-300 text-slate-800 hover:bg-slate-50 shrink-0 self-start sm:self-auto"
          >
            Fix My Weakness
          </Button>
        </div>
      </div>

      {/* 5. IN-PROGRESS ACTIVE PRACTICE (Clean banner if active session) */}
      {activePractice && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              In-Progress Practice
            </span>
            <div className="text-xs font-bold text-slate-900 mt-0.5">
              {activePractice.subject} — {activePractice.chapter} (Q {activePractice.currentQuestionIndex + 1}/{activePractice.totalQuestions})
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(`/practice?chapter=${encodeURIComponent(activePractice.chapter)}`)}
            className="text-xs font-bold py-1.5 px-3 self-end sm:self-auto"
          >
            Resume Practice
          </Button>
        </div>
      )}

      {/* 6. RECENT ACTIVITY (task5.md Section 74) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recent Activity
          </h2>
          <Link
            to="/performance"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <span>Performance</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentAttempts.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">
            No completed tests yet. Practice questions or attempt a mock test to build your history.
          </p>
        ) : (
          <div className="space-y-2.5">
            {recentAttempts.map((att) => (
              <div
                key={att.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{att.testTitle}</div>
                  <div className="text-[11px] text-slate-500">
                    Score: {att.totalScore}/{att.maxScore} pts • Accuracy: {att.accuracyPercentage}% • {new Date(att.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/tests/${att.testId}/result`)}
                  className="text-[11px] font-semibold py-1 px-2.5"
                >
                  Review
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
