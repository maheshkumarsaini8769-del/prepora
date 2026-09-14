import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Plus,
  ArrowLeft,
  Copy,
  Eye,
  Clock,
  Activity,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  X,
  Play
} from 'lucide-react';
import { testService } from '../../services/testService';

export const AdminTests: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tests' | 'blueprint' | 'monitoring'>('tests');
  const [tests, setTests] = useState<any[]>([]);
  const [monitoringData, setMonitoringData] = useState<any>(null);

  // Blueprint Builder State
  const [blueprintExam, setBlueprintExam] = useState('JEE');
  const [physCount, setPhysCount] = useState(25);
  const [chemCount, setChemCount] = useState(25);
  const [mathCount, setMathCount] = useState(25);
  const [blueprintValidation, setBlueprintValidation] = useState<any>(null);
  const [validating, setValidating] = useState(false);

  const fetchMonitoring = async () => {
    try {
      const res = await fetch('/api/admin/tests/monitoring');
      const data = await res.json();
      if (data.success) {
        setMonitoringData(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setTests(testService.getAllTests());
    fetchMonitoring();
  }, []);

  const handleValidateBlueprint = async () => {
    setValidating(true);
    try {
      const res = await fetch('/api/admin/tests/blueprint-validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: blueprintExam,
          subjectDistribution: {
            Physics: physCount,
            Chemistry: chemCount,
            Mathematics: mathCount
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setBlueprintValidation(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-brand-400" />
            <span>Test Suite & Blueprint Engineering</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build mock test patterns, validate question pool blueprints, and observe active test halls.
          </p>
        </div>

        <button
          onClick={() => navigate('/build-test')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg shadow-brand-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Test</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'tests'
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>All Published Tests ({tests.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'blueprint'
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Test Blueprint Builder (Section 14)</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('monitoring');
            fetchMonitoring();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'monitoring'
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Test Monitoring (Section 16)</span>
        </button>
      </div>

      {/* Tab 1: All Tests */}
      {activeTab === 'tests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-850 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Test Title</th>
                  <th className="py-3.5 px-4">Exam</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Questions</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {tests.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-white">{t.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold text-[10px]">
                        {t.exam}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{t.category}</td>
                    <td className="py-3 px-4 font-semibold">{t.totalQuestions} Qs</td>
                    <td className="py-3 px-4 font-semibold">{t.durationMinutes}m</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Published
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigate(`/tests/${t.id}/instructions`)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Blueprint Builder (Section 14 of task1.md) */}
      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>Question Distribution Specification</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Define exact distribution across subjects. The engine verifies database availability before generating the test blueprint.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Target Examination</label>
                <select
                  value={blueprintExam}
                  onChange={(e) => setBlueprintExam(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
                >
                  <option value="JEE">JEE Main & Advanced</option>
                  <option value="NEET">NEET UG</option>
                  <option value="Board">CBSE / State Board</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Physics Questions Count</label>
                <input
                  type="number"
                  value={physCount}
                  onChange={(e) => setPhysCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Chemistry Questions Count</label>
                <input
                  type="number"
                  value={chemCount}
                  onChange={(e) => setChemCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Mathematics Questions Count</label>
                <input
                  type="number"
                  value={mathCount}
                  onChange={(e) => setMathCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
                />
              </div>

              <button
                onClick={handleValidateBlueprint}
                disabled={validating}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition shadow-lg shadow-brand-600/30 text-xs mt-2"
              >
                {validating ? 'Verifying Live Question Bank...' : 'Verify Blueprint Availability'}
              </button>
            </div>
          </div>

          {/* Validation Result Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Question Bank Availability Telemetry</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct lookup against published, vetted MongoDB questions.
              </p>

              {blueprintValidation ? (
                <div className="mt-4 space-y-3 text-xs">
                  <div
                    className={`p-3 rounded-xl border font-bold flex items-center gap-2 ${
                      blueprintValidation.fullySatisfied
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {blueprintValidation.fullySatisfied ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{blueprintValidation.message}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {Object.entries(blueprintValidation.breakdown || {}).map(([subj, info]: [string, any]) => (
                      <div
                        key={subj}
                        className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-white">{subj}</div>
                          <div className="text-[11px] text-slate-400">
                            Requested: {info.requested} • Available: {info.available}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            info.satisfied
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {info.satisfied ? 'Satisfied' : `Deficit: ${info.requested - info.available}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs mt-4">
                  Configure question counts on the left and click "Verify Blueprint Availability".
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800">
              Rule: PREPORA never silently substitutes unrelated questions to fulfill a test.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Live Test Monitoring (Section 16 of task1.md) */}
      {activeTab === 'monitoring' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Active Sessions in Progress</div>
              <div className="text-2xl font-black text-white mt-1">
                {monitoringData?.inProgressCount || 0}
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">Live Student Sessions</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Completed Today</div>
              <div className="text-2xl font-black text-white mt-1">
                {monitoringData?.completedTodayCount || 0}
              </div>
              <div className="text-[11px] text-brand-400 mt-0.5">Tests Graded</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Submission Failure Rate</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {monitoringData?.submissionFailureRate || '0.0%'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Resilient Sync Engine Active</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Active Test Hall Monitoring</span>
              <button
                onClick={fetchMonitoring}
                className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {monitoringData?.activeTests?.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No tests currently in progress. Start a test in the student app to see live telemetry.
                </div>
              ) : (
                monitoringData?.activeTests?.map((t: any) => (
                  <div key={t.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{t.testTitle}</div>
                      <div className="text-[11px] text-slate-400">Student: {t.userName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold font-mono">
                        Time Remaining: {Math.round((t.timeRemainingSeconds || 0) / 60)}m
                      </div>
                      <div className="text-[11px] text-slate-500">
                        At Question #{t.currentQuestionIndex + 1}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
