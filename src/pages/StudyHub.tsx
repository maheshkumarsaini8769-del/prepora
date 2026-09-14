import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Bookmark,
  FileText,
  Zap,
  Repeat,
  GraduationCap,
  Search,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Layers,
  FileEdit,
  Play
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { formulaService } from '../services/formulaService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { SubjectName, ExamType } from '../types';

export const StudyHub: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const [activeSubject, setActiveSubject] = useState<SubjectName>('Physics');
  const [selectedChapter, setSelectedChapter] = useState<string>('Kinematics');
  const [activeTab, setActiveTab] = useState<'notes' | 'formulas' | 'flashcards' | 'pyqs' | 'tests'>('notes');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subjects: SubjectName[] = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const chapters = questionService.getChapters(activeSubject, user.classLevel as any);
  const effectiveChapter = chapters.includes(selectedChapter) ? selectedChapter : (chapters[0] || 'Kinematics');

  const formulas = formulaService.getFormulasByChapter(effectiveChapter);
  const flashcards = formulaService.getAllFormulas().filter(f => f.chapterTitle === effectiveChapter || f.subject === activeSubject).slice(0, 8);
  const questions = questionService.filterQuestions({ subject: activeSubject, chapter: effectiveChapter });
  const pyqs = questions.filter(q => q.source === 'PYQ' || q.source === 'Original Demo').slice(0, 6);
  const notes = userService.getNotes().filter(n => !n.subject || n.subject === activeSubject);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-slide-up">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Unified Chapter & Resource Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Study Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Complete high-yield textbook summaries, formula sheets, Leitner flashcards, and verified PYQs organized by chapter.
          </p>
        </div>

        {/* Quick Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search in Study Hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 w-48 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => {
              setActiveSubject(s);
              const chs = questionService.getChapters(s, user.classLevel as any);
              if (chs.length > 0) setSelectedChapter(chs[0]);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeSubject === s
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Two-Column Workspace (Reference Section 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Chapter Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{activeSubject} Chapters</span>
              <span className="text-[11px] font-bold text-slate-400">{chapters.length} Total</span>
            </div>

            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {chapters.map(ch => {
                const isSelected = ch === effectiveChapter;
                const mastery = ecosystemService.getChapterMastery(ch);
                return (
                  <button
                    key={ch}
                    onClick={() => setSelectedChapter(ch)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-brand-50/80 border-brand-300 text-brand-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200/70 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="truncate">
                      <span className="text-xs block truncate">{ch}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{mastery.overallMastery}% Mastered</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Selected Chapter Content Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {/* Chapter Banner & Quick Actions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">{activeSubject}</Badge>
                  <span className="text-xs font-bold text-slate-400">Class {user.classLevel}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1">{effectiveChapter}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/practice?chapter=${encodeURIComponent(effectiveChapter)}`)}
                  className="font-bold text-xs"
                >
                  <Play className="w-3.5 h-3.5 mr-1 fill-white" />
                  Practice
                </Button>
                <Link
                  to={`/chapters/${encodeURIComponent(effectiveChapter)}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
                >
                  Chapter Detail →
                </Link>
              </div>
            </div>

            {/* Study Tabs: Notes, Formulas, Flashcards, PYQs, Tests */}
            <div className="flex items-center gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
              {[
                { id: 'notes', label: 'Notes', icon: FileEdit },
                { id: 'formulas', label: 'Formulas', icon: Zap },
                { id: 'flashcards', label: 'Flashcards', icon: Repeat },
                { id: 'pyqs', label: 'PYQs', icon: FileText },
                { id: 'tests', label: 'Tests', icon: GraduationCap },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 border-b-2 border-brand-600'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {activeTab === 'notes' && (
              <div className="space-y-3 py-2">
                <p className="text-xs text-slate-500">Core summary, crucial NCERT definitions, and derivation pointers:</p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p className="font-bold text-slate-900">Key Chapter Principles:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Always check coordinate directions and sign conventions before applying equations.</li>
                    <li>For uniform acceleration, verify whether equations of motion apply without variable limits.</li>
                    <li>Dimensional consistency can rule out 2 out of 4 multiple-choice options instantly.</li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/notes')}
                    className="text-xs font-bold"
                  >
                    Open Notes Notebook →
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'formulas' && (
              <div className="space-y-3 py-2">
                {formulas.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No specific formulas listed for this chapter yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formulas.map(f => (
                      <div key={f.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-xs font-bold text-slate-900">{f.name}</span>
                        <div className="p-2 rounded-xl bg-white border border-slate-200 font-mono text-xs font-bold text-brand-700 text-center">
                          {f.formula}
                        </div>
                        {f.importantNote && <p className="text-[10px] text-slate-500">{f.importantNote}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="space-y-3 py-2">
                <p className="text-xs text-slate-500">Leitner spaced repetition cards for {effectiveChapter}:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {flashcards.slice(0, 4).map(card => (
                    <div key={card.id} className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-200/70 space-y-2">
                      <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wide">Concept Front</span>
                      <h4 className="text-xs font-black text-slate-900">{card.name}</h4>
                      <div className="pt-2 border-t border-brand-200/50 text-xs font-mono font-bold text-brand-800">
                        {card.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pyqs' && (
              <div className="space-y-3 py-2">
                <p className="text-xs text-slate-500">Verified Past Year Questions for {effectiveChapter}:</p>
                <div className="space-y-2">
                  {pyqs.map(q => (
                    <div key={q.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                      <div className="truncate">
                        <span className="font-bold text-slate-900 block truncate">{q.question}</span>
                        <span className="text-[10px] text-slate-500">{q.topic} • {q.difficulty}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/practice?chapter=${encodeURIComponent(effectiveChapter)}`)}
                        className="text-xs font-bold shrink-0"
                      >
                        Solve
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-3 py-2">
                <p className="text-xs text-slate-500">Practice tests available for this chapter:</p>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-purple-900">{effectiveChapter} Mastery Test</h4>
                    <p className="text-[11px] text-purple-700 mt-0.5">15 Questions • 30 Mins • +4/-1 Marking</p>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate('/tests')}
                    className="text-xs font-bold"
                  >
                    Take Test
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
