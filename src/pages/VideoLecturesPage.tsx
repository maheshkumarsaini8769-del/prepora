import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ExternalLink,
  X,
  Clock,
  Tv,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { getAllCuratedVideos, VideoResource } from '../data/videoLectures';
import { SubjectName } from '../types';
import { userService } from '../services/userService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';

export const VideoLecturesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();
  const targetExam = user.targetExam || 'JEE';
  const allowedSubjects = useMemo(() => getAllowedSubjectsForExam(targetExam), [targetExam]);

  const allVideos = useMemo(() => {
    return getAllCuratedVideos().filter(v => isSubjectAllowedForExam(v.subject, targetExam));
  }, [targetExam]);
  
  const paramSubject = searchParams.get('subject') as SubjectName | null;
  const initialSubject = paramSubject && allowedSubjects.includes(paramSubject)
    ? paramSubject
    : 'All';

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>(initialSubject);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoResource | null>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const sub = searchParams.get('subject') as SubjectName | null;
    if (sub && allowedSubjects.includes(sub)) {
      setSelectedSubject(sub);
    } else if (sub && !allowedSubjects.includes(sub)) {
      setSelectedSubject('All');
    }
  }, [searchParams, allowedSubjects]);

  const handleSelectSubject = (sub: SubjectName | 'All') => {
    setSelectedSubject(sub);
    if (sub === 'All') {
      searchParams.delete('subject');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ subject: sub }, { replace: true });
    }
  };

  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  const filteredVideos = useMemo(() => {
    return allVideos.filter((v) => {
      const matchSub = selectedSubject === 'All' || v.subject === selectedSubject;
      const matchSearch =
        !searchQuery.trim() ||
        v.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSub && matchSearch;
    });
  }, [allVideos, selectedSubject, searchQuery]);

  const handlePlayVideo = (video: VideoResource) => {
    setActiveVideo(video);
    // Track telemetry
    fetch('/api/video-views/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: video.subject,
        chapter: video.chapter,
        videoId: video.youtubeId,
        videoTitle: video.title,
        channelName: video.channelName,
        userId: userService.getProfile().id,
        userEmail: userService.getProfile().email
      })
    }).catch(() => null);
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return {
          badge: 'bg-cyan-500/10 text-cyan-700 border-cyan-300',
          dot: 'bg-cyan-500',
          accent: 'from-cyan-600 to-blue-700'
        };
      case 'Chemistry':
        return {
          badge: 'bg-amber-500/10 text-amber-700 border-amber-300',
          dot: 'bg-amber-500',
          accent: 'from-amber-600 to-orange-700'
        };
      case 'Mathematics':
        return {
          badge: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
          dot: 'bg-indigo-500',
          accent: 'from-indigo-600 to-violet-700'
        };
      case 'Biology':
        return {
          badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          accent: 'from-emerald-600 to-teal-700'
        };
      default:
        return {
          badge: 'bg-slate-500/10 text-slate-700 border-slate-300',
          dot: 'bg-slate-500',
          accent: 'from-slate-700 to-slate-900'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold backdrop-blur-md border border-rose-500/30">
            <Tv className="w-3.5 h-3.5 text-rose-400" />
            <span>Zero-Distraction Educational Theater</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            One-Shot Video Lectures
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Curated high-yield video revisions from top educators (Physics Galaxy, Pankaj Sir, Mohit Tyagi, Tarun Sir) covering all 104+ chapters. No algorithm rabbit holes, no ads.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 104+ Chapters Covered
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & Curated
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct CBT Test Link
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0e1620] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
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

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters (e.g. Kinematics, Thermodynamics, Biomolecules, Matrices)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video) => {
          const colors = getSubjectColor(video.subject);
          return (
            <div
              key={video.id}
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
                    // Fallback to placeholder if thumbnail unavailable
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${colors.badge}`}>
                      {video.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                      {video.channelName}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {video.chapter}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => handlePlayVideo(video)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Now</span>
                  </button>

                  <button
                    onClick={() => navigate(`/chapters/${encodeURIComponent(video.chapter)}?subject=${encodeURIComponent(video.subject)}`)}
                    title="Chapter Detail & Practice"
                    className="py-2 px-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center justify-center transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#0c131a] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Tv className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No Video Lectures Found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or subject filter.</p>
        </div>
      )}

      {/* Distraction-Free Embedded Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                    {activeVideo.subject} • One-Shot Lecture
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-semibold">{activeVideo.channelName}</span>
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

            {/* Video Player */}
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
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-rose-500/30 rounded-lg text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                  <span>Open in YouTube App</span>
                </a>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideo.chapter + ' ' + activeVideo.subject + ' one shot revision')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Search on YouTube</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate(`/doubts?chapter=${encodeURIComponent(activeVideo.chapter)}&subject=${encodeURIComponent(activeVideo.subject)}`);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask AI Doubt</span>
                </button>

                <button
                  onClick={() => {
                    navigate(`/practice?chapter=${encodeURIComponent(activeVideo.chapter)}&subject=${encodeURIComponent(activeVideo.subject)}`);
                  }}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
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
