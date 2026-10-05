import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  FileText, 
  ArrowRight,
  X,
  Play,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Layers,
  BookMarked,
  Clock,
  Tv,
  HelpCircle
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';

export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || 'Units';

  const [query, setQuery] = useState<string>(initialQ);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQ);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Formulas' | 'Lectures' | 'Notes' | 'Planner'>('All');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [results, setResults] = useState<{
    formulas: any[];
    lectures: any[];
    notes: any[];
    planner: any[];
    relatedTopics: string[];
  }>({
    formulas: [],
    lectures: [],
    notes: [],
    planner: [],
    relatedTopics: []
  });

  const [activeVideo, setActiveVideo] = useState<{ youtubeVideoId: string; title: string; chapter: string } | null>(null);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      if (query.trim()) {
        searchParams.set('q', query.trim());
        setSearchParams(searchParams, { replace: true });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch search suggestions
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/search/suggestions?q=${encodeURIComponent(query.trim())}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        }
      })
      .catch(() => setSuggestions([]));
  }, [query]);

  // Fetch unified search results
  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ formulas: [], lectures: [], notes: [], planner: [], relatedTopics: [] });
      return;
    }

    setIsLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}&type=${activeFilter.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        if (data.success && data.results) {
          setResults(data.results);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery, activeFilter]);

  const handleCopyFormula = (fText: string, title: string) => {
    navigator.clipboard.writeText(fText);
    setCopiedFormula(title);
    setToastMsg(`Copied formula: ${title}`);
    setTimeout(() => {
      setCopiedFormula(null);
      setToastMsg(null);
    }, 2500);
  };

  const handleAddToPlanner = (title: string, subject = 'Physics', chapter = 'General') => {
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    const currentDay = days[new Date().getDay()];

    ecosystemService.addPlannerTask({
      day: currentDay,
      subject: (subject as any) || 'Physics',
      chapter,
      taskType: 'Revision',
      durationMinutes: 45,
      completed: false,
      notes: `Study search task: ${title}`
    });
    setToastMsg(`Added "${title}" to your Study Planner!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const totalResultsCount = useMemo(() => {
    return (
      results.formulas.length +
      results.lectures.length +
      results.notes.length +
      results.planner.length
    );
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-24">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Search Banner - PREPORA Emerald Theme (task3.md) */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white border-emerald-900/30 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unified Study Discovery System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Global Study Search</h1>
          <p className="text-xs text-slate-300">
            One search for all learning resources: Formulas, Smart Lectures, Notes, and Study Plans.
          </p>
        </div>

        {/* Global Search Input Box with Suggestions Dropdown */}
        <div className="relative z-20">
          <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search topics, formulas, chapters, lectures (e.g. Units, Kinematics, Newton)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-[#0c131a] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-inner"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setDebouncedQuery('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Autocomplete Suggestions (task3.md section 3) */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#0e1620] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-30">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Suggested Resources:
              </div>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(sug.replace(/\s*\(.*?\)/, ''));
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>{sug}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Topics Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs relative z-10 pt-1">
          <span className="text-emerald-300 font-medium mr-1">Popular:</span>
          {['Units', 'Kinematics', 'Thermodynamics', 'Newton', 'Electrostatics', 'Matrices'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                setShowSuggestions(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {/* Filter Tabs (task3.md section 4) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {(['All', 'Formulas', 'Lectures', 'Notes', 'Planner'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === tab
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Found <strong>{totalResultsCount}</strong> resources matching "{debouncedQuery}"
          </span>
          {isLoading && <span className="text-emerald-600 font-bold animate-pulse">Searching curriculum...</span>}
        </div>

        {totalResultsCount === 0 && !isLoading ? (
          <Card className="text-center py-16 space-y-4">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No highly relevant study material found.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Check your spelling, or browse directly by subject or topic.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <Button size="sm" onClick={() => navigate('/formula-sheet')}>
                Open Formula Sheet
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/lectures')}>
                Browse Lectures
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* 1. FORMULAS SECTION (task3.md section 5) */}
            {(activeFilter === 'All' || activeFilter === 'Formulas') && results.formulas.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  <BookMarked className="w-4 h-4 text-emerald-500" />
                  <span>Formulas & Concepts ({results.formulas.length})</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {results.formulas.map((f, i) => (
                    <Card key={i} className="p-4 sm:p-5 border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="warning" size="sm">Formula</Badge>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            {f.subject} • {f.chapter}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">Class {f.classLevel}</span>
                      </div>

                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{f.title}</h4>

                      {/* KaTeX Equation */}
                      <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-center overflow-x-auto">
                        <MathRenderer math={`\\[${f.formula}\\]`} />
                      </div>

                      {f.variables && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          <strong>Variables: </strong>{f.variables}
                        </p>
                      )}

                      {/* Formula Actions (task3.md section 5) */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => handleCopyFormula(f.formula, f.title)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          {copiedFormula === f.title ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedFormula === f.title ? 'Copied' : 'Copy Formula'}</span>
                        </button>

                        <button
                          onClick={() => navigate(`/formula-sheet?subject=${encodeURIComponent(f.subject)}&chapter=${encodeURIComponent(f.chapter)}`)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
                        >
                          View in Formula Sheet
                        </button>

                        <button
                          onClick={() => navigate(`/lectures?subject=${encodeURIComponent(f.subject)}&chapter=${encodeURIComponent(f.chapter)}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1"
                        >
                          <Tv className="w-3 h-3 text-emerald-500" />
                          <span>Related Lecture</span>
                        </button>

                        <button
                          onClick={() => handleAddToPlanner(`Revise Formula: ${f.title}`, f.subject, f.chapter)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3 text-emerald-500" />
                          <span>Add to Planner</span>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 2. LECTURES SECTION (task3.md section 6) */}
            {(activeFilter === 'All' || activeFilter === 'Lectures') && results.lectures.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  <Tv className="w-4 h-4 text-emerald-500" />
                  <span>Recommended Lectures ({results.lectures.length})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.lectures.map((lec, i) => (
                    <Card key={i} className="p-4 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="brand" size="sm">Lecture</Badge>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {lec.subject} • Class {lec.classLevel}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {lec.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {lec.description || `${lec.chapter} complete high-yield lecture.`}
                        </p>
                      </div>

                      {/* Dual Watch Actions: Watch Here & Open in YouTube (task3.md section 6) */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <button
                          onClick={() => setActiveVideo(lec)}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>▶ Watch Here</span>
                        </button>

                        <a
                          href={`https://www.youtube.com/watch?v=${lec.youtubeVideoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>↗ YouTube</span>
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 3. NOTES SECTION (task3.md section 8) */}
            {(activeFilter === 'All' || activeFilter === 'Notes') && results.notes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Personal Study Notes ({results.notes.length})</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {results.notes.map((note, i) => (
                    <Card
                      key={i}
                      className="p-3.5 hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between"
                      onClick={() => navigate('/notes')}
                    >
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{note.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{note.content}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 4. STUDY PLANNER / REVISION SUGGESTIONS (task3.md section 9) */}
            {(activeFilter === 'All' || activeFilter === 'Planner') && results.planner.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Suggested Study & Revision Tasks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.planner.map((item, i) => (
                    <Card key={i} className="p-3.5 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h5>
                        <p className="text-[11px] text-slate-500">
                          {item.subject} • {item.suggestedDuration}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToPlanner(item.title, item.subject, item.chapter)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 5. RELATED TOPICS (task3.md section 11) */}
            {results.relatedTopics.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Curriculum Related Topics:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {results.relatedTopics.map((top, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(top);
                        setShowSuggestions(false);
                      }}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-emerald-500 transition-colors"
                    >
                      {top}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Embedded Video Modal Player for Search Results */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Recommended Lecture
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {activeVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in YouTube</span>
              </a>

              <Button size="sm" onClick={() => setActiveVideo(null)}>
                Close Player
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
