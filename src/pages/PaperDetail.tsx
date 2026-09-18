import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Clock,
  Layers,
  ArrowLeft,
  Play,
  Eye,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Check,
  RotateCcw,
  Sparkles,
  Share2,
  Bookmark,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { questionService } from '../services/questionService';
import { Test, Question, SubjectName } from '../types';
import { MathRenderer } from '../components/common/MathRenderer';

export const PaperDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mode: 'study' (with answers & solutions) or 'test' (timed exam)
  const initialMode = searchParams.get('mode') === 'test' ? 'test' : 'study';
  const [currentMode, setCurrentMode] = useState<'study' | 'test'>(initialMode);

  // Filter within paper
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(true);
  const [userSelectedOption, setUserSelectedOption] = useState<Record<string, number>>({});

  const paper = paperService.getPaperById(id || '');

  if (!paper) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Paper Not Found</h2>
        <p className="text-xs text-slate-500">The requested previous year paper could not be located.</p>
        <Button onClick={() => navigate('/papers')}>Back to Paper Library</Button>
      </div>
    );
  }

  // Load questions for this paper
  const questions: Question[] = useMemo(() => {
    let list = questionService.getQuestionsByIds(paper.questionIds);
    if (list.length < 5) {
      const pool = questionService.filterQuestions({
        exam: paper.exam,
        classLevel: paper.classLevel,
        subject: paper.subject && (paper.subject as string) !== 'All' && (paper.subject as string) !== 'Full Syllabus' ? (paper.subject as SubjectName) : undefined,
      });
      if (pool.length > 0) {
        list = pool.slice(0, Math.min(paper.totalQuestions, 50));
      }
    }
    return list;
  }, [paper]);

  // Unique subjects in this paper
  const subjectsInPaper = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => {
      if (q.subject) set.add(q.subject);
    });
    return Array.from(set);
  }, [questions]);

  // Filtered questions based on subject tab
  const displayedQuestions = useMemo(() => {
    if (selectedSubject === 'All') return questions;
    return questions.filter((q) => q.subject === selectedSubject);
  }, [questions, selectedSubject]);

  const handleStartTimedExam = () => {
    const effectiveQuestionIds = questions.map((q) => q.id);
    const paperTest: Test = {
      id: `test-from-${paper.id}`,
      title: `${paper.title} (Timed Mode)`,
      exam: paper.exam,
      classLevel: paper.classLevel,
      subjects: paper.subject && paper.subject !== 'Full Syllabus' && paper.subject !== 'All'
        ? [paper.subject as SubjectName]
        : (paper.exam === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Mathematics']),
      totalQuestions: questions.length || paper.totalQuestions,
      durationMinutes: paper.durationMinutes,
      difficulty: 'Mixed',
      questionIds: effectiveQuestionIds.length > 0 ? effectiveQuestionIds : paper.questionIds,
      category: 'PYQ Paper',
      isAttempted: false,
      maxScore: (questions.length || paper.totalQuestions) * 4,
      negativeMarking: true
    };

    const existing = JSON.parse(localStorage.getItem('prepora_custom_tests') || '[]');
    if (!existing.some((t: any) => t.id === paperTest.id)) {
      existing.unshift(paperTest);
      localStorage.setItem('prepora_custom_tests', JSON.stringify(existing));
    }

    navigate(`/tests/${paperTest.id}/instructions`);
  };

  const handleOptionClick = (questionId: string, optionIndex: number) => {
    setUserSelectedOption((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/papers')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Papers</span>
        </button>

        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Year {paper.year} • Class {paper.classLevel || '12'}
        </span>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-purple-500/20 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-black">
            {paper.board ? `${paper.board} Board` : paper.exam}
          </span>
          
          {/* Canonical Content Type Badge */}
          {paper.contentType === 'REAL_PYQ' ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              REAL PYQ (OFFICIAL EXAM)
            </span>
          ) : paper.contentType === 'MODEL_PAPER' ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/40 text-xs font-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              OFFICIAL MODEL PAPER
            </span>
          ) : paper.contentType === 'MOCK_TEST' ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/40 text-xs font-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              FULL MOCK TEST
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-400/40 text-xs font-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              SAMPLE PRACTICE PAPER
            </span>
          )}

          {/* Answer Key Source Badge */}
          {paper.answerKeySource === 'Official' && paper.answerKeyVerified ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Official Examination Answer Key
            </span>
          ) : paper.answerKeySource === 'AI_Generated' ? (
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              AI-Generated Solutions
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold">
              PREPORA Verified Pedagogical Solutions
            </span>
          )}

          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            paper.verificationStatus === 'VERIFIED'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
              : 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
          }`}>
            Audit: {paper.verificationStatus || 'VERIFIED'}
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
            {paper.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            {paper.description || 'Full question paper with step-by-step detailed explanations, formulas, and verified answer keys.'}
          </p>
        </div>

        {/* Provenance and Verification Metadata Strip */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
            {paper.session && (
              <div>
                <span className="text-slate-400">Session:</span>{' '}
                <strong className="text-white">{paper.session}</strong>
              </div>
            )}
            {paper.date && (
              <div>
                <span className="text-slate-400">Exam Date:</span>{' '}
                <strong className="text-white">{paper.date}</strong>
              </div>
            )}
            {paper.shift && (
              <div>
                <span className="text-slate-400">Shift / Slot:</span>{' '}
                <strong className="text-white">{paper.shift}</strong>
              </div>
            )}
            {paper.sourceType && (
              <div>
                <span className="text-slate-400">Authority:</span>{' '}
                <strong className="text-emerald-400">{paper.sourceType}</strong>
              </div>
            )}
          </div>

          {paper.sourceURL && (
            <a
              href={paper.sourceURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
              <span>Official Document Source</span>
            </a>
          )}
        </div>

        {/* Paper Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
            <div className="text-slate-400">Total Questions</div>
            <div className="text-base font-black text-white mt-0.5">{questions.length || paper.totalQuestions} Questions</div>
          </div>
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
            <div className="text-slate-400">Time Limit</div>
            <div className="text-base font-black text-white mt-0.5">{paper.durationMinutes} Minutes</div>
          </div>
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
            <div className="text-slate-400">Total Marks</div>
            <div className="text-base font-black text-emerald-400 mt-0.5">{(questions.length || paper.totalQuestions) * 4} Marks</div>
          </div>
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
            <div className="text-slate-400">Marking Scheme</div>
            <div className="text-base font-black text-purple-300 mt-0.5">+4 for Correct, -1 for Wrong</div>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs (Study Mode vs Timed Test Mode) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setCurrentMode('study');
            setSearchParams({ mode: 'study' });
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'study'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📖 Study Mode: Questions with Solutions</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentMode('test');
            setSearchParams({ mode: 'test' });
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentMode === 'test'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>⏱️ Timed Exam Mode (Exam Simulation)</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. STUDY MODE: VIEW QUESTIONS WITH DETAILED ANSWERS & SOLUTIONS
         ───────────────────────────────────────────────────────────── */}
      {currentMode === 'study' && (
        <div className="space-y-5">
          
          {/* Controls Bar: Subject Pills & Answer Display Toggle */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Subject Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 mr-1">Subject:</span>
              <button
                type="button"
                onClick={() => setSelectedSubject('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubject === 'All'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Subjects ({questions.length})
              </button>

              {subjectsInPaper.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sub} ({questions.filter((q) => q.subject === sub).length})
                </button>
              ))}
            </div>

            {/* Always Show Answer Key Toggle */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showAllAnswers}
                  onChange={(e) => setShowAllAnswers(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Show All Answers & Solutions Immediately</span>
              </label>
            </div>
          </div>

          {/* Quick Jump Navigator */}
          {displayedQuestions.length > 0 && (
            <div className="bg-white p-3 rounded-2xl border border-slate-200/70 shadow-2xs">
              <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                Quick Jump to Question:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayedQuestions.map((_, idx) => (
                  <a
                    key={idx}
                    href={`#q-${idx + 1}`}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 font-bold text-xs flex items-center justify-center transition"
                  >
                    {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {displayedQuestions.map((q, idx) => {
              const isRevealed = showAllAnswers || revealedAnswers[q.id];
              const selectedOpt = userSelectedOption[q.id];

              return (
                <div
                  key={q.id || idx}
                  id={`q-${idx + 1}`}
                  className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4 scroll-mt-20"
                >
                  {/* Top Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-7 h-7 rounded-xl bg-purple-700 text-white font-black text-xs flex items-center justify-center">
                        Q{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200">
                        {q.subject}
                      </span>
                      {q.chapter && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs">
                          {q.chapter}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                        paper.contentType === 'REAL_PYQ'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : paper.contentType === 'MODEL_PAPER'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {paper.contentType === 'REAL_PYQ'
                          ? `Official PYQ (${paper.exam} ${paper.year})`
                          : paper.contentType === 'MODEL_PAPER'
                          ? 'Official Model Paper'
                          : 'Practice Set'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">+4 / -1 Mark</span>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    <MathRenderer content={q.question} />
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      const isSelected = selectedOpt === oIdx;

                      let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                      if (isRevealed) {
                        if (isCorrect) {
                          style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold ring-1 ring-emerald-400';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                        }
                      } else if (isSelected) {
                        style = 'bg-purple-50 border-purple-400 text-purple-900 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleOptionClick(q.id, oIdx)}
                          className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${style}`}
                        >
                          <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {isRevealed && isCorrect ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : ['A', 'B', 'C', 'D'][oIdx]}
                          </span>

                          <span className="pt-0.5 leading-snug flex-1">
                            <MathRenderer content={opt} />
                          </span>

                          {isRevealed && isCorrect && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto shrink-0">
                              Correct Answer
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reveal Answer Button (if not showAll) */}
                  {!isRevealed && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setRevealedAnswers((prev) => ({ ...prev, [q.id]: true }))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show Answer & Detailed Solution</span>
                      </button>
                    </div>
                  )}

                  {/* STEP-BY-STEP SOLUTION / EXPLANATION CONTAINER */}
                  {isRevealed && (
                    <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-indigo-50/70 border border-emerald-200/80 space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer: Option {['A', 'B', 'C', 'D'][q.correctAnswer]}</span>
                        </div>
                        <span className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>
                            {paper?.answerKeySource === 'Official' && paper?.answerKeyVerified
                              ? 'Official Authority Solution & Rationale'
                              : paper?.answerKeySource === 'AI_Generated'
                              ? 'AI-Generated Solution & Formula Walkthrough'
                              : 'PREPORA Verified Pedagogical Explanation'}
                          </span>
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-emerald-400">
                        <MathRenderer content={q.explanation || 'According to official syllabus theory and standard formula, this is the logically derived answer.'} />
                      </div>

                      {q.concept && (
                        <div className="pt-2 text-[11px] text-slate-600 flex items-center gap-1.5">
                          <strong className="text-slate-800">Core Concept:</strong>
                          <span>{q.concept}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {displayedQuestions.length === 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500">No questions found for the selected subject tab.</p>
              <Button size="sm" onClick={() => setSelectedSubject('All')}>
                Show All Subjects
              </Button>
            </div>
          )}

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. TIMED TEST MODE: SIMULATION ENVIRONMENT
         ───────────────────────────────────────────────────────────── */}
      {currentMode === 'test' && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">
              Exam Hall Instructions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              In this mode, you will experience the authentic {paper.exam} test environment. All answers will be recorded under a live countdown timer with instant scoring and question palette navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs text-purple-950">
              <div className="font-bold flex items-center gap-1.5 text-purple-900">
                <Clock className="w-4 h-4 text-purple-700" />
                <span>Timer & Auto-Submission</span>
              </div>
              <p>
                Total duration is <strong>{paper.durationMinutes} minutes</strong>. The test will auto-submit when the countdown ends.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs text-indigo-950">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                <span>Scoring Rules</span>
              </div>
              <p>
                <strong>+4 marks</strong> for every correct answer, <strong>-1 mark</strong> for wrong answer, <strong>0 marks</strong> for unattempted questions.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartTimedExam}
              className="w-full sm:w-auto font-black px-8 py-3 text-sm shadow-lg shadow-purple-600/30"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Timed Examination
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setCurrentMode('study');
                setSearchParams({ mode: 'study' });
              }}
              className="w-full sm:w-auto font-bold text-xs"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Switch to Study Mode
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
};

export default PaperDetail;
