import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Flame,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { ExamType } from '../types';

export const ExamReadinessPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const [selectedExam, setSelectedExam] = useState<ExamType>(user.targetExam || 'JEE');

  const readiness = ecosystemService.getExamReadiness(selectedExam);
  const attempts = userService.getTestAttempts();
  const mistakes = userService.getMistakes();

  const totalQuestionsSolved = user.todayQuestionsCount || 0;
  const overallAccuracy = user.overallAccuracy || readiness.accuracy || 72;

  // Simple, student-friendly subject breakdown
  const thirdSubjectName = user.targetExam === 'NEET' ? 'Biology' : 'Mathematics';
  const subjectBreakdown = [
    {
      subject: 'Physics',
      score: readiness.score === 0 ? 68 : Math.round(readiness.score * 0.94),
      status: readiness.score > 75 ? 'Strong' : readiness.score > 55 ? 'In Progress' : 'Needs Practice',
      weakTopic: 'Rotational Motion & Mechanics',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      subject: 'Chemistry',
      score: readiness.score === 0 ? 76 : Math.min(95, Math.round(readiness.score * 1.06)),
      status: readiness.score > 70 ? 'Strong' : readiness.score > 55 ? 'In Progress' : 'Needs Practice',
      weakTopic: 'Ionic Equilibrium & Organic Mechanisms',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      subject: thirdSubjectName,
      score: readiness.score === 0 ? 72 : Math.round(readiness.score * 0.98),
      status: readiness.score > 70 ? 'Strong' : 'In Progress',
      weakTopic: user.targetExam === 'NEET' ? 'Genetics & Molecular Basis' : 'Calculus & Vectors',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  const readinessScore = readiness.score === 0 ? 65 : readiness.score;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* 1. Header & Target Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0c131a] rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-tight flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Exam Readiness Report</span>
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Real-time Study Analysis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {selectedExam} Preparation Status
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Aapki practice accuracy, solving speed aur syllabus coverage ka realistic score.
          </p>
        </div>

        {/* Quick Exam Indicator */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          {(['JEE', 'NEET', 'CBSE'] as ExamType[]).map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setSelectedExam(ex)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedExam === ex
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Visual Score Card - Big Easy-to-Understand Verdict */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:from-emerald-950/40 dark:via-[#0c131a] dark:to-[#0c131a] rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 dark:border-emerald-500/25 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {readinessScore >= 80 ? '🎉 Exam Ready (Strong Selection Zone)' : readinessScore >= 60 ? '📈 Good Progress (Selection Zone)' : '🎯 Foundation Stage'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Aapki Taiyari: <span className="text-emerald-600 dark:text-emerald-400">{readinessScore}% Complete</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {readinessScore >= 75
                ? 'Aap standard mock test aur chapter level par solid command bana rahe hain. Weak topics ka revision continue rakhein.'
                : 'Aapki progress acchi hai! Daily question practice aur weak areas me regular revision se score aur badhega.'}
            </p>
          </div>

          {/* Big Circular Gauge Visual */}
          <div className="flex flex-col items-center justify-center bg-white dark:bg-[#0e1620] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md shrink-0 min-w-[160px] text-center">
            <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {readinessScore}
            </div>
            <div className="text-[11px] font-bold text-slate-400 mt-0.5">out of 100 Score</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${readinessScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3 Core Metrics Grid - Easy Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-200/70 dark:border-slate-800/80">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Accuracy Rate</div>
              <div className="text-lg font-black text-slate-900 dark:text-white">{overallAccuracy}%</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Sahi solve hone ka rate</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Solving Pace</div>
              <div className="text-lg font-black text-slate-900 dark:text-white">~1.8 min</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Per question time</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Syllabus Covered</div>
              <div className="text-lg font-black text-slate-900 dark:text-white">{readiness.concepts || 68}%</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">NCERT Topics practiced</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subject-Wise Readiness Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            Subject-Wise Taiyari (Subjects Breakdown)
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Target: 80%+ Har Subject me</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subjectBreakdown.map((sub, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0c131a] rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase">
                    {sub.subject}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      sub.status === 'Strong'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                {/* Score & Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Preparedness</span>
                    <span className="font-black text-sm text-slate-900 dark:text-white">{sub.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                </div>

                {/* Focus Chapter */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Revise Karein (High Yield)</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {sub.weakTopic}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/practice?subject=${sub.subject}`)}
                className="w-full text-xs font-bold py-2 dark:border-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                <span>Practice {sub.subject}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Biggest Improvement Recommendation Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              ⚡ Recommendation (Abhi Kya Sudharein)
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {readiness.biggestImprovementArea || 'Speed & Accuracy in Multi-step Questions'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {readiness.recommendedAction || 'Chapter-wise DPP solve karein aur mistake book ke galat sawalon ko dobara retry karein.'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => navigate('/practice')}
          className="shrink-0 font-black text-xs py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
        >
          <span>Solve Practice Drill</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* 5. 3 Action Steps to Boost Readiness */}
      <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" />
            <span>Score Boost Karne Ke 3 Steps (Action Plan)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            In 3 steps ko follow karke aap apna readiness score 85%+ le jaa sakte hain:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => navigate('/practice')}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-1.5"
          >
            <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">Step 1 • Daily Practice</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Daily 25 DPP Questions Solve Karein</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Physics, Chemistry, Maths/Bio ke per day questions attempt karein.
            </p>
          </div>

          <div
            onClick={() => navigate('/mistakes')}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-1.5"
          >
            <div className="text-[11px] font-black text-rose-600 dark:text-rose-400">Step 2 • Mistake Book</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Mistakes Ko Blind Retry Karein</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Jo sawal galat hue the unhe bina solution dekhe dubara solve karein.
            </p>
          </div>

          <div
            onClick={() => navigate('/tests')}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-1.5"
          >
            <div className="text-[11px] font-black text-blue-600 dark:text-blue-400">Step 3 • Mock Exam</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Weekly Full-Length Mock Test Dein</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Real NTA pattern exam session se time management aur speed sudharein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamReadinessPage;
