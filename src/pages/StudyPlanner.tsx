import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../services/apiClient';
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
  SlidersHorizontal,
  Flame,
  BookOpen,
  Zap,
  Target,
  RotateCcw,
  CheckSquare
} from 'lucide-react';
import { Card, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { PlannerTask, SubjectName } from '../types';
import { getAllowedSubjectsForExam } from '../utils/examUtils';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';

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
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);

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

  const { isAuthenticated, token } = useAuth();
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    const existing = ecosystemService.getPlannerTasks();
    if (existing && existing.length > 0) return existing;
    return ecosystemService.generateAdaptiveWeeklyPlan({
      exam: user.targetExam || 'JEE',
      classLevel: user.classLevel || '12',
      dailyMinutes: 150,
      targetDate: '2026-05-15'
    });
  });

  const daysOfWeek: PlannerTask['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const currentDayOfWeek = useMemo<PlannerTask['day']>(() => {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as PlannerTask['day'];
    return daysOfWeek.includes(todayName) ? todayName : 'Monday';
  }, []);

  const [selectedDay, setSelectedDay] = useState<PlannerTask['day']>(() => {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as PlannerTask['day'];
    return daysOfWeek.includes(todayName) ? todayName : 'Monday';
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateMsg, setGenerateMsg] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // Form state for add / edit modal
  const [newTaskDay, setNewTaskDay] = useState<PlannerTask['day']>(selectedDay);
  const [newTaskSubject, setNewTaskSubject] = useState<SubjectName>(allowedSubjects[0] || 'Physics');
  const [newTaskChapter, setNewTaskChapter] = useState<string>('Kinematics');
  const [newTaskType, setNewTaskType] = useState<PlannerTask['taskType']>('Concept');
  const [newTaskDuration, setNewTaskDuration] = useState<number>(45);
  const [newTaskNotes, setNewTaskNotes] = useState<string>('');

  // Days remaining calculation
  const daysRemaining = useMemo(() => {
    const target = new Date(config.targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [config.targetDate]);

  // Exam phase
  const prepPhase = useMemo(() => {
    if (daysRemaining > 90) {
      return {
        title: 'Foundation & Concept Phase',
        desc: 'Deep NCERT & textbook coverage with derivation notes',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
      };
    }
    if (daysRemaining >= 30) {
      return {
        title: 'Speed & Weakness Sprint',
        desc: 'High-yield numerical problem sets and formula drills',
        badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
      };
    }
    return {
      title: 'Final Revision & Mock Sprint',
      desc: 'Full-length timed mocks, mistake book analysis, speed tests',
      badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
    };
  }, [daysRemaining]);

  // Sync with student server planner when authenticated
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let isMounted = true;
    const fetchStudentPlanner = async () => {
      try {
        const { data } = await apiRequest<any>('/planner');
        if (data && data.success && data.data?.tasks && isMounted) {
          const apiTasks = (data.data.tasks || []).map((t: any) => ({
            id: t.id,
            day: (t.day as PlannerTask['day']) || currentDayOfWeek,
            subject: (t.subject as SubjectName) || 'Physics',
            chapter: t.chapter || t.title,
            taskType: (t.taskType as PlannerTask['taskType']) || 'Practice',
            durationMinutes: t.durationMinutes || 30,
            completed: Boolean(t.isCompleted),
            notes: t.notes,
            actionUrl: t.actionUrl
          }));
          if (apiTasks.length > 0) {
            setTasks((prev) => {
              const merged = [...prev];
              apiTasks.forEach((serverTask: PlannerTask) => {
                const idx = merged.findIndex((m) => m.id === serverTask.id);
                if (idx >= 0) {
                  merged[idx] = { ...merged[idx], ...serverTask };
                } else {
                  merged.push(serverTask);
                }
              });
              return merged;
            });
          }
        }
      } catch (err) {
        console.warn('Could not sync with /api/planner:', err);
      }
    };

    fetchStudentPlanner();
    return () => { isMounted = false; };
  }, [isAuthenticated, token, currentDayOfWeek]);

  // Auto-complete chapters for selected subject
  const subjectChapters = useMemo(() => {
    const chs = canonicalSyllabus
      .filter((c) => c.subjectName === newTaskSubject)
      .map((c) => c.name);
    return Array.from(new Set(chs)).sort();
  }, [newTaskSubject]);

  // Handle Target Exam Date change with automatic plan rebalancing
  const handleDateChange = (newDate: string) => {
    if (!newDate) return;
    const updated = { ...config, targetDate: newDate };
    setConfig(updated);
    localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));

    setIsGenerating(true);
    setGenerateMsg(null);
    setTimeout(() => {
      const generated = ecosystemService.generateAdaptiveWeeklyPlan({
        exam: updated.targetExam,
        classLevel: updated.classLevel,
        dailyMinutes: Math.round(updated.dailyStudyHours * 60),
        targetDate: newDate
      });
      setTasks([...generated]);
      setIsGenerating(false);
      setGenerateMsg(`⚡ Automatic plan updated! Study schedule calibrated for exam on ${newDate}.`);
      setTimeout(() => setGenerateMsg(null), 5000);
    }, 450);
  };

  const handleSaveConfig = (newConfig: Partial<PlannerConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));

    if (newConfig.targetExam || newConfig.classLevel || newConfig.dailyStudyHours) {
      handleGenerateAdaptivePlan(updated);
    }
  };

  const handleGenerateAdaptivePlan = (overrideConfig?: PlannerConfig) => {
    const currentCfg = overrideConfig || config;
    setIsGenerating(true);
    setGenerateMsg(null);
    setTimeout(() => {
      const generated = ecosystemService.generateAdaptiveWeeklyPlan({
        exam: currentCfg.targetExam,
        classLevel: currentCfg.classLevel,
        dailyMinutes: Math.round(currentCfg.dailyStudyHours * 60),
        targetDate: currentCfg.targetDate
      });
      setTasks([...generated]);
      setIsGenerating(false);
      setGenerateMsg('✨ Weekly study plan generated! Sahi chapters, concepts aur practice sequence ready hai.');
      setTimeout(() => setGenerateMsg(null), 5000);
    }, 500);
  };

  const handleToggleTask = (id: string) => {
    const targetTask = tasks.find((t) => t.id === id);
    const updated = ecosystemService.togglePlannerTask(id);
    setTasks([...updated]);

    if (isAuthenticated && targetTask) {
      apiRequest(`/planner/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          isCompleted: !targetTask.completed,
          day: targetTask.day
        })
      }).catch(() => null);
    }
  };

  const handleDeleteTask = (id: string) => {
    const updated = ecosystemService.deletePlannerTask(id);
    setTasks([...updated]);

    if (isAuthenticated) {
      apiRequest(`/planner/tasks/${id}`, {
        method: 'DELETE'
      }).catch(() => null);
    }
  };

  const handleOpenAdd = (defaultDay?: PlannerTask['day']) => {
    setEditingTaskId(null);
    setNewTaskDay(defaultDay || selectedDay);
    setNewTaskSubject(allowedSubjects[0] || 'Physics');
    setNewTaskChapter('');
    setNewTaskType('Concept');
    setNewTaskDuration(45);
    setNewTaskNotes('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (t: PlannerTask) => {
    setEditingTaskId(t.id);
    setNewTaskDay(t.day);
    setNewTaskSubject(t.subject);
    setNewTaskChapter(t.chapter);
    setNewTaskType(t.taskType);
    setNewTaskDuration(t.durationMinutes);
    setNewTaskNotes(t.notes || '');
    setShowAddModal(true);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const chapterName = newTaskChapter.trim() || 'General Revision';

    if (editingTaskId) {
      const updated = ecosystemService.updatePlannerTask(editingTaskId, {
        day: newTaskDay,
        subject: newTaskSubject,
        chapter: chapterName,
        taskType: newTaskType,
        durationMinutes: newTaskDuration,
        notes: newTaskNotes.trim() || undefined
      });
      setTasks([...updated]);

      if (isAuthenticated) {
        apiRequest(`/planner/tasks/${editingTaskId}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: `${newTaskSubject} — ${chapterName}`,
            subject: newTaskSubject,
            chapter: chapterName,
            taskType: newTaskType,
            durationMinutes: newTaskDuration,
            day: newTaskDay,
            notes: newTaskNotes.trim() || undefined
          })
        }).catch(() => null);
      }
    } else {
      const created = ecosystemService.addPlannerTask({
        day: newTaskDay,
        subject: newTaskSubject,
        chapter: chapterName,
        taskType: newTaskType,
        durationMinutes: newTaskDuration,
        completed: false,
        notes: newTaskNotes.trim() || undefined
      });
      setTasks((prev) => [...prev, created]);

      if (isAuthenticated) {
        apiRequest('/planner/tasks', {
          method: 'POST',
          body: JSON.stringify({
            id: created.id,
            day: newTaskDay,
            title: `${newTaskSubject} — ${chapterName}`,
            subject: newTaskSubject,
            chapter: chapterName,
            taskType: newTaskType,
            durationMinutes: newTaskDuration,
            notes: newTaskNotes.trim() || undefined
          })
        }).catch(() => null);
      }
    }
    setShowAddModal(false);
    setNewTaskNotes('');
  };

  const getTaskAction = (t: PlannerTask) => {
    if (t.actionUrl) {
      if (t.taskType === 'Concept') return { url: t.actionUrl, label: 'Read Notes', icon: '📖' };
      if (t.taskType === 'Formula') return { url: t.actionUrl, label: 'Formula Sheet', icon: '⚡' };
      if (t.taskType === 'Test') return { url: t.actionUrl, label: 'Take Test', icon: '🎯' };
      if (t.taskType === 'Revision') return { url: t.actionUrl, label: 'Revise Doubts', icon: '🔄' };
      return { url: t.actionUrl, label: 'Practice Qs', icon: '✍️' };
    }
    if (t.taskType === 'Concept') {
      return { url: `/study-hub?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(t.chapter)}`, label: 'Read Notes', icon: '📖' };
    }
    if (t.taskType === 'Formula') {
      return { url: '/formula-sheet', label: 'Formula Sheet', icon: '⚡' };
    }
    if (t.taskType === 'Test') {
      return { url: '/tests', label: 'Take Test', icon: '🎯' };
    }
    if (t.taskType === 'Revision') {
      return { url: '/mistakes', label: 'Revise Mistakes', icon: '🔄' };
    }
    return {
      url: `/practice?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(t.chapter)}`,
      label: 'Practice Qs',
      icon: '✍️'
    };
  };

  const currentDayTasks = tasks.filter((t) => t.day === selectedDay);
  const todayTasks = tasks.filter((t) => t.day === currentDayOfWeek);
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length || 1;
  const weeklyProgress = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* 1. Header & Navigation Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-1 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Automatic Exam-Calibrated Study Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Planner & Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exam date select karte hi system automatically calculate karega ki daily kya read aur practice karna hai!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/daily-plan')}
            className="text-xs font-semibold py-2 px-3 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>Daily Plan Mode</span>
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => handleGenerateAdaptivePlan()}
            disabled={isGenerating}
            className="text-xs font-semibold py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : '⚡ Rebalance Plan'}</span>
          </Button>
        </div>
      </div>

      {generateMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{generateMsg}</span>
        </div>
      )}

      {/* 2. Hero Card: Target Exam Date Countdown & Auto-Planner Engine */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700/60">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Live Countdown & Status */}
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{daysRemaining} Days Remaining</span>
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${prepPhase.badge}`}>
                {prepPhase.title}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Target Exam: <span className="text-emerald-400">{config.targetExam}</span> (Class {config.classLevel})
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {prepPhase.desc}. System distributes theory reading, formula revision, problem practice, and checkpoint mocks automatically.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
              <span>Weekly Pace: <strong>{(config.dailyStudyHours * 7).toFixed(1)} hrs</strong></span>
              <span>•</span>
              <span>Daily Target: <strong>{config.dailyStudyHours} hrs/day</strong></span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold">{tasks.length} Structured Slots</span>
            </div>
          </div>

          {/* Right: Direct Date Input & Quick Controls */}
          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-3 min-w-[280px] shrink-0">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Set Your Exam Date (Auto-Builds Plan):</span>
              </label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 focus:border-emerald-500 rounded-xl text-white text-xs font-medium cursor-pointer"
                title="Select your exam date to rebalance your daily study schedule"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Date change karte hi pura study plan automatically sync hoga!
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Target Exam</label>
                <select
                  value={config.targetExam}
                  onChange={(e) => handleSaveConfig({ targetExam: e.target.value })}
                  className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white"
                >
                  <option value="JEE">JEE Main</option>
                  <option value="JEE_ADV">JEE Advanced</option>
                  <option value="NEET">NEET UG</option>
                  <option value="CBSE">CBSE Board</option>
                  <option value="RBSE">RBSE Board</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Class</label>
                <select
                  value={config.classLevel}
                  onChange={(e) => handleSaveConfig({ classLevel: e.target.value })}
                  className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white"
                >
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="Dropper">Dropper</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Reading & Practice Guide ("Aaj Kya Read & Practice Karna Hai?") */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 border-2 border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Today's Study Guide: What to Read & Practice</span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                  {currentDayOfWeek}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aaj ka calibrated reading aur practice sequence — zero confusion, seedha shuru karein.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/40 px-2.5 py-1 rounded-lg">
              {todayTasks.filter((t) => t.completed).length}/{todayTasks.length} Done
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenAdd(currentDayOfWeek)}
              className="text-xs font-semibold py-1.5 px-2.5"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add to Today</span>
            </Button>
          </div>
        </div>

        {todayTasks.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <Calendar className="w-7 h-7 text-emerald-400 mx-auto" />
            <p className="text-xs text-slate-500">No scheduled tasks for today. Click below to add or auto-generate.</p>
            <Button size="sm" variant="primary" onClick={() => handleGenerateAdaptivePlan()} className="text-xs">
              Auto-Schedule Plan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todayTasks.map((t, idx) => {
              const action = getTaskAction(t);
              const isDone = t.completed;

              let typeBadge = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
              if (t.taskType === 'Formula') typeBadge = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
              if (t.taskType === 'Practice') typeBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300';
              if (t.taskType === 'Test') typeBadge = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
              if (t.taskType === 'Revision') typeBadge = 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300';

              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                    isDone
                      ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-600'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-slate-400">#{idx + 1}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${typeBadge}`}>
                          {action.icon} {t.taskType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{t.durationMinutes}m</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">{t.subject}</span>
                      <h3 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {t.chapter}
                      </h3>
                      {t.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                          {t.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(t.id)}
                      className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{isDone ? 'Done' : 'Mark Done'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(action.url)}
                        className="text-[11px] py-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold"
                      >
                        {action.label}
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(t)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
                        title="Edit this task"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Weekly Execution Progress Bar */}
      <Card className="p-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Weekly Execution Progress</span>
          </span>
          <span className="text-slate-500">
            <strong>{completedCount}</strong> of <strong>{tasks.length}</strong> tasks completed ({weeklyProgress}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
      </Card>

      {/* 5. Full Week Tabs (Monday to Sunday) */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {daysOfWeek.map((day) => {
          const dayTasks = tasks.filter((t) => t.day === day);
          const dayCount = dayTasks.length;
          const dayDone = dayTasks.filter((t) => t.completed).length;
          const isSelected = selectedDay === day;
          const isToday = currentDayOfWeek === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1">
                  <span>{day.slice(0, 3)}</span>
                  {isToday && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
                  )}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {dayDone}/{dayCount}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 6. Task List for Selected Day */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedDay}'s Study Tasks</span>
              {selectedDay === currentDayOfWeek && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                  Today
                </span>
              )}
            </h2>
            <span className="text-xs text-slate-400">{currentDayTasks.length} tasks scheduled for {selectedDay}</span>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => handleOpenAdd(selectedDay)}
            className="text-xs font-semibold py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </Button>
        </div>

        {currentDayTasks.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">No scheduled study tasks for {selectedDay}.</p>
            <Button size="sm" variant="outline" onClick={() => handleOpenAdd(selectedDay)} className="text-xs">
              Add First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {currentDayTasks.map((t) => {
              const action = getTaskAction(t);
              return (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    t.completed
                      ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 opacity-60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(t.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                        t.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 dark:border-slate-700 hover:border-slate-500 dark:hover:border-slate-500 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="truncate flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{t.subject}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className={`font-medium ${t.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {t.chapter}
                        </span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-semibold">
                          {action.icon} {t.taskType}
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
                      onClick={() => navigate(action.url)}
                      className="text-[11px] py-1 px-2.5 font-bold"
                    >
                      {action.label}
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(t)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title="Edit Task"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* 7. Progressive Disclosure: Target Exam Parameters */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-[#0c131a] space-y-3">
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Detailed Study Parameters ({config.targetExam}, {config.dailyStudyHours}h/day, Exam: {config.targetDate})
          </span>
          {showConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showConfig && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Exam</label>
              <select
                value={config.targetExam}
                onChange={(e) => handleSaveConfig({ targetExam: e.target.value })}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
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
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
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
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
              >
                <option value="1.5">1.5 hrs</option>
                <option value="2">2.0 hrs</option>
                <option value="2.5">2.5 hrs</option>
                <option value="3">3.0 hrs</option>
                <option value="4">4.0 hrs</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Exam Date</label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Preparation Tier</label>
              <select
                value={config.prepLevel}
                onChange={(e) => handleSaveConfig({ prepLevel: e.target.value as any })}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
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
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
              />
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingTaskId ? 'Edit Study Task' : `Add Task to ${newTaskDay}`}
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddTask}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 cursor-pointer"
            >
              {editingTaskId ? 'Save Changes' : 'Add Slot'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddTask} className="space-y-3 py-1 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Day of the Week</label>
            <select
              value={newTaskDay}
              onChange={(e) => setNewTaskDay(e.target.value as PlannerTask['day'])}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100 font-semibold"
            >
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Subject</label>
            <select
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value as SubjectName)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
            >
              {allowedSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Chapter Name</label>
            <input
              type="text"
              list="planner-chapters"
              value={newTaskChapter}
              onChange={(e) => setNewTaskChapter(e.target.value)}
              placeholder="e.g. Kinematics, Chemical Bonding..."
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              required
            />
            <datalist id="planner-chapters">
              {subjectChapters.map((ch) => (
                <option key={ch} value={ch} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Activity Type</label>
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value as PlannerTask['taskType'])}
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              >
                <option value="Concept">📖 Concept Reading (NCERT & Theory)</option>
                <option value="Formula">⚡ Formula Cards & Equations</option>
                <option value="Practice">✍️ Practice Questions</option>
                <option value="Revision">🔄 Revision & Mistake Review</option>
                <option value="Test">🎯 Timed Mock / Speed Drill</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={newTaskDuration}
                onChange={(e) => setNewTaskDuration(parseInt(e.target.value, 10) || 15)}
                min="10"
                max="180"
                step="5"
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
              Target Notes / What to Read (Optional)
            </label>
            <input
              type="text"
              value={newTaskNotes}
              onChange={(e) => setNewTaskNotes(e.target.value)}
              placeholder="e.g. Read NCERT pages 45-60, solve 20 PYQs"
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};