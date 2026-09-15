import React, { useState, useEffect } from 'react';
import { Lightbulb, Calculator, Footprints, BookOpen, CheckCircle2, Sparkles, BrainCircuit } from 'lucide-react';
import { Modal, Button, Badge } from './UIComponents';
import { Question } from '../../types';
import { aiDoubtSolver, ProgressiveHintsData } from '../../services/aiDoubtSolver';

interface ImStuckModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
}

type HelpLevel = 'none' | 'hint' | 'formula' | 'firstStep' | 'concept' | 'solution';

export const ImStuckModal: React.FC<ImStuckModalProps> = ({
  isOpen,
  onClose,
  question
}) => {
  const [activeLevel, setActiveLevel] = useState<HelpLevel>('hint');
  const [aiHints, setAiHints] = useState<ProgressiveHintsData | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && question) {
      let isMounted = true;
      setIsLoadingAi(true);
      aiDoubtSolver.getProgressiveHintsOnline(
        question.question,
        question.subject,
        question.chapter,
        question.explanation
      ).then(data => {
        if (isMounted) {
          setAiHints(data);
          setIsLoadingAi(false);
        }
      }).catch(() => {
        if (isMounted) setIsLoadingAi(false);
      });

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen, question]);

  // Progressive breakdown derivation
  const hintText = aiHints?.hint1 || question.shortcutTip || `Identify the primary physical quantities given in the question and check which equation connects them directly.`;
  const formulaText = aiHints?.hint2 || (question.concept ? `Key Equation: Standard formula for ${question.topic}. Verify boundary values before substituting.` : `Standard governing relation: ${question.chapter} primary equation.`);
  const firstStepText = aiHints?.hint3 || `Step 1: Write down the known values from the problem statement: ${question.question.slice(0, 70)}... Convert all units to standard SI units.`;
  const conceptText = question.concept || (aiHints?.examinerTrap ? `Exam Trap: ${aiHints.examinerTrap}` : `Core Concept: ${question.topic} in ${question.chapter}. Pay close attention to direction vectors and signs.`);
  const solutionText = aiHints?.fullSolution || question.explanation;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="I'm Stuck — Progressive Help Guide"
      maxWidth="max-w-xl"
      footer={
        <div className="flex justify-between items-center w-full">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
            {isLoadingAi ? 'Consulting AI Mentor...' : 'Graduated hints to preserve your problem-solving flow'}
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close & Continue Attempt
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Navigation Tabs for Progressive Help */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveLevel('hint')}
            className={`flex-1 min-w-[90px] py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeLevel === 'hint'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>💡 Hint 1</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('formula')}
            className={`flex-1 min-w-[90px] py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeLevel === 'formula'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-blue-500" />
            <span>🧮 Hint 2</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('firstStep')}
            className={`flex-1 min-w-[90px] py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeLevel === 'firstStep'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Footprints className="w-3.5 h-3.5 text-emerald-500" />
            <span>🎯 Hint 3</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('concept')}
            className={`flex-1 min-w-[90px] py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeLevel === 'concept'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-500" />
            <span>📖 Concept</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('solution')}
            className={`flex-1 min-w-[90px] py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeLevel === 'solution'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Full Solution</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs sm:text-sm text-slate-800 space-y-2">
          {activeLevel === 'hint' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Level 1: Subtle Strategic Clue</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-100 font-medium">
                {hintText}
              </p>
            </div>
          )}

          {activeLevel === 'formula' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-500" />
                <span>Level 2: Governing Concept & Formula</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-100 font-mono">
                {formulaText}
              </p>
            </div>
          )}

          {activeLevel === 'firstStep' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-emerald-500" />
                <span>Level 3: Strategic Approach & Setup</span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-100 font-medium">
                {firstStepText}
              </p>
            </div>
          )}

          {activeLevel === 'concept' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span>Level 4: Core Theory & Examiner Traps</span>
              </div>
              <div className="space-y-2">
                <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-100 font-medium">
                  {conceptText}
                </p>
                {aiHints?.examinerTrap && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <strong>⚠️ Common Examiner Trap:</strong> {aiHints.examinerTrap}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLevel === 'solution' && (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-500" />
                  Level 5: Complete Walkthrough
                </span>
                <Badge variant="brand" size="sm">Answer: Option {['A', 'B', 'C', 'D'][question.correctAnswer]}</Badge>
              </div>
              <div className="text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-purple-100 font-mono whitespace-pre-line text-xs">
                {solutionText}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
