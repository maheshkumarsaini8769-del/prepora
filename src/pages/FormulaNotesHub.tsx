import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronRight,
  Filter,
  Flame,
  Award,
  BookMarked,
  HelpCircle,
  Clock,
  Eye,
  EyeOff,
  Tv,
  Calendar
} from 'lucide-react';
import { Card, Button, Badge } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { questionService } from '../services/questionService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { SubjectName, ClassLevel, Question } from '../types';
import {
  comprehensiveFormulaNotes,
  TopicRevisionItem,
  TopicFormula
} from '../data/comprehensiveFormulaNotes';

export const FormulaNotesHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();

  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const initialSubject = (searchParams.get('subject') as SubjectName) || (allowedSubjects.includes('Physics') ? 'Physics' : allowedSubjects[0]);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
  const [showQuestionsForTopic, setShowQuestionsForTopic] = useState<boolean>(true);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const handleAddToPlanner = (chapterName: string, topicName?: string) => {
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
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

  // Filter items matching subject and exam guard
  const subjectItems = useMemo(() => {
    return comprehensiveFormulaNotes.filter((item) => {
      if (item.subject !== selectedSubject) return false;
      if (!isSubjectAllowedForExam(item.subject, user.targetExam)) return false;
      if (selectedClass !== 'All' && item.classLevel !== selectedClass) return false;
      return true;
    });
  }, [selectedSubject, selectedClass, user.targetExam]);

  // Filtered by Search Query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return subjectItems;
    const q = searchQuery.toLowerCase().trim();
    return subjectItems.filter((item) => {
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
  }, [subjectItems, searchQuery]);

  // Active Selected Chapter and Topic
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [activeTopicId, setActiveTopicId] = useState<string>('');

  // Extract distinct chapters for the current subject
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

  // Auto-select first chapter & topic if not selected
  useEffect(() => {
    if (distinctChapters.length > 0) {
      const currentChapterExists = distinctChapters.some((c) => c.chapter === activeChapter);
      if (!currentChapterExists) {
        setActiveChapter(distinctChapters[0].chapter);
      }
    } else {
      setActiveChapter('');
    }
  }, [distinctChapters, activeChapter]);

  // Topics in active chapter
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

  // Live Topic Practice Questions from Question Service
  const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);

  useEffect(() => {
    if (!activeTopicItem) {
      setTopicQuestions([]);
      return;
    }

    setIsLoadingQuestions(true);
    // Fetch matching questions for this chapter and topic from the repository
    const questions = questionService.filterQuestions({
      subject: activeTopicItem.subject,
      chapter: activeTopicItem.chapter,
      topic: activeTopicItem.topic,
      exam: user.targetExam === 'NEET' ? 'NEET' : user.targetExam === 'JEE' ? 'JEE' : undefined,
      includePYQs: true
    });

    if (questions.length > 0) {
      setTopicQuestions(questions);
      setIsLoadingQuestions(false);
    } else {
      // Fallback: broaden to chapter
      const chapterQs = questionService.filterQuestions({
        subject: activeTopicItem.subject,
        chapter: activeTopicItem.chapter,
        includePYQs: true
      });
      setTopicQuestions(chapterQs);
      setIsLoadingQuestions(false);
    }
  }, [activeTopicItem, user.targetExam]);

  // Toggle Bookmark Formula
  const toggleBookmarkFormula = (formulaId: string) => {
    setBookmarkedFormulaIds((prev) => {
      const next = new Set(prev);
      if (next.has(formulaId)) next.delete(formulaId);
      else next.add(formulaId);
      localStorage.setItem('prepora_bookmarked_formulas', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Copy Formula to Clipboard
  const handleCopyFormula = (f: TopicFormula) => {
    navigator.clipboard.writeText(f.formula);
    setCopiedFormulaName(f.name);
    setTimeout(() => setCopiedFormulaName(null), 2000);
  };

  // Launch Practice Session with Topic Questions
  const handleStartTopicPractice = () => {
    if (!activeTopicItem || topicQuestions.length === 0) return;
    const qIds = topicQuestions.slice(0, 20).map((q) => q.id);
    navigate(`/practice/session?chapter=${encodeURIComponent(activeTopicItem.chapter)}&topic=${encodeURIComponent(activeTopicItem.topic)}&subject=${encodeURIComponent(activeTopicItem.subject)}&ids=${encodeURIComponent(qIds.join(','))}`);
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

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
            <span>Chapter Mastery & Instant Practice Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>100,000+ Question Repository</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Formula & Short Notes Hub
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
            Har chapter ke topic-by-topic short notes, high-yield mathematical formulas aur har topic ke direct practice questions. Quick revision karein aur turant questions solve karein!
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>{distinctChapters.length} Chapters Indexed</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-300" />
              <span>{subjectItems.length} Key Topics</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Target: {user.targetExam} 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Subject Tabs, Class Level & Search */}
      <div className="bg-white dark:bg-[#0e1620] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        {/* Subject Tabs (Subject isolation respected: NEET no Math, JEE no Bio) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            {allowedSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSelectedSubject(sub);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Class:</span>
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              {(['All', '11', '12'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedSubject} formulas, topics, concepts (e.g. Carnot, Nernst, Projectile, Integration)...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Main Two-Column Hub Content */}
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
                        isActive ? 'text-emerald-600 dark:text-emerald-400 translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Chapter, Topics, Short Notes, Formulas & Questions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTopicItem ? (
            <>
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
                      onClick={() => navigate(`/lectures?subject=${encodeURIComponent(activeTopicItem.subject)}&chapter=${encodeURIComponent(activeTopicItem.chapter)}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      title="Watch best YouTube lecture for this chapter"
                    >
                      <Tv className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Watch Lecture</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToPlanner(activeTopicItem.chapter, activeTopicItem.topic)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      title="Add to study planner"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>+ Add to Planner</span>
                    </button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleStartTopicPractice}
                      disabled={topicQuestions.length === 0}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current mr-1.5" />
                      <span>Practice Topic ({topicQuestions.length} Qs)</span>
                    </Button>
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

              {/* SECTION 1: High-Yield Short Notes */}
              <div className="bg-white dark:bg-[#0e1620] p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                      <BookMarked className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Topic Short Notes: {activeTopicItem.topic}
                      </h3>
                      <p className="text-[11px] text-slate-400">{activeTopicItem.concept}</p>
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-2 pt-1">
                  {activeTopicItem.shortNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>

                {/* Key Memory Takeaways */}
                {activeTopicItem.keyPoints.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 space-y-1.5">
                    <span className="text-[11px] font-black text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Crucial Exam Insights & Mnemonics
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-teal-900 dark:text-teal-200/90 font-medium">
                      {activeTopicItem.keyPoints.map((kp, idx) => (
                        <li key={idx}>{kp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* SECTION 2: Key Formulas & Mathematical Equations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Essential Formulas ({activeTopicItem.formulas.length})</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {activeTopicItem.formulas.map((f, idx) => {
                    const formulaUniqueId = `${activeTopicItem.id}-f-${idx}`;
                    const isBookmarked = bookmarkedFormulaIds.has(formulaUniqueId);
                    const isCopied = copiedFormulaName === f.name;

                    return (
                      <div
                        key={idx}
                        className="bg-white dark:bg-[#0e1620] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 relative overflow-hidden"
                      >
                        {/* Formula Title & Actions */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                            {f.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyFormula(f)}
                              title="Copy LaTeX formula"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBookmarkFormula(formulaUniqueId)}
                              title="Bookmark formula for rapid revision"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              ) : (
                                <Bookmark className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* KaTeX Equation Display Box */}
                        <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-900/30 overflow-x-auto text-center">
                          <MathRenderer math={`\\[${f.formula}\\]`} />
                        </div>

                        {/* Variable Definitions */}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          <strong className="text-slate-700 dark:text-slate-300">Variables: </strong>
                          <span>{f.variables}</span>
                        </div>

                        {/* Exam Tip */}
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                          <strong>Pro-Tip: </strong>
                          <span>{f.examTip}</span>
                        </div>

                        {/* Common Trap Alert */}
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

              {/* SECTION 3: Live Topic Practice Questions from 100k+ Repository */}
              <div className="bg-white dark:bg-[#0e1620] p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center font-black text-xs">
                      {topicQuestions.length}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Topic Practice Questions ({topicQuestions.length})
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Solve real {activeTopicItem.topic} questions to lock in the formulas.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleStartTopicPractice}
                    disabled={topicQuestions.length === 0}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    <span>Start Practice Session</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                {isLoadingQuestions ? (
                  <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading topic questions from question bank...
                  </div>
                ) : topicQuestions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Is topic ke questions load nahi huye. Broaden topic filter.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {/* Preview first 3 questions right on this page */}
                    {topicQuestions.slice(0, 3).map((q, idx) => {
                      const isRevealed = !!revealedSolutions[q.id];
                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              Question #{idx + 1} • {q.difficulty}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">{q.source || 'PYQ'}</span>
                          </div>

                          <div className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                            <MathRenderer math={q.question} />
                          </div>

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = isRevealed && optIdx === q.correctAnswer;
                              return (
                                <div
                                  key={optIdx}
                                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                                    isCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-300'
                                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
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
                          <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() => toggleSolution(q.id)}
                              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isRevealed ? 'Hide Solution' : 'Show Answer & Explanation'}</span>
                            </button>
                            <span className="text-[10px] text-slate-400">
                              Estimated Time: {q.recommendedTimeSeconds || 60}s
                            </span>
                          </div>

                          {isRevealed && (
                            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200 space-y-1 animate-in fade-in duration-150">
                              <div className="font-black text-[11px] text-emerald-800 dark:text-emerald-300">
                                Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)}
                              </div>
                              <div className="text-[11px] leading-relaxed">
                                <MathRenderer math={q.explanation || 'By applying the fundamental formula above, we reach this conclusion.'} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {topicQuestions.length > 3 && (
                      <div className="text-center pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleStartTopicPractice}
                          className="text-xs font-bold"
                        >
                          View All {topicQuestions.length} Questions in Practice Session →
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-[#0e1620] p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              Left panel se koi chapter select karein.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaNotesHub;
