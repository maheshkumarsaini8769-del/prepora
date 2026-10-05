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
import { getColorMode, applyColorMode, ColorMode } from '../utils/theme';
import { getAllowedSubjectsForExam } from '../utils/examUtils';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();
  const [currColorMode, setCurrColorMode] = useState<ColorMode>(getColorMode);

  const [name, setName] = useState(profile.name);
  const [exam, setExam] = useState<ExamType>(profile.targetExam);
  const [classLevel, setClassLevel] = useState<ClassLevel>(profile.classLevel);
  const [targetYear, setTargetYear] = useState<number>(profile.targetYear);
  const [dailyGoal, setDailyGoal] = useState<number>(profile.dailyGoalQuestions || 25);
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
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">App Preferences</h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize your academic goals, syllabus streams, and application settings</p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preferences saved successfully!
        </div>
      )}

      {/* Dedicated Preparation Stream Wizard Card */}
      <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Personalized Preparation Setup
            </h3>
          </div>
          <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
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
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
            Student Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Primary Target Exam Selector (Full Stream Support) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
            Target Examination & Syllabus Stream
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                id: 'JEE',
                title: 'JEE (Main & Advanced)',
                desc: 'Physics • Chemistry • Mathematics (Engineering)',
                badge: 'PCM'
              },
              {
                id: 'NEET',
                title: 'NEET (UG)',
                desc: 'Physics • Chemistry • Biology (Medical)',
                badge: 'PCB'
              },
              {
                id: 'CBSE',
                title: 'CBSE Board',
                desc: 'Central Board of Secondary Education Class 11 & 12',
                badge: 'CBSE'
              },
              {
                id: 'RBSE',
                title: 'RBSE Board',
                desc: 'Rajasthan Board of Secondary Education Class 11 & 12',
                badge: 'RBSE'
              }
            ].map((e) => {
              const isSelected = exam === e.id;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setExam(e.id as ExamType)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black ${isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {e.title}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {e.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {e.desc}
                    </p>
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
        </div>

        {/* Class Level & Target Year */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              Class Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['11', '12'] as ClassLevel[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassLevel(c)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    classLevel === c
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-sm'
                      : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              Target Year
            </label>
            <input
              type="number"
              value={targetYear}
              onChange={(e) => setTargetYear(parseInt(e.target.value, 10))}
              className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Daily Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Daily Practice Target
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
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
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

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button variant="primary" onClick={handleSave} className="font-bold text-xs px-6">
            <Save className="w-4 h-4" /> Save Preferences
          </Button>
        </div>
      </Card>

      {/* Website Appearance: Light & Dark Theme */}
      <Card className="space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Moon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Appearance & Display Mode</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch between crisp daytime light theme and eye-friendly deep dark mode.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              applyColorMode('light');
              setCurrColorMode('light');
            }}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              currColorMode === 'light'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 font-bold'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                ☀️
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Crisp daytime clarity</div>
              </div>
            </div>
            {currColorMode === 'light' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
          </button>

          <button
            type="button"
            onClick={() => {
              applyColorMode('dark');
              setCurrColorMode('dark');
            }}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              currColorMode === 'dark'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 font-bold'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center text-lg">
                🌙
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Deep obsidian contrast</div>
              </div>
            </div>
            {currColorMode === 'dark' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
          </button>
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
    <Card className="space-y-4 border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security & Active Devices</h3>
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
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-500 text-center">
            {isAuthenticated ? 'No other active devices found.' : 'Log in with your account to manage multiple device sessions.'}
          </div>
        ) : (
          <div className="space-y-2">
            {activeSessions.map((sess) => (
              <div
                key={sess.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 text-xs text-slate-800 dark:text-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                    {sess.device.toLowerCase().includes('phone') || sess.device.toLowerCase().includes('android') || sess.device.toLowerCase().includes('ios') ? (
                      <Smartphone className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
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
