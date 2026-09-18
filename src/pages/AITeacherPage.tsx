import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
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
  | 'Solution';

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
      text: `Hello ${user.name ? user.name.split(' ')[0] : 'there'}! I am your AI Teacher for **${selectedSubject} — ${selectedChapter}**.\n\nAsk me any concept doubt, request a step-by-step example, or practice a question below.`,
      groundedInPrepora: true,
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubjectChange = (subj: SubjectName) => {
    setSelectedSubject(subj);
    const chs = questionService.getChapters(subj, user.classLevel as any);
    setSelectedChapter(chs[0] || 'General');
    setMismatchWarning(null);
  };

  const detectSubjectMismatch = (query: string, currentSubj: SubjectName) => {
    const qLower = query.toLowerCase();
    const physicsTerms = ['velocity', 'acceleration', 'projectile', 'gravity', 'momentum', 'kinematics', 'optics', 'newton', 'torque', 'friction'];
    const chemistryTerms = ['mole', 'reaction', 'orbital', 'thermodynamics', 'equilibrium', 'benzene', 'acid', 'base', 'periodic', 'bonding'];
    const mathTerms = ['derivative', 'integral', 'matrix', 'determinant', 'calculus', 'probability', 'trigonometry', 'parabola', 'ellipse'];
    const biologyTerms = ['cell', 'mitochondria', 'dna', 'genetics', 'photosynthesis', 'respiration', 'taxonomy', 'enzyme'];

    if (currentSubj !== 'Physics' && physicsTerms.some((t) => qLower.includes(t))) {
      return { detected: 'Physics' as SubjectName, term: physicsTerms.find((t) => qLower.includes(t)) };
    }
    if (currentSubj !== 'Chemistry' && chemistryTerms.some((t) => qLower.includes(t))) {
      return { detected: 'Chemistry' as SubjectName, term: chemistryTerms.find((t) => qLower.includes(t)) };
    }
    if (currentSubj !== 'Mathematics' && mathTerms.some((t) => qLower.includes(t))) {
      return { detected: 'Mathematics' as SubjectName, term: mathTerms.find((t) => qLower.includes(t)) };
    }
    if (currentSubj !== 'Biology' && biologyTerms.some((t) => qLower.includes(t))) {
      return { detected: 'Biology' as SubjectName, term: biologyTerms.find((t) => qLower.includes(t)) };
    }
    return null;
  };

  const handleSendMessage = async (customPrompt?: string, modeOverride?: TutorMode) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() && !modeOverride) return;

    const currentMode = modeOverride || activeMode;

    const mismatch = detectSubjectMismatch(textToSend, selectedSubject);
    if (mismatch) {
      setMismatchWarning(`Your question mentions "${mismatch.term}", which typically belongs to ${mismatch.detected}. Current subject is ${selectedSubject}.`);
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

    setMessages((prev) => [...prev, studentMsg]);
    setInputText('');
    setIsLoading(true);

    if (currentMode === 'Practice') {
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
            text: `Here is a practice question from **${q.chapter} — ${q.topic}**:`,
            mode: currentMode,
            question: q,
            options: q.options,
            correctOption: q.correctAnswer,
            explanation: q.explanation,
            groundedInPrepora: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, tutorMsg]);
        }
      }, 600);
      return;
    }

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
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `In **${selectedChapter}**, remember to check SI units and sign conventions carefully. Let's break this down into first principles.`,
        mode: currentMode,
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (msgId: string, optIdx: number, correctIdx: number) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          return { ...m, selectedOption: optIdx };
        }
        return m;
      })
    );

    const isCorrect = optIdx === correctIdx;
    setTimeout(() => {
      const feedbackMsg: ChatMessage = {
        id: `feedback-${Date.now()}`,
        sender: 'tutor',
        text: isCorrect
          ? `✓ **Correct!** Excellent reasoning. You applied the principles accurately.`
          : `✗ **Incorrect.** The correct answer is Option ${['A', 'B', 'C', 'D'][correctIdx]}.\n\nWould you like a step-by-step breakdown?`,
        mode: 'Explain',
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((p) => [...p, feedbackMsg]);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200 pb-16">
      {/* 1. Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">AI Teacher</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Interactive tutor for concept explanation, worked examples, and instant practice.
          </p>
        </div>

        {/* Compact Subject & Chapter Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value as SubjectName)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as SubjectName[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 max-w-[180px] truncate focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {chapters.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mismatch Notification */}
      {mismatchWarning && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{mismatchWarning}</span>
          </div>
          {suggestedSubject && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleSubjectChange(suggestedSubject);
                setMismatchWarning(null);
              }}
              className="text-[11px] py-0.5 px-2 font-semibold"
            >
              Switch to {suggestedSubject}
            </Button>
          )}
        </div>
      )}

      {/* 2. Main Conversation Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 min-h-[460px] max-h-[640px] overflow-y-auto">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-2 text-xs sm:text-sm ${
                  isTutor
                    ? 'bg-slate-50 border border-slate-200 text-slate-800'
                    : 'bg-slate-900 text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-70">
                  <span className="font-semibold">{isTutor ? 'AI Teacher' : 'You'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="leading-relaxed whitespace-pre-line">
                  <MathRenderer text={msg.text} />
                </div>

                {/* Inline Practice Question Block */}
                {msg.question && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5 text-xs text-slate-900">
                    <div className="font-semibold">
                      <MathRenderer text={msg.question.question} />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {msg.options?.map((opt, oIdx) => {
                        const isChosen = msg.selectedOption === oIdx;
                        const isAnswer = msg.correctOption === oIdx;
                        const hasSelected = msg.selectedOption !== undefined;

                        let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
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
                            className={`w-full p-2.5 rounded-lg border text-left flex items-start gap-2 transition-colors text-xs ${style}`}
                          >
                            <span className="font-semibold uppercase text-slate-500">
                              {['A', 'B', 'C', 'D'][oIdx]}.
                            </span>
                            <span className="flex-1">
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
          <div className="flex gap-2 items-center text-xs text-slate-500 p-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping" />
            <span>AI Teacher is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Secondary Actions & Starters Bar */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-medium mr-1 text-[11px]">Actions:</span>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a hint for ${selectedChapter}`, 'Hint')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
        >
          Hint
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a step-by-step example in ${selectedChapter}`, 'Example')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
        >
          Example
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a practice problem in ${selectedChapter}`, 'Practice')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
        >
          Practice
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Explain the core formulas and solution method for ${selectedChapter}`, 'Solution')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
        >
          Solution
        </button>
      </div>

      {/* 4. Bottom Input Bar */}
      <div className="bg-white rounded-xl p-2 border border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={`Ask about ${selectedSubject} — ${selectedChapter}...`}
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-semibold text-xs rounded-lg"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
};
