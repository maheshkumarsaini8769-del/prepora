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
  RotateCcw,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { syllabusService } from '../services/syllabusService';
import { ecosystemService } from '../services/ecosystemService';
import { masterStudyPlanService } from '../services/masterStudyPlanService';
import { getChapterVideo, VideoResource } from '../data/videoLectures';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { CanonicalSyllabusChapter, SubjectName } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';

export const MissedChaptersPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const userClass = user.classLevel || '11';

  // Mode: Real Missed Topics (from schedule/skipped tasks) vs Untouched Syllabus Chapters
  const [activeTab, setActiveTab] = useState<'real_missed' | 'untouched_syllabus'>('real_missed');

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [selectedClass, setSelectedClass] = useState<'All' | '11' | '12'>(() => {
    if (userClass === '11') return '11';
    if (userClass === '12') return '12';
    return 'All';
  });
  const [filterType, setFilterType] = useState<'all' | 'high-yield'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<{ chapterName: string; subjectName: string; video: VideoResource } | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [roadmapRefreshKey, setRoadmapRefreshKey] = useState(0);

  // 1. REAL MISSED TOPICS: Topics actually scheduled in the past that were not completed, or skipped in daily plan
  const realMissedTopics = useMemo(() => {
    const list: Array<{
      id: string;
      subject: SubjectName;
      chapterNumber: number;
      chapterName: string;
      topicNumber?: number;
      topicName: string;
      classLevel: '11' | '12';
      date?: string;
      formattedDate?: string;
      dayNumber?: number;
      source: 'study_planner' | 'daily_plan' | 'weakness';
      reasonBadge: string;
      lectureDurationMinutes: number;
      dppQuestionCount: number;
      lectureCompleted: boolean;
      dppCompleted: boolean;
    }> = [];

    const todayIso = new Date().toISOString().split('T')[0];
    const roadmap = masterStudyPlanService.getMasterRoadmap();

    // 1a. Past days in Master Study Plan where lecture or DPP was not completed
    roadmap.days.forEach((day) => {
      if (day.date < todayIso) {
        day.topics.forEach((t) => {
          // In master curriculum: Ch 1-15 is Class 11, Ch 16-30 is Class 12
          const cls: '11' | '12' = t.chapterNumber <= 15 ? '11' : '12';

          // Strictly filter by user's class
          if (userClass === '11' && cls !== '11') return;
          if (userClass === '12' && selectedClass !== 'All' && cls !== selectedClass) return;

          if (!t.lectureCompleted || !t.dppCompleted) {
            let reasonBadge = 'Incomplete Past Topic';
            if (!t.lectureCompleted && !t.dppCompleted) {
              reasonBadge = 'Lecture & DPP Missed';
            } else if (!t.lectureCompleted) {
              reasonBadge = 'Lecture Missed';
            } else {
              reasonBadge = 'DPP Missed';
            }

            list.push({
              id: `plan_${day.date}_${t.subject}_${t.topicNumber}`,
              subject: t.subject as SubjectName,
              chapterNumber: t.chapterNumber,
              chapterName: t.chapterName,
              topicNumber: t.topicNumber,
              topicName: t.topicName,
              classLevel: cls,
              date: day.date,
              formattedDate: day.formattedDate,
              dayNumber: day.dayNumber,
              source: 'study_planner',
              reasonBadge,
              lectureDurationMinutes: t.lectureDurationMinutes,
              dppQuestionCount: t.dppQuestionCount,
              lectureCompleted: t.lectureCompleted,
              dppCompleted: t.dppCompleted
            });
          }
        });
      }
    });

    // 1b. Skipped tasks in Daily Plan
    try {
      const dailyPlan = ecosystemService.getDailyPlan();
      dailyPlan.items.forEach((it) => {
        if (it.status === 'skipped') {
          list.push({
            id: `skipped_${it.id}`,
            subject: (it.subject as SubjectName) || 'Physics',
            chapterNumber: 0,
            chapterName: it.chapter,
            topicName: it.title,
            classLevel: (userClass === '12' ? '12' : '11'),
            date: todayIso,
            formattedDate: 'Skipped in Daily Plan',
            dayNumber: 0,
            source: 'daily_plan',
            reasonBadge: 'Skipped in Daily Plan',
            lectureDurationMinutes: it.durationMinutes || 30,
            dppQuestionCount: it.questionCount || 15,
            lectureCompleted: false,
            dppCompleted: false
          });
        }
      });
    } catch {
      // ignore
    }

    // 1c. Weakness Concept Traps (low accuracy < 40%)
    try {
      const weaknesses = userService.getWeaknesses();
      weaknesses.forEach((w) => {
        if (w.accuracy < 40 && !list.some((item) => item.chapterName.toLowerCase() === w.chapter.toLowerCase())) {
          list.push({
            id: `weak_${w.subject}_${w.chapter}_${w.topic}`,
            subject: w.subject as SubjectName,
            chapterNumber: 0,
            chapterName: w.chapter,
            topicName: w.topic,
            classLevel: (userClass === '12' ? '12' : '11'),
            formattedDate: `Accuracy: ${w.accuracy}%`,
            source: 'weakness',
            reasonBadge: 'Concept Gap (<40% Acc)',
            lectureDurationMinutes: 30,
            dppQuestionCount: 10,
            lectureCompleted: false,
            dppCompleted: false
          });
        }
      });
    } catch {
      // ignore
    }

    return list;
  }, [userClass, selectedClass, roadmapRefreshKey]);

  // 2. Canonical Syllabus Chapters (Filtered strictly by class)
  const relevantSyllabus = useMemo(() => {
    return canonicalSyllabus.filter((c) => {
      if (!isSubjectAllowedForExam(c.subjectName as SubjectName, user.targetExam)) return false;
      // If student is Class 11, NEVER include Class 12!
      if (userClass === '11') {
        return c.classLevel === '11';
      }
      if (userClass === '12' && selectedClass !== 'All') {
        return c.classLevel === selectedClass;
      }
      return true;
    });
  }, [user.targetExam, userClass, selectedClass]);

  // Untouched / Remaining chapters in syllabus
  const { unattemptedChapters, coveredChapters } = useMemo(() => {
    const unattempted: Array<CanonicalSyllabusChapter & { attemptCount: number }> = [];
    const covered: CanonicalSyllabusChapter[] = [];
    const seen = new Set<string>();

    relevantSyllabus.forEach((ch) => {
      const key = `${ch.subjectName}_${ch.name.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);

      const prog = syllabusService.getChapterProgress(ch.chapterId || ch.name);
      const isPracticed = (prog.totalAttempts || 0) > 0 || prog.status !== 'Not Started';

      if (!isPracticed) {
        unattempted.push({
          ...ch,
          attemptCount: prog.totalAttempts || 0
        });
      } else {
        covered.push(ch);
      }
    });

    return { unattemptedChapters: unattempted, coveredChapters: covered };
  }, [relevantSyllabus]);

  // Filtered Real Missed Topics
  const filteredRealMissed = useMemo(() => {
    return realMissedTopics.filter((item) => {
      if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mChapter = item.chapterName.toLowerCase().includes(q);
        const mTopic = item.topicName.toLowerCase().includes(q);
        if (!mChapter && !mTopic) return false;
      }
      return true;
    });
  }, [realMissedTopics, selectedSubject, searchQuery]);

  // Filtered Untouched Chapters
  const filteredUntouchedChapters = useMemo(() => {
    return unattemptedChapters.filter((ch) => {
      if (selectedSubject !== 'All' && ch.subjectName !== selectedSubject) return false;
      if (filterType === 'high-yield' && ch.weightage !== 'High') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = ch.name.toLowerCase().includes(q);
        const mTopics = (ch.topics || []).some((t: any) =>
          (typeof t === 'string' ? t : t?.name || '').toLowerCase().includes(q)
        );
        if (!mName && !mTopics) return false;
      }
      return true;
    });
  }, [unattemptedChapters, selectedSubject, filterType, searchQuery]);

  // Mark a missed topic as completed directly
  const handleMarkTopicDone = (item: (typeof realMissedTopics)[0]) => {
    if (item.source === 'study_planner' && item.date && item.topicNumber) {
      if (!item.lectureCompleted) {
        masterStudyPlanService.toggleLecture(item.date, item.subject, item.topicNumber);
      }
      if (!item.dppCompleted) {
        masterStudyPlanService.toggleDpp(item.date, item.subject, item.topicNumber);
      }
      setRoadmapRefreshKey((k) => k + 1);
      setStatusMsg(`Marked "${item.topicName}" as completed!`);
      setTimeout(() => setStatusMsg(null), 3500);
    } else if (item.source === 'daily_plan') {
      try {
        const id = item.id.replace('skipped_', '');
        ecosystemService.toggleDailyPlanItem(id);
        setRoadmapRefreshKey((k) => k + 1);
        setStatusMsg(`Task marked resolved!`);
        setTimeout(() => setStatusMsg(null), 3500);
      } catch {
        // ignore
      }
    }
  };

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
      setStatusMsg(`Added "${chapterName}" to your Daily Plan!`);
      setTimeout(() => setStatusMsg(null), 3000);
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
      {/* 1. Diagnostic Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 rounded-2xl p-4 sm:p-6 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-md border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Syllabus Backlog & Missed Topics Tracker</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Class {userClass} Registered</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Missed Topics & Backlog
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {userClass === '11'
              ? 'Class 11 specific gap tracker: Shows topics scheduled in your study plan that were missed or skipped, without mixing Class 12.'
              : 'Targeted backlog tracker: Catch up on missed study plan topics and skipped tasks before taking major tests.'}
          </p>
        </div>

        {/* Stats Counter */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="text-center px-3 border-r border-white/10">
            <div className="text-2xl font-black text-rose-400">{realMissedTopics.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Real Missed</div>
          </div>
          <div className="text-center px-3 border-r border-white/10">
            <div className="text-2xl font-black text-amber-400">{unattemptedChapters.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Untouched</div>
          </div>
          <div className="text-center px-3">
            <div className="text-2xl font-black text-emerald-400">{coveredChapters.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Practiced</div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {statusMsg && (
        <div className="p-3.5 bg-emerald-600 text-white rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-600/30 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
          <button
            onClick={() => navigate('/planner')}
            className="underline font-bold text-white hover:text-emerald-100"
          >
            View Study Planner &rarr;
          </button>
        </div>
      )}

      {/* 2. Mode Selector Tabs: Real Missed Topics vs Untouched Syllabus */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0c131a] p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('real_missed')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'real_missed'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Real Missed Topics ({realMissedTopics.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('untouched_syllabus')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'untouched_syllabus'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Untouched Syllabus ({unattemptedChapters.length} Ch)</span>
          </button>
        </div>

        {/* Locked Class Indicator / Switcher */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Class Scope:</span>
          {userClass === '11' ? (
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Class 11 Only
            </span>
          ) : userClass === '12' ? (
            <div className="flex items-center gap-1">
              {(['12', '11', 'All'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    selectedClass === cls
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cls === 'All' ? '11 & 12' : cls === '11' ? 'Class 11 Backlog' : 'Class 12'}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {(['All', '11', '12'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    selectedClass === cls
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cls === 'All' ? 'All (11 & 12)' : `Class ${cls}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Filter Bar: Subjects & Search */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedSubject('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSubject === 'All'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Subjects
            </button>
            {allowedSubjects.map((sub) => {
              const count =
                activeTab === 'real_missed'
                  ? realMissedTopics.filter((c) => c.subject === sub).length
                  : unattemptedChapters.filter((c) => c.subjectName === sub).length;

              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
              placeholder={
                activeTab === 'real_missed'
                  ? 'Search missed topics...'
                  : 'Search syllabus chapters...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {activeTab === 'untouched_syllabus' && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Filter Yield:</span>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                filterType === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Chapters
            </button>
            <button
              type="button"
              onClick={() => setFilterType('high-yield')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                filterType === 'high-yield'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" /> High-Yield Only
            </button>
          </div>
        )}
      </Card>

      {/* 4. CONTENT AREA */}

      {/* TAB 1: REAL MISSED TOPICS */}
      {activeTab === 'real_missed' && (
        <div className="space-y-4">
          {filteredRealMissed.length === 0 ? (
            <Card className="text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Missed Topics! You're 100% on Track
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You have no backlog from past scheduled days. All assigned Class {userClass} topics up to today are complete!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button size="sm" onClick={() => navigate('/planner')}>
                  <span>Open Study Planner</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setActiveTab('untouched_syllabus')}>
                  <span>Browse Remaining Class {userClass} Syllabus ({unattemptedChapters.length})</span>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredRealMissed.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border bg-white dark:bg-[#0c131a] border-rose-200/70 dark:border-rose-950/50 shadow-xs flex flex-col justify-between gap-3 hover:border-rose-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300">
                        {item.subject} • Class {item.classLevel}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                        {item.reasonBadge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.chapterName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 mt-0.5">
                        {item.topicName}
                      </p>
                    </div>

                    {item.formattedDate && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Scheduled: {item.formattedDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions to Catch Up */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/lectures?subject=${encodeURIComponent(item.subject)}&chapter=${encodeURIComponent(
                              item.chapterName
                            )}&topic=${encodeURIComponent(item.topicName)}&autoplay=true`
                          )
                        }
                        className="py-1 px-2 text-[11px] font-semibold flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Lecture ({item.lectureDurationMinutes}m)</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/practice/session?subject=${encodeURIComponent(item.subject)}&chapter=${encodeURIComponent(
                              item.chapterName
                            )}&topic=${encodeURIComponent(item.topicName)}&count=15`
                          )
                        }
                        className="py-1 px-2 text-[11px] font-semibold flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Solve DPP ({item.dppQuestionCount} Qs)</span>
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleMarkTopicDone(item)}
                      className="w-full py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Mark Caught Up & Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: UNTOUCHED SYLLABUS CHAPTERS */}
      {activeTab === 'untouched_syllabus' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Showing untouched Class {userClass} chapters from your standard curriculum. Start any chapter below or let your Study Planner schedule them automatically.
            </span>
          </div>

          {filteredUntouchedChapters.length === 0 ? (
            <Card className="text-center py-16 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  All Class {userClass} Chapters Practiced!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Every chapter in this filter has been started or practiced. Keep revising!
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUntouchedChapters.map((chapter) => {
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
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              chapter.subjectName === 'Physics'
                                ? 'brand'
                                : chapter.subjectName === 'Chemistry'
                                ? 'warning'
                                : 'info'
                            }
                          >
                            {chapter.subjectName}
                          </Badge>
                          <span className="text-[11px] font-semibold text-slate-400">
                            Class {chapter.classLevel}
                          </span>
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
                          Upcoming Micro-Topics ({topicList.length}):
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

                    {/* Action Buttons */}
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
                        onClick={() =>
                          navigate(
                            `/study-hub?subject=${chapter.subjectName}&chapter=${encodeURIComponent(chapter.name)}`
                          )
                        }
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
                        <span>Add to Daily Plan</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Video Lecture Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-4 p-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                  {activeVideo.subjectName} One-Shot Lecture
                </span>
                <h3 className="text-base font-bold">{activeVideo.chapterName}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
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
