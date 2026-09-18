import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Eye,
  Play,
  RotateCcw,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Card, Button, Badge } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { Paper, CanonicalContentType } from '../types';

export const Papers: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Content Type Tab (Default strictly to REAL_PYQ)
  const initialType = (searchParams.get('type') as CanonicalContentType) || 'REAL_PYQ';
  const [activeContentType, setActiveContentType] = useState<CanonicalContentType>(initialType);

  // Filter States
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Strict Dataset Retrieval based on active Content Type
  const papersForCurrentType = useMemo(() => {
    switch (activeContentType) {
      case 'REAL_PYQ':
        return paperService.getRealPYQs();
      case 'MODEL_PAPER':
        return paperService.getModelPapers();
      case 'MOCK_TEST':
        return paperService.getMockTests();
      case 'SAMPLE_PAPER':
        return paperService.getSamplePapers();
      default:
        return paperService.getRealPYQs();
    }
  }, [activeContentType]);

  // Filter Logic
  const filteredPapers = useMemo(() => {
    return papersForCurrentType.filter((p) => {
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
        if (p.subject && p.subject !== 'Full Syllabus' && p.subject !== 'All' && p.subject !== selectedSubject) {
          return false;
        }
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
        const matchesShift = (p.shift || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesExam && !matchesShift) return false;
      }

      return true;
    });
  }, [papersForCurrentType, selectedExam, selectedClass, selectedSubject, selectedYear, searchQuery]);

  const handleTabChange = (type: CanonicalContentType) => {
    setActiveContentType(type);
    setSearchParams({ type });
  };

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

  const inventory = useMemo(() => paperService.getInventorySummary(), []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Exam Archives & Verification Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {activeContentType === 'REAL_PYQ' && 'Official Previous Year Papers (Real PYQs)'}
            {activeContentType === 'MODEL_PAPER' && 'Official Board Model Papers'}
            {activeContentType === 'MOCK_TEST' && 'Simulated Full Mock Tests'}
            {activeContentType === 'SAMPLE_PAPER' && 'Official Sample Papers & School Sets'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {activeContentType === 'REAL_PYQ' &&
              '100% authentic, verified past examination papers actually conducted by official exam authorities (NTA, IITs, CBSE, RBSE).'}
            {activeContentType === 'MODEL_PAPER' &&
              'Official model question papers released by State & Central Boards for curriculum blueprint and pattern reference.'}
            {activeContentType === 'MOCK_TEST' &&
              'High-yield full syllabus exam hall simulations prepared strictly on NTA/Board blueprints.'}
            {activeContentType === 'SAMPLE_PAPER' &&
              'Official CBSE SQPs and Class 11 school annual examination practice sets.'}
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

      {/* 2. Canonical Content Type Navigation Tabs (Mandatory Strict Isolation) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          type="button"
          onClick={() => handleTabChange('REAL_PYQ')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeContentType === 'REAL_PYQ'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Real PYQs ({inventory.realPYQs.verified} Verified)</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('MODEL_PAPER')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeContentType === 'MODEL_PAPER'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Official Model Papers ({inventory.modelPapers})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('MOCK_TEST')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeContentType === 'MOCK_TEST'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Full Mock Tests ({inventory.mockTests})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('SAMPLE_PAPER')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeContentType === 'SAMPLE_PAPER'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Sample Papers ({inventory.samplePapers})</span>
        </button>
      </div>

      {/* 3. Strict Verification Guarantee Banner */}
      {activeContentType === 'REAL_PYQ' && (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Strict Canonical Verification:</span> All {filteredPapers.length} papers in this view are 100% verified historical examination question papers conducted by official authorities. Simulated mocks, sample papers, and model tests are strictly partitioned out.
          </div>
        </div>
      )}

      {/* 4. Filters Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeContentType === 'REAL_PYQ' ? 'verified PYQs' : 'papers'} by name, date, shift, or exam...`}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Target Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600"
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
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600"
            >
              <option value="All">All Years (2020 - 2025)</option>
              <option value={2025}>2025 (Audit Status)</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class Level</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600"
            >
              <option value="All">All Classes</option>
              <option value="12">Class 12 (Board / Entrance)</option>
              <option value="11">Class 11</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-600"
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

      {/* 5. Special Audit Status Notice for 2025 (Section 16 & 22) */}
      {selectedYear === 2025 && activeContentType === 'REAL_PYQ' && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>2025 Real Examination Papers Status</span>
          </div>
          <p className="text-amber-700 leading-relaxed">
            Per strict academic integrity guidelines, PREPORA does NOT label unverified or simulated reconstruction papers as Real PYQs. Real 2025 examination shift papers are currently undergoing question-by-question official answer key verification.
          </p>
          <div className="pt-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleTabChange('MODEL_PAPER')}
              className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
            >
              View 2025 Official Model Papers →
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('MOCK_TEST')}
              className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
            >
              View 2025 NTA Full Mock Tests →
            </button>
          </div>
        </div>
      )}

      {/* 6. Papers Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong>{filteredPapers.length}</strong> {activeContentType === 'REAL_PYQ' ? 'verified official papers' : 'papers'}
          </span>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No papers match this filter criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              {activeContentType === 'REAL_PYQ' && selectedYear === 2025
                ? 'Official 2025 examination papers are not yet verified. Please explore verified papers from 2020-2024 or view 2025 Model Papers.'
                : 'Try clearing the search query or selecting a different exam/year filter.'}
            </p>
            <Button size="sm" variant="outline" onClick={clearAllFilters} className="mt-2 text-xs">
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPapers.map((paper) => {
              const cls = paper.classLevel || (paper.title.includes('11') ? '11' : '12');

              return (
                <Card key={paper.id} className="p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {paper.board ? `${paper.board}` : paper.exam}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 text-[11px]">Class {cls}</span>
                        {paper.subject && paper.subject !== 'Full Syllabus' && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-600 font-medium text-[11px]">{paper.subject}</span>
                          </>
                        )}
                      </div>

                      {/* Content Type Pill */}
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          paper.contentType === 'REAL_PYQ'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : paper.contentType === 'MODEL_PAPER'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : paper.contentType === 'MOCK_TEST'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {paper.contentType === 'REAL_PYQ'
                          ? 'REAL PYQ'
                          : paper.contentType === 'MODEL_PAPER'
                          ? 'MODEL PAPER'
                          : paper.contentType === 'MOCK_TEST'
                          ? 'MOCK TEST'
                          : 'SAMPLE PAPER'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {paper.title}
                    </h3>

                    {/* Shift & Session if available */}
                    {(paper.shift || paper.session || paper.date) && (
                      <div className="text-[11px] font-semibold text-brand-700 bg-brand-50/70 px-2 py-0.5 rounded-md inline-block">
                        {[paper.session, paper.date, paper.shift].filter(Boolean).join(' • ')}
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500">
                      {paper.totalQuestions} Questions • {paper.durationMinutes} Mins •{' '}
                      {paper.answerKeySource === 'Official' ? (
                        <span className="text-emerald-700 font-semibold">Official Answer Key</span>
                      ) : (
                        <span className="text-slate-600 font-medium">PREPORA Solution</span>
                      )}
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=study`)}
                      className="py-2 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Paper</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/papers/${paper.id}?mode=test`)}
                      className="py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
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
