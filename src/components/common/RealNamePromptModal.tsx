import React, { useState, useEffect } from 'react';
import { User, CheckCircle2, X, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { soundFeedback } from '../../utils/audioFeedback';

export const RealNamePromptModal: React.FC = () => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [realName, setRealName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user || user.role === 'admin') {
      setIsOpen(false);
      return;
    }

    const currentName = (user.name || '').trim();
    const isPlaceholder =
      !currentName ||
      currentName === 'Aspirant' ||
      currentName === 'Student' ||
      /^(Student|User)\s*\d*$/i.test(currentName);

    if (!isPlaceholder) {
      setIsOpen(false);
      return;
    }

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('prepora_name_prompt_dismissed');
    if (dismissed) {
      return;
    }

    // Show prompt after 1.2s delay on page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user?.name, user?.role]);

  const handleSaveName = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const clean = realName.trim();
    if (!clean || clean.length < 2) {
      setError('Please enter your valid real name (at least 2 letters).');
      return;
    }

    if (/^(Student|User)\s*\d*$/i.test(clean)) {
      setError('Please enter your actual full name (e.g. Rahul Sharma), not a Student ID.');
      return;
    }

    setIsSaving(true);
    soundFeedback.playClick();

    try {
      await updateUser({ name: clean });
      soundFeedback.playSuccess();
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 1200);
    } catch {
      setError('Could not save name. Please check your network connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('prepora_name_prompt_dismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition cursor-pointer"
          title="Later"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <User className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Verification</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Apna Real Name Darj Karein
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Aapki profile me placeholder naam <strong className="text-emerald-600 dark:text-emerald-400">"{user.name || 'Student'}"</strong> dikh raha hai. Test results, scorecards, aur rank list ke liye apna real full name enter karein:
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 font-bold">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-300">Real Name Saved!</h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Welcome, <strong>{realName.trim()}</strong>! Aapka profile update ho gaya hai.</p>
          </div>
        ) : (
          <form onSubmit={handleSaveName} className="space-y-3.5 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Student Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={realName}
                  onChange={(e) => {
                    setRealName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Rahul Sharma / Priya Verma"
                  autoFocus
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDismiss}
                className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Baad Me
              </button>
              <button
                type="submit"
                disabled={isSaving || !realName.trim()}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Save Real Name</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
