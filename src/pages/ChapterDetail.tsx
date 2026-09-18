import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { formulaService } from '../services/formulaService';
import { ecosystemService } from '../services/ecosystemService';
import { syllabusService } from '../services/syllabusService';
import { userService } from '../services/userService';
import { InteractiveMindMap } from '../components/common/InteractiveMindMap';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { MathRenderer } from '../components/common/MathRenderer';
import { FormulaCard } from '../types';

export const ChapterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const chapterName = decodeURIComponent(id || 'Kinematics');
  const canonicalChapter = syllabusService.getChapter(chapterName);
  const questions = questionService.filterQuestions({ chapter: chapterName });
  const canonicalTopics = canonicalChapter?.topics?.map(t => t.name) || [];
  const topics = canonicalTopics.length > 0 ? canonicalTopics : questionService.getTopics(chapterName);
  const sampleQ = questions[0];
  const subjectName = canonicalChapter?.subjectName || sampleQ?.subject || 'Physics';
  const classNum = canonicalChapter?.classLevel || sampleQ?.class || '12';

  const masteryData = ecosystemService.getChapterMastery(chapterName);
  const chapterMistakes = userService.getMistakes().filter(
    (m) => m.chapter.toLowerCase() === chapterName.toLowerCase()
  );
  const chapterNotes = userService.getNotes().filter(
    (n) => n.chapter?.toLowerCase() === chapterName.toLowerCase()
  );
  const pyqQuestions = questions.filter(
    (q) => q.source === 'PYQ' || q.contentType === 'PYQ' || q.year
  );

  // Progressive Disclosure: Active Selected Topic
  const [selectedTopic, setSelectedTopic] = useState<string | null>(topics[0] || null);

  // Secondary Tools Tabs
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<'none' | 'formulas' | 'pyqs' | 'mindmap'>('none');
  const [showDoubtModal, setShowDoubtModal] = useState<boolean>(false);

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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/practice')}
          className="text-xs text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Practice
        </Button>
      </div>

      {/* 1. Chapter Header */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>{subjectName}</span>
              <span>•</span>
              <span>Class {classNum}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {chapterName}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-left sm:text-right">
              <div className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Chapter Mastery</div>
              <div className="text-2xl font-bold text-slate-900">{masteryData.overallMastery}%</div>
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate(`/practice?chapter=${encodeURIComponent(chapterName)}`)}
              className="py-2 px-3 bg-slate-900 hover:bg-black text-white font-semibold text-xs rounded-lg"
            >
              Practice Chapter
            </Button>
          </div>
        </div>

        {/* Quick Secondary Links Bar */}
        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={() => setActiveSecondaryTab(activeSecondaryTab === 'formulas' ? 'none' : 'formulas')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeSecondaryTab === 'formulas'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100 font-medium'
            }`}
          >
            Formulas ({formulas.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSecondaryTab(activeSecondaryTab === 'pyqs' ? 'none' : 'pyqs')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeSecondaryTab === 'pyqs'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100 font-medium'
            }`}
          >
            PYQs ({pyqQuestions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSecondaryTab(activeSecondaryTab === 'mindmap' ? 'none' : 'mindmap')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeSecondaryTab === 'mindmap'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100 font-medium'
            }`}
          >
            Mind Map
          </button>
          <button
            type="button"
            onClick={() => setShowDoubtModal(true)}
            className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-slate-100 font-medium ml-auto"
          >
            Ask Doubt
          </button>
        </div>
      </Card>

      {/* Secondary Tab: Formulas */}
      {activeSecondaryTab === 'formulas' && (
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">Key Formulas</h3>
            <span className="text-xs text-slate-400">{formulas.length} formulas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formulas.map((f) => (
              <div key={f.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">{f.name}</div>
                <div className="p-2 bg-slate-900 text-emerald-300 font-mono text-xs rounded font-bold">
                  {f.formula}
                </div>
                <p className="text-[11px] text-slate-500">{f.variables}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Secondary Tab: PYQs */}
      {activeSecondaryTab === 'pyqs' && (
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">Official Previous Year Questions</h3>
            <span className="text-xs text-slate-400">{pyqQuestions.length} questions</span>
          </div>
          <div className="space-y-2.5">
            {pyqQuestions.slice(0, 4).map((q) => (
              <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{q.exam} {q.year || '2024'} • {q.topic}</span>
                  <span className="font-semibold text-slate-700">{q.difficulty}</span>
                </div>
                <div className="font-medium text-slate-900">
                  <MathRenderer text={q.question} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Secondary Tab: Mind Map */}
      {activeSecondaryTab === 'mindmap' && (
        <Card className="p-5">
          <InteractiveMindMap chapterName={chapterName} subject={sampleQ?.subject || 'Physics'} />
        </Card>
      )}

      {/* 2. Compact Topics List with Progressive Disclosure */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Topics ({topics.length})</h2>
          <span className="text-xs text-slate-500">Click a topic to reveal details and actions</span>
        </div>

        <div className="space-y-2">
          {topics.map((t) => {
            const isSelected = selectedTopic === t;
            const topicMistakes = chapterMistakes.filter((m) =>
              m.topic.toLowerCase().includes(t.toLowerCase())
            );
            const topicData = masteryData.topics.find(
              (mt) => mt.topicName?.toLowerCase() === t.toLowerCase() || mt.topic?.toLowerCase() === t.toLowerCase()
            );
            const topicAccuracy = topicData?.accuracy ?? topicData?.percentage ?? 65;

            return (
              <div
                key={t}
                className="border border-slate-200 rounded-xl bg-white transition-all overflow-hidden"
              >
                {/* Topic Header Row */}
                <button
                  type="button"
                  onClick={() => setSelectedTopic(isSelected ? null : t)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-slate-900">{t}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500 hidden sm:inline">
                      Accuracy: <strong className="text-slate-800">{topicAccuracy}%</strong>
                    </span>
                    {isSelected ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Progressive Disclosure: Topic Details */}
                {isSelected && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Questions</div>
                        <div className="text-base font-bold text-slate-900 mt-0.5">
                          {questions.filter((q) => q.topic.toLowerCase().includes(t.toLowerCase())).length || 15}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Accuracy</div>
                        <div className="text-base font-bold text-slate-900 mt-0.5">{topicAccuracy}%</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Mistakes</div>
                        <div className="text-base font-bold text-rose-600 mt-0.5">{topicMistakes.length}</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Revision</div>
                        <div className="text-base font-bold text-slate-900 mt-0.5">Scheduled</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500 text-[11px]">
                        Targeted drills improve accuracy and clear recorded mistakes.
                      </span>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate(
                            `/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(t)}`
                          )
                        }
                        className="py-1.5 px-3 bg-slate-900 hover:bg-black text-white font-semibold text-xs rounded-lg"
                      >
                        Practice Topic
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

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
