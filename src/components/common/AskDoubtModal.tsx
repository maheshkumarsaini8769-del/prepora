import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  BookmarkPlus, 
  AlertTriangle 
} from 'lucide-react';
import { Modal, Button } from './UIComponents';
import { ecosystemService } from '../../services/ecosystemService';
import { aiDoubtSolver, SolvedDoubtResponse } from '../../services/aiDoubtSolver';
import { SubjectName, Question } from '../../types';
import { useNavigate } from 'react-router-dom';

interface AskDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionContext?: Question | null | {
    id: string;
    question: string;
    chapter?: string;
    topic?: string;
    subject?: SubjectName;
  };
  initialSubject?: SubjectName;
}

export const AskDoubtModal: React.FC<AskDoubtModalProps> = ({
  isOpen,
  onClose,
  questionContext,
  initialSubject
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ai-instant' | 'faculty'>('ai-instant');
  const [doubtText, setDoubtText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isAiSolving, setIsAiSolving] = useState<boolean>(false);
  const [aiSolution, setAiSolution] = useState<SolvedDoubtResponse | null>(null);
  const [savedNotesMsg, setSavedNotesMsg] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAiSolve = async () => {
    const sub: SubjectName = questionContext?.subject || initialSubject || 'Physics';
    const ch = questionContext?.chapter || 'General Academic';
    const qText = doubtText.trim() || questionContext?.question || '';
    if (!qText) return;

    setIsAiSolving(true);
    try {
      const solution = await aiDoubtSolver.solveDoubtOnline(
        qText,
        sub,
        ch,
        { contextSnippet: questionContext?.question }
      );
      setAiSolution(solution);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiSolving(false);
    }
  };

  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    const sub: SubjectName = questionContext?.subject || initialSubject || 'Physics';
    const ch = questionContext?.chapter || 'General Doubt';

    ecosystemService.askDoubt(
      sub,
      ch,
      doubtText,
      questionContext ? {
        id: questionContext.id,
        snippet: questionContext.question,
        topic: questionContext.topic
      } : undefined
    );

    setSubmitted(true);
  };

  const handleSaveToNotes = () => {
    if (!aiSolution) return;
    aiDoubtSolver.saveDoubtToNotes(aiSolution);
    setSavedNotesMsg(true);
    setTimeout(() => setSavedNotesMsg(false), 3000);
  };

  const handleResetAndClose = () => {
    setDoubtText('');
    setSubmitted(false);
    setAiSolution(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Academic Doubt Assistance"
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-[11px] text-slate-400">
            {activeTab === 'ai-instant' ? 'Powered by Google Gemini AI' : 'Faculty Response < 2 hrs'}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetAndClose}>
              Close
            </Button>
            {activeTab === 'ai-instant' && !aiSolution && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAiSolve}
                disabled={isAiSolving || (!doubtText.trim() && !questionContext?.question)}
                className="font-bold flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiSolving ? 'Solving...' : 'Solve with AI'}
              </Button>
            )}
            {activeTab === 'faculty' && !submitted && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleFacultySubmit}
                disabled={!doubtText.trim()}
                className="font-bold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit to Faculty
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Tab switch */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('ai-instant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'ai-instant'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Instant AI Explainer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faculty')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'faculty'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Submit to Faculty Mentors
          </button>
        </div>

        {/* Question Context Preview if any */}
        {questionContext && (
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-purple-900">
              <span>Question #{questionContext.id}</span>
              <span>{questionContext.subject} • {questionContext.chapter}</span>
            </div>
            <p className="text-xs text-slate-700 line-clamp-2 italic font-medium">
              "{questionContext.question}"
            </p>
          </div>
        )}

        {activeTab === 'ai-instant' ? (
          <div className="space-y-3">
            {!aiSolution ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  What specific step, formula, or concept is confusing you?
                </label>
                <textarea
                  value={doubtText}
                  onChange={e => setDoubtText(e.target.value)}
                  placeholder="e.g. Why is work done negative here? Or explain the formula derivation step..."
                  className="w-full h-24 p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none font-medium"
                />
                <Button
                  variant="primary"
                  onClick={handleAiSolve}
                  disabled={isAiSolving || (!doubtText.trim() && !questionContext?.question)}
                  className="w-full bg-purple-600 hover:bg-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 py-2.5"
                >
                  <Sparkles className="w-4 h-4" />
                  {isAiSolving ? 'AI Generating Step-by-Step Derivation...' : 'Get Instant AI Answer'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {/* Solved Header */}
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Academic Derivation
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      onClick={handleSaveToNotes}
                      variant="outline"
                      size="sm"
                      className="text-[11px] font-bold text-purple-700 border-purple-200"
                    >
                      <BookmarkPlus className="w-3 h-3 mr-1" />
                      {savedNotesMsg ? 'Saved!' : 'Save to Notes'}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setAiSolution(null)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
                    >
                      Ask Another
                    </button>
                  </div>
                </div>

                {/* Direct Answer */}
                {aiSolution.answer && (
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-950 font-medium leading-relaxed">
                    <strong className="block text-purple-900 mb-0.5">Core Principle:</strong>
                    {aiSolution.answer}
                  </div>
                )}

                {/* Key Formula */}
                {aiSolution.keyFormula && (
                  <div className="p-2.5 bg-slate-900 text-white rounded-xl font-mono text-xs font-bold text-emerald-300">
                    {aiSolution.keyFormula}
                  </div>
                )}

                {/* Steps */}
                {aiSolution.stepByStepSolution && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Derivation Steps:
                    </span>
                    {aiSolution.stepByStepSolution.map((s, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-800 font-medium">
                        {s}
                      </div>
                    ))}
                  </div>
                )}

                {/* Trap & Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                    <span className="font-bold block text-[10px] uppercase text-amber-800">⚠️ Negative Trap</span>
                    <p className="text-[11px] mt-0.5">{aiSolution.examinerTrap}</p>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                    <span className="font-bold block text-[10px] uppercase text-emerald-800">💡 Exam Tip</span>
                    <p className="text-[11px] mt-0.5">{aiSolution.examTip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : !submitted ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              What part of this question or concept is unclear?
            </label>
            <textarea
              value={doubtText}
              onChange={e => setDoubtText(e.target.value)}
              placeholder="Explain what part is giving you difficulty..."
              className="w-full h-28 p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none font-medium"
            />
            <p className="text-[11px] text-slate-400">
              Your doubt will be submitted to the Prepora Academic Doubt Center with your question context automatically attached.
            </p>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Doubt Submitted to Faculty!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your doubt has been filed. Faculty mentors review and publish detailed clarifications within 2 hours.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
