import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  BookOpen,
  CheckSquare,
  FileText,
  FileEdit,
  ArrowRight,
  Filter,
  X
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { testService } from '../services/testService';
import { paperService } from '../services/paperService';
import { userService } from '../services/userService';
import { ExamType, SubjectName } from '../types';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'questions' | 'tests' | 'papers' | 'notes'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');

  const questions = questionService.filterQuestions({
    subject: selectedSubject !== 'All' ? selectedSubject : undefined,
    searchQuery: query.trim() || undefined
  });

  const tests = testService.getAllTests().filter(t => {
    if (!query) return true;
    const q = query.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.subjects.some(s => s.toLowerCase().includes(q));
  });

  const papers = paperService.getAllPapers().filter(p => {
    if (!query) return true;
    const q = query.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  const notes = userService.getNotes().filter(n => {
    if (!query) return true;
    const q = query.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  const totalResults =
    (selectedType === 'all' || selectedType === 'questions' ? questions.length : 0) +
    (selectedType === 'all' || selectedType === 'tests' ? tests.length : 0) +
    (selectedType === 'all' || selectedType === 'papers' ? papers.length : 0) +
    (selectedType === 'all' || selectedType === 'notes' ? notes.length : 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Search Input Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-4 top-3.5 text-brand-600" />
          <input
            type="text"
            placeholder="Search questions, topics, mock tests, sample papers, formulas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-10 py-3 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-3.5 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'all', label: 'All Results' },
              { key: 'questions', label: `Questions (${questions.length})` },
              { key: 'tests', label: `Tests (${tests.length})` },
              { key: 'papers', label: `Papers (${papers.length})` },
              { key: 'notes', label: `Notes (${notes.length})` },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedType(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedType === tab.key
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Subject:</span>
            {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  selectedSubject === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <div className="text-xs font-semibold text-slate-500 px-1">
          Showing {totalResults} result(s) {query ? `for "${query}"` : ''}
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800">No results found.</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your query keywords or resetting the type and subject filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Questions Results */}
            {(selectedType === 'all' || selectedType === 'questions') && questions.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Questions ({questions.length})
                </div>
                {questions.slice(0, 5).map((q) => (
                  <Card key={q.id} className="p-4 space-y-2 hover:border-brand-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <Badge variant="brand" size="sm">{q.subject}</Badge>
                      <Badge variant="slate" size="sm">{q.chapter}</Badge>
                      <span className="text-xs text-slate-400">{q.topic}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 line-clamp-2">{q.question}</div>
                    <div className="pt-2 flex justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/practice?subject=${q.subject}&chapter=${encodeURIComponent(q.chapter)}`)}
                        className="text-xs text-brand-600 font-semibold p-0"
                      >
                        Practice this topic →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Tests Results */}
            {(selectedType === 'all' || selectedType === 'tests') && tests.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Mock Tests ({tests.length})
                </div>
                {tests.map((t) => (
                  <Card key={t.id} className="p-4 flex items-center justify-between hover:border-brand-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="brand" size="sm">{t.exam}</Badge>
                        <span className="font-bold text-sm text-slate-900">{t.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {t.totalQuestions} Questions • {t.durationMinutes} Minutes • {t.category}
                      </div>
                    </div>
                    <Button size="sm" variant="primary" onClick={() => navigate(`/tests/${t.id}/instructions`)}>
                      Start
                    </Button>
                  </Card>
                ))}
              </div>
            )}

            {/* Papers Results */}
            {(selectedType === 'all' || selectedType === 'papers') && papers.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Papers ({papers.length})
                </div>
                {papers.map((p) => (
                  <Card key={p.id} className="p-4 flex items-center justify-between hover:border-brand-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">{p.paperType}</Badge>
                        <span className="font-bold text-sm text-slate-900">{p.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Year {p.year} • {p.totalQuestions} Questions
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/papers/${p.id}`)}>
                      View
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
