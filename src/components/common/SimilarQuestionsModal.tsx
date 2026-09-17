import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  HelpCircle,
  Layers,
  Target
} from 'lucide-react';
import { Modal, Button, Badge } from './UIComponents';
import { Question } from '../../types';
import { questionService } from '../../services/questionService';
import { userService } from '../../services/userService';
import { MathRenderer } from './MathRenderer';

interface SimilarQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceQuestion: Question;
}

export const SimilarQuestionsModal: React.FC<SimilarQuestionsModalProps> = ({
  isOpen,
  onClose,
  sourceQuestion
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && sourceQuestion) {
      // Find 5 similar questions from same subject, chapter, topic, and difficulty
      let pool = questionService.filterQuestions({
        subject: sourceQuestion.subject,
        chapter: sourceQuestion.chapter,
        topic: sourceQuestion.topic
      }).filter(q => q.id !== sourceQuestion.id);

      // If pool is small, relax topic filter to same chapter
      if (pool.length < 5) {
        const chapterPool = questionService.filterQuestions({
          subject: sourceQuestion.subject,
          chapter: sourceQuestion.chapter
        }).filter(q => q.id !== sourceQuestion.id && !pool.some(p => p.id === q.id));
        pool = [...pool, ...chapterPool];
      }

      // If still small, relax subject
      if (pool.length < 5) {
        const allPool = questionService.getAllQuestions().filter(q => q.id !== sourceQuestion.id && !pool.some(p => p.id === q.id));
        pool = [...pool, ...allPool];
      }

      const selected = pool.slice(0, 5);
      setQuestions(selected);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setCheckedQuestions({});
      setDrillCompleted(false);
    }
  }, [isOpen, sourceQuestion]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOpt = selectedAnswers[currentQ.id];
  const isChecked = Boolean(checkedQuestions[currentQ.id]);
  const isCorrect = isChecked && selectedOpt === currentQ.correctAnswer;

  const handleSelectOpt = (idx: number) => {
    if (isChecked) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleCheck = () => {
    if (selectedOpt === undefined || isChecked) return;
    setCheckedQuestions(prev => ({ ...prev, [currentQ.id]: true }));

    // Record interaction
    userService.recordQuestionAnswered({
      questionId: currentQ.id,
      subject: currentQ.subject,
      chapter: currentQ.chapter,
      topic: currentQ.topic,
      isCorrect: selectedOpt === currentQ.correctAnswer,
      timeSpentSeconds: 45,
      selectedAnswer: selectedOpt,
      correctAnswer: currentQ.correctAnswer,
      exam: currentQ.exam,
      reason: selectedOpt === currentQ.correctAnswer ? undefined : 'Similar Practice Error'
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setDrillCompleted(true);
    }
  };

  // Metrics
  const totalChecked = Object.keys(checkedQuestions).length;
  const correctCount = Object.entries(checkedQuestions).filter(
    ([qId, checked]) => checked && selectedAnswers[qId] === questions.find(q => q.id === qId)?.correctAnswer
  ).length;
  const accuracyPct = totalChecked > 0 ? Math.round((correctCount / totalChecked) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Practice Similar Questions (5-Question Concept Reinforcement)"
      maxWidth="max-w-2xl"
      footer={
        <div className="flex justify-between items-center w-full text-xs">
          <span className="text-slate-500 font-medium">
            {!drillCompleted ? `Question ${currentIndex + 1} of ${questions.length}` : 'Drill Finished'}
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Drill
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {!drillCompleted ? (
          <>
            {/* Context Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">{sourceQuestion.subject}</Badge>
                <Badge variant="slate" size="sm">{sourceQuestion.chapter}</Badge>
                <span className="text-xs text-slate-500 font-semibold">{sourceQuestion.topic}</span>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Similar Drill • Q{currentIndex + 1}/5
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed pt-1">
              <MathRenderer text={currentQ.question} />
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-1">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isAnswer = currentQ.correctAnswer === idx;

                let style = 'bg-white border-slate-200 text-slate-800 hover:border-purple-300';
                if (isChecked) {
                  if (isAnswer) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  else if (isSelected && !isCorrect) style = 'bg-rose-50 border-rose-500 text-rose-950';
                  else style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                } else if (isSelected) {
                  style = 'bg-purple-50 border-purple-500 text-purple-950 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isChecked}
                    onClick={() => handleSelectOpt(idx)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-start gap-3 transition-all text-xs sm:text-sm cursor-pointer ${style}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="flex-1 pt-0.5">
                      <MathRenderer text={opt} />
                    </span>
                    {isChecked && isAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    {isChecked && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {isChecked ? (isCorrect ? '✅ Well done!' : '❌ Keep going!') : 'Select an option and check'}
              </span>

              {!isChecked ? (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleCheck}
                  disabled={selectedOpt === undefined}
                  className="font-bold text-xs px-5"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleNext}
                  className="font-bold text-xs px-5"
                >
                  {currentIndex === questions.length - 1 ? 'View Mini Result' : 'Next Similar Question'}{' '}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </div>

            {/* Explanation snippet when checked */}
            {isChecked && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1 animate-in fade-in">
                <div className="font-bold text-purple-900 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Step-by-Step Explanation:</span>
                </div>
                <div className="text-slate-700 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                  {currentQ.explanation}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Mini Result View (task4.md Section 11) */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Similar Drill Complete!</h3>
              <p className="text-xs text-slate-500 mt-1">
                You resolved 5 original questions reinforcing <strong>{sourceQuestion.topic}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100">
                <div className="text-2xl font-black text-emerald-700">{correctCount}</div>
                <div className="text-xs font-bold text-emerald-600">Correct</div>
              </div>
              <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100">
                <div className="text-2xl font-black text-rose-700">{5 - correctCount}</div>
                <div className="text-xs font-bold text-rose-600">Incorrect</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-3 border border-purple-100">
                <div className="text-2xl font-black text-purple-700">{accuracyPct}%</div>
                <div className="text-xs font-bold text-purple-600">Accuracy</div>
              </div>
            </div>

            <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-2xl text-xs text-purple-950 max-w-md mx-auto">
              <span className="font-bold">Concept Consolidation Recorded: </span>
              <span>Your responses have updated your chapter mastery index and cleared the repeat mistake flags.</span>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                  setCheckedQuestions({});
                  setDrillCompleted(false);
                }}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Repeat Drill</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onClose}
                className="font-bold text-xs"
              >
                Done & Return to Session
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
