import React from 'react';
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { useNavigate } from 'react-router-dom';

export const WeeklyReportPage: React.FC = () => {
  const navigate = useNavigate();
  const report = ecosystemService.getWeeklyReport();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Study Progress Summary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Weekly Performance Audit</h1>
          <p className="text-sm text-slate-500 mt-1">
            Week of {report.weekStartDate} • Comprehensive review of study hours, problem volume, and pacing trends.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/performance')}>
          <ArrowLeft className="w-4 h-4" /> Full Performance
        </Button>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-purple-700 text-xs font-bold mb-1">
            <BookOpen className="w-3.5 h-3.5" /> Questions Solved
          </div>
          <div className="text-3xl font-black text-slate-900">{report.totalQuestions}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">+18% vs last week</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-blue-700 text-xs font-bold mb-1">
            <Clock className="w-3.5 h-3.5" /> Study Time
          </div>
          <div className="text-3xl font-black text-slate-900">
            {Math.floor(report.totalStudyTimeMinutes / 60)}h {report.totalStudyTimeMinutes % 60}m
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across 7 days</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Accuracy
          </div>
          <div className="text-3xl font-black text-slate-900">{report.overallAccuracy}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold">+4% improvement</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-700 text-xs font-bold mb-1">
            <Award className="w-3.5 h-3.5" /> Tests Attempted
          </div>
          <div className="text-3xl font-black text-slate-900">{report.totalTests}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Full mocks & chapters</div>
        </Card>
      </div>

      {/* Subject Strengths & Bottlenecks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5 border-emerald-200 bg-emerald-50/30 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-950">Strongest Subject: {report.strongestSubject}</h3>
              <p className="text-xs text-emerald-700">Highest accuracy and lowest error rate this week</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consistently solved physical and organic chemistry questions within target time limits with over 84% accuracy.
          </p>
        </Card>

        <Card className="p-5 border-rose-200 bg-rose-50/30 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
              ⚠️
            </div>
            <div>
              <h3 className="font-bold text-sm text-rose-950">Primary Bottleneck: {report.weakestSubject}</h3>
              <p className="text-xs text-rose-700">Accounted for 56% of total errors logged</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mechanics and rotational dynamics questions resulted in negative marking traps due to <strong>{report.topMistakeReason}</strong>.
          </p>
        </Card>
      </div>

      {/* Action Plan for Next Week */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Zap className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-base text-slate-900">Recommended Action Plan For Next Week</h3>
        </div>

        <div className="space-y-2.5">
          {report.nextWeekRecommendations.map((rec, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-3 text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-800 font-medium pt-0.5">{rec}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="primary" onClick={() => navigate('/practice')}>
            Start Targeted Practice
          </Button>
        </div>
      </Card>
    </div>
  );
};
