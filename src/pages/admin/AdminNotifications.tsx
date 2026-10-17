import React, { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Send,
  Users,
  Smartphone,
  Radio,
  CheckCircle2,
  Trash2,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Target,
  Clock,
  Layers
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { adminFetch } from '../../utils/adminApi';
import { soundFeedback } from '../../utils/audioFeedback';

interface SentNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  targetType: string;
  targetUserPhone?: string;
  targetUserId?: string;
  targetExam?: string;
  actionUrl?: string;
  readBy?: string[];
  createdAt: string;
}

export const AdminNotifications: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPhone = searchParams.get('phone') || '';
  const initialName = searchParams.get('name') || '';

  // Form State
  const [targetType, setTargetType] = useState<'BROADCAST' | 'SPECIFIC_USER' | 'EXAM_SPECIFIC'>(
    initialPhone ? 'SPECIFIC_USER' : 'BROADCAST'
  );
  const [targetPhone, setTargetPhone] = useState<string>(initialPhone);
  const [targetExam, setTargetExam] = useState<string>('JEE');
  const [type, setType] = useState<string>('announcement');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [actionUrl, setActionUrl] = useState<string>('/practice');
  const [enableWebPush, setEnableWebPush] = useState<boolean>(true);

  // Status & List
  const [isSending, setIsSending] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [sentList, setSentList] = useState<SentNotification[]>([]);
  const [stats, setStats] = useState({ total: 0, totalSubscribers: 0, broadcastCount: 0, targetedCount: 0 });
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      setLoadingHistory(true);
      const res = await adminFetch('/api/notifications/admin');
      const data = await res.json();
      if (data.success) {
        setSentList(data.notifications || []);
        setStats({
          total: data.total || 0,
          totalSubscribers: data.totalSubscribers || 0,
          broadcastCount: data.broadcastCount || 0,
          targetedCount: data.targetedCount || 0
        });
      }
    } catch (e) {
      console.error('Failed to load sent notifications:', e);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setFeedbackMsg({ text: 'Please fill in both title and message.', success: false });
      return;
    }

    if (targetType === 'SPECIFIC_USER' && !targetPhone.trim()) {
      setFeedbackMsg({ text: 'Please provide a 10-digit mobile number for targeted notification.', success: false });
      return;
    }

    setIsSending(true);
    setFeedbackMsg(null);
    soundFeedback.playClick();

    try {
      const res = await adminFetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          type,
          targetType,
          targetPhone: targetType === 'SPECIFIC_USER' ? targetPhone.trim() : undefined,
          targetExam: targetType === 'EXAM_SPECIFIC' ? targetExam : undefined,
          actionUrl: actionUrl.trim() || '/practice'
        })
      });

      const data = await res.json();
      setIsSending(false);

      if (res.ok && data.success) {
        soundFeedback.playSuccess();
        setFeedbackMsg({
          text: data.message || 'Notification broadcasted and pushed to students successfully!',
          success: true
        });
        setTitle('');
        setMessage('');
        fetchHistory();
      } else {
        setFeedbackMsg({
          text: data.message || 'Failed to send notification.',
          success: false
        });
      }
    } catch (err: any) {
      setIsSending(false);
      setFeedbackMsg({ text: err.message || 'Network error while sending.', success: false });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      const res = await adminFetch(`/api/notifications/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSentList((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete notification:', e);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PUSH BROADCAST ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-indigo-500" />
            <span>Student Notifications & Web Push</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Send instant alerts, mock test announcements, and reminders directly to students' devices even when PREPORA is closed.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHistory}
          disabled={loadingHistory}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingHistory ? 'animate-spin' : ''}`} />
          <span>Refresh History</span>
        </button>
      </div>

      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Subscribed Devices</span>
            <Smartphone className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.totalSubscribers}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Ready for offline push
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Total Sent</span>
            <Send className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</div>
          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
            Broadcast & targeted
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Broadcasts</span>
            <Radio className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.broadcastCount}</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
            Sent to all students
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Targeted Alerts</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.targetedCount}</div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
            Specific student/exam
          </div>
        </div>
      </div>

      {/* Main Composer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-500" />
              <span>Compose New Alert</span>
            </h2>
            <p className="text-xs text-slate-500">
              Notification will appear in student's in-app notification center and as a browser push banner.
            </p>
          </div>

          {feedbackMsg && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-in fade-in ${
                feedbackMsg.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}
            >
              {feedbackMsg.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            {/* Target Audience Switcher */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Target Audience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'BROADCAST', label: '📢 All Students', desc: 'Full batch' },
                  { key: 'EXAM_SPECIFIC', label: '🎓 By Exam', desc: 'JEE / NEET / CBSE' },
                  { key: 'SPECIFIC_USER', label: '🎯 Specific Student', desc: 'By mobile number' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTargetType(item.key as any)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      targetType === item.key
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-black'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* If Exam Specific */}
            {targetType === 'EXAM_SPECIFIC' && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 animate-in fade-in">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Exam Group
                </label>
                <div className="flex gap-2">
                  {['JEE', 'NEET', 'CBSE'].map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setTargetExam(ex)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        targetExam === ex ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600'
                      }`}
                    >
                      {ex} Students
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If Specific User */}
            {targetType === 'SPECIFIC_USER' && (
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 animate-in fade-in">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Student Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required
                    className="w-full pl-12 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
                {initialName && (
                  <span className="text-[11px] text-slate-500 block">
                    Recipient: <strong className="text-slate-800 dark:text-slate-200">{initialName}</strong>
                  </span>
                )}
              </div>
            )}

            {/* Category / Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Notification Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
                {[
                  { key: 'announcement', label: '📢 Notice' },
                  { key: 'test', label: '📝 Mock Test' },
                  { key: 'practice', label: '🎯 Practice' },
                  { key: 'revision', label: '⏰ Revision' },
                  { key: 'achievement', label: '🏆 Streak' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setType(cat.key)}
                    className={`py-1.5 px-2 rounded-lg text-center font-bold text-[11px] cursor-pointer transition ${
                      type === cat.key
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Alert Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ⚡ All-India Full Syllabus Mock Test Live Now!"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Notification Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Message Content <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Write the notification message here. Include key guidelines, timings or motivation..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
              />
            </div>

            {/* Action Link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Click Action URL (In-App Destination)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={actionUrl}
                  onChange={(e) => setActionUrl(e.target.value)}
                  placeholder="/tests or /practice or /lectures"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setActionUrl('/tests')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  /tests
                </button>
                <button
                  type="button"
                  onClick={() => setActionUrl('/practice')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  /practice
                </button>
              </div>
            </div>

            {/* Offline Push Toggle */}
            <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={enableWebPush}
                onChange={(e) => setEnableWebPush(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-semibold">
                🌐 Send Web Push Notification to Offline Browsers & Devices ({stats.totalSubscribers} registered)
              </span>
            </label>

            <button
              type="submit"
              disabled={isSending || !title.trim() || !message.trim()}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Pushing to Students...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Notification Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>DEVICE NOTIFICATION PREVIEW</span>
              <Smartphone className="w-4 h-4" />
            </div>

            {/* Mobile Push Notification Mock */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black">
                    P
                  </div>
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">
                    PREPORA • Now
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">push alert</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {title.trim() || 'Notification Title Preview'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {message.trim() || 'Your message preview will appear here. Students will see this even when the app is closed.'}
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                <span>Tap to Open PREPORA</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed px-1">
              💡 When students log in to PREPORA, they are prompted to enable notifications. When enabled, this push alert will pop up on their Android notification tray, Windows notification center, or Mac notification panel.
            </p>
          </div>
        </div>
      </div>

      {/* Sent Notifications History Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Sent Notifications Log ({sentList.length})</span>
          </h3>
        </div>

        {sentList.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">
            No notifications sent yet. Use the composer above to send your first alert.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Alert Details</th>
                  <th className="px-4 py-3 text-left">Target</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Sent At</th>
                  <th className="px-4 py-3 text-center">Reads</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {sentList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.message}</div>
                    </td>
                    <td className="px-4 py-3">
                      {item.targetType === 'BROADCAST' ? (
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                          📢 All Students
                        </span>
                      ) : item.targetType === 'EXAM_SPECIFIC' ? (
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[10px]">
                          🎓 {item.targetExam} Students
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px]">
                          +91 {item.targetUserPhone || 'Student'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-400 capitalize">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-slate-700 dark:text-slate-300">
                      {item.readBy?.length || 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                        title="Delete Notification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
