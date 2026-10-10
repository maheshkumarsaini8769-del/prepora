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
  CheckSquare,
  Lock,
  Award,
  Search,
  Filter,
  Play,
  CalendarDays,
  ListTodo,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Card, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import {
  masterStudyPlanService,
  MasterRoadmapState,
  DayPlan,
  DaySubjectTopic,
  MonthlyExam
} from '../services/masterStudyPlanService';
import { PlannerTask, SubjectName } from '../types';
import { getAllowedSubjectsForExam } from '../utils/examUtils';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';
import { sortChapterNamesCanonical } from '../utils/chapterOrder';

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

  // Planner configuration locked to student's registered exam & class
  const [config, setConfig] = useState<PlannerConfig>(() => {
    const saved = localStorage.getItem(PLANNER_CONFIG_KEY);
    let parsed: any = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      targetExam: user.targetExam || parsed.targetExam || 'JEE',
      classLevel: user.classLevel || parsed.classLevel || '12',
      targetDate: parsed.targetDate || '2026-05-15',
      dailyStudyHours: parsed.dailyStudyHours || 2.5,
      prepLevel: parsed.prepLevel || 'Intermediate',
      targetScore: user.targetExam === 'NEET' ? 650 : 220
    };
  });

  const { isAuthenticated, token } = useAuth();

  // Master 300-Topic Curriculum & Dated Calendar State
  const [masterRoadmap, setMasterRoadmap] = useState<MasterRoadmapState>(() =>
    masterStudyPlanService.getMasterRoadmap()
  );

  // Tab View: Master 300-Topic Dated Calendar vs Weekly Task Manager
  const [activeTab, setActiveTab] = useState<'master_calendar' | 'weekly_tasks'>('master_calendar');

  // Master Calendar Filters
  const [calendarMonth, setCalendarMonth] = useState<number | 'all'>('all');
  const [calendarSearch, setCalendarSearch] = useState<string>('');
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'exams' | 'pending' | 'completed'>('all');

  // Weekly tasks state for custom task management
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    const existing = ecosystemService.getPlannerTasks();
    if (existing && existing.length > 0) return existing;
    return ecosystemService.generateAdaptiveWeeklyPlan({
      exam: user.targetExam || 'JEE',
      classLevel: user.classLevel || '12',
      dailyMinutes: 150,
      targetDate: config.targetDate
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
  const [showStudyGuidelines, setShowStudyGuidelines] = useState<boolean>(true);

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
        desc: 'Deep NCERT & textbook coverage with daily 45m lectures and 15Q DPPs',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
      };
    }
    if (daysRemaining >= 30) {
      return {
        title: 'Speed & Weakness Sprint',
        desc: 'High-yield numerical problem sets, formula drills and bi-monthly milestone exams',
        badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
      };
    }
    return {
      title: 'Final Revision & Mock Sprint',
      desc: 'Full-length timed mocks, bi-monthly cumulative tests, and mistake book analysis',
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
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, currentDayOfWeek]);

  // Auto-complete chapters for selected subject
  const subjectChapters = useMemo(() => {
    const chs = canonicalSyllabus
      .filter((c) => c.subjectName === newTaskSubject)
      .map((c) => c.name);
    return sortChapterNamesCanonical(Array.from(new Set(chs)), newTaskSubject);
  }, [newTaskSubject]);

  // Handle Target Exam Date change with automatic plan recalculation
  const handleDateChange = (newDate: string) => {
    if (!newDate) return;
    const updated = { ...config, targetDate: newDate };
    setConfig(updated);
    localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));

    // Recalculate Master 300-Topic Dated Calendar
    const updatedRoadmap = masterStudyPlanService.setTargetExamDate(newDate);
    setMasterRoadmap({ ...updatedRoadmap });

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
    // Keep targetExam & classLevel locked to user's registered profile!
    const updated = {
      ...config,
      ...newConfig,
      targetExam: user.targetExam || config.targetExam,
      classLevel: user.classLevel || config.classLevel
    };
    setConfig(updated);
    localStorage.setItem(PLANNER_CONFIG_KEY, JSON.stringify(updated));

    if (newConfig.dailyStudyHours) {
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
      setGenerateMsg('✨ Weekly study plan generated! All chapters, concepts, and practice sequences are ready.');
      setTimeout(() => setGenerateMsg(null), 5000);
    }, 500);
  };

  // Master Roadmap Actions
  const handleToggleLecture = (date: string, subject: string, topicNum: number) => {
    const updated = masterStudyPlanService.toggleLecture(date, subject, topicNum);
    setMasterRoadmap({ ...updated });
  };

  const handleToggleDpp = (date: string, subject: string, topicNum: number) => {
    const updated = masterStudyPlanService.toggleDpp(date, subject, topicNum);
    setMasterRoadmap({ ...updated });
  };

  const handleToggleExam = (date: string, examId: string) => {
    const updated = masterStudyPlanService.toggleExam(date, examId);
    setMasterRoadmap({ ...updated });
  };

  // Weekly Task Handlers
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
      if (t.taskType === 'Concept') return { url: t.actionUrl, label: 'Watch Lecture', icon: '▶' };
      if (t.taskType === 'Formula') return { url: t.actionUrl, label: 'Formula Sheet', icon: '⚡' };
      if (t.taskType === 'Test') return { url: t.actionUrl, label: 'Take Test', icon: '🎯' };
      if (t.taskType === 'Revision') return { url: t.actionUrl, label: 'Revise Doubts', icon: '🔄' };
      return { url: t.actionUrl, label: 'Practice Qs', icon: '✍️' };
    }
    if (t.taskType === 'Concept') {
      return {
        url: `/lectures?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(t.chapter)}&autoplay=true`,
        label: 'Watch Lecture',
        icon: '▶'
      };
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
      url: `/practice/session?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(t.chapter)}&count=15`,
      label: 'Practice Qs (15Q)',
      icon: '✍️'
    };
  };

  const currentDayTasks = tasks.filter((t) => t.day === selectedDay);
  const todayTasks = tasks.filter((t) => t.day === currentDayOfWeek);
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length || 1;
  const weeklyProgress = Math.round((completedCount / totalTasks) * 100);

  // Filtered days for Master Calendar
  const filteredCalendarDays = useMemo(() => {
    let list = masterRoadmap.days;

    // Filter by month
    if (calendarMonth !== 'all') {
      const startIdx = (calendarMonth - 1) * 30;
      const endIdx = startIdx + 30;
      list = list.slice(startIdx, endIdx);
    }

    // Filter by type
    if (calendarFilter === 'exams') {
      list = list.filter((d) => d.exam !== undefined);
    } else if (calendarFilter === 'completed') {
      list = list.filter((d) => d.allCompleted || (d.exam && d.exam.completed));
    } else if (calendarFilter === 'pending') {
      list = list.filter((d) => !d.allCompleted);
    }

    // Search query
    if (calendarSearch.trim()) {
      const q = calendarSearch.toLowerCase();
      list = list.filter(
        (d) =>
          d.formattedDate.toLowerCase().includes(q) ||
          d.date.includes(q) ||
          d.topics.some(
            (t) =>
              t.chapterName.toLowerCase().includes(q) ||
              t.topicName.toLowerCase().includes(q) ||
              t.subject.toLowerCase().includes(q)
          ) ||
          (d.exam && d.exam.title.toLowerCase().includes(q))
      );
    }

    return list;
  }, [masterRoadmap.days, calendarMonth, calendarFilter, calendarSearch]);

  const todayPlan = useMemo(() => masterStudyPlanService.getTodayPlan(), [masterRoadmap]);

  const totalMonthsCount = useMemo(() => {
    return Math.max(1, Math.ceil(masterRoadmap.days.length / 30));
  }, [masterRoadmap.days.length]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* 1. Header & Navigation Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-1 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Automated 300-Topic Curriculum & Exam Roadmap Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Planner & Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            New Student Automated Plan: 30 Chapters × 10 Micro-Topics (300 Topics/Subject) + Daily Lecture + 15Q DPP + 2 Monthly Exams!
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
            <span>{isGenerating ? 'Recalculating...' : '⚡ Rebalance Plan'}</span>
          </Button>
        </div>
      </div>

      {generateMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{generateMsg}</span>
        </div>
      )}

      {/* 2. Hero Card: Target Exam Date Countdown & Locked Registration Stream */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700/60">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Live Countdown & Status */}
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{daysRemaining} Days to Exam</span>
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${prepPhase.badge}`}>
                {prepPhase.title}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Stream: {user.targetExam || config.targetExam}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Target Exam: <span className="text-emerald-400">{user.targetExam || config.targetExam}</span> • Class {user.classLevel || config.classLevel}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              New Student Engine active: 30 Chapters × 10 Micro-Topics = 300 Topics per subject. Prepora automatically schedules 1 topic/day per subject (45m lecture + 15Q DPP = 45 daily questions) and 2 grand exams every month!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="text-emerald-300 font-semibold">
                Curriculum: <strong>900 Micro-Topics Total</strong>
              </span>
              <span>•</span>
              <span>Daily Practice: <strong>45 DPP Questions</strong></span>
              <span>•</span>
              <span className="text-purple-300 font-semibold">
                Bi-Monthly Tests: <strong>{masterRoadmap.summary.totalExamsScheduled} Scheduled</strong>
              </span>
            </div>
          </div>

          {/* Right: ONLY Target Exam Date Input & Locked Registered Stream Display */}
          <div className="bg-slate-800/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-3 min-w-[290px] shrink-0">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Your Exam Date:</span>
              </label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 focus:border-emerald-500 rounded-xl text-white text-xs font-medium cursor-pointer"
                title="Select your exam date to rebalance your daily study schedule"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Changing the date automatically recalibrates your full 300-topic study calendar!
              </span>
            </div>

            {/* Course & Class locked to registration time */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Target Exam (Locked)
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">
                  {user.targetExam || config.targetExam}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/70">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Class Level (Locked)
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate">
                  Class {user.classLevel || config.classLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('master_calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'master_calendar'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>📅 Dated Calendar Plan (300 Topics + Bi-Monthly Exams)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('weekly_tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'weekly_tasks'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>📋 Weekly Task Manager</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {masterRoadmap.summary.completedTopicsCount} Topics & {masterRoadmap.summary.completedDppsCount} DPPs Solved
          </span>
          <span>•</span>
          <span className="font-bold">{masterRoadmap.summary.progressPercentage}% Completed</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: 300-TOPIC MASTER DATED CALENDAR & EXAM ENGINE */}
      {/* ======================================================== */}
      {activeTab === 'master_calendar' && (
        <div className="space-y-6">
          {/* Curriculum Stats Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                ⚛️ Physics Syllabus
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                30 Ch • 300 Topics
              </div>
              <p className="text-[11px] text-slate-400">10 Micro-topics/chapter + 15Q DPPs</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                🧪 Chemistry Syllabus
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                30 Ch • 300 Topics
              </div>
              <p className="text-[11px] text-slate-400">Physical, Inorganic & Organic</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                {user.targetExam === 'NEET' ? '🧬 Biology Syllabus' : '📐 Mathematics Syllabus'}
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                30 Ch • 300 Topics
              </div>
              <p className="text-[11px] text-slate-400">Complete Class 11 & 12 Alignment</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                🏆 Bi-Monthly Exams
              </span>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                2 Exams Every Month
              </div>
              <p className="text-[11px] text-slate-400">Day 15 Mid-Term & Day 30 Grand Mock</p>
            </div>
          </div>

          {/* Today's Prescribed Study Mission */}
          {todayPlan && (
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 border-2 border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Today's Prescribed Study Guide (Day {todayPlan.dayNumber})</span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                        {todayPlan.formattedDate} • {todayPlan.dayOfWeek}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Automatic Daily Formula: 1 Topic per Subject ➔ Watch 45m Lecture ➔ Solve 15 Questions Topic DPP (Total 45 Questions Today)!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/40 px-3 py-1 rounded-lg">
                    {todayPlan.topics.filter((t) => t.lectureCompleted && t.dppCompleted).length}/{todayPlan.topics.length} Subjects Completed
                  </span>
                </div>
              </div>

              {/* Subject Mission Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {todayPlan.topics.map((top) => (
                  <div
                    key={`${top.subject}-${top.chapterNumber}-${top.topicNumber}`}
                    className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {top.subject} • Ch {top.chapterNumber}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">Topic #{top.topicNumber}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">
                        {top.chapterName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2">
                        {top.topicName}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      {/* Lecture Row */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleLecture(todayPlan.date, top.subject, top.topicNumber)}
                          className={`flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer ${
                            top.lectureCompleted ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              top.lectureCompleted
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {top.lectureCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>Lecture ({top.lectureDurationMinutes}m)</span>
                        </button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(
                              `/lectures?subject=${encodeURIComponent(top.subject)}&chapter=${encodeURIComponent(
                                top.chapterName
                              )}&topic=${encodeURIComponent(top.topicName)}&mode=TOPIC_WISE&autoplay=true`
                            )
                          }
                          className="text-[11px] py-1 px-2.5 font-bold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg flex items-center gap-1 shadow-2xs"
                        >
                          <Play className="w-3 h-3 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
                          <span>Watch</span>
                        </Button>
                      </div>

                      {/* DPP Row */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleDpp(todayPlan.date, top.subject, top.topicNumber)}
                          className={`flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer ${
                            top.dppCompleted ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              top.dppCompleted
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {top.dppCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>Topic DPP ({top.dppQuestionCount} Qs)</span>
                        </button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(
                              `/practice/session?subject=${encodeURIComponent(top.subject)}&chapter=${encodeURIComponent(
                                top.chapterName
                              )}&topic=${encodeURIComponent(top.topicName)}&count=15`
                            )
                          }
                          className="text-[11px] py-1 px-2.5 font-bold text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg flex items-center gap-1 shadow-2xs"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Solve DPP</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search & Filter Toolbar */}
          <div className="bg-white dark:bg-[#0c131a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={calendarSearch}
                  onChange={(e) => setCalendarSearch(e.target.value)}
                  placeholder="Search chapters or micro-topics (e.g. Vectors, Mole Concept, Matrices)..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(['all', 'exams', 'pending', 'completed'] as const).map((flt) => (
                  <button
                    key={flt}
                    type="button"
                    onClick={() => setCalendarFilter(flt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      calendarFilter === flt
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {flt === 'exams' ? '🏆 Exams Only' : flt}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-bold shrink-0 mr-1">Filter Month:</span>
              <button
                type="button"
                onClick={() => setCalendarMonth('all')}
                className={`px-3 py-1 rounded-lg shrink-0 font-semibold cursor-pointer ${
                  calendarMonth === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All Months ({masterRoadmap.days.length} Days)
              </button>
              {Array.from({ length: totalMonthsCount }).map((_, mIdx) => (
                <button
                  key={mIdx + 1}
                  type="button"
                  onClick={() => setCalendarMonth(mIdx + 1)}
                  className={`px-3 py-1 rounded-lg shrink-0 font-semibold cursor-pointer ${
                    calendarMonth === mIdx + 1
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Month {mIdx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Full Dated Day-by-Day Timeline List */}
          <div className="space-y-4">
            {filteredCalendarDays.length === 0 ? (
              <div className="py-12 text-center space-y-2 bg-white dark:bg-[#0c131a] rounded-2xl border border-slate-200 dark:border-slate-800">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500">No scheduled topics match your filter or search criteria.</p>
                <Button size="sm" variant="outline" onClick={() => { setCalendarMonth('all'); setCalendarSearch(''); setCalendarFilter('all'); }} className="text-xs">
                  Reset Filters
                </Button>
              </div>
            ) : (
              filteredCalendarDays.map((day) => {
                const isToday = day.date === new Date().toISOString().split('T')[0];

                return (
                  <div
                    key={day.dayNumber}
                    className={`rounded-2xl border transition-all p-4 space-y-3 ${
                      isToday
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {/* Day Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-xs flex items-center justify-center">
                          #{day.dayNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                              {day.formattedDate}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">({day.dayOfWeek})</span>
                            {isToday && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">
                                TODAY
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">
                            Daily Target: {day.topics.length} Micro-Topics • {day.dailyTotalLectureMinutes}m Lectures • {day.dailyTotalDppQuestions} DPP Questions
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {day.allCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                            <Check className="w-3.5 h-3.5" /> All Solved
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            {day.topics.filter((t) => t.lectureCompleted && t.dppCompleted).length}/{day.topics.length} Subjects Ready
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Topics Grid for this Day */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {day.topics.map((t) => (
                        <div
                          key={`${t.subject}-${t.chapterNumber}-${t.topicNumber}`}
                          className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-2 ${
                            t.lectureCompleted && t.dppCompleted
                              ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-75'
                              : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                                {t.subject}
                              </span>
                              <span>Ch {t.chapterNumber} • Topic {t.topicNumber}</span>
                            </div>
                            <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">{t.chapterName}</h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                              {t.topicName}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-[11px]">
                            {/* Lecture Row */}
                            <div className="flex items-center justify-between gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleLecture(day.date, t.subject, t.topicNumber)}
                                className={`flex items-center gap-1 font-semibold cursor-pointer ${
                                  t.lectureCompleted ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                    t.lectureCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                                  }`}
                                >
                                  {t.lectureCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span>Lec ({t.lectureDurationMinutes}m)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/lectures?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(
                                      t.chapterName
                                    )}&topic=${encodeURIComponent(t.topicName)}&mode=TOPIC_WISE&autoplay=true`
                                  )
                                }
                                className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-0.5 text-[10px]"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Watch</span>
                              </button>
                            </div>

                            {/* DPP Row */}
                            <div className="flex items-center justify-between gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleDpp(day.date, t.subject, t.topicNumber)}
                                className={`flex items-center gap-1 font-semibold cursor-pointer ${
                                  t.dppCompleted ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                    t.dppCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                                  }`}
                                >
                                  {t.dppCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span>DPP ({t.dppQuestionCount}Q)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/practice/session?subject=${encodeURIComponent(t.subject)}&chapter=${encodeURIComponent(
                                      t.chapterName
                                    )}&topic=${encodeURIComponent(t.topicName)}&count=15`
                                  )
                                }
                                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 text-[10px]"
                              >
                                <BookOpen className="w-2.5 h-2.5" />
                                <span>Solve DPP</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bi-Monthly Milestone / Cumulative Mock Exam Card on Day 15 & Day 30 */}
                    {day.exam && (
                      <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 text-white border border-purple-500/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {day.exam.type === 'MID_MONTH_MILESTONE' ? 'Day 15 Mid-Month Test' : 'Day 30 Grand Mock'}
                            </span>
                            <span className="text-xs text-purple-200">
                              {day.exam.questionCount} Questions • {day.exam.marks} Marks • {day.exam.durationMinutes} Mins
                            </span>
                          </div>
                          <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                            <span>🏆 {day.exam.title}</span>
                          </h4>
                          <p className="text-xs text-purple-200">
                            Syllabus: {day.exam.syllabusCoverage}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleExam(day.date, day.exam!.examId)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              day.exam.completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            }`}
                          >
                            {day.exam.completed ? '✓ Exam Completed' : 'Mark Done'}
                          </button>

                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate('/tests')}
                            className="text-xs font-bold py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm"
                          >
                            <span>Attempt Mock</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: WEEKLY TASK MANAGER (CUSTOM SLOTS) */}
      {/* ======================================================== */}
      {activeTab === 'weekly_tasks' && (
        <div className="space-y-6">
          {/* Today's Reading & Practice Guide */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 border-2 border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Weekly Task Planner: Custom Study Slots</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      {currentDayOfWeek}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add or customize daily study slots to tailor your preparation routine.
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

            {/* Expandable Preparation Guidelines & Rules */}
            <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl p-3.5 border border-emerald-500/20 space-y-2">
              <div
                onClick={() => setShowStudyGuidelines(!showStudyGuidelines)}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    💡
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    Topper Study Blueprint & 6 Core Rules for High Rank
                  </span>
                </div>
                <button
                  type="button"
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{showStudyGuidelines ? 'Hide Guidelines' : 'View Guidelines'}</span>
                  {showStudyGuidelines ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showStudyGuidelines && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in">
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                      1. Sequence: Lecture → DPP (15Q) → Formulas
                    </span>
                    <span>Watch a 45-minute lecture first, then solve 15 topic questions without viewing solutions.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/30">
                    <span className="font-bold text-blue-800 dark:text-blue-300 block mb-0.5">
                      2. Daily 3 Subjects Rotation
                    </span>
                    <span>Complete 1 high-yield topic each in Physics, Chemistry, and Mathematics/Biology daily.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">
                      3. Mistake Book (1-3-7 Rule)
                    </span>
                    <span>Star incorrect practice questions in your Mistake Book and re-attempt them on Days 1, 3, and 7.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                      4. 2 Exams Every Month
                    </span>
                    <span>Maintain 100% attendance on Day 15 mid-term and Day 30 cumulative mock exams.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/30">
                    <span className="font-bold text-purple-800 dark:text-purple-300 block mb-0.5">
                      5. Speed Target (60s – 90s)
                    </span>
                    <span>Build MCQ solving speed with the countdown timer to eliminate negative marking.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/30">
                    <span className="font-bold text-teal-800 dark:text-teal-300 block mb-0.5">
                      6. AI Doubt Solver Instant Help
                    </span>
                    <span>Get instant step-by-step conceptual hints from the AI Doubt Solver whenever you get stuck.</span>
                  </div>
                </div>
              )}
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

          {/* Weekly Execution Progress Bar */}
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

          {/* Full Week Tabs (Monday to Sunday) */}
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
                  type="button"
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

          {/* Task List for Selected Day */}
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
        </div>
      )}

      {/* 3. Progressive Disclosure: Target Exam Parameters (Locked Course & Class) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-[#0c131a] space-y-3">
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Study Parameters ({user.targetExam || config.targetExam}, {config.dailyStudyHours}h/day, Exam Date: {config.targetDate})
          </span>
          {showConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showConfig && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <label className="block text-slate-500 font-medium mb-1 text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Enrolled Exam (Locked)
              </label>
              <span className="font-bold text-slate-900 dark:text-white text-xs block">
                {user.targetExam || config.targetExam}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <label className="block text-slate-500 font-medium mb-1 text-[11px] flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Enrolled Class (Locked)
              </label>
              <span className="font-bold text-slate-900 dark:text-white text-xs block">
                Class {user.classLevel || config.classLevel}
              </span>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Daily Study Target</label>
              <select
                value={config.dailyStudyHours}
                onChange={(e) => handleSaveConfig({ dailyStudyHours: parseFloat(e.target.value) || 2 })}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold"
              >
                <option value="1.5">1.5 hrs/day</option>
                <option value="2">2.0 hrs/day</option>
                <option value="2.5">2.5 hrs/day</option>
                <option value="3">3.0 hrs/day</option>
                <option value="4">4.0 hrs/day</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Exam Date</label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add or Edit Task */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingTaskId ? 'Edit Study Task' : `Add Study Slot for ${newTaskDay}`}
        footer={
          <div className="flex items-center justify-end gap-2">
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
              placeholder="e.g. Read NCERT pages 45-60, solve 15 PYQs"
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};