import React, { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  BellRing,
  BellOff,
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  Flame,
  MessageSquareCheck,
  Smartphone,
  Lock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  isPushNotificationSupported,
  getPushPermissionStatus,
  registerPushNotifications,
  syncExistingPushSubscription
} from '../../utils/pushNotification';
import { soundFeedback } from '../../utils/audioFeedback';

export const NotificationPromptModal: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission | 'unsupported'>('default');
  const [deniedError, setDeniedError] = useState<string | null>(null);

  const checkAndSyncStatus = useCallback(async () => {
    if (!isPushNotificationSupported()) {
      setPermissionState('unsupported');
      return;
    }

    const currentPerm = Notification.permission;
    setPermissionState(currentPerm);

    // If already granted, sync silently in background and NEVER show popup
    if (currentPerm === 'granted') {
      setIsOpen(false);
      try {
        await syncExistingPushSubscription({
          id: user?.id,
          phone: user?.phone || (user as any)?.mobile,
          targetExam: user?.targetExam
        });
      } catch {
        // silent sync
      }
    }
  }, [user]);

  useEffect(() => {
    // 1. Check current permission immediately
    if (!isPushNotificationSupported()) return;

    const currentPerm = Notification.permission;
    setPermissionState(currentPerm);

    // If notifications are ALREADY ON, do NOT show popup
    if (currentPerm === 'granted') {
      checkAndSyncStatus();
      return;
    }

    // 2. Notifications are OFF ('default' or 'denied'):
    // Check if dismissed in THIS session to avoid harassing on every page change
    const dismissedThisSession = sessionStorage.getItem('prepora_notif_modal_dismissed_session');
    if (!dismissedThisSession) {
      // Auto-popup after short delay for smooth page animation
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [checkAndSyncStatus]);

  // Listen for manual trigger (e.g. from Settings or Header)
  useEffect(() => {
    const handleManualOpen = () => {
      const currentPerm = isPushNotificationSupported() ? Notification.permission : 'unsupported';
      setPermissionState(currentPerm);
      setSuccess(false);
      setDeniedError(null);
      setIsOpen(true);
    };

    window.addEventListener('prepora:open_notification_prompt', handleManualOpen);
    return () => window.removeEventListener('prepora:open_notification_prompt', handleManualOpen);
  }, []);

  // When user returns to tab (e.g. after changing Chrome site settings), auto-check permission
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isPushNotificationSupported()) {
        const currentPerm = Notification.permission;
        setPermissionState(currentPerm);
        if (currentPerm === 'granted' && isOpen && !success) {
          // User just unblocked and allowed notifications in Chrome settings!
          setLoading(true);
          const res = await registerPushNotifications({
            id: user?.id,
            phone: user?.phone || (user as any)?.mobile,
            targetExam: user?.targetExam
          });
          setLoading(false);
          if (res.success) {
            soundFeedback.playSuccess();
            setSuccess(true);
            setTimeout(() => {
              setIsOpen(false);
            }, 1800);
          }
        }
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [isOpen, success, user]);

  const handleEnableDefault = async () => {
    setLoading(true);
    setDeniedError(null);
    soundFeedback.playClick();

    const res = await registerPushNotifications({
      id: user?.id,
      phone: user?.phone || (user as any)?.mobile,
      targetExam: user?.targetExam
    });

    setLoading(false);
    const updatedPerm = isPushNotificationSupported() ? Notification.permission : 'unsupported';
    setPermissionState(updatedPerm);

    if (res.success && updatedPerm === 'granted') {
      soundFeedback.playSuccess();
      setSuccess(true);
      sessionStorage.removeItem('prepora_notif_modal_dismissed_session');
      setTimeout(() => {
        setIsOpen(false);
      }, 1800);
    } else if (updatedPerm === 'denied') {
      // Permission was denied/blocked by user or Chrome
      soundFeedback.vibrate([40, 60, 40]);
      setDeniedError('Notifications are blocked in your browser. Please follow the steps below to enable them.');
    }
  };

  const handleCheckAfterManualUnblock = async () => {
    setLoading(true);
    setDeniedError(null);
    soundFeedback.playClick();

    const currentPerm = isPushNotificationSupported() ? Notification.permission : 'unsupported';
    setPermissionState(currentPerm);

    if (currentPerm === 'granted') {
      const res = await registerPushNotifications({
        id: user?.id,
        phone: user?.phone || (user as any)?.mobile,
        targetExam: user?.targetExam
      });
      setLoading(false);
      if (res.success) {
        soundFeedback.playSuccess();
        setSuccess(true);
        sessionStorage.removeItem('prepora_notif_modal_dismissed_session');
        setTimeout(() => {
          setIsOpen(false);
        }, 1800);
      } else {
        setDeniedError(res.message || 'Notification setup failed. Please try again.');
      }
    } else {
      setLoading(false);
      soundFeedback.vibrate([40, 60, 40]);
      setDeniedError('Abhi bhi Notifications blocked hain. Kripya upar Chrome ke 🔒 Lock icon par tap karke "Allow" karein.');
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('prepora_notif_modal_dismissed_session', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-md bg-white dark:bg-[#0c131a] border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
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
          /* SUCCESS STATE */
          <div className="py-6 text-center space-y-3 animate-in fade-in">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5] animate-bounce" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Mobile Notifications Active! 🎉
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Aapko test alerts, daily streaks aur teacher announcements seedhe phone ke notification bar me milenge — website background me band hone par bhi!
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-2xs font-extrabold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Background Web Push Synced</span>
              </span>
            </div>
          </div>
        ) : permissionState === 'denied' ? (
          /* DENIED / BLOCKED STATE: Step-by-step guidance for Chrome unblocking */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <BellOff className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full mb-0.5">
                  <Lock className="w-3 h-3" />
                  <span>Browser Permission Blocked</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  Mobile Notifications Blocked Hain
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Aapke Chrome browser me notifications <strong className="text-rose-500">"Blocked"</strong> hain, isliye phone par alert chalu nahi ho pa rahe. Ise 2 aasan steps me ON karein:
            </p>

            {/* Unblock Steps */}
            <div className="space-y-2.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-slate-700 dark:text-slate-200 text-[11px] leading-tight">
                  Chrome ke upar <strong>Address Bar (URL)</strong> ke paas <strong>🔒 Lock</strong> ya <strong>🎚️ Tune/Settings</strong> icon par tap karein.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-slate-700 dark:text-slate-200 text-[11px] leading-tight">
                  <strong>Permissions / Site Settings</strong> par tap karke <strong>Notifications</strong> ko <strong>"Allow" (ON)</strong> karein.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-slate-700 dark:text-slate-200 text-[11px] leading-tight">
                  Wapas aakar neeche <strong>"Maine Allow Kar Diya (Turn On)"</strong> button dabayein!
                </div>
              </div>
            </div>

            {deniedError && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{deniedError}</span>
              </div>
            )}

            {/* Actions for Denied State */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCheckAfterManualUnblock}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{loading ? 'Checking Permission...' : 'Maine Allow Kar Diya (Turn On)'}</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-full py-2 px-4 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Baad Me Karunga (Close)
              </button>
            </div>
          </div>
        ) : (
          /* DEFAULT STATE: Fresh prompt to allow notifications */
          <div className="space-y-4">
            {/* Header / Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <BellRing className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Important Updates</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                  Turn On Mobile Notifications
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Koi bhi test ya notice miss na ho! Phone ke notification bar me real-time alerts paayein <span className="font-bold text-emerald-600 dark:text-emerald-400">— chahe website background me band ho:</span>
            </p>

            {/* Benefit Highlights */}
            <div className="space-y-2 py-1">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <Calendar className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">CBT Mock Test Reminders:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Live test schedules aur deadline countdowns.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">Daily Streak & Study Goals:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Daily revision alerts taaki streak break na ho.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                <MessageSquareCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-slate-900 dark:text-white font-bold">Teacher Replies & Notices:</strong>
                  <span className="text-slate-500 dark:text-slate-400 ml-1">Doubt answers aur exam circulars instant notification.</span>
                </div>
              </div>
            </div>

            {deniedError && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{deniedError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleEnableDefault}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
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
