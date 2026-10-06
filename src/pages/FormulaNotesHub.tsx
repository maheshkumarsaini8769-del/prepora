import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Play,
  Layers,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flame,
  Award,
  BookMarked,
  Eye,
  EyeOff,
  Tv,
  Calendar,
  X,
  ListTree,
  Columns,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { questionService } from '../services/questionService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { SubjectName, ClassLevel, Question } from '../types';
import { continueLearningService } from '../services/continueLearningService';
import {
  comprehensiveFormulaNotes,
  TopicRevisionItem,
  TopicFormula
} from '../data/comprehensiveFormulaNotes';

// --- Interactive Topic Card Sub-component ---
interface TopicCardProps {
  item: TopicRevisionItem;
  isExpanded: boolean;
  onToggle: () => void;
  bookmarkedFormulaIds: Set<string>;
  onToggleBookmark: (formulaId: string) => void;
  onCopyFormula: (f: TopicFormula) => void;
  copiedFormulaName: string | null;
  targetExam: string;
  navigate: ReturnType<typeof useNavigate>;
  onAddToPlanner: (chapter: string, topic?: string) => void;
}

const TopicItemCard: React.FC<TopicCardProps> = ({
  item,
  isExpanded,
  onToggle,
  bookmarkedFormulaIds,
  onToggleBookmark,
  onCopyFormula,
  copiedFormulaName,
  targetExam,
  navigate,
  onAddToPlanner
}) => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Fetch topic practice questions synchronously only when expanded
  const topicQuestions: Question[] = useMemo(() => {
    if (!isExpanded) return [];
    const examFilter = targetExam === 'NEET' ? 'NEET' : targetExam === 'JEE' ? 'JEE' : undefined;
    let qs = questionService.filterQuestions({
      subject: item.subject,
      chapter: item.chapter,
      topic: item.topic,
      exam: examFilter,
      includePYQs: true
    });
    if (qs.length === 0) {
      qs = questionService.filterQuestions({
        subject: item.subject,
        chapter: item.chapter,
        includePYQs: true
      });
    }
    return qs;
  }, [isExpanded, item.subject, item.chapter, item.topic, targetExam]);

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleStartPractice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (topicQuestions.length === 0) return;
    const qIds = topicQuestions.slice(0, 20).map((q) => q.id);
    navigate(
      `/practice/session?chapter=${encodeURIComponent(item.chapter)}&topic=${encodeURIComponent(
        item.topic
      )}&subject=${encodeURIComponent(item.subject)}&ids=${encodeURIComponent(qIds.join(','))}`
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c141d] shadow-xs overflow-hidden transition-all duration-200">
      {/* Topic Card Clickable Header */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left p-4 sm:p-4.5 flex items-start sm:items-center justify-between gap-3 transition-colors cursor-pointer ${
          isExpanded
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40'
            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
              {item.topic}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
              {item.formulas.length} Formulas
            </span>
            {item.weightage === 'High' && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                High Yield
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            {item.concept}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-0.5 sm:pt-0">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
            {isExpanded ? 'Hide Formulas' : 'View Formulas'}
          </span>
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              isExpanded
                ? 'bg-emerald-600 text-white rotate-180'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Expanded Topic Details (Formulas, Short Notes, Questions) */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-200">
          {/* Concept Short Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
                <span>Topic Summary & Key Notes</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToPlanner(item.chapter, item.topic);
                }}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>+ Add to Planner</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {item.shortNotes.map((note, nIdx) => (
                <div
                  key={nIdx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2 leading-relaxed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>

            {/* Exam Insights & Mnemonics */}
            {item.keyPoints && item.keyPoints.length > 0 && (
              <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 text-xs text-teal-900 dark:text-teal-200 space-y-1">
                <div className="font-black text-[10px] uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Exam Insights & Mnemonics
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] font-medium">
                  {item.keyPoints.map((kp, kpIdx) => (
                    <li key={kpIdx}>{kp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Formulas List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>High-Yield Formulas ({item.formulas.length})</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {item.formulas.map((f, fIdx) => {
                const formulaUniqueId = `${item.id}-f-${fIdx}`;
                const isBookmarked = bookmarkedFormulaIds.has(formulaUniqueId);
                const isCopied = copiedFormulaName === f.name;

                return (
                  <div
                    key={fIdx}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2.5 relative"
                  >
                    {/* Formula Name & Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {f.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCopyFormula(f);
                          }}
                          title="Copy LaTeX Equation"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(formulaUniqueId);
                          }}
                          title="Bookmark formula"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* KaTeX Math Box */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#0a1017] border border-emerald-200/50 dark:border-emerald-900/40 text-center overflow-x-auto shadow-2xs">
                      <MathRenderer math={`\\[${f.formula}\\]`} />
                    </div>

                    {/* Variables */}
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      <strong className="text-slate-800 dark:text-slate-200">Variables: </strong>
                      <span>{f.variables}</span>
                    </div>

                    {/* Pro Tip */}
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                      <strong>Pro-Tip: </strong>
                      <span>{f.examTip}</span>
                    </div>

                    {/* Common Trap Warning */}
                    {f.trap && (
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Common Trap: </strong>
                          {f.trap}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topic Practice Questions Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                  Topic Practice Questions ({topicQuestions.length})
                </span>
                <p className="text-[11px] text-slate-400">
                  Solve real exam questions to lock in these formulas permanently.
                </p>
              </div>

              {topicQuestions.length > 0 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleStartPractice}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <Play className="w-3 h-3 fill-current mr-1" />
                  <span>Start Practice Session</span>
                </Button>
              )}
            </div>

            {/* Questions Preview (First 2 questions) */}
            {topicQuestions.length > 0 && (
              <div className="space-y-2.5 pt-1">
                {topicQuestions.slice(0, 2).map((q, qIdx) => {
                  const isRevealed = !!revealedSolutions[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl bg-white dark:bg-[#0c141d] border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Q{qIdx + 1} • {q.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-400">{q.source || 'PYQ'}</span>
                      </div>

                      <div className="font-medium text-slate-900 dark:text-white leading-relaxed">
                        <MathRenderer math={q.question} />
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = isRevealed && optIdx === q.correctAnswer;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded-lg border text-[11px] flex items-center gap-1.5 ${
                                isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-300'
                                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[9px] shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="truncate">
                                <MathRenderer math={opt} />
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Toggle Solution */}
                      <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSolution(q.id);
                          }}
                          className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          <span>{isRevealed ? 'Hide Solution' : 'Show Answer & Explanation'}</span>
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-[11px] text-emerald-950 dark:text-emerald-200 space-y-1">
                          <div className="font-black text-emerald-800 dark:text-emerald-300">
                            Correct: Option {String.fromCharCode(65 + q.correctAnswer)}
                          </div>
                          <div>
                            <MathRenderer
                              math={q.explanation || 'Formula based direct application question.'}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Formula & Short Notes Hub Component ---
export const FormulaNotesHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();

  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const initialSubject =
    (searchParams.get('subject') as SubjectName) ||
    (allowedSubjects.includes('Physics') ? 'Physics' : allowedSubjects[0]);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'accordion' | 'studio'>('accordion');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  // Bookmarks in localStorage
  const [bookmarkedFormulaIds, setBookmarkedFormulaIds] = useState<Set<string>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_bookmarked_formulas') || '[]');
      return new Set(stored);
    } catch {
      return new Set();
    }
  });

  const [copiedFormulaName, setCopiedFormulaName] = useState<string | null>(null);
  const [plannerMsg, setPlannerMsg] = useState<string | null>(null);

  // Accordion Expand/Collapse State
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  // Active Chapter & Topic for Split Studio View
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [activeTopicId, setActiveTopicId] = useState<string>('');

  const handleAddToPlanner = (chapterName: string, topicName?: string) => {
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const currentDay = days[new Date().getDay()];

    ecosystemService.addPlannerTask({
      day: currentDay,
      subject: selectedSubject,
      chapter: chapterName,
      taskType: 'Revision',
      durationMinutes: 45,
      completed: false,
      notes: `Formula sheet revision: ${topicName || chapterName}`
    });
    setPlannerMsg(`Added "${topicName || chapterName}" to your Study Planner!`);
    setTimeout(() => setPlannerMsg(null), 3000);
  };

  const toggleBookmarkFormula = useCallback((formulaId: string) => {
    setBookmarkedFormulaIds((prev) => {
      const next = new Set(prev);
      if (next.has(formulaId)) next.delete(formulaId);
      else next.add(formulaId);
      localStorage.setItem('prepora_bookmarked_formulas', JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const handleCopyFormula = useCallback((f: TopicFormula) => {
    navigator.clipboard.writeText(f.formula);
    setCopiedFormulaName(f.name);
    setTimeout(() => setCopiedFormulaName(null), 2000);
  }, []);

  // Filter items matching subject and exam guard
  const subjectItems = useMemo(() => {
    return comprehensiveFormulaNotes.filter((item) => {
      if (item.subject !== selectedSubject) return false;
      if (!isSubjectAllowedForExam(item.subject, user.targetExam)) return false;
      if (selectedClass !== 'All' && item.classLevel !== selectedClass) return false;
      return true;
    });
  }, [selectedSubject, selectedClass, user.targetExam]);

  // Filtered by Search Query & Bookmarked Filter
  const filteredItems = useMemo(() => {
    let list = subjectItems;

    if (onlyBookmarked) {
      list = list.filter((item) =>
        item.formulas.some((_, idx) => bookmarkedFormulaIds.has(`${item.id}-f-${idx}`))
      );
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter((item) => {
      const matchesChapter = item.chapter.toLowerCase().includes(q);
      const matchesTopic = item.topic.toLowerCase().includes(q);
      const matchesConcept = item.concept.toLowerCase().includes(q);
      const matchesFormula = item.formulas.some(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.variables.toLowerCase().includes(q)
      );
      const matchesNotes = item.shortNotes.some((n) => n.toLowerCase().includes(q));
      return matchesChapter || matchesTopic || matchesConcept || matchesFormula || matchesNotes;
    });
  }, [subjectItems, searchQuery, onlyBookmarked, bookmarkedFormulaIds]);

  // Group into Chapters
  const distinctChapters = useMemo(() => {
    const map = new Map<string, TopicRevisionItem[]>();
    filteredItems.forEach((item) => {
      if (!map.has(item.chapter)) map.set(item.chapter, []);
      map.get(item.chapter)!.push(item);
    });
    return Array.from(map.entries()).map(([chapter, items]) => ({
      chapter,
      items,
      classLevel: items[0]?.classLevel || '11',
      weightage: items[0]?.weightage || 'Medium',
      formulaCount: items.reduce((sum, it) => sum + it.formulas.length, 0)
    }));
  }, [filteredItems]);

  // Initialize expanded chapters & topics with deep URL query & chapter linking
  useEffect(() => {
    // 1. Sync Subject from query param if changed
    const paramSub = searchParams.get('subject');
    if (paramSub) {
      const matchSub = allowedSubjects.find(s => s.toLowerCase() === paramSub.toLowerCase());
      if (matchSub && matchSub !== selectedSubject) {
        setSelectedSubject(matchSub);
      }
    }

    // 2. Sync Search Query from query param if provided
    const paramQ = searchParams.get('q');
    if (paramQ && paramQ !== searchQuery) {
      setSearchQuery(paramQ);
    }
  }, [searchParams, allowedSubjects]);

  useEffect(() => {
    if (distinctChapters.length > 0) {
      const targetChapterParam = searchParams.get('chapter');
      
      if (targetChapterParam) {
        const cleanTarget = targetChapterParam.toLowerCase().trim();
        const matchedChapterObj = distinctChapters.find(
          c => c.chapter.toLowerCase() === cleanTarget ||
               c.chapter.toLowerCase().includes(cleanTarget) ||
               cleanTarget.includes(c.chapter.toLowerCase())
        );

        if (matchedChapterObj) {
          const matchedChName = matchedChapterObj.chapter;
          setExpandedChapters(new Set([matchedChName]));
          const matchedTopicIds = new Set(matchedChapterObj.items.map(it => it.id));
          setExpandedTopics(matchedTopicIds);
          setActiveChapter(matchedChName);
          return;
        }
      }

      if (searchQuery.trim()) {
        // Auto-expand all matching chapters and topics when searching
        const allMatchingChs = new Set(distinctChapters.map((c) => c.chapter));
        const allMatchingTopics = new Set(filteredItems.map((i) => i.id));
        setExpandedChapters(allMatchingChs);
        setExpandedTopics(allMatchingTopics);
      } else {
        // By default open the first chapter and first topic
        const firstCh = distinctChapters[0].chapter;
        setExpandedChapters(new Set([firstCh]));
        const firstTopic = distinctChapters[0].items[0]?.id;
        if (firstTopic) {
          setExpandedTopics(new Set([firstTopic]));
        }
      }

      // Sync active for split studio view
      if (!activeChapter || !distinctChapters.some((c) => c.chapter === activeChapter)) {
        setActiveChapter(distinctChapters[0].chapter);
      }
    } else {
      setExpandedChapters(new Set());
      setExpandedTopics(new Set());
      setActiveChapter('');
    }
  }, [distinctChapters.length, selectedSubject, selectedClass, searchQuery, searchParams]);

  // Studio Mode: Current Chapter Topics
  const currentChapterTopics = useMemo(() => {
    return filteredItems.filter((it) => it.chapter === activeChapter);
  }, [filteredItems, activeChapter]);

  useEffect(() => {
    if (currentChapterTopics.length > 0) {
      const currentTopicExists = currentChapterTopics.some((t) => t.id === activeTopicId);
      if (!currentTopicExists) {
        setActiveTopicId(currentChapterTopics[0].id);
      }
    } else {
      setActiveTopicId('');
    }
  }, [currentChapterTopics, activeTopicId]);

  const activeTopicItem = useMemo(() => {
    return currentChapterTopics.find((t) => t.id === activeTopicId) || currentChapterTopics[0] || null;
  }, [currentChapterTopics, activeTopicId]);

  // Toggle Chapter Accordion
  const toggleChapter = (chapterName: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterName)) {
        next.delete(chapterName);
      } else {
        next.add(chapterName);
        continueLearningService.recordActivity({
          type: 'formula',
          title: `${selectedSubject} • ${chapterName}`,
          subtitle: 'Formula & Short Notes Sheet',
          subject: selectedSubject,
          chapter: chapterName,
          url: `/formula-notes?subject=${encodeURIComponent(selectedSubject)}&chapter=${encodeURIComponent(chapterName)}`,
          progressPercent: 60
        });
        // Automatically expand the first topic of this chapter for immediate gratification!
        const ch = distinctChapters.find((c) => c.chapter === chapterName);
        if (ch && ch.items.length > 0) {
          setExpandedTopics((prevTopics) => {
            const nextTopics = new Set(prevTopics);
            nextTopics.add(ch.items[0].id);
            return nextTopics;
          });
        }
      }
      return next;
    });
  };

  // Toggle Topic Accordion
  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  // Expand / Collapse All
  const handleExpandAll = () => {
    const allChs = new Set(distinctChapters.map((c) => c.chapter));
    const allTops = new Set(filteredItems.map((i) => i.id));
    setExpandedChapters(allChs);
    setExpandedTopics(allTops);
  };

  const handleCollapseAll = () => {
    setExpandedChapters(new Set());
    setExpandedTopics(new Set());
  };

  // Total Formula count for current view
  const totalFormulasInView = useMemo(() => {
    return distinctChapters.reduce((sum, ch) => sum + ch.formulaCount, 0);
  }, [distinctChapters]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {plannerMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{plannerMsg}</span>
        </div>
      )}

      {/* Top Hero Banner - Emerald Soft Glow Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-6 sm:p-8 shadow-xl shadow-emerald-950/20 border border-emerald-700/40">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-56 h-56 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Topic-by-Topic Drill-Down Revision</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Target: {user.targetExam} 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Topic-Wise Formula & Short Notes Hub
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
            Har chapter ke genuine topics, high-yield mathematical formulas, variables, pro-tips aur direct topic practice questions. Chapter par click karein topic khulega, aur topic par click karte hi uske saare formulas samne honge!
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>{distinctChapters.length} Chapters</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-300" />
              <span>{filteredItems.length} Topics</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>{totalFormulasInView} Formulas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Subject Tabs, Class Level, Search, View Mode */}
      <div className="bg-white dark:bg-[#0e1620] p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        {/* Row 1: Subject Tabs & Class Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Subject Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
            {allowedSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSelectedSubject(sub);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Class Filter & View Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
              {(['All', '11', '12'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="hidden md:flex gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
              <button
                type="button"
                onClick={() => setViewMode('accordion')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'accordion'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
                title="Accordion Drill-Down View (Chapter -> Topics -> Formulas)"
              >
                <ListTree className="w-3.5 h-3.5" />
                <span>Drill-Down View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('studio')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'studio'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
                title="Split Studio View (Side-by-side)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Studio View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search Bar & Quick Toggles */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${selectedSubject} formulas, topics, concepts (e.g. Bernoulli, Projectile, Nernst, Integration)...`}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmarked Filter */}
            <button
              type="button"
              onClick={() => setOnlyBookmarked((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                onlyBookmarked
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
              <span>Bookmarks ({bookmarkedFormulaIds.size})</span>
            </button>

            {/* Expand / Collapse All (For Accordion View) */}
            {viewMode === 'accordion' && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleExpandAll}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  title="Expand All Chapters & Topics"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCollapseAll}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  title="Collapse All Chapters & Topics"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODE 1: ACCORDION DRILL-DOWN VIEW (Default: Chapter -> Topic -> Formulas) --- */}
      {viewMode === 'accordion' && (
        <div className="space-y-4">
          {distinctChapters.length === 0 ? (
            <div className="bg-white dark:bg-[#0e1620] p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                Koi formula ya chapter match nahi hua
              </h3>
              <p className="text-xs text-slate-400">
                Search term badlein ya filter reset karein.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setOnlyBookmarked(false);
                  setSelectedClass('All');
                }}
                className="mt-2 text-xs"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            distinctChapters.map((chGroup) => {
              const isChapterOpen = expandedChapters.has(chGroup.chapter);

              return (
                <div
                  key={chGroup.chapter}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isChapterOpen
                      ? 'bg-white dark:bg-[#0e1620] border-emerald-500/80 shadow-md shadow-emerald-950/5'
                      : 'bg-white dark:bg-[#0e1620] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  {/* Chapter Header Card */}
                  <div
                    onClick={() => toggleChapter(chGroup.chapter)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Class {chGroup.classLevel}
                        </span>
                        {chGroup.weightage === 'High' && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                            High Yield
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-400">
                          {selectedSubject}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                        {chGroup.chapter}
                      </h2>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {chGroup.items.length} Topics
                        </span>
                        <span>•</span>
                        <span className="font-semibold">
                          {chGroup.formulaCount} Mathematical Formulas
                        </span>
                      </div>
                    </div>

                    {/* Chapter Action Buttons & Accordion Trigger */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      {/* Watch YouTube Lecture */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/lectures?subject=${encodeURIComponent(
                              selectedSubject
                            )}&chapter=${encodeURIComponent(chGroup.chapter)}`
                          );
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Watch full YouTube lecture for this chapter"
                      >
                        <Tv className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="hidden sm:inline">Watch Lecture</span>
                      </button>

                      {/* Add to Planner */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToPlanner(chGroup.chapter);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Add chapter revision to study planner"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="hidden sm:inline">+ Planner</span>
                      </button>

                      {/* Open/Close Accordion Button */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isChapterOpen
                            ? 'bg-emerald-600 text-white rotate-180 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Inside Chapter: List of Topics */}
                  {isChapterOpen && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between pt-1 pb-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {chGroup.items.length} Chapter Topics (Click topic to see formulas):
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          Tap any topic below
                        </span>
                      </div>

                      {chGroup.items.map((item) => (
                        <TopicItemCard
                          key={item.id}
                          item={item}
                          isExpanded={expandedTopics.has(item.id)}
                          onToggle={() => toggleTopic(item.id)}
                          bookmarkedFormulaIds={bookmarkedFormulaIds}
                          onToggleBookmark={toggleBookmarkFormula}
                          onCopyFormula={handleCopyFormula}
                          copiedFormulaName={copiedFormulaName}
                          targetExam={user.targetExam}
                          navigate={navigate}
                          onAddToPlanner={handleAddToPlanner}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* --- MODE 2: SPLIT STUDIO VIEW (Side-by-side 2-column layout) --- */}
      {viewMode === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Chapters List (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                {selectedSubject} Chapters ({distinctChapters.length})
              </span>
            </div>

            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {distinctChapters.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-white dark:bg-[#0e1620] rounded-2xl border border-slate-200 dark:border-slate-800">
                  Koi chapter match nahi hua. Search clear karein.
                </div>
              ) : (
                distinctChapters.map((ch) => {
                  const isActive = ch.chapter === activeChapter;
                  return (
                    <button
                      key={ch.chapter}
                      type="button"
                      onClick={() => setActiveChapter(ch.chapter)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-sm'
                          : 'bg-white dark:bg-[#0e1620] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            Class {ch.classLevel}
                          </span>
                          {ch.weightage === 'High' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              High Yield
                            </span>
                          )}
                        </div>
                        <div className="font-extrabold text-xs sm:text-sm mt-1 truncate">
                          {ch.chapter}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {ch.items.length} Topics • {ch.formulaCount} Formulas
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-emerald-600 dark:text-emerald-400 translate-x-1'
                            : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Chapter & Topics Studio (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeTopicItem ? (
              <div className="space-y-4">
                {/* Chapter Header Card with Topic Navigation Pills */}
                <div className="bg-white dark:bg-[#0e1620] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                    <div>
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <span>{activeTopicItem.subject}</span>
                        <span>•</span>
                        <span>Class {activeTopicItem.classLevel}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">
                        {activeTopicItem.chapter}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/lectures?subject=${encodeURIComponent(
                              activeTopicItem.subject
                            )}&chapter=${encodeURIComponent(activeTopicItem.chapter)}`
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Watch best YouTube lecture for this chapter"
                      >
                        <Tv className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Watch Lecture</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToPlanner(activeTopicItem.chapter, activeTopicItem.topic)
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Add to study planner"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>+ Add to Planner</span>
                      </button>
                    </div>
                  </div>

                  {/* Topic Selector Pills */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Select Topic:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentChapterTopics.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTopicId(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            item.id === activeTopicId
                              ? 'bg-emerald-600 text-white shadow-xs font-black'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {item.topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Render TopicCard always expanded in studio mode */}
                <TopicItemCard
                  key={activeTopicItem.id}
                  item={activeTopicItem}
                  isExpanded={true}
                  onToggle={() => {}}
                  bookmarkedFormulaIds={bookmarkedFormulaIds}
                  onToggleBookmark={toggleBookmarkFormula}
                  onCopyFormula={handleCopyFormula}
                  copiedFormulaName={copiedFormulaName}
                  targetExam={user.targetExam}
                  navigate={navigate}
                  onAddToPlanner={handleAddToPlanner}
                />
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0e1620] p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                Left panel se koi chapter select karein.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaNotesHub;
