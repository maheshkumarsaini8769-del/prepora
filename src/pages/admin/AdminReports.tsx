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
  Edit2
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../../components/common/UIComponents';
import { Link } from 'react-router-dom';

export const AdminReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'technical' | 'audit'>('questions');

  // Question Reports State
  const [qReports, setQReports] = useState<any[]>([]);
  const [qStatusFilter, setQStatusFilter] = useState<string>('All');
  const [qSearch, setQSearch] = useState<string>('');
  const [selectedQReport, setSelectedQReport] = useState<any | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [correctedAnswer, setCorrectedAnswer] = useState<number | undefined>(undefined);
  const [correctedExplanation, setCorrectedExplanation] = useState<string>('');

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
    fetchTechnicalReports();
    fetchAuditLogs();
  }, []);

  const fetchQuestionReports = async () => {
    try {
      const res = await fetch('/api/reports/question?limit=100');
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
      const res = await fetch('/api/reports/technical?limit=100');
      const data = await res.json();
      if (data.success) {
        setTechReports(data.reports || []);
      }
    } catch {}
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/audit?limit=100');
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

      const res = await fetch(`/api/reports/question/${id}`, {
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
      await fetch(`/api/reports/technical/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminEmail: 'admin@prepora.internal' })
      });
      fetchTechnicalReports();
      fetchAuditLogs();
    } catch {}
  };

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
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-slide-up text-slate-800">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              Quality Control & System Auditing
            </h1>
            <p className="text-xs text-slate-500">
              Review flagged questions, triage diagnostic technical issues, and inspect append-only audit trail
            </p>
          </div>
        </div>

        {/* Global Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80 text-xs font-bold">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'questions' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Reports ({qReports.filter(r => r.status === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'technical' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Diagnostics ({techReports.filter(r => r.status === 'Open').length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'audit' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['All', 'Pending', 'Under Review', 'Resolved', 'Rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setQStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    qStatusFilter === st
                      ? 'bg-purple-600 text-white shadow-xs'
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
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredQReports.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">All Clean!</h3>
                <p className="text-xs text-slate-500">No question issues found matching this filter.</p>
              </div>
            ) : (
              filteredQReports.map(r => (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-purple-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {r.reason}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {r.questionDetails?.subject || 'Question'}: {r.questionDetails?.chapter || r.questionId}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-auto md:ml-0">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium line-clamp-2">
                      {r.questionDetails?.question || `Question ID: ${r.questionId}`}
                    </p>

                    {r.message && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                        <strong className="text-purple-700">Student Comment:</strong> {r.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      r.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.status === 'Under Review'
                        ? 'bg-purple-100 text-purple-800'
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
                      className="text-xs font-bold py-1.5 px-3 border-purple-300 text-purple-700 hover:bg-purple-50"
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
      {/* TAB 2: SYSTEM TECHNICAL REPORTS (Task.md Section 10)      */}
      {/* ========================================================= */}
      {activeTab === 'technical' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
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
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">System Healthy</h3>
                <p className="text-xs text-slate-500">No active technical bug reports logged.</p>
              </div>
            ) : (
              filteredTechReports.map(tr => (
                <div
                  key={tr.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3"
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
                      <strong className="text-slate-900 font-bold">{tr.reason}</strong>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">Route: <code>{tr.route}</code></span>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      {new Date(tr.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/70 font-mono">
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
                        className="px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold"
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
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
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
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
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
                      <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
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
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-700">
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
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Student Flag</span>
            <div className="font-bold text-rose-700">{selectedQReport?.reason}</div>
            <p className="text-slate-600 mt-1 italic">"{selectedQReport?.message || 'No additional note'}"</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Question Statement</label>
            <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-800">
              {selectedQReport?.questionDetails?.question}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correct Answer Index</label>
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Explanation</label>
            <textarea
              rows={3}
              value={correctedExplanation}
              onChange={e => setCorrectedExplanation(e.target.value)}
              className="w-full p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Academic Review Notes</label>
            <input
              type="text"
              value={reviewNotes}
              onChange={e => setReviewNotes(e.target.value)}
              placeholder="e.g. Verified sign convention in formula step 3"
              className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};