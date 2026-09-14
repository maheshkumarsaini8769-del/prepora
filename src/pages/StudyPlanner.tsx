import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Target
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { PlannerTask, SubjectName } from '../types';

export const StudyPlanner: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const [tasks, setTasks] = useState<PlannerTask[]>(() => ecosystemService.getPlannerTasks());
  const [selectedDay, setSelectedDay] = useState<PlannerTask['day']>('Monday');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

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

  const handleToggleTask = (id: string) => {
    const updated = ecosystemService.togglePlannerTask(id);
    setTasks([...updated]);
  };

  const handleDeleteTask = (id: string) => {
    const updated = ecosystemService.deletePlannerTask(id);
    setTasks([...updated]);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const created = ecosystemService.addPlannerTask({
      day: selectedDay,
      subject: newTaskSubject,
      chapter: newTaskChapter.trim() || 'General Revision',
      taskType: newTaskType,
      durationMinutes: newTaskDuration,
      completed: false,
      notes: newTaskNotes.trim() || undefined
    });

    setTasks(prev => [...prev, created]);
    setShowAddModal(false);
    setNewTaskNotes('');
  };

  const currentDayTasks = tasks.filter(t => t.day === selectedDay);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length || 1;
  const weeklyProgress = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>Weekly Study Timetable & Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Personal Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Plan your weekly study distribution across subjects. Keep targets realistic, check off completed slots, and avoid burnout.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-purple-200 font-bold block">
              Weekly Execution
            </span>
            <div className="text-3xl font-black text-white">{completedCount} / {totalTasks} Slots</div>
            <div className="w-36 bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="bg-white text-purple-950 hover:bg-purple-50 font-bold shadow-md shrink-0 text-xs py-2 px-3"
          >
            <Plus className="w-4 h-4 mr-1 text-purple-700" />
            <span>Add Slot</span>
          </Button>
        </div>
      </div>

      {/* Days of Week Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {daysOfWeek.map(day => {
          const dayCount = tasks.filter(t => t.day === day).length;
          const dayDone = tasks.filter(t => t.day === day && t.completed).length;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-purple-600 border-purple-600 text-white shadow-md scale-[1.02]'
                  : 'bg-white border-slate-200/80 text-slate-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">{day.slice(0, 3)}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {dayDone}/{dayCount}
                </span>
              </div>
              <span className={`text-[11px] mt-1 block truncate ${
                isSelected ? 'text-purple-100' : 'text-slate-400'
              }`}>
                {day}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tasks for the Selected Day */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900">{selectedDay}'s Study Tasks</h2>
            <Badge variant="brand" size="sm">{currentDayTasks.length} Slots</Badge>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddModal(true)}
            className="text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Task
          </Button>
        </div>

        {currentDayTasks.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">No scheduled study tasks for {selectedDay}.</p>
            <Button size="sm" variant="primary" onClick={() => setShowAddModal(true)} className="text-xs font-bold">
              Schedule First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentDayTasks.map(t => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  t.completed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200/90 hover:border-purple-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggleTask(t.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-0.5 transition-all ${
                      t.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 hover:border-purple-500 bg-white'
                    }`}
                  >
                    {t.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <Badge variant="brand" size="sm">{t.subject}</Badge>
                      <span className={`text-xs font-bold ${t.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {t.chapter}
                      </span>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {t.taskType}
                      </span>
                    </div>
                    {t.notes && (
                      <p className="text-[11px] text-slate-500 italic mt-1 truncate">
                        "{t.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-9 sm:pl-0">
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {t.durationMinutes} mins
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/practice?chapter=${encodeURIComponent(t.chapter)}`)}
                      className="text-xs font-bold px-3 py-1"
                    >
                      Start
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add Task to ${selectedDay}`}
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddTask}>
              Add Slot
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddTask} className="space-y-4 py-1">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
            <select
              value={newTaskSubject}
              onChange={e => setNewTaskSubject(e.target.value as SubjectName)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Chapter Name</label>
            <input
              type="text"
              value={newTaskChapter}
              onChange={e => setNewTaskChapter(e.target.value)}
              placeholder="e.g. Kinematics, Chemical Bonding..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Activity Type</label>
              <select
                value={newTaskType}
                onChange={e => setNewTaskType(e.target.value as PlannerTask['taskType'])}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Practice">Practice Qs</option>
                <option value="Revision">Revision</option>
                <option value="Concept">Concept Reading</option>
                <option value="Formula">Formula Cards</option>
                <option value="Test">Mini Mock Test</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={newTaskDuration}
                onChange={e => setNewTaskDuration(parseInt(e.target.value, 10) || 15)}
                min="10"
                max="180"
                step="5"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Notes (Optional)</label>
            <input
              type="text"
              value={newTaskNotes}
              onChange={e => setNewTaskNotes(e.target.value)}
              placeholder="e.g. Solve 20 questions or review derivations"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};