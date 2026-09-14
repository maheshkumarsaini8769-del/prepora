import React from 'react';
import { Award, TrendingUp, Users, Shield, ArrowLeft } from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { useNavigate } from 'react-router-dom';

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const data = ecosystemService.getLeaderboard();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Benchmark Rankings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Weekly Leaderboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare your weekly mock exam pacing and accuracy with student peer cohorts.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/tests')}>
          <ArrowLeft className="w-4 h-4" /> Go to Tests
        </Button>
      </div>

      {/* Cohort Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="text-xs text-purple-700 font-bold mb-1">Your Standing</div>
          <div className="text-3xl font-black text-purple-950">#{data.userRank}</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Top 8th percentile</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-xs text-emerald-600 font-bold mb-1">Topper Average</div>
          <div className="text-3xl font-black text-slate-800">{data.topperAverage} <span className="text-xs font-semibold text-slate-400">/ 300</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Top 5 percentile avg</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-xs text-slate-500 font-bold mb-1">Median Peer Score</div>
          <div className="text-3xl font-black text-slate-800">{data.medianScore} <span className="text-xs font-semibold text-slate-400">/ 300</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">National test cohort</div>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card className="p-0 overflow-hidden border border-slate-200">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">Weekly Top Performers</h3>
          <span className="text-xs text-slate-400 font-medium">Updated every Sunday midnight</span>
        </div>

        <div className="divide-y divide-slate-100">
          {data.entries.map((e, idx) => (
            <div
              key={e.rank}
              className={`p-4 flex items-center justify-between text-xs sm:text-sm transition-colors ${
                idx < 3 ? 'bg-purple-50/20' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center ${
                    idx === 0
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : idx === 1
                      ? 'bg-slate-300 text-slate-800'
                      : idx === 2
                      ? 'bg-amber-700/80 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {e.rank}
                </span>
                <div>
                  <div className="font-bold text-slate-900">{e.studentName}</div>
                  <div className="text-[11px] text-slate-400">{e.testsTaken} tests attempted</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-mono font-black text-slate-900 text-sm">{e.score} pts</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">{e.accuracy}% Accuracy</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <Shield className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>Prepora follows strict privacy guidelines: personal identification numbers and emails are never published.</span>
      </div>
    </div>
  );
};
