import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  FileText,
  Calculator,
  Layers,
  BookOpen,
  FileCheck,
  Search,
  Filter,
  Download,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { ResourceItem, SubjectName } from '../types';

export const ResourceHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ResourceItem['category'] | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: (ResourceItem['category'] | 'All')[] = [
    'All',
    'Notes',
    'Formula Sheets',
    'Flashcards',
    'Practice',
    'PYQs',
    'Model Papers'
  ];

  const resources = ecosystemService.getResources(
    selectedSubject === 'All' ? undefined : selectedSubject,
    selectedCategory === 'All' ? undefined : selectedCategory
  ).filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Central Study Material Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Comprehensive Resource Hub
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            All curated study notes, formula cheat sheets, Leitner flashcard decks, and previous year papers categorized in one searchable library.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Subject:</span>
            {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubject === s
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes, chapters, formulas..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1">Format:</span>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedCategory === c
                  ? 'bg-purple-100 text-purple-800 font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map(res => (
          <div
            key={res.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-purple-300 card-hover-lift flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="brand" size="sm">{res.subject}</Badge>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                  {res.category}
                </span>
              </div>

              <div>
                <h3 className="font-black text-base text-slate-900 leading-snug">
                  {res.title}
                </h3>
                <span className="text-xs text-purple-600 font-semibold block mt-0.5">
                  Chapter: {res.chapter}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-medium">
                {res.itemCount} {res.fileSize ? `• ${res.fileSize}` : ''}
              </div>

              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate(res.actionUrl)}
                className="text-xs font-bold px-3 py-1.5"
              >
                <span>Open</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};