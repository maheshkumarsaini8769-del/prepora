import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  CheckCircle2,
  Bell,
  Shield,
  Moon,
  Laptop,
  Smartphone,
  LogOut,
  ShieldCheck,
  KeyRound,
  Palette,
  Check,
  Compass
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { ExamType, ClassLevel } from '../types';
import { THEME_OPTIONS, ThemeKey, getSavedTheme, applyTheme } from '../utils/theme';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();
  const [activeTheme, setActiveTheme] = useState<ThemeKey>(getSavedTheme());

  const [name, setName] = useState(profile.name);
  const [exam, setExam] = useState<ExamType>(profile.targetExam);
  const [classLevel, setClassLevel] = useState<ClassLevel>(profile.classLevel);
  const [targetYear, setTargetYear] = useState<number>(profile.targetYear);
  const [dailyGoal, setDailyGoal] = useState<number>(profile.dailyGoalQuestions);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
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

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset demo test attempts, notes, and mistakes to defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">App Preferences</h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize your academic goals, syllabus streams, and application settings</p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preferences saved successfully!
        </div>
      )}

      {/* Dedicated Preparation Stream Wizard Card */}
      <Card className="p-5 border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Personalized Preparation Setup
            </h3>
          </div>
          <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
            {profile.preparationProfile?.preparationType || profile.targetExam}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Need to switch from JEE to NEET, or change from Class 11 to 12? Run the multi-step setup wizard to recalibrate your personalized syllabus and daily priorities. All your historical test attempts, scores, and bookmarks remain preserved.
        </p>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => navigate('/onboarding')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Launch Preparation Setup Wizard
          </button>
        </div>
      </Card>

      <Card className="space-y-5">
        {/* Student Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Student Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Target Exam */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Primary Target Examination
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['JEE', 'NEET', 'CBSE', 'RBSE'] as ExamType[]).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setExam(e)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  exam === e
                    ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Class Level */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Class
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['11', '12'] as ClassLevel[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassLevel(c)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    classLevel === c
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Year
            </label>
            <input
              type="number"
              value={targetYear}
              onChange={(e) => setTargetYear(parseInt(e.target.value, 10))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Daily Goal */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Daily Practice Target ({dailyGoal} questions / day)
          </label>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value, 10))}
            className="w-full accent-brand-600"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button variant="primary" onClick={handleSave} className="font-bold text-xs px-6">
            <Save className="w-4 h-4" /> Save Preferences
          </Button>
        </div>
      </Card>

      {/* Website Appearance & Color Theme */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-brand-600" />
              <span>Website Theme & Accent Colors</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your preferred visual palette. Updates buttons, badges, navigation, and charts instantly across PREPORA.
            </p>
          </div>
          <Badge variant="brand" size="sm">Active: {THEME_OPTIONS.find(t => t.key === activeTheme)?.name}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = activeTheme === theme.key;
            return (
              <button
                key={theme.key}
                type="button"
                onClick={() => {
                  applyTheme(theme.key);
                  setActiveTheme(theme.key);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/80 text-brand-950 ring-2 ring-brand-500/20 shadow-xs font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-6 h-6 rounded-lg shadow-2xs shrink-0 ring-1 ring-black/10 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <div>
                    <div className="text-xs font-bold leading-tight">{theme.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{theme.subtitle}</div>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[11px] font-black text-brand-600">Selected</span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Security & Active Devices (Task.md Section 1 & 18) */}
      <SecurityActiveDevicesCard />

      {/* Danger Zone: Reset Local Data */}
      <Card className="border-rose-100 bg-rose-50/20 space-y-3">
        <h3 className="font-bold text-sm text-rose-800">Demo Prototype Storage Reset</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Clear test attempts, custom created tests, study notes, and mistake book back to the initial pristine state.
        </p>
        <Button size="sm" variant="danger" onClick={handleResetData} className="text-xs font-bold">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Local Mock Data
        </Button>
      </Card>
    </div>
  );
};

const SecurityActiveDevicesCard: React.FC = () => {
  const {
    user,
    isAuthenticated,
    activeSessions,
    logout,
    logoutOtherDevices,
    fetchSessions,
    setAuthModalOpen,
    setAuthModalMode
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogoutOther = async () => {
    if (!window.confirm('Log out from all other logged-in devices?')) return;
    setLoading(true);
    const res = await logoutOtherDevices();
    setLoading(false);
    setMsg(res.message || 'Logged out from other devices.');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <Card className="space-y-4 border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Security & Active Devices</h3>
            <p className="text-[11px] text-slate-500">
              {isAuthenticated ? `Signed in as ${user.email || user.name}` : 'Currently running in offline student mode'}
            </p>
          </div>
        </div>

        {isAuthenticated ? (
          <Button size="sm" variant="outline" onClick={logout} className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50">
            <LogOut className="w-3.5 h-3.5 mr-1" /> Log Out
          </Button>
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
        <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200">
          {msg}
        </div>
      )}

      {/* Active Sessions List */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
          <span>Active Logged-in Devices</span>
          {isAuthenticated && activeSessions.length > 1 && (
            <button
              onClick={handleLogoutOther}
              disabled={loading}
              className="text-purple-600 hover:underline text-[11px] lowercase first-letter:uppercase font-medium"
            >
              {loading ? 'Logging out...' : 'Log out other devices'}
            </button>
          )}
        </div>

        {activeSessions.length === 0 ? (
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
            {isAuthenticated ? 'No other active devices found.' : 'Log in with your account to manage multiple device sessions.'}
          </div>
        ) : (
          <div className="space-y-2">
            {activeSessions.map((sess) => (
              <div
                key={sess.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600">
                    {sess.device.toLowerCase().includes('phone') || sess.device.toLowerCase().includes('android') || sess.device.toLowerCase().includes('ios') ? (
                      <Smartphone className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <span>{sess.device}</span>
                      {sess.isCurrent && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {sess.browser} • {sess.os} • IP: {sess.ipAddress}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400">
                  <span>Last active: {new Date(sess.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
