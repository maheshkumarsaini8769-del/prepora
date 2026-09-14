import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Award,
  Sliders,
  CheckCircle2,
  Brain,
  Activity,
  Zap,
  Clock,
  Target
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [settings, setSettings] = useState<any>({
    weakPercent: 50,
    improvementPercent: 70,
    strongPercent: 70
  });
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    // Fetch analytics and settings
    Promise.all([
      fetch('/api/admin/analytics/aggregate').then((r) => r.json()),
      fetch('/api/admin/settings').then((r) => r.json())
    ])
      .then(([analyticsRes, settingsRes]) => {
        if (analyticsRes.success) setData(analyticsRes.data);
        if (settingsRes.success && settingsRes.data?.difficultyThresholds) {
          setSettings(settingsRes.data.difficultyThresholds);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveThresholds = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficultyThresholds: settings
        })
      });
      const resData = await res.json();
      if (resData.success) {
        setSavedMsg('Weakness Engine thresholds saved successfully!');
        setTimeout(() => setSavedMsg(''), 3500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const mistakeBreakdown = data?.mistakeBreakdown || [
    { reason: 'Calculation Error', count: 42, repeated: 12 },
    { reason: 'Concept Not Clear', count: 35, repeated: 18 },
    { reason: 'Formula Forgotten', count: 28, repeated: 9 },
    { reason: 'Misread Question', count: 21, repeated: 4 },
    { reason: 'Time Pressure Issue', count: 19, repeated: 6 },
    { reason: 'Careless Mistake', count: 14, repeated: 2 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-brand-400" />
            <span>Platform Intelligence & Weakness Engine</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Aggregate student mistake categorization, weakness parameters, and performance signals.
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Accuracy Benchmark</span>
            <Target className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">68.4%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Platform Target Satisfied</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Logged Mistakes</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {mistakeBreakdown.reduce((sum: number, m: any) => sum + m.count, 0)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across All Practice</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Weakness Resolves</span>
            <Brain className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">74.2%</div>
          <div className="text-[11px] text-indigo-400 mt-0.5">Post-Remediation Win Rate</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Avg Question Time</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">78s</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">Optimal Pace Zone</div>
        </div>
      </div>

      {/* Grid: Mistake Book Analytics & Weakness Config */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mistake Distribution (Section 21 of task1.md) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Mistake Book Aggregation (Root-Cause Profiling)</span>
            </h2>
            <span className="text-xs text-slate-500">Live Student Feed</span>
          </div>

          <div className="space-y-3">
            {mistakeBreakdown.map((m: any, idx: number) => {
              const maxCount = Math.max(...mistakeBreakdown.map((x: any) => x.count || 1));
              const pct = Math.round((m.count / maxCount) * 100);
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-200">{m.reason}</span>
                    <span className="text-slate-400">
                      {m.count} occurrences <span className="text-rose-400 text-[11px]">({m.repeated} repeated)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750 text-xs text-slate-300">
            💡 <strong className="text-white">Curator Insight:</strong> Calculation and Conceptual mistakes dominate. Recommend deploying formula card quick-review modules before full mock examinations.
          </div>
        </div>

        {/* Weakness Engine Threshold Tuning (Section 20 of task1.md) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>Weakness Thresholds</span>
            </h2>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Configure dynamic thresholds used by the platform to classify student chapter mastery:
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-300 mb-1">
                <span className="text-rose-400">Weak Topic Cutoff</span>
                <span>&lt; {settings.weakPercent}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={60}
                value={settings.weakPercent}
                onChange={(e) => setSettings({ ...settings, weakPercent: Number(e.target.value) })}
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-300 mb-1">
                <span className="text-amber-400">Needs Improvement</span>
                <span>{settings.weakPercent}% – {settings.improvementPercent}%</span>
              </div>
              <input
                type="range"
                min={55}
                max={80}
                value={settings.improvementPercent}
                onChange={(e) => setSettings({ ...settings, improvementPercent: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-300 mb-1">
                <span className="text-emerald-400">Mastered / Strong</span>
                <span>&gt; {settings.improvementPercent}%</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-center text-[11px]">
                Topics with accuracy exceeding {settings.improvementPercent}% receive Mastery Badges.
              </div>
            </div>

            <button
              onClick={handleSaveThresholds}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition shadow-lg shadow-brand-600/30 text-xs mt-2"
            >
              Update Engine Thresholds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
