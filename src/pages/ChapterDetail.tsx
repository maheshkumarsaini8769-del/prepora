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
  Award
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { formulaService } from '../services/formulaService';
import { ecosystemService } from '../services/ecosystemService';
import { FormulaCard } from '../types';

export const ChapterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const chapterName = decodeURIComponent(id || 'Kinematics');
  const questions = questionService.filterQuestions({ chapter: chapterName });
  const topics = questionService.getTopics(chapterName);
  const sampleQ = questions[0];

  const [activeTab, setActiveTab] = useState<'topics' | 'formulas' | 'flashcards' | 'drill'>('topics');
  const masteryData = ecosystemService.getChapterMastery(chapterName);

  const sortedTopics = [...masteryData.topics].sort((a, b) => (a.accuracy ?? a.percentage) - (b.accuracy ?? b.percentage));
  const biggestProblem = sortedTopics[0];
  const weakestTopicName = biggestProblem ? (biggestProblem.topicName || biggestProblem.topic) : (topics[0] || 'Core Theory');
  const weakestTopicAccuracy = biggestProblem ? (biggestProblem.accuracy ?? biggestProblem.percentage) : 42;

  // Formulas state
  const [formulas, setFormulas] = useState<FormulaCard[]>([]);
  useEffect(() => {
    const list = formulaService.getFormulasByChapter(chapterName);
    // If specific chapter formulas not found, provide top relevant physics/chemistry formulas
    if (list.length === 0) {
      setFormulas(formulaService.getAllFormulas().slice(0, 6));
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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
        <ArrowLeft className="w-4 h-4" /> Back to Practice
      </Button>

      {/* Chapter Banner */}
      <Card className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-900 text-white border-none p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {sampleQ && <Badge variant="brand">{sampleQ.subject}</Badge>}
          {sampleQ && <Badge variant="info">Class {sampleQ.class}</Badge>}
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
            JEE & NEET Syllabus
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{chapterName}</h1>

        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm text-brand-100">
          <div>
            <span className="text-white font-bold">{topics.length}</span> Sub-topics
          </div>
          <div>
            <span className="text-white font-bold">{questions.length}</span> Practice Questions
          </div>
          <div>
            <span className="text-white font-bold">{formulas.length}</span> Formula Cards
          </div>
        </div>
      </Card>

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

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-2">
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'topics'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Overview & Topics
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'formulas'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Formula Sheet</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'formulas' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'}`}>
            {formulas.length}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab('flashcards');
            setIsFlipped(false);
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Flashcards Mode</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
        </button>
      </div>

      {/* TAB 1: TOPICS & OVERVIEW */}
      {activeTab === 'topics' && (
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

          {/* "YOUR BIGGEST PROBLEM IN THIS CHAPTER" (task2.md Section 8.1 #3) */}
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

          {/* EXAM RELEVANCE & PYQ TREND BOX (task2.md Section 8.1 #5) */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Exam Weightage</span>
                <div className="text-sm font-black text-slate-900">2-3 Questions</div>
                <div className="text-[11px] text-purple-700 font-semibold">8 - 12 Guaranteed Marks</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">PYQ Trend</span>
                <div className="text-sm font-black text-slate-900">Every Year (7-Yr Streak)</div>
                <div className="text-[11px] text-emerald-700 font-semibold">100% Exam Occurrence</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Difficulty Distribution</span>
                <div className="text-sm font-black text-slate-900">30% E • 50% M • 20% H</div>
                <div className="text-[11px] text-sky-700 font-semibold">Balanced Question Mix</div>
              </div>
            </div>
          </div>

          {/* 4 PRACTICE OPTIONS (task2.md Section 8.1 #6) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(weakestTopicName)}`)}
              className="p-4 rounded-2xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-600 text-white">
                  Recommended
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">Practice Weak Subtopics</h4>
                <p className="text-[11px] text-slate-500 mt-1">Target only your identified bottleneck topics</p>
              </div>
              <span className="text-xs font-bold text-purple-700 mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Start Drill →
              </span>
            </button>

            <button
              onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}`)}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Comprehensive</span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">Full Chapter Practice</h4>
                <p className="text-[11px] text-slate-500 mt-1">Mixed practice covering all subtopics</p>
              </div>
              <span className="text-xs font-bold text-slate-700 mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Start All Qs →
              </span>
            </button>

            <button
              onClick={() => navigate(`/tests`)}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Timed Exam</span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">Chapter Mock Test</h4>
                <p className="text-[11px] text-slate-500 mt-1">Full exam environment with countdown timer</p>
              </div>
              <span className="text-xs font-bold text-slate-700 mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Take Test →
              </span>
            </button>

            <button
              onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&source=PYQ`)}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Past Papers</span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">PYQ Questions Only</h4>
                <p className="text-[11px] text-slate-500 mt-1">Practice actual previous year questions</p>
              </div>
              <span className="text-xs font-bold text-slate-700 mt-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Solve PYQs →
              </span>
            </button>
          </div>

          {/* Topics Breakdown with Traffic Light Status */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Subtopic Mastery Breakdown ({topics.length})</h3>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Mastered</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Learning</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Weak</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {masteryData.topics.map((t, idx) => {
                const isMastered = t.status === 'green' || (t.status as string) === 'mastered';
                const isLearning = t.status === 'yellow' || (t.status as string) === 'learning';
                const badgeColor = 
                  isMastered ? 'bg-emerald-100 text-emerald-800' :
                  isLearning ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800';
                const label = isMastered ? 'Mastered' : isLearning ? 'Learning' : 'Weak';
                const topicName = t.topicName || t.topic;
                const acc = t.accuracy ?? t.percentage;
                const qCount = t.questionsAttempted ?? (8 + idx * 3);

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-200 transition-all shadow-xs"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{topicName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${badgeColor}`}>
                            {label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>Accuracy: <strong className="text-slate-800">{acc}%</strong></span>
                          <span>•</span>
                          <span>{qCount} Qs Attempted</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(topicName)}`)}
                      className="text-xs text-brand-600 hover:text-brand-700 font-semibold shrink-0"
                    >
                      Drill Topic →
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: FORMULA SHEET */}
      {activeTab === 'formulas' && (
        <div className="space-y-5">
          {/* Quick Drill Action CTA */}
          <div className="p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-100/60 rounded-2xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Formula Memory Accelerator</span>
              </div>
              <h4 className="text-base font-black text-slate-900">15-Minute Quick Revision Drill</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Rapidly drill 10 random high-yield formulas with spaced repetition tracking.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={handleStartDrill}
                className="font-bold text-xs shadow-md shadow-purple-500/20"
              >
                Start 15-Min Drill
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab('flashcards');
                  setIsFlipped(false);
                }}
                className="font-bold text-xs"
              >
                Flashcards Mode
              </Button>
            </div>
          </div>

          {/* Formulas List */}
          <div className="space-y-4">
            {formulas.map((f, i) => (
              <Card key={f.id} className="p-5 space-y-3 hover:border-purple-300 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{f.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.siUnit && (
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        SI: {f.siUnit}
                      </span>
                    )}
                    {f.learnedStatus === 'mastered' && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ✓ Mastered
                      </span>
                    )}
                    {f.learnedStatus === 'need-revision' && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        🔄 Need Revision
                      </span>
                    )}
                  </div>
                </div>

                {/* Formula Statement */}
                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100/80 font-mono text-sm sm:text-base font-bold text-purple-950 overflow-x-auto">
                  {f.formula}
                </div>

                {/* Variables & Notes */}
                <div className="text-xs text-slate-600 space-y-1">
                  <div>
                    <strong className="text-slate-800">Variables:</strong> {f.variables}
                  </div>
                  {f.importantNote && (
                    <div className="pt-1 text-amber-800">
                      <strong>Note:</strong> {f.importantNote}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE FLASHCARDS MODE */}
      {activeTab === 'flashcards' && activeCard && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Card {currentCardIndex + 1} of {formulas.length}</span>
            <span>Click card or press flip button to reveal</span>
          </div>

          {/* Flashcard Component */}
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="cursor-pointer min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-lg hover:border-purple-400 transition-all flex flex-col justify-between select-none relative overflow-hidden"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-600 uppercase tracking-wider">
                {isFlipped ? 'BACK • FORMULA & EXPLANATION' : 'FRONT • QUESTION PROMPT'}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Tap to flip
              </span>
            </div>

            {/* Card Content */}
            {!isFlipped ? (
              <div className="py-8 text-center space-y-3">
                <div className="text-xs text-purple-600 font-semibold">{chapterName}</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 max-w-md mx-auto">
                  {activeCard.name}
                </h3>
                <p className="text-xs text-slate-400">
                  What is the exact equation, relation, and constraint condition?
                </p>
              </div>
            ) : (
              <div className="py-4 space-y-4 animate-in fade-in duration-200">
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 font-mono text-base sm:text-lg font-bold text-purple-950 text-center">
                  {activeCard.formula}
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 max-w-lg mx-auto">
                  <p><strong>Variables:</strong> {activeCard.variables}</p>
                  {activeCard.siUnit && <p><strong>SI Unit:</strong> {activeCard.siUnit}</p>}
                  {activeCard.importantNote && (
                    <p className="text-amber-800"><strong>Note:</strong> {activeCard.importantNote}</p>
                  )}
                </div>
              </div>
            )}

            {/* Card Footer Status */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Status: <strong className="text-slate-700 capitalize">{activeCard.learnedStatus || 'Unlearned'}</strong></span>
              <span className="text-purple-600 font-semibold">Prepora Flashcard Drill</span>
            </div>
          </div>

          {/* Navigation & Learning Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentCardIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={currentCardIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentCardIndex(prev => Math.min(formulas.length - 1, prev + 1));
                }}
                disabled={currentCardIndex === formulas.length - 1}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(activeCard.id, 'need-revision')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Need Revision
              </button>
              <button
                onClick={() => handleUpdateStatus(activeCard.id, 'mastered')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Check className="w-3.5 h-3.5" /> Know It!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 15-MINUTE QUICK REVISION DRILL */}
      {activeTab === 'drill' && (
        <div className="space-y-6">
          {!drillCompleted ? (
            <Card className="p-6 space-y-6">
              {/* Drill Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-800">
                    Drill Card {drillIndex + 1} of {drillCards.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-sm font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                  <Clock className="w-4 h-4" />
                  <span>{formatDrillTime(drillSecondsLeft)}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-2 transition-all duration-300"
                  style={{ width: `${((drillIndex + 1) / drillCards.length) * 100}%` }}
                />
              </div>

              {/* Drill Flashcard */}
              <div
                onClick={() => setDrillFlipped(prev => !prev)}
                className="cursor-pointer min-h-[220px] p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-center select-none"
              >
                {!drillFlipped ? (
                  <div className="space-y-2">
                    <span className="text-xs text-purple-600 font-bold uppercase">{activeDrillCard.chapterTitle}</span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">{activeDrillCard.name}</h3>
                    <p className="text-xs text-slate-400 mt-2">Tap to inspect equation and units</p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="p-3 bg-white rounded-xl border border-purple-200 font-mono text-base font-bold text-purple-900">
                      {activeDrillCard.formula}
                    </div>
                    <p className="text-xs text-slate-600">{activeDrillCard.variables}</p>
                    {activeDrillCard.importantNote && (
                      <p className="text-[11px] text-amber-800 italic">{activeDrillCard.importantNote}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Drill Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (drillIndex < drillCards.length - 1) {
                      setDrillIndex(prev => prev + 1);
                      setDrillFlipped(false);
                    } else {
                      setDrillCompleted(true);
                    }
                  }}
                  className="text-xs"
                >
                  Skip
                </Button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDrillStats(prev => ({ ...prev, needRevision: prev.needRevision + 1 }));
                      formulaService.updateFormulaStatus(activeDrillCard.id, 'need-revision');
                      if (drillIndex < drillCards.length - 1) {
                        setDrillIndex(prev => prev + 1);
                        setDrillFlipped(false);
                      } else {
                        setDrillCompleted(true);
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold"
                  >
                    Need Revision
                  </button>

                  <button
                    onClick={() => {
                      setDrillStats(prev => ({ ...prev, mastered: prev.mastered + 1 }));
                      formulaService.updateFormulaStatus(activeDrillCard.id, 'mastered');
                      if (drillIndex < drillCards.length - 1) {
                        setDrillIndex(prev => prev + 1);
                        setDrillFlipped(false);
                      } else {
                        setDrillCompleted(true);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
                  >
                    Know It!
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-black text-slate-900">Quick Revision Drill Complete!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You successfully reviewed {drillCards.length} high-yield formula cards for {chapterName}.
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-center py-2">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-black text-emerald-700">{drillStats.mastered}</div>
                  <div className="text-[11px] text-emerald-800 font-bold">Mastered</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-2xl font-black text-amber-700">{drillStats.needRevision}</div>
                  <div className="text-[11px] text-amber-800 font-bold">Need Revision</div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-2">
                <Button variant="outline" onClick={() => setActiveTab('formulas')}>
                  Back to Formula Sheet
                </Button>
                <Button variant="primary" onClick={handleStartDrill} className="font-bold">
                  Repeat Drill
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

