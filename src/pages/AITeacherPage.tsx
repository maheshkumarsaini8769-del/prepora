import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  Send,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  Award,
  Layers,
  HelpCircle,
  Target
} from 'lucide-react';
import { Badge, Button, Card } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { questionService } from '../services/questionService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { aiDoubtSolver } from '../services/aiDoubtSolver';
import { SubjectName, Question } from '../types';

export type TutorMode = 
  | 'Learn' 
  | 'Explain' 
  | 'Example' 
  | 'Practice' 
  | 'Hint' 
  | 'Check Answer' 
  | 'Correct Mistake' 
  | 'Retest';

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  mode?: TutorMode;
  question?: Question;
  groundedInPrepora?: boolean;
  options?: string[];
  correctOption?: number;
  selectedOption?: number;
  explanation?: string;
  timestamp: string;
}

export const AITeacherPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();

  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(
    (searchParams.get('subject') as SubjectName) || 'Physics'
  );
  const chapters = questionService.getChapters(selectedSubject, user.classLevel as any);
  const [selectedChapter, setSelectedChapter] = useState<string>(
    searchParams.get('chapter') || chapters[0] || 'Kinematics'
  );

  const [activeMode, setActiveMode] = useState<TutorMode>('Learn');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mismatchWarning, setMismatchWarning] = useState<string | null>(null);
  const [suggestedSubject, setSuggestedSubject] = useState<SubjectName | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const masteryData = ecosystemService.getChapterMastery(selectedChapter);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `Hello ${user.name ? user.name.split(' ')[0] : 'there'}! I am your **PREPORA Interactive Tutor** for **${selectedSubject} — ${selectedChapter}**.\n\nI adapt to your current mastery (${masteryData.overallMastery}%). Choose a mode above (like **Learn**, **Example**, or **Practice**), or ask me any question!`,
      groundedInPrepora: true,
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle subject change
  const handleSubjectChange = (subj: SubjectName) => {
    setSelectedSubject(subj);
    const chs = questionService.getChapters(subj, user.classLevel as any);
    setSelectedChapter(chs[0] || 'General');
    setMismatchWarning(null);
  };

  // Mismatch detection logic (Section 5 of task4.md)
  const detectSubjectMismatch = (query: string, currentSubj: SubjectName) => {
    const qLower = query.toLowerCase();
    const physicsTerms = ['velocity', 'acceleration', 'projectile', 'gravity', 'momentum', 'kinematics', 'optics', 'newton', 'torque', 'friction'];
    const chemistryTerms = ['mole', 'reaction', 'orbital', 'thermodynamics', 'equilibrium', 'benzene', 'acid', 'base', 'periodic', 'bonding'];
    const mathTerms = ['derivative', 'integral', 'matrix', 'determinant', 'calculus', 'probability', 'trigonometry', 'parabola', 'ellipse'];
    const biologyTerms = ['cell', 'mitochondria', 'dna', 'genetics', 'photosynthesis', 'respiration', 'taxonomy', 'enzyme'];

    if (currentSubj !== 'Physics' && physicsTerms.some(t => qLower.includes(t))) {
      return { detected: 'Physics' as SubjectName, term: physicsTerms.find(t => qLower.includes(t)) };
    }
    if (currentSubj !== 'Chemistry' && chemistryTerms.some(t => qLower.includes(t))) {
      return { detected: 'Chemistry' as SubjectName, term: chemistryTerms.find(t => qLower.includes(t)) };
    }
    if (currentSubj !== 'Mathematics' && mathTerms.some(t => qLower.includes(t))) {
      return { detected: 'Mathematics' as SubjectName, term: mathTerms.find(t => qLower.includes(t)) };
    }
    if (currentSubj !== 'Biology' && biologyTerms.some(t => qLower.includes(t))) {
      return { detected: 'Biology' as SubjectName, term: biologyTerms.find(t => qLower.includes(t)) };
    }
    return null;
  };

  // Submit student message
  const handleSendMessage = async (customPrompt?: string, modeOverride?: TutorMode) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() && !modeOverride) return;

    const currentMode = modeOverride || activeMode;

    // Check mismatch
    const mismatch = detectSubjectMismatch(textToSend, selectedSubject);
    if (mismatch) {
      setMismatchWarning(`Your question mentions "${mismatch.term}", which typically belongs to ${mismatch.detected}, but your current selected subject is ${selectedSubject}.`);
      setSuggestedSubject(mismatch.detected);
    } else {
      setMismatchWarning(null);
    }

    const studentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: textToSend,
      mode: currentMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, studentMsg]);
    setInputText('');
    setIsLoading(true);

    // If Practice or Retest mode is requested, select real questions from the bank
    if (currentMode === 'Practice' || currentMode === 'Retest') {
      const bankQs = questionService.filterQuestions({
        subject: selectedSubject,
        chapter: selectedChapter
      });
      const q = bankQs[Math.floor(Math.random() * bankQs.length)] || bankQs[0];

      setTimeout(() => {
        setIsLoading(false);
        if (q) {
          const tutorMsg: ChatMessage = {
            id: `tutor-${Date.now()}`,
            sender: 'tutor',
            text: `Here is a **${q.difficulty}** level question from **${q.chapter} — ${q.topic}** to test your application:`,
            mode: currentMode,
            question: q,
            options: q.options,
            correctOption: q.correctAnswer,
            explanation: q.explanation,
            groundedInPrepora: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, tutorMsg]);
        }
      }, 700);
      return;
    }

    // Otherwise call tutor explanation / doubt solver
    try {
      const response = await aiDoubtSolver.solveDoubtOnline(
        textToSend,
        selectedSubject,
        selectedChapter,
        {
          followUpMode: currentMode.toLowerCase()
        }
      );

      let replyText = response.coreConcept;
      if (response.stepByStepSolution && response.stepByStepSolution.length > 0) {
        replyText += `\n\n**Step-by-Step Breakdown:**\n` + response.stepByStepSolution.map((s, i) => `${i + 1}. ${s}`).join('\n');
      }
      if (response.keyFormula) {
        replyText += `\n\n**Key Formula:**\n$${response.keyFormula}$`;
      }
      if (response.examTip) {
        replyText += `\n\n💡 **Exam Tip:** ${response.examTip}`;
      }

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        mode: currentMode,
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, tutorMsg]);
    } catch {
      // Fallback
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `In **${selectedChapter}**, remember that consistency in standard SI units and coordinate sign conventions is crucial. Let's break this down into primary equations first.`,
        mode: currentMode,
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, tutorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (msgId: string, optIdx: number, correctIdx: number) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return { ...m, selectedOption: optIdx };
      }
      return m;
    }));

    const isCorrect = optIdx === correctIdx;
    setTimeout(() => {
      const feedbackMsg: ChatMessage = {
        id: `feedback-${Date.now()}`,
        sender: 'tutor',
        text: isCorrect
          ? `🎉 **Correct! Excellent work.** You applied the principles accurately. Ready for another challenge or shall we dive into a harder question?`
          : `❌ **Not quite.** Option ${['A', 'B', 'C', 'D'][optIdx]} is incorrect. The correct answer is Option ${['A', 'B', 'C', 'D'][correctIdx]}.\n\n*Review the derivation:* Notice the boundary conditions. Would you like a step-by-step walk-through?`,
        mode: 'Check Answer',
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(p => [...p, feedbackMsg]);
    }, 400);
  };

  const tutorModes: { id: TutorMode; icon: string; label: string; desc: string }[] = [
    { id: 'Learn', icon: '📖', label: 'Learn', desc: 'Core concept principles' },
    { id: 'Explain', icon: '💡', label: 'Explain', desc: 'Intuitive breakdown' },
    { id: 'Example', icon: '🌟', label: 'Example', desc: 'Worked derivation' },
    { id: 'Practice', icon: '✍️', label: 'Practice', desc: 'Solve verified question' },
    { id: 'Hint', icon: '🔍', label: 'Hint', desc: 'Progressive clues' },
    { id: 'Check Answer', icon: '✅', label: 'Check Answer', desc: 'Evaluate solution' },
    { id: 'Correct Mistake', icon: '❌', label: 'Correct Mistake', desc: 'Diagnose past errors' },
    { id: 'Retest', icon: '🧪', label: 'Retest', desc: 'Diagnostic retest' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Pedagogical Mentor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AI Teacher & Problem Solver
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Step-by-step concept tutoring, worked examples, adaptive questions, and error diagnostics calibrated to your real test telemetry.
          </p>
        </div>

        {/* Grounding & Mastery Badge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[190px] shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider block">
            Chapter Mastery
          </span>
          <div className="text-3xl font-black text-white">{masteryData.overallMastery}%</div>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Grounded in PREPORA
          </span>
        </div>
      </div>

      {/* Subject & Chapter Context Ribbon */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as SubjectName[]).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => handleSubjectChange(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === s
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Chapter:</span>
          <select
            value={selectedChapter}
            onChange={e => setSelectedChapter(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
          >
            {chapters.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject Mismatch Warning (task4.md Section 5) */}
      {mismatchWarning && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-bold text-amber-950 block">Subject Context Inconsistency Detected:</strong>
              <p className="text-amber-800 mt-0.5">{mismatchWarning}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {suggestedSubject && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  handleSubjectChange(suggestedSubject);
                  setMismatchWarning(null);
                }}
                className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
              >
                Switch to {suggestedSubject}
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMismatchWarning(null)}
              className="text-xs font-bold bg-white text-amber-900 border-amber-300"
            >
              Continue Anyway
            </Button>
          </div>
        </div>
      )}

      {/* 8 Pedagogical Modes Bar */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
          Select Tutor Mode
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {tutorModes.map(m => {
            const isSelected = activeMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActiveMode(m.id);
                  if (m.id === 'Practice' || m.id === 'Retest') {
                    handleSendMessage(m.id === 'Practice' ? `Give me a practice question in ${selectedChapter}` : `Start a mini retest in ${selectedChapter}`, m.id);
                  }
                }}
                className={`p-2 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/70 text-slate-700 hover:bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{m.icon}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                </div>
                <div className="mt-1">
                  <div className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {m.label}
                  </div>
                  <div className={`text-[9px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 min-h-[420px] max-h-[600px] overflow-y-auto">
        {messages.map(msg => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
            >
              {isTutor && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs font-black text-xs">
                  AI
                </div>
              )}

              <div
                className={`max-w-2xl rounded-3xl p-4 sm:p-5 space-y-3 ${
                  isTutor
                    ? 'bg-slate-50 border border-slate-200/80 text-slate-900'
                    : 'bg-purple-600 text-white shadow-sm'
                }`}
              >
                {/* Meta header */}
                <div className="flex items-center justify-between text-[11px] opacity-75">
                  <span className="font-bold">
                    {isTutor ? 'PREPORA Tutor' : user.name || 'You'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.groundedInPrepora && (
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                        Verified Prepora Content
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Message Text with Math */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                  <MathRenderer text={msg.text} />
                </div>

                {/* Question Block if Mode was Practice */}
                {msg.question && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <Badge variant="brand" size="sm">{msg.question.subject}</Badge>
                      <Badge variant="warning" size="sm">{msg.question.difficulty}</Badge>
                    </div>

                    <div className="font-bold text-slate-900 text-sm">
                      <MathRenderer text={msg.question.question} />
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {msg.options?.map((opt, oIdx) => {
                        const isChosen = msg.selectedOption === oIdx;
                        const isAnswer = msg.correctOption === oIdx;
                        const hasSelected = msg.selectedOption !== undefined;

                        let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-purple-400';
                        if (hasSelected) {
                          if (isAnswer) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          else if (isChosen && !isAnswer) style = 'bg-rose-50 border-rose-500 text-rose-950';
                          else style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={hasSelected}
                            onClick={() => handleOptionSelect(msg.id, oIdx, msg.correctOption ?? 0)}
                            className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all text-xs cursor-pointer ${style}`}
                          >
                            <span className="w-5 h-5 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {['A', 'B', 'C', 'D'][oIdx]}
                            </span>
                            <span className="flex-1 pt-0.5">
                              <MathRenderer text={opt} />
                            </span>
                            {hasSelected && isAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {hasSelected && isChosen && !isAnswer && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center text-xs text-slate-500 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
              AI
            </div>
            <div className="bg-slate-100 px-4 py-3 rounded-2xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <span>Analyzing curriculum & formulating step-by-step explanation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Starters */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="text-[11px] font-bold text-slate-400">Quick Starters:</span>
        <button
          type="button"
          onClick={() => handleSendMessage(`Explain ${selectedChapter} core concepts simply`, 'Learn')}
          className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 px-3 py-1 rounded-xl transition-all font-medium cursor-pointer"
        >
          📖 Explain concepts simply
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a solved example in ${selectedChapter}`, 'Example')}
          className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 px-3 py-1 rounded-xl transition-all font-medium cursor-pointer"
        >
          🌟 Step-by-step example
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a medium practice question in ${selectedChapter}`, 'Practice')}
          className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 px-3 py-1 rounded-xl transition-all font-medium cursor-pointer"
        >
          ✍️ Practice question
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`What common mistakes do students make in ${selectedChapter}?`, 'Correct Mistake')}
          className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 px-3 py-1 rounded-xl transition-all font-medium cursor-pointer"
        >
          ❌ Common student mistakes
        </button>
      </div>

      {/* Chat Input Bar */}
      <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={`Ask AI Teacher anything about ${selectedSubject} — ${selectedChapter}...`}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        />
        <Button
          variant="primary"
          size="md"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="px-5 font-bold text-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
