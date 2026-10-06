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
  ExternalLink,
  Download,
  Printer,
  FileText,
  Plus,
  PlusCircle
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

// Helper to merge dynamically fetched or admin-created formulas into master formula list
function mergeServerFormulas(
  base: TopicRevisionItem[],
  serverList: any[]
): TopicRevisionItem[] {
  if (!serverList || serverList.length === 0) return base;

  const result: TopicRevisionItem[] = base.map((item) => ({
    ...item,
    formulas: [...item.formulas]
  }));

  const itemMap = new Map<string, TopicRevisionItem>();
  result.forEach((item) => {
    const key = `${item.subject.toLowerCase()}:::${item.chapter.toLowerCase()}:::${item.topic.toLowerCase()}`;
    itemMap.set(key, item);
  });

  serverList.forEach((sf) => {
    if (!sf.formula || !sf.title || !sf.chapter) return;
    const sub = (sf.subject as SubjectName) || 'Physics';
    const ch = sf.chapter.trim();
    const top = sf.topic ? sf.topic.trim() : 'Core Concepts';
    const key = `${sub.toLowerCase()}:::${ch.toLowerCase()}:::${top.toLowerCase()}`;

    const existingItem = itemMap.get(key);

    const newFormula: TopicFormula = {
      name: sf.title,
      formula: sf.formula,
      variables: sf.variables || '',
      examTip: sf.examTip || sf.explanation || '',
      trap: sf.trap || undefined
    };

    if (existingItem) {
      const alreadyHas = existingItem.formulas.some(
        (f) =>
          f.name.toLowerCase() === newFormula.name.toLowerCase() ||
          f.formula.trim() === newFormula.formula.trim()
      );
      if (!alreadyHas) {
        existingItem.formulas.push(newFormula);
      }
    } else {
      const newItem: TopicRevisionItem = {
        id: `srv-${sf._id || sf.id || Math.random().toString(36).substring(2, 9)}`,
        subject: sub,
        classLevel: (sf.classLevel === '12' ? '12' : '11') as ClassLevel,
        chapter: ch,
        topic: top,
        weightage: (sf.importance as any) || 'Medium',
        examTarget: 'Both',
        concept: sf.explanation || `${ch} - ${top}`,
        shortNotes: sf.examTip ? [sf.examTip] : ['Key formula from curriculum.'],
        formulas: [newFormula],
        keyPoints: [sf.examTip || 'Important for exam revision.']
      };
      result.push(newItem);
      itemMap.set(key, newItem);
    }
  });

  return result;
}

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

  // Dynamic Master Formulas (Merged with Server & Admin-created formulas)
  const [allNotes, setAllNotes] = useState<TopicRevisionItem[]>(() => {
    try {
      const localCustom = JSON.parse(localStorage.getItem('prepora_custom_formulas') || '[]');
      if (localCustom && localCustom.length > 0) {
        return mergeServerFormulas(comprehensiveFormulaNotes, localCustom);
      }
    } catch {}
    return comprehensiveFormulaNotes;
  });

  // Full Chapter Sheet Modal State
  const [fullChapterSheet, setFullChapterSheet] = useState<{
    chapter: string;
    items: TopicRevisionItem[];
  } | null>(null);
  const [sheetTopicFilter, setSheetTopicFilter] = useState<string>('All');

  // Admin Add Formula Modal State
  const [addFormulaModalOpen, setAddFormulaModalOpen] = useState<boolean>(false);
  const [newFormulaForm, setNewFormulaForm] = useState<{
    subject: SubjectName;
    classLevel: ClassLevel;
    chapter: string;
    topic: string;
    title: string;
    formula: string;
    variables: string;
    examTip: string;
    trap: string;
    importance: 'High' | 'Medium' | 'Low';
  }>({
    subject: selectedSubject,
    classLevel: '11',
    chapter: '',
    topic: '',
    title: '',
    formula: '',
    variables: '',
    examTip: '',
    trap: '',
    importance: 'High'
  });
  const [savingFormula, setSavingFormula] = useState<boolean>(false);

  // Sync Server Formulas from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchFormulas = async () => {
      try {
        const res = await fetch('/api/formulas?limit=2000');
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.formulas || [];
        if (isMounted && list.length > 0) {
          setAllNotes((prev) => mergeServerFormulas(comprehensiveFormulaNotes, list));
        }
      } catch (err) {
        console.warn('Failed to load server formulas:', err);
      }
    };
    fetchFormulas();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler: Print / Save as PDF for Full Chapter
  const handlePrintChapter = useCallback((chapterName: string, items: TopicRevisionItem[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print/download the full chapter formula sheet.');
      return;
    }

    const totalFormulas = items.reduce((s, it) => s + it.formulas.length, 0);
    const classVal = items[0]?.classLevel || '11/12';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${chapterName} — Formula Sheet</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"><\/script>
  <style>
    @page { size: A4; margin: 12mm 12mm 14mm 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 16px;
      margin: 0;
      font-size: 13px;
      line-height: 1.45;
    }
    .no-print {
      margin-bottom: 20px;
      padding: 12px 16px;
      background: #f1f5f9;
      border-radius: 10px;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .print-btn {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 8px 20px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
    }
    .close-btn {
      background: #64748b;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
    }
    .header-banner {
      border-bottom: 3px solid #059669;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .chapter-title {
      font-size: 24px;
      margin: 0 0 6px 0;
      color: #0f172a;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .chapter-meta {
      font-size: 13px;
      color: #475569;
      font-weight: 600;
    }
    .brand-title {
      font-size: 13px;
      color: #059669;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: right;
    }
    .topic-block {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    .topic-header {
      font-size: 15px;
      font-weight: 800;
      color: #065f46;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 6px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .formula-card {
      border: 1px solid #cbd5e1;
      border-left: 4px solid #059669;
      border-radius: 8px;
      padding: 12px 14px;
      background: #f8fafc;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .formula-name {
      font-weight: 800;
      font-size: 14px;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .formula-math {
      font-size: 16px;
      padding: 10px 14px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      margin: 8px 0;
      text-align: center;
      overflow-x: auto;
    }
    .var-text {
      font-size: 12px;
      color: #334155;
      margin-top: 6px;
      line-height: 1.4;
    }
    .tip-box {
      font-size: 11.5px;
      color: #065f46;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 6px;
      display: block;
      font-weight: 600;
    }
    .trap-box {
      font-size: 11.5px;
      color: #991b1b;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 6px;
      display: block;
      font-weight: 600;
    }
    .notes-list {
      font-size: 12px;
      color: #334155;
      margin: 8px 0 0 16px;
      padding: 0;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
      .formula-card { break-inside: avoid; page-break-inside: avoid; }
      .topic-block { break-inside: avoid; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="close-btn" onclick="window.close()">✕ Close</button>
    <span style="font-size: 12px; color: #64748b; margin-left: 8px;">Tip: In the print dialog, choose destination "Save as PDF".</span>
  </div>

  <div class="header-banner">
    <div>
      <h1 class="chapter-title">${chapterName}</h1>
      <div class="chapter-meta">${selectedSubject} • Class ${classVal} • Total Formulas: ${totalFormulas}</div>
    </div>
    <div>
      <div class="brand-title">PREPORA HUB</div>
      <div style="font-size: 11px; color: #64748b; text-align: right;">NEET / JEE / CBSE</div>
    </div>
  </div>

  ${items.map(it => `
    <div class="topic-block">
      <div class="topic-header">📌 ${it.topic}</div>
      ${it.concept ? `<div style="font-size: 12px; color: #64748b; margin-bottom: 8px;"><em>Concept: ${it.concept}</em></div>` : ''}
      <div>
        ${it.formulas.map(f => `
          <div class="formula-card">
            <div class="formula-name">${f.name}</div>
            <div class="formula-math">$$${f.formula}$$</div>
            ${f.variables ? `<div class="var-text"><strong>Variables:</strong> ${f.variables}</div>` : ''}
            ${f.examTip ? `<div class="tip-box">💡 <strong>Exam Application:</strong> ${f.examTip}</div>` : ''}
            ${f.trap ? `<div class="trap-box">⚠️ <strong>Common Trap:</strong> ${f.trap}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ${it.shortNotes && it.shortNotes.length > 0 ? `
        <div style="margin-top: 8px;">
          <strong style="font-size: 11.5px; color: #475569;">Key Short Notes:</strong>
          <ul class="notes-list">
            ${it.shortNotes.map(sn => `<li>${sn}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('')}

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false
        });
      }
      setTimeout(function() {
        window.print();
      }, 500);
    });
  <\/script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }, [selectedSubject]);

  // Handler: Download Markdown Sheet
  const handleDownloadMarkdown = useCallback((chapterName: string, items: TopicRevisionItem[]) => {
    const totalFormulas = items.reduce((s, it) => s + it.formulas.length, 0);
    const classVal = items[0]?.classLevel || '11/12';

    let md = `# ${chapterName} — Complete Formula & Revision Sheet\n\n`;
    md += `**Subject:** ${selectedSubject}  \n`;
    md += `**Class:** Class ${classVal}  \n`;
    md += `**Formulas Count:** ${totalFormulas}  \n`;
    md += `**Topics Count:** ${items.length}  \n`;
    md += `**Generated by:** Prepora (prepora.online)\n\n`;
    md += `---\n\n`;

    items.forEach((it) => {
      md += `## 📌 ${it.topic}\n\n`;
      if (it.concept) {
        md += `*${it.concept}*\n\n`;
      }
      it.formulas.forEach((f) => {
        md += `### ${f.name}\n\n`;
        md += `$$\n${f.formula}\n$$\n\n`;
        if (f.variables) md += `- **Variables:** ${f.variables}\n`;
        if (f.examTip) md += `- **💡 Exam Tip:** ${f.examTip}\n`;
        if (f.trap) md += `- **⚠️ Common Trap:** ${f.trap}\n`;
        md += `\n`;
      });
      if (it.shortNotes && it.shortNotes.length > 0) {
        md += `#### Key Revision Points:\n`;
        it.shortNotes.forEach((sn) => {
          md += `- ${sn}\n`;
        });
        md += `\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${chapterName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Formula_Sheet.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [selectedSubject]);

  // Handler: Save New Formula from Admin Modal
  const handleSaveNewFormula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormulaForm.chapter.trim() || !newFormulaForm.title.trim() || !newFormulaForm.formula.trim()) {
      alert('Please fill Chapter name, Formula Title, and LaTeX Equation.');
      return;
    }
    setSavingFormula(true);
    try {
      await fetch('/api/formulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newFormulaForm.subject,
          classLevel: newFormulaForm.classLevel,
          chapter: newFormulaForm.chapter.trim(),
          topic: newFormulaForm.topic.trim() || 'Core Concepts',
          title: newFormulaForm.title.trim(),
          formula: newFormulaForm.formula.trim(),
          variables: newFormulaForm.variables.trim(),
          examTip: newFormulaForm.examTip.trim(),
          trap: newFormulaForm.trap.trim(),
          importance: newFormulaForm.importance
        })
      });

      const serverItem = {
        id: `custom_${Date.now()}`,
        subject: newFormulaForm.subject,
        classLevel: newFormulaForm.classLevel,
        chapter: newFormulaForm.chapter.trim(),
        topic: newFormulaForm.topic.trim() || 'Core Concepts',
        title: newFormulaForm.title.trim(),
        formula: newFormulaForm.formula.trim(),
        variables: newFormulaForm.variables.trim(),
        examTip: newFormulaForm.examTip.trim(),
        trap: newFormulaForm.trap.trim(),
        importance: newFormulaForm.importance
      };

      setAllNotes((prev) => mergeServerFormulas(prev, [serverItem]));

      try {
        const stored = JSON.parse(localStorage.getItem('prepora_custom_formulas') || '[]');
        stored.push(serverItem);
        localStorage.setItem('prepora_custom_formulas', JSON.stringify(stored));
      } catch {}

      setPlannerMsg(`Formula "${newFormulaForm.title}" successfully added!`);
      setTimeout(() => setPlannerMsg(null), 3500);

      setAddFormulaModalOpen(false);
      setNewFormulaForm({
        subject: selectedSubject,
        classLevel: '11',
        chapter: '',
        topic: '',
        title: '',
        formula: '',
        variables: '',
        examTip: '',
        trap: '',
        importance: 'High'
      });
    } catch (err) {
      console.error('Failed to create formula:', err);
      alert('Formula saved locally.');
    } finally {
      setSavingFormula(false);
    }
  };

  // All available chapters for current subject (to populate Jump to Chapter selector)
  const allSubjectChapters = useMemo(() => {
    const map = new Map<string, { classLevel: ClassLevel; count: number }>();
    allNotes.forEach((item) => {
      if (item.subject === selectedSubject && isSubjectAllowedForExam(item.subject, user.targetExam)) {
        if (!map.has(item.chapter)) {
          map.set(item.chapter, { classLevel: item.classLevel, count: 0 });
        }
        map.get(item.chapter)!.count += item.formulas.length;
      }
    });
    return Array.from(map.entries()).map(([chapter, info]) => ({
      chapter,
      classLevel: info.classLevel,
      formulaCount: info.count
    }));
  }, [allNotes, selectedSubject, user.targetExam]);

  // Check if search query matches other subjects
  const crossSubjectMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const otherAllowed = allowedSubjects.filter((s) => s !== selectedSubject);
    const matches: Array<{ subject: SubjectName; count: number }> = [];

    otherAllowed.forEach((sub) => {
      const hits = allNotes.filter((item) => {
        if (item.subject !== sub) return false;
        return (
          item.chapter.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q) ||
          item.concept.toLowerCase().includes(q) ||
          item.formulas.some((f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q))
        );
      });
      if (hits.length > 0) {
        matches.push({ subject: sub, count: hits.length });
      }
    });
    return matches;
  }, [allNotes, searchQuery, allowedSubjects, selectedSubject]);

  const handleJumpToChapter = (chapterName: string) => {
    if (!chapterName) return;
    setSelectedClass('All');
    setExpandedChapters((prev) => new Set([...prev, chapterName]));
    setTimeout(() => {
      const el = document.getElementById(`chapter-card-${encodeURIComponent(chapterName)}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Filter items matching subject and exam guard (when searching, ignore class restriction so students find all chapters!)
  const subjectItems = useMemo(() => {
    return allNotes.filter((item) => {
      if (item.subject !== selectedSubject) return false;
      if (!isSubjectAllowedForExam(item.subject, user.targetExam)) return false;
      if (!searchQuery.trim() && selectedClass !== 'All' && item.classLevel !== selectedClass) return false;
      return true;
    });
  }, [allNotes, selectedSubject, selectedClass, searchQuery, user.targetExam]);

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

            {/* Add Formula Button */}
            <button
              type="button"
              onClick={() => {
                setNewFormulaForm((prev) => ({
                  ...prev,
                  subject: selectedSubject,
                  classLevel: selectedClass === 'All' ? '11' : selectedClass
                }));
                setAddFormulaModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs"
              title="Add a new formula to curriculum"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Formula</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Bar, Quick Jump to Chapter & Quick Toggles */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${selectedSubject} formulas, topics, concepts (e.g. Bernoulli, Nernst, Equilibrium, Work)...`}
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

          {/* Quick Jump to Chapter Selector */}
          <div className="relative shrink-0 min-w-[200px] sm:min-w-[240px]">
            <select
              aria-label="Directly jump to any chapter"
              onChange={(e) => {
                if (e.target.value) {
                  handleJumpToChapter(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="" disabled>
                📑 Direct Jump to Chapter ({allSubjectChapters.length})...
              </option>
              {allSubjectChapters.map((ch) => (
                <option key={ch.chapter} value={ch.chapter}>
                  Cl {ch.classLevel}: {ch.chapter} ({ch.formulaCount} fmls)
                </option>
              ))}
            </select>
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

        {/* Cross-Subject Search Match Alert Banner */}
        {crossSubjectMatches.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-semibold text-amber-800 dark:text-amber-200">
              Is search ke formulas doosre subjects me bhi hain:
            </span>
            {crossSubjectMatches.map((m) => (
              <button
                key={m.subject}
                type="button"
                onClick={() => setSelectedSubject(m.subject)}
                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span>{m.subject}</span>
                <span className="text-[10px] bg-amber-800/40 px-1.5 py-0.2 rounded-full">
                  {m.count}
                </span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
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
                  id={`chapter-card-${encodeURIComponent(chGroup.chapter)}`}
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
                      {/* View All Formulas for Full Chapter */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullChapterSheet({ chapter: chGroup.chapter, items: chGroup.items });
                          setSheetTopicFilter('All');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="View all formulas of this chapter together on one page"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>All Formulas ({chGroup.formulaCount})</span>
                      </button>

                      {/* Download / Print Chapter Sheet */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintChapter(chGroup.chapter, chGroup.items);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Print or Save Chapter Formula Sheet as PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadMarkdown(chGroup.chapter, chGroup.items);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Download Markdown (.md) Formula Sheet"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">MD</span>
                      </button>

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
                      {/* View All Formulas for Full Chapter in Studio Mode */}
                      <button
                        type="button"
                        onClick={() => {
                          setFullChapterSheet({ chapter: activeTopicItem.chapter, items: currentChapterTopics });
                          setSheetTopicFilter('All');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="View all formulas of this chapter together on one page"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>All Formulas ({currentChapterTopics.reduce((s, it) => s + it.formulas.length, 0)})</span>
                      </button>

                      {/* Download / Print Chapter Sheet */}
                      <button
                        type="button"
                        onClick={() => handlePrintChapter(activeTopicItem.chapter, currentChapterTopics)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Print or Save Chapter Formula Sheet as PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadMarkdown(activeTopicItem.chapter, currentChapterTopics)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Download Markdown (.md) Formula Sheet"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">MD</span>
                      </button>

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

      {/* --- MODAL 1: FULL CHAPTER FORMULA SHEET MODAL ("ek sath pure chapter ke dekhna & download") --- */}
      {fullChapterSheet && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
          <div className="relative bg-white dark:bg-[#0c141d] w-full max-w-5xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#0f1724]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    {selectedSubject}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Class {fullChapterSheet.items[0]?.classLevel || '11/12'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Full Chapter Sheet
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {fullChapterSheet.chapter}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {fullChapterSheet.items.reduce((s, it) => s + it.formulas.length, 0)} Total Formulas
                  </span>
                  <span>•</span>
                  <span>{fullChapterSheet.items.length} Topics</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintChapter(fullChapterSheet.chapter, fullChapterSheet.items)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  title="Print or Save complete chapter as PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadMarkdown(fullChapterSheet.chapter, fullChapterSheet.items)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="Export complete chapter as Markdown document"
                >
                  <Download className="w-4 h-4" />
                  <span>Download MD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFullChapterSheet(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Topic Filter Pills inside Modal */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Filter Topic:</span>
              <button
                type="button"
                onClick={() => setSheetTopicFilter('All')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                  sheetTopicFilter === 'All'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                All Topics ({fullChapterSheet.items.reduce((s, it) => s + it.formulas.length, 0)})
              </button>
              {fullChapterSheet.items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setSheetTopicFilter(it.topic)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                    sheetTopicFilter === it.topic
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {it.topic} ({it.formulas.length})
                </button>
              ))}
            </div>

            {/* Scrollable Formulas List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {fullChapterSheet.items
                .filter((it) => sheetTopicFilter === 'All' || it.topic === sheetTopicFilter)
                .map((topicItem) => (
                  <div key={topicItem.id} className="space-y-3">
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {topicItem.topic}
                      </h3>
                      {topicItem.concept && (
                        <span className="text-xs text-slate-400 font-medium line-clamp-1">
                          — {topicItem.concept}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {topicItem.formulas.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101924] p-4 flex flex-col justify-between shadow-xs hover:border-emerald-500/50 transition-colors"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                {f.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => handleCopyFormula(f)}
                                className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                title="Copy LaTeX Formula"
                              >
                                {copiedFormulaName === f.name ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            {/* LaTeX Math Box */}
                            <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 text-center my-2 text-sm sm:text-base font-semibold overflow-x-auto text-slate-900 dark:text-emerald-100">
                              <MathRenderer math={f.formula} displayMode={true} />
                            </div>

                            {f.variables && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-2">
                                <span className="font-bold text-slate-700 dark:text-slate-300">Variables: </span>
                                {f.variables}
                              </p>
                            )}

                            {f.examTip && (
                              <div className="mt-2.5 p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-[11px] text-emerald-900 dark:text-emerald-200 flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{f.examTip}</span>
                              </div>
                            )}

                            {f.trap && (
                              <div className="mt-1.5 p-2 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 text-[11px] text-rose-900 dark:text-rose-200 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                                <span>{f.trap}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1724] flex items-center justify-between text-xs text-slate-500">
              <span>
                Tip: Click <strong>"Print / PDF"</strong> to download or print the entire chapter sheet at once.
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFullChapterSheet(null)}
                className="text-xs cursor-pointer"
              >
                Close Sheet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADMIN ADD FORMULA MODAL WITH LIVE KATEX PREVIEW --- */}
      {addFormulaModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
          <div className="relative bg-white dark:bg-[#0c141d] w-full max-w-2xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#0f1724]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Add New Formula to Curriculum
                  </h3>
                  <p className="text-xs text-slate-400">
                    Saves to database and renders across the platform with live KaTeX preview
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAddFormulaModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveNewFormula} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subject
                  </label>
                  <select
                    value={newFormulaForm.subject}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, subject: e.target.value as SubjectName })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    {allowedSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Class Level
                  </label>
                  <select
                    value={newFormulaForm.classLevel}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, classLevel: e.target.value as ClassLevel })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Chapter Name *
                  </label>
                  <input
                    type="text"
                    required
                    list="hub-existing-chapters"
                    placeholder="e.g. Thermodynamics or Electrochemistry"
                    value={newFormulaForm.chapter}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, chapter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                  <datalist id="hub-existing-chapters">
                    {allSubjectChapters.map((ch) => (
                      <option key={ch.chapter} value={ch.chapter} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Topic Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Carnot Engine or Kohlrausch Law"
                    value={newFormulaForm.topic}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Formula Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maximum Work in Reversible Isothermal Process"
                  value={newFormulaForm.title}
                  onChange={(e) => setNewFormulaForm({ ...newFormulaForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  LaTeX Math Formula *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. W = -2.303 n R T \log_{10}\left(\frac{V_2}{V_1}\right)"
                  value={newFormulaForm.formula}
                  onChange={(e) => setNewFormulaForm({ ...newFormulaForm, formula: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />

                {/* Real-time KaTeX Live Preview */}
                <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center min-h-[48px] flex items-center justify-center">
                  {newFormulaForm.formula.trim() ? (
                    <MathRenderer math={newFormulaForm.formula} displayMode={true} />
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Live KaTeX math preview will appear here in real time...
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Variables Definition
                </label>
                <input
                  type="text"
                  placeholder="e.g. n = moles, R = universal gas constant, T = temperature"
                  value={newFormulaForm.variables}
                  onChange={(e) => setNewFormulaForm({ ...newFormulaForm, variables: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Exam Tip / Pro-Tip
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. For isothermal expansion: W is maximum."
                    value={newFormulaForm.examTip}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, examTip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Common Pitfall / Trap
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Check if log is base e or base 10!"
                    value={newFormulaForm.trap}
                    onChange={(e) => setNewFormulaForm({ ...newFormulaForm, trap: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/admin?tab=hierarchy')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Admin Hierarchy</span>
                </button>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAddFormulaModalOpen(false)}
                    className="text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={savingFormula}
                    className="text-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    {savingFormula ? 'Saving...' : 'Publish Formula'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaNotesHub;
