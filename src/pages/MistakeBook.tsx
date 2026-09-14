import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Trash2,
  BookOpen,
  Filter,
  Sparkles,
  ArrowRight,
  Tag,
  Edit3,
  TrendingDown,
  Brain,
  AlertTriangle,
  MessageSquareQuote,
  Check
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { userService } from '../services/userService';
import { questionService } from '../services/questionService';
import { testService } from '../services/testService';
import { MistakeItem, Question, SubjectName, MistakeReason } from '../types';

export const MistakeBook: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [activeSolutionQ, setActiveSolutionQ] = useState<Question | null>(null);

  // Active Retry Modal State
  const [retryItem, setRetryItem] = useState<{ mistake: MistakeItem; question: Question } | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<number | null>(null);
  const [retryChecked, setRetryChecked] = useState<boolean>(false);

  const [activeDoubtQ, setActiveDoubtQ] = useState<Question | null>(null);

  // Edit Mistake Tag Modal State
  const [editingMistake, setEditingMistake] = useState<MistakeItem | null>(null);
  const [editReason, setEditReason] = useState<MistakeReason>('Calculation Error');
  const [editNote, setEditNote] = useState<string>('');

  const [mistakesList, setMistakesList] = useState<MistakeItem[]>(() => userService.getMistakes());

  const filteredMistakes = mistakesList.filter((m) => {
    if (selectedSubject !== 'All' && m.subject !== selectedSubject) return false;
    return true;
  });

  // Calculate repeated topic mistakes (failed >= 2 times)
  const topicMistakeCounts: Record<string, { count: number; chapter: string; subject: SubjectName }> = {};
  mistakesList.forEach(m => {
    if (!topicMistakeCounts[m.topic]) {
      topicMistakeCounts[m.topic] = { count: 0, chapter: m.chapter, subject: m.subject };
    }
    topicMistakeCounts[m.topic].count += m.mistakeCount || 1;
  });
  const criticalRepeatedTopics = Object.entries(topicMistakeCounts).filter(([_, data]) => data.count >= 2);

  // Calculate mistake reason breakdown
  const reasonCounts: Partial<Record<MistakeReason, number>> = {};
  mistakesList.forEach(m => {
    const r = m.mistakeReason || 'Calculation Error';
    reasonCounts[r] = (reasonCounts[r] || 0) + 1;
  });

  const calcErrors = reasonCounts['Calculation Error'] || 0;
  const conceptErrors = reasonCounts['Concept Not Clear'] || 0;
  const formulaErrors = reasonCounts['Formula Forgot'] || 0;
  const carelessErrors = (reasonCounts['Careless Mistake'] || 0) + (reasonCounts['Misread Question'] || 0);

  // Determine top mistake pattern
  let topReason: MistakeReason = 'Calculation Error';
  let maxCount = 0;
  Object.entries(reasonCounts).forEach(([r, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topReason = r as MistakeReason;
    }
  });

  const getRecommendedAction = (reason: MistakeReason) => {
    switch (reason) {
      case 'Calculation Error':
        return 'Perform step-by-step arithmetic on the Exam Tools Rough Sheet before choosing options. Pay special attention to exponents and decimal places.';
      case 'Formula Forgot':
        return 'Review your Chapter Formula Sheet flashcards every morning. Write down derived equations without looking at reference notes.';
      case 'Concept Not Clear':
        return 'Re-read the core NCERT theory for these marked chapters. Solve fundamental single-concept questions before tackling complex JEE/NEET multi-topic problems.';
      case 'Misread Question':
        return 'Underline keywords like "NOT correct", "maximum", and SI units (cm vs m, degrees vs radians) before beginning your calculation.';
      case 'Ran Out of Time':
        return 'Enforce a strict 2-minute decision timer during mocks: if a question seems lengthy, mark for review and move forward immediately.';
      default:
        return 'Review your detailed solution immediately after completing tests and tag each error accurately to track your improvement.';
    }
  };

  const handleRemove = (id: string) => {
    userService.removeMistake(id);
    setMistakesList(userService.getMistakes());
  };

  const handleOpenEditTag = (m: MistakeItem) => {
    setEditingMistake(m);
    setEditReason(m.mistakeReason || 'Calculation Error');
    setEditNote(m.mistakeNote || '');
  };

  const handleSaveTag = () => {
    if (!editingMistake) return;
    testService.updateMistakeTag(editingMistake.questionId, editReason, editNote);
    setMistakesList(userService.getMistakes());
    setEditingMistake(null);
  };

  const handleStartRetry = (m: MistakeItem) => {
    const q = questionService.getQuestionById(m.questionId);
    if (!q) return;
    setRetryItem({ mistake: m, question: q });
    setRetryAnswer(null);
    setRetryChecked(false);
  };

  const handleCheckRetry = () => {
    if (retryAnswer === null || !retryItem) return;
    setRetryChecked(true);

    if (retryAnswer === retryItem.question.correctAnswer) {
      userService.resolveMistake(retryItem.mistake.id);
      setMistakesList(userService.getMistakes());
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>High-Yield Error Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mistake Book</h1>
          <p className="text-sm text-slate-500 mt-1">
            Analyze why errors occurred, categorize primary failure reasons, and retake questions until mastered.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/weakness')}
          className="self-start text-xs font-bold"
        >
          Analyze Weaknesses →
        </Button>
      </div>

      {/* Feature 3: Mistake Analytics Metrics Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 text-center">
          <div className="text-xs text-slate-500 font-bold mb-1">Total Mistakes</div>
          <div className="text-2xl font-black text-slate-900">{mistakesList.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Recorded across mocks</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-rose-600 font-bold mb-1">Calculation Errors</div>
          <div className="text-2xl font-black text-rose-700">{calcErrors}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Arithmetic & algebra</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-purple-600 font-bold mb-1">Concept Gaps</div>
          <div className="text-2xl font-black text-purple-700">{conceptErrors}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Theory & application</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-amber-600 font-bold mb-1">Formula Memory</div>
          <div className="text-2xl font-black text-amber-700">{formulaErrors}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Formula recall slips</div>
        </Card>
      </div>

      {/* Feature 3: Biggest Mistake Pattern & Recommended Action */}
      {mistakesList.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl border-none shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-sm sm:text-base text-purple-200">Your Biggest Mistake Pattern: <span className="text-white font-black">{topReason}</span></h3>
            </div>
            <span className="text-xs text-purple-300 font-medium">
              {maxCount} occurrence{maxCount === 1 ? '' : 's'} ({Math.round((maxCount / Math.max(1, mistakesList.length)) * 100)}% of mistakes)
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              Recommended Action Plan:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {getRecommendedAction(topReason)}
            </p>
          </div>
        </Card>
      )}

      {/* Repeated Mistake Detection Alert & 3-Step Remediation Plan */}
      {criticalRepeatedTopics.length > 0 && (
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200/70 pb-2.5">
            <div className="flex items-center gap-2 text-rose-900 font-bold">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Repeated Mistake Alert: Core Conceptual Gap Detected</span>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
              {criticalRepeatedTopics.length} Recurring Topic{criticalRepeatedTopics.length > 1 ? 's' : ''}
            </span>
          </div>

          <p className="text-xs text-rose-800 leading-relaxed">
            You have failed multiple questions in <strong>{criticalRepeatedTopics.map(([t]) => t).join(', ')}</strong>. This is not a random calculation slip; it signals that foundational theory needs restructuring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-xs">
              <div className="text-[10px] font-bold uppercase text-rose-500">Step 1: Theory</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Read Formula & Concepts</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Revisit chapter notes and derived relations.</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-xs">
              <div className="text-[10px] font-bold uppercase text-rose-500">Step 2: Foundation</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Solve 5 Basic Questions</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Practice fundamental problems to solidify steps.</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-xs">
              <div className="text-[10px] font-bold uppercase text-rose-500">Step 3: Retention</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Retest in 24 Hours</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Confirm permanent mastery with spaced repetition.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            {criticalRepeatedTopics.map(([topic, data]) => (
              <Button
                key={topic}
                variant="primary"
                size="sm"
                onClick={() => navigate(`/practice?chapter=${encodeURIComponent(data.chapter)}&topic=${encodeURIComponent(topic)}`)}
                className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Fix Concept: {topic} ({data.count} mistakes) →
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSubject === sub
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Mistake Items Grid */}
      {filteredMistakes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-base">No Mistakes Logged!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You currently have no unresolved errors in this section. Great job staying accurate!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => {
            const q = questionService.getQuestionById(m.questionId);
            if (!q) return null;

            return (
              <Card key={m.id} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand">{m.subject}</Badge>
                    <Badge variant="slate">{m.chapter}</Badge>
                    <span className="text-xs text-slate-500 font-medium">{m.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Tag badge with edit action */}
                    <button
                      onClick={() => handleOpenEditTag(m)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200 transition-colors"
                      title="Edit Mistake Reason"
                    >
                      <Tag className="w-3 h-3 text-purple-600" />
                      <span>{m.mistakeReason || 'Calculation Error'}</span>
                      <Edit3 className="w-2.5 h-2.5 text-purple-400 ml-0.5" />
                    </button>

                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      Failed {m.mistakeCount}x
                    </span>
                    {m.resolved && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {q.question}
                </div>

                {/* Optional Note Display */}
                {m.mistakeNote && (
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
                    <span className="font-bold">Student Note:</span> {m.mistakeNote}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">
                    Last Attempted: <strong>{m.lastAttemptedDate}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSolutionQ(q)}
                      className="text-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Solution
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveDoubtQ(q)}
                      className="text-xs text-purple-700 hover:bg-purple-50"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5" /> Ask Doubt
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartRetry(m)}
                      className="text-xs font-bold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry Question
                    </Button>

                    <button
                      onClick={() => handleRemove(m.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors"
                      title="Remove from mistake book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Solution Viewer Modal */}
      <Modal
        isOpen={Boolean(activeSolutionQ)}
        onClose={() => setActiveSolutionQ(null)}
        title="Question Solution"
        footer={<Button onClick={() => setActiveSolutionQ(null)}>Close</Button>}
      >
        {activeSolutionQ && (
          <div className="space-y-4 py-2">
            <div className="text-sm font-bold text-slate-900">{activeSolutionQ.question}</div>
            <div className="space-y-2">
              {activeSolutionQ.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    activeSolutionQ.correctAnswer === i
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>{['A', 'B', 'C', 'D'][i]}. {opt}</span>
                  {activeSolutionQ.correctAnswer === i && <Badge variant="success" size="sm">Correct</Badge>}
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">Explanation:</div>
              <p className="text-slate-600 leading-relaxed">{activeSolutionQ.explanation}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-brand-700">Concept: </span>
                <span className="text-slate-700">{activeSolutionQ.concept}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Interactive Retry Modal (Retry Without Solution) */}
      <Modal
        isOpen={Boolean(retryItem)}
        onClose={() => setRetryItem(null)}
        title="Retry Without Solution (Blind Practice)"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setRetryItem(null)}>
              Cancel
            </Button>
            {!retryChecked ? (
              <Button
                variant="primary"
                onClick={handleCheckRetry}
                disabled={retryAnswer === null}
                className="font-bold"
              >
                Check Answer
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setRetryItem(null)}>
                Done
              </Button>
            )}
          </div>
        }
      >
        {retryItem && (
          <div className="space-y-4 py-2">
            {!retryChecked && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
                <span className="font-bold">Blind Mode Active:</span>
                <span>Hints and answers are hidden to test authentic recall under pressure.</span>
              </div>
            )}

            <div className="text-sm font-bold text-slate-900">{retryItem.question.question}</div>

            <div className="space-y-2.5">
              {retryItem.question.options.map((opt, idx) => {
                const isSelected = retryAnswer === idx;
                const isCorrectOpt = retryItem.question.correctAnswer === idx;

                let style = 'bg-white border-slate-200 text-slate-700';
                if (retryChecked) {
                  if (isCorrectOpt) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  else if (isSelected) style = 'bg-rose-50 border-rose-500 text-rose-950';
                } else if (isSelected) {
                  style = 'bg-brand-50 border-brand-500 text-brand-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={retryChecked}
                    onClick={() => setRetryAnswer(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between ${style}`}
                  >
                    <span>{['A', 'B', 'C', 'D'][idx]}. {opt}</span>
                    {retryChecked && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Attempt Comparison & Improvement Stats */}
            {retryChecked && (
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Attempt Comparison</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-900">
                      <div className="text-[10px] uppercase font-bold text-rose-500">1st Attempt</div>
                      <div className="font-bold mt-0.5">Failed</div>
                      <div className="text-[11px] text-rose-700 mt-0.5">Reason: {retryItem.mistake.mistakeReason || 'Calculation Error'}</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${
                      retryAnswer === retryItem.question.correctAnswer
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-900'
                        : 'bg-amber-50 border-amber-100 text-amber-900'
                    }`}>
                      <div className="text-[10px] uppercase font-bold text-slate-500">2nd Attempt (Retry)</div>
                      <div className="font-bold mt-0.5">
                        {retryAnswer === retryItem.question.correctAnswer ? '✓ Correct Answer!' : '✗ Incorrect'}
                      </div>
                      <div className="text-[11px] mt-0.5">
                        {retryAnswer === retryItem.question.correctAnswer ? 'Marks Recovered: +4' : 'Needs further review'}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    retryAnswer === retryItem.question.correctAnswer
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {retryAnswer === retryItem.question.correctAnswer
                    ? 'Resolved! Marked as mastered and cleared from active mistakes.'
                    : 'Still missed. We recommend asking your mentor or studying the concept.'}
                </div>

                {/* Explanation Box */}
                <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs space-y-1.5">
                  <div className="font-bold text-purple-900">Explanation:</div>
                  <p className="text-slate-700 leading-relaxed">{retryItem.question.explanation}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Mistake Tag Modal */}
      <Modal
        isOpen={Boolean(editingMistake)}
        onClose={() => setEditingMistake(null)}
        title="Edit Mistake Tag & Note"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingMistake(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveTag}>
              Save Tag
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <p className="text-xs text-slate-500">
            Categorize the core reason for failing this question to improve your analytical breakdown.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Failure Reason</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                'Calculation Error',
                'Formula Forgot',
                'Concept Not Clear',
                'Misread Question',
                'Wrong Option Selected',
                'Ran Out of Time',
                'Guess',
                'Careless Mistake',
                'Other'
              ] as MistakeReason[]).map(reason => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setEditReason(reason)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    editReason === reason
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Personal Note / Reflection <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={editNote}
              onChange={e => setEditNote(e.target.value)}
              placeholder="e.g., Substituted density instead of volume in formula..."
              className="w-full h-20 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Universal Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={Boolean(activeDoubtQ)}
        onClose={() => setActiveDoubtQ(null)}
        initialSubject={activeDoubtQ?.subject}
        questionContext={activeDoubtQ}
      />
    </div>
  );
};
