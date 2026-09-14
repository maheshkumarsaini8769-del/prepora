import React, { useState } from 'react';
import { Target, Award, Trophy, Sparkles, CheckCircle2, Flame, Calendar, ArrowRight, Edit3 } from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { StudentGoal } from '../types';

export const GoalsPage: React.FC = () => {
  const user = userService.getProfile();
  const [goal, setGoal] = useState<StudentGoal>(() => ecosystemService.getGoals());
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [targetScoreInput, setTargetScoreInput] = useState<number>(goal.targetScore);
  const [targetDateInput, setTargetDateInput] = useState<string>(goal.targetDate);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = ecosystemService.updateGoalTargets(targetScoreInput, targetDateInput);
    setGoal({ ...updated });
    setShowEditModal(false);
  };

  const progressPercent = Math.min(100, Math.round((goal.currentEstimatedScore / goal.targetScore) * 100));

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Target Exam Benchmarks & Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Goals & Milestones Tracker
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Set ambitious yet realistic target scores for your exam. Track progress milestones and earn achievement badges along your preparation journey.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={() => setShowEditModal(true)}
          className="bg-white text-purple-950 hover:bg-purple-50 font-bold shadow-md shrink-0 text-xs py-2 px-4 self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 mr-1.5 text-purple-700" />
          Edit Target
        </Button>
      </div>

      {/* Target Progress Pillar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600">Target Trajectory</span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">{goal.targetExam} Target Score Tracking</h2>
            </div>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Target Exam Date: <strong>{goal.targetDate}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold block">Current Estimated Score</span>
              <div className="text-3xl font-black text-purple-900 mt-1">
                {goal.currentEstimatedScore} <span className="text-xs text-purple-600">/ {goal.maxScore}</span>
              </div>
              <span className="text-[11px] text-purple-700 font-bold mt-1 block">Based on mock tests</span>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold block">Target Score Goal</span>
              <div className="text-3xl font-black text-amber-900 mt-1">
                {goal.targetScore} <span className="text-xs text-amber-600">/ {goal.maxScore}</span>
              </div>
              <span className="text-[11px] text-amber-700 font-bold mt-1 block">Desired cut-off tier</span>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold block">Goal Alignment</span>
              <div className="text-3xl font-black text-emerald-900 mt-1">
                {progressPercent}%
              </div>
              <span className="text-[11px] text-emerald-700 font-bold mt-1 block">Gap: +{goal.targetScore - goal.currentEstimatedScore} pts</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Trajectory to Goal</span>
              <span className="text-purple-700">{progressPercent}% Achieved</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-amber-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Gamification Streak & Consistency Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <Badge variant="warning" size="sm">Active Flame</Badge>
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900">Consistency Multiplier</h3>
              <p className="text-xs text-slate-500 mt-0.5">{user.streakDays} Consecutive Study Days</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Studying 45+ minutes daily increases memory retention by 3.2x compared to irregular weekend cramming sessions.
            </p>
          </div>

          <div className="p-3 bg-white/80 rounded-2xl border border-amber-200/60 text-xs text-slate-700 font-semibold flex items-center justify-between">
            <span>Next Milestone: 7-Day Streak</span>
            <span className="text-amber-700 font-black">2 Days away</span>
          </div>
        </div>
      </div>

      {/* Milestones Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Preparation Milestones</h2>
            <p className="text-xs text-slate-500">Structured checkpoints that unlock true exam mastery</p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {goal.milestones.filter(m => m.achieved).length} of {goal.milestones.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goal.milestones.map(m => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                m.achieved
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-xl shrink-0">
                {m.rewardBadge}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900">{m.title}</h4>
                  {m.achieved ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">{m.description}</p>

                <div className="pt-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                    <span>Progress: {m.currentValue} / {m.targetValue} {m.unit}</span>
                    <span>{Math.min(100, Math.round((m.currentValue / m.targetValue) * 100))}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        m.achieved ? 'bg-emerald-500' : 'bg-purple-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.round((m.currentValue / m.targetValue) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Target Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Target Score & Exam Date"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleUpdate}>
              Save Target
            </Button>
          </div>
        }
      >
        <form onSubmit={handleUpdate} className="space-y-4 py-1">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Score (Out of {goal.maxScore})</label>
            <input
              type="number"
              value={targetScoreInput}
              onChange={e => setTargetScoreInput(parseInt(e.target.value, 10) || 100)}
              min="50"
              max={goal.maxScore}
              step="5"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Exam Date</label>
            <input
              type="date"
              value={targetDateInput}
              onChange={e => setTargetDateInput(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};