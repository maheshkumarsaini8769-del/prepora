import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Shield,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Tv,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'exams' | 'flags' | 'ads' | 'subs' | 'help'>('general');
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (updatedFields: any) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        setSuccessMsg('Settings updated and persisted successfully.');
        setTimeout(() => setSuccessMsg(''), 3500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFeature = (flagKey: string) => {
    if (!settings?.featureFlags) return;
    const newFlags = {
      ...settings.featureFlags,
      [flagKey]: !settings.featureFlags[flagKey]
    };
    handleSave({ featureFlags: newFlags });
  };

  if (loading || !settings) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        Loading admin configuration settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-brand-400" />
            <span>Platform Configuration & Settings</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global exam patterns, feature toggles, spaced revision schedules, and administrative documentation.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'general' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>General & Revision</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'exams' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Exam Patterns</span>
        </button>

        <button
          onClick={() => setActiveTab('flags')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'flags' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Feature Flags</span>
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'ads' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Ad Placement</span>
        </button>

        <button
          onClick={() => setActiveTab('subs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'subs' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('help')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'help' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Admin Docs & Guides</span>
        </button>
      </div>

      {/* Tab 1: General & Revision */}
      {activeTab === 'general' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span>Spaced Revision Schedule Engine (Section 22 of task1.md)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Define default intervals (in days) when students receive automated smart revision triggers for mistakes and bookmarked concepts.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {settings.revisionIntervals?.map((days: number, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center min-w-24">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Interval #{idx + 1}</div>
                <div className="text-lg font-black text-brand-400 mt-0.5">Day {days}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
            Current automated sequence: <span className="text-slate-200 font-mono font-bold">1 → 3 → 7 → 14 → 30 days</span>.
          </div>
        </div>
      )}

      {/* Tab 2: Exam Patterns (Section 36 of task1.md) */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(settings.examPatterns || {}).map(([examName, config]: [string, any]) => (
            <div key={examName} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-black text-base text-white">{examName} Pattern</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400">
                  Configured
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Total Questions:</span>
                  <span className="font-bold">{config.totalQuestions} Questions</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold">{config.durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Marking Scheme:</span>
                  <span className="font-bold text-emerald-400">
                    +{config.markingScheme?.correct} / {config.markingScheme?.incorrect}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Feature Flags (Section 39 of task1.md) */}
      {activeTab === 'flags' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">Feature Flag Governance</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Instantly enable or disable student-facing experimental capabilities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(settings.featureFlags || {}).map(([flag, enabled]) => (
              <div
                key={flag}
                className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white capitalize">
                    {flag.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {enabled ? 'Active across all student sessions' : 'Temporarily deactivated'}
                  </div>
                </div>

                <button
                  onClick={() => toggleFeature(flag)}
                  className={`p-1.5 rounded-lg transition ${
                    enabled ? 'text-brand-400 hover:text-brand-300' : 'text-slate-600 hover:text-slate-500'
                  }`}
                >
                  {enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Ad Management (Section 37 of task1.md) */}
      {activeTab === 'ads' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white">Free-User Advertisement Policy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            PREPORA maintains educational integrity. In accordance with Section 37, advertisements are never rendered over test sessions or question answer buttons.
          </p>

          <div className="space-y-3 text-xs max-w-lg">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="font-semibold text-slate-300">Advertisements Global Master Switch:</span>
              <span className="font-bold text-amber-400">
                {settings.adConfig?.enabled ? 'Enabled' : 'Disabled (Ad-Free Active)'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="font-semibold text-slate-300">Max Free Ads Per Session:</span>
              <span className="font-bold text-white">{settings.adConfig?.maxFreeAdsPerSession || 2}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="font-semibold text-slate-300">Premium Pro User Experience:</span>
              <span className="font-bold text-emerald-400">100% Guaranteed Ad-Free</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Subscriptions (Section 38 of task1.md) */}
      {activeTab === 'subs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.subscriptionPlans?.map((plan: any) => (
            <div key={plan.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <h3 className="font-black text-base text-white">{plan.name}</h3>
                  <span className="text-xl font-black text-brand-400">
                    ₹{plan.price} <span className="text-xs font-normal text-slate-400">/{plan.billingPeriod}</span>
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {plan.features?.map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
                <span>Status: Active</span>
                <span className="text-brand-400 font-semibold">Tier ID: {plan.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Admin Docs & Guides (Section 40 of task1.md) */}
      {activeTab === 'help' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-white">How to Create Questions & Equations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When creating questions, specify Exam (JEE/NEET/Board), Class, and Chapter. Use LaTeX syntax for math/chemistry notation (e.g. <code className="text-brand-400 bg-slate-800 px-1 py-0.5 rounded">\(v^2 = u^2 + 2as\)</code>). Ensure exactly 4 options are provided with one 0-indexed correct answer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-white">Duplicate Detection Algorithm</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              PREPORA runs a hybrid Levenshtein distance and token-level Jaccard similarity index across the entire MongoDB question bank. Any question sharing &gt;80% structural overlap is flagged before publishing to prevent duplicate practice entries.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-white">Question Versioning & Attempt Integrity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with Section 8 and 34, every time a published question is edited, an immutable snapshot is stored in the <code className="text-brand-400 bg-slate-800 px-1 py-0.5 rounded">QuestionVersion</code> collection. Prior test attempts remain permanently linked to their historical question version.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
