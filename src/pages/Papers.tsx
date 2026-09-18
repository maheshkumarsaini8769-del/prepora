import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Eye,
  Play,
  RotateCcw,
  FileText
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { Paper } from '../types';

export const Papers: React.FC = () => {
  const navigate = useNavigate();

  // Filter States
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allPapers = useMemo(() => paperService.getAllPapers(), []);

  // Filter Logic
  const filteredPapers = useMemo(() => {
    return allPapers.filter((p) => {
      if (selectedExam !== 'All') {
        if (selectedExam === 'NEET' && p.exam !== 'NEET') return false;
        if (selectedExam === 'JEE' && p.exam !== 'JEE') return false;
        if (selectedExam === 'JEE Advanced' && !p.title.toLowerCase().includes('advanced')) return false;
        if (selectedExam === 'CBSE' && p.board !== 'CBSE' && p.exam !== 'CBSE') return false;
        if (selectedExam === 'RBSE' && p.board !== 'RBSE' && p.exam !== 'RBSE') return false;
      }

      if (selectedClass !== 'All') {
        const cls = String(p.classLevel || (p.title.includes('11') ? '11' : '12'));
        if (cls !== selectedClass) return false;
      }

      if (selectedSubject !== 'All') {
        if (p.subject && p.subject !== selectedSubject) return false;
        if (!p.subject && !p.title.toLowerCase().includes(selectedSubject.toLowerCase())) {
          return false;
        }
      }

      if (selectedYear !== 'All' && p.year !== selectedYear) return false;

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
  }, [allPapers, selectedExam, selectedClass, selectedSubject, selectedYear, searchQuery]);

  const clearAllFilters = () => {
    setSelectedExam('All');
    setSelectedClass('All');
    setSelectedSubject('All');
    setSelectedYear('All');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedExam !== 'All' ||
    selectedClass !== 'All' ||
    selectedSubject !== 'All' ||
    selectedYear !== 'All' ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Previous Papers</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real past papers from 2020 to 2025 with step-by-step solutions and timed tests.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* 2. Clean Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search paper by name, exam, or keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Exams</option>
              <option value="JEE">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="NEET">NEET-UG</option>
              <option value="CBSE">CBSE Board</option>
              <option value="RBSE">RBSE Board</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Years</option>
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Classes</option>
              <option value="12">Class 12</option>
              <option value="11">Class 11</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Paper Listing */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredPapers.length}</strong> papers</span>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-10 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-semibold text-slate-700 text-sm">No papers match these filters</h3>
            <p className="text-xs text-slate-400">Try choosing a different exam or resetting your filters.</p>
            <Button size="sm" variant="outline" onClick={clearAllFilters} className="mt-2 text-xs">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPapers.map((paper) => {
              const cls = paper.classLevel || (paper.title.includes('11') ? '11' : '12');

              return (
                <Card key={paper.id} className="p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">
                          {paper.board ? `${paper.board}` : paper.exam}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">Class {cls}</span>
                        {paper.subject && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-600 font-medium">{paper.subject}</span>
                          </>
                        )}
                      </div>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {paper.year}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {paper.title}
                    </h3>

                    <div className="text-[11px] text-slate-500">
                      {paper.totalQuestions} Questions • {paper.durationMinutes} Mins • Solutions Included
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=study`)}
                      className="py-2 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Paper</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=test`)}
                      className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-white" />
                      <span>Attempt</span>
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
