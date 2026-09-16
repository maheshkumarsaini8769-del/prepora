import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  BookOpen,
  CheckCircle2,
  Play,
  RotateCcw,
  GraduationCap,
  HelpCircle,
  Eye,
  Info
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { ExamType, Paper } from '../types';

export const Papers: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Filter States
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allPapers = useMemo(() => paperService.getAllPapers(), []);

  // Filter Logic
  const filteredPapers = useMemo(() => {
    return allPapers.filter((p) => {
      // 1. Exam / Board Filter
      if (selectedExam !== 'All') {
        if (selectedExam === 'NEET' && p.exam !== 'NEET') return false;
        if (selectedExam === 'JEE' && p.exam !== 'JEE') return false;
        if (selectedExam === 'JEE Advanced' && p.title.toLowerCase().indexOf('advanced') === -1) return false;
        if (selectedExam === 'CBSE' && p.board !== 'CBSE' && p.exam !== 'CBSE') return false;
        if (selectedExam === 'RBSE' && p.board !== 'RBSE' && p.exam !== 'RBSE') return false;
      }

      // 2. Class Level Filter (11 or 12)
      if (selectedClass !== 'All') {
        const cls = String(p.classLevel || (p.title.includes('11') ? '11' : '12'));
        if (cls !== selectedClass) return false;
      }

      // 3. Subject Filter
      if (selectedSubject !== 'All') {
        if (p.subject && p.subject !== selectedSubject) return false;
        if (!p.subject && !p.title.toLowerCase().includes(selectedSubject.toLowerCase())) {
          // If paper title doesn't mention the subject and it's a single subject paper
          return false;
        }
      }

      // 4. Year Filter (2020 - 2025)
      if (selectedYear !== 'All' && p.year !== selectedYear) return false;

      // 5. Paper Type (PYQ, Model Paper, Mock Paper)
      if (selectedType !== 'All' && p.paperType !== selectedType) return false;

      // 6. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        const matchesSubject = (p.subject || '').toLowerCase().includes(query);
        const matchesExam = (p.exam || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesExam) return false;
      }

      return true;
    });
  }, [allPapers, selectedExam, selectedClass, selectedSubject, selectedYear, selectedType, searchQuery]);

  const clearAllFilters = () => {
    setSelectedExam('All');
    setSelectedClass('All');
    setSelectedSubject('All');
    setSelectedYear('All');
    setSelectedType('All');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedExam !== 'All' ||
    selectedClass !== 'All' ||
    selectedSubject !== 'All' ||
    selectedYear !== 'All' ||
    selectedType !== 'All' ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. HERO & CLEAR EXPLANATION BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-purple-500/20">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-md border border-white/10">
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            <span>2020 – 2025 Original Papers & Model Question Bank</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Previous Year Papers & Solutions
            <span className="block text-purple-300 text-lg sm:text-xl font-bold mt-1">
              (पिछले वर्षों के पेपर्स उत्तर व सम्पूर्ण हल सहित)
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            यहाँ NEET-UG, JEE Main, JEE Advanced, CBSE एवं RBSE (11वीं व 12वीं) के 2020 से 2025 तक के 
            सभी आधिकारिक पेपर्स उपलब्ध हैं। आप प्रत्येक पेपर के <strong>सभी प्रश्नों के उत्तर व विस्तृत हल (Answers & Step-by-Step Solutions)</strong> सीधे देख सकते हैं या असली परीक्षा की तरह टाइमर के साथ टेस्ट दे सकते हैं।
          </p>

          {/* 3 Quick Step Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-black flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <span>परीक्षा व वर्ष चुनें (Select Exam & Year)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-full bg-indigo-500 text-white font-black flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <span>उत्तर व हल देखें (Check Instant Solutions)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <span>या टाइमर के साथ टेस्ट दें (Or Take Timed Test)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPREHENSIVE FILTER CONTROLS */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Top Filter Bar: Search and Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search paper by name, exam, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-bold text-slate-500">
              Found: <strong className="text-purple-700 text-sm">{filteredPapers.length}</strong> Papers
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Row 1: Exam / Board */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            1. Select Exam / Board (परीक्षा चुनें):
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: '🌟 All Exams (सभी)' },
              { id: 'NEET', label: '🩺 NEET-UG (मेडिकल)' },
              { id: 'JEE', label: '🚀 JEE Main (इंजीनियरिंग)' },
              { id: 'JEE Advanced', label: '🎯 JEE Advanced (आईआईटी)' },
              { id: 'CBSE', label: '📘 CBSE Board' },
              { id: 'RBSE', label: '📙 RBSE Board (राजस्थान)' }
            ].map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedExam(ex.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExam === ex.id
                    ? 'bg-purple-700 text-white shadow-md shadow-purple-600/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Row 2: Class Level & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Class Level */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              2. Class Level (कक्षा):
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'All', label: 'All Classes' },
                { id: '12', label: 'Class 12th (12वीं)' },
                { id: '11', label: 'Class 11th (11वीं)' }
              ].map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setSelectedClass(cls.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedClass === cls.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cls.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              3. Subject (विषय):
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'All', label: 'All Subjects' },
                { id: 'Physics', label: '⚛️ Physics' },
                { id: 'Chemistry', label: '🧪 Chemistry' },
                { id: 'Mathematics', label: '📐 Math' },
                { id: 'Biology', label: '🧬 Biology' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Row 3: Year (2020 – 2025) & Paper Type */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            4. Examination Year (वर्ष चुनें: 2020 – 2025):
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Years' },
              { id: 2025, label: '2025 (Latest)' },
              { id: 2024, label: '2024' },
              { id: 2023, label: '2023' },
              { id: 2022, label: '2022' },
              { id: 2021, label: '2021' },
              { id: 2020, label: '2020' }
            ].map((yr) => (
              <button
                key={String(yr.id)}
                type="button"
                onClick={() => setSelectedYear(yr.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedYear === yr.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {yr.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 3. PAPERS LISTING GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <span>Available Papers</span>
            <span className="text-xs font-bold text-slate-400">({filteredPapers.length} results)</span>
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            💡 Click <strong>"हल व उत्तर देखें"</strong> to read questions with step-by-step solutions
          </span>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No papers match your selected filters</h3>
              <p className="text-xs text-slate-500">
                Try selecting "All Exams" or "All Years" to see all available previous papers.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={clearAllFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPapers.map((paper) => {
              const cls = paper.classLevel || (paper.title.includes('11') ? '11' : '12');

              return (
                <Card
                  key={paper.id}
                  hoverEffect
                  className="flex flex-col justify-between border border-slate-200/80 shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black tracking-wide ${
                          paper.exam === 'NEET'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : paper.exam === 'JEE'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : paper.board === 'RBSE'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {paper.board ? `${paper.board} Board` : paper.exam}
                        </span>

                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                          Class {cls}
                        </span>

                        {paper.subject && (
                          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                            {paper.subject}
                          </span>
                        )}
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-black">
                        {paper.year}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug hover:text-purple-700 transition">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {paper.description || 'Authentic examination paper with official marking scheme and full answer key.'}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                        {paper.totalQuestions} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {paper.durationMinutes} Mins
                      </span>
                    </div>

                    {/* Solution Included Tag */}
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>विस्तृत हल व उत्तर कुंजी उपलब्ध (Solutions Included)</span>
                    </div>
                  </div>

                  {/* TWO PROMINENT ACTION BUTTONS */}
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                    {/* Primary Button: View with Answers and Solutions */}
                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=study`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-purple-200" />
                      <span>हल व उत्तर देखें (View Solutions)</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </button>

                    {/* Secondary Button: Timed Exam Mode */}
                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=test`)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-indigo-600" />
                      <span>टाइमर के साथ टेस्ट दें (Take Timed Test)</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Papers;
