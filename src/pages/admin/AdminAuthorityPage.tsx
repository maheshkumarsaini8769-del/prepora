import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  KeyRound,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { adminAuthorityService, AuthorizedAdmin, PRIMARY_ADMIN_EMAILS } from '../../services/adminAuthorityService';
import { useAuth } from '../../context/AuthContext';

export const AdminAuthorityPage: React.FC = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AuthorizedAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'SUPER ADMIN' | 'CONTENT MANAGER' | 'REVIEWER'>('SUPER ADMIN');
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadAdmins = () => {
    setLoading(true);
    try {
      const list = adminAuthorityService.getAuthorizedAdmins();
      setAdmins(list);
    } catch {
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setActionLoading(true);
    setFeedback(null);

    const res = await adminAuthorityService.addAuthorizedAdmin(
      newEmail.trim(),
      newRole,
      user?.email || 'Super Admin'
    );

    setActionLoading(false);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setNewEmail('');
      loadAdmins();
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleRevoke = async (email: string) => {
    if (PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase().trim() === email.toLowerCase().trim())) {
      setFeedback({ type: 'error', message: 'Cannot revoke access from the Primary System Owner.' });
      return;
    }

    if (!window.confirm(`Are you sure you want to revoke admin authority for ${email}?`)) {
      return;
    }

    setActionLoading(true);
    setFeedback(null);

    const res = await adminAuthorityService.revokeAuthorizedAdmin(email);
    setActionLoading(false);

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      loadAdmins();
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span>Admin Authority & Whitelist Control</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Strict email-based security. Only emails whitelisted here or the permanent Super Admin can access the Admin Console.
          </p>
        </div>

        <button
          onClick={loadAdmins}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Whitelist</span>
        </button>
      </div>

      {/* Security Notice Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/20 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span>Zero-Trust Admin Protection Active</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
              Active Guard
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Anyone logging in through Zenuxs SSO with an unauthorized email address is automatically blocked by the 
            <strong className="text-white"> 403 Forbidden Gate</strong>. To grant someone admin access, simply enter their email below.
          </p>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Add Admin Form */}
        <div className="lg:col-span-1">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl sticky top-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserPlus className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white">Grant Admin Authority</h2>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  User Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="teammate@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Must match the email address they use to sign in with Zenuxs.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Assigned Administrative Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                >
                  <option value="SUPER ADMIN">SUPER ADMIN (Full Console Access)</option>
                  <option value="CONTENT MANAGER">CONTENT MANAGER (Questions & Tests)</option>
                  <option value="REVIEWER">REVIEWER (Review & Reports)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={actionLoading || !newEmail.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {actionLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>Grant Admin Authority</span>
              </button>
            </form>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                <Info className="w-3.5 h-3.5" />
                <span>Immediate Activation</span>
              </div>
              <p>
                As soon as you click Grant, this email is saved to MongoDB Atlas & synced to local authority cache. The user can immediately sign in and enter `/admin`.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Whitelist Table */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white">Authorized Administrators Whitelist</h2>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                {admins.length} Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Administrator Email</th>
                    <th className="py-3 px-4">Authority Role</th>
                    <th className="py-3 px-4">Status / Added</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {admins.map((adm, index) => {
                    const isPrimary = PRIMARY_ADMIN_EMAILS.some(
                      e => e.toLowerCase().trim() === adm.email.toLowerCase().trim()
                    );

                    return (
                      <tr key={index} className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-[11px] shadow-xs">
                              {adm.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                                <span>{adm.email}</span>
                                {isPrimary && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40">
                                    OWNER
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Authorized by: {adm.addedBy || 'Primary System'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                              adm.role === 'SUPER ADMIN'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : adm.role === 'CONTENT MANAGER'
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            }`}
                          >
                            {adm.role}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>
                              {adm.addedAt ? new Date(adm.addedAt).toLocaleDateString() : 'Permanent'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {isPrimary ? (
                            <span className="text-[11px] text-slate-500 font-semibold italic">
                              Permanent
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRevoke(adm.email)}
                              disabled={actionLoading}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold border border-rose-500/30 transition cursor-pointer"
                              title="Revoke Admin Authority"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Revoke</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {admins.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 text-xs">
                        No administrators loaded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthorityPage;
