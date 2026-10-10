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
  Target,
  Edit2,
  Trash2,
  Flame
} from 'lucide-react';
import { Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { DailyPlan, DailyPlanItem, SubjectName } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { masterStudyPlanService, DayPlan } from '../services/masterStudyPlanService';

export const DailyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);

  // Target exam date countdown
  const savedPlannerConfig = localStorage.getItem('prepora_planner_config');
  let targetExamDate = '2026-05-15';
  if (savedPlannerConfig) {
    try {
      targetExamDate = JSON.parse(savedPlannerConfig).targetDate || targetExamDate;
    } catch {
      // fallback
    }
  }

  const daysRemaining = Math.max(
    1,
    Math.ceil((new Date(targetExamDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => {
    const raw = ecosystemService.getDailyPlan();
    return {
      ...raw,
      items: raw.items.filter((it) => !it.subject || isSubjectAllowedForExam(it.subject, user.targetExam))
    };
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Master 300-Topic Curriculum Today's Prescribed Plan
  const [masterToday, setMasterToday] = useState<DayPlan | null>(() => masterStudyPlanService.getTodayPlan());

  const handleToggleMasterLecture = (subject: string, topicNum: number) => {
    if (!masterToday) return;
    masterStudyPlanService.toggleLecture(masterToday.date, subject, topicNum);
    setMasterToday({ ...masterStudyPlanService.getTodayPlan() });
  };

  const handleToggleMasterDpp = (subject: string, topicNum: number) => {
    if (!masterToday) return;
    masterStudyPlanService.toggleDpp(masterToday.date, subject, topicNum);
    setMasterToday({ ...masterStudyPlanService.getTodayPlan() });
  };

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectName>(allowedSubjects[0] || 'Physics');
  const [newChapter, setNewChapter] = useState('');
  const [newMinutes, setNewMinutes] = useState(25);
  const [newQuestions, setNewQuestions] = useState(15);
  const [newType, setNewType] = useState<DailyPlanItem['type']>('practice');

  const handleToggle = (id: string) => {
    const updated = ecosystemService.toggleDailyPlanItem(id);
    setDailyPlan({ ...updated });
  };

  const handleSkip = (id: string) => {
    const items = dailyPlan.items.map((item) => {
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

  const handleOpenAdd = () => {
    setEditingItemId(null);
    setNewTitle('');
    setNewSubject(allowedSubjects[0] || 'Physics');
    setNewChapter('');
    setNewMinutes(25);
    setNewQuestions(15);
    setNewType('practice');
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: DailyPlanItem) => {
    setEditingItemId(item.id);
    setNewTitle(item.title);
    setNewSubject(item.subject || allowedSubjects[0] || 'Physics');
    setNewChapter(item.chapter || '');
    setNewMinutes(item.durationMinutes);
    setNewQuestions(item.questionCount || 15);
    setNewType(item.type);
    setShowAddModal(true);
  };

  const handleDeleteItem = (itemId: string) => {
    const target = dailyPlan.items.find((i) => i.id === itemId);
    const items = dailyPlan.items.filter((i) => i.id !== itemId);
    const updated: DailyPlan = {
      ...dailyPlan,
      totalDurationMinutes: Math.max(0, dailyPlan.totalDurationMinutes - (target ? target.durationMinutes : 0)),
      completedMinutes: dailyPlan.items
        .filter((i) => i.id !== itemId && i.status === 'completed')
        .reduce((sum, i) => sum + i.durationMinutes, 0),
      items
    };
    localStorage.setItem('prepora_daily_plan', JSON.stringify(updated));
    setDailyPlan(updated);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingItemId) {
      // Update existing
      const items = dailyPlan.items.map((it) => {
        if (it.id === editingItemId) {
          return {
            ...it,
            title: newTitle.trim(),
            subject: newSubject,
            chapter: newChapter.trim() || 'General',
            durationMinutes: newMinutes,
            questionCount: newQuestions,
            type: newType,
            actionUrl:
              newType === 'test'
                ? '/tests'
                : newType === 'revision'
                ? '/revision'
                : `/practice?subject=${newSubject}&chapter=${encodeURIComponent(newChapter.trim() || 'All')}`
          };
        }
        return it;
      });

      const totalDurationMinutes = items.reduce((sum, i) => sum + i.durationMinutes, 0);
      const completedMinutes = items.filter((i) => i.status === 'completed').reduce((sum, i) => sum + i.durationMinutes, 0);

      const updated: DailyPlan = {
        ...dailyPlan,
        totalDurationMinutes,
        completedMinutes,
        items
      };

      localStorage.setItem('prepora_daily_plan', JSON.stringify(updated));
      setDailyPlan(updated);
    } else {
      // Add new
      const newItem: DailyPlanItem = {
        id: `dp-custom-${Date.now()}`,
        title: newTitle.trim(),
        subject: newSubject,
        chapter: newChapter.trim() || 'General',
        durationMinutes: newMinutes,
        questionCount: newQuestions,
        status: 'pending',
        type: newType,
        actionUrl:
          newType === 'test'
            ? '/tests'
            : newType === 'revision'
            ? '/revision'
            : newType === 'lecture'
            ? `/lectures?subject=${newSubject}&chapter=${encodeURIComponent(newChapter.trim() || 'All')}&autoplay=true`
            : `/practice/session?subject=${newSubject}&chapter=${encodeURIComponent(newChapter.trim() || 'All')}&count=15`
      };

      const updated: DailyPlan = {
        ...dailyPlan,
        totalDurationMinutes: dailyPlan.totalDurationMinutes + newMinutes,
        items: [...dailyPlan.items, newItem]
      };

      localStorage.setItem('prepora_daily_plan', JSON.stringify(updated));
      setDailyPlan(updated);
    }

    setShowAddModal(false);
    setNewTitle('');
    setNewChapter('');
    setEditingItemId(null);
  };

  const completedCount = dailyPlan.items.filter((i) => i.status === 'completed').length;
  const totalTasks = dailyPlan.items.length || 1;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-slide-up">
      {/* Top Banner with Exam Countdown */}
      <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
              <span>Targeted Daily Preparation Sequence</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{daysRemaining} Days to {user.targetExam}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Smart Daily Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Rule-based sequence calibrated from your weak topics, pending spaced revisions, and mistake logs. Zero guesswork — start task 1 and build momentum.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-center min-w-[210px] shrink-0 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Today's Execution ({formattedDate})
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completedCount} / {totalTasks} Completed
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">
            {dailyPlan.completedMinutes} of {dailyPlan.totalDurationMinutes} minutes finished ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white dark:bg-[#0c131a] rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            <span>Planned Commitment: <strong>{dailyPlan.totalDurationMinutes} Minutes</strong></span>
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
            {user.targetExam} Aspirant (Class {user.classLevel})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/planner')}
            className="text-xs font-bold py-1.5 px-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
            title="Open Full Weekly Study Planner & Exam Countdown"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Full Weekly Planner</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleRegenerate}
            className="text-xs font-bold py-1.5 px-3"
            title="Recalculate plan from latest test attempts & mistakes"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Regenerate</span>
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleOpenAdd}
            className="text-xs font-bold py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {/* Master 300-Topic Curriculum Daily Lecture + DPP Card */}
      {masterToday && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 border-2 border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Today's Prescribed Curriculum Mission (Day {masterToday.dayNumber})</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    {masterToday.formattedDate} • {masterToday.dayOfWeek}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fixed Daily Sequence: 1 Topic per Subject ➔ Watch 45m Lecture ➔ Solve 15 Questions DPP (45 Questions Daily)!
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/planner')}
              className="text-xs font-bold py-1.5 px-3 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {masterToday.topics.map((top) => (
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
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMasterLecture(top.subject, top.topicNumber)}
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

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMasterDpp(top.subject, top.topicNumber)}
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

      {/* Rule-Based Transparency Notice */}
      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800 text-purple-950 dark:text-purple-200 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-700 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-purple-900 dark:text-purple-100 block text-xs mb-0.5">
            How Today's Plan Is Generated (Deterministic Rule-Based Algorithm):
          </strong>
          <p className="text-purple-800 dark:text-purple-300 leading-relaxed text-[11px]">
            Tasks are ranked by: (1) your lowest accuracy chapter from recent drills, (2) flashcards due for Leitner interval review today, (3) mistake book error clusters, and (4) a short 10-question mini mock. Fully editable anytime!
          </p>
        </div>
      </div>

      {/* Daily Plan Tasks List */}
      <div className="space-y-3.5">
        {dailyPlan.items.map((item, index) => {
          const isDone = item.status === 'completed';
          const isSkipped = item.status === 'skipped';

          let typeColor = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
          if (item.type === 'revision') typeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
          if (item.type === 'test') typeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
          if (item.type === 'lecture') typeColor = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
          if (item.type === 'formula') typeColor = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
                  : isSkipped
                  ? 'bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 opacity-50'
                  : 'bg-white dark:bg-[#0c131a] border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm'
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
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500'
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
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.subject}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
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
                      className="text-xs font-bold py-2 px-4 shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit task"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSkip(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Skip this task"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </>
                )}

                {isDone && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(item.actionUrl)}
                      className="text-xs font-bold py-1.5 px-3"
                    >
                      <span>Practice Again</span>
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingItemId(null);
        }}
        title={editingItemId ? 'Edit Daily Study Task' : 'Add Daily Study Task'}
        maxWidth="max-w-md"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddModal(false);
                setEditingItemId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveItem}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {editingItemId ? 'Save Changes' : "Add to Today's Plan"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSaveItem} className="space-y-4 py-2 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Task Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Physics — Laws of Motion Drill"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Subject</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              >
                {allowedSubjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Chapter (Optional)</label>
              <input
                type="text"
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder="e.g. Kinematics"
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              >
                <option value="practice">Practice Drill (DPP)</option>
                <option value="lecture">Video Lecture</option>
                <option value="revision">Revision</option>
                <option value="formula">Formula Sheet Drill</option>
                <option value="test">Mock Test</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Duration (min)</label>
              <input
                type="number"
                min={5}
                max={120}
                value={newMinutes}
                onChange={(e) => setNewMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Questions</label>
              <input
                type="number"
                min={5}
                max={50}
                value={newQuestions}
                onChange={(e) => setNewQuestions(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
