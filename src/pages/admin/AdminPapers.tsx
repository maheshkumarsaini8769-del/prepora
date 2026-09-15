import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  ArrowLeft,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  X,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Check,
  Archive,
  Play
} from 'lucide-react';

interface PaperItem {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'CBSE' | 'RBSE' | 'Board';
  classLevel?: string;
  board?: string;
  subject?: string;
  year: number;
  shift?: string;
  paperType: 'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper';
  durationMinutes: number;
  totalQuestions: number;
  description: string;
  questionIds: string[];
  fileUrl?: string;
  answerKeyUrl?: string;
  source: 'Official' | 'Internal' | 'Curated';
  status: 'Published' | 'Draft' | 'Archived';
  downloadsCount?: number;
  attemptsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const AdminPapers: React.FC = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState<PaperItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState<PaperItem | null>(null);
  const [previewPaper, setPreviewPaper] = useState<PaperItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formExam, setFormExam] = useState<'JEE' | 'NEET' | 'CBSE' | 'RBSE' | 'Board'>('JEE');
  const [formClass, setFormClass] = useState('12');
  const [formBoard, setFormBoard] = useState('CBSE');
  const [formSubject, setFormSubject] = useState('Full Syllabus');
  const [formYear, setFormYear] = useState(2024);
  const [formShift, setFormShift] = useState('');
  const [formType, setFormType] = useState<'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper'>('PYQ');
  const [formDuration, setFormDuration] = useState(180);
  const [formQuestions, setFormQuestions] = useState(75);
  const [formSource, setFormSource] = useState<'Official' | 'Internal' | 'Curated'>('Official');
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formAnswerKeyUrl, setFormAnswerKeyUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const fetchPapers = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/papers');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPapers(data.data);
      }
    } catch (e: any) {
      console.error('Failed to fetch papers', e);
      setFeedback({ type: 'error', message: 'Failed to connect to papers server.' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const openCreateModal = () => {
    setEditingPaper(null);
    setFormTitle('');
    setFormExam('JEE');
    setFormClass('12');
    setFormBoard('CBSE');
    setFormSubject('Full Syllabus');
    setFormYear(new Date().getFullYear());
    setFormShift('Session 1 - Shift 1');
    setFormType('PYQ');
    setFormDuration(180);
    setFormQuestions(75);
    setFormSource('Official');
    setFormStatus('Published');
    setFormFileUrl('');
    setFormAnswerKeyUrl('');
    setFormDescription('');
    setIsEditorOpen(true);
  };

  const openEditModal = (p: PaperItem) => {
    setEditingPaper(p);
    setFormTitle(p.title);
    setFormExam(p.exam);
    setFormClass(p.classLevel || '12');
    setFormBoard(p.board || 'CBSE');
    setFormSubject(p.subject || 'Full Syllabus');
    setFormYear(p.year);
    setFormShift(p.shift || '');
    setFormType(p.paperType);
    setFormDuration(p.durationMinutes);
    setFormQuestions(p.totalQuestions);
    setFormSource(p.source || 'Official');
    setFormStatus(p.status || 'Published');
    setFormFileUrl(p.fileUrl || '');
    setFormAnswerKeyUrl(p.answerKeyUrl || '');
    setFormDescription(p.description || '');
    setIsEditorOpen(true);
  };

  const handleSavePaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFeedback({ type: 'error', message: 'Paper title is required.' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formTitle.trim(),
        exam: formExam,
        classLevel: formClass,
        board: formBoard,
        subject: formSubject,
        year: Number(formYear),
        shift: formShift.trim(),
        paperType: formType,
        durationMinutes: Number(formDuration),
        totalQuestions: Number(formQuestions),
        source: formSource,
        status: formStatus,
        fileUrl: formFileUrl.trim(),
        answerKeyUrl: formAnswerKeyUrl.trim(),
        description: formDescription.trim(),
        adminEmail: 'superadmin@prepore.edu'
      };

      const url = editingPaper ? `/api/admin/papers/${editingPaper.id}` : '/api/admin/papers';
      const method = editingPaper ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: editingPaper ? 'Paper metadata successfully updated.' : 'New paper successfully published to library!'
        });
        setIsEditorOpen(false);
        await fetchPapers();
      } else {
        setFeedback({ type: 'error', message: data.message || 'Operation failed.' });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: e.message || 'Network error.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleToggleStatus = async (paper: PaperItem) => {
    const nextStatus: 'Published' | 'Draft' | 'Archived' =
      paper.status === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await fetch(`/api/admin/papers/${paper.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus, adminEmail: 'superadmin@prepore.edu' })
      });
      const data = await res.json();
      if (data.success) {
        setPapers((prev) =>
          prev.map((p) => (p.id === paper.id ? { ...p, status: nextStatus } : p))
        );
        setFeedback({ type: 'success', message: `Paper status switched to ${nextStatus}.` });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleDeletePaper = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/papers/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: 'superadmin@prepore.edu' })
      });
      const data = await res.json();
      if (data.success) {
        setPapers((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
        setFeedback({ type: 'success', message: 'Paper successfully deleted.' });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  // Filtered Papers
  const filteredPapers = papers.filter((p) => {
    if (selectedExam !== 'All' && p.exam !== selectedExam) return false;
    if (selectedType !== 'All' && p.paperType !== selectedType) return false;
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchSubject = (p.subject || '').toLowerCase().includes(q);
      const matchShift = (p.shift || '').toLowerCase().includes(q);
      const matchYear = String(p.year).includes(q);
      if (!matchTitle && !matchDesc && !matchSubject && !matchShift && !matchYear) return false;
    }
    return true;
  });

  // Metrics
  const totalCount = papers.length;
  const publishedCount = papers.filter((p) => p.status === 'Published').length;
  const draftCount = papers.filter((p) => p.status === 'Draft').length;
  const pyqCount = papers.filter((p) => p.paperType === 'PYQ').length;
  const modelCount = papers.filter((p) => p.paperType === 'Model Paper' || p.paperType === 'Sample Paper').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <Link
            to="/admin"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mission Control
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Paper Library & Archive</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Manage official JEE/NEET PYQs, CBSE/RBSE Board sample papers, shifts, and verified answer keys.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={fetchPapers}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition"
            title="Reload from MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg shadow-brand-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Upload / Add Paper</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top 5 Key Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Total Papers</span>
            <BookOpen className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{loading ? '...' : totalCount}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Catalogued Archives</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Live Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">{loading ? '...' : publishedCount}</div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">Accessible to Students</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Drafts / In Prep</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">{loading ? '...' : draftCount}</div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Pending Verification</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Official PYQs</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{loading ? '...' : pyqCount}</div>
          <div className="text-[11px] text-indigo-400 mt-0.5">Past Year Papers</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Model & Sample</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{loading ? '...' : modelCount}</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">Board & Mock Sets</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers by title, subject, session, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Exam Filter */}
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Exams</option>
            <option value="JEE">JEE Main / Advanced</option>
            <option value="NEET">NEET UG</option>
            <option value="CBSE">CBSE Board</option>
            <option value="RBSE">RBSE Board</option>
          </select>

          {/* Paper Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Types</option>
            <option value="PYQ">Official PYQs</option>
            <option value="Model Paper">Model Papers</option>
            <option value="Sample Paper">Sample Papers</option>
            <option value="Mock Paper">Mock Papers</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {(searchQuery || selectedExam !== 'All' || selectedType !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedExam('All');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Papers Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-850/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Paper Title & Details</th>
                <th className="py-3.5 px-4">Exam / Board</th>
                <th className="py-3.5 px-4">Year & Shift</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Questions & Duration</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Downloads / Attempts</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPapers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="font-semibold">No papers match your search criteria.</p>
                    <p className="text-[11px] text-slate-600 mt-1">Try resetting filters or upload a new paper above.</p>
                  </td>
                </tr>
              ) : (
                filteredPapers.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm hover:text-brand-300 cursor-pointer" onClick={() => setPreviewPaper(p)}>
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>Subject: <strong className="text-slate-300">{p.subject || 'Full Syllabus'}</strong></span>
                        <span>•</span>
                        <span>Source: <strong className="text-slate-300">{p.source || 'Official'}</strong></span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          p.exam === 'JEE'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : p.exam === 'NEET'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {p.exam} {p.board ? `(${p.board})` : ''}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.year}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[140px]" title={p.shift || 'General'}>
                        {p.shift || 'General'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {p.paperType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{p.totalQuestions} Questions</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{p.durationMinutes} mins</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                          p.status === 'Published'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : p.status === 'Draft'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.status === 'Published'
                              ? 'bg-emerald-400'
                              : p.status === 'Draft'
                              ? 'bg-amber-400'
                              : 'bg-slate-400'
                          }`}
                        ></span>
                        <span>{p.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[11px] text-slate-300">
                        <strong className="text-white">{p.downloadsCount || 0}</strong> downloads
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">{p.attemptsCount || 0}</strong> mock attempts
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewPaper(p)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                          title="Preview Paper"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-brand-400 rounded-lg hover:bg-slate-800 transition"
                          title="Edit Metadata"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                          title="Delete Paper"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {editingPaper ? 'Edit Paper Metadata' : 'Upload / Add Curriculum Paper'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conforms to official NTA & CBSE examination blueprint archives.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePaper} className="space-y-4 text-xs">
              {/* Paper Title */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Paper Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEE Main 2024 Session 1 (27 Jan Shift 1)"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* 3-Column: Exam, Year, Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Exam Type</label>
                  <select
                    value={formExam}
                    onChange={(e) => setFormExam(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="JEE">JEE Main / Advanced</option>
                    <option value="NEET">NEET UG</option>
                    <option value="CBSE">CBSE Board</option>
                    <option value="RBSE">RBSE Board</option>
                    <option value="Board">Other Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Year</label>
                  <input
                    type="number"
                    min="1990"
                    max="2030"
                    value={formYear}
                    onChange={(e) => setFormYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Subject Scope</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Full Syllabus">Full Syllabus (All Subjects)</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                    <option value="Science">General Science</option>
                  </select>
                </div>
              </div>

              {/* 3-Column: Shift, Paper Type, Source */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Session / Shift</label>
                  <input
                    type="text"
                    placeholder="e.g. Session 1 Shift 1 (Morning)"
                    value={formShift}
                    onChange={(e) => setFormShift(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Paper Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="PYQ">Past Year Question (PYQ)</option>
                    <option value="Model Paper">Model Paper</option>
                    <option value="Sample Paper">Official Sample Paper</option>
                    <option value="Mock Paper">Mock Assessment Paper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Source / Attribution</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Official">Official NTA / Board</option>
                    <option value="Curated">Curated Faculty Expert</option>
                    <option value="Internal">PREPORA Internal Bank</option>
                  </select>
                </div>
              </div>

              {/* 3-Column: Duration, Questions, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="15"
                    max="360"
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Total Questions</label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={formQuestions}
                    onChange={(e) => setFormQuestions(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Publication Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Resource URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Paper PDF / Source Link</label>
                  <input
                    type="url"
                    placeholder="https://... or /papers/official-jee.pdf"
                    value={formFileUrl}
                    onChange={(e) => setFormFileUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Answer Key / Solution URL</label>
                  <input
                    type="url"
                    placeholder="https://... or /papers/official-key.pdf"
                    value={formAnswerKeyUrl}
                    onChange={(e) => setFormAnswerKeyUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Description / Exam Blueprint Notes</label>
                <textarea
                  rows={3}
                  placeholder="Provide syllabus highlights, sectional pattern, or test taker guidance..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-brand-600/30"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingPaper ? 'Save Changes' : 'Publish Paper'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW PAPER MODAL */}
      {previewPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-1.5">
                  {previewPaper.exam} • {previewPaper.paperType}
                </span>
                <h3 className="text-lg font-black text-white">{previewPaper.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Year: {previewPaper.year} {previewPaper.shift ? `• ${previewPaper.shift}` : ''}
                </p>
              </div>
              <button
                onClick={() => setPreviewPaper(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750 text-slate-300 leading-relaxed">
                {previewPaper.description || 'No additional description provided.'}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-750">
                  <div className="text-slate-400 text-[10px]">Total Questions</div>
                  <div className="text-base font-bold text-white mt-0.5">{previewPaper.totalQuestions}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-750">
                  <div className="text-slate-400 text-[10px]">Time Allowed</div>
                  <div className="text-base font-bold text-white mt-0.5">{previewPaper.durationMinutes}m</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-750">
                  <div className="text-slate-400 text-[10px]">Source</div>
                  <div className="text-base font-bold text-slate-200 mt-0.5">{previewPaper.source}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-750">
                  <div className="text-slate-400 text-[10px]">Status</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">{previewPaper.status}</div>
                </div>
              </div>

              {/* Resource Links */}
              <div className="space-y-2 pt-2">
                {previewPaper.fileUrl ? (
                  <a
                    href={previewPaper.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 font-bold transition"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Download / View Official Paper Document</span>
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-750 text-slate-400">
                    Direct PDF link not configured. Paper questions stored in database.
                  </div>
                )}

                {previewPaper.answerKeyUrl && (
                  <a
                    href={previewPaper.answerKeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold transition"
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Official Answer Key & Verification Key</span>
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setPreviewPaper(null);
                  openEditModal(previewPaper);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition text-xs"
              >
                Edit Metadata
              </button>

              <button
                onClick={() => {
                  setPreviewPaper(null);
                  navigate(`/papers/${previewPaper.id}`);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition text-xs shadow-lg shadow-brand-600/30"
              >
                <span>Open Student View</span>
                <Play className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Delete Paper Record?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete this paper? This action will be logged in the administrative audit records.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePaper(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-lg shadow-rose-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
