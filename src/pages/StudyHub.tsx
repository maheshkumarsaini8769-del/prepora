import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Zap,
  Repeat,
  GraduationCap,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  FileEdit,
  Play,
  Tv,
  ExternalLink,
  X,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { questionService } from '../services/questionService';
import { formulaService } from '../services/formulaService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { getChapterVideo } from '../data/videoLectures';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { SubjectName } from '../types';
import { getAllowedSubjectsForExam } from '../utils/examUtils';

export const StudyHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();
  const subjects: SubjectName[] = getAllowedSubjectsForExam(user.targetExam);

  // Initialize state from URL query parameters if provided
  const paramSubject = searchParams.get('subject') as SubjectName | null;
  const initialSubject = paramSubject && subjects.includes(paramSubject) ? paramSubject : (subjects[0] || 'Physics');
  const initialChapter = searchParams.get('chapter') || 'Kinematics';
  const initialQuery = searchParams.get('q') || '';

  const [activeSubject, setActiveSubject] = useState<SubjectName>(initialSubject);
  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapter);
  const [activeTab, setActiveTab] = useState<'notes' | 'formulas' | 'flashcards' | 'pyqs' | 'tests' | 'video'>('notes');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // Sync state if URL search parameters change externally
  useEffect(() => {
    const urlSub = searchParams.get('subject') as SubjectName | null;
    const urlCh = searchParams.get('chapter');
    const urlQ = searchParams.get('q');

    if (urlSub && subjects.includes(urlSub) && urlSub !== activeSubject) {
      setActiveSubject(urlSub);
    }
    if (urlCh && urlCh !== selectedChapter) {
      setSelectedChapter(urlCh);
    }
    if (urlQ !== null && urlQ !== searchQuery) {
      setSearchQuery(urlQ);
    }
  }, [searchParams]);

  // All chapters for the currently selected subject and student class level
  const allChapters = useMemo(() => {
    return questionService.getChapters(activeSubject, user.classLevel as any);
  }, [activeSubject, user.classLevel]);

  // Filter chapters based on active search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return allChapters;
    const q = searchQuery.toLowerCase().trim();
    return allChapters.filter((ch) => ch.toLowerCase().includes(q));
  }, [allChapters, searchQuery]);

  // Determine if other subjects contain chapters matching the search query
  const otherSubjectMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const matches: { subject: SubjectName; count: number; firstChapter: string }[] = [];

    subjects.forEach((subj) => {
      if (subj !== activeSubject) {
        const subChapters = questionService.getChapters(subj, user.classLevel as any);
        const matching = subChapters.filter((c) => c.toLowerCase().includes(q));
        if (matching.length > 0) {
          matches.push({ subject: subj, count: matching.length, firstChapter: matching[0] });
        }
      }
    });
    return matches;
  }, [searchQuery, activeSubject, subjects, user.classLevel]);

  // Determine effective chapter
  const effectiveChapter = useMemo(() => {
    if (filteredChapters.includes(selectedChapter)) return selectedChapter;
    if (filteredChapters.length > 0) return filteredChapters[0];
    if (allChapters.includes(selectedChapter)) return selectedChapter;
    return allChapters[0] || 'Kinematics';
  }, [filteredChapters, selectedChapter, allChapters]);

  // Retrieve curated real video lecture for the effective chapter
  const chapterVideo = useMemo(() => {
    return getChapterVideo(effectiveChapter, activeSubject);
  }, [effectiveChapter, activeSubject]);

  // Retrieve comprehensive curriculum notes & formulas for the effective chapter
  const chapterCurriculumNotes = useMemo(() => {
    const effLower = effectiveChapter.toLowerCase();
    return comprehensiveFormulaNotes.filter((item) => {
      const itemChLower = item.chapter.toLowerCase();
      return (
        itemChLower === effLower ||
        itemChLower.includes(effLower) ||
        effLower.includes(itemChLower) ||
        item.topic.toLowerCase().includes(effLower)
      );
    });
  }, [effectiveChapter]);

  // Merged and deduplicated formulas for the chapter
  const formulas = useMemo(() => {
    const base = formulaService.getFormulasByChapter(effectiveChapter).map((f) => ({
      id: f.id,
      name: f.name,
      formula: f.formula,
      variables: f.variables || '',
      chapterTitle: f.chapterTitle,
      subject: f.subject,
      importantNote: f.importantNote || '',
      trap: (f as any).trap as string | undefined
    }));
    const fromCurriculum = chapterCurriculumNotes.flatMap((item) =>
      item.formulas.map((f, idx) => ({
        id: `curric-${item.id}-${idx}`,
        name: f.name,
        formula: f.formula,
        variables: f.variables,
        chapterTitle: item.chapter,
        subject: item.subject,
        importantNote: f.examTip,
        trap: f.trap
      }))
    );

    const seen = new Set(base.map((b) => b.name.toLowerCase()));
    const additional = fromCurriculum.filter((f) => !seen.has(f.name.toLowerCase()));
    let list = [...base, ...additional];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          (f.importantNote && f.importantNote.toLowerCase().includes(q))
      );
    }
    return list;
  }, [effectiveChapter, chapterCurriculumNotes, searchQuery]);

  // Flashcards for active chapter
  const flashcards = useMemo(() => {
    const all = formulaService
      .getAllFormulas()
      .filter((f) => f.chapterTitle === effectiveChapter || f.subject === activeSubject);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return all.filter((c) => c.name.toLowerCase().includes(q) || c.formula.toLowerCase().includes(q)).slice(0, 8);
    }
    return all.slice(0, 8);
  }, [effectiveChapter, activeSubject, searchQuery]);

  // Questions and PYQs for active chapter
  const questions = useMemo(() => {
    return questionService.filterQuestions({ subject: activeSubject, chapter: effectiveChapter });
  }, [activeSubject, effectiveChapter]);

  const pyqs = useMemo(() => {
    const list = questions.filter((q) => q.source === 'PYQ' || q.source === 'Original Demo');
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter((item) => item.question.toLowerCase().includes(q) || item.topic.toLowerCase().includes(q)).slice(0, 8);
    }
    return list.slice(0, 8);
  }, [questions, searchQuery]);

  // User notes from local storage / user service
  const userNotes = useMemo(() => {
    const list = userService.getNotes().filter((n) => !n.subject || n.subject === activeSubject);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    return list;
  }, [activeSubject, searchQuery]);

  const handleSelectChapter = (ch: string) => {
    setSelectedChapter(ch);
    // Update URL query parameter
    searchParams.set('chapter', ch);
    searchParams.set('subject', activeSubject);
    setSearchParams(searchParams, { replace: true });
  };

  const handleSelectSubject = (s: SubjectName) => {
    setActiveSubject(s);
    const chs = questionService.getChapters(s, user.classLevel as any);
    const newChapter = chs[0] || '';
    if (newChapter) {
      setSelectedChapter(newChapter);
      searchParams.set('subject', s);
      searchParams.set('chapter', newChapter);
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchParams.has('q')) {
      searchParams.delete('q');
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-slide-up">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Unified Chapter & Resource Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Study Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Complete high-yield textbook summaries, verified one-shot video lectures, formula sheets, flashcards, and PYQs for every chapter.
          </p>
        </div>

        {/* Quick Search & Portals */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 relative z-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search chapters & resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 w-full sm:w-64 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/backlog')}
              className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Backlog</span>
            </button>
            <button
              onClick={() => navigate('/revision')}
              className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Repeat className="w-3.5 h-3.5 text-rose-400" />
              <span>Revision</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Subject Search Match Notification */}
      {otherSubjectMatches.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-brand-50/90 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-800 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span>
              Found <strong>&ldquo;{searchQuery}&rdquo;</strong> in other subjects:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {otherSubjectMatches.map((m) => (
              <button
                key={m.subject}
                onClick={() => {
                  setActiveSubject(m.subject);
                  setSelectedChapter(m.firstChapter);
                }}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-brand-300 dark:border-brand-700 hover:border-brand-500 text-brand-700 dark:text-brand-300 font-bold text-[11px] transition-colors"
              >
                Switch to {m.subject} ({m.count} chapters) →
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => handleSelectSubject(s)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeSubject === s
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Chapter Navigation & Search List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {activeSubject} Chapters
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {filteredChapters.length} of {allChapters.length}
              </span>
            </div>

            {filteredChapters.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">
                  No chapters match &ldquo;{searchQuery}&rdquo; in {activeSubject}.
                </p>
                <Button size="sm" variant="outline" onClick={handleClearSearch} className="text-xs">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
                {filteredChapters.map((ch) => {
                  const isSelected = ch === effectiveChapter;
                  const mastery = ecosystemService.getChapterMastery(ch);
                  return (
                    <button
                      key={ch}
                      onClick={() => handleSelectChapter(ch)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-brand-50/90 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 text-brand-900 dark:text-brand-300 font-bold shadow-xs'
                          : 'bg-white dark:bg-[#0c131a] border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="truncate">
                        <span className="text-xs block truncate">{ch}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{mastery.overallMastery}% Mastered</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Chapter Content Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {/* Chapter Banner & Quick Actions */}
          <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">{activeSubject}</Badge>
                  <span className="text-xs font-bold text-slate-400">Class {user.classLevel}</span>
                  {chapterCurriculumNotes[0]?.weightage && (
                    <Badge variant={chapterCurriculumNotes[0].weightage === 'High' ? 'danger' : 'warning'} size="sm">
                      {chapterCurriculumNotes[0].weightage} Weightage
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{effectiveChapter}</h2>
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
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  Chapter Detail →
                </Link>
              </div>
            </div>

            {/* Study Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-100 dark:border-slate-800 pb-1 overflow-x-auto">
              {[
                { id: 'video', label: 'One-Shot Video', icon: Tv },
                { id: 'notes', label: 'Notes', icon: FileEdit },
                { id: 'formulas', label: `Formulas (${formulas.length})`, icon: Zap },
                { id: 'flashcards', label: `Flashcards (${flashcards.length})`, icon: Repeat },
                { id: 'pyqs', label: `PYQs (${pyqs.length})`, icon: FileText },
                { id: 'tests', label: 'Tests', icon: GraduationCap },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-b-2 border-brand-600'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Video */}
            {activeTab === 'video' && (
              <div className="space-y-4 py-2 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                      One-Shot Revision • {chapterVideo.channelName} • {chapterVideo.duration}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{chapterVideo.title}</h3>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${chapterVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold self-start sm:self-auto"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-slate-800">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${chapterVideo.youtubeId}?rel=0&modestbranding=1`}
                    title={chapterVideo.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {chapterVideo.description}
                </p>
              </div>
            )}

            {/* Tab 2: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4 py-2 animate-in fade-in">
                {chapterCurriculumNotes.length > 0 ? (
                  chapterCurriculumNotes.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                          {item.topic}
                        </h4>
                        <Badge variant="brand" size="sm">{item.examTarget} Exam</Badge>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {item.concept}
                      </p>

                      {item.shortNotes && item.shortNotes.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                            Crucial Principles:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                            {item.shortNotes.map((note, nIdx) => (
                              <li key={nIdx}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          <div className="space-y-0.5">
                            <span className="font-bold">Exam Trap & Retention Tip:</span>
                            <p>{item.keyPoints.join(' • ')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
                    <p className="font-bold text-slate-900 dark:text-white">Core Summary for {effectiveChapter}:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Master the fundamental definitions and boundary conditions for this chapter.</li>
                      <li>Check coordinate directions, SI units, and sign conventions before applying standard formulas.</li>
                      <li>Review previous year questions (PYQs) for high-frequency question patterns.</li>
                    </ul>
                  </div>
                )}

                {/* User Personal Notes */}
                {userNotes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">My Saved Notes:</span>
                    {userNotes.slice(0, 3).map((un, uIdx) => (
                      <div key={uIdx} className="p-3 rounded-xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white">{un.title}</span>
                        <p className="text-slate-500 mt-1 line-clamp-2">{un.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-1">
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

            {/* Tab 3: Formulas */}
            {activeTab === 'formulas' && (
              <div className="space-y-3 py-2 animate-in fade-in">
                {formulas.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No formulas matching &ldquo;{searchQuery}&rdquo; for {effectiveChapter}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formulas.map((f) => (
                      <div
                        key={f.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{f.name}</span>
                          <Badge variant="warning" size="sm">Formula</Badge>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
                          <MathRenderer math={`\\[${f.formula}\\]`} />
                        </div>

                        {f.variables && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            <strong>Variables: </strong>{f.variables}
                          </p>
                        )}
                        {f.importantNote && (
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                            Tip: {f.importantNote}
                          </p>
                        )}
                        {f.trap && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                            Trap: {f.trap}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/formula-sheet?subject=${encodeURIComponent(activeSubject)}&chapter=${encodeURIComponent(effectiveChapter)}`)}
                    className="text-xs font-bold"
                  >
                    View All in Formula Sheet →
                  </Button>
                </div>
              </div>
            )}

            {/* Tab 4: Flashcards */}
            {activeTab === 'flashcards' && (
              <div className="space-y-3 py-2 animate-in fade-in">
                <p className="text-xs text-slate-500">
                  Leitner spaced repetition cards for {effectiveChapter}:
                </p>
                {flashcards.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No flashcards available for this search.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {flashcards.map((card) => (
                      <div
                        key={card.id}
                        className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-brand-200/70 dark:border-slate-700 space-y-2"
                      >
                        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                          Concept Front
                        </span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">{card.name}</h4>
                        <div className="pt-2 border-t border-brand-200/50 dark:border-slate-700 text-xs font-mono font-bold text-brand-800 dark:text-brand-300">
                          {card.formula}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/flashcards')}
                    className="text-xs font-bold"
                  >
                    Practice in Flashcard Deck →
                  </Button>
                </div>
              </div>
            )}

            {/* Tab 5: PYQs */}
            {activeTab === 'pyqs' && (
              <div className="space-y-3 py-2 animate-in fade-in">
                <p className="text-xs text-slate-500">Verified Past Year Questions for {effectiveChapter}:</p>
                {pyqs.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No PYQs matching &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pyqs.map((q) => (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="truncate">
                          <span className="font-bold text-slate-900 dark:text-white block truncate">{q.question}</span>
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
                )}
              </div>
            )}

            {/* Tab 6: Tests */}
            {activeTab === 'tests' && (
              <div className="space-y-3 py-2 animate-in fade-in">
                <p className="text-xs text-slate-500">Practice tests available for {effectiveChapter}:</p>
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200">
                      {effectiveChapter} Chapter Mastery Test
                    </h4>
                    <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-0.5">
                      15 Questions • 30 Mins • +4/-1 Marking (Official NTA Pattern)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate(`/tests`)}
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

export default StudyHub;
