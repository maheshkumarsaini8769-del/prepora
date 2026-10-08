import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  Play,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Flame,
  Search,
  ExternalLink,
  ChevronRight,
  Tv,
  FileText,
  Calendar,
  Check,
  RotateCcw
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { syllabusService } from '../services/syllabusService';
import { ecosystemService } from '../services/ecosystemService';
import { getChapterVideo, VideoResource } from '../data/videoLectures';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { CanonicalSyllabusChapter, SubjectName } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';

export const MissedChaptersPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [selectedClass, setSelectedClass] = useState<'All' | '11' | '12'>('All');
  const [filterType, setFilterType] = useState<'all' | 'high-yield' | 'skipped-plan'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<{ chapterName: string; subjectName: string; video: VideoResource } | null>(null);
  const [addedToPlanMsg, setAddedToPlanMsg] = useState<string | null>(null);

  // 1. Get all canonical chapters for student's exam and subjects
  const examPrefix = user.targetExam === 'NEET' ? 'NEET' : user.targetExam === 'CBSE' ? 'CBSE' : user.targetExam === 'RBSE' ? 'RBSE' : 'JEE';

  const relevantSyllabus = useMemo(() => {
    return canonicalSyllabus.filter((c) => {
      if (!isSubjectAllowedForExam(c.subjectName as SubjectName, user.targetExam)) return false;
      if (user.classLevel !== 'Dropper' && c.classLevel && c.classLevel !== user.classLevel) {
        // Still allow reviewing both classes if wanted, but by default filter
      }
      return true;
    });
  }, [user.targetExam, user.classLevel]);

  // 2. Identify which chapters have been practiced/started vs MISSED
  // A chapter is missed if it has 0 attempts recorded in syllabusService
  const masterySummary = useMemo(() => {
    return syllabusService.getMasterySummary(examPrefix);
  }, [examPrefix]);

  // Daily plan skipped items
  const skippedPlanChapters = useMemo(() => {
    try {
      const plan = ecosystemService.getDailyPlan();
      return new Set(plan.items.filter((it) => it.status === 'skipped').map((it) => it.chapter.toLowerCase()));
    } catch {
      return new Set<string>();
    }
  }, []);

  const { missedChapters, coveredChapters } = useMemo(() => {
    const missed: Array<CanonicalSyllabusChapter & { isSkippedInPlan: boolean; attemptCount: number }> = [];
    const covered: CanonicalSyllabusChapter[] = [];

    // Deduplicate by chapter name and subject
    const seen = new Set<string>();

    relevantSyllabus.forEach((ch) => {
      const key = `${ch.subjectName}_${ch.name.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);

      const prog = syllabusService.getChapterProgress(ch.chapterId || ch.name);
      const isPracticed = (prog.totalAttempts || 0) > 0 || prog.status !== 'Not Started';
      const isSkippedInPlan = skippedPlanChapters.has(ch.name.toLowerCase());

      if (!isPracticed || isSkippedInPlan) {
        missed.push({
          ...ch,
          isSkippedInPlan,
          attemptCount: prog.totalAttempts || 0
        });
      } else {
        covered.push(ch);
      }
    });

    return { missedChapters: missed, coveredChapters: covered };
  }, [relevantSyllabus, skippedPlanChapters]);

  // 3. Filter missed chapters based on current UI controls
  const filteredMissed = useMemo(() => {
    return missedChapters.filter((ch) => {
      if (selectedSubject !== 'All' && ch.subjectName !== selectedSubject) return false;
      if (selectedClass !== 'All' && ch.classLevel !== selectedClass) return false;

      if (filterType === 'high-yield' && ch.weightage !== 'High') return false;
      if (filterType === 'skipped-plan' && !ch.isSkippedInPlan) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = ch.name.toLowerCase().includes(q);
        const matchesTopics = (ch.topics || []).some((t: any) =>
          (typeof t === 'string' ? t : t?.name || '').toLowerCase().includes(q)
        );
        if (!matchesName && !matchesTopics) return false;
      }

      return true;
    });
  }, [missedChapters, selectedSubject, selectedClass, filterType, searchQuery]);

  const highYieldMissedCount = useMemo(() => {
    return missedChapters.filter((c) => c.weightage === 'High').length;
  }, [missedChapters]);

  const handleAddToPlan = (chapterName: string, subjectName: string) => {
    try {
      const plan = ecosystemService.getDailyPlan();
      plan.items.push({
        id: `plan-${Date.now()}`,
        title: `Catch up: ${chapterName} Core Concepts`,
        subject: subjectName as SubjectName,
        chapter: chapterName,
        durationMinutes: 30,
        questionCount: 10,
        type: 'practice',
        status: 'pending',
        actionUrl: `/practice?chapter=${encodeURIComponent(chapterName)}`
      });
      localStorage.setItem('prepora_daily_plan', JSON.stringify(plan));
      setAddedToPlanMsg(`Added "${chapterName}" to your Daily Plan!`);
      setTimeout(() => setAddedToPlanMsg(null), 3000);
    } catch {
      // fallback
    }
  };

  const handleWatchLecture = (chapterName: string, subjectName: string) => {
    const vid = getChapterVideo(chapterName, subjectName);
    setActiveVideo({ chapterName, subjectName, video: vid });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* 1. Header & Backlog Diagnostic Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-md border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Syllabus Backlog & Gap Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Missed Chapters & Topics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            These are chapters you have <strong>never practiced</strong> or <strong>skipped in your schedule</strong>.
            Unlike Revision (which reviews already-studied material), this backlog must be covered first before you can revise it.
          </p>
        </div>

        {/* Backlog Stats Quick Counter */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="text-center px-3 border-r border-white/10">
            <div className="text-2xl font-black text-amber-400">{missedChapters.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Missed</div>
          </div>
          <div className="text-center px-3 border-r border-white/10">
            <div className="text-2xl font-black text-rose-400">{highYieldMissedCount}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">High-Yield</div>
          </div>
          <div className="text-center px-3">
            <div className="text-2xl font-black text-emerald-400">{coveredChapters.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Covered</div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {addedToPlanMsg && (
        <div className="p-3.5 bg-emerald-600 text-white rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-600/30 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{addedToPlanMsg}</span>
          </div>
          <button
            onClick={() => navigate('/daily-plan')}
            className="underline font-bold text-white hover:text-emerald-100"
          >
            View Daily Plan &rarr;
          </button>
        </div>
      )}

      {/* 2. Danger Alert for High-Yield Missed Chapters */}
      {highYieldMissedCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-950 dark:text-rose-200">
                Critical Danger: {highYieldMissedCount} High-Yield Chapters are Untouched!
              </span>
              <p className="text-rose-700 dark:text-rose-300 text-[11px] mt-0.5">
                In {user.targetExam || 'competitive exams'}, high-weightage chapters contribute 8–16 marks each. Leaving them in your backlog puts your target percentile at risk.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setFilterType('high-yield')}
            className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
          >
            Filter High-Yield Missed &rarr;
          </Button>
        </div>
      )}

      {/* 3. Controls & Filter Bar */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedSubject('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === 'All'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Subjects ({missedChapters.length})
            </button>
            {allowedSubjects.map((sub) => {
              const count = missedChapters.filter((c) => c.subjectName === sub).length;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSubject === sub
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sub} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search missed chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Sub-Filters: Class & Urgency */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Class:</span>
            {(['All', '11', '12'] as const).map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  selectedClass === cls
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cls === 'All' ? 'Class 11 & 12' : `Class ${cls}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Show:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                filterType === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Untouched
            </button>
            <button
              onClick={() => setFilterType('high-yield')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                filterType === 'high-yield'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" /> High-Yield Only
            </button>
            <button
              onClick={() => setFilterType('skipped-plan')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                filterType === 'skipped-plan'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Skipped in Plan
            </button>
          </div>
        </div>
      </Card>

      {/* 4. Missed Chapters Grid */}
      {filteredMissed.length === 0 ? (
        <Card className="text-center py-16 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Missed Chapters in this Filter!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              All chapters matching this criterion have been practiced or started. Great job keeping your syllabus on track!
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button size="sm" onClick={() => navigate('/revision')}>
              Go to Revision &rarr;
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/syllabus')}>
              Check Full Syllabus
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissed.map((chapter) => {
            const topicList = (chapter.topics || []).map((t: any) =>
              typeof t === 'string' ? t : t?.name || ''
            ).filter(Boolean);

            const isHighYield = chapter.weightage === 'High';

            return (
              <Card
                key={`${chapter.subjectName}_${chapter.name}`}
                className={`p-5 space-y-4 border transition-all hover:shadow-md ${
                  isHighYield
                    ? 'border-rose-200 dark:border-rose-900/60 bg-gradient-to-br from-white via-white to-rose-50/20 dark:from-slate-900 dark:to-rose-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a]'
                }`}
              >
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={chapter.subjectName === 'Physics' ? 'brand' : chapter.subjectName === 'Chemistry' ? 'warning' : 'info'}>
                        {chapter.subjectName}
                      </Badge>
                      <span className="text-[11px] font-semibold text-slate-400">Class {chapter.classLevel}</span>
                      {chapter.isSkippedInPlan && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold">
                          Skipped in Plan
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {chapter.name}
                    </h3>
                  </div>

                  {isHighYield ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 text-[11px] font-black shrink-0">
                      <Flame className="w-3.5 h-3.5" /> High Yield
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                      Standard Yield
                    </span>
                  )}
                </div>

                {/* Subtopics Preview */}
                {topicList.length > 0 && (
                  <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Uncovered Topics ({topicList.length}):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {topicList.slice(0, 4).map((top, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] border border-slate-200 dark:border-slate-600"
                        >
                          {top}
                        </span>
                      ))}
                      {topicList.length > 4 && (
                        <span className="text-[11px] text-slate-400 font-semibold self-center">
                          +{topicList.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 4 Action Buttons for Catching Up */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWatchLecture(chapter.name, chapter.subjectName)}
                    className="flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-brand-600"
                  >
                    <Tv className="w-3.5 h-3.5 text-rose-500" />
                    <span>Watch Lecture</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/study-hub?subject=${chapter.subjectName}&chapter=${encodeURIComponent(chapter.name)}`)}
                    className="flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:text-brand-600"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>Read Notes</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate(
                        `/practice?subject=${chapter.subjectName}&chapter=${encodeURIComponent(chapter.name)}&count=5`
                      )
                    }
                    className="flex items-center justify-center gap-1.5 py-1.5 text-xs bg-brand-600 hover:bg-brand-700 text-white font-semibold"
                  >
                    <span>Start Practice (5 Qs)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToPlan(chapter.name, chapter.subjectName)}
                    className="flex items-center justify-center gap-1.5 py-1.5 text-xs border-dashed text-slate-600 dark:text-slate-300 hover:border-brand-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Plan</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Video Lecture Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-4 p-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">{activeVideo.subjectName} One-Shot Lecture</span>
                <h3 className="text-base font-bold">{activeVideo.chapterName}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.video.youtubeId}?autoplay=1&rel=0`}
                title={`${activeVideo.chapterName} Lecture`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Channel: {activeVideo.video.channelName} • {activeVideo.video.duration}</span>
              <Button
                size="sm"
                onClick={() => {
                  const ch = activeVideo.chapterName;
                  const sub = activeVideo.subjectName;
                  setActiveVideo(null);
                  navigate(`/practice?subject=${sub}&chapter=${encodeURIComponent(ch)}&count=10`);
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold"
              >
                Solve Questions on this Chapter &rarr;
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MissedChaptersPage;
