import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  Download,
  BookOpen
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { paperService } from '../services/paperService';
import { ExamType, Paper } from '../types';

export const Papers: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<ExamType | 'All'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');

  const allPapers = paperService.getAllPapers();

  const filteredPapers = allPapers.filter((p) => {
    if (selectedExam !== 'All' && p.exam !== selectedExam) return false;
    if (selectedType !== 'All' && p.paperType !== selectedType) return false;
    if (selectedYear !== 'All' && p.year !== selectedYear) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Curated Sample Papers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Paper Library</h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore authentic sample papers, model test sets, and previous year mock blueprints.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap gap-2">
          {['All', 'PYQ', 'Model Paper', 'Mock Paper'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === type
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Exam:</span>
            {(['All', 'JEE', 'NEET', 'Board'] as (ExamType | 'All')[]).map((e) => (
              <button
                key={e}
                onClick={() => setSelectedExam(e)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedExam === e
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Year:</span>
            {(['All', 2024, 2023] as (number | 'All')[]).map((y) => (
              <button
                key={String(y)}
                onClick={() => setSelectedYear(y)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedYear === y
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPapers.map((paper) => (
          <Card key={paper.id} hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant={paper.exam === 'JEE' ? 'brand' : paper.exam === 'NEET' ? 'success' : 'info'}>
                  {paper.exam} {paper.board ? `(${paper.board})` : ''}
                </Badge>
                <span className="text-xs font-bold text-slate-400">{paper.year}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{paper.title}</h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">{paper.description}</p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {paper.durationMinutes} Mins
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" /> {paper.totalQuestions} Questions
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                {paper.paperType}
              </span>

              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate(`/papers/${paper.id}`)}
                className="font-bold text-xs"
              >
                View Paper <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
