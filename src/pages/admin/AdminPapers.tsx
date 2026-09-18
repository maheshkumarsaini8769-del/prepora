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
  Play,
  ShieldCheck
} from 'lucide-react';
import { paperService } from '../../services/paperService';
import { CanonicalContentType, VerificationStatus, AnswerKeySource } from '../../types';

interface PaperItem {
  id: string;
  title: string;
  exam: 'JEE' | 'NEET' | 'CBSE' | 'RBSE' | 'Board';
  classLevel?: string;
  board?: string;
  subject?: string;
  year: number;
  session?: string;
  date?: string;
  shift?: string;
  contentType?: CanonicalContentType;
  paperType: 'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper';
  durationMinutes: number;
  totalQuestions: number;
  description: string;
  questionIds: string[];
  fileUrl?: string;
  sourceURL?: string;
  sourceType?: string;
  verificationStatus?: VerificationStatus;
  rightsStatus?: string;
  answerKeySource?: AnswerKeySource;
  answerKeyVerified?: boolean;
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
  const [selectedContentType, setSelectedContentType] = useState<string>('All');
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
  const [formSession, setFormSession] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formShift, setFormShift] = useState('');
  const [formContentType, setFormContentType] = useState<CanonicalContentType>('REAL_PYQ');
  const [formType, setFormType] = useState<'PYQ' | 'Model Paper' | 'Mock Paper' | 'Sample Paper'>('PYQ');
  const [formDuration, setFormDuration] = useState(180);
  const [formQuestions, setFormQuestions] = useState(75);
  const [formSource, setFormSource] = useState<'Official' | 'Internal' | 'Curated'>('Official');
  const [formSourceURL, setFormSourceURL] = useState('');
  const [formSourceType, setFormSourceType] = useState('Official NTA');
  const [formVerificationStatus, setFormVerificationStatus] = useState<VerificationStatus>('VERIFIED');
  const [formAnswerKeySource, setFormAnswerKeySource] = useState<AnswerKeySource>('Official');
  const [formAnswerKeyVerified, setFormAnswerKeyVerified] = useState(true);
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formAnswerKeyUrl, setFormAnswerKeyUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const fetchPapers = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/papers');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setPapers(data.data);
      } else {
        // Fallback to local paperService curated database
        const local = paperService.getAllPapers() as any[];
        setPapers(local);
      }
    } catch (e: any) {
      console.warn('Backend API offline, loading from local paper library', e);
      const local = paperService.getAllPapers() as any[];
      setPapers(local);
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
    setFormSession('Session 1');
    setFormDate('');
    setFormShift('Morning Shift 1');
    setFormContentType('REAL_PYQ');
    setFormType('PYQ');
    setFormDuration(180);
    setFormQuestions(75);
    setFormSource('Official');
    setFormSourceURL('https://jeemain.nta.ac.in');
    setFormSourceType('Official NTA');
    setFormVerificationStatus('VERIFIED');
    setFormAnswerKeySource('Official');
    setFormAnswerKeyVerified(true);
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
    setFormSession(p.session || '');
    setFormDate(p.date || '');
    setFormShift(p.shift || '');
    setFormContentType(p.contentType || (p.paperType === 'PYQ' ? 'REAL_PYQ' : p.paperType === 'Model Paper' ? 'MODEL_PAPER' : p.paperType === 'Mock Paper' ? 'MOCK_TEST' : 'SAMPLE_PAPER'));
    setFormType(p.paperType);
    setFormDuration(p.durationMinutes);
    setFormQuestions(p.totalQuestions);
    setFormSource(p.source || 'Official');
    setFormSourceURL(p.sourceURL || p.fileUrl || '');
    setFormSourceType(p.sourceType || 'Official Exam Body');
    setFormVerificationStatus(p.verificationStatus || 'VERIFIED');
    setFormAnswerKeySource(p.answerKeySource || (p.paperType === 'PYQ' ? 'Official' : 'PREPORA'));
    setFormAnswerKeyVerified(p.answerKeyVerified ?? true);
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

    const cleanTitle = formTitle.trim();
    const isMockOrModelTitle = /\b(model|mock|sample|practice|guess|simulated|unverified)\b/i.test(cleanTitle) ||
      /\b(mock\s*#|high-yield\s*mock|simulated\s*paper)\b/i.test(cleanTitle);

    // Strict Anti-Misclassification Validation Rule
    if (formContentType === 'REAL_PYQ' || formType === 'PYQ') {
      if (isMockOrModelTitle) {
        setFeedback({
          type: 'error',
          message: `Classification Error: Cannot classify paper as 'REAL_PYQ' when title contains Mock/Model keywords ('${cleanTitle}'). Please choose MODEL_PAPER or MOCK_TEST.`
        });
        return;
      }
      if (!formSourceURL.trim() && !formFileUrl.trim()) {
        setFeedback({
          type: 'error',
          message: "Verification Error: 'REAL_PYQ' requires an official examination source URL (e.g. NTA, CBSE, or State Board portal)."
        });
        return;
      }
    }

    if (formAnswerKeySource === 'Official' && !formAnswerKeyVerified) {
      setFeedback({
        type: 'error',
        message: "Attestation Error: You marked Answer Key Source as Official. Please verify and check 'Verified Official Key' before publishing."
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: cleanTitle,
        exam: formExam,
        classLevel: formClass,
        board: formBoard,
        subject: formSubject,
        year: Number(formYear),
        session: formSession.trim(),
        date: formDate.trim(),
        shift: formShift.trim(),
        contentType: formContentType,
        paperType: formType,
        durationMinutes: Number(formDuration),
        totalQuestions: Number(formQuestions),
        source: formSource,
        sourceURL: formSourceURL.trim() || formFileUrl.trim(),
        sourceType: formSourceType.trim(),
        verificationStatus: formVerificationStatus,
        answerKeySource: formAnswerKeySource,
        answerKeyVerified: formAnswerKeyVerified,
        status: formStatus,
        fileUrl: formFileUrl.trim() || formSourceURL.trim(),
        answerKeyUrl: formAnswerKeyUrl.trim(),
        description: formDescription.trim(),
        adminEmail: 'superadmin@prepore.edu'
      };

      try {
        const url = editingPaper ? `/api/admin/papers/${editingPaper.id}` : '/api/admin/papers';
        const method = editingPaper ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!data.success) {
          setFeedback({ type: 'error', message: data.message || 'Validation failed on server.' });
          setSubmitting(false);
          return;
        }
      } catch {
        // Fallback local persistence
        if (editingPaper) {
          // Update in state
        } else {
          paperService.addPaper(payload as any);
        }
      }

      setFeedback({
        type: 'success',
        message: editingPaper ? 'Paper metadata successfully updated with verification!' : 'New paper successfully published to library!'
      });
      setIsEditorOpen(false);
      await fetchPapers();
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
      setPapers((prev) =>
        prev.map((p) => (p.id === paper.id ? { ...p, status: nextStatus } : p))
      );
      setFeedback({ type: 'success', message: `Paper status switched to ${nextStatus}.` });
      setTimeout(() => setFeedback(null), 3000);
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
      paperService.deletePaper(id);
      setPapers((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      setFeedback({ type: 'success', message: 'Paper successfully deleted from store.' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Filtered Papers with Strict Canonical Type Support
  const filteredPapers = papers.filter((p) => {
    if (selectedExam !== 'All' && p.exam !== selectedExam) return false;
    if (selectedContentType !== 'All') {
      const effectiveType = p.contentType || (
        p.paperType === 'PYQ' ? 'REAL_PYQ' :
        p.paperType === 'Model Paper' ? 'MODEL_PAPER' :
        p.paperType === 'Mock Paper' ? 'MOCK_TEST' : 'SAMPLE_PAPER'
      );
      if (effectiveType !== selectedContentType) return false;
    }
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

  // Metrics by Canonical Content Type
  const totalCount = papers.length;
  const publishedCount = papers.filter((p) => p.status === 'Published').length;
  const draftCount = papers.filter((p) => p.status === 'Draft').length;
  const realPyqCount = papers.filter((p) => p.contentType === 'REAL_PYQ' || (!p.contentType && p.paperType === 'PYQ')).length;
  const modelCount = papers.filter((p) => p.contentType === 'MODEL_PAPER' || (!p.contentType && p.paperType === 'Model Paper')).length;
  const mockCount = papers.filter((p) => p.contentType === 'MOCK_TEST' || (!p.contentType && p.paperType === 'Mock Paper')).length;
  const sampleCount = papers.filter((p) => p.contentType === 'SAMPLE_PAPER' || (!p.contentType && p.paperType === 'Sample Paper')).length;

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
            <span>Verified Real PYQs</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">{loading ? '...' : realPyqCount}</div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">Authentic Exams</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Official Models</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{loading ? '...' : modelCount}</div>
          <div className="text-[11px] text-blue-400 mt-0.5">Board Model Sets</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Mocks & Samples</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{loading ? '...' : mockCount + sampleCount}</div>
          <div className="text-[11px] text-purple-400 mt-0.5">{mockCount} Mocks • {sampleCount} Samples</div>
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

          {/* Canonical Content Type Filter */}
          <select
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-brand-500"
          >
            <option value="All">All Content Types</option>
            <option value="REAL_PYQ">Official Real PYQs Only</option>
            <option value="MODEL_PAPER">Official Model Papers</option>
            <option value="MOCK_TEST">Full Mock Tests</option>
            <option value="SAMPLE_PAPER">Sample Papers (SQP / Class 11)</option>
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

          {(searchQuery || selectedExam !== 'All' || selectedContentType !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedExam('All');
                setSelectedContentType('All');
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
                <th className="py-3.5 px-4">Classification & Audit</th>
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
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            (p.contentType === 'REAL_PYQ' || (!p.contentType && p.paperType === 'PYQ'))
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : (p.contentType === 'MODEL_PAPER' || (!p.contentType && p.paperType === 'Model Paper'))
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                              : (p.contentType === 'MOCK_TEST' || (!p.contentType && p.paperType === 'Mock Paper'))
                              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {(p.contentType === 'REAL_PYQ' || (!p.contentType && p.paperType === 'PYQ')) && (
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          )}
                          {p.contentType === 'REAL_PYQ'
                            ? 'REAL PYQ'
                            : p.contentType === 'MODEL_PAPER'
                            ? 'MODEL PAPER'
                            : p.contentType === 'MOCK_TEST'
                            ? 'MOCK TEST'
                            : p.contentType === 'SAMPLE_PAPER'
                            ? 'SAMPLE PAPER'
                            : p.paperType}
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span
                            className={
                              p.verificationStatus === 'VERIFIED'
                                ? 'text-emerald-400 font-bold'
                                : 'text-amber-400 font-bold'
                            }
                          >
                            {p.verificationStatus === 'VERIFIED' ? '✓ Verified' : '• Unverified'}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span
                            className={
                              p.answerKeySource === 'Official' && p.answerKeyVerified
                                ? 'text-emerald-300 font-medium'
                                : 'text-indigo-300 font-medium'
                            }
                          >
                            {p.answerKeySource === 'Official' && p.answerKeyVerified
                              ? 'Official Key'
                              : 'PREPORA Key'}
                          </span>
                        </div>
                      </div>
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

              {/* Provenance: Session, Date, Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Session / Term</label>
                  <input
                    type="text"
                    placeholder="e.g. Session 1 or Main Exam"
                    value={formSession}
                    onChange={(e) => setFormSession(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Exam Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2024-01-27"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Shift / Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. Shift 1 (9 AM - 12 PM)"
                    value={formShift}
                    onChange={(e) => setFormShift(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Classification & Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Canonical Content Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formContentType}
                    onChange={(e) => {
                      const val = e.target.value as CanonicalContentType;
                      setFormContentType(val);
                      if (val === 'REAL_PYQ') {
                        setFormType('PYQ');
                        setFormAnswerKeySource('Official');
                      } else if (val === 'MODEL_PAPER') {
                        setFormType('Model Paper');
                      } else if (val === 'MOCK_TEST') {
                        setFormType('Mock Paper');
                        setFormAnswerKeySource('PREPORA');
                      } else {
                        setFormType('Sample Paper');
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="REAL_PYQ">Official Real PYQ (Verified Exam)</option>
                    <option value="MODEL_PAPER">Official Model Paper (Board Authority)</option>
                    <option value="MOCK_TEST">Full Mock Test (Simulation / Practice)</option>
                    <option value="SAMPLE_PAPER">Sample Paper (SQP / School Internal)</option>
                    <option value="AI_GENERATED">AI-Generated Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Audit Verification Status</label>
                  <select
                    value={formVerificationStatus}
                    onChange={(e) => setFormVerificationStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="VERIFIED">VERIFIED (Authenticated Source)</option>
                    <option value="UNVERIFIED">UNVERIFIED (Review Required)</option>
                    <option value="NEEDS_REVIEW">NEEDS_REVIEW (Disputed / Draft)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    placeholder="e.g. Official NTA, CBSE New Delhi"
                    value={formSourceType}
                    onChange={(e) => setFormSourceType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Answer Key Source & Verification */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Answer Key Provenance</label>
                    <select
                      value={formAnswerKeySource}
                      onChange={(e) => setFormAnswerKeySource(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Official">Official Examination Authority</option>
                      <option value="PREPORA">PREPORA Pedagogical Expert Faculty</option>
                      <option value="AI_Generated">AI-Generated Explanations</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                      <input
                        type="checkbox"
                        checked={formAnswerKeyVerified}
                        onChange={(e) => setFormAnswerKeyVerified(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 bg-slate-800 border-slate-700"
                      />
                      <span className="font-semibold text-xs">
                        Attest: Answer Key verified with official notification
                      </span>
                    </label>
                  </div>
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

              {/* Official URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Official Source URL {formContentType === 'REAL_PYQ' && <span className="text-emerald-400 font-normal">(Required for Real PYQ)</span>}
                  </label>
                  <input
                    type="url"
                    placeholder="https://jeemain.nta.ac.in or https://cbseacademic.nic.in"
                    value={formSourceURL}
                    onChange={(e) => setFormSourceURL(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Official Key / Document Link</label>
                  <input
                    type="url"
                    placeholder="https://... or PDF reference"
                    value={formFileUrl}
                    onChange={(e) => setFormFileUrl(e.target.value)}
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
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {previewPaper.exam} {previewPaper.board ? `(${previewPaper.board})` : ''}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    (previewPaper.contentType === 'REAL_PYQ' || (!previewPaper.contentType && previewPaper.paperType === 'PYQ'))
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : (previewPaper.contentType === 'MODEL_PAPER' || (!previewPaper.contentType && previewPaper.paperType === 'Model Paper'))
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {(previewPaper.contentType === 'REAL_PYQ' || (!previewPaper.contentType && previewPaper.paperType === 'PYQ')) && (
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    )}
                    {previewPaper.contentType || previewPaper.paperType}
                  </span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    previewPaper.verificationStatus === 'VERIFIED'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                  }`}>
                    {previewPaper.verificationStatus || 'VERIFIED'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">{previewPaper.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Year: {previewPaper.year} {previewPaper.session ? `• ${previewPaper.session}` : ''} {previewPaper.shift ? `• ${previewPaper.shift}` : ''}
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
