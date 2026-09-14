import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  targetExam: string;
  classLevel: string;
  targetYear: number;
  streakDays: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  testsCompleted: number;
  studyTimeMinutes: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (examFilter !== 'all') query.append('exam', examFilter);
      if (statusFilter !== 'all') query.append('status', statusFilter);

      const res = await fetch(`/api/admin/students?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [examFilter, statusFilter]);

  const handleStatusToggle = async (student: Student) => {
    const newStatus = student.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch(`/api/admin/students/${student.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) =>
          prev.map((s) => (s.id === student.id ? { ...s, status: newStatus } : s))
        );
        if (selectedStudent?.id === student.id) {
          setSelectedStudent((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setActionSuccess(`Student account status updated to ${newStatus}.`);
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePasswordReset = async () => {
    if (!selectedStudent) return;
    try {
      const res = await fetch(`/api/admin/students/${selectedStudent.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPassword || 'prepore123' })
      });
      const data = await res.json();
      if (data.success) {
        setResetModalOpen(false);
        setNewPassword('');
        setActionSuccess(`Password reset successfully for ${selectedStudent.email}`);
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-brand-400" />
            <span>Student Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time student accounts, exam goals, study telemetry, and account controls.
          </p>
        </div>

        <button
          onClick={fetchStudents}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Exams</option>
            <option value="JEE">JEE Main & Advanced</option>
            <option value="NEET">NEET UG</option>
            <option value="Board">CBSE / Board</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>

          <button
            onClick={fetchStudents}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-lg transition"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-850 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Student Profile</th>
                <th className="py-3.5 px-4">Exam / Class</th>
                <th className="py-3.5 px-4">Solved / Accuracy</th>
                <th className="py-3.5 px-4">Study Streak</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    Loading student directory...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No student accounts found matching query.
                  </td>
                </tr>
              ) : (
                students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-100">{st.name}</div>
                      <div className="text-[11px] text-slate-500">{st.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold text-[10px]">
                        {st.targetExam}
                      </span>
                      <span className="ml-1.5 text-slate-400">Class {st.classLevel}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-200 font-semibold">{st.totalQuestionsSolved || 0} Solved</div>
                      <div className="text-[11px] text-emerald-400">{st.overallAccuracy || 0}% Accuracy</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        🔥 {st.streakDays || 1} Days
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {st.status === 'active' ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedStudent(st)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleStatusToggle(st)}
                        className={`px-2.5 py-1 rounded font-semibold transition ${
                          st.status === 'active'
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {st.status === 'active' ? 'Suspend' : 'Restore'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal / Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedStudent.name}</h3>
                  <div className="text-xs text-slate-400">{selectedStudent.email}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Performance Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Solved</div>
                <div className="text-lg font-black text-white mt-0.5">{selectedStudent.totalQuestionsSolved}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">{selectedStudent.overallAccuracy}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Tests Done</div>
                <div className="text-lg font-black text-amber-400 mt-0.5">{selectedStudent.testsCompleted}</div>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span className="text-slate-500">Target Exam:</span>
                <span className="font-bold">{selectedStudent.targetExam}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span className="text-slate-500">Class & Year:</span>
                <span className="font-bold">Class {selectedStudent.classLevel} ({selectedStudent.targetYear})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span className="text-slate-500">Total Study Time:</span>
                <span className="font-bold">{Math.round(selectedStudent.studyTimeMinutes || 0)} minutes</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span className="text-slate-500">Account Status:</span>
                <span className={`font-bold ${selectedStudent.status === 'active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedStudent.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setResetModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Reset Password</span>
              </button>

              <button
                onClick={() => handleStatusToggle(selectedStudent)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                  selectedStudent.status === 'active'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {selectedStudent.status === 'active' ? 'Suspend Student' : 'Restore Access'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {resetModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
            <h4 className="font-bold text-sm text-white">Reset Password for {selectedStudent.name}</h4>
            <p className="text-xs text-slate-400">
              Set a temporary password. The student will be able to log in and change it.
            </p>
            <input
              type="text"
              placeholder="e.g. Prep@2026 or leave blank for default"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordReset}
                className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
