import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Play,
  Layers,
  Zap,
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookmarkCheck,
  Check,
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Activity,
  Target,
  Award,
  FileText,
  HelpCircle,
  FileEdit,
  XCircle,
  BrainCircuit
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { formulaService } from '../services/formulaService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { InteractiveMindMap } from '../components/common/InteractiveMindMap';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { MathRenderer } from '../components/common/MathRenderer';
import { FormulaCard, Question } from '../types';

export type ChapterTab = 
  | 'overview' 
  | 'learn' 
  | 'notes' 
  | 'formulas' 
  | 'flashcards' 
  | 'basic' 
  | 'advanced' 
  | 'pyqs' 
  | 'test' 
  | 'mistakes' 
  | 'drill' 
  | 'mindmap';

export const ChapterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const chapterName = decodeURIComponent(id || 'Kinematics');
  const questions = questionService.filterQuestions({ chapter: chapterName });
  const topics = questionService.getTopics(chapterName);
  const sampleQ = questions[0];

  const [activeTab, setActiveTab] = useState<ChapterTab>('overview');
  const [showDoubtModal, setShowDoubtModal] = useState<boolean>(false);
  const masteryData = ecosystemService.getChapterMastery(chapterName);

  const sortedTopics = [...masteryData.topics].sort((a, b) => (a.accuracy ?? a.percentage) - (b.accuracy ?? b.percentage));
  const biggestProblem = sortedTopics[0];
  const weakestTopicName = biggestProblem ? (biggestProblem.topicName || biggestProblem.topic) : (topics[0] || 'Core Theory');
  const weakestTopicAccuracy = biggestProblem ? (biggestProblem.accuracy ?? biggestProblem.percentage) : 42;

  // Mistakes & Notes for this chapter
  const chapterMistakes = userService.getMistakes().filter(m => m.chapter.toLowerCase() === chapterName.toLowerCase());
  const chapterNotes = userService.getNotes().filter(n => n.chapter?.toLowerCase() === chapterName.toLowerCase());

  // Questions categorization
  const pyqQuestions = questions.filter(q => q.source === 'PYQ' || q.contentType === 'PYQ' || q.year);
  const basicQuestions = questions.filter(q => q.difficulty === 'Easy');
  const advancedQuestions = questions.filter(q => q.difficulty === 'Hard' || q.difficulty === 'Medium');

  // Formulas state
  const [formulas, setFormulas] = useState<FormulaCard[]>([]);
  useEffect(() => {
    const list = formulaService.getFormulasByChapter(chapterName);
    if (list.length === 0) {
      setFormulas(formulaService.getAllFormulas().slice(0, 8));
    } else {
      setFormulas(list);
    }
  }, [chapterName]);

  // Flashcards mode state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // 15-Minute Quick Revision Drill state
  const [drillCards, setDrillCards] = useState<FormulaCard[]>([]);
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [drillFlipped, setDrillFlipped] = useState<boolean>(false);
  const [drillSecondsLeft, setDrillSecondsLeft] = useState<number>(15 * 60);
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);
  const [drillStats, setDrillStats] = useState<{ mastered: number; needRevision: number }>({ mastered: 0, needRevision: 0 });

  // Countdown timer for 15-min drill
  useEffect(() => {
    if (activeTab !== 'drill' || drillCompleted) return;
    const interval = setInterval(() => {
      setDrillSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setDrillCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, drillCompleted]);

  const handleStartDrill = () => {
    const set = formulaService.getQuickRevisionSet(10, chapterName);
    setDrillCards(set.length > 0 ? set : formulaService.getAllFormulas().slice(0, 10));
    setDrillIndex(0);
    setDrillFlipped(false);
    setDrillSecondsLeft(15 * 60);
    setDrillCompleted(false);
    setDrillStats({ mastered: 0, needRevision: 0 });
    setActiveTab('drill');
  };

  const handleUpdateStatus = (fId: string, status: 'mastered' | 'need-revision') => {
    formulaService.updateFormulaStatus(fId, status);
    setFormulas(prev => prev.map(f => f.id === fId ? { ...f, learnedStatus: status } : f));
  };

  const activeCard = formulas[currentCardIndex] || formulas[0];
  const activeDrillCard = drillCards[drillIndex] || drillCards[0];

  const formatDrillTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Button>

      {/* Chapter Banner */}
      <Card className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white border-none p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {sampleQ && <Badge variant="brand">{sampleQ.subject}</Badge>}
          {sampleQ && <Badge variant="info">Class {sampleQ.class}</Badge>}
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
            JEE & NEET Syllabus
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{chapterName}</h1>

        <div className="flex items-center gap-6 mt-5 pt-4 border-t border-white/10 text-xs sm:text-sm text-brand-100 flex-wrap">
          <div>
            <span className="text-white font-bold">{topics.length}</span> Sub-topics
          </div>
          <div>
            <span className="text-white font-bold">{questions.length}</span> Practice Questions
          </div>
          <div>
            <span className="text-white font-bold">{formulas.length}</span> Formula Cards
          </div>
          <div>
            <span className="text-white font-bold">{pyqQuestions.length}</span> PYQs
          </div>
          <div>
            <span className="text-white font-bold">{masteryData.overallMastery}%</span> Mastery
          </div>
        </div>
      </Card>

      {/* Chapter Quick Action Bar (task4.md Section 26) */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('learn')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'learn' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          📖 Learn
        </button>
        <button
          type="button"
          onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}`)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
        >
          ✍️ Practice
        </button>
        <button
          type="button"
          onClick={() => navigate(`/build-test?chapter=${encodeURIComponent(chapterName)}`)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
        >
          🧪 Test
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pyqs')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pyqs' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          📄 PYQ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('formulas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'formulas' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🧮 Formula
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('flashcards')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'flashcards' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🃏 Flashcards
        </button>
        <button
          type="button"
          onClick={() => handleStartDrill()}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'drill' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🔄 Revision
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('mistakes')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'mistakes' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ❌ Mistakes
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('mindmap')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'mindmap' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🧠 Mind Map
        </button>
        <button
          type="button"
          onClick={() => setShowDoubtModal(true)}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-all cursor-pointer ml-auto"
        >
          ❓ Ask Doubt
        </button>
      </div>

      {/* Advisory Banner: "Don't Study This Now" when mastery >= 85% */}
      {masteryData.overallMastery >= 85 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-900 shadow-sm animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-amber-900">Study Strategy Advisory</h4>
                <Badge variant="success" size="sm">Mastered ({masteryData.overallMastery}%)</Badge>
              </div>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                You have reached <strong>{masteryData.overallMastery}% mastery</strong> in {chapterName}. Continuing to drill this chapter yields diminishing returns. We strongly recommend shifting your study time to your critical bottlenecks.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/weakness')}
            className="shrink-0 text-xs font-bold bg-white text-amber-900 border-amber-300 hover:bg-amber-100 shadow-xs"
          >
            Fix My Weaknesses Instead →
          </Button>
        </div>
      )}

      {/* 10-Tab Workspace Bar */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-1.5 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'overview' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Overview & Telemetry
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'learn' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          📖 Learn & Concepts
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'notes' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          📝 Notes ({chapterNotes.length})
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'formulas' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🧮 Formulas ({formulas.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('flashcards');
            setIsFlipped(false);
          }}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'flashcards' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🃏 Flashcards
        </button>
        <button
          onClick={() => setActiveTab('pyqs')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'pyqs' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          📄 PYQs ({pyqQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'mistakes' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          ❌ Mistakes ({chapterMistakes.length})
        </button>
        <button
          onClick={() => setActiveTab('mindmap')}
          className={`py-2 px-3 rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === 'mindmap' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🧠 Mind Map
        </button>
      </div>

      {/* TAB 1: OVERVIEW & TELEMETRY */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Chapter Mastery Dashboard Card */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-white to-purple-50/40 border border-purple-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Dynamic Mastery Assessment</span>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
                  <span>Chapter Mastery Level</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    masteryData.overallMastery >= 80 ? 'bg-emerald-100 text-emerald-800' :
                    masteryData.overallMastery >= 50 ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {masteryData.overallMastery >= 80 ? 'Mastered' : masteryData.overallMastery >= 50 ? 'In Progress' : 'Needs Focus'}
                  </span>
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-3xl font-black text-purple-700">{masteryData.overallMastery}%</span>
                <p className="text-[11px] text-slate-500 font-medium">Weighted Readiness</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  masteryData.overallMastery >= 80 ? 'bg-emerald-500' :
                  masteryData.overallMastery >= 50 ? 'bg-amber-500' :
                  'bg-rose-500'
                }`}
                style={{ width: `${masteryData.overallMastery}%` }}
              />
            </div>

            {/* 4 Multi-dimensional Mastery Factors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Concept</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{masteryData.conceptUnderstanding ?? masteryData.conceptMastery}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: `${masteryData.conceptUnderstanding ?? masteryData.conceptMastery}%` }} />
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Accuracy</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{masteryData.accuracy ?? masteryData.accuracyMastery}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${masteryData.accuracy ?? masteryData.accuracyMastery}%` }} />
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Speed Index</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{masteryData.speedVsIdeal ?? masteryData.speedMastery}%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${masteryData.speedVsIdeal ?? masteryData.speedMastery}%` }} />
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400">Consistency</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">84%</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `84%` }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Biggest Problem In Chapter */}
          {biggestProblem && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-slate-900/5 border border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                      Your Biggest Problem in This Chapter
                    </span>
                    <Badge variant="danger" size="sm">{weakestTopicAccuracy}% Accuracy</Badge>
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    High Error Concentration on: {weakestTopicName}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    You lose the majority of marks in {chapterName} on <strong>{weakestTopicName}</strong>. 
                    Fixing this single subtopic will jump your chapter mastery from <strong>{masteryData.overallMastery}%</strong> to <strong>{Math.min(95, masteryData.overallMastery + 24)}%</strong>.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(weakestTopicName)}&count=5`)}
                className="shrink-0 font-black text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 py-2.5 px-4"
              >
                <span>Fix This Subtopic Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          )}

          {/* Subtopics Checklist */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900">
              Subtopics in this Chapter
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-purple-300 transition"
                >
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{t}</h4>
                    <span className="text-[10px] text-slate-400">High exam yield</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(t)}`)}
                    className="text-[11px] font-bold py-1 px-3 shrink-0"
                  >
                    Practice
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEARN & CONCEPTS */}
      {activeTab === 'learn' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Chapter Learning Summary</h3>
              <p className="text-xs text-slate-500">Core theoretical definitions, postulates, and boundary conditions</p>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate(`/tutor?subject=${sampleQ?.subject || 'Physics'}&chapter=${encodeURIComponent(chapterName)}`)}
              className="text-xs font-bold"
            >
              <BrainCircuit className="w-3.5 h-3.5 mr-1" />
              <span>Ask AI Teacher</span>
            </Button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <h4 className="font-black text-purple-900 text-sm">Fundamental Framework of {chapterName}</h4>
              <p>
                In competitive examination syllabi, {chapterName} forms the foundational bedrock for mechanics and problem solving. Mastery requires conceptual fluency with vector quantities, coordinate frame selection, and continuous calculus derivations.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">High-Yield Concepts to Retain:</h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Vector Consistency:</strong> Always establish an origin and positive direction before applying standard algebraic relations.</li>
                <li><strong>Inflection Points:</strong> On graphs, slope indicates the instantaneous derivative (e.g. slope of $x-t$ gives velocity, slope of $v-t$ gives acceleration).</li>
                <li><strong>Integration Boundaries:</strong> Area under curves equates to cumulative physical changes (e.g. area under $v-t$ curve equals net displacement).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Chapter Revision Notes</h3>
              <p className="text-xs text-slate-500">Saved notes and highlights for {chapterName}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate('/notes')} className="text-xs font-bold">
              Open Notes Hub
            </Button>
          </div>

          {chapterNotes.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <FileEdit className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No student notes saved for this chapter yet.</p>
              <Button size="sm" variant="primary" onClick={() => navigate('/notes')} className="text-xs font-bold">
                Create First Note
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {chapterNotes.map(n => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 whitespace-pre-line">{n.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FORMULA SHEET */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{formulas.length} Core Equations</span>
            <Button size="sm" variant="primary" onClick={handleStartDrill} className="text-xs font-bold">
              <Play className="w-3.5 h-3.5 mr-1" />
              <span>Start 15-Min Formula Sprint</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formulas.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-700">{f.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.learnedStatus === 'mastered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {f.learnedStatus === 'mastered' ? 'Mastered' : 'Needs Review'}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl font-bold">
                  {f.formula}
                </div>
                <p className="text-[11px] text-slate-500">{f.variables}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <Card className="p-6 sm:p-8 max-w-xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Flashcard {currentCardIndex + 1} of {formulas.length}</span>
            <Badge variant="brand">Tap to Flip</Badge>
          </div>

          <div
            onClick={() => setIsFlipped(p => !p)}
            className="min-h-[220px] p-6 rounded-3xl bg-purple-50/50 border-2 border-dashed border-purple-200 flex flex-col justify-center items-center cursor-pointer select-none"
          >
            {!isFlipped ? (
              <div className="space-y-2">
                <span className="text-xs text-purple-600 font-bold uppercase">{activeCard?.chapterTitle}</span>
                <h3 className="text-xl font-black text-slate-900">{activeCard?.name}</h3>
                <p className="text-xs text-slate-400 mt-2">What is the governing equation?</p>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-3 bg-slate-900 text-amber-300 font-mono text-base font-bold rounded-2xl">
                  {activeCard?.formula}
                </div>
                <p className="text-xs text-slate-600">{activeCard?.variables}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentCardIndex === 0}
              onClick={() => {
                setCurrentCardIndex(p => p - 1);
                setIsFlipped(false);
              }}
            >
              Previous
            </Button>

            <Button
              variant="primary"
              size="sm"
              disabled={currentCardIndex === formulas.length - 1}
              onClick={() => {
                setCurrentCardIndex(p => p + 1);
                setIsFlipped(false);
              }}
            >
              Next Flashcard
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 6: PYQS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{pyqQuestions.length} Official Previous Year Questions</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&includePYQs=true`)}
              className="text-xs font-bold"
            >
              Practice All PYQs
            </Button>
          </div>

          <div className="space-y-3">
            {pyqQuestions.slice(0, 5).map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
                      {q.exam} {q.year || '2024'}
                    </span>
                    <span className="text-slate-500 font-semibold">{q.topic}</span>
                  </div>
                  <Badge variant="warning" size="sm">{q.difficulty}</Badge>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  <MathRenderer text={q.question} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: MISTAKES */}
      {activeTab === 'mistakes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Chapter Mistake Log</h3>
              <p className="text-xs text-slate-500">{chapterMistakes.length} errors logged in {chapterName}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate('/mistakes')} className="text-xs font-bold">
              Full Mistake Book
            </Button>
          </div>

          {chapterMistakes.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs text-slate-600 font-bold">Zero active mistakes logged for this chapter!</p>
              <p className="text-[11px] text-slate-400">All previous mistakes have been successfully cleared.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chapterMistakes.map(m => (
                <div key={m.id} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900">{m.topic}</span>
                    <Badge variant="danger" size="sm">{m.mistakeReason}</Badge>
                  </div>
                  <p className="text-slate-700 font-medium">{m.questionSnippet}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: 15-MINUTE DRILL */}
      {activeTab === 'drill' && (
        <div className="space-y-4">
          {!drillCompleted ? (
            <Card className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Drill {drillIndex + 1} of {drillCards.length}</span>
                <span className="font-mono font-bold text-rose-600">{formatDrillTime(drillSecondsLeft)}</span>
              </div>
              <div
                onClick={() => setDrillFlipped(p => !p)}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 min-h-[200px] flex flex-col justify-center items-center cursor-pointer select-none"
              >
                {!drillFlipped ? (
                  <div className="space-y-2 text-center">
                    <span className="text-xs text-purple-600 font-bold">{activeDrillCard?.chapterTitle}</span>
                    <h3 className="text-xl font-black text-slate-900">{activeDrillCard?.name}</h3>
                    <p className="text-xs text-slate-400">Tap to reveal formula</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <div className="p-3 bg-slate-900 text-amber-300 font-mono text-base font-bold rounded-2xl">
                      {activeDrillCard?.formula}
                    </div>
                    <p className="text-xs text-slate-600">{activeDrillCard?.variables}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    if (drillIndex < drillCards.length - 1) {
                      setDrillIndex(p => p + 1);
                      setDrillFlipped(false);
                    } else {
                      setDrillCompleted(true);
                    }
                  }}
                >
                  Next Equation
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-4">
              <div className="text-3xl">🏆</div>
              <h3 className="text-xl font-black text-slate-900">Drill Finished!</h3>
              <Button size="sm" variant="outline" onClick={() => setActiveTab('overview')}>
                Return to Overview
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* TAB 9: MIND MAP */}
      {activeTab === 'mindmap' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <InteractiveMindMap
            chapterName={chapterName}
            subject={sampleQ?.subject || 'Physics'}
          />
        </div>
      )}

      {/* Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={showDoubtModal}
        onClose={() => setShowDoubtModal(false)}
        initialSubject={sampleQ?.subject || 'Physics'}
        questionContext={sampleQ}
      />
    </div>
  );
};
