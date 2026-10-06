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
  Check
} from 'lucide-react';
import { getAllCuratedVideos, VideoResource } from '../data/videoLectures';
import { SubjectName } from '../types';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { continueLearningService } from '../services/continueLearningService';

export const VideoLecturesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();
  const targetExam = user.targetExam || 'JEE';
  const allowedSubjects = useMemo(() => getAllowedSubjectsForExam(targetExam), [targetExam]);

  const paramSubject = searchParams.get('subject') as SubjectName | null;
  const initialSubject = paramSubject && allowedSubjects.includes(paramSubject)
    ? paramSubject
    : 'All';

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>(initialSubject);
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [lectureMode, setLectureMode] = useState<'FULL_CHAPTER' | 'TOPIC_WISE'>('FULL_CHAPTER');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoResource | null>(null);
  const [addedPlannerMsg, setAddedPlannerMsg] = useState<string | null>(null);

  const [serverVideos, setServerVideos] = useState<VideoResource[]>([]);

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
            channelName: l.channelTitle || 'PREPORA Curated',
            duration: l.duration || '45m',
            description: l.description || ''
          }));
          setServerVideos(mapped);
        }
      })
      .catch(() => null);
  }, [selectedSubject]);

  const allVideos = useMemo(() => {
    const curated = getAllCuratedVideos().filter(v => isSubjectAllowedForExam(v.subject, targetExam));
    if (serverVideos.length === 0) return curated;

    // Merge server videos with curated, avoiding duplicate youtubeId
    const seenYt = new Set<string>();
    const merged: VideoResource[] = [];

    // Server-approved lectures take high priority
    for (const sv of serverVideos) {
      if (isSubjectAllowedForExam(sv.subject, targetExam)) {
        seenYt.add(sv.youtubeId);
        merged.push(sv);
      }
    }

    for (const cv of curated) {
      if (!seenYt.has(cv.youtubeId)) {
        merged.push(cv);
      }
    }
    return merged;
  }, [targetExam, serverVideos]);

  // Sync state if URL query param changes
  useEffect(() => {
    const sub = searchParams.get('subject') as SubjectName | null;
    if (sub && allowedSubjects.includes(sub)) {
      setSelectedSubject(sub);
    } else if (sub && !allowedSubjects.includes(sub)) {
      setSelectedSubject('All');
    }
    const chap = searchParams.get('chapter');
    if (chap) setSelectedChapter(chap);
  }, [searchParams, allowedSubjects]);

  const handleSelectSubject = (sub: SubjectName | 'All') => {
    setSelectedSubject(sub);
    setSelectedChapter('All');
    setSelectedTopic('');
    if (sub === 'All') {
      searchParams.delete('subject');
      searchParams.delete('chapter');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ subject: sub }, { replace: true });
    }
  };

  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  // Distinct Chapters for current subject
  const distinctChapters = useMemo(() => {
    const vids = selectedSubject === 'All' ? allVideos : allVideos.filter(v => v.subject === selectedSubject);
    return Array.from(new Set(vids.map(v => v.chapter))).sort();
  }, [allVideos, selectedSubject]);

  // Topics for the currently selected chapter (from curriculum notes)
  const availableTopics = useMemo(() => {
    if (selectedChapter === 'All') return [];
    const notes = comprehensiveFormulaNotes.filter(
      n => n.chapter.toLowerCase() === selectedChapter.toLowerCase()
    );
    const topics = Array.from(new Set(notes.map(n => n.topic)));
    return topics.length > 0 ? topics : [
      'Core Theory & Derivation',
      'Important Formulas & Identities',
      'High-Yield Exam Applications',
      'Advanced Problem Solving'
    ];
  }, [selectedChapter]);

  // Filtered video lectures
  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => {
      const matchSub = selectedSubject === 'All' || v.subject === selectedSubject;
      const matchChap = selectedChapter === 'All' || v.chapter.toLowerCase() === selectedChapter.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        v.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchSub && matchChap && matchSearch;
    });
  }, [allVideos, selectedSubject, selectedChapter, searchQuery]);

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

    // Track telemetry (task1.md section 31)
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

      {/* Header Banner - PREPORA Emerald Brand (task1.md section 3 & 5) */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-900/30">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-500/30">
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Distraction Educational Theater</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Smart Educational Lectures
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Learn smarter with chapter-wise and topic-wise lectures. Curated high-yield video lessons with zero algorithm rabbit holes and no commercial distractions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complete Chapter One-Shots
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Topic-Wise Deep Dives
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Watch Inside PREPORA or on YouTube
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Mode Control Bar */}
      <div className="bg-white dark:bg-[#0e1620] rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {subjects.map((sub) => {
            const isSelected = selectedSubject === sub;
            const count = sub === 'All' ? allVideos.length : allVideos.filter((v) => v.subject === sub).length;
            return (
              <button
                key={sub}
                onClick={() => handleSelectSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{sub}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chapter Selection & Mode Switcher (task1.md section 7) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chapter:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Chapters ({distinctChapters.length})</option>
              {distinctChapters.map((ch) => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>

          {/* Mode Switcher: Full Chapter vs Topic-wise */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setLectureMode('FULL_CHAPTER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lectureMode === 'FULL_CHAPTER'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              ▶ Full Chapter Lecture
            </button>
            <button
              onClick={() => setLectureMode('TOPIC_WISE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lectureMode === 'TOPIC_WISE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              ☰ Topic-wise Lectures
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lectures by chapter or concept (e.g. Kinematics, Thermodynamics, Matrices)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* TOPIC-WISE MODE: Show Topics Bar if Chapter is selected (task1.md section 9) */}
      {lectureMode === 'TOPIC_WISE' && selectedChapter !== 'All' && (
        <div className="bg-white dark:bg-[#0e1620] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Chapter Topics for {selectedChapter}</span>
            </h3>
            <span className="text-[11px] text-slate-400">{availableTopics.length} topics available</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTopic('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTopic === ''
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {availableTopics.map((topic, tidx) => (
              <button
                key={`${topic}-${tidx}`}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

      {/* Video Grid with PREPORA Branding & Dual Watch Options (task1.md section 8, 10, 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video, vidx) => {
          const colors = getSubjectColor(video.subject);
          return (
            <div
              key={`${video.id || video.youtubeId}-${vidx}`}
              className="bg-white dark:bg-[#0e1620] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
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

                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Neutral Label Badge (task1.md section 3 & 12) */}
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{lectureMode === 'FULL_CHAPTER' ? 'Full Chapter Lecture' : 'Recommended Lecture'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${colors.badge}`}>
                      {video.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Best Match
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {selectedTopic ? `${selectedTopic} — ${video.chapter}` : video.chapter}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Primary Dual Actions: [Watch Here] AND [Open in YouTube] (task1.md section 1) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
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

                  {/* Secondary Connected Actions: Formula Sheet & Planner (task1.md section 29 & 30) */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                    <button
                      onClick={() => navigate(`/formula-sheet?subject=${encodeURIComponent(video.subject)}&chapter=${encodeURIComponent(video.chapter)}`)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <BookMarked className="w-3 h-3" />
                      <span>View Formula</span>
                    </button>

                    <button
                      onClick={() => handleAddToPlanner(video, selectedTopic)}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold flex items-center gap-1"
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
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No Suitable Lecture Found Yet</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or selecting another chapter.</p>
        </div>
      )}

      {/* In-Website YouTube Player Modal (task1.md section 10 & 11) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {activeVideo.subject} • Recommended Lecture
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-semibold">{activeVideo.chapter}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {activeVideo.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Responsive 16:9 Official YouTube Embed Player (task1.md section 10) */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* [Open in YouTube] option (task1.md section 11) */}
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>↗ Open in YouTube</span>
                </a>

                <button
                  onClick={() => handleAddToPlanner(activeVideo)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>+ Add to Planner</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate(`/formula-sheet?subject=${encodeURIComponent(activeVideo.subject)}&chapter=${encodeURIComponent(activeVideo.chapter)}`);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Formula Sheet</span>
                </button>

                <button
                  onClick={() => {
                    navigate(`/practice?chapter=${encodeURIComponent(activeVideo.chapter)}&subject=${encodeURIComponent(activeVideo.subject)}`);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
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
