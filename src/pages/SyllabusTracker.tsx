import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { SubjectName, ExamType, ClassLevel, SyllabusChapter, SyllabusChapterStatus } from '../types';

export const SyllabusTracker: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();

  const [selectedExam, setSelectedExam] = useState<ExamType>(user.targetExam || 'JEE');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(user.classLevel || '11');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [syllabusList, setSyllabusList] = useState<SyllabusChapter[]>(() => 
    ecosystemService.getSyllabus(selectedExam, selectedClass)
  );

  const handleStatusChange = (id: string, newStatus: SyllabusChapterStatus) => {
    let newProgress = 0;
    if (newStatus === 'Strong' || newStatus === 'Completed') newProgress = 100;
    else if (newStatus === 'Practicing') newProgress = 60;
    else if (newStatus === 'Needs Revision') newProgress = 40;
    else if (newStatus === 'Learning') newProgress = 20;
    else newProgress = 0;

    ecosystemService.updateChapterStatus(id, newStatus, newProgress);
    setSyllabusList(prev => prev.map(ch => ch.id === id ? { ...ch, status: newStatus, progressPercent: newProgress } : ch));
  };

  const filteredChapters = syllabusList.filter(ch => {
    const matchSubj = selectedSubject === 'All' || ch.subject === selectedSubject;
    const matchSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubj && matchSearch;
  });

  const totalChapters = filteredChapters.length || 1;
  const completedOrStrong = filteredChapters.filter(ch => ch.status === 'Strong' || ch.status === 'Completed').length;
  const overallPercent = Math.round(
    filteredChapters.reduce((acc, curr) => acc + curr.progressPercent, 0) / totalChapters
  );

  const getStatusBadge = (status: SyllabusChapterStatus) => {
    switch (status) {
      case 'Strong':
      case 'Completed':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">🟢 {status}</span>;
      case 'Practicing':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">🟡 {status}</span>;
      case 'Needs Revision':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">🔴 {status}</span>;
      case 'Learning':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">🟣 {status}</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">⚪ Not Started</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Syllabus & Chapter Mastery Index</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Syllabus Completion Tracker
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Track chapter-by-chapter coverage for your target exam. Mark statuses, inspect subtopics, and dive directly into practice or revisions.
            </p>
          </div>

          {/* Overall Completion Metric Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px] shrink-0 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-purple-200 font-bold block">
              Overall Completion
            </span>
            <div className="text-4xl font-black text-white">{overallPercent}%</div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-purple-200 block">
              {completedOrStrong} of {totalChapters} chapters mastered
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Exam & Class select */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-700 mr-1">
            <Filter className="w-4 h-4 text-purple-600" />
            <span>Filter:</span>
          </div>

          {/* Subject Tabs */}
          {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedSubject === subj
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search chapter..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChapters.map(ch => (
          <div
            key={ch.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-purple-300 card-hover-lift flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <Badge variant="brand" size="sm">{ch.subject}</Badge>
                {getStatusBadge(ch.status)}
              </div>

              {/* Chapter Name & Progress */}
              <div>
                <h3 className="font-black text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                  {ch.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mt-1">
                  <span>Progress</span>
                  <span className="text-slate-800 font-bold">{ch.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ch.progressPercent >= 80 ? 'bg-emerald-500' : ch.progressPercent >= 40 ? 'bg-purple-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${ch.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Subtopics Checklist snapshot */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Subtopics Checklist
                </span>
                {ch.subtopics.map(sub => (
                  <div key={sub.name} className="flex items-center justify-between text-xs text-slate-700">
                    <span className="truncate pr-2">{sub.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sub.isMastered ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {sub.isMastered ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar (Open Chapter, Practice, Test, Revise) */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between gap-1 text-[11px]">
                <span className="text-slate-400 font-medium">Update Status:</span>
                <select
                  value={ch.status}
                  onChange={e => handleStatusChange(ch.id, e.target.value as SyllabusChapterStatus)}
                  className="bg-slate-100 font-bold text-slate-700 py-1 px-2 rounded-lg border border-slate-200 text-[11px] focus:outline-none"
                >
                  <option value="Not Started">⚪ Not Started</option>
                  <option value="Learning">🟣 Learning</option>
                  <option value="Practicing">🟡 Practicing</option>
                  <option value="Strong">🟢 Strong</option>
                  <option value="Needs Revision">🔴 Needs Revision</option>
                  <option value="Completed">✅ Completed</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/chapters/${encodeURIComponent(ch.name)}`)}
                  className="text-[11px] font-bold py-1 px-2"
                >
                  Hub
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/practice?chapter=${encodeURIComponent(ch.name)}`)}
                  className="text-[11px] font-bold py-1 px-2"
                >
                  Practice
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate(`/build-test?chapter=${encodeURIComponent(ch.name)}`)}
                  className="text-[11px] font-bold py-1 px-2"
                >
                  Test
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};