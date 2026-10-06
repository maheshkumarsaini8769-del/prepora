import React, { useState, useEffect } from 'react';
import { adminFetch } from '../../utils/adminApi';
import {
  Users,
  Search,
  Filter,
  Shield,
  UserCheck,
  UserX,
  Key,
  Clock,
  Award,
  BookOpen,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
  X,
  Smartphone,
  LogOut,
  Calendar,
  TrendingUp,
  History,
  AlertTriangle,
  Flame,
  Check
} from 'lucide-react';

interface StudentListItem {
  id: string;
  studentId: string;
  name: string;
  email: string;
  mobile?: string;
  phone?: string;
  targetExam: string;
  classLevel: string;
  targetYear: number;
  streakDays: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  testsCompleted: number;
  studyTimeMinutes: number;
  status: 'active' | 'suspended';
  sessionStatus: 'Active' | 'Inactive';
  currentDevice?: {
    device?: string;
    browser?: string;
    os?: string;
  } | null;
  lastActive?: string;
  lastLoginAt?: string;
  lastLogoutAt?: string;
  createdAt: string;
  todayProgress?: {
    completed: number;
    total: number;
    percentage: number;
    studyTimeMinutes: number;
  };
}

interface StudentDetailData {
  student: StudentListItem;
  currentSession: {
    sessionId: string;
    deviceInfo?: { device: string; browser: string; os: string };
    ipAddress?: string;
    userAgent?: string;
    loginTime?: string;
    lastActive?: string;
    status: string;
  } | null;
  planner: {
    date: string;
    tasks: Array<{
      id: string;
      title: string;
      subject: string;
      chapter?: string;
      topic?: string;
      taskType: string;
      durationMinutes: number;
      isCompleted: boolean;
      notes?: string;
      timeSlot?: string;
    }>;
  };
  progressHistory: Array<{
    date: string;
    tasksTotal: number;
    tasksCompleted: number;
    studyTimeMinutes: number;
    questionsSolved: number;
    accuracyPercentage: number;
  }>;
  activities: Array<{
    id: string;
    type: string;
    title: string;
    description?: string;
    createdAt: string;
  }>;
  loginHistories: Array<{
    id: string;
    eventType: string;
    deviceInfo?: { device?: string; browser?: string; os?: string };
    ipAddress?: string;
    reason?: string;
    timestamp: string;
  }>;
}

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [examFilter, setExamFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Detail Modal States
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentDetail, setStudentDetail] = useState<StudentDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'planner' | 'progress' | 'activity' | 'loginHistory'>('overview');

  // Force Logout Confirmation Modal
  const [forceLogoutConfirmOpen, setForceLogoutConfirmOpen] = useState<boolean>(false);
  const [studentToForceLogout, setStudentToForceLogout] = useState<StudentListItem | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string>('');
  const [actionError, setActionError] = useState<string>('');

  // Quick Phone Block State
  const [blockPhoneInput, setBlockPhoneInput] = useState<string>('');
  const [blockReasonInput, setBlockReasonInput] = useState<string>('');
  const [blockingLoading, setBlockingLoading] = useState<boolean>(false);

  const fetchStudents = async () => {
    setLoading(true);
    setActionError('');
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (examFilter !== 'all') query.append('exam', examFilter);
      if (statusFilter !== 'all') query.append('status', statusFilter);

      const res = await adminFetch(`/api/admin/students?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data || []);
      }
    } catch (e: any) {
      setActionError('Failed to load students: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [examFilter, statusFilter]);

  const handleOpenStudentDetail = async (studentId: string) => {
    setSelectedStudentId(studentId);
    setDetailLoading(true);
    setActiveTab('overview');
    try {
      const res = await adminFetch(`/api/admin/students/${studentId}`);
      const data = await res.json();
      if (data.success) {
        setStudentDetail(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleStatusToggle = async (student: StudentListItem) => {
    const newStatus = student.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await adminFetch(`/api/admin/students/${student.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) =>
          prev.map((s) => (s.id === student.id ? { ...s, status: newStatus, ...(newStatus === 'suspended' ? { sessionStatus: 'Inactive', currentDevice: null } : {}) } : s))
        );
        if (studentDetail?.student.id === student.id) {
          setStudentDetail((prev) => prev ? { ...prev, student: { ...prev.student, status: newStatus, ...(newStatus === 'suspended' ? { sessionStatus: 'Inactive' } : {}) }, ...(newStatus === 'suspended' ? { currentSession: null } : {}) } : null);
        }
        setActionSuccess(newStatus === 'suspended' ? `Student ${student.name} (+91 ${student.mobile || student.phone || 'N/A'}) ko BLOCK kar diya gaya hai. Active session terminate ho gaya.` : `Student ${student.name} ko UNBLOCK kar diya gaya hai.`);
        setTimeout(() => setActionSuccess(''), 5000);
      } else {
        setActionError(data.message || 'Status update failed');
      }
    } catch (e: any) {
      setActionError(e.message || 'Status update failed');
    }
  };

  const handleQuickBlockByPhone = async () => {
    const clean = blockPhoneInput.replace(/[^0-9]/g, '').slice(-10);
    if (!clean || clean.length !== 10) {
      setActionError('Kripya valid 10-digit mobile number enter karein.');
      return;
    }
    setBlockingLoading(true);
    setActionError('');
    try {
      const res = await adminFetch('/api/admin/students/block-by-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: clean, reason: blockReasonInput.trim() || 'Admin Block' })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(data.message);
        setBlockPhoneInput('');
        setBlockReasonInput('');
        fetchStudents();
        setTimeout(() => setActionSuccess(''), 5000);
      } else {
        setActionError(data.message || 'Failed to block student by phone.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Server error.');
    } finally {
      setBlockingLoading(false);
    }
  };

  const handleQuickUnblockByPhone = async (mobileToUnblock?: string) => {
    const target = (mobileToUnblock || blockPhoneInput).replace(/[^0-9]/g, '').slice(-10);
    if (!target || target.length !== 10) {
      setActionError('Kripya valid 10-digit mobile number enter karein.');
      return;
    }
    setBlockingLoading(true);
    setActionError('');
    try {
      const res = await adminFetch('/api/admin/students/unblock-by-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: target })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(data.message);
        setBlockPhoneInput('');
        fetchStudents();
        setTimeout(() => setActionSuccess(''), 5000);
      } else {
        setActionError(data.message || 'Failed to unblock student.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Server error.');
    } finally {
      setBlockingLoading(false);
    }
  };

  const handleForceLogoutSubmit = async () => {
    if (!studentToForceLogout) return;
    try {
      const res = await adminFetch(`/api/admin/students/${studentToForceLogout.id}/force-logout`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setForceLogoutConfirmOpen(false);
        setActionSuccess(`Student ${studentToForceLogout.name} forcefully logged out from current active session.`);
        setTimeout(() => setActionSuccess(''), 4500);

        // Update list status
        setStudents(prev =>
          prev.map(s => s.id === studentToForceLogout.id ? { ...s, sessionStatus: 'Inactive', currentDevice: null } : s)
        );

        if (studentDetail?.student.id === studentToForceLogout.id) {
          setStudentDetail(prev => prev ? { ...prev, currentSession: null, student: { ...prev.student, sessionStatus: 'Inactive' } } : null);
        }
      } else {
        setActionError(data.message || 'Could not force logout.');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error communicating with server.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-emerald-500" />
            <span>Student Management & Device Control</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student directory, real-time single active sessions, isolated study planner, progress stream & mobile blocking controls.
          </p>
        </div>

        <button
          onClick={fetchStudents}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition active:scale-95 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Quick Mobile Block Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c131a] border border-rose-200 dark:border-rose-900/50 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Mobile Number Se Student Block / Unblock Karein</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  Instant Suspension
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kise bhi number ko block karne par vo student PREPORA me open ya login nahi kar sakega, WhatsApp OTP band ho jayega, aur active device turant logout ho jayegi.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center pt-1">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">+91</span>
            <input
              type="tel"
              placeholder="10-digit Mobile Number (e.g. 9876543210)"
              value={blockPhoneInput}
              onChange={(e) => setBlockPhoneInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickBlockByPhone()}
              className="w-full pl-12 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <input
            type="text"
            placeholder="Reason (Optional: Rule violation, etc.)"
            value={blockReasonInput}
            onChange={(e) => setBlockReasonInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuickBlockByPhone()}
            className="sm:w-64 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickBlockByPhone}
              disabled={blockingLoading || !blockPhoneInput}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <UserX className="w-4 h-4" />
              <span>{blockingLoading ? 'Processing...' : '🚫 Block Mobile'}</span>
            </button>

            <button
              onClick={() => handleQuickUnblockByPhone()}
              disabled={blockingLoading || !blockPhoneInput}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>Unblock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, mobile number, student ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Exams</option>
            <option value="JEE">JEE Target</option>
            <option value="NEET">NEET Target</option>
            <option value="Board">CBSE / Board</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Accounts</option>
            <option value="suspended">Blocked / Suspended</option>
            <option value="recently_active">Recently Active (7 Days)</option>
            <option value="never_logged_in">Never Logged In</option>
          </select>

          <button
            onClick={fetchStudents}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-xs shrink-0"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Student Profile</th>
                <th className="py-3.5 px-4">Mobile Number</th>
                <th className="py-3.5 px-4">Target Exam</th>
                <th className="py-3.5 px-4">Current Session</th>
                <th className="py-3.5 px-4">Today's Progress</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading student directory...</span>
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No student accounts found matching query.
                  </td>
                </tr>
              ) : (
                students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{st.name}</span>
                        {st.streakDays > 1 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black">
                            🔥 {st.streakDays}d
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {st.studentId || st.id}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {st.mobile || st.phone ? `+91 ${st.mobile || st.phone}` : '—'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-extrabold text-[10px]">
                        {st.targetExam}
                      </span>
                      <span className="ml-1.5 text-slate-500 dark:text-slate-400 font-medium">Class {st.classLevel}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {st.sessionStatus === 'Active' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active</span>
                          {st.currentDevice && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                              ({st.currentDevice.device || 'Phone'})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Inactive</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                          <span>{st.todayProgress?.completed || 0}/{st.todayProgress?.total || 0} tasks</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{st.todayProgress?.percentage || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${st.todayProgress?.percentage || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          st.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${st.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>{st.status === 'active' ? 'Active' : 'Blocked'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenStudentDetail(st.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs transition border border-emerald-500/30 cursor-pointer"
                      >
                        View Profile
                      </button>

                      {st.sessionStatus === 'Active' && (
                        <button
                          onClick={() => {
                            setStudentToForceLogout(st);
                            setForceLogoutConfirmOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-400 font-bold text-xs transition border border-amber-500/30 cursor-pointer"
                          title="Immediately terminates student active session on their device"
                        >
                          Force Logout
                        </button>
                      )}

                      <button
                        onClick={() => handleStatusToggle(st)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                          st.status === 'active'
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                        }`}
                      >
                        {st.status === 'active' ? '🚫 Block' : '✅ Unblock'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Force Logout Confirmation Modal */}
      {forceLogoutConfirmOpen && studentToForceLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Force Logout Student?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to log out <strong>{studentToForceLogout.name}</strong> ({studentToForceLogout.mobile || studentToForceLogout.email}) from their current device?
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>Device: <strong>{studentToForceLogout.currentDevice?.device || 'Phone'} ({studentToForceLogout.currentDevice?.browser || 'Browser'})</strong></div>
              <div>Status: <span className="text-rose-600 dark:text-rose-400 font-bold">Will immediately receive 401 SESSION_REVOKED</span></div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setForceLogoutConfirmOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleForceLogoutSubmit}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-900/30 cursor-pointer"
              >
                Yes, Force Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Student Modal with 5 Tabs (Overview, Planner, Progress, Activity, Login History) */}
      {selectedStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-black">
                  {studentDetail?.student.name?.[0] || 'S'}
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{studentDetail?.student.name || 'Loading...'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {studentDetail?.student.studentId || selectedStudentId}
                    </span>
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>+91 {studentDetail?.student.mobile || studentDetail?.student.phone || 'N/A'}</span>
                    <span>•</span>
                    <span>{studentDetail?.student.targetExam} Class {studentDetail?.student.classLevel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {studentDetail?.currentSession && (
                  <button
                    onClick={() => {
                      if (studentDetail?.student) {
                        setStudentToForceLogout(studentDetail.student);
                        setForceLogoutConfirmOpen(true);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Force Logout</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedStudentId(null);
                    setStudentDetail(null);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('planner')}
                className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeTab === 'planner'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Today's Planner ({studentDetail?.planner.tasks.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeTab === 'progress'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Daily Progress</span>
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeTab === 'activity'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Activity Stream</span>
              </button>

              <button
                onClick={() => setActiveTab('loginHistory')}
                className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeTab === 'loginHistory'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Login History</span>
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {detailLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
                  <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span>Loading complete telemetry for student...</span>
                </div>
              ) : !studentDetail ? (
                <div className="text-center py-12 text-slate-500">Student detail not available.</div>
              ) : (
                <>
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      {/* Metric Stat Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                          <div className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400">Streak</div>
                          <div className="text-xl font-black text-amber-500 mt-0.5">🔥 {studentDetail.student.streakDays}d</div>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                          <div className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400">Questions</div>
                          <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{studentDetail.student.totalQuestionsSolved}</div>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                          <div className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400">Accuracy</div>
                          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{studentDetail.student.overallAccuracy}%</div>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                          <div className="text-[10px] uppercase font-extrabold text-slate-500 dark:text-slate-400">Study Time</div>
                          <div className="text-xl font-black text-teal-600 dark:text-teal-400 mt-0.5">{Math.round(studentDetail.student.studyTimeMinutes)}m</div>
                        </div>
                      </div>

                      {/* Active Session Telemetry Card */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Smartphone className="w-4 h-4 text-emerald-500" />
                            <span>Current Authenticated Device</span>
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            studentDetail.currentSession
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}>
                            {studentDetail.currentSession ? 'ACTIVE SESSION' : 'OFFLINE / NO ACTIVE SESSION'}
                          </span>
                        </div>

                        {studentDetail.currentSession ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Device / OS</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {studentDetail.currentSession.deviceInfo?.device || 'Desktop'} ({studentDetail.currentSession.deviceInfo?.os || 'OS'})
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Browser</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {studentDetail.currentSession.deviceInfo?.browser || 'Chrome'}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 block">IP Address</span>
                              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                                {studentDetail.currentSession.ipAddress || '127.0.0.1'}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Logged In At</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {new Date(studentDetail.currentSession.loginTime || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                            The student is not currently signed in on any device.
                          </p>
                        )}
                      </div>

                      {/* Account Properties */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                        <div className="flex justify-between py-2 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">Student ID:</span>
                          <span className="font-mono font-bold">{studentDetail.student.studentId}</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">Mobile Number:</span>
                          <span className="font-mono font-bold">+91 {studentDetail.student.mobile || studentDetail.student.phone || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">Registered Date:</span>
                          <span className="font-bold">{new Date(studentDetail.student.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">Last Login:</span>
                          <span className="font-bold">
                            {studentDetail.student.lastLoginAt ? new Date(studentDetail.student.lastLoginAt).toLocaleString() : 'Never'}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-500">Account Status:</span>
                          <span className={`font-bold ${studentDetail.student.status === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {studentDetail.student.status === 'active' ? 'ACTIVE' : 'BLOCKED'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PLANNER */}
                  {activeTab === 'planner' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Today's Study Plan Tasks ({studentDetail.planner.date})</span>
                        <span className="font-bold text-emerald-400">
                          {studentDetail.planner.tasks.filter(t => t.isCompleted).length} of {studentDetail.planner.tasks.length} Completed
                        </span>
                      </div>

                      {studentDetail.planner.tasks.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          No tasks scheduled for today yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {studentDetail.planner.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                  task.isCompleted ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                                }`}>
                                  {task.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <div className="min-w-0">
                                  <div className={`font-bold text-slate-900 dark:text-slate-100 truncate ${task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                                    {task.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span>{task.subject}</span>
                                    <span>•</span>
                                    <span>{task.durationMinutes} mins</span>
                                    {task.timeSlot && (
                                      <>
                                        <span>•</span>
                                        <span>{task.timeSlot}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-bold shrink-0">
                                {task.taskType}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: PROGRESS */}
                  {activeTab === 'progress' && (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Past 7 Days Daily Progress</div>
                      {studentDetail.progressHistory.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          No historical progress logs recorded yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {studentDetail.progressHistory.map((p, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs"
                            >
                              <div>
                                <div className="font-bold text-slate-800 dark:text-slate-200">{p.date}</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  Study Time: <strong>{p.studyTimeMinutes || 0} mins</strong> • Qs Solved: <strong>{p.questionsSolved || 0}</strong>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-emerald-600 dark:text-emerald-400">{p.tasksCompleted} / {p.tasksTotal} Tasks</div>
                                <div className="text-[11px] text-slate-400">
                                  {p.tasksTotal > 0 ? Math.round((p.tasksCompleted / p.tasksTotal) * 100) : 0}% Goal
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: ACTIVITY STREAM */}
                  {activeTab === 'activity' && (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Recent Student Activity Stream</div>
                      {studentDetail.activities.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          No activity events recorded yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {studentDetail.activities.map((act) => (
                            <div
                              key={act.id}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3 text-xs"
                            >
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-800 dark:text-slate-200">{act.title}</div>
                                {act.description && (
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{act.description}</div>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono shrink-0">
                                {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: LOGIN HISTORY */}
                  {activeTab === 'loginHistory' && (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">Authentication & Session Revocation Events</div>
                      {studentDetail.loginHistories.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          No login history recorded yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {studentDetail.loginHistories.map((lh) => (
                            <div
                              key={lh.id}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs"
                            >
                              <div className="space-y-0.5">
                                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                    lh.eventType === 'LOGIN_SUCCESS'
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                      : lh.eventType === 'SESSION_REVOKED' || lh.eventType === 'FORCE_LOGOUT'
                                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}>
                                    {lh.eventType.replace('_', ' ')}
                                  </span>
                                  <span>{lh.deviceInfo?.device || 'Desktop'} ({lh.deviceInfo?.browser || 'Browser'})</span>
                                </div>
                                {lh.reason && (
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{lh.reason}</div>
                                )}
                              </div>
                              <div className="text-right text-[10px] text-slate-400 font-mono">
                                <div>{new Date(lh.timestamp).toLocaleDateString()}</div>
                                <div>{new Date(lh.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
