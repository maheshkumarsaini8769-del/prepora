import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  Layers,
  ArrowLeft,
  Play,
  Eye,
  KeyRound,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { questionService } from '../services/questionService';
import { testService } from '../services/testService';
import { Test } from '../types';

export const PaperDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'key'>('overview');

  const paper = paperService.getPaperById(id || '');

  if (!paper) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <h2 className="text-xl font-bold text-slate-800">Paper Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">The requested paper does not exist.</p>
        <Button onClick={() => navigate('/papers')}>Back to Paper Library</Button>
      </div>
    );
  }

  let questions = questionService.getQuestionsByIds(paper.questionIds);
  if (questions.length < 5) {
    const pool = questionService.filterQuestions({
      exam: paper.exam,
      classLevel: paper.classLevel,
      subject: paper.subject && (paper.subject as string) !== 'All' ? paper.subject : undefined,
    });
    if (pool.length > 0) {
      questions = pool.slice(0, paper.totalQuestions);
    }
  }

  const handleStartAsTest = () => {
    const effectiveQuestionIds = questions.map(q => q.id);
    // Generate or fetch a Test object corresponding to this paper
    const paperTest: Test = {
      id: `test-from-${paper.id}`,
      title: `${paper.title} (Timed Mode)`,
      exam: paper.exam,
      classLevel: paper.classLevel,
      subjects: paper.subject ? [paper.subject] : ['Physics', 'Chemistry', 'Mathematics'],
      totalQuestions: questions.length || paper.totalQuestions,
      durationMinutes: paper.durationMinutes,
      difficulty: 'Mixed',
      questionIds: effectiveQuestionIds.length > 0 ? effectiveQuestionIds : paper.questionIds,
      category: 'PYQ Paper',
      isAttempted: false,
      maxScore: (questions.length || paper.totalQuestions) * 4,
      negativeMarking: true
    };

    // Save into custom tests
    const existing = JSON.parse(localStorage.getItem('prepora_custom_tests') || '[]');
    if (!existing.some((t: any) => t.id === paperTest.id)) {
      existing.unshift(paperTest);
      localStorage.setItem('prepora_custom_tests', JSON.stringify(existing));
    }

    navigate(`/tests/${paperTest.id}/instructions`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <Button variant="ghost" size="sm" onClick={() => navigate('/papers')}>
        <ArrowLeft className="w-4 h-4" /> Back to Paper Library
      </Button>

      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-none p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="brand">{paper.exam} {paper.board ? `(${paper.board})` : ''}</Badge>
          <Badge variant="warning">{paper.paperType}</Badge>
          <Badge variant="info">Year {paper.year}</Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{paper.title}</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">{paper.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10 text-slate-200">
          <div>
            <div className="text-xs text-slate-400">Total Questions</div>
            <div className="text-lg font-bold text-white">{paper.totalQuestions} Questions</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Standard Duration</div>
            <div className="text-lg font-bold text-white">{paper.durationMinutes} Minutes</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Pattern</div>
            <div className="text-lg font-bold text-emerald-400">Single Choice MCQ</div>
          </div>
        </div>
      </Card>

      {/* Navigation Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'overview', label: 'Overview & Actions', icon: BookOpen },
          { key: 'questions', label: 'View Questions', icon: Eye },
          { key: 'key', label: 'Answer Key', icon: KeyRound },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Overview & Quick Actions */}
      {activeTab === 'overview' && (
        <Card className="space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-2">How would you like to attempt this paper?</h3>
            <p className="text-xs text-slate-500">
              You can simulate the real exam environment under timed conditions or inspect questions directly at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-brand-200 bg-brand-50/40 space-y-3">
              <div className="font-bold text-base text-brand-900 flex items-center gap-2">
                <Play className="w-5 h-5 text-brand-600 fill-brand-600" /> Start in Real Test Mode
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take this paper with an active countdown timer, palette navigation, and instant post-exam analytics.
              </p>
              <Button variant="primary" onClick={handleStartAsTest} className="w-full font-bold">
                Launch Timed Exam
              </Button>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-slate-600" /> Self-Paced Question Review
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse through all questions, solutions, and core concepts without time pressure.
              </p>
              <Button variant="outline" onClick={() => setActiveTab('questions')} className="w-full font-bold">
                Read Questions
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tab: Questions List */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <Card key={q.id} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Question {idx + 1}</span>
                  <Badge variant="brand" size="sm">{q.subject}</Badge>
                  <Badge variant="slate" size="sm">{q.chapter}</Badge>
                </div>
                <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'} size="sm">
                  {q.difficulty}
                </Badge>
              </div>

              <div className="text-sm font-semibold text-slate-800 leading-relaxed">
                {q.question}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {['A', 'B', 'C', 'D'][oIdx]}
                    </span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Answer Key */}
      {activeTab === 'key' && (
        <Card className="space-y-4">
          <h3 className="font-bold text-base text-slate-900">Official Demo Answer Key</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div className="text-xs text-slate-400 font-medium">Q{idx + 1}</div>
                <div className="text-lg font-black text-brand-700 mt-0.5">
                  Option {['A', 'B', 'C', 'D'][q.correctAnswer]}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
