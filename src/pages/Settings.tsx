import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  ShieldCheck,
  KeyRound,
  Smartphone,
  Laptop,
  Moon,
  Sun,
  Bell,
  Volume2,
  VolumeX,
  Database,
  Trash2,
  HelpCircle,
  MessageSquare,
  LogOut,
  Compass,
  Check,
  ChevronRight,
  Flame,
  RefreshCw,
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Zap,
  Lock,
  ArrowRight,
  Layers,
  GraduationCap,
  Sliders,
  X
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { ExamType, ClassLevel } from '../types';
import { getColorMode, applyColorMode, ColorMode } from '../utils/theme';
import { soundFeedback } from '../utils/audioFeedback';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();
  const {
    user,
    isAuthenticated,
    activeSessions,
    logout,
    logoutOtherDevices,
    fetchSessions,
    changePassword,
    setAuthModalOpen,
    setAuthModalMode
  } = useAuth();

  // Navigation segment / tab
  const [activeTab, setActiveTab] = useState<'academic' | 'security' | 'appearance' | 'storage'>('academic');

  // Academic Settings State
  const [name, setName] = useState(profile.name || 'Aspirant');
  const [exam, setExam] = useState<ExamType>(profile.targetExam || 'JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'Dropper'>((profile.classLevel as ClassLevel | 'Dropper') || '12');
  const [targetYear, setTargetYear] = useState<number>(profile.targetYear || 2026);
  const [dailyGoal, setDailyGoal] = useState<number>(profile.dailyGoalQuestions || 25);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Appearance & Preferences State
  const [currColorMode, setCurrColorMode] = useState<ColorMode>(getColorMode);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('prepora_sound_enabled') !== 'false';
  });
  const [notifEnabled, setNotifEnabled] = useState<boolean>(() => {
    return localStorage.getItem('prepora_notifications_enabled') !== 'false';
  });
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(() => {
    return localStorage.getItem('prepora_haptics_enabled') !== 'false';
  });

  // Logout Confirmation Modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Storage Stats
  const storageUsageKB = useMemo(() => {
    try {
      let total = 0;
      for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          total += ((localStorage[x].length + x.length) * 2);
        }
      }
      return Math.round(total / 1024);
    } catch {
      return 120;
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleColorModeChange = (e: Event) => {
      const ce = e as CustomEvent<ColorMode>;
      if (ce.detail) setCurrColorMode(ce.detail);
    };
    window.addEventListener('prepora-colormode-change', handleColorModeChange);
    return () => {
      window.removeEventListener('prepora-colormode-change', handleColorModeChange);
    };
  }, []);

  const handleSaveAcademic = () => {
    const updatedPrep = {
      ...(profile.preparationProfile || {
        userId: profile.id,
        onboardingCompleted: true,
        subjects: exam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'],
        targetYear: targetYear,
        updatedAt: new Date().toISOString()
      }),
      preparationType: (exam === 'CBSE' ? 'CBSE' : exam === 'RBSE' ? 'RBSE' : exam === 'NEET' ? 'NEET' : 'JEE') as any,
      exam: (exam === 'NEET' ? 'NEET_UG' : exam === 'CBSE' ? 'CBSE' : exam === 'RBSE' ? 'RBSE' : 'JEE_MAIN') as any,
      classLevel: classLevel,
      targetYear: targetYear
    };

    userService.updateProfile({
      name: name.trim() || profile.name,
      targetExam: exam,
      classLevel: classLevel,
      targetYear: targetYear,
      dailyGoalQuestions: dailyGoal,
      preparationProfile: updatedPrep
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('prepora_sound_enabled', String(next));
  };

  const handleToggleNotif = () => {
    const next = !notifEnabled;
    setNotifEnabled(next);
    localStorage.setItem('prepora_notifications_enabled', String(next));
  };

  const handleToggleHaptic = () => {
    const next = !hapticEnabled;
    setHapticEnabled(next);
    localStorage.setItem('prepora_haptics_enabled', String(next));
  };

  const handleClearCache = () => {
    if (window.confirm('Clear temporary app cache? Your saved notes, bookmarks, and account login will remain safe.')) {
      const token = localStorage.getItem('prepora_auth_token');
      const userStr = localStorage.getItem('prepora_user');
      const bookmarks = localStorage.getItem('prepora_bookmarks');
      const mistakes = localStorage.getItem('prepora_mistakes');
      const attempts = localStorage.getItem('prepora_test_attempts');
      const notes = localStorage.getItem('prepora_notes');

      localStorage.clear();

      if (token) localStorage.setItem('prepora_auth_token', token);
      if (userStr) localStorage.setItem('prepora_user', userStr);
      if (bookmarks) localStorage.setItem('prepora_bookmarks', bookmarks);
      if (mistakes) localStorage.setItem('prepora_mistakes', mistakes);
      if (attempts) localStorage.setItem('prepora_test_attempts', attempts);
      if (notes) localStorage.setItem('prepora_notes', notes);

      window.location.reload();
    }
  };

  const handleResetData = () => {
    if (window.confirm('⚠️ Reset all test attempts, mistakes, and practice progress back to fresh state?')) {
      localStorage.removeItem('prepora_test_attempts');
      localStorage.removeItem('prepora_mistakes');
      localStorage.removeItem('prepora_bookmarks');
      localStorage.removeItem('prepora_attempted_question_ids');
      window.location.reload();
    }
  };

  const executeLogout = async (allDevices: boolean = false) => {
    setIsLoggingOut(true);
    try {
      if (allDevices) {
        await logoutOtherDevices();
      }
      await logout();
      setShowLogoutModal(false);
      navigate('/login', { replace: true });
    } catch {
      setShowLogoutModal(false);
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Derive initials for avatar
  const displayName = user?.name || profile.name || 'Aspirant';
  const displayPhone = user?.phone || (user as any)?.mobile || profile.phone;
  const displayEmail = user?.email || (user as any)?.email;
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'PR';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Mobile-App Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1.5">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>App Settings & Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your student profile, exam targets, devices, and application experience
          </p>
        </div>

        {isAuthenticated && (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Preferences saved successfully to your cloud profile!</span>
        </div>
      )}

      {/* 1. NATIVE APP IDENTITY CARD (Hero Profile Header) */}
      <Card className="p-5 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/40 dark:from-[#0d141d] dark:via-[#0c131a] dark:to-[#080d12] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-black text-lg sm:text-xl flex items-center justify-center shadow-md shadow-emerald-600/20">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c131a] flex items-center justify-center text-white text-[10px]">
                ✓
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {displayName}
                </h2>
                <Badge variant="brand" size="sm">
                  {exam} {targetYear}
                </Badge>
                {isAuthenticated ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                    Logged In
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    Offline Mode
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
                {displayPhone && <span>📱 {displayPhone}</span>}
                {displayEmail && !displayEmail.includes('@prepora.student') && (
                  <span>✉️ {displayEmail}</span>
                )}
                <span>• Class {classLevel}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-center">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-xs font-bold w-full sm:w-auto"
              >
                <User className="w-3.5 h-3.5 mr-1" /> View Profile
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
              >
                Sign In to Sync
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* 2. APP-STYLE SEGMENTED NAVIGATION BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80">
        {[
          { key: 'academic', label: 'Academic Goals', icon: GraduationCap },
          { key: 'security', label: 'Security & Devices', icon: ShieldCheck },
          { key: 'appearance', label: 'Theme & UX', icon: Moon },
          { key: 'storage', label: 'Storage & Reset', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#0c131a] text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ACADEMIC & TARGET EXAM                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'academic' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Target Exam Selection Grid */}
          <Card className="p-5 space-y-4 border-slate-200 dark:border-slate-800">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Target Exam & Syllabus Stream</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your primary competitive examination for customized questions and curriculum
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'JEE', title: 'JEE (Main & Advanced)', desc: 'Physics • Chemistry • Mathematics', badge: 'PCM' },
                { id: 'NEET', title: 'NEET (UG)', desc: 'Physics • Chemistry • Biology', badge: 'PCB' },
                { id: 'CBSE', title: 'CBSE Board', desc: 'Central Board Curriculum Class 11 & 12', badge: 'NCERT' },
                { id: 'RBSE', title: 'RBSE Board', desc: 'Rajasthan State Board Syllabus', badge: 'State Board' }
              ].map((e) => {
                const isSelected = exam === e.id;
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setExam(e.id as ExamType)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                          {e.title}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {e.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{e.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Class Level & Target Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Class Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['11', '12', 'Dropper'] as (ClassLevel | 'Dropper')[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setClassLevel(c)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        classLevel === c
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {c === 'Dropper' ? 'Dropper' : `Class ${c}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Examination Year
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2025, 2026, 2027].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTargetYear(yr)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        targetYear === yr
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Practice Target */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Daily Questions Practice Target
                </label>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  {dailyGoal} questions / day
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 50, 100].map((goalNum) => (
                  <button
                    key={goalNum}
                    type="button"
                    onClick={() => setDailyGoal(goalNum)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      dailyGoal === goalNum
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {goalNum} Qs {goalNum === 25 ? '⭐' : ''}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 mt-2"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <Button variant="primary" onClick={handleSaveAcademic} className="font-bold text-xs px-6 bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-1.5" /> Save Academic Preferences
              </Button>
            </div>
          </Card>

          {/* Setup Wizard Launcher */}
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Full Onboarding Setup Wizard</h4>
                <p className="text-[11px] text-slate-500">Recalibrate subject weightages, study hour allocation, and target milestones.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold hover:bg-slate-50 transition-colors shrink-0 shadow-xs"
            >
              Rerun Wizard
            </button>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: SECURITY & ACTIVE DEVICES                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'security' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <SecurityActiveDevicesCard onTriggerLogoutModal={() => setShowLogoutModal(true)} />
          <ChangePasswordCard />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: THEME & UX PREFERENCES                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'appearance' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <Card className="p-5 space-y-4 border-slate-200 dark:border-slate-800">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Moon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Display Contrast & Bright Mode</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Toggle between daytime contrast and eye-friendly obsidian dark mode
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFeedback.playClick();
                  applyColorMode('light');
                  setCurrColorMode('light');
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currColorMode === 'light'
                    ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/15 text-amber-600 flex items-center justify-center text-lg">
                    ☀️
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Light Mode (Bright)</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">High clarity daytime reading</div>
                  </div>
                </div>
                {currColorMode === 'light' && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 stroke-[3]" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFeedback.playClick();
                  applyColorMode('dark');
                  setCurrColorMode('dark');
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currColorMode === 'dark'
                    ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center text-lg">
                    🌙
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode (Obsidian)</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Deep obsidian OLED black</div>
                  </div>
                </div>
                {currColorMode === 'dark' && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 stroke-[3]" />}
              </button>
            </div>
          </Card>

          {/* App Feedback & Audio Controls */}
          <Card className="p-5 space-y-3 border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>App Experience & Feedback Toggles</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Sound Effects & Audio Chimes
                  </div>
                  <div className="text-[11px] text-slate-500">Play subtle auditory cues on test submission & streak achievements</div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-slate-400" /> Study Goal Notifications
                  </div>
                  <div className="text-[11px] text-slate-500">Receive in-app alerts when nearing your daily practice target</div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleNotif}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                      notifEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-400" /> Low Data & Speed Mode
                  </div>
                  <div className="text-[11px] text-slate-500">Compress lecture thumbnails and load lightweight KaTeX formulas</div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleHaptic}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    hapticEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                      hapticEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: STORAGE & DATA RESET                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'storage' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <Card className="p-5 space-y-4 border-slate-200 dark:border-slate-800">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Local Cache & Storage Management</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Study Up saves offline practice questions and chapter notes locally for instant navigation.
                </p>
              </div>
              <Badge variant="slate" size="sm">
                ~{storageUsageKB} KB Used
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Clear Temporary Cache</h4>
                <p className="text-[11px] text-slate-500">Frees browser storage without affecting your login or bookmarks.</p>
                <button
                  onClick={handleClearCache}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                >
                  Clear Cache
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300">Reset Local Test Data</h4>
                <p className="text-[11px] text-slate-500">Resets mistake logs and mock test attempts back to original state.</p>
                <button
                  onClick={handleResetData}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs"
                >
                  Reset Progress
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 3. NATIVE MOBILE APP LOGOUT SECTION (Dedicated, Prominent) */}
      <Card className="p-5 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c131a] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Account Sign Out</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isAuthenticated
                ? 'Sign out of your active session on this device or terminate all other connected devices.'
                : 'Sign in with your mobile number or email to sync your data across phone and laptop.'}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm shadow-rose-600/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Study Up</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Log In / Register</span>
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* App Version & Status Footer */}
      <div className="pt-2 text-center text-xs text-slate-400 dark:text-slate-600 space-y-1">
        <div className="flex items-center justify-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="font-semibold text-slate-600 dark:text-slate-400">Study Up v2.4.0 Live • Atlas Connected</span>
        </div>
        <p className="text-[10px]">Built for high-yield JEE & NEET aspirants</p>
      </div>

      {/* 4. SLEEK NATIVE APP CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#0d141d] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Log out of Study Up?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You will need to enter your registered mobile number or email and password to sign back in.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => executeLogout(false)}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm shadow-rose-600/20 cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out (This Device)'}
              </button>

              {activeSessions.length > 1 && (
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => executeLogout(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  Log Out Everywhere ({activeSessions.length} Devices)
                </button>
              )}

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component: Security and Active Devices
const SecurityActiveDevicesCard: React.FC<{ onTriggerLogoutModal: () => void }> = ({ onTriggerLogoutModal }) => {
  const {
    user,
    isAuthenticated,
    activeSessions,
    logoutOtherDevices,
    fetchSessions,
    setAuthModalOpen,
    setAuthModalMode
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchSessions();
  }, [isAuthenticated]);

  const handleLogoutOther = async () => {
    if (!window.confirm('Log out from all other logged-in devices?')) return;
    setLoading(true);
    const res = await logoutOtherDevices();
    setLoading(false);
    setMsg(res.message || 'Logged out from other devices.');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <Card className="p-5 space-y-4 border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Device Sessions</h3>
            <p className="text-[11px] text-slate-500">
              {isAuthenticated ? `Signed in on ${activeSessions.length || 1} concurrent device(s)` : 'Currently running in offline student mode'}
            </p>
          </div>
        </div>

        {isAuthenticated ? (
          <button
            onClick={onTriggerLogoutModal}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        ) : (
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setAuthModalMode('login');
              setAuthModalOpen(true);
            }}
            className="text-xs bg-purple-600 hover:bg-purple-700 font-bold"
          >
            Sign In / Sync
          </Button>
        )}
      </div>

      {msg && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800">
          {msg}
        </div>
      )}

      {/* Active Sessions List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
          <span>Connected Devices (Up to 5)</span>
          {isAuthenticated && activeSessions.length > 1 && (
            <button
              onClick={handleLogoutOther}
              disabled={loading}
              className="text-purple-600 dark:text-purple-400 hover:underline text-[11px] font-bold cursor-pointer"
            >
              {loading ? 'Logging out...' : 'Log out other devices'}
            </button>
          )}
        </div>

        {activeSessions.length === 0 ? (
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs text-slate-500 text-center">
            {isAuthenticated ? 'No other active devices found.' : 'Log in to sync seamlessly between your phone and laptop.'}
          </div>
        ) : (
          <div className="space-y-2">
            {activeSessions.map((sess) => {
              const isMobileDevice =
                sess.device.toLowerCase().includes('phone') ||
                sess.device.toLowerCase().includes('android') ||
                sess.device.toLowerCase().includes('ios');
              return (
                <div
                  key={sess.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 text-xs text-slate-800 dark:text-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      {isMobileDevice ? <Smartphone className="w-4 h-4 text-emerald-600" /> : <Laptop className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{sess.device}</span>
                        {sess.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300/40">
                            Current Device
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {sess.browser} • {sess.os} • IP: {sess.ipAddress}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400">
                    <span>Active: {new Date(sess.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

// Sub-component: Change Password Form
const ChangePasswordCard: React.FC = () => {
  const { isAuthenticated, changePassword } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!currentPassword) {
      setError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg(res.message || 'Password changed successfully. Please log in again.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(res.message || 'Failed to update password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Error updating password.');
    }
  };

  return (
    <Card className="p-5 space-y-4 border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Change Account Password</h3>
          <p className="text-[11px] text-slate-500">
            Updating your password immediately secures your account and keeps all devices verified.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Current Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              className="w-full pr-10 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                minLength={6}
                className="w-full pr-10 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Confirm New Password
            </label>
            <input
              type={showNew ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="font-bold text-xs px-5 bg-emerald-600 hover:bg-emerald-700"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Settings;
