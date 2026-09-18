import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { testService } from '../services/testService';
import { userService } from '../services/userService';
import { SubjectName } from '../types';

export const Performance: React.FC = () => {
  const navigate = useNavigate();
  const metrics = progressService.getPerformanceMetrics();
  const attempts = testService.getAllAttempts();
  const user = userService.getProfile();

  // State for interactive secondary diagnostics
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [targetScoreSlider, setTargetScoreSlider] = useState<number>(user.targetExam === 'NEET' ? 620 : 220);
  const [showAdvancedDiagnostics, setShowAdvancedDiagnostics] = useState<boolean>(false);

  const maxPossibleScore = user.targetExam === 'NEET' ? 720 : 300;
  const scoreRatio = targetScoreSlider / maxPossibleScore;
  const predictedRankLow = Math.max(150, Math.round(100000 * Math.pow(1 - scoreRatio, 2.2)));
  const predictedRankHigh = Math.round(predictedRankLow * 1.35);
  const predictedPercentile = (Math.max(80, Math.min(99.9, (scoreRatio * 100) + (metrics.overallAccuracy - 70) * 0.2))).toFixed(1);

  const weakTopics = [
    { name: 'Kinematics Graphs', chapter: 'Kinematics', accuracy: 43, reason: 'Rushed slopes & negative signs', actionUrl: '/practice?chapter=Kinematics&topic=Velocity%20%26%20Acceleration%20Graphs' },
    { name: 'Relative Motion', chapter: 'Kinematics', accuracy: 48, reason: 'Vector frame errors', actionUrl: '/practice?chapter=Kinematics&topic=Relative%20Motion%20%26%20Frame%20Analysis' },
    { name: 'Ionic Equilibrium Buffers', chapter: 'Equilibrium', accuracy: 44, reason: 'Weak acid-base assumptions', actionUrl: '/practice?chapter=Equilibrium' }
  ];

  const recentAttempts = attempts.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Performance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Summary of your test scores, accuracy trajectory, and target areas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/tests/build')}
            className="text-xs font-semibold py-2 px-3 border-slate-300 text-slate-700"
          >
            Build Test
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/practice')}
            className="text-xs font-semibold py-2 px-3 bg-slate-900 hover:bg-black text-white"
          >
            Start Practice
          </Button>
        </div>
      </div>

      {/* 2. Top Summary Group (Unified, not 10 floating cards) */}
      <Card className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Average Score</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {metrics.averageTestScorePct}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{metrics.testsCompleted} tests completed</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Accuracy</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {metrics.overallAccuracy}%
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Top 15% in {user.targetExam}</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Questions Solved</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {metrics.questionsAttempted}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{metrics.studyHours} hours logged</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Projected AIR</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              ~{predictedRankLow.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">{predictedPercentile}th percentile</div>
          </div>
        </div>
      </Card>

      {/* 3. Performance Trend (Chart + Difficulty Yield) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 7-Day Accuracy Trend */}
        <Card className="p-6 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-900">7-Day Accuracy Trajectory</h3>
            <span className="text-xs text-slate-500 font-medium">Target: 85%</span>
          </div>

          <div className="pt-4 pb-2">
            <div className="h-36 flex items-end justify-between gap-3 px-2 border-b border-slate-200">
              {metrics.accuracyTrend.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] font-semibold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.accuracy}%
                  </div>
                  <div
                    className="w-full max-w-[36px] bg-slate-900 hover:bg-black rounded-t transition-all"
                    style={{ height: `${Math.max(15, item.accuracy)}%` }}
                  />
                  <div className="text-[10px] text-slate-400 mt-2 font-medium">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Difficulty Breakdown */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-900">Difficulty Accuracy</h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Easy</span>
                <span className="font-bold text-slate-900">91%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Medium</span>
                <span className="font-bold text-slate-900">68%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Hard</span>
                <span className="font-bold text-slate-900">37%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '37%' }} />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              Concepts are solid on straightforward problems. Focus on multi-step and hard variants.
            </p>
          </div>
        </Card>
      </div>

      {/* 4. Weak Areas & Immediate Action */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-slate-900">Identified Weak Areas</h3>
            <p className="text-xs text-slate-500">Topics requiring focused practice before your next full mock.</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/mistakes')}
            className="text-xs font-semibold py-1 px-2.5"
          >
            Mistake Book
          </Button>
        </div>

        <div className="space-y-2.5 pt-1">
          {weakTopics.map((topic, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-bold text-slate-900">{topic.name}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {topic.chapter} • Accuracy: <span className="text-rose-600 font-bold">{topic.accuracy}%</span> • {topic.reason}
                </div>
              </div>

              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate(topic.actionUrl)}
                className="self-start sm:self-auto text-xs font-semibold py-1.5 px-3 bg-slate-900 hover:bg-black text-white"
              >
                Practice Topic
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Progressive Disclosure: Deep Diagnostics & Rank Simulator */}
      <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-4">
        <button
          type="button"
          onClick={() => setShowAdvancedDiagnostics(!showAdvancedDiagnostics)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <span>More: Rank Simulator & Detailed Diagnostics</span>
          {showAdvancedDiagnostics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvancedDiagnostics && (
          <div className="pt-3 border-t border-slate-100 space-y-6">
            {/* Target Score Simulation Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Target Score Simulator ({user.targetExam})</span>
                <span className="font-bold text-slate-900">{targetScoreSlider} / {maxPossibleScore}</span>
              </div>
              <input
                type="range"
                min={user.targetExam === 'NEET' ? 300 : 80}
                max={maxPossibleScore}
                step={5}
                value={targetScoreSlider}
                onChange={(e) => setTargetScoreSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex justify-between">
                <span>Predicted Rank: <strong>AIR {predictedRankLow.toLocaleString()} - {predictedRankHigh.toLocaleString()}</strong></span>
                <span>Projected Percentile: <strong>{predictedPercentile}th</strong></span>
              </div>
            </div>

            {/* Recent Scorecards */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Recent Exam Scorecards</h4>
              {recentAttempts.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No exam scorecards available yet. Complete a test to see your scores.
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {recentAttempts.map((att) => (
                    <div
                      key={att.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{att.testTitle}</div>
                        <div className="text-[11px] text-slate-500">
                          {att.correctCount} Right, {att.wrongCount} Wrong • {att.accuracyPercentage}% Accuracy
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900">{att.totalScore} / {att.maxScore}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/tests/${att.testId}/result`)}
                          className="text-[11px] py-1 px-2 text-slate-700"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
