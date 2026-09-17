import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Layers,
  Plus,
  Check,
  SkipForward,
  ShieldCheck,
  Target
} from 'lucide-react';
import { Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { DailyPlan, DailyPlanItem, SubjectName } from '../types';

export const DailyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => ecosystemService.getDailyPlan());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectName>('Physics');
  const [newChapter, setNewChapter] = useState('');
  const [newMinutes, setNewMinutes] = useState(20);
  const [newQuestions, setNewQuestions] = useState(15);
  const [newType, setNewType] = useState<DailyPlanItem['type']>('practice');

  const handleToggle = (id: string) => {
    const updated = ecosystemService.toggleDailyPlanItem(id);
    setDailyPlan({ ...updated });
  };

  const handleSkip = (id: string) => {
    const items = dailyPlan.items.map(item => {
      if (item.id === id) {
        return { ...item, status: 'skipped' as const };
      }
      return item;
    });
    const updated = { ...dailyPlan, items };
    localStorage.setItem('prepora_daily_plan', JSON.stringify(updated));
    setDailyPlan(updated);
  };

  const handleRegenerate = () => {
    localStorage.removeItem('prepora_daily_plan');
    const fresh = ecosystemService.getDailyPlan();
    setDailyPlan({ ...fresh });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: DailyPlanItem = {
      id: `dp-custom-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      chapter: newChapter.trim() || 'General',
      durationMinutes: newMinutes,
      questionCount: newQuestions,
      status: 'pending',
      type: newType,
      actionUrl: newType === 'test' ? '/tests' : newType === 'revision' ? '/revision' : `/practice?subject=${newSubject}&chapter=${encodeURIComponent(newChapter.trim() || 'All')}`
    };

    const updated: DailyPlan = {
      ...dailyPlan,
      totalDurationMinutes: dailyPlan.totalDurationMinutes + newMinutes,
      items: [...dailyPlan.items, newItem]
    };

    localStorage.setItem('prepora_daily_plan', JSON.stringify(updated));
    setDailyPlan(updated);
    setShowAddModal(false);
    setNewTitle('');
    setNewChapter('');
  };

  const completedCount = dailyPlan.items.filter(i => i.status === 'completed').length;
  const totalTasks = dailyPlan.items.length || 1;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>Targeted Daily Preparation Sequence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Smart Daily Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Rule-based sequence calibrated from your weak topics, pending spaced revisions, and mistake logs. Zero guesswork — start task 1 and build momentum.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[210px] shrink-0 space-y-2">
          <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider block">
            Today's Execution ({formattedDate})
          </span>
          <div className="text-3xl font-black text-white">
            {completedCount} / {totalTasks} Completed
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-purple-200 block font-medium">
            {dailyPlan.completedMinutes} of {dailyPlan.totalDurationMinutes} minutes finished ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>Planned Commitment: <strong>{dailyPlan.totalDurationMinutes} Minutes</strong></span>
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-600 font-semibold">
            {user.targetExam} Aspirant (Class {user.classLevel})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRegenerate}
            className="text-xs font-bold py-1.5 px-3"
            title="Recalculate plan from latest test attempts & mistakes"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Regenerate Plan</span>
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="text-xs font-bold py-1.5 px-3"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {/* Rule-Based Transparency Notice (task4.md Section 31 - No Fake AI Claim) */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-purple-950 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-purple-900 block text-xs mb-0.5">
            How Today's Plan Is Generated (Deterministic Rule-Based Algorithm):
          </strong>
          <p className="text-purple-800 leading-relaxed text-[11px]">
            Tasks are ranked by: (1) your lowest accuracy chapter from recent drills, (2) flashcards due for Leitner interval review today, (3) mistake book error clusters, and (4) a short 10-question mini mock. No random topics.
          </p>
        </div>
      </div>

      {/* Daily Plan Tasks List */}
      <div className="space-y-3.5">
        {dailyPlan.items.map((item, index) => {
          const isDone = item.status === 'completed';
          const isSkipped = item.status === 'skipped';

          let typeColor = 'bg-purple-50 text-purple-700 border-purple-200';
          if (item.type === 'revision') typeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (item.type === 'test') typeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-50/80 border-slate-200/80 opacity-75'
                  : isSkipped
                  ? 'bg-slate-50 border-slate-200 opacity-50'
                  : 'bg-white border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Complete Checkbox */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all shrink-0 mt-0.5 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white hover:border-purple-500'
                  }`}
                  title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                >
                  {isDone && <Check className="w-4 h-4" />}
                </button>

                {/* Task Details */}
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-slate-400">
                      #{index + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${typeColor}`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.subject}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.durationMinutes} min
                    </span>
                    {item.questionCount && (
                      <span className="flex items-center gap-1 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {item.questionCount} Questions
                      </span>
                    )}
                    {isDone && (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                    {isSkipped && (
                      <span className="text-slate-400 font-bold">
                        Skipped
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {!isDone && !isSkipped && (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(item.actionUrl)}
                      className="text-xs font-bold py-2 px-4 shadow-xs"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleSkip(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Skip this task"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </>
                )}

                {isDone && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(item.actionUrl)}
                    className="text-xs font-bold py-1.5 px-3"
                  >
                    <span>Practice Again</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Daily Study Task"
        maxWidth="max-w-md"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddTask}>
              Add to Today's Plan
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddTask} className="space-y-4 py-2 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Task Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. Physics — Laws of Motion Drill"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <select
                value={newSubject}
                onChange={e => setNewSubject(e.target.value as SubjectName)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Type</label>
              <select
                value={newType}
                onChange={e => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none bg-white"
              >
                <option value="practice">Practice Drill</option>
                <option value="revision">Revision</option>
                <option value="test">Mock Test</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Duration (min)</label>
              <input
                type="number"
                min={5}
                max={120}
                value={newMinutes}
                onChange={e => setNewMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Question Count</label>
              <input
                type="number"
                min={5}
                max={50}
                value={newQuestions}
                onChange={e => setNewQuestions(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
