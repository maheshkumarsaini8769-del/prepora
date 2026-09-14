import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Sparkles,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { questionService } from '../services/questionService';
import { TopicWeakness, SubjectName } from '../types';

export const FixMyWeakness: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'red' | 'yellow' | 'green'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');

  const weaknesses = progressService.getTopicWeaknesses();

  const filtered = weaknesses.filter((w) => {
    if (selectedStatus !== 'all' && w.status !== selectedStatus) return false;
    if (selectedSubject !== 'All' && w.subject !== selectedSubject) return false;
    return true;
  });

  const handleFixTopic = (w: TopicWeakness) => {
    // Launch targeted practice immediately with matching topic
    navigate(`/practice?subject=${w.subject}&chapter=${encodeURIComponent(w.chapter)}&topic=${encodeURIComponent(w.topic)}`);
  };

  const redCount = weaknesses.filter(w => w.status === 'red').length;
  const yellowCount = weaknesses.filter(w => w.status === 'yellow').length;
  const greenCount = weaknesses.filter(w => w.status === 'green').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Diagnostic Heatmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Fix My Weakness</h1>
          <p className="text-sm text-slate-500 mt-1">
            Color-coded competency breakdown across all syllabus subtopics. Launch 1-click targeted remediation drills.
          </p>
        </div>
      </div>

      {/* Heatmap Status Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedStatus(selectedStatus === 'red' ? 'all' : 'red')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'red'
              ? 'bg-rose-100/70 border-rose-400 ring-2 ring-rose-400/20'
              : 'bg-rose-50/50 border-rose-200/60 hover:bg-rose-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Critical Weakness</span>
            <span className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-200"></span>
          </div>
          <div className="text-2xl font-black text-rose-950 mt-2">{redCount} Topics</div>
          <div className="text-[11px] text-rose-700 mt-0.5">Accuracy below 60%</div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'yellow' ? 'all' : 'yellow')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'yellow'
              ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-400/20'
              : 'bg-amber-50/50 border-amber-200/60 hover:bg-amber-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Needs Improvement</span>
            <span className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-200"></span>
          </div>
          <div className="text-2xl font-black text-amber-950 mt-2">{yellowCount} Topics</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Accuracy 60% - 79%</div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'green' ? 'all' : 'green')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'green'
              ? 'bg-emerald-100/70 border-emerald-400 ring-2 ring-emerald-400/20'
              : 'bg-emerald-50/50 border-emerald-200/60 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Mastered Topics</span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200"></span>
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-2">{greenCount} Topics</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Accuracy 80% or above</div>
        </button>
      </div>

      {/* Subject Filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Physics', 'Chemistry', 'Mathematics'] as (SubjectName | 'All')[]).map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === sub
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filtered.map((w, idx) => (
          <Card key={idx} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={w.status === 'red' ? 'danger' : w.status === 'yellow' ? 'warning' : 'success'}>
                  {w.status === 'red' ? 'RED • Weak' : w.status === 'yellow' ? 'YELLOW • Medium' : 'GREEN • Strong'}
                </Badge>
                <span className="font-bold text-sm text-slate-800">{w.subject}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-500 font-medium">{w.chapter}</span>
              </div>

              <div className="text-xs font-semibold text-slate-400">
                Last checked: {w.lastPracticedDate}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{w.topic}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Accuracy: <strong className="text-slate-900">{w.accuracy}%</strong></span>
                  <span>•</span>
                  <span>{w.wrongCount} Errors in {w.totalAttempts} Attempts</span>
                </div>
              </div>

              <Button
                variant={w.status === 'red' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleFixTopic(w)}
                className="font-bold text-xs self-start sm:self-auto"
              >
                <Target className="w-3.5 h-3.5" /> FIX THIS TOPIC
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
