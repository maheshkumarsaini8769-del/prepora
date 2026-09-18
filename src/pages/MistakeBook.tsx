import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  CheckCircle2,
  Trash2,
  BookOpen,
  ArrowRight,
  Tag,
  Edit3,
  AlertTriangle,
  MessageSquareQuote,
  X
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
  mistakesList.forEach((m) => {
    if (!topicMistakeCounts[m.topic]) {
      topicMistakeCounts[m.topic] = { count: 0, chapter: m.chapter, subject: m.subject };
    }
    topicMistakeCounts[m.topic].count += m.mistakeCount || 1;
  });
  const criticalRepeatedTopics = Object.entries(topicMistakeCounts).filter(([_, data]) => data.count >= 2);

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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Mistake Book</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your incorrect answers, analyze error reasons, and re-attempt until solved.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/practice?fixWeakness=true')}
            className="text-xs font-semibold py-2 px-3.5 bg-slate-900 hover:bg-black text-white flex items-center gap-1.5"
          >
            <span>Fix My Weakness</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Repeated Mistakes & Weak Concepts */}
      {criticalRepeatedTopics.length > 0 && (
        <Card className="p-5 border-rose-200 bg-rose-50/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-900 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Repeated Concept Mistakes ({criticalRepeatedTopics.length} Topics)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            These concepts caused multiple errors across tests. Targeted practice is recommended.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {criticalRepeatedTopics.map(([topic, data]) => (
              <div
                key={topic}
                className="p-3 bg-white rounded-xl border border-rose-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{topic}</div>
                  <div className="text-[11px] text-slate-500">
                    {data.subject} • {data.count} incorrect attempts
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() =>
                    navigate(
                      `/practice?chapter=${encodeURIComponent(data.chapter)}&topic=${encodeURIComponent(topic)}`
                    )
                  }
                  className="text-[11px] font-semibold py-1 px-2.5 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Fix
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 3. Subject Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedSubject === sub
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 4. Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-800 text-sm">No Mistakes in this Subject</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            All questions in this subject are resolved or you have not made any errors yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => {
            const q = questionService.getQuestionById(m.questionId);
            if (!q) return null;

            return (
              <Card key={m.id} className="p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900">{m.subject}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">{m.chapter}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{m.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditTag(m)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md transition-colors"
                      title="Edit Mistake Reason"
                    >
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span>{m.mistakeReason || 'Calculation Error'}</span>
                      <Edit3 className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
                    </button>

                    {m.mistakeCount > 1 && (
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Failed {m.mistakeCount}x
                      </span>
                    )}

                    {m.resolved && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                  {q.question}
                </div>

                {m.mistakeNote && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">Note:</span> {m.mistakeNote}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Last Attempted: {m.lastAttemptedDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSolutionQ(q)}
                      className="text-xs font-medium py-1 px-2.5 text-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-1" /> Solution
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveDoubtQ(q)}
                      className="text-xs font-medium py-1 px-2.5 text-slate-600 hover:text-slate-900"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 mr-1" /> Ask Doubt
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartRetry(m)}
                      className="text-xs font-semibold py-1 px-3 bg-slate-900 hover:bg-black text-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Retry
                    </Button>

                    <button
                      onClick={() => handleRemove(m.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove from mistake book"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
          <div className="space-y-4 py-2 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">{activeSolutionQ.question}</div>
            <div className="space-y-2">
              {activeSolutionQ.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    activeSolutionQ.correctAnswer === i
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>
                    {['A', 'B', 'C', 'D'][i]}. {opt}
                  </span>
                  {activeSolutionQ.correctAnswer === i && <Badge variant="success" size="sm">Correct</Badge>}
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">Explanation:</div>
              <p className="text-slate-600 leading-relaxed">{activeSolutionQ.explanation}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-900">Concept: </span>
                <span className="text-slate-600">{activeSolutionQ.concept}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Blind Retry Modal */}
      <Modal
        isOpen={Boolean(retryItem)}
        onClose={() => setRetryItem(null)}
        title="Retry Question"
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
                className="font-semibold bg-slate-900 hover:bg-black text-white"
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
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {retryItem.mistake.subject} • {retryItem.mistake.chapter}
            </div>

            <div className="text-sm font-semibold text-slate-900">{retryItem.question.question}</div>

            <div className="space-y-2">
              {retryItem.question.options.map((opt, idx) => {
                const isSelected = retryAnswer === idx;
                const isCorrectOpt = retryItem.question.correctAnswer === idx;

                let style = 'bg-white border-slate-200 text-slate-700';
                if (retryChecked) {
                  if (isCorrectOpt) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  else if (isSelected) style = 'bg-rose-50 border-rose-500 text-rose-950';
                } else if (isSelected) {
                  style = 'bg-slate-900 text-white border-slate-900';
                }

                return (
                  <button
                    key={idx}
                    disabled={retryChecked}
                    onClick={() => setRetryAnswer(idx)}
                    className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${style}`}
                  >
                    <span>
                      {['A', 'B', 'C', 'D'][idx]}. {opt}
                    </span>
                    {retryChecked && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {retryChecked && (
              <div className="space-y-3 pt-2">
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    retryAnswer === retryItem.question.correctAnswer
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {retryAnswer === retryItem.question.correctAnswer
                    ? 'Correct! Marked as resolved.'
                    : 'Incorrect. Check the explanation below.'}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-semibold text-slate-900">Explanation:</div>
                  <p className="text-slate-600 leading-relaxed">{retryItem.question.explanation}</p>
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
        title="Edit Error Reason"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingMistake(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveTag} className="bg-slate-900 hover:bg-black text-white">
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Failure Reason</label>
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
              ] as MistakeReason[]).map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setEditReason(reason)}
                  className={`p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                    editReason === reason
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Note <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              placeholder="e.g. Confused sign convention for focal length"
              className="w-full h-20 p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
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
