import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Target, 
  Sparkles, 
  FileText, 
  AlertCircle, 
  ArrowRight,
  Filter,
  X
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { testService } from '../services/testService';
import { formulaService } from '../services/formulaService';
import { userService } from '../services/userService';

export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('Kinematics');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Questions' | 'Chapters' | 'Formulas' | 'Tests' | 'Notes'>('All');

  const allQuestions = questionService.getAllQuestions();
  const allTests = testService.getAllTests();
  const allFormulas = formulaService.getAllFormulas();
  const allNotes = userService.getNotes();
  const allMistakes = userService.getMistakes();

  const searchResults = useMemo(() => {
    const qLower = query.toLowerCase().trim();
    if (!qLower) return [];

    const results: {
      type: 'Question' | 'Chapter' | 'Formula' | 'Test' | 'Note';
      title: string;
      subtitle: string;
      subject: string;
      url: string;
    }[] = [];

    // Search Chapters
    const chapters = Array.from(new Set(allQuestions.map(q => q.chapter)));
    chapters.forEach(ch => {
      if (ch.toLowerCase().includes(qLower)) {
        results.push({
          type: 'Chapter',
          title: ch,
          subtitle: 'Full study hub with notes, practice, formulas & tests',
          subject: allQuestions.find(q => q.chapter === ch)?.subject || 'Physics',
          url: `/chapters/${encodeURIComponent(ch)}`
        });
      }
    });

    // Search Formulas
    allFormulas.forEach(f => {
      if (
        f.name.toLowerCase().includes(qLower) || 
        f.formula.toLowerCase().includes(qLower) ||
        f.chapterTitle.toLowerCase().includes(qLower)
      ) {
        results.push({
          type: 'Formula',
          title: f.name,
          subtitle: `${f.formula} — ${f.chapterTitle}`,
          subject: f.subject,
          url: `/chapters/${encodeURIComponent(f.chapterTitle)}`
        });
      }
    });

    // Search Tests
    allTests.forEach(t => {
      if (t.title.toLowerCase().includes(qLower) || t.subjects.some(s => s.toLowerCase().includes(qLower))) {
        results.push({
          type: 'Test',
          title: t.title,
          subtitle: `${t.totalQuestions} Questions • ${t.durationMinutes} mins • ${t.category}`,
          subject: t.subjects.join(', '),
          url: `/tests/${t.id}/instructions`
        });
      }
    });

    // Search Questions
    allQuestions.forEach(q => {
      if (
        q.question.toLowerCase().includes(qLower) || 
        q.topic.toLowerCase().includes(qLower) ||
        q.concept.toLowerCase().includes(qLower)
      ) {
        results.push({
          type: 'Question',
          title: q.question,
          subtitle: `${q.chapter} • ${q.topic} (${q.difficulty})`,
          subject: q.subject,
          url: `/practice?chapter=${encodeURIComponent(q.chapter)}&topic=${encodeURIComponent(q.topic)}`
        });
      }
    });

    // Search Notes
    allNotes.forEach(n => {
      if (n.title.toLowerCase().includes(qLower) || n.content.toLowerCase().includes(qLower)) {
        results.push({
          type: 'Note',
          title: n.title,
          subtitle: `${n.chapter} • Personal study note`,
          subject: n.subject,
          url: `/notes`
        });
      }
    });

    return results;
  }, [query, allQuestions, allTests, allFormulas, allNotes]);

  const filteredResults = searchResults.filter(r => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Questions') return r.type === 'Question';
    if (activeFilter === 'Chapters') return r.type === 'Chapter';
    if (activeFilter === 'Formulas') return r.type === 'Formula';
    if (activeFilter === 'Tests') return r.type === 'Test';
    if (activeFilter === 'Notes') return r.type === 'Note';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Search Bar Banner */}
      <Card className="p-6 bg-gradient-to-r from-purple-900 to-slate-900 text-white border-none shadow-xl space-y-4">
        <div>
          <h1 className="text-2xl font-black">Universal Study Search</h1>
          <p className="text-xs text-purple-200 mt-0.5">
            Search across questions, chapters, formulas, flashcards, mock tests, and personal notes.
          </p>
        </div>

        {/* Input Form */}
        <div className="relative">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search any concept, formula, chapter, or question snippet..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/30 shadow-inner"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-purple-300 font-medium mr-1">Popular:</span>
          {['Kinematics', 'Thermodynamics', 'Projectile', 'Integrals', 'Units'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {(['All', 'Chapters', 'Formulas', 'Questions', 'Tests', 'Notes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === tab
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Results List */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 font-medium">
          Found <strong>{filteredResults.length}</strong> matching results for "{query}"
        </div>

        {filteredResults.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-sm text-slate-500">No matching study materials found for this search.</p>
          </Card>
        ) : (
          filteredResults.map((res, idx) => {
            let badgeVariant: 'brand' | 'success' | 'warning' | 'info' | 'danger' = 'brand';
            if (res.type === 'Formula') badgeVariant = 'warning';
            if (res.type === 'Test') badgeVariant = 'success';
            if (res.type === 'Chapter') badgeVariant = 'brand';
            if (res.type === 'Note') badgeVariant = 'info';

            return (
              <Card
                key={idx}
                className="p-4 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between gap-4"
                onClick={() => navigate(res.url)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={badgeVariant} size="sm">{res.type}</Badge>
                    <span className="text-xs font-semibold text-purple-700">{res.subject}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{res.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{res.subtitle}</p>
                </div>

                <div className="flex items-center text-xs font-bold text-purple-600 gap-1 flex-shrink-0">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
