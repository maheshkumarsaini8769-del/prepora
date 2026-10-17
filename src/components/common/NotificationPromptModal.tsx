import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isPushNotificationSupported, getPushPermissionStatus, registerPushNotifications } from '../../utils/pushNotification';
import { soundFeedback } from '../../utils/audioFeedback';

export const NotificationPromptModal: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isPushNotificationSupported()) return;

    const status = getPushPermissionStatus();
    if (status !== 'default') return;

    // Check if dismissed recently in this session
    const dismissedTime = sessionStorage.getItem('prepora_notif_prompt_dismissed');
    if (dismissedTime) return;

    // Show prompt after a short delay (1.5 seconds) after login/page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleEnable = async () => {
    setLoading(true);
    soundFeedback.playClick();

    const res = await registerPushNotifications({
      id: user.id,
      phone: user.phone || user.mobile,
      targetExam: user.targetExam
    });

    setLoading(false);

    if (res.success && res.permission === 'granted') {
      soundFeedback.playSuccess();
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 1400);
    } else {
      setIsOpen(false);
      sessionStorage.setItem('prepora_notif_prompt_dismissed', String(Date.now()));
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('prepora_notif_prompt_dismissed', String(Date.now()));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="py-6 text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-2xl mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Notifications Turned On!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You will now receive test reminders, live announcements, and streak alerts directly on your device.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <BellRing className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Important Updates</span>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  Turn On Push Notifications
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Never miss important updates! Get instant alerts for <span className="font-bold text-slate-900 dark:text-white">mock tests, daily study reminders, and teacher announcements</span> directly on your screen — <span className="font-bold text-emerald-600 dark:text-emerald-400">even when PREPORA is closed</span>.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleEnable}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>{loading ? 'Requesting Permission...' : 'Allow Notifications (Turn On)'}</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-bold transition cursor-pointer"
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
