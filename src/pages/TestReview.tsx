import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookOpen,
  Filter,
  Bookmark,
  Award,
  ChevronRight,
  MessageSquareQuote,
  HelpCircle,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { ReportQuestionModal } from '../components/common/ReportQuestionModal';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { Question, MistakeReason, UnattemptedReason } from '../types';

export const TestReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const attemptId = searchParams.get('attemptId');
  const attempts = testService.getAllAttempts();
  const attempt = attemptId
    ? attempts.find(a => a.id === attemptId)
    : attempts.find(a => a.testId === id);

  const [activeFilter, setActiveFilter] = useState<'All' | 'Correct' | 'Wrong' | 'Unattempted' | 'Marked'>('All');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // Mistake Tagging Modal State
  const [showMistakeModal, setShowMistakeModal] = useState<boolean>(false);
  const [tagModalReason, setTagModalReason] = useState<MistakeReason>('Calculation Error');
  const [tagModalNote, setTagModalNote] = useState<string>('');

  // Unattempted Survey Modal State
  const [showUnattemptedModal, setShowUnattemptedModal] = useState<boolean>(false);
  const [selectedUnattemptedReason, setSelectedUnattemptedReason] = useState<UnattemptedReason>("I didn't know the concept");
  const [unattemptedMap, setUnattemptedMap] = useState<Record<string, UnattemptedReason>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_unattempted_reasons') || '[]');
      const map: Record<string, UnattemptedReason> = {};
      stored.forEach((item: any) => { map[item.questionId] = item.reason; });
      return map;
    } catch {
      return {};
    }
  });

  // Ask Doubt Modal State
  const [showDoubtModal, setShowDoubtModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <h2 className="text-xl font-bold text-slate-800">Test Attempt Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">Please take or complete a test first.</p>
        <Button onClick={() => navigate('/tests')}>Go to Tests</Button>
      </div>
    );
  }

  const allQuestions = questionService.getQuestionsByIds(Object.keys(attempt.answers));

  // Filter questions
  const filteredQuestions = allQuestions.filter(q => {
    const ans = attempt.answers[q.id];
    if (activeFilter === 'Correct') {
      return ans && ans.selectedAnswer === q.correctAnswer;
    }
    if (activeFilter === 'Wrong') {
      return ans && ans.selectedAnswer !== null && ans.selectedAnswer !== q.correctAnswer;
    }
    if (activeFilter === 'Unattempted') {
      return !ans || ans.selectedAnswer === null;
    }
    if (activeFilter === 'Marked') {
      return ans && ans.isMarkedForReview;
    }
    return true;
  });

  const activeQ = selectedQuestionId
    ? allQuestions.find(q => q.id === selectedQuestionId) || allQuestions[0]
    : filteredQuestions[0] || allQuestions[0];

  const activeAns = activeQ ? attempt.answers[activeQ.id] : null;
  const isCorrect = activeAns && activeAns.selectedAnswer === activeQ?.correctAnswer;
  const isWrong = activeAns && activeAns.selectedAnswer !== null && activeAns.selectedAnswer !== activeQ?.correctAnswer;
  const isUnattempted = !activeAns || activeAns.selectedAnswer === null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/tests/${attempt.testId}/result?attemptId=${attempt.id}`)}>
            <ArrowLeft className="w-4 h-4" /> Back to Result Summary
          </Button>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Review: {attempt.testTitle}</h1>
          <p className="text-xs text-slate-500">
            Score: {attempt.totalScore} / {attempt.maxScore} • Accuracy: {attempt.accuracyPercentage}%
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'Correct', 'Wrong', 'Unattempted', 'Marked'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveFilter(tab);
                const first = allQuestions.find(q => {
                  const ans = attempt.answers[q.id];
                  if (tab === 'Correct') return ans && ans.selectedAnswer === q.correctAnswer;
                  if (tab === 'Wrong') return ans && ans.selectedAnswer !== null && ans.selectedAnswer !== q.correctAnswer;
                  if (tab === 'Unattempted') return !ans || ans.selectedAnswer === null;
                  if (tab === 'Marked') return ans && ans.isMarkedForReview;
                  return true;
                });
                if (first) setSelectedQuestionId(first.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Review Section: Left Question Detail + Right Navigation List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detailed Question & Solution View */}
        <div className="lg:col-span-2 space-y-6">
          {activeQ ? (
            <Card className="space-y-6">
              {/* Question Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="brand">{activeQ.subject}</Badge>
                  <Badge variant="slate">{activeQ.chapter}</Badge>
                  <Badge variant={activeQ.difficulty === 'Easy' ? 'success' : activeQ.difficulty === 'Medium' ? 'warning' : 'danger'}>
                    {activeQ.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  {/* Time Tag Badges */}
                  {activeAns?.timeTag === 'Speed Master' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      ⚡ Speed Master
                    </span>
                  )}
                  {activeAns?.timeTag === 'Time Drainer' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      ⏳ Time Drainer
                    </span>
                  )}
                  {activeAns?.timeTag === 'Negative Trap' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300 animate-pulse">
                      🪤 Negative Trap
                    </span>
                  )}

                  {isCorrect && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct (+4)
                    </span>
                  )}
                  {isWrong && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      <XCircle className="w-4 h-4 text-rose-600" /> Incorrect (-1)
                    </span>
                  )}
                  {isUnattempted && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      <AlertCircle className="w-4 h-4 text-slate-400" /> Unattempted (0)
                    </span>
                  )}
                </div>
              </div>

              {/* Time Analytics Bar for this Question */}
              {activeAns && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Time Spent:</span>
                    <strong className="font-mono text-slate-900">{activeAns.timeSpentSeconds || 0}s</strong>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">Target:</span>
                    <span className="font-mono text-slate-700">{activeAns.recommendedTimeSeconds || activeQ.recommendedTimeSeconds || 90}s</span>
                    {((activeAns.timeSpentSeconds || 0) > (activeAns.recommendedTimeSeconds || activeQ.recommendedTimeSeconds || 90)) ? (
                      <span className="text-rose-600 font-bold">
                        (+{(activeAns.timeSpentSeconds || 0) - (activeAns.recommendedTimeSeconds || activeQ.recommendedTimeSeconds || 90)}s over)
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">
                        ({(activeAns.recommendedTimeSeconds || activeQ.recommendedTimeSeconds || 90) - (activeAns.timeSpentSeconds || 0)}s saved)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Ask Doubt Button */}
                    <button
                      onClick={() => setShowDoubtModal(true)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs transition-colors shadow-xs"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600" />
                      <span>Ask Doubt</span>
                    </button>

                    {/* Report Question Button */}
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-700 font-bold text-xs transition-colors shadow-xs"
                      title="Report discrepancy with this question"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Report</span>
                    </button>

                    {/* Unattempted Reason Survey Button */}
                    {isUnattempted && (
                      <button
                        onClick={() => {
                          if (unattemptedMap[activeQ.id]) {
                            setSelectedUnattemptedReason(unattemptedMap[activeQ.id]);
                          }
                          setShowUnattemptedModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>{unattemptedMap[activeQ.id] ? `Skip Reason: ${unattemptedMap[activeQ.id]}` : 'Why did you skip?'}</span>
                      </button>
                    )}

                    {/* Mistake Tag Button */}
                    {isWrong && (
                      <button
                        onClick={() => {
                          setTagModalReason(activeAns?.mistakeReason || 'Calculation Error');
                          setTagModalNote(activeAns?.mistakeNote || '');
                          setShowMistakeModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs transition-colors"
                      >
                        🏷️ {activeAns?.mistakeReason ? `Reason: ${activeAns.mistakeReason}` : 'Tag Mistake Reason'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Saved Mistake Note Display */}
              {activeAns?.mistakeNote && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
                  <strong>Your Mistake Note:</strong> {activeAns.mistakeNote}
                </div>
              )}

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {activeQ.question}
              </div>

              {/* Options Breakdown */}
              <div className="space-y-2.5">
                {activeQ.options.map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isUserSelection = activeAns?.selectedAnswer === idx;
                  const isCorrectAnswer = activeQ.correctAnswer === idx;

                  let style = 'border-slate-200 bg-white text-slate-700';
                  if (isCorrectAnswer) {
                    style = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                  } else if (isUserSelection && !isCorrectAnswer) {
                    style = 'border-rose-500 bg-rose-50/80 text-rose-950 ring-1 ring-rose-500';
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border text-sm flex items-start gap-3 ${style}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                          isCorrectAnswer
                            ? 'bg-emerald-600 text-white'
                            : isUserSelection
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5">{opt}</span>

                      {isCorrectAnswer && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md self-center">
                          Correct Answer
                        </span>
                      )}
                      {isUserSelection && !isCorrectAnswer && (
                        <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md self-center">
                          Your Choice
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Solution & Concept Box */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-600" /> Detailed Solution
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {activeQ.explanation}
                </p>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-brand-700">Underlying Concept: </span>
                  <span className="text-xs text-slate-600">{activeQ.concept}</span>
                </div>

                {activeQ.shortcutTip && (
                  <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200/60 font-medium">
                    ⚡ <strong>Exam Tip:</strong> {activeQ.shortcutTip}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <p className="text-sm text-slate-500">No questions match the current filter.</p>
            </Card>
          )}
        </div>

        {/* Right: Question Palette & List */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-sm text-slate-900 mb-3">All Questions ({filteredQuestions.length})</h3>

            <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const ans = attempt.answers[q.id];
                const isSelected = activeQ?.id === q.id;
                const correct = ans && ans.selectedAnswer === q.correctAnswer;
                const wrong = ans && ans.selectedAnswer !== null && ans.selectedAnswer !== q.correctAnswer;

                let bg = 'bg-slate-100 text-slate-700';
                if (correct) bg = 'bg-emerald-600 text-white';
                else if (wrong) bg = 'bg-rose-600 text-white';

                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all ${bg} ${
                      isSelected ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 shadow-sm' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 bg-brand-50/50 border-brand-100 text-xs text-brand-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" /> Retention Tip
            </div>
            <p className="text-slate-600 leading-relaxed">
              Reviewing wrong answers within 24 hours of completing an exam increases long-term concept recall by up to 60%.
            </p>
          </Card>
        </div>
      </div>

      {/* Mistake Tagging Modal */}
      <Modal
        isOpen={showMistakeModal}
        onClose={() => setShowMistakeModal(false)}
        title="Tag Mistake Reason"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowMistakeModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (activeQ) {
                  testService.updateMistakeTag(activeQ.id, tagModalReason, tagModalNote);
                  if (activeAns) {
                    activeAns.mistakeReason = tagModalReason;
                    activeAns.mistakeNote = tagModalNote;
                  }
                }
                setShowMistakeModal(false);
              }}
            >
              Save Tag
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <p className="text-xs text-slate-500">
            Categorizing your mistake helps Prepora analyze whether errors stem from conceptual gaps, formula memory, or calculation speed.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Primary Reason</label>
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
                  onClick={() => setTagModalReason(reason)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    tagModalReason === reason
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
              Personal Note / What happened? <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={tagModalNote}
              onChange={e => setTagModalNote(e.target.value)}
              placeholder="e.g., Used 9.8 instead of 10, or forgot the factor of 1/2 in kinetic energy..."
              className="w-full h-20 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Unattempted Reason Survey Modal */}
      <Modal
        isOpen={showUnattemptedModal}
        onClose={() => setShowUnattemptedModal(false)}
        title="Why did you skip this question?"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowUnattemptedModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (activeQ) {
                  ecosystemService.recordUnattemptedReason(
                    activeQ.id,
                    selectedUnattemptedReason
                  );
                  setUnattemptedMap(prev => ({ ...prev, [activeQ.id]: selectedUnattemptedReason }));
                }
                setShowUnattemptedModal(false);
              }}
            >
              Save Reason
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <p className="text-xs text-slate-500">
            Tell us why you decided to skip this question. This helps Prepora diagnose whether your skips were strategic time savers or due to conceptual gaps.
          </p>

          <div className="space-y-2">
            {([
              "I didn't know the concept",
              "I forgot the formula",
              "I didn't have time",
              "I thought it was too long/difficult",
              "I wasn't sure, didn't want negative marking",
              "I misread the question"
            ] as UnattemptedReason[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedUnattemptedReason(r)}
                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                  selectedUnattemptedReason === r
                    ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{r}</span>
                {selectedUnattemptedReason === r && (
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Universal Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={showDoubtModal}
        onClose={() => setShowDoubtModal(false)}
        initialSubject={activeQ?.subject}
        questionContext={activeQ}
      />

      {/* Report Question Modal */}
      <ReportQuestionModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        questionId={activeQ?.id || ''}
        questionSnippet={activeQ?.question || ''}
      />
    </div>
  );
};
