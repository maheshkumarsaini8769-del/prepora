import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  CheckCircle2,
  Trash2,
  BookOpen,
  ArrowRight,
  Tag,
  Edit3,
  AlertTriangle,
  MessageSquareQuote,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  Check,
  Undo2,
  Filter
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { questionService } from '../services/questionService';
import { testService } from '../services/testService';
import { MistakeItem, Question, SubjectName, MistakeReason } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';

const MISTAKE_REASONS: MistakeReason[] = [
  'Calculation Error',
  'Formula Forgot',
  'Concept Not Clear',
  'Misread Question',
  'Wrong Option Selected',
  'Ran Out of Time',
  'Guess',
  'Careless Mistake',
  'Other'
];

export const MistakeBook: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [reasonFilter, setReasonFilter] = useState<'all' | MistakeReason>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeSolutionQ, setActiveSolutionQ] = useState<Question | null>(null);

  // Active Retry Modal State
  const [retryItem, setRetryItem] = useState<{ mistake: MistakeItem; question: Question } | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<number | null>(null);
  const [retryChecked, setRetryChecked] = useState<boolean>(false);

  const [activeDoubtQ, setActiveDoubtQ] = useState<Question | null>(null);

  // Edit Mistake Tag Modal State
  const [editingMistake, setEditingMistake] = useState<MistakeItem | null>(null);
  const [editReason, setEditReason] = useState<MistakeReason>('Calculation Error');
  const [editNote, setEditNote] = useState<string>('');

  const [mistakesList, setMistakesList] = useState<MistakeItem[]>(() => userService.getMistakes());
  const [, setQuestionCacheTick] = useState<number>(0);

  // Asynchronously hydrate any missing question details so cards are never blank or missing
  useEffect(() => {
    const missingIds = mistakesList
      .map((m) => m.questionId)
      .filter((id) => !questionService.getQuestionById(id));

    if (missingIds.length > 0) {
      questionService.getQuestionsByIdsAsync(missingIds)
        .then(() => setQuestionCacheTick((t) => t + 1))
        .catch(() => {});
    }
  }, [mistakesList]);

  // Construct a safe, complete Question object even if the master cache has not loaded it yet
  const getResolvedQuestion = (m: MistakeItem): Question => {
    const cached = questionService.getQuestionById(m.questionId);
    if (cached) return cached;

    return {
      id: m.questionId,
      exam: m.exam || user.targetExam || 'JEE',
      class: (user.classLevel === 'Dropper' ? '12' : user.classLevel || '12') as any,
      subject: m.subject,
      chapter: m.chapter,
      topic: m.topic,
      difficulty: 'Medium',
      question: m.questionText || m.questionSnippet || `Question on ${m.topic} (${m.chapter})`,
      options: m.options && m.options.length > 0
        ? m.options
        : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: typeof m.correctAnswer === 'number' ? m.correctAnswer : 0,
      explanation: m.explanation || `Core concept: ${m.topic || m.chapter}. Review formula applications and definitions to solidify this topic.`,
      concept: m.concept || m.topic,
      source: 'Practice'
    };
  };

  // Exam-filtered list of mistakes
  const examMistakes = useMemo(() => {
    return mistakesList.filter((m) => isSubjectAllowedForExam(m.subject, user.targetExam));
  }, [mistakesList, user.targetExam]);

  // Stats calculation
  const totalCount = examMistakes.length;
  const unresolvedCount = examMistakes.filter((m) => !m.resolved).length;
  const resolvedCount = examMistakes.filter((m) => m.resolved).length;

  // Filtered mistakes according to subject, status, reason, and search query
  const filteredMistakes = useMemo(() => {
    return examMistakes.filter((m) => {
      if (selectedSubject !== 'All' && m.subject !== selectedSubject) return false;

      if (statusFilter === 'unresolved' && m.resolved) return false;
      if (statusFilter === 'resolved' && !m.resolved) return false;

      if (reasonFilter !== 'all') {
        const reason = m.mistakeReason || 'Calculation Error';
        if (reason !== reasonFilter) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const textToMatch = [
          m.subject,
          m.chapter,
          m.topic,
          m.mistakeNote || '',
          m.questionText || '',
          m.questionSnippet || ''
        ].join(' ').toLowerCase();

        if (!textToMatch.includes(query)) return false;
      }

      return true;
    });
  }, [examMistakes, selectedSubject, statusFilter, reasonFilter, searchQuery]);

  // Calculate repeated topic mistakes (failed >= 2 times)
  const criticalRepeatedTopics = useMemo(() => {
    const topicMistakeCounts: Record<string, { count: number; chapter: string; subject: SubjectName }> = {};
    examMistakes.forEach((m) => {
      if (!topicMistakeCounts[m.topic]) {
        topicMistakeCounts[m.topic] = { count: 0, chapter: m.chapter, subject: m.subject };
      }
      topicMistakeCounts[m.topic].count += m.mistakeCount || 1;
    });
    return Object.entries(topicMistakeCounts).filter(([_, data]) => data.count >= 2);
  }, [examMistakes]);

  const handleRemove = (id: string) => {
    userService.removeMistake(id);
    setMistakesList(userService.getMistakes());
  };

  const handleToggleResolve = (m: MistakeItem) => {
    if (m.resolved) {
      // Reopen mistake
      const updated = userService.getMistakes().map((item) => {
        if (item.id === m.id) return { ...item, resolved: false };
        return item;
      });
      localStorage.setItem('prepora_mistakes', JSON.stringify(updated));
      setMistakesList(updated);
    } else {
      userService.resolveMistake(m.id);
      setMistakesList(userService.getMistakes());
    }
  };

  const handleOpenEditTag = (m: MistakeItem) => {
    setEditingMistake(m);
    setEditReason(m.mistakeReason || 'Calculation Error');
    setEditNote(m.mistakeNote || '');
  };

  const handleSaveTag = () => {
    if (!editingMistake) return;
    testService.updateMistakeTag(editingMistake.questionId, editReason, editNote);
    setMistakesList(userService.getMistakes());
    setEditingMistake(null);
  };

  const handleStartRetry = (m: MistakeItem) => {
    const q = getResolvedQuestion(m);
    setRetryItem({ mistake: m, question: q });
    setRetryAnswer(null);
    setRetryChecked(false);
  };

  const handleCheckRetry = () => {
    if (retryAnswer === null || !retryItem) return;
    setRetryChecked(true);

    if (retryAnswer === retryItem.question.correctAnswer) {
      userService.resolveMistake(retryItem.mistake.id);
      setMistakesList(userService.getMistakes());
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 pb-20">
      {/* 1. Header with direct link to Fix My Weakness */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Mistake Book
            </h1>
            <Badge variant="warning" size="sm">
              Smart Analysis
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your incorrect answers, tag error causes, re-attempt until solved, and master weak spots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/weakness')}
            className="text-xs font-semibold py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-600/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fix My Weakness</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Summary Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white dark:bg-[#0c131a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            <span>Total Mistakes</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {totalCount}
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#0c131a] rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/20 shadow-sm">
          <div className="text-xs text-rose-700 dark:text-rose-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>Unresolved</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-rose-700 dark:text-rose-400 mt-1">
            {unresolvedCount}
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#0c131a] rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 shadow-sm">
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resolved</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
            {resolvedCount}
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#0c131a] rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/20 shadow-sm">
          <div className="text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Repeated Traps</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
            {criticalRepeatedTopics.length}
          </div>
        </div>
      </div>

      {/* 3. Repeated Mistakes & Weak Concepts Warning Banner */}
      {criticalRepeatedTopics.length > 0 && (
        <Card className="p-5 border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Repeated Concept Mistakes ({criticalRepeatedTopics.length} Critical Topics)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            These concepts caused multiple errors across tests. Targeted concept revision or practice is highly recommended:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {criticalRepeatedTopics.map(([topic, data]) => (
              <div
                key={topic}
                className="p-3 bg-white dark:bg-[#0c131a] rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{topic}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {data.subject} • {data.count} incorrect attempts
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() =>
                    navigate(
                      `/practice?chapter=${encodeURIComponent(data.chapter)}&topic=${encodeURIComponent(topic)}`
                    )
                  }
                  className="text-[11px] font-semibold py-1 px-2.5 bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                >
                  Fix
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 4. Controls: Subject Filter, Status Tabs, Reason Dropdown, and Search Input */}
      <div className="space-y-3">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0c131a] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          {/* Status Tabs */}
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800/80 p-0.5 text-xs font-medium">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All ({examMistakes.length})
            </button>
            <button
              onClick={() => setStatusFilter('unresolved')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'unresolved'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Unresolved ({unresolvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                statusFilter === 'resolved'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Reason Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value as any)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                <option value="all">All Reasons</option>
                {MISTAKE_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or question..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0c131a] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {totalCount === 0
              ? 'No Recorded Mistakes'
              : 'No Mistakes Matching Filters'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {totalCount === 0
              ? 'Great job! Any questions you get wrong in mock tests or practice sessions will appear here automatically.'
              : 'Try clearing the search query or changing the filter options to view other items.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => {
            const q = getResolvedQuestion(m);

            return (
              <Card key={m.id} className="p-5 space-y-3 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white">{m.subject}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{m.chapter}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400">{m.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditTag(m)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      title="Edit Mistake Reason"
                    >
                      <Tag className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                      <span>{m.mistakeReason || 'Calculation Error'}</span>
                      <Edit3 className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
                    </button>

                    {m.mistakeCount > 1 && (
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/50">
                        Failed {m.mistakeCount}x
                      </span>
                    )}

                    {m.resolved ? (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Resolved
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900/50">
                        Needs Retry
                      </span>
                    )}
                  </div>
                </div>

                {/* Question body rendered with MathRenderer */}
                <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                  <MathRenderer content={q.question} />
                </div>

                {/* Personal mistake note */}
                {m.mistakeNote && (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">Note: </span>
                    {m.mistakeNote}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Last Attempted: {m.lastAttemptedDate}
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Mark as Resolved / Mark as Unresolved quick action */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleResolve(m)}
                      className={`text-xs font-medium py-1 px-2.5 ${
                        m.resolved
                          ? 'text-amber-600 hover:text-amber-700 dark:text-amber-400'
                          : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400'
                      }`}
                      title={m.resolved ? 'Mark back as Unresolved' : 'Mark directly as Resolved'}
                    >
                      {m.resolved ? (
                        <>
                          <Undo2 className="w-3.5 h-3.5 mr-1" /> Re-open
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Resolved
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSolutionQ(q)}
                      className="text-xs font-medium py-1 px-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-1" /> Solution
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveDoubtQ(q)}
                      className="text-xs font-medium py-1 px-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 mr-1" /> Ask Doubt
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartRetry(m)}
                      className="text-xs font-semibold py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm shadow-emerald-600/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Retry
                    </Button>

                    <button
                      onClick={() => handleRemove(m.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="Remove from mistake book"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Solution Viewer Modal with KaTeX Math Rendering */}
      <Modal
        isOpen={Boolean(activeSolutionQ)}
        onClose={() => setActiveSolutionQ(null)}
        title="Question Solution"
        footer={<Button onClick={() => setActiveSolutionQ(null)}>Close</Button>}
      >
        {activeSolutionQ && (
          <div className="space-y-4 py-2 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900 dark:text-white leading-relaxed">
              <MathRenderer content={activeSolutionQ.question} />
            </div>

            <div className="space-y-2">
              {activeSolutionQ.options.map((opt, i) => {
                const isCorrect = activeSolutionQ.correctAnswer === i;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex-1 pr-2">
                      <span className="font-bold mr-1.5">{['A', 'B', 'C', 'D'][i]}.</span>
                      <MathRenderer content={opt} />
                    </span>
                    {isCorrect && (
                      <Badge variant="success" size="sm">
                        Correct
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-100">Explanation:</div>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <MathRenderer content={activeSolutionQ.explanation} />
              </div>
              {activeSolutionQ.concept && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 dark:text-white">Concept: </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    <MathRenderer content={activeSolutionQ.concept} />
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Blind Retry Modal with KaTeX Math Rendering */}
      <Modal
        isOpen={Boolean(retryItem)}
        onClose={() => setRetryItem(null)}
        title="Retry Question"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setRetryItem(null)}>
              Cancel
            </Button>
            {!retryChecked ? (
              <Button
                variant="primary"
                onClick={handleCheckRetry}
                disabled={retryAnswer === null}
                className="font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 cursor-pointer"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setRetryItem(null)}
                className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 cursor-pointer"
              >
                Done
              </Button>
            )}
          </div>
        }
      >
        {retryItem && (
          <div className="space-y-4 py-2">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {retryItem.mistake.subject} • {retryItem.mistake.chapter}
            </div>

            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              <MathRenderer content={retryItem.question.question} />
            </div>

            <div className="space-y-2">
              {retryItem.question.options.map((opt, idx) => {
                const isSelected = retryAnswer === idx;
                const isCorrectOpt = retryItem.question.correctAnswer === idx;

                let style =
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50';
                if (retryChecked) {
                  if (isCorrectOpt) {
                    style =
                      'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    style =
                      'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200 font-bold';
                  }
                } else if (isSelected) {
                  style = 'bg-brand-600 text-white border-brand-600 shadow-sm';
                }

                return (
                  <button
                    key={idx}
                    disabled={retryChecked}
                    onClick={() => setRetryAnswer(idx)}
                    className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${style}`}
                  >
                    <span className="flex-1 pr-2">
                      <span className="font-semibold mr-1.5">{['A', 'B', 'C', 'D'][idx]}.</span>
                      <MathRenderer content={opt} />
                    </span>
                    {retryChecked && isCorrectOpt && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {retryChecked && (
              <div className="space-y-3 pt-2">
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    retryAnswer === retryItem.question.correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {retryAnswer === retryItem.question.correctAnswer
                    ? '🎉 Correct! Marked as resolved.'
                    : '❌ Incorrect. Review the explanation below.'}
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Explanation:</div>
                  <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <MathRenderer content={retryItem.question.explanation} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Mistake Tag Modal with Dark Mode Fixes */}
      <Modal
        isOpen={Boolean(editingMistake)}
        onClose={() => setEditingMistake(null)}
        title="Edit Error Reason"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingMistake(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveTag}
              className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 cursor-pointer"
            >
              Save Tag
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Failure Reason
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MISTAKE_REASONS.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setEditReason(reason)}
                  className={`p-2 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer ${
                    editReason === reason
                      ? 'border-brand-600 bg-brand-600 text-white shadow-sm font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
              Personal Note <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              placeholder="e.g. Confused sign convention for focal length or missed negative root in quadratic equation"
              className="w-full h-20 p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Universal Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={Boolean(activeDoubtQ)}
        onClose={() => setActiveDoubtQ(null)}
        initialSubject={activeDoubtQ?.subject}
        questionContext={activeDoubtQ}
      />
    </div>
  );
};
