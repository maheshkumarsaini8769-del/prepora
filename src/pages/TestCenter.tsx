import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';
import { Test, ExamType } from '../types';

export const TestCenter: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<ExamType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allTests = testService.getAllTests();

  const filteredTests = allTests.filter(t => {
    if (selectedExam !== 'All' && t.exam !== selectedExam) return false;
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    return true;
  });

  const categories = ['All', 'Full Mock', 'Subject Test', 'Chapter Test', 'Custom Test'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header with Custom Test Builder CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Simulated Exam Hall</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Test Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real NTA-pattern exam simulations with timed countdowns, palettes, and deep performance analysis.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/build-test')}
          className="font-bold sm:self-start shadow-md shadow-brand-500/20"
        >
          <Wrench className="w-4 h-4" /> Build My Test
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-2 border-b border-slate-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Exam:</span>
          {(['All', 'JEE', 'NEET', 'Board'] as (ExamType | 'All')[]).map((e) => (
            <button
              key={e}
              onClick={() => setSelectedExam(e)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedExam === e
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Test Cards Grid */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
          <CheckSquare className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700">No Tests Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the exam or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => (
            <Card key={test.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant={test.exam === 'JEE' ? 'brand' : test.exam === 'NEET' ? 'success' : 'info'}>
                    {test.exam}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">{test.category}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{test.title}</h3>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {test.subjects.map(s => (
                    <span key={s} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-xs font-bold text-slate-800">{test.totalQuestions}</div>
                    <div className="text-[10px] text-slate-400">Questions</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-xs font-bold text-slate-800">{test.durationMinutes}m</div>
                    <div className="text-[10px] text-slate-400">Duration</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <div className="text-xs font-bold text-slate-800">{test.maxScore}</div>
                    <div className="text-[10px] text-slate-400">Max Score</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {test.isAttempted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Score: {test.lastAttemptScore ?? '—'} / {test.maxScore}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">Not Attempted</span>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/tests/${test.id}/instructions`)}
                  className="font-bold text-xs"
                >
                  {test.isAttempted ? 'Retake Test' : 'Start Test'} <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
