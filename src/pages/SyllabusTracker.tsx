import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Search,
  PieChart,
  Layers,
  ChevronRight,
  GraduationCap,
  Stethoscope,
  Award,
  Compass,
  X
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { syllabusService } from '../services/syllabusService';
import {
  SubjectName,
  CanonicalSubjectId,
  CanonicalExam,
  ClassLevel,
  CanonicalSyllabusChapter,
  PreparationType
} from '../types';

export const SyllabusTracker: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();

  const prepProfile = user.preparationProfile || {
    preparationType: (user.targetExam || 'JEE') as PreparationType,
    exam: (user.targetExam === 'NEET' ? 'NEET_UG' : user.targetExam === 'CBSE' ? 'CBSE' : user.targetExam === 'RBSE' ? 'RBSE' : 'JEE_MAIN') as CanonicalExam,
    classLevel: (user.classLevel || '12') as ClassLevel,
    subjects: user.targetExam === 'NEET' ? ['PHYSICS', 'CHEMISTRY', 'BIOLOGY'] : ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'],
    onboardingCompleted: true,
    targetYear: user.targetYear || 2026
  };

  const initialExam = (searchParams.get('exam') as CanonicalExam) || prepProfile.exam || 'JEE_MAIN';
  const initialClass = (searchParams.get('class') as ClassLevel | 'All') || (prepProfile.classLevel === 'Dropper' ? 'All' : prepProfile.classLevel) || '12';
  const initialSubject = (searchParams.get('subject') as CanonicalSubjectId | 'All') || 'All';

  const [selectedExam, setSelectedExam] = useState<CanonicalExam>(initialExam);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>(initialClass);
  const [selectedSubject, setSelectedSubject] = useState<CanonicalSubjectId | 'All'>(initialSubject);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Available subjects for the currently selected exam
  const currentPrepType: PreparationType =
    selectedExam === 'NEET_UG' ? 'NEET' :
    selectedExam === 'CBSE' ? 'CBSE' :
    selectedExam === 'RBSE' ? 'RBSE' : 'JEE';

  const availableSubjects = useMemo(() => {
    return syllabusService.getSubjectsForPreparation(currentPrepType);
  }, [currentPrepType]);

  // If currently selected subject does not belong to new exam, reset to 'All'
  useEffect(() => {
    if (selectedSubject !== 'All') {
      const exists = availableSubjects.some(s => s.id === selectedSubject);
      if (!exists) {
        setSelectedSubject('All');
      }
    }
  }, [availableSubjects, selectedSubject]);

  // Load canonical chapters with filters
  const chapters: CanonicalSyllabusChapter[] = useMemo(() => {
    const list = syllabusService.getChapters({
      exam: selectedExam,
      classLevel: selectedClass !== 'All' ? selectedClass : undefined,
      subject: selectedSubject !== 'All' ? selectedSubject : undefined
    });
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(ch => ch.name.toLowerCase().includes(q) || ch.topics.some(t => t.name.toLowerCase().includes(q)));
  }, [selectedExam, selectedClass, selectedSubject, searchQuery, refreshTrigger]);

  // Calculate real mastery summary for current filter
  const masterySummary = useMemo(() => {
    return syllabusService.getMasterySummary(
      selectedExam,
      selectedSubject !== 'All' ? selectedSubject : undefined
    );
  }, [selectedExam, selectedSubject, refreshTrigger]);

  const handleStatusChange = (chapterId: string, newStatus: any) => {
    let newProgress = 0;
    if (newStatus === 'Strong' || newStatus === 'Completed' || newStatus === 'Mastered') newProgress = 100;
    else if (newStatus === 'Practicing') newProgress = 60;
    else if (newStatus === 'Needs Revision') newProgress = 40;
    else if (newStatus === 'Learning') newProgress = 20;
    else newProgress = 0;

    syllabusService.updateChapterProgress(chapterId, {
      status: (newStatus === 'Mastered' ? 'Strong' : newStatus),
      progressPercent: newProgress
    });

    setRefreshTrigger(prev => prev + 1);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Mastered':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">🟢 Mastered</span>;
      case 'Practicing':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">🟡 Practicing</span>;
      case 'Needs Revision':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">🔴 Revision Due</span>;
      case 'Learning':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">🟣 Learning</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">⚪ Not Started</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-slide-up px-2 sm:px-4">
      
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Centralized Syllabus Registry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Syllabus Completion Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track your authentic curriculum progress across NTA, NCERT, and BSER standards. All 439 chapters and subtopics verified with zero synthetic placeholders.
            </p>
          </div>

          {/* Real Coverage vs Mastery Metric Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center min-w-[140px] shrink-0 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold block">
                Syllabus Coverage
              </span>
              <div className="text-3xl font-black text-white">{masterySummary.coveragePercent}%</div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${masterySummary.coveragePercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 block">
                {masterySummary.practicedChapters} of {masterySummary.totalChapters} practiced
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center min-w-[140px] shrink-0 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                Concept Mastery
              </span>
              <div className="text-3xl font-black text-emerald-400">{masterySummary.masteryPercent}%</div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${masterySummary.masteryPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 block">
                {masterySummary.masteredChapters} chapters mastered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Exam Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Exam:</span>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value as CanonicalExam)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none cursor-pointer hover:border-slate-400 transition-colors"
            >
              <option value="JEE_MAIN">JEE Main</option>
              <option value="JEE_ADVANCED">JEE Advanced</option>
              <option value="NEET_UG">NEET UG</option>
              <option value="CBSE">CBSE Senior Secondary</option>
              <option value="RBSE">RBSE Board (BSER)</option>
            </select>
          </div>

          {/* Class Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Class:</span>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value as ClassLevel | 'All')}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none cursor-pointer hover:border-slate-400 transition-colors"
            >
              <option value="All">All (11 + 12)</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* Subject Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:pt-0">
            <button
              onClick={() => setSelectedSubject('All')}
              className={`px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                selectedSubject === 'All'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedSubject === sub.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search chapter or topic..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Chapters Grid or Empty State */}
      {chapters.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">No Chapters Match Filters</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No chapters were found for {selectedExam.replace('_', ' ')} with the current class or subject criteria.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedSubject('All');
                setSelectedClass('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold rounded-xl"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((ch, idx) => {
            const progress = syllabusService.getChapterProgress(ch.chapterId);
            const status = progress?.status || 'Not Started';
            const progressPercent = progress?.progressPercent || 0;

            return (
              <div
                key={ch.chapterId}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Class {ch.classLevel} • {ch.subjectName}
                    </span>
                    {getStatusBadge(status)}
                  </div>

                  {/* Chapter Name & Progress */}
                  <div>
                    <h3 className="font-black text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                      {idx + 1}. {ch.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mt-1.5">
                      <span>Completion</span>
                      <span className="text-slate-800 font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progressPercent >= 80 ? 'bg-emerald-500' : progressPercent >= 40 ? 'bg-brand-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Subtopics Checklist snapshot */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Canonical Subtopics ({ch.topics.length})
                    </span>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {ch.topics.map(t => {
                        const isMastered = progressPercent >= 80;
                        return (
                          <div key={t.id} className="flex items-center justify-between text-xs text-slate-700 py-0.5">
                            <span className="truncate pr-2">{t.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                              isMastered ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {isMastered ? 'Mastered' : 'Pending'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-400 font-medium">Status:</span>
                    <select
                      value={status}
                      onChange={e => handleStatusChange(ch.chapterId, e.target.value as any)}
                      className="bg-slate-100 font-bold text-slate-700 py-1 px-2 rounded-lg border border-slate-200 text-[11px] focus:outline-none cursor-pointer"
                    >
                      <option value="Not Started">⚪ Not Started</option>
                      <option value="Learning">🟣 Learning</option>
                      <option value="Practicing">🟡 Practicing</option>
                      <option value="Strong">🟢 Strong</option>
                      <option value="Needs Revision">🔴 Needs Revision</option>
                      <option value="Completed">✅ Completed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/chapters/${encodeURIComponent(ch.name)}`)}
                      className="text-[11px] font-bold py-1 px-1 rounded-lg"
                    >
                      Hub
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/practice?chapter=${encodeURIComponent(ch.name)}&subject=${ch.subjectId}`)}
                      className="text-[11px] font-bold py-1 px-1 rounded-lg bg-slate-900 hover:bg-black text-white"
                    >
                      Practice
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/build-test?chapter=${encodeURIComponent(ch.name)}`)}
                      className="text-[11px] font-bold py-1 px-1 rounded-lg"
                    >
                      Test
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/revision?chapter=${encodeURIComponent(ch.name)}`)}
                      className="text-[11px] font-bold py-1 px-1 rounded-lg"
                    >
                      Revise
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SyllabusTracker;
