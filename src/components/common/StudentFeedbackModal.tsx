import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MessageSquarePlus,
  X,
  Send,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  User,
  Phone
} from 'lucide-react';
import { userService } from '../../services/userService';
import { soundFeedback } from '../../utils/audioFeedback';

const OFFLINE_FEEDBACK_KEY = 'prepora_offline_feedbacks';

const queueFeedbackOffline = (payload: any) => {
  try {
    const raw = localStorage.getItem(OFFLINE_FEEDBACK_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push({
      ...payload,
      queuedAt: new Date().toISOString()
    });
    localStorage.setItem(OFFLINE_FEEDBACK_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('[Feedback] Could not write to localStorage queue:', err);
  }
};

const flushOfflineFeedbacks = async () => {
  try {
    const raw = localStorage.getItem(OFFLINE_FEEDBACK_KEY);
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;

    const remaining: any[] = [];
    for (const item of list) {
      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!res.ok) {
          remaining.push(item);
        }
      } catch {
        remaining.push(item);
      }
    }
    if (remaining.length === 0) {
      localStorage.removeItem(OFFLINE_FEEDBACK_KEY);
    } else {
      localStorage.setItem(OFFLINE_FEEDBACK_KEY, JSON.stringify(remaining));
    }
  } catch {
    // Non-fatal background sync
  }
};

export const StudentFeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'SUGGESTION' | 'MISTAKE'>('SUGGESTION');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Formula Sheet / Notes');
  const profile = userService.getProfile();
  const [name, setName] = useState(() => (profile.name && profile.name !== 'Aspirant' ? profile.name : ''));
  const [phone, setPhone] = useState(() => profile.phone || profile.mobile || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const location = useLocation();

  // Attempt background sync of any previously offline queued feedbacks
  React.useEffect(() => {
    flushOfflineFeedbacks();
    window.addEventListener('online', flushOfflineFeedbacks);
    return () => {
      window.removeEventListener('online', flushOfflineFeedbacks);
    };
  }, []);

  const handleTabSwitch = (tab: 'SUGGESTION' | 'MISTAKE') => {
    setActiveTab(tab);
    setErrorMsg('');
    if (tab === 'SUGGESTION') {
      setCategory('Formula Sheet / Notes');
    } else {
      setCategory('Wrong Question / Answer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please enter both a title and a description.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const resolvedName = name.trim() || profile.name || 'Student';
    const resolvedPhone = phone.trim() || profile.phone || profile.mobile || '';
    const payload = {
      type: activeTab,
      category,
      title: title.trim(),
      description: description.trim(),
      studentName: resolvedName,
      userName: resolvedName,
      studentPhone: resolvedPhone || undefined,
      userPhone: resolvedPhone || undefined,
      userEmail: profile.email || undefined,
      email: profile.email || undefined,
      userId: profile.id || 'anonymous',
      pageUrl: location.pathname
    };

    try {
      // Primary endpoint: /api/feedback, with automatic fallback to /api/reports/feedback
      let res: Response | null = null;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch {
        res = null;
      }

      if (!res || !res.ok) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          res = await fetch('/api/reports/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
          });
          clearTimeout(timeoutId);
        } catch {
          res = null;
        }
      }

      let succeeded = false;
      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.success !== false) {
          succeeded = true;
        }
      }

      // If server could not be reached or returned an error, buffer locally so feedback is NEVER lost
      if (!succeeded) {
        queueFeedbackOffline(payload);
      }

      soundFeedback.playSuccess();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setTitle('');
        setDescription('');
      }, 2200);
    } catch {
      // Emergency catch: save offline and succeed gracefully
      queueFeedbackOffline(payload);
      soundFeedback.playSuccess();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setTitle('');
        setDescription('');
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <aside aria-label="Feedback and suggestions" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setErrorMsg('');
            setIsOpen(true);
          }}
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          title="Send feedback or report an error"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '6s' }} />
          </div>
          <span className="hidden sm:inline font-extrabold tracking-wide">Feedback & Bug Report</span>
          <span className="sm:hidden font-black">Feedback</span>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden group-hover:block" />
        </button>
      </aside>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div
            className="bg-white dark:bg-[#0e1622] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                    Student Voice & Feedback
                  </h3>
                  <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                    Need new content or found an error? Send it directly to our academic faculty.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {submitted ? (
                <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">Thank You! Report Received</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Our academic and technical team will review your report and take immediate action.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Two Type Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('SUGGESTION')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'SUGGESTION'
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Suggest New Content</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('MISTAKE')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'MISTAKE'
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Report an Error</span>
                    </button>
                  </div>

                  {/* Context Note */}
                  <div className="text-2xs bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-slate-500">
                    <Compass className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">
                      Current Page: <strong>{location.pathname}</strong> (automatically attached)
                    </span>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {activeTab === 'SUGGESTION' ? 'What area does this apply to?' : 'What kind of issue did you notice?'}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      {activeTab === 'SUGGESTION' ? (
                        <>
                          <option value="Formula Sheet / Notes">Formula Sheet or Quick Revision Notes</option>
                          <option value="Video Lectures">Video Lectures for a Specific Chapter</option>
                          <option value="Practice Questions">New Practice Questions or PYQs</option>
                          <option value="Mind Map / Visuals">Mind Map or Diagram Improvements</option>
                          <option value="Study Tool / Planner">AI Doubt / Test Planner Feature</option>
                          <option value="Other Suggestion">Other Platform Suggestion</option>
                        </>
                      ) : (
                        <>
                          <option value="Wrong Question / Answer">Question or Answer Key Error</option>
                          <option value="Typo / Spelling Error">Spelling or Mathematical Formula Typo</option>
                          <option value="Explanation Error">Explanation is Unclear or Incomplete</option>
                          <option value="Website Glitch / Bug">Slow Page or Unresponsive Button</option>
                          <option value="Other Issue">Other Academic Issue</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject / Short Summary <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={
                        activeTab === 'SUGGESTION'
                          ? 'Example: Add sign convention tips for Ray Optics'
                          : 'Example: Question 14 in Electrostatics has an incorrect answer key'
                      }
                      className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={
                        activeTab === 'SUGGESTION'
                          ? 'Describe which chapter or topic would benefit from this content...'
                          : 'Explain the issue and what the correct answer/behavior should be...'
                      }
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Student Details (Optional/Prefilled) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block text-2xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" /> Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> WhatsApp / Mobile (Optional)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Number (for updates)"
                        className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                      {errorMsg}
                    </div>
                  )}

                  {/* Privacy Assurance Note */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="text-emerald-500 font-bold shrink-0">🔒 100% Confidential:</span>
                    <span>Your feedback is sent directly to the faculty team. It will not be shown to other students.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting feedback...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit to Academic Team</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
