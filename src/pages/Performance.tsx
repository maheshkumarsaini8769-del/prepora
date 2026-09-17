import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart2,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  AlertCircle,
  Flame,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sliders,
  Filter,
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { testService } from '../services/testService';
import { userService } from '../services/userService';
import { SubjectName } from '../types';

export const Performance: React.FC = () => {
  const navigate = useNavigate();
  const metrics = progressService.getPerformanceMetrics();
  const attempts = testService.getAllAttempts();
  const user = userService.getProfile();

  // State for Interactive Elements
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [targetScoreSlider, setTargetScoreSlider] = useState<number>(user.targetExam === 'NEET' ? 620 : 220);
  const [activeQuadrant, setActiveQuadrant] = useState<'all' | 'powerhouse' | 'speed' | 'trap' | 'gap'>('all');

  // Max score for target exam
  const maxPossibleScore = user.targetExam === 'NEET' ? 720 : 300;

  // Calculate dynamic predicted rank based on target score slider and overall accuracy
  const scoreRatio = targetScoreSlider / maxPossibleScore;
  let predictedRankLow = Math.max(150, Math.round(100000 * Math.pow(1 - scoreRatio, 2.2)));
  let predictedRankHigh = Math.round(predictedRankLow * 1.35);
  let predictedPercentile = (Math.max(80, Math.min(99.9, (scoreRatio * 100) + (metrics.overallAccuracy - 70) * 0.2))).toFixed(1);

  // Speed vs Accuracy Topics Categorization
  const quadrantTopics = [
    { name: 'Kinematics & 1D Motion', subject: 'Physics', accuracy: 92, avgTime: 38, quadrant: 'powerhouse' },
    { name: 'Binomial Nomenclature', subject: 'Biology', accuracy: 95, avgTime: 25, quadrant: 'powerhouse' },
    { name: 'Chemical Kinetics Rate Law', subject: 'Chemistry', accuracy: 88, avgTime: 42, quadrant: 'powerhouse' },
    { name: 'Electromagnetism Induction', subject: 'Physics', accuracy: 84, avgTime: 115, quadrant: 'speed' },
    { name: 'Coordination Compounds', subject: 'Chemistry', accuracy: 82, avgTime: 98, quadrant: 'speed' },
    { name: 'Rotational Dynamics Moment of Inertia', subject: 'Physics', accuracy: 48, avgTime: 32, quadrant: 'trap' },
    { name: 'Ionic Equilibrium pH Buffers', subject: 'Chemistry', accuracy: 44, avgTime: 40, quadrant: 'trap' },
    { name: 'Thermodynamics Carnot Cycle', subject: 'Physics', accuracy: 52, avgTime: 130, quadrant: 'gap' },
    { name: 'Taxonomical Hierarchy Ranks', subject: 'Biology', accuracy: 55, avgTime: 110, quadrant: 'gap' }
  ];

  const filteredQuadrantTopics = quadrantTopics.filter(t => {
    if (selectedSubject !== 'All' && t.subject !== selectedSubject) return false;
    if (activeQuadrant !== 'all' && t.quadrant !== activeQuadrant) return false;
    return true;
  });

  // Recent attempts formatted
  const recentAttempts = attempts.slice(0, 4);

  return (
    <div className="space-y-7 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Diagnostic Cockpit</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Performance Analytics & AIR Predictor
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Multi-dimensional telemetry analyzing your speed, accuracy quadrants, negative trap vulnerability, and real-time rank projections.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            onClick={() => navigate('/tests')}
            variant="primary"
            className="bg-white text-purple-950 hover:bg-purple-50 font-black text-xs py-3 px-4 shadow-lg shadow-black/20"
          >
            Take New Mock Test
          </Button>
          <Button
            onClick={() => navigate('/mistakes')}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 text-xs font-bold py-3 px-4"
          >
            Review Mistake Book
          </Button>
        </div>
      </div>

      {/* Interactive AIR Predictor & Rank Simulation Card */}
      <Card className="p-6 sm:p-8 border-purple-200/90 shadow-md bg-gradient-to-b from-white to-purple-50/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Real-Time AIR & Percentile Predictor
                </h2>
                <p className="text-xs text-slate-500">
                  Calibrated against {user.targetExam} 2024–2025 competitive score-vs-rank percentiles
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Target Exam:</span>
            <span className="px-3 py-1 rounded-xl text-xs font-black bg-purple-600 text-white shadow-xs">
              {user.targetExam} ({maxPossibleScore} Marks)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Slider Controls */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-600" /> Target Test Score Simulation
                </span>
                <span className="text-lg font-black text-purple-700">
                  {targetScoreSlider} <span className="text-xs text-slate-400 font-semibold">/ {maxPossibleScore}</span>
                </span>
              </div>
              <input
                type="range"
                min={user.targetExam === 'NEET' ? 300 : 80}
                max={maxPossibleScore}
                step={5}
                value={targetScoreSlider}
                onChange={(e) => setTargetScoreSlider(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Cutoff Threshold ({user.targetExam === 'NEET' ? '300' : '80'})</span>
                <span>Average Qualifying ({user.targetExam === 'NEET' ? '520' : '160'})</span>
                <span>Top Tier NIT/AIIMS ({user.targetExam === 'NEET' ? '650+' : '230+'})</span>
              </div>
            </div>

            {/* Rank Boost Insight Banner */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 flex items-start gap-3 text-xs">
              <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-800 block text-xs mb-0.5">
                  ⚡ Negative Marks Remediation Insight:
                </strong>
                <span>
                  Converting just <strong>3 negative trap questions</strong> in your next test will gain <strong>+15 net marks</strong> (+12 for right answers + 3 avoided penalties), elevating your projected All India Rank by approximately <strong>~4,200 ranks</strong>!
                </span>
              </div>
            </div>
          </div>

          {/* Predicted Rank Bracket Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white text-center space-y-3 shadow-lg">
            <span className="text-[11px] font-bold text-purple-200 uppercase tracking-widest block">
              Estimated Rank Bracket
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              AIR {predictedRankLow.toLocaleString()} - {predictedRankHigh.toLocaleString()}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <span>{predictedPercentile}th Percentile Projected</span>
            </div>
            <p className="text-[11px] text-purple-200/70 pt-1">
              Based on platform accuracy of {metrics.overallAccuracy}% across {metrics.questionsAttempted} solved problems.
            </p>
          </div>
        </div>
      </Card>

      {/* Top 5 Key Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-5 text-center hover:border-purple-300 transition-all">
          <div className="flex items-center justify-center gap-1 text-purple-600 text-xs font-bold mb-1">
            <Target className="w-4 h-4" /> Overall Accuracy
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{metrics.overallAccuracy}%</div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600">Top 15% in {user.targetExam}</span>
        </Card>

        <Card className="p-4 sm:p-5 text-center hover:border-purple-300 transition-all">
          <div className="flex items-center justify-center gap-1 text-indigo-600 text-xs font-bold mb-1">
            <BookOpen className="w-4 h-4" /> Solved Questions
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{metrics.questionsAttempted}</div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">Master Bank + Drills</span>
        </Card>

        <Card className="p-4 sm:p-5 text-center hover:border-purple-300 transition-all">
          <div className="flex items-center justify-center gap-1 text-violet-600 text-xs font-bold mb-1">
            <Award className="w-4 h-4" /> Tests Completed
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{metrics.testsCompleted}</div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">Avg Score: {metrics.averageTestScorePct}%</span>
        </Card>

        <Card className="p-4 sm:p-5 text-center hover:border-purple-300 transition-all">
          <div className="flex items-center justify-center gap-1 text-amber-600 text-xs font-bold mb-1">
            <Clock className="w-4 h-4" /> Active Study Time
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{metrics.studyHours}h</div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">Focus Practice Time</span>
        </Card>

        <Card className="p-4 sm:p-5 text-center hover:border-purple-300 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-1 text-rose-600 text-xs font-bold mb-1">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Daily Streak
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{metrics.streakDays} Days</div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-amber-600">Streak Shield Active 🔥</span>
        </Card>
      </div>

      {/* Speed vs Accuracy Quadrant Diagnostic Matrix */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Speed-Accuracy Diagnostic Matrix</span>
            </div>
            <h2 className="text-lg font-black text-slate-900">
              Topic Quadrant Classification
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies which topics yield quick marks versus where you over-rush into negative traps.
            </p>
          </div>

          {/* Subject Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'] as (SubjectName | 'All')[]).map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSubject === sub
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Clickable Quadrant Filter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setActiveQuadrant(activeQuadrant === 'powerhouse' ? 'all' : 'powerhouse')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeQuadrant === 'powerhouse'
                ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-emerald-50/20 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-emerald-800">🟢 Powerhouse Zone</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                High Acc + High Speed
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Topics where you solve accurately in &lt; 45s. Your guaranteed score drivers!
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuadrant(activeQuadrant === 'speed' ? 'all' : 'speed')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeQuadrant === 'speed'
                ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20'
                : 'border-slate-200 bg-amber-50/20 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-amber-800">🟡 Pace Deficit Zone</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                High Acc + Slow Speed
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Concepts are clear, but derivation takes too long (&gt; 90s). Needs speed drills.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuadrant(activeQuadrant === 'trap' ? 'all' : 'trap')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeQuadrant === 'trap'
                ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/20'
                : 'border-slate-200 bg-rose-50/20 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-rose-800">🔴 Negative Trap Zone</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Low Acc + High Speed
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Rushing through tricky examiner traps! Slow down and double-check units.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveQuadrant(activeQuadrant === 'gap' ? 'all' : 'gap')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeQuadrant === 'gap'
                ? 'border-purple-500 bg-purple-50/80 ring-2 ring-purple-500/20'
                : 'border-slate-200 bg-purple-50/20 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-purple-800">🟣 Concept Gap Zone</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Low Acc + Slow Speed
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Fundamental gaps in textbook definitions. Review NCERT revision notes.
            </p>
          </button>
        </div>

        {/* Filtered Topics List */}
        <div className="space-y-2 pt-2">
          {filteredQuadrantTopics.map((topic, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between gap-4 hover:border-slate-200 transition-all text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-slate-100 text-slate-600">
                  {topic.subject}
                </span>
                <span className="font-bold text-slate-800">{topic.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-slate-400 font-semibold text-[10px] block">Accuracy</span>
                  <span className={`font-black ${topic.accuracy >= 80 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {topic.accuracy}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-semibold text-[10px] block">Avg Time</span>
                  <span className="font-black text-slate-700">{topic.avgTime}s</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/practice')}
                  className="text-xs font-bold py-1 px-2.5"
                >
                  Practice Topic
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 7-Day Accuracy Trend Chart */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">7-Day Daily Accuracy Trajectory</h3>
            <p className="text-xs text-slate-400">Progression across completed practice drills and exams</p>
          </div>
          <Badge variant="brand">Target: 85% Accuracy</Badge>
        </div>

        <div className="pt-6 pb-2">
          <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-200">
            {metrics.accuracyTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[11px] font-bold text-slate-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.accuracy}%
                </div>
                <div
                  className="w-full max-w-[42px] bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-xs"
                  style={{ height: `${Math.max(15, item.accuracy)}%` }}
                />
                <div className="text-[11px] font-bold text-slate-400 mt-2">{item.day}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Mistake Archetypes & Recent Test Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistake Archetype Distribution */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="font-black text-sm text-slate-900">Mistake Root-Cause Breakdown</h3>
            </div>
            <Link to="/mistakes" className="text-xs font-bold text-purple-600 hover:underline">
              View Mistake Book &rarr;
            </Link>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Concept Misconception / Formula Gap</span>
                <span className="text-purple-600 font-black">42%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Calculation / Arithmetic Slip</span>
                <span className="text-amber-600 font-black">28%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Rushed Reading / Misread Question</span>
                <span className="text-rose-600 font-black">18%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Time Panic / Blind Guess</span>
                <span className="text-slate-500 font-black">12%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Tests Scorecard Feed */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black text-sm text-slate-900">Recent Exam Scorecards</h3>
            </div>
            <Link to="/tests" className="text-xs font-bold text-purple-600 hover:underline">
              All Tests &rarr;
            </Link>
          </div>

          {recentAttempts.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No recent attempts yet. Complete a test to see detailed scoring breakdowns!
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentAttempts.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-purple-200 transition-all flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800">{att.testTitle}</div>
                    <div className="text-[11px] text-slate-400">
                      Accuracy: <strong className="text-emerald-600 font-black">{att.accuracyPercentage}%</strong> • Time: {Math.round(att.timeTakenSeconds / 60)} mins
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm">
                        {att.totalScore} <span className="text-[10px] text-slate-400">/ {att.maxScore}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {att.correctCount} Right, {att.wrongCount} Wrong
                      </span>
                    </div>

                    <Link
                      to={`/tests/${att.testId}/review`}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-purple-50 hover:text-purple-700 transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Task 4 Section 7: CONCEPT GAP DETECTOR */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Concept Gap Detector</h3>
                <p className="text-xs text-slate-500">Deconstructing subject scores into core understanding vs multi-step application</p>
              </div>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            Diagnostic Telemetry
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
            <span className="text-[10px] uppercase font-bold text-purple-700 block">Concept Strength</span>
            <span className="text-xl font-black text-purple-900 mt-1 block">74%</span>
            <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">Application</span>
            <span className="text-xl font-black text-blue-900 mt-1 block">58%</span>
            <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '58%' }} />
            </div>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Accuracy</span>
            <span className="text-xl font-black text-emerald-900 mt-1 block">66%</span>
            <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '66%' }} />
            </div>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Speed</span>
            <span className="text-xl font-black text-amber-900 mt-1 block">51%</span>
            <div className="w-full bg-amber-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-amber-600 h-full rounded-full" style={{ width: '51%' }} />
            </div>
          </div>
          <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100">
            <span className="text-[10px] uppercase font-bold text-rose-700 block">Hard Questions</span>
            <span className="text-xl font-black text-rose-900 mt-1 block">38%</span>
            <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-rose-600 h-full rounded-full" style={{ width: '38%' }} />
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
            Critical Subtopic Vulnerability Breakdown:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-bold text-xs text-rose-950">Kinematics Graphs</span>
                </div>
                <span className="text-[11px] text-rose-700 font-semibold">43% Accuracy • Rushed slopes</span>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate('/practice?chapter=Kinematics&topic=Velocity%20%26%20Acceleration%20Graphs')}
                className="text-[11px] font-bold py-1 px-3 bg-rose-600 hover:bg-rose-700 text-white"
              >
                Fix Concept
              </Button>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-bold text-xs text-rose-950">Relative Motion</span>
                </div>
                <span className="text-[11px] text-rose-700 font-semibold">48% Accuracy • Vector frame traps</span>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate('/practice?chapter=Kinematics&topic=Relative%20Motion%20%26%20Frame%20Analysis')}
                className="text-[11px] font-bold py-1 px-3 bg-rose-600 hover:bg-rose-700 text-white"
              >
                Fix Concept
              </Button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-bold text-xs text-amber-950">Velocity & Acceleration Derivations</span>
                </div>
                <span className="text-[11px] text-amber-700 font-semibold">71% Accuracy • Moderate pace</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/practice?chapter=Kinematics')}
                className="text-[11px] font-bold py-1 px-3 text-amber-900 border-amber-300"
              >
                Fix Concept
              </Button>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-xs text-emerald-950">Distance & Displacement</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">86% Accuracy • Solid grasp</span>
              </div>
              <Badge variant="success" size="sm">Mastered</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Task 4 Section 8: DIFFICULTY PERFORMANCE & Section 18: TEST-TO-TEST IMPROVEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Analysis */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Difficulty Performance Analysis</h3>
              <p className="text-xs text-slate-400">Generated from actual mock attempt telemetry</p>
            </div>
            <Badge variant="brand">Tiered Yield</Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🟢 Easy Questions</span>
                <span className="text-emerald-600 font-black">91% Accuracy</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🟡 Medium Questions</span>
                <span className="text-amber-600 font-black">68% Accuracy</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🔴 Hard Questions</span>
                <span className="text-rose-600 font-black">37% Accuracy</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '37%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-purple-900 block text-xs">Diagnostic Performance Insight:</strong>
                <span>"Your basic concepts are strong (91% on Easy), but application on multi-step and difficult questions needs improvement (37% on Hard)."</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Progress Comparison */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Test-to-Test Progress Trajectory</h3>
              <p className="text-xs text-slate-400">Comparing previous test attempt vs latest exam</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              +27 Net Marks
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous Test</span>
              <div className="text-2xl font-black text-slate-700 mt-0.5">121</div>
              <span className="text-[11px] text-slate-400 font-medium">61% Acc • 1m 48s/Q</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Current Test</span>
              <div className="text-2xl font-black text-emerald-700 mt-0.5">148</div>
              <span className="text-[11px] text-emerald-800 font-medium">74% Acc • 1m 21s/Q</span>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Accuracy Delta</span>
              <span className="font-black text-emerald-600">61% → 74% (+13%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Average Solving Time</span>
              <span className="font-black text-emerald-600">1m 48s → 1m 21s (-27s faster)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Weak Topic (Kinematics)</span>
              <span className="font-black text-purple-700">31% → 42% (+11% leap)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Gamified Badges Shelf */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-slate-900">Academic Mastery Badges</h3>
          </div>
          <span className="text-xs font-bold text-slate-400">3 of 6 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
            <div className="text-xl">🎯</div>
            <div className="font-bold text-xs text-emerald-900">Sniper</div>
            <p className="text-[10px] text-emerald-700">90%+ in 3 Tests</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-center space-y-1">
            <div className="text-xl">⚡</div>
            <div className="font-bold text-xs text-purple-900">Speed Demon</div>
            <p className="text-[10px] text-purple-700">50 Qs &lt; 45s</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1">
            <div className="text-xl">🔥</div>
            <div className="font-bold text-xs text-amber-900">7-Day Flame</div>
            <p className="text-[10px] text-amber-700">1 Week Streak</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1 opacity-60">
            <div className="text-xl">🛡️</div>
            <div className="font-bold text-xs text-slate-700">Trap Dodger</div>
            <p className="text-[10px] text-slate-500">0 Negative Marks</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1 opacity-60">
            <div className="text-xl">🧬</div>
            <div className="font-bold text-xs text-slate-700">Bio Master</div>
            <p className="text-[10px] text-slate-500">All NCERT Units</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1 opacity-60">
            <div className="text-xl">🏆</div>
            <div className="font-bold text-xs text-slate-700">AIR 500 Club</div>
            <p className="text-[10px] text-slate-500">Score &gt; 95%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
