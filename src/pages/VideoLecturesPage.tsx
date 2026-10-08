import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  Search,
  BookOpen,
  HelpCircle,
  ExternalLink,
  X,
  Clock,
  Tv,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  BookMarked,
  Check,
  GraduationCap,
  Filter
} from 'lucide-react';
import { getAllCuratedVideos, getChapterVideo, VideoResource } from '../data/videoLectures';
import { SubjectName, ClassLevel } from '../types';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { continueLearningService } from '../services/continueLearningService';
import { sortChapterNamesCanonical, sortChaptersCanonical } from '../utils/chapterOrder';

export const VideoLecturesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();

  // Filters: Exam, Class, Subject, Chapter, Topic, Mode
  const [selectedExam, setSelectedExam] = useState<'All' | 'NEET' | 'JEE' | 'CBSE'>(
    (user?.targetExam as any) || 'All'
  );
  const [selectedClass, setSelectedClass] = useState<'All' | '11' | '12'>(
    (user?.classLevel === '11' || user?.classLevel === '12') ? user.classLevel : '11'
  );
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [lectureMode, setLectureMode] = useState<'FULL_CHAPTER' | 'TOPIC_WISE'>('FULL_CHAPTER');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoResource | null>(null);
  const [addedPlannerMsg, setAddedPlannerMsg] = useState<string | null>(null);
  const [serverVideos, setServerVideos] = useState<VideoResource[]>([]);

  // Fetch optional custom server lectures
  useEffect(() => {
    const url = selectedSubject !== 'All'
      ? `/api/lectures?subject=${encodeURIComponent(selectedSubject)}`
      : '/api/lectures';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.lectures)) {
          const mapped: VideoResource[] = data.lectures.map((l: any) => ({
            id: l.id || l._id,
            chapter: l.chapter,
            subject: l.subject,
            title: l.title,
            youtubeId: l.youtubeVideoId,
            channelName: l.channelTitle || 'Study Up Curated',
            duration: l.duration || '45m',
            description: l.description || '',
            classLevel: l.classLevel || '11',
            targetExams: l.targetExams || ['JEE', 'NEET', 'CBSE'],
            topic: l.topic,
            isTopicWise: !!l.topic
          }));
          setServerVideos(mapped);
        }
      })
      .catch(() => null);
  }, [selectedSubject]);

  // Merge server and curated lectures
  const allVideos = useMemo(() => {
    const curated = getAllCuratedVideos();
    if (serverVideos.length === 0) return curated;

    const seenYt = new Set<string>();
    const merged: VideoResource[] = [];

    for (const sv of serverVideos) {
      seenYt.add(sv.youtubeId);
      merged.push(sv);
    }

    for (const cv of curated) {
      if (!seenYt.has(cv.youtubeId)) {
        merged.push(cv);
      }
    }
    return merged;
  }, [serverVideos]);

  // Sync state if URL query param changes
  useEffect(() => {
    const sub = searchParams.get('subject') as string | null;
    if (sub) {
      const lower = sub.toLowerCase();
      let matchedSub: SubjectName | 'All' = 'All';
      if (lower.includes('phy')) matchedSub = 'Physics';
      else if (lower.includes('chem')) matchedSub = 'Chemistry';
      else if (lower.includes('math')) matchedSub = 'Mathematics';
      else if (lower.includes('bio')) matchedSub = 'Biology';
      if (matchedSub !== 'All') {
        setSelectedSubject(matchedSub);
      }
    }
    const chap = searchParams.get('chapter');
    if (chap) {
      setSelectedChapter(chap);
    }
    const cls = searchParams.get('class');
    if (cls && (cls === '11' || cls === '12' || cls === 'All')) {
      setSelectedClass(cls as any);
    }
    const ex = searchParams.get('exam');
    if (ex) {
      const normEx = ex === 'NEET_UG' ? 'NEET' : ex.startsWith('JEE') ? 'JEE' : ex === 'CBSE' ? 'CBSE' : ex;
      if (normEx === 'JEE' || normEx === 'NEET' || normEx === 'CBSE' || normEx === 'All') {
        setSelectedExam(normEx as any);
      }
    }
  }, [searchParams]);

  // Dynamic allowed subjects based on selectedExam
  const allowedSubjects: SubjectName[] = useMemo(() => {
    if (selectedExam === 'NEET') {
      return ['Physics', 'Chemistry', 'Biology'];
    }
    if (selectedExam === 'JEE') {
      return ['Physics', 'Chemistry', 'Mathematics'];
    }
    return ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  }, [selectedExam]);

  // Reset or adjust subject if not compatible with new exam selection
  useEffect(() => {
    if (selectedSubject !== 'All' && !allowedSubjects.includes(selectedSubject)) {
      setSelectedSubject('All');
    }
  }, [selectedExam, allowedSubjects, selectedSubject]);

  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  // Distinct Chapters matching currently active subject/exam/class
  const distinctChapters = useMemo(() => {
    const vids = allVideos.filter(v => {
      if (selectedSubject !== 'All' && v.subject !== selectedSubject) return false;
      if (selectedExam !== 'All' && v.targetExams && !v.targetExams.includes(selectedExam as any) && !v.targetExams.includes('All')) return false;
      if (selectedClass !== 'All' && v.classLevel && v.classLevel !== selectedClass && v.classLevel !== 'All') return false;
      return true;
    });
    const chaps = sortChapterNamesCanonical(
      Array.from(new Set(vids.map(v => v.chapter))),
      selectedSubject !== 'All' ? selectedSubject : undefined
    );
    if (selectedChapter !== 'All' && !chaps.includes(selectedChapter)) {
      chaps.unshift(selectedChapter);
    }
    return chaps;
  }, [allVideos, selectedSubject, selectedExam, selectedClass, selectedChapter]);

  // Available topics for currently selected chapter
  const availableTopics = useMemo(() => {
    if (selectedChapter === 'All') {
      // If all chapters are shown and in topic-wise mode, collect distinct topics
      const topicVids = allVideos.filter(v => v.isTopicWise && v.topic);
      return Array.from(new Set(topicVids.map(v => v.topic!))).slice(0, 15);
    }
    const notes = comprehensiveFormulaNotes.filter(
      n => n.chapter.toLowerCase() === selectedChapter.toLowerCase()
    );
    const topicsFromNotes = Array.from(new Set(notes.map(n => n.topic)));
    if (topicsFromNotes.length > 0) return topicsFromNotes;

    const vids = allVideos.filter(v => v.chapter.toLowerCase() === selectedChapter.toLowerCase() && v.topic);
    const topicsFromVids = Array.from(new Set(vids.map(v => v.topic!)));
    if (topicsFromVids.length > 0) return topicsFromVids;

    return [
      'Core Theory & Derivation',
      'Important Formulas & Identities',
      'High-Yield Exam Applications',
      'Advanced Problem Solving'
    ];
  }, [selectedChapter, allVideos]);

  // Multi-dimensional filtering logic: Exam, Class, Subject, Mode, Chapter, Topic, Search
  const filteredVideos: VideoResource[] = useMemo(() => {
    const list = allVideos.filter((v) => {
      // 1. Exam Filter
      if (selectedExam !== 'All') {
        const exams = v.targetExams || ['JEE', 'NEET', 'CBSE'];
        const matchesExam = exams.includes(selectedExam as any) || exams.includes('All');
        if (!matchesExam) return false;
      }

      // 2. Class Level Filter
      if (selectedClass !== 'All') {
        const cls = v.classLevel || '11';
        const matchesClass = cls === selectedClass || cls === 'All';
        if (!matchesClass) return false;
      }

      // 3. Subject Filter
      if (selectedSubject !== 'All' && v.subject !== selectedSubject) {
        return false;
      }

      // 4. Lecture Mode Filter
      if (lectureMode === 'FULL_CHAPTER' && v.isTopicWise) {
        return false;
      }
      if (lectureMode === 'TOPIC_WISE' && !v.isTopicWise && selectedTopic) {
        return false;
      }

      // 5. Chapter Filter
      if (selectedChapter !== 'All') {
        const normSel = selectedChapter.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normChap = v.chapter.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normSel !== normChap && !normChap.includes(normSel) && !normSel.includes(normChap)) {
          return false;
        }
      }

      // 6. Topic Filter
      if (selectedTopic && v.isTopicWise) {
        const vidTopic = (v.topic || '').toLowerCase();
        const selTopic = selectedTopic.toLowerCase();
        if (!vidTopic.includes(selTopic) && !selTopic.includes(vidTopic)) {
          return false;
        }
      }

      // 7. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchChapter = v.chapter.toLowerCase().includes(q);
        const matchTopic = (v.topic || '').toLowerCase().includes(q);
        const matchDesc = (v.description || '').toLowerCase().includes(q);
        const matchChannel = v.channelName.toLowerCase().includes(q);
        if (!matchTitle && !matchChapter && !matchTopic && !matchDesc && !matchChannel) {
          return false;
        }
      }

      return true;
    });

    if (list.length === 0 && selectedChapter !== 'All') {
      const fallbackVid = getChapterVideo(selectedChapter, selectedSubject !== 'All' ? selectedSubject : 'Physics');
      if (fallbackVid) {
        return [fallbackVid];
      }
    }

    // Line-wise canonical curriculum sort
    return sortChaptersCanonical(list, v => v.chapter, v => v.subject);
  }, [allVideos, selectedExam, selectedClass, selectedSubject, lectureMode, selectedChapter, selectedTopic, searchQuery]);

  const handlePlayVideo = (video: VideoResource) => {
    setActiveVideo(video);
    continueLearningService.recordActivity({
      type: 'lecture',
      title: video.chapter,
      subtitle: `One-Shot Video • ${video.title}`,
      subject: (video.subject as SubjectName) || 'Physics',
      chapter: video.chapter,
      url: `/lectures?subject=${encodeURIComponent(video.subject)}&chapter=${encodeURIComponent(video.chapter)}`
    });

    fetch('/api/video-views/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: video.subject,
        chapter: video.chapter,
        videoId: video.youtubeId,
        videoTitle: video.title,
        userId: userService.getProfile().id,
        userEmail: userService.getProfile().email
      })
    }).catch(() => null);
  };

  const handleAddToPlanner = (video: VideoResource, topicName?: string) => {
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const currentDay = days[new Date().getDay()];

    ecosystemService.addPlannerTask({
      day: currentDay,
      subject: (video.subject as SubjectName) || 'Physics',
      chapter: video.chapter,
      taskType: 'Revision',
      durationMinutes: 45,
      completed: false,
      notes: `Watch lecture: ${topicName || video.chapter}`
    });
    setAddedPlannerMsg(`Added "${topicName || video.chapter}" to your Study Planner!`);
    setTimeout(() => setAddedPlannerMsg(null), 3000);
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return {
          badge: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800',
          dot: 'bg-cyan-500'
        };
      case 'Chemistry':
        return {
          badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500'
        };
      case 'Mathematics':
        return {
          badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
          dot: 'bg-indigo-500'
        };
      case 'Biology':
        return {
          badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500'
        };
      default:
        return {
          badge: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          dot: 'bg-slate-500'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Toast Notification for Planner */}
      {addedPlannerMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{addedPlannerMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-900/30">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-500/30">
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Distraction Educational Theater</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>100% Working Verified Lectures</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Curated Educational Video Lectures
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Authentic one-shot lectures and topic-wise deep dive videos curated for NEET, JEE, and Board exams. 100% verified high-definition educational lectures with direct practice links.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Exam Filter (NEET • JEE • Board)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Class 11 & Class 12 Separation
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Topic-Wise Deep Dives
            </span>
          </div>
        </div>
      </div>

      {/* Master Filter and Mode Control Bar */}
      <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
        {/* Row 1: Exam Filter & Class Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Exam Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Exam:</span>
            </span>
            <div className="flex gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
              {(['All', 'NEET', 'JEE', 'CBSE'] as const).map((ex) => {
                const isSelected = selectedExam === ex;
                return (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      setSelectedExam(ex);
                      setSelectedChapter('All');
                      setSelectedTopic('');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {ex === 'All' ? 'All Exams' : ex === 'CBSE' ? 'CBSE / Board' : ex}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              <span>Class:</span>
            </span>
            <div className="flex gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
              {(['All', '11', '12'] as const).map((cls) => {
                const isSelected = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      setSelectedClass(cls);
                      setSelectedChapter('All');
                      setSelectedTopic('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Subject Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Subject:
            </span>
            {subjects.map((sub) => {
              const isSelected = selectedSubject === sub;
              const count = allVideos.filter((v) => {
                const matchSub = sub === 'All' || v.subject === sub;
                const matchExam = selectedExam === 'All' || !v.targetExams || v.targetExams.includes(selectedExam as any) || v.targetExams.includes('All');
                const matchClass = selectedClass === 'All' || !v.classLevel || v.classLevel === selectedClass || v.classLevel === 'All';
                return matchSub && matchExam && matchClass;
              }).length;

              return (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubject(sub);
                    setSelectedChapter('All');
                    setSelectedTopic('');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{sub}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher: Full Chapter vs Topic-wise */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
            <button
              onClick={() => {
                setLectureMode('FULL_CHAPTER');
                setSelectedTopic('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lectureMode === 'FULL_CHAPTER'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              ▶ Full Chapter One-Shots
            </button>
            <button
              onClick={() => setLectureMode('TOPIC_WISE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lectureMode === 'TOPIC_WISE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              ☰ Topic-Wise Deep Dives
            </button>
          </div>
        </div>

        {/* Row 3: Chapter Selector & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chapter:</span>
            <select
              aria-label="Filter lectures by chapter"
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setSelectedTopic('');
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">All Chapters ({distinctChapters.length})</option>
              {distinctChapters.map((ch) => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures by topic, chapter or educator (e.g. Kinematics, GOC, Optics)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TOPIC-WISE MODE: Show Topics Pills */}
      {lectureMode === 'TOPIC_WISE' && availableTopics.length > 0 && (
        <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {selectedChapter !== 'All' ? `Topics in ${selectedChapter}` : 'High-Yield Topics'}
              </span>
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold">{availableTopics.length} topics available</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTopic('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTopic === ''
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {availableTopics.map((topic, tidx) => (
              <button
                key={`${topic}-${tidx}`}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video, vidx) => {
          const colors = getSubjectColor(video.subject);
          return (
            <div
              key={`${video.id || video.youtubeId}-${vidx}`}
              className="bg-white dark:bg-[#0e1620] rounded-3xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Thumbnail / Video Banner */}
              <div
                onClick={() => handlePlayVideo(video)}
                className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center group-hover:opacity-95 transition-opacity"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.chapter}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded-md flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Badge: Mode */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{video.isTopicWise ? 'Topic Deep Dive' : 'Full Chapter One-Shot'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  {/* Badges: Subject, Class, Exam Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${colors.badge}`}>
                      {video.subject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Class {video.classLevel || '11'}
                    </span>
                    {video.targetExams && video.targetExams.map((ex) => (
                      <span
                        key={ex}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          ex === 'NEET'
                            ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                            : ex === 'JEE'
                            ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                            : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>

                  {video.topic && (
                    <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span className="line-clamp-1">{video.topic}</span>
                    </div>
                  )}

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>

                  <div className="text-[11px] text-slate-400 font-semibold pt-0.5">
                    Educator: <span className="text-slate-700 dark:text-slate-300">{video.channelName}</span>
                  </div>
                </div>

                {/* Primary Dual Actions: [Watch Here] AND [Open in YouTube] */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>▶ Watch Here</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                      title="Open Original Video in YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>↗ YouTube</span>
                    </a>
                  </div>

                  {/* Secondary Actions: Formula Sheet & Planner */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                    <button
                      onClick={() => navigate(`/formula-notes?subject=${encodeURIComponent(video.subject)}&chapter=${encodeURIComponent(video.chapter)}`)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <BookMarked className="w-3 h-3" />
                      <span>View Formula Sheet</span>
                    </button>

                    <button
                      onClick={() => handleAddToPlanner(video, video.topic || video.chapter)}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>+ Add to Planner</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#0c131a] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Tv className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No Lectures Found Matching Filters</h3>
          <p className="text-xs text-slate-500">
            Try resetting your selected exam, class, subject, or search query.
          </p>
          <button
            onClick={() => {
              setSelectedExam('All');
              setSelectedClass('All');
              setSelectedSubject('All');
              setSelectedChapter('All');
              setSelectedTopic('');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* In-Website YouTube Player Modal with Direct Fallback */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {activeVideo.subject} • Class {activeVideo.classLevel || '11'}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-semibold">{activeVideo.chapter}</span>
                  {activeVideo.topic && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-emerald-300 font-bold">{activeVideo.topic}</span>
                    </>
                  )}
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {activeVideo.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct YouTube Stream Banner */}
            <div className="p-2.5 px-4 bg-emerald-950/70 border-b border-emerald-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Zero-Distraction Mode. Agar browser me video embed restrict ho, direct YouTube par kholein:
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition text-[11px] shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Open in YouTube ↗</span>
              </a>
            </div>

            {/* Responsive 16:9 Official YouTube Embed Player */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Watch on YouTube</span>
                </a>

                <button
                  onClick={() => handleAddToPlanner(activeVideo, activeVideo.topic || activeVideo.chapter)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>+ Add to Planner</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate(`/formula-notes?subject=${encodeURIComponent(activeVideo.subject)}&chapter=${encodeURIComponent(activeVideo.chapter)}`);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Formula Sheet</span>
                </button>

                <button
                  onClick={() => {
                    navigate(`/practice/session?chapter=${encodeURIComponent(activeVideo.chapter)}&subject=${encodeURIComponent(activeVideo.subject)}`);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Practice Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLecturesPage;
