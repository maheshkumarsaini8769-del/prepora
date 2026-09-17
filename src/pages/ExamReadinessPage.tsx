import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Target,
  BarChart2,
  Sparkles,
  Info
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { testService } from '../services/testService';
import { ExamType, SubjectName } from '../types';

export const ExamReadinessPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const [selectedExam, setSelectedExam] = useState<ExamType>(user.targetExam || 'JEE');

  const readiness = ecosystemService.getExamReadiness(selectedExam);
  const attempts = testService.getAllAttempts();

  const dimensions = [
    { label: 'Concept Mastery', value: readiness.concepts, color: 'bg-purple-600', description: 'Grasp of fundamental textbook definitions and principles' },
    { label: 'Overall Accuracy', value: readiness.accuracy, color: 'bg-emerald-500', description: 'Percentage of correct answers across recent mock drills' },
    { label: 'Speed & Time Index', value: readiness.speed, color: 'bg-amber-500', description: 'Average solving pace compared to standard exam benchmarks' },
    { label: 'Attempt Consistency', value: readiness.consistency, color: 'bg-indigo-600', description: 'Variance in scores across sequential test papers' },
    { label: 'Hard Questions Conquered', value: readiness.hardQuestions, color: 'bg-rose-500', description: 'Success rate on multi-step and advanced level questions' },
  ];

  const subjectBreakdown = [
    { subject: 'Physics', score: Math.round(readiness.score * 0.92), status: 'Needs Focus', weakTopic: 'Rotational Motion' },
    { subject: 'Chemistry', score: Math.min(95, Math.round(readiness.score * 1.08)), status: 'Strong', weakTopic: 'Ionic Equilibrium' },
    { subject: user.targetExam === 'NEET' ? 'Biology' : 'Mathematics', score: Math.round(readiness.score * 0.98), status: 'Stable', weakTopic: user.targetExam === 'NEET' ? 'Genetics' : 'Integral Calculus' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Comprehensive Exam Preparedness Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {selectedExam} Readiness Score
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Multi-factor evaluation combining accuracy, problem-solving speed, mistake frequency, and hard question handling.
          </p>
        </div>

        {/* Big Overall Score Gauge */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[220px] shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider block">
            PREPORA READINESS
          </span>
          <div className="text-5xl font-black text-white">
            {readiness.score} <span className="text-xl text-purple-300 font-semibold">/ 100</span>
          </div>
          <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            readiness.score >= 80 ? 'bg-emerald-400/20 text-emerald-300' :
            readiness.score >= 60 ? 'bg-amber-400/20 text-amber-300' : 'bg-rose-400/20 text-rose-300'
          }`}>
            {readiness.score >= 80 ? '🟢 Advanced Stage' : readiness.score >= 60 ? '🟡 Intermediate Stage' : '🔴 Early Foundation'}
          </span>
        </div>
      </div>

      {/* Mandatory Disclaimer (task4.md Section 16 & 32 - No Official Claims) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-900 block text-xs mb-0.5">
            Diagnostic & Pedagogical Estimate (Not an Official Rank or Score):
          </strong>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            The PREPORA Readiness Score is an internal algorithmic benchmark calibrated to guide your study priorities. It does not constitute an official NTA/CBSE percentile guarantee.
          </p>
        </div>
      </div>

      {/* Exam Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700">Target Examination Calibration:</span>
        <div className="flex items-center gap-2">
          {(['JEE', 'NEET', 'CBSE'] as ExamType[]).map(e => (
            <button
              key={e}
              type="button"
              onClick={() => setSelectedExam(e)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedExam === e
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* BIGGEST IMPROVEMENT AREA CARD (task4.md Section 16) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/10 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
              ⚡ Biggest Improvement Opportunity
            </span>
            <h3 className="text-lg font-black text-slate-900">
              {readiness.biggestImprovementArea} (Score: {readiness.speed}/100)
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed max-w-xl">
              {readiness.recommendedAction}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/speed-practice')}
          className="shrink-0 font-black text-xs py-3 px-5 bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20"
        >
          <span>Start Speed Practice</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* 5-Dimensional Telemetry Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Dimensional Readiness Assessment
            </h3>
            <p className="text-xs text-slate-500">
              Rule-based decomposition across 5 essential performance vectors
            </p>
          </div>
          <Badge variant="brand" size="sm">5 Vectors</Badge>
        </div>

        <div className="space-y-5">
          {dimensions.map((dim, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">{dim.label}</span>
                  <span className="text-slate-400 ml-2 hidden sm:inline text-[11px] font-normal">
                    ({dim.description})
                  </span>
                </div>
                <span className="font-mono font-black text-sm text-slate-900">{dim.value} / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${dim.color}`}
                  style={{ width: `${dim.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-Wise Preparedness Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {subjectBreakdown.map((sub, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{sub.subject}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sub.status === 'Strong' ? 'bg-emerald-100 text-emerald-800' :
                  sub.status === 'Stable' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {sub.status}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{sub.score}%</div>
              <p className="text-[11px] text-slate-500">
                Weak bottleneck: <strong>{sub.weakTopic}</strong>
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/practice?subject=${sub.subject}`)}
              className="w-full text-xs font-bold py-1.5"
            >
              <span>Practice {sub.subject}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
