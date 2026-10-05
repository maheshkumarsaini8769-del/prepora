import React, { useState, useEffect } from 'react';
import {
  Tv,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  Play,
  ExternalLink,
  Plus,
  RefreshCw,
  Clock,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { adminFetch } from '../../utils/adminApi';

interface CandidateVideo {
  youtubeVideoId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  score: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  embeddable: boolean;
}

export const AdminLectureDiscovery: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [chapterQuery, setChapterQuery] = useState('Units and Measurements');
  const [lectureType, setLectureType] = useState<'FULL_CHAPTER' | 'TOPIC'>('FULL_CHAPTER');

  const [candidates, setCandidates] = useState<CandidateVideo[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoverySource, setDiscoverySource] = useState<string>('');

  const [activePreview, setActivePreview] = useState<CandidateVideo | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Manual Add Modal
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualSubject, setManualSubject] = useState('Physics');
  const [manualChapter, setManualChapter] = useState('');

  // Health stats
  const [stats, setStats] = useState<{
    total: number;
    approved: number;
    pending: number;
    lowConfidence: number;
  }>({ total: 0, approved: 0, pending: 0, lowConfidence: 0 });

  const fetchHealthStats = async () => {
    try {
      const res = await adminFetch('/api/lectures/health');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchHealthStats();
  }, []);

  const handleDiscover = async () => {
    if (!chapterQuery.trim()) return;
    setIsDiscovering(true);
    setStatusMsg(null);
    try {
      const res = await adminFetch(
        `/api/lectures/discovery?subject=${encodeURIComponent(selectedSubject)}&chapter=${encodeURIComponent(
          chapterQuery
        )}&type=${lectureType}`
      );
      const data = await res.json();
      setIsDiscovering(false);
      if (data.success) {
        setCandidates(data.candidates || []);
        setDiscoverySource(data.source || 'FALLBACK');
      } else {
        setStatusMsg({ text: data.message || 'Discovery failed.', error: true });
      }
    } catch (err: any) {
      setIsDiscovering(false);
      setStatusMsg({ text: 'Error connecting to discovery server.', error: true });
    }
  };

  const handleApprove = async (candidate: CandidateVideo) => {
    try {
      const res = await adminFetch('/api/lectures/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeVideoId: candidate.youtubeVideoId,
          title: candidate.title,
          description: candidate.description,
          channelTitle: candidate.channelTitle,
          thumbnail: candidate.thumbnail,
          duration: candidate.duration,
          subject: selectedSubject,
          chapter: chapterQuery,
          type: lectureType,
          score: candidate.score,
          confidence: candidate.confidence
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ text: `Approved "${candidate.title.slice(0, 40)}..." as primary lecture!` });
        fetchHealthStats();
        // Remove from candidates list
        setCandidates(prev => prev.filter(c => c.youtubeVideoId !== candidate.youtubeVideoId));
      } else {
        setStatusMsg({ text: data.message || 'Approval failed.', error: true });
      }
    } catch {
      setStatusMsg({ text: 'Failed to approve candidate.', error: true });
    }
  };

  const handleReject = (candidate: CandidateVideo) => {
    setCandidates(prev => prev.filter(c => c.youtubeVideoId !== candidate.youtubeVideoId));
    setStatusMsg({ text: 'Candidate discarded.' });
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim() || !manualChapter.trim()) return;

    try {
      const res = await adminFetch('/api/lectures/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeUrl: manualUrl,
          title: manualTitle,
          subject: manualSubject,
          chapter: manualChapter,
          type: 'FULL_CHAPTER',
          isRecommended: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ text: 'Manual lecture added successfully!' });
        setManualModalOpen(false);
        setManualUrl('');
        setManualTitle('');
        setManualChapter('');
        fetchHealthStats();
      } else {
        setStatusMsg({ text: data.message || 'Failed to add lecture.', error: true });
      }
    } catch {
      setStatusMsg({ text: 'Error connecting to server.', error: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {statusMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between ${
            statusMsg.error
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Health Statistics Row (task2.md section 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Curated</span>
          <div className="text-xl font-black text-white">{stats.total}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Approved Primary</span>
          <div className="text-xl font-black text-emerald-400">{stats.approved}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Pending Review</span>
          <div className="text-xl font-black text-amber-400">{stats.pending}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Low Confidence</span>
          <div className="text-xl font-black text-rose-400">{stats.lowConfidence}</div>
        </div>
      </div>

      {/* 2. Lecture Discovery Control Box */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Smart YouTube Candidate Discovery</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-query search + relevance scoring (0-100) with confidence classification.
            </p>
          </div>

          <button
            onClick={() => setManualModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add YouTube URL Manually</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Chapter Name</label>
            <input
              type="text"
              value={chapterQuery}
              onChange={e => setChapterQuery(e.target.value)}
              placeholder="e.g. Relations & Functions, Kinematics..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleDiscover}
              disabled={isDiscovering}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
            >
              {isDiscovering ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>{isDiscovering ? 'Discovering...' : 'Discover Candidates'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Candidate Videos Display (task2.md section 14) */}
      {candidates.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Candidate Videos for {chapterQuery} ({candidates.length})</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Source: {discoverySource}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {candidates.map((c, idx) => {
              const confColor =
                c.confidence === 'HIGH'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : c.confidence === 'MEDIUM'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30';

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <div
                      onClick={() => setActivePreview(c)}
                      className="relative w-28 aspect-video bg-black rounded-lg overflow-hidden shrink-0 cursor-pointer group"
                    >
                      <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                      <div className="absolute bottom-1 right-1 px-1 bg-black/80 text-[9px] text-white rounded">
                        {c.duration}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${confColor}`}>
                          Score {c.score} • {c.confidence}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate">{c.channelTitle}</span>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {c.title}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setActivePreview(c)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${c.youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>YouTube</span>
                    </a>

                    <div className="flex-1 flex justify-end gap-1.5">
                      <button
                        onClick={() => handleReject(c)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-800/40 transition"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleApprove(c)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Manual Add Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add YouTube Lecture Manually</span>
              </h3>
              <button onClick={() => setManualModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">YouTube URL or Video ID</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={manualUrl}
                  onChange={e => setManualUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Custom Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Kinematics High-Yield One-Shot"
                  value={manualTitle}
                  onChange={e => setManualTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Subject</label>
                  <select
                    value={manualSubject}
                    onChange={e => setManualSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Chapter Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Chapter name"
                    value={manualChapter}
                    onChange={e => setManualChapter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Save Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Video Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-3xl rounded-2xl overflow-hidden space-y-3">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate max-w-xl">{activePreview.title}</span>
              <button onClick={() => setActivePreview(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activePreview.youtubeVideoId}?autoplay=1`}
                title=""
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => {
                  handleApprove(activePreview);
                  setActivePreview(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Approve as Recommended
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLectureDiscovery;
