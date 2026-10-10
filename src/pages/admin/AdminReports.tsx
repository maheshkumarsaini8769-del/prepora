import React, { useState, useEffect, useMemo } from 'react';
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
  UserX,
  Bell,
  Trash2,
  Users,
  Megaphone,
  UserCheck
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../../components/common/UIComponents';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { adminFetch } from '../../utils/adminApi';

export const AdminReports: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'questions' | 'feedback' | 'technical' | 'audit' | 'notifications'>('questions');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (location.pathname.includes('/notifications') || tab === 'notifications') {
      setActiveTab('notifications');
    } else if (location.pathname.includes('/feedback') || tab === 'feedback') {
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

  // Chat Conversation View State (Grouped by student)
  const [feedbackViewMode, setFeedbackViewMode] = useState<'chat_threads' | 'all_items'>('chat_threads');
  const [activeChatThread, setActiveChatThread] = useState<any | null>(null);
  const [chatReplyInput, setChatReplyInput] = useState('');
  const [chatSending, setChatSending] = useState(false);

  // Broadcast & Student Notifications State
  const [adminNotifTitle, setAdminNotifTitle] = useState('');
  const [adminNotifMessage, setAdminNotifMessage] = useState('');
  const [adminNotifType, setAdminNotifType] = useState<'announcement' | 'test' | 'practice' | 'revision'>('announcement');
  const [adminNotifTarget, setAdminNotifTarget] = useState<'BROADCAST' | 'SPECIFIC_USER'>('BROADCAST');
  const [adminNotifPhone, setAdminNotifPhone] = useState('');
  const [adminNotifUrl, setAdminNotifUrl] = useState('');
  const [adminNotifSending, setAdminNotifSending] = useState(false);
  const [adminSentNotifs, setAdminSentNotifs] = useState<any[]>([]);
  const [adminNotifStats, setAdminNotifStats] = useState({ total: 0, broadcastCount: 0, targetedCount: 0 });

  // Technical Reports State
  const [techReports, setTechReports] = useState<any[]>([]);
  const [techStatusFilter, setTechStatusFilter] = useState<string>('All');
  const [techSeverityFilter, setTechSeverityFilter] = useState<string>('All');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [auditActionFilter, setAuditActionFilter] = useState<string>('All');

  // Group Feedbacks by Student into Interactive Chat Threads
  const studentChatThreads = useMemo(() => {
    const threadMap = new Map<string, any>();

    feedbacks.forEach((fb) => {
      const cleanPhone = fb.userPhone ? String(fb.userPhone).replace(/\D/g, '').slice(-10) : '';
      const key = cleanPhone || fb.userId || fb.userEmail || fb.id;

      if (!threadMap.has(key)) {
        threadMap.set(key, {
          studentKey: key,
          studentName: fb.userName || 'Student',
          studentPhone: fb.userPhone || '',
          studentEmail: fb.userEmail || '',
          messages: [],
          messageCount: 0,
          hasPending: false,
          latestMessage: fb,
          latestAdminReply: fb.adminReply || '',
          status: fb.status || 'Pending'
        });
      }

      const thread = threadMap.get(key)!;
      thread.messages.push(fb);
      thread.messageCount++;
      if (fb.status === 'Pending') thread.hasPending = true;
      if (new Date(fb.createdAt) > new Date(thread.latestMessage.createdAt)) {
        thread.latestMessage = fb;
        if (fb.adminReply) thread.latestAdminReply = fb.adminReply;
      }
    });

    return Array.from(threadMap.values())
      .map((thread: any) => {
        thread.messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return thread;
      })
      .sort((a: any, b: any) => {
        if (a.hasPending && !b.hasPending) return -1;
        if (!a.hasPending && b.hasPending) return 1;
        return new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime();
      });
  }, [feedbacks]);

  // Load Data
  useEffect(() => {
    fetchQuestionReports();
    fetchFeedbacks();
    fetchTechnicalReports();
    fetchAuditLogs();
    fetchAdminNotifications();
  }, []);

  const fetchAdminNotifications = async () => {
    try {
      const res = await adminFetch('/api/notifications/admin');
      const data = await res.json();
      if (data.success) {
        setAdminSentNotifs(data.notifications || []);
        setAdminNotifStats({
          total: data.total || 0,
          broadcastCount: data.broadcastCount || 0,
          targetedCount: data.targetedCount || 0
        });
      }
    } catch {}
  };

  const handleSendBroadcastNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNotifTitle.trim() || !adminNotifMessage.trim()) {
      alert('Please enter notification title and message.');
      return;
    }
    if (adminNotifTarget === 'SPECIFIC_USER' && !adminNotifPhone.trim()) {
      alert('Please enter student phone number.');
      return;
    }

    setAdminNotifSending(true);
    try {
      const res = await adminFetch('/api/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: adminNotifTitle.trim(),
          message: adminNotifMessage.trim(),
          type: adminNotifType,
          targetType: adminNotifTarget,
          targetPhone: adminNotifPhone.trim(),
          actionUrl: adminNotifUrl.trim(),
          adminEmail: 'admin@prepora.internal'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Notification sent successfully!');
        setAdminNotifTitle('');
        setAdminNotifMessage('');
        setAdminNotifUrl('');
        if (adminNotifTarget === 'SPECIFIC_USER') setAdminNotifPhone('');
        fetchAdminNotifications();
        fetchAuditLogs();
      } else {
        alert(data.message || 'Failed to send notification.');
      }
    } catch {
      alert('Failed to connect to server.');
    } finally {
      setAdminNotifSending(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    try {
      const res = await adminFetch(`/api/notifications/admin/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchAdminNotifications();
      }
    } catch {
      alert('Failed to delete notification.');
    }
  };

  const handleSendChatReply = async () => {
    if (!chatReplyInput.trim() || !activeChatThread) return;
    setChatSending(true);
    try {
      const cleanPhone = activeChatThread.studentPhone.replace(/\D/g, '').slice(-10);
      let res: Response;
      if (cleanPhone && cleanPhone.length === 10) {
        res = await adminFetch(`/api/feedback/student/${cleanPhone}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reply: chatReplyInput.trim(), adminEmail: 'admin@prepora.internal' })
        });
      } else {
        res = await adminFetch(`/api/reports/feedback/${activeChatThread.latestMessage.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Resolved', adminReply: chatReplyInput.trim(), adminEmail: 'admin@prepora.internal' })
        });
      }
      const data = await res.json();
      if (data.success) {
        const replyText = chatReplyInput.trim();
        setChatReplyInput('');
        fetchFeedbacks();
        fetchAuditLogs();

        activeChatThread.messages.forEach((m: any) => {
          m.adminReply = replyText;
          m.status = 'Resolved';
          m.repliedAt = new Date().toISOString();
        });
        activeChatThread.latestAdminReply = replyText;
        activeChatThread.status = 'Resolved';
        activeChatThread.hasPending = false;
        setActiveChatThread({ ...activeChatThread });
        alert('Reply delivered to student and notification dispatched!');
      } else {
        alert(data.message || 'Failed to send reply.');
      }
    } catch {
      alert('Failed to connect to server.');
    } finally {
      setChatSending(false);
    }
  };

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
      alert('Please enter reply text.');
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
        alert('Reply sent successfully to student!');
      } else {
        alert(data.message || 'Failed to send reply.');
      }
    } catch {
      alert('Failed to connect to server.');
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
        alert(`Student has been successfully BLOCKED! Their active session has been terminated and they can no longer log in.`);
      } else {
        alert(data.message || 'Failed to block student.');
      }
    } catch {
      alert('Failed to connect to server.');
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

  // Filtered Chat Threads (Grouped by Student)
  const filteredChatThreads = useMemo(() => {
    return studentChatThreads.filter(thread => {
      if (fbStatusFilter === 'Pending' && !thread.hasPending) return false;
      if (fbStatusFilter === 'Resolved' && thread.hasPending) return false;

      if (fbTypeFilter !== 'All') {
        const hasType = thread.messages.some((m: any) => m.type === fbTypeFilter);
        if (!hasType) return false;
      }

      if (fbSearch.trim()) {
        const query = fbSearch.toLowerCase();
        const matchName = thread.studentName?.toLowerCase().includes(query);
        const matchPhone = thread.studentPhone?.toLowerCase().includes(query);
        const matchMsg = thread.messages.some((m: any) =>
          m.title?.toLowerCase().includes(query) ||
          m.description?.toLowerCase().includes(query) ||
          m.category?.toLowerCase().includes(query)
        );
        if (!matchName && !matchPhone && !matchMsg) return false;
      }

      return true;
    });
  }, [studentChatThreads, fbStatusFilter, fbTypeFilter, fbSearch]);

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
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'questions' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Question Reports ({qReports.filter(r => r.status === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'feedback' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Student Feedback & Chat</span>
            {feedbacks.filter(f => f.status === 'Pending').length > 0 && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded-full text-2xs font-extrabold">
                {feedbacks.filter(f => f.status === 'Pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'notifications' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span>Send Notifications</span>
            {adminNotifStats.total > 0 && (
              <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-2xs font-extrabold">
                {adminNotifStats.total}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'technical' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            System Diagnostics ({techReports.filter(r => r.status === 'Open').length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'audit' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
      {/* ========================================================= */}
      {/* TAB: STUDENT SUGGESTIONS & MISTAKES (Task & User Feature) */}
      {/* ========================================================= */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          {/* Controls & Filter Bar */}
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Mode Switcher: Grouped Chat Threads vs Individual Tickets */}
              <div className="flex items-center gap-1 p-1 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <button
                  type="button"
                  onClick={() => setFeedbackViewMode('chat_threads')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    feedbackViewMode === 'chat_threads'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Threads ({studentChatThreads.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackViewMode('all_items')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    feedbackViewMode === 'all_items'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>All Tickets ({feedbacks.length})</span>
                </button>
              </div>

              {/* Type Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('All')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    fbTypeFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('SUGGESTION')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    fbTypeFilter === 'SUGGESTION' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Suggestions</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFbTypeFilter('MISTAKE')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                    fbTypeFilter === 'MISTAKE' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Mistakes</span>
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
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                placeholder="Search student, phone, message..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* VIEW MODE 1: CHAT CONVERSATIONS GROUPED BY STUDENT */}
          {feedbackViewMode === 'chat_threads' ? (
            <div className="space-y-3">
              {filteredChatThreads.length === 0 ? (
                <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">No Student Conversations Found!</h3>
                  <p className="text-xs text-slate-500">When students submit reports or suggestions, they will be combined by student phone here.</p>
                </div>
              ) : (
                filteredChatThreads.map((thread) => (
                  <div
                    key={thread.studentKey}
                    className="bg-white dark:bg-[#0c131a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 hover:border-indigo-300 dark:hover:border-indigo-900 transition-all"
                  >
                    {/* Top Student Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                          {(thread.studentName || 'S').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white">
                              {thread.studentName || 'Student'}
                            </h4>
                            {/* Message count badge: "2 Messages" */}
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 shadow-2xs">
                              <MessageSquare className="w-3 h-3" />
                              <span>{thread.messageCount} {thread.messageCount === 1 ? 'Message' : 'Messages'}</span>
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-lg text-xs font-extrabold ${
                                thread.hasPending
                                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                              }`}
                            >
                              {thread.hasPending ? 'Pending Response' : 'Resolved'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                            {thread.studentPhone && (
                              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                                <Phone className="w-3.5 h-3.5" />
                                <a href={`tel:${thread.studentPhone}`} className="hover:underline font-mono">
                                  {thread.studentPhone}
                                </a>
                                <a
                                  href={`https://wa.me/${thread.studentPhone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="ml-1 text-2xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 font-bold hover:bg-emerald-200"
                                >
                                  WhatsApp
                                </a>
                              </span>
                            )}
                            {thread.studentEmail && (
                              <span className="text-slate-400">{thread.studentEmail}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-2xs text-slate-400 font-mono block">
                          Latest: {new Date(thread.latestMessage.createdAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Latest Message Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-2xs font-extrabold ${
                          thread.latestMessage.type === 'MISTAKE'
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'
                        }`}>
                          {thread.latestMessage.type === 'MISTAKE' ? '⚠️ Mistake' : '💡 Suggestion'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          "{thread.latestMessage.title}"
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        {thread.latestMessage.description}
                      </p>
                    </div>

                    {/* Multi-message indicator */}
                    {thread.messageCount > 1 && (
                      <div className="text-2xs bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300 px-3 py-2 rounded-xl border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Student ne is thread me <strong>{thread.messageCount} messages/reports</strong> bheje hain.</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChatThread(thread);
                            setChatReplyInput('');
                          }}
                          className="font-bold underline hover:text-indigo-950 dark:hover:text-white"
                        >
                          Pura Chat Dekhein &rarr;
                        </button>
                      </div>
                    )}

                    {/* Admin Reply Preview */}
                    {thread.latestAdminReply && (
                      <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Admin Reply (Sent):</strong> {thread.latestAdminReply}
                        </div>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-2xs text-slate-400">
                        Thread ID: <code className="font-mono">{thread.studentKey}</code>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFeedback(thread.latestMessage);
                            setFbBlockReason(`Misconduct in feedback chat: "${thread.latestMessage.title}"`);
                            setFbBlockModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Block</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveChatThread(thread);
                            setChatReplyInput('');
                          }}
                          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>💬 Open Chat ({thread.messageCount})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* VIEW MODE 2: INDIVIDUAL TICKETS LIST */
            <div className="space-y-3">
              {filteredFeedbacks.length === 0 ? (
                <div className="bg-white dark:bg-[#0c131a] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">No Pending Reports or Suggestions!</h3>
                  <p className="text-xs text-slate-500">When students request features or report errors, they will appear here immediately.</p>
                </div>
              ) : (
                filteredFeedbacks.map(fb => (
                  <div
                    key={fb.id}
                    className="bg-white dark:bg-[#0c131a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {fb.type === 'SUGGESTION' ? (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Feature Suggestion</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Reported Mistake / Error</span>
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

                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">
                        {fb.title}
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed whitespace-pre-wrap">
                        {fb.description}
                      </p>
                    </div>

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
                            >
                              WhatsApp
                            </a>
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

                      <div className="flex items-center gap-1.5 flex-wrap">
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
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{fb.adminReply ? 'Edit Reply' : '💬 Reply Dein'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFeedback(fb);
                            setFbBlockReason(`Misconduct / Inappropriate behavior in feedback: "${fb.title}"`);
                            setFbBlockModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 flex items-center gap-1 transition-colors"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Block</span>
                        </button>

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

                    {fb.adminNotes && (
                      <div className="text-2xs bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/60 text-purple-800 dark:text-purple-300">
                        <strong>Admin Note:</strong> {fb.adminNotes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: BROADCAST & STUDENT NOTIFICATIONS                    */}
      {/* ========================================================= */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Total Notifications</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{adminNotifStats.total}</h3>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">All Students Broadcasts</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{adminNotifStats.broadcastCount}</h3>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xs font-bold uppercase tracking-wider text-slate-400">Direct Student Messages</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{adminNotifStats.targetedCount}</h3>
              </div>
            </div>
          </div>

          {/* Broadcast Composer Form */}
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-500" />
                  <span>Send Notification / Announcement</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send real-time alerts to all students or message a specific student by phone number.
                </p>
              </div>
            </div>

            <form onSubmit={handleSendBroadcastNotification} className="space-y-4">
              {/* Target Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Target Audience:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAdminNotifTarget('BROADCAST')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      adminNotifTarget === 'BROADCAST'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Megaphone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-black">All Registered Students (Broadcast)</div>
                      <div className="text-2xs text-slate-500 mt-0.5">Every student will receive this notification in their notification bell icon.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdminNotifTarget('SPECIFIC_USER')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      adminNotifTarget === 'SPECIFIC_USER'
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Phone className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-black">Specific Student (By Phone)</div>
                      <div className="text-2xs text-slate-500 mt-0.5">Target a specific student by entering their 10-digit mobile number.</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Specific Phone Input */}
              {adminNotifTarget === 'SPECIFIC_USER' && (
                <div className="animate-in fade-in">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Student Mobile Number (10 digits): <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={adminNotifPhone}
                      onChange={e => setAdminNotifPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Notification Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Notification Category:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'announcement', label: 'General Announcement', icon: Megaphone },
                    { id: 'test', label: 'Test / Mock Alert', icon: Clock },
                    { id: 'practice', label: 'Practice & Study Goal', icon: Activity },
                    { id: 'revision', label: 'Revision & Formulas', icon: Sparkles }
                  ].map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setAdminNotifType(cat.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          adminNotifType === cat.id
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Message */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Notification Title: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={adminNotifTitle}
                    onChange={e => setAdminNotifTitle(e.target.value)}
                    placeholder="e.g. 📢 Important: Full-Length JEE Main Mock Test is now LIVE!"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Notification Message: <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={adminNotifMessage}
                    onChange={e => setAdminNotifMessage(e.target.value)}
                    placeholder="Write detailed message for students..."
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Action URL (Optional):
                  </label>
                  <input
                    type="text"
                    value={adminNotifUrl}
                    onChange={e => setAdminNotifUrl(e.target.value)}
                    placeholder="e.g. /tests or /practice or /formula-sheet"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <p className="text-2xs text-slate-400 mt-0.5">Students clicking the notification will be navigated directly to this page.</p>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={adminNotifSending}
                  className="font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{adminNotifSending ? 'Sending Notification...' : 'Send Notification Now'}</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Sent Notifications History */}
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Sent Notifications History ({adminSentNotifs.length})</span>
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAdminNotifications}
                className="text-xs font-bold cursor-pointer"
              >
                Refresh List
              </Button>
            </div>

            {adminSentNotifs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No notifications sent yet. Use the form above to send an announcement.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {adminSentNotifs.map(n => (
                  <div key={n.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                          n.targetType === 'BROADCAST'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300'
                        }`}>
                          {n.targetType === 'BROADCAST' ? 'All Students' : `User: ${n.targetPhone || n.targetUserId}`}
                        </span>

                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                          {n.type}
                        </span>

                        <span className="text-2xs text-slate-400 font-mono">
                          {new Date(n.createdAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <div className="font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-2xs leading-relaxed max-w-2xl">
                        {n.message}
                      </p>

                      {n.actionUrl && (
                        <div className="text-2xs text-brand-600 dark:text-brand-400">
                          Target URL: <code className="font-mono">{n.actionUrl}</code>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteNotification(n.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors shrink-0 cursor-pointer"
                      title="Delete Notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Chat Thread Modal (Grouped Conversation) */}
      {activeChatThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0c141e] rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                  {(activeChatThread.studentName || 'S').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {activeChatThread.studentName || 'Student'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {activeChatThread.messageCount} {activeChatThread.messageCount === 1 ? 'Message' : 'Messages'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-2xs font-extrabold ${
                      activeChatThread.hasPending
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {activeChatThread.hasPending ? 'Pending Response' : 'Resolved'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-2xs text-slate-500 mt-0.5 flex-wrap">
                    {activeChatThread.studentPhone && (
                      <span className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
                        <Phone className="w-3 h-3" />
                        {activeChatThread.studentPhone}
                        <a
                          href={`https://wa.me/${activeChatThread.studentPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 font-bold hover:bg-emerald-200"
                        >
                          WhatsApp
                        </a>
                      </span>
                    )}
                    {activeChatThread.studentEmail && (
                      <span>{activeChatThread.studentEmail}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveChatThread(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable Chat Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40 dark:bg-slate-950/30">
              <div className="text-center py-1">
                <span className="text-[11px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  Chat conversation with {activeChatThread.studentName} ({activeChatThread.messageCount} reports received)
                </span>
              </div>

              {activeChatThread.messages.map((m: any, idx: number) => (
                <div key={m.id || idx} className="space-y-3">
                  {/* Student Message (Left Bubble) */}
                  <div className="flex items-start gap-2 max-w-[88%]">
                    <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-2xs flex items-center justify-center shrink-0 mt-1">
                      {(activeChatThread.studentName || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div className="bg-white dark:bg-[#121c27] text-slate-900 dark:text-slate-100 p-3.5 rounded-2xl rounded-tl-xs border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between gap-3 text-2xs">
                        <span className={`font-bold px-1.5 py-0.5 rounded ${
                          m.type === 'MISTAKE'
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {m.type === 'MISTAKE' ? '⚠️ Mistake Report' : '💡 Feature Suggestion'} · {m.category || 'General'}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {new Date(m.createdAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {m.title}
                      </div>
                      <p className="text-xs whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-200">
                        {m.description}
                      </p>
                      {m.pageUrl && (
                        <div className="pt-1 text-2xs text-brand-600 dark:text-brand-400 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <a href={m.pageUrl} target="_blank" rel="noreferrer" className="hover:underline">
                            Page: {m.pageUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Admin Reply (Right Bubble) */}
                  {m.adminReply && (
                    <div className="flex items-start justify-end gap-2 ml-auto max-w-[88%]">
                      <div className="bg-emerald-600 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-xs space-y-1">
                        <div className="flex items-center justify-between gap-3 text-2xs text-emerald-100">
                          <span className="font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                            <span>Prepora Support (Admin)</span>
                          </span>
                          {m.repliedAt && (
                            <span className="font-mono text-emerald-200 text-[10px]">
                              {new Date(m.repliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <p className="text-xs whitespace-pre-wrap leading-relaxed font-medium">
                          {m.adminReply}
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-black text-2xs flex items-center justify-center shrink-0 mt-1">
                        A
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Response Templates */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quick Reply Chips:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Thank you! The reported mistake has been verified and updated.',
                  'Your suggestion has been noted and will be included in the upcoming platform update.',
                  'We checked the issue and deployed the fix. Please refresh your page!',
                  'Thanks for reaching out! Team Prepora is actively working on this.'
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setChatReplyInput(txt)}
                    className="text-2xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {txt.substring(0, 38)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer: Live Reply Box */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c141e] space-y-2">
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={chatReplyInput}
                  onChange={e => setChatReplyInput(e.target.value)}
                  placeholder={`Reply to ${activeChatThread.studentName || 'student'} (Notification will be sent instantly)...`}
                  className="flex-1 p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
                <Button
                  type="button"
                  onClick={handleSendChatReply}
                  disabled={chatSending || !chatReplyInput.trim()}
                  className="px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 rounded-xl shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-[10px]">{chatSending ? 'Sending...' : 'Send'}</span>
                </Button>
              </div>
              <p className="text-[10px] text-slate-400">
                ⚡ Sending this reply automatically marks all pending feedback in this thread as Resolved and delivers a live notification to the student's notification bell.
              </p>
            </div>
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
                  'Thank you! The reported mistake has been verified and updated.',
                  'Your suggestion has been noted and will be included in the upcoming platform update.',
                  'We verified the issue and deployed the fix. Please refresh your page.',
                  'Thank you for your valuable feedback! The Prepora team is continuously working to improve your experience.'
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
                Your Reply (For Student):
              </label>
              <textarea
                rows={4}
                value={fbReplyText}
                onChange={e => setFbReplyText(e.target.value)}
                placeholder="Write the reply message to be sent to the student..."
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
                ⚠️ <strong>Consequences:</strong> This student's account will be immediately <em>suspended</em>, active sessions revoked, and all future login attempts from this number will be blocked.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Suspension Reason:
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