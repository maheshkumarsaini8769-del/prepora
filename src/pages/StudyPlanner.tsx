import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ArrowRight,
  Edit2,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';
import { Card, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { PlannerTask, SubjectName } from '../types';

interface PlannerConfig {
  targetExam: string;
  classLevel: string;
  targetDate: string;
  dailyStudyHours: number;
  prepLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  targetScore: number;
}

const PLANNER_CONFIG_KEY = 'prepora_planner_config';

export const StudyPlanner: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const [config, setConfig] = useState<PlannerConfig>(() => {
    const saved = localStorage.getItem(PLANNER_CONFIG_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      targetExam: user.targetExam || 'JEE',
      classLevel: user.classLevel || '12',
      targetDate: '2026-05-15',
      dailyStudyHours: 2.5,
      prepLevel: 'Intermediate',
      targetScore: user.targetExam === 'NEET' ? 650 : 220
    };
  });

  const [tasks, setTasks] = useState<PlannerTask[]>(() => ecosystemService.getPlannerTasks());
  const [selectedDay, setSelectedDay] = useState<PlannerTask['day']>('Monday');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateMsg, setGenerateMsg] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // Form state
  const [newTaskSubject, setNewTaskSubject] = useState<SubjectName>('Physics');
  const [newTaskChapter, setNewTaskChapter] = useState<string>('Kinematics');
  const [newTaskType, setNewTaskType] = useState<PlannerTask['taskType']>('Practice');
  const [newTaskDuration, setNewTaskDuration] = useState<number>(30);
  const [newTaskNotes, setNewTaskNotes] = useState<string>('');

  const daysOfWeek: PlannerTask['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleSaveConfig = (newConfig: Partial<PlannerConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));
  };

  const handleGenerateAdaptivePlan = () => {
    setIsGenerating(true);
    setGenerateMsg(null);
    setTimeout(() => {
      const generated = ecosystemService.generateAdaptiveWeeklyPlan({
        exam: config.targetExam,
        classLevel: config.classLevel,
        dailyMinutes: Math.round(config.dailyStudyHours * 60),
        targetDate: config.targetDate
      });
      setTasks([...generated]);
      setIsGenerating(false);
      setGenerateMsg('Weekly plan generated from your real mistake logs and weak areas!');
      setTimeout(() => setGenerateMsg(null), 4000);
    }, 600);
  };

  const handleToggleTask = (id: string) => {
    const updated = ecosystemService.togglePlannerTask(id);
    setTasks([...updated]);
  };

  const handleDeleteTask = (id: string) => {
    const updated = ecosystemService.deletePlannerTask(id);
    setTasks([...updated]);
  };

  const handleOpenAdd = () => {
    setEditingTaskId(null);
    setNewTaskSubject('Physics');
    setNewTaskChapter('');
    setNewTaskType('Practice');
    setNewTaskDuration(30);
    setNewTaskNotes('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (t: PlannerTask) => {
    setEditingTaskId(t.id);
    setNewTaskSubject(t.subject);
    setNewTaskChapter(t.chapter);
    setNewTaskType(t.taskType);
    setNewTaskDuration(t.durationMinutes);
    setNewTaskNotes(t.notes || '');
    setShowAddModal(true);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      const updated = ecosystemService.updatePlannerTask(editingTaskId, {
        subject: newTaskSubject,
        chapter: newTaskChapter.trim() || 'General Revision',
        taskType: newTaskType,
        durationMinutes: newTaskDuration,
        notes: newTaskNotes.trim() || undefined
      });
      setTasks([...updated]);
    } else {
      const created = ecosystemService.addPlannerTask({
        day: selectedDay,
        subject: newTaskSubject,
        chapter: newTaskChapter.trim() || 'General Revision',
        taskType: newTaskType,
        durationMinutes: newTaskDuration,
        completed: false,
        notes: newTaskNotes.trim() || undefined
      });
      setTasks((prev) => [...prev, created]);
    }
    setShowAddModal(false);
    setNewTaskNotes('');
  };

  const currentDayTasks = tasks.filter((t) => t.day === selectedDay);
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length || 1;
  const weeklyProgress = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Study Planner</h1>
          <p className="text-sm text-slate-500 mt-1">
            Weekly study schedule tailored to your target exam and weakness diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleGenerateAdaptivePlan}
            disabled={isGenerating}
            className="text-xs font-semibold py-2 px-3 border-slate-300 text-slate-700 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>{isGenerating ? 'Analyzing...' : 'Auto-Schedule Week'}</span>
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleOpenAdd}
            className="text-xs font-semibold py-2 px-3 bg-slate-900 hover:bg-black text-white flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {generateMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{generateMsg}</span>
        </div>
      )}

      {/* 2. Weekly Execution Progress Bar */}
      <Card className="p-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-700">Weekly Progress</span>
          <span className="text-slate-500">
            <strong>{completedCount}</strong> of <strong>{tasks.length}</strong> tasks completed ({weeklyProgress}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-slate-900 h-full rounded-full transition-all duration-300"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
      </Card>

      {/* 3. Days of the Week Tabs */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {daysOfWeek.map((day) => {
          const dayCount = tasks.filter((t) => t.day === day).length;
          const dayDone = tasks.filter((t) => t.day === day && t.completed).length;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">{day.slice(0, 3)}</span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {dayDone}/{dayCount}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Task List for Selected Day */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">{selectedDay}'s Study Tasks</h2>
          <span className="text-xs text-slate-400">{currentDayTasks.length} tasks scheduled</span>
        </div>

        {currentDayTasks.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">No scheduled study tasks for {selectedDay}.</p>
            <Button size="sm" variant="outline" onClick={handleOpenAdd} className="text-xs">
              Add First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {currentDayTasks.map((t) => (
              <div
                key={t.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                  t.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleTask(t.id)}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      t.completed
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'border-slate-300 hover:border-slate-500 bg-white'
                    }`}
                  >
                    {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{t.subject}</span>
                      <span className="text-slate-300">•</span>
                      <span className={`font-medium ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {t.chapter}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                        {t.taskType}
                      </span>
                    </div>
                    {t.notes && <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-400 font-medium">{t.durationMinutes} min</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/practice?chapter=${encodeURIComponent(t.chapter)}`)}
                    className="text-[11px] py-1 px-2.5"
                  >
                    Start
                  </Button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(t.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 5. Progressive Disclosure: Target Exam Parameters */}
      <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Target Exam & Study Parameters ({config.targetExam}, {config.dailyStudyHours}h/day)
          </span>
          {showConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showConfig && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Exam</label>
              <select
                value={config.targetExam}
                onChange={(e) => handleSaveConfig({ targetExam: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="JEE">JEE Main</option>
                <option value="JEE_ADV">JEE Advanced</option>
                <option value="NEET">NEET UG</option>
                <option value="CBSE">CBSE Board</option>
                <option value="RBSE">RBSE Board</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Class Level</label>
              <select
                value={config.classLevel}
                onChange={(e) => handleSaveConfig({ classLevel: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="Dropper">Dropper</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Daily Study Hours</label>
              <select
                value={config.dailyStudyHours}
                onChange={(e) => handleSaveConfig({ dailyStudyHours: parseFloat(e.target.value) || 2 })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="1.5">1.5 hrs</option>
                <option value="2">2.0 hrs</option>
                <option value="2.5">2.5 hrs</option>
                <option value="3">3.0 hrs</option>
                <option value="4">4.0 hrs</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Date</label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) => handleSaveConfig({ targetDate: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Preparation Tier</label>
              <select
                value={config.prepLevel}
                onChange={(e) => handleSaveConfig({ prepLevel: e.target.value as any })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Score</label>
              <input
                type="number"
                value={config.targetScore}
                onChange={(e) => handleSaveConfig({ targetScore: parseInt(e.target.value, 10) || 100 })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              />
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingTaskId ? 'Edit Study Task' : `Add Task to ${selectedDay}`}
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddTask} className="bg-slate-900 hover:bg-black text-white">
              {editingTaskId ? 'Save Changes' : 'Add Slot'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddTask} className="space-y-3 py-1 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Subject</label>
            <select
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value as SubjectName)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Chapter Name</label>
            <input
              type="text"
              value={newTaskChapter}
              onChange={(e) => setNewTaskChapter(e.target.value)}
              placeholder="e.g. Kinematics, Chemical Bonding..."
              className="w-full p-2 rounded-lg border border-slate-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Activity Type</label>
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value as PlannerTask['taskType'])}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Practice">Practice Qs</option>
                <option value="Revision">Revision</option>
                <option value="Concept">Concept Reading</option>
                <option value="Formula">Formula Cards</option>
                <option value="Test">Mini Mock Test</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={newTaskDuration}
                onChange={(e) => setNewTaskDuration(parseInt(e.target.value, 10) || 15)}
                min="10"
                max="180"
                step="5"
                className="w-full p-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Notes (Optional)</label>
            <input
              type="text"
              value={newTaskNotes}
              onChange={(e) => setNewTaskNotes(e.target.value)}
              placeholder="e.g. Solve 20 questions"
              className="w-full p-2 rounded-lg border border-slate-200"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};