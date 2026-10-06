import React, { useState, useEffect } from 'react';
import {
  Flag,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ShieldAlert,
  ArrowLeft,
  Wrench,
  Activity,
  FileText,
  AlertTriangle,
  ChevronRight,
  Filter,
  Check,
  Edit2,
  Lightbulb,
  Phone,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Ban,
  Send,
  UserX
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../../components/common/UIComponents';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { adminFetch } from '../../utils/adminApi';

export const AdminReports: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'questions' | 'feedback' | 'technical' | 'audit'>('questions');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (location.pathname.includes('/feedback') || tab === 'feedback') {
      setActiveTab('feedback');
    } else if (tab === 'technical') {
      setActiveTab('technical');
    } else if (tab === 'audit') {
      setActiveTab('audit');
    } else if (tab === 'questions') {
      setActiveTab('questions');
    }
  }, [location.pathname, searchParams]);

  // Question Reports State
  const [qReports, setQReports] = useState<any[]>([]);
  const [qStatusFilter, setQStatusFilter] = useState<string>('All');
  const [qSearch, setQSearch] = useState<string>('');
  const [selectedQReport, setSelectedQReport] = useState<any | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [correctedAnswer, setCorrectedAnswer] = useState<number | undefined>(undefined);
  const [correctedExplanation, setCorrectedExplanation] = useState<string>('');

  // Student Feedback & Suggestions State
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [fbStatusFilter, setFbStatusFilter] = useState<string>('All');
  const [fbTypeFilter, setFbTypeFilter] = useState<string>('All');
  const [fbSearch, setFbSearch] = useState<string>('');
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
  const [fbModalOpen, setFbModalOpen] = useState(false);
  const [fbAdminNote, setFbAdminNote] = useState('');
  const [fbReplyModalOpen, setFbReplyModalOpen] = useState(false);
  const [fbReplyText, setFbReplyText] = useState('');
  const [fbBlockModalOpen, setFbBlockModalOpen] = useState(false);
  const [fbBlockReason, setFbBlockReason] = useState('Misconduct / Inappropriate language');
  const [fbActionLoading, setFbActionLoading] = useState(false);

  // Technical Reports State
  const [techReports, setTechReports] = useState<any[]>([]);
  const [techStatusFilter, setTechStatusFilter] = useState<string>('All');
  const [techSeverityFilter, setTechSeverityFilter] = useState<string>('All');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [auditActionFilter, setAuditActionFilter] = useState<string>('All');

  // Load Data
  useEffect(() => {
    fetchQuestionReports();
    fetchFeedbacks();
    fetchTechnicalReports();
    fetchAuditLogs();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await adminFetch('/api/reports/feedback?limit=100');
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks || []);
      }
    } catch {}
  };

  const fetchQuestionReports = async () => {
    try {
      const res = await adminFetch('/api/reports/question?limit=100');
      const data = await res.json();
      if (data.success) {
        setQReports(data.reports || []);
      }
    } catch {
      // Fallback
    }
  };

  const fetchTechnicalReports = async () => {
    try {
      const res = await adminFetch('/api/reports/technical?limit=100');
      const data = await res.json();
      if (data.success) {
        setTechReports(data.reports || []);
      }
    } catch {}
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await adminFetch('/api/audit?limit=100');
      const data = await res.json();
      if (data.success) {
        setAuditLogs(data.logs || []);
      }
    } catch {}
  };

  const handleOpenReview = (r: any) => {
    setSelectedQReport(r);
    setReviewNotes(r.adminNotes || '');
    setCorrectedAnswer(r.questionDetails?.correctAnswer ?? 0);
    setCorrectedExplanation(r.questionDetails?.explanation || '');
    setReviewModalOpen(true);
  };

  const handleUpdateQReportStatus = async (id: string, status: string) => {
    try {
      const body: any = { status, adminNotes: reviewNotes, adminEmail: 'admin@prepora.internal' };
      if (status === 'Resolved' && selectedQReport) {
        body.correctedAnswer = correctedAnswer;
        body.correctedExplanation = correctedExplanation;
      }

      const res = await adminFetch(`/api/reports/question/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        setReviewModalOpen(false);
        fetchQuestionReports();
        fetchAuditLogs();
      }
    } catch {
      alert('Failed to update report status.');
    }
  };

  const handleUpdateTechStatus = async (id: string, status: string) => {
    try {
      await adminFetch(`/api/reports/technical/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminEmail: 'admin@prepora.internal' })
      });
      fetchTechnicalReports();
      fetchAuditLogs();
    } catch {}
  };

  const handleUpdateFeedbackStatus = async (id: string, status: string, notes?: string) => {
    try {
      const res = await adminFetch(`/api/reports/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNotes: notes ?? fbAdminNote,
          adminEmail: 'admin@prepora.internal'
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchFeedbacks();
        fetchAuditLogs();
        setFbModalOpen(false);
      }
    } catch {
      alert('Failed to update feedback status.');
    }
  };

  const handleSendFeedbackReply = async (id: string, reply: string) => {
    if (!reply.trim()) {
      alert('Kripya reply text likhein.');
      return;
    }
    setFbActionLoading(true);
    try {
      const res = await adminFetch(`/api/reports/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Resolved',
          adminReply: reply.trim(),
          adminEmail: 'admin@prepora.internal'
        })
      });
      const data = await res.json();
      if (data.success) {
        setFbReplyModalOpen(false);
        setFbReplyText('');
        fetchFeedbacks();
        fetchAuditLogs();
        alert('Student ko reply safaltapoorvak bhej diya gaya hai!');
      } else {
        alert(data.message || 'Reply send karne me samasya aayi.');
      }
    } catch {
      alert('Server se judne me samasya aayi.');
    } finally {
      setFbActionLoading(false);
    }
  };

  const handleBlockStudentFromFeedback = async (id: string, reason: string) => {
    setFbActionLoading(true);
    try {
      const res = await adminFetch(`/api/reports/feedback/${id}/block-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          adminEmail: 'admin@prepora.internal'
        })
      });
      const data = await res.json();
      if (data.success) {
        setFbBlockModalOpen(false);
        fetchFeedbacks();
        fetchAuditLogs();
        alert(`Student ko safaltapoorvak BLOCK kar diya gaya hai! Iska active session turant band ho gaya hai aur is number se ab login nahi ho sakega.`);
      } else {
        alert(data.message || 'Block karne me samasya aayi.');
      }
    } catch {
      alert('Server se judne me samasya aayi.');
    } finally {
      setFbActionLoading(false);
    }
  };

  // Filtered Student Feedbacks
  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchStatus = fbStatusFilter === 'All' || fb.status === fbStatusFilter;
    const matchType = fbTypeFilter === 'All' || fb.type === fbTypeFilter;
    const matchSearch = !fbSearch ||
      fb.title?.toLowerCase().includes(fbSearch.toLowerCase()) ||
      fb.description?.toLowerCase().includes(fbSearch.toLowerCase()) ||
      fb.userName?.toLowerCase().includes(fbSearch.toLowerCase()) ||
      fb.userPhone?.toLowerCase().includes(fbSearch.toLowerCase()) ||
      fb.category?.toLowerCase().includes(fbSearch.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  // Filtered Question Reports
  const filteredQReports = qReports.filter(r => {
    const matchStatus = qStatusFilter === 'All' || r.status === qStatusFilter;
    const matchSearch = !qSearch ||
      r.questionId?.toLowerCase().includes(qSearch.toLowerCase()) ||
      r.reason?.toLowerCase().includes(qSearch.toLowerCase()) ||
      r.message?.toLowerCase().includes(qSearch.toLowerCase()) ||
      r.questionDetails?.question?.toLowerCase().includes(qSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Filtered Tech Reports
  const filteredTechReports = techReports.filter(r => {
    const matchStatus = techStatusFilter === 'All' || r.status === techStatusFilter;
    const matchSev = techSeverityFilter === 'All' || r.severity === techSeverityFilter;
    return matchStatus && matchSev;
  });

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter(log => {
    const matchAction = auditActionFilter === 'All' || log.action === auditActionFilter;
    const matchSearch = !auditSearch ||
      log.adminEmail?.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.entityId?.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action?.toLowerCase().includes(auditSearch.toLowerCase());
    return matchAction && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-slide-up text-slate-800 dark:text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              Quality Control & System Auditing
            </h1>
            <p className="text-xs text-slate-500">
              Review flagged questions, triage diagnostic technical issues, and inspect append-only audit trail
            </p>
          </div>
        </div>

        {/* Global Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'questions' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Reports ({qReports.filter(r => r.status === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'feedback' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Student Feedback & Mistakes</span>
            {feedbacks.filter(f => f.status === 'Pending').length > 0 && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded-full text-2xs font-extrabold">
                {feedbacks.filter(f => f.status === 'Pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'technical' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Diagnostics ({techReports.filter(r => r.status === 'Open').length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'audit' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin Audit Logs
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: QUESTION REPORTS (Task.md Section 5)                */}
      {/* ========================================================= */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['All', 'Pending', 'Under Review', 'Resolved', 'Rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setQStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    qStatusFilter === st
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={qSearch}
                onChange={e => setQSearch(e.target.value)}
                placeholder="Search reports or questions..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredQReports.length === 0 ? (
              <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">All Clean!</h3>
                <p className="text-xs text-slate-500">No question issues found matching this filter.</p>
              </div>
            ) : (
              filteredQReports.map(r => (
                <div
                  key={r.id}
                  className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {r.reason}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {r.questionDetails?.subject || 'Question'}: {r.questionDetails?.chapter || r.questionId}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-auto md:ml-0">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 dark:text-slate-100 font-medium line-clamp-2">
                      {r.questionDetails?.question || `Question ID: ${r.questionId}`}
                    </p>

                    {r.message && (
                      <p className="text-xs text-slate-600 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-200/60">
                        <strong className="text-slate-800 dark:text-slate-100">Student Comment:</strong> {r.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      r.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.status === 'Under Review'
                        ? 'bg-slate-200 text-slate-800'
                        : r.status === 'Rejected'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenReview(r)}
                      className="text-xs font-bold py-1.5 px-3 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" /> Review & Edit
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: STUDENT SUGGESTIONS & MISTAKES (Task & User Feature) */}
      {/* ========================================================= */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          {/* Controls & Filter Bar */}
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('All')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    fbTypeFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({feedbacks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('SUGGESTION')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    fbTypeFilter === 'SUGGESTION' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Suggestions ({feedbacks.filter(f => f.type === 'SUGGESTION').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('MISTAKE')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    fbTypeFilter === 'MISTAKE' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Mistakes ({feedbacks.filter(f => f.type === 'MISTAKE').length})</span>
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1">
                {(['All', 'Pending', 'In Review', 'Resolved'] as const).map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFbStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      fbStatusFilter === st
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={fbSearch}
                onChange={e => setFbSearch(e.target.value)}
                placeholder="Search student, phone, title..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Feedback Cards List */}
          <div className="space-y-3">
            {filteredFeedbacks.length === 0 ? (
              <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Koi Report Ya Suggestion Pending Nahi Hai!</h3>
                <p className="text-xs text-slate-500">Jab students koi naya feature request karenge ya mistake batayenge, vo yahan turant dikhega.</p>
              </div>
            ) : (
              filteredFeedbacks.map(fb => (
                <div
                  key={fb.id}
                  className="bg-white dark:bg-[#0c131a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {fb.type === 'SUGGESTION' ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Kuch Naya Add Karwana Hai</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Mistake / Galti Mili Hai</span>
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {fb.category || 'General'}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-lg text-xs font-extrabold ${
                          fb.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                            : fb.status === 'In Review'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                        }`}
                      >
                        {fb.status}
                      </span>
                    </div>

                    <span className="text-2xs text-slate-400 font-mono">
                      {new Date(fb.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">
                      {fb.title}
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed whitespace-pre-wrap">
                      {fb.description}
                    </p>
                  </div>

                  {/* Student Details & Page Context */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    <div className="flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-400">
                      <span>
                        Student: <strong className="text-slate-900 dark:text-white">{fb.userName || 'Anonymous Student'}</strong>
                      </span>

                      {fb.userPhone && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <Phone className="w-3.5 h-3.5" />
                          <a href={`tel:${fb.userPhone}`} className="hover:underline">
                            {fb.userPhone}
                          </a>
                          <a
                            href={`https://wa.me/${fb.userPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-1 text-2xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 font-bold hover:bg-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            WhatsApp
                          </a>
                        </span>
                      )}

                      {fb.userEmail && (
                        <span className="text-slate-500">
                          {fb.userEmail}
                        </span>
                      )}

                      {fb.pageUrl && (
                        <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                          <ExternalLink className="w-3 h-3" />
                          <a href={fb.pageUrl} target="_blank" rel="noreferrer" className="hover:underline">
                            Page: {fb.pageUrl}
                          </a>
                        </span>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Reply Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFeedback(fb);
                          setFbReplyText(fb.adminReply || '');
                          setFbReplyModalOpen(true);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 transition-colors ${
                          fb.adminReply
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 hover:bg-indigo-100'
                        }`}
                        title="Student ko direct reply bhejein"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{fb.adminReply ? 'Edit Reply' : '💬 Reply Dein'}</span>
                      </button>

                      {/* 1-Click Block Student */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFeedback(fb);
                          setFbBlockReason(`Misconduct / Inappropriate behavior in feedback: "${fb.title}"`);
                          setFbBlockModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 flex items-center gap-1 transition-colors"
                        title="Student ko permanently block karein"
                      >
                        <Ban className="w-3 h-3" />
                        <span>Block Student</span>
                      </button>

                      {fb.status !== 'In Review' && fb.status !== 'Resolved' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(fb.id, 'In Review')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          Mark In Review
                        </button>
                      )}

                      {fb.status !== 'Resolved' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFeedbackStatus(fb.id, 'Resolved')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        >
                          Mark Resolved
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFeedback(fb);
                          setFbAdminNote(fb.adminNotes || '');
                          setFbModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Admin Note</span>
                      </button>
                    </div>
                  </div>

                  {/* Admin Reply Display if present */}
                  {fb.adminReply && (
                    <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 space-y-1">
                      <div className="flex items-center justify-between text-2xs font-bold text-emerald-700 dark:text-emerald-300">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Admin Reply (Sent to Student)</span>
                        </span>
                        {fb.repliedAt && (
                          <span className="font-mono text-slate-500">{new Date(fb.repliedAt).toLocaleString()}</span>
                        )}
                      </div>
                      <p className="font-medium whitespace-pre-wrap">{fb.adminReply}</p>
                    </div>
                  )}

                  {/* Admin Notes Display if present */}
                  {fb.adminNotes && (
                    <div className="text-2xs bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/60 text-purple-800 dark:text-purple-300">
                      <strong>Admin Note:</strong> {fb.adminNotes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Admin Feedback Note Modal */}
      {fbModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-purple-600" />
              <span>Admin Note for: {selectedFeedback.title}</span>
            </h3>

            <p className="text-xs text-slate-500">
              Student: <strong>{selectedFeedback.userName}</strong> ({selectedFeedback.userPhone || selectedFeedback.userEmail || 'No contact info'})
            </p>

            <textarea
              rows={3}
              value={fbAdminNote}
              onChange={e => setFbAdminNote(e.target.value)}
              placeholder="Aapne is feedback par kya action liya..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFbModalOpen(false)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleUpdateFeedbackStatus(selectedFeedback.id, selectedFeedback.status, fbAdminNote)}
                className="text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Reply Modal (Direct Student Communication) */}
      {fbReplyModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span>Student Ko Reply Bhejein</span>
              </h3>
              <span className="text-2xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-600">
                {selectedFeedback.category || 'General'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-100">
                {selectedFeedback.userName || 'Student'} ({selectedFeedback.userPhone || selectedFeedback.userEmail || 'No Phone'})
              </div>
              <div className="font-semibold text-slate-600 dark:text-slate-300">
                "{selectedFeedback.title}"
              </div>
              <div className="text-2xs text-slate-500 line-clamp-2">
                {selectedFeedback.description}
              </div>
            </div>

            {/* Quick Canned Reply Buttons */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Quick Templates:</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Dhanyawad! Aapki batayi hui mistake ko verify karke update kar diya gaya hai.',
                  'Aapka suggestion note kar liya gaya hai, agle update me ise platform me add kar diya jayega.',
                  'Humne issue check kiya aur fix live deploy ho gaya hai. Kripya app refresh karein.',
                  'Dhanyawad feedback ke liye! PREPORA team lagatar platform behtar banane me lagi hai.'
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFbReplyText(txt)}
                    className="text-2xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-left"
                  >
                    {txt.substring(0, 35)}...
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Aapka Reply (Student ke liye):
              </label>
              <textarea
                rows={4}
                value={fbReplyText}
                onChange={e => setFbReplyText(e.target.value)}
                placeholder="Student ko bheja jaane wala reply likhein..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFbReplyModalOpen(false)}
                className="text-xs font-bold"
                disabled={fbActionLoading}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleSendFeedbackReply(selectedFeedback.id, fbReplyText)}
                disabled={fbActionLoading || !fbReplyText.trim()}
                className="text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{fbActionLoading ? 'Sending...' : 'Reply & Resolve'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Block Student Modal */}
      {fbBlockModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-6 max-w-md w-full border border-rose-300 dark:border-rose-900 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center">
                <Ban className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Student Block Confirmation
                </h3>
                <p className="text-xs text-rose-600 font-bold">1-Click Immediate Suspension</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2 text-rose-950 dark:text-rose-200">
              <div>
                Student Name: <strong>{selectedFeedback.userName || 'Unknown'}</strong>
              </div>
              <div>
                Mobile / Phone: <strong className="font-mono text-rose-600">{selectedFeedback.userPhone || 'No Phone (Will block user account)'}</strong>
              </div>
              <p className="text-[11px] leading-relaxed text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-900/40 p-2 rounded-lg">
                ⚠️ <strong>Kya hoga:</strong> Is student ka account turant <em>suspended</em> ho jayega, active sessions revoke ho jayenge, aur is mobile number se koi naya login ya OTP nahi ho sakega.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Block Karne Ka Kaaran (Reason):
              </label>
              <input
                type="text"
                value={fbBlockReason}
                onChange={e => setFbBlockReason(e.target.value)}
                placeholder="Misconduct, abusive language, or spam..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFbBlockModalOpen(false)}
                className="text-xs font-bold"
                disabled={fbActionLoading}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleBlockStudentFromFeedback(selectedFeedback.id, fbBlockReason)}
                disabled={fbActionLoading}
                className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>{fbActionLoading ? 'Blocking...' : 'Permanently Block Student'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SYSTEM TECHNICAL REPORTS (Task.md Section 10)      */}
      {/* ========================================================= */}
      {activeTab === 'technical' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Status:</span>
              {(['All', 'Open', 'Investigating', 'Resolved', 'Closed'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setTechStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    techStatusFilter === st
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Severity:</span>
              {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setTechSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    techSeverityFilter === sev
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTechReports.length === 0 ? (
              <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">System Healthy</h3>
                <p className="text-xs text-slate-500">No active technical bug reports logged.</p>
              </div>
            ) : (
              filteredTechReports.map(tr => (
                <div
                  key={tr.id}
                  className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        tr.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : tr.severity === 'High'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {tr.severity}
                      </span>
                      <strong className="text-slate-900 dark:text-white font-bold">{tr.reason}</strong>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">Route: <code>{tr.route}</code></span>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      {new Date(tr.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/70 font-mono">
                    {tr.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <div>
                      <span>Browser: {tr.context?.browser} • OS: {tr.context?.os} • Device: {tr.context?.deviceType} • Error ID: {tr.context?.errorId}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateTechStatus(tr.id, 'Investigating')}
                        className="px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-semibold"
                      >
                        Investigating
                      </button>
                      <button
                        onClick={() => handleUpdateTechStatus(tr.id, 'Resolved')}
                        className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleUpdateTechStatus(tr.id, 'Closed')}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200 font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ADMIN AUDIT LOGS (Task.md Section 9)               */}
      {/* ========================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Action Filter:</span>
              {(['All', 'Create', 'Edit', 'Change Answer', 'Bulk Edit', 'Import', 'Delete'] as const).map(act => (
                <button
                  key={act}
                  onClick={() => setAuditActionFilter(act)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    auditActionFilter === act
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={auditSearch}
                onChange={e => setAuditSearch(e.target.value)}
                placeholder="Search audit logs..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4">Admin</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No audit records found matching this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAuditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            log.action === 'Create'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.action === 'Delete'
                              ? 'bg-rose-100 text-rose-800'
                              : log.action.includes('Change')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-700 dark:text-slate-200">
                          {log.entityType} #{log.entityId}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {log.adminEmail}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate">
                          {log.beforeValue && log.afterValue ? (
                            <span>Modified entity parameters</span>
                          ) : log.metadata ? (
                            <span>{JSON.stringify(log.metadata)}</span>
                          ) : (
                            <span>Entity created/deleted</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Review & Edit Reported Question Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Review Question Report: ${selectedQReport?.questionId}`}
        maxWidth="max-w-2xl"
        footer={
          <div className="flex flex-wrap gap-2 w-full justify-between items-center">
            <button
              onClick={() => handleUpdateQReportStatus(selectedQReport?.id, 'Rejected')}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Reject Report
            </button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleUpdateQReportStatus(selectedQReport?.id, 'Under Review')}>
                Mark Under Review
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUpdateQReportStatus(selectedQReport?.id, 'Resolved')}
                className="font-bold bg-emerald-600 hover:bg-emerald-700"
              >
                Apply Correction & Resolve
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Student Flag</span>
            <div className="font-bold text-rose-700">{selectedQReport?.reason}</div>
            <p className="text-slate-600 mt-1 italic">"{selectedQReport?.message || 'No additional note'}"</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">Question Statement</label>
            <p className="p-3 bg-white dark:bg-[#0c131a] rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
              {selectedQReport?.questionDetails?.question}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">Correct Answer Index</label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCorrectedAnswer(idx)}
                  className={`p-2 rounded-xl border font-bold text-xs ${
                    correctedAnswer === idx
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Option {['A', 'B', 'C', 'D'][idx]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">Explanation</label>
            <textarea
              rows={3}
              value={correctedExplanation}
              onChange={e => setCorrectedExplanation(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-[#0c131a] rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">Academic Review Notes</label>
            <input
              type="text"
              value={reviewNotes}
              onChange={e => setReviewNotes(e.target.value)}
              placeholder="e.g. Verified sign convention in formula step 3"
              className="w-full p-2 bg-white dark:bg-[#0c131a] rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};