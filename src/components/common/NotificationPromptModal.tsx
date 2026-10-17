import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  Flame,
  MessageSquareCheck,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  isPushNotificationSupported,
  getPushPermissionStatus,
  registerPushNotifications
} from '../../utils/pushNotification';
import { soundFeedback } from '../../utils/audioFeedback';

export const NotificationPromptModal: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Listen for manual trigger from anywhere in the app (e.g. Settings, Header)
    const handleManualOpen = () => {
      setIsOpen(true);
      setSuccess(false);
    };
    window.addEventListener('prepora:open_notification_prompt', handleManualOpen);

    if (!isPushNotificationSupported()) {
      return () => window.removeEventListener('prepora:open_notification_prompt', handleManualOpen);
    }

    const status = getPushPermissionStatus();
    // Only auto-show if permission hasn't been decided yet ('default')
    if (status !== 'default') {
      return () => window.removeEventListener('prepora:open_notification_prompt', handleManualOpen);
    }

    // Auto-prompt shortly after landing/login (600ms delay for smooth page load)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('prepora:open_notification_prompt', handleManualOpen);
    };
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    soundFeedback.playClick();

    const res = await registerPushNotifications({
      id: user?.id,
      phone: user?.phone || (user as any)?.mobile,
      targetExam: user?.targetExam
    });

    setLoading(false);

    if (res.success && res.permission === 'granted') {
      soundFeedback.playSuccess();
      setSuccess(true);
      localStorage.removeItem('prepora_notif_prompt_dismissed');
      setTimeout(() => {
        setIsOpen(false);
      }, 1600);
    } else {
      setIsOpen(false);
      localStorage.setItem('prepora_notif_prompt_dismissed', String(Date.now()));
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('prepora_notif_prompt_dismissed', String(Date.now()));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-md bg-white dark:bg-[#0c131a] border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200">
        {/* Glow Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close notification prompt"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="py-6 text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5] animate-bounce" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Mobile Notifications Active! 🎉
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              You will now receive test reminders, streak alerts, and teacher announcements directly on your phone — even when Prepora is closed.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-2xs font-extrabold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Background Web Push Synced</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header / Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <BellRing className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Stay Updated</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  Turn On Mobile Notifications
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Never miss your study targets. Get real-time alerts delivered to your device’s notification bar <span className="font-bold text-emerald-600 dark:text-emerald-400">— even when website is closed in background:</span>
            </p>

            {/* Benefit Highlights */}
            <div className="space-y-2 py-1">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <Calendar className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">CBT Mock Test Reminders:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Live test schedules and deadline countdowns.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">Daily Streak & Study Goals:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Gentle daily reminders so you never lose your streak.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <MessageSquareCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">Teacher Replies & Announcements:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Instant doubt clearance and urgent exam circulars.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleEnable}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>{loading ? 'Requesting Permission...' : 'Allow Notifications (Turn On)'}</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-full py-2 px-4 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
