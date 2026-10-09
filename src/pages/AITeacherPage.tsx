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
  RotateCcw,
  GraduationCap,
  Calculator,
  Compass,
  FileQuestion,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { questionService } from '../services/questionService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { aiDoubtSolver } from '../services/aiDoubtSolver';
import { SubjectName, Question } from '../types';
import { getAllowedSubjectsForExam, sanitizeSubjectForExam } from '../utils/examUtils';
import { classifyAcademicQuery } from '../utils/aiAcademicClassifier';
import { searchFormulaKnowledge } from '../utils/formulaKnowledgeBase';

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
  provider?: string;
  providerError?: string;
  isFallback?: boolean;
  timestamp: string;
}

/**
 * Beautiful, structured academic renderer for AI Teacher responses.
 * Parses headers like "### 📚 Concept", "### 💡 Easy Explanation", "### 🧮 Formula",
 * "### Given", "### Find", "### ✅ Final Answer", "### 🔥 Important Points", etc.
 * and renders them in sleek thematic educational cards with crisp math.
 */
const AcademicMessageRenderer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  if (!text.includes('### ')) {
    return (
      <div className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">
        <MathRenderer content={text} />
      </div>
    );
  }

  const rawSections = text.split(/(?=### )/g);

  return (
    <div className="space-y-3 text-xs sm:text-sm">
      {rawSections.map((sec, idx) => {
        const clean = sec.trim();
        if (!clean) return null;

        if (clean.startsWith('### ')) {
          const firstLineBreak = clean.indexOf('\n');
          let title = '';
          let body = '';
          if (firstLineBreak !== -1) {
            title = clean.slice(4, firstLineBreak).trim();
            body = clean.slice(firstLineBreak + 1).trim();
          } else {
            const colonIdx = clean.indexOf(':');
            if (colonIdx !== -1 && colonIdx < 40) {
              title = clean.slice(4, colonIdx).trim();
              body = clean.slice(colonIdx + 1).trim();
            } else {
              title = clean.slice(4).trim();
            }
          }

          const tLower = title.toLowerCase();
          let borderStyle = 'border-l-4 border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200';
          let titleColor = 'text-slate-900 dark:text-slate-100';

          if (tLower.includes('concept')) {
            borderStyle = 'border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/25 text-indigo-950 dark:text-indigo-200';
            titleColor = 'text-indigo-700 dark:text-indigo-300';
          } else if (tLower.includes('explanation')) {
            borderStyle = 'border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/25 text-emerald-950 dark:text-emerald-200';
            titleColor = 'text-emerald-700 dark:text-emerald-300';
          } else if (tLower.includes('formula')) {
            borderStyle = 'border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/25 text-cyan-950 dark:text-cyan-200';
            titleColor = 'text-cyan-700 dark:text-cyan-300 font-mono';
          } else if (tLower.includes('variable')) {
            borderStyle = 'border-l-4 border-sky-400 bg-sky-50/50 dark:bg-sky-950/25 text-sky-950 dark:text-sky-200';
            titleColor = 'text-sky-700 dark:text-sky-300';
          } else if (tLower.includes('final answer') || tLower.includes('correct answer')) {
            borderStyle = 'border-l-4 border-emerald-600 bg-emerald-100/70 dark:bg-emerald-950/50 font-semibold text-emerald-950 dark:text-emerald-200';
            titleColor = 'text-emerald-800 dark:text-emerald-300';
          } else if (tLower.includes('important') || tLower.includes('neet') || tLower.includes('jee')) {
            borderStyle = 'border-l-4 border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200';
            titleColor = 'text-amber-700 dark:text-amber-300';
          } else if (tLower.includes('mistake') || tLower.includes('trap') || tLower.includes('wrong')) {
            borderStyle = 'border-l-4 border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200';
            titleColor = 'text-rose-700 dark:text-rose-300';
          } else if (tLower.includes('trick') || tLower.includes('hack') || tLower.includes('shortcut')) {
            borderStyle = 'border-l-4 border-purple-500 bg-purple-50/60 dark:bg-purple-950/30 text-purple-950 dark:text-purple-200';
            titleColor = 'text-purple-700 dark:text-purple-300';
          } else if (tLower.includes('given') || tLower.includes('find') || tLower.includes('substitution') || tLower.includes('calculation')) {
            borderStyle = 'border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/25 text-blue-950 dark:text-blue-200';
            titleColor = 'text-blue-700 dark:text-blue-300';
          }

          return (
            <div key={idx} className={`p-3 sm:p-3.5 rounded-r-xl rounded-l-sm shadow-xs ${borderStyle}`}>
              <div className={`font-semibold text-xs tracking-wide uppercase mb-1.5 flex items-center gap-1.5 ${titleColor}`}>
                <span>{title}</span>
              </div>
              {body && (
                <div className="leading-relaxed whitespace-pre-line">
                  <MathRenderer content={body} />
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={idx} className="leading-relaxed whitespace-pre-line">
            <MathRenderer content={clean} />
          </div>
        );
      })}
    </div>
  );
};

export const AITeacherPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);

  const rawSubject = (searchParams.get('subject') as SubjectName) || allowedSubjects[0];
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(
    sanitizeSubjectForExam(rawSubject, user.targetExam)
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isJee = Boolean(user.targetExam && user.targetExam.toUpperCase().includes('JEE'));
  const examLabel = user.targetExam || (isJee ? 'JEE Main & Advanced' : 'NEET-UG');



  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `Hello ${user.name ? user.name.split(' ')[0] : 'there'}! I am your **${examLabel} AI Teacher** for **${selectedSubject} — ${selectedChapter}**.\n\nAap mujhse koi bhi concept, formula, numerical problem, assertion-reason ya doubt pooch sakte hain (Hindi/Hinglish ya English me). Har topic ko simple Hinglish me authoritative exam-aligned structured format ke saath samjhaunga!\n\n**Quick actions:**\n• Ask any concept doubt\n• Request a numerical with step-by-step calculation\n• Practice high-yield ${isJee ? 'JEE' : 'NEET'} MCQs`,
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
    setSuggestedSubject(null);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'tutor',
        text: `New study session started! I am ready to help you master **${selectedSubject} — ${selectedChapter}** for **${examLabel}**.\n\nChoose a tutor mode below or type any question!`,
        groundedInPrepora: true,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleInsertSymbol = (symbol: string) => {
    setInputText((prev) => prev + symbol);
    textareaRef.current?.focus();
  };

  const handleSendMessage = async (customPrompt?: string, modeOverride?: TutorMode) => {
    const currentMode = modeOverride || activeMode;
    let textToSend = (customPrompt || inputText).trim();

    if (!textToSend) {
      if (currentMode === 'Practice') {
        textToSend = `Give me a high-yield ${examLabel} practice question in ${selectedChapter}`;
      } else if (currentMode === 'Example') {
        textToSend = `Give me a step-by-step solved numerical problem in ${selectedChapter}`;
      } else if (currentMode === 'Learn') {
        textToSend = `Explain the core principles and formulas of ${selectedChapter}`;
      } else if (currentMode === 'Solution') {
        textToSend = `Explain the governing formulas and shortcuts for ${selectedChapter}`;
      } else if (currentMode === 'Hint') {
        textToSend = `Give me a problem-solving strategy and hint for ${selectedChapter}`;
      } else {
        return;
      }
    }

    const classification = classifyAcademicQuery(textToSend, selectedSubject, user.targetExam);

    const studentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: textToSend,
      mode: currentMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let activeSubj = selectedSubject;
    let activeChapter = selectedChapter;

    if (classification.autoSubjectConverted) {
      activeSubj = classification.detectedSubject;
      setSelectedSubject(classification.detectedSubject);
      if (classification.hasChapterMatch && classification.detectedChapter) {
        activeChapter = classification.detectedChapter;
        setSelectedChapter(classification.detectedChapter);
      }
      setMismatchWarning(`Question belongs to ${classification.detectedSubject}! Switched to ${classification.detectedSubject}.`);
    } else {
      setMismatchWarning(null);
    }

    if (classification.blockedPolicyMessage) {
      setMismatchWarning(classification.blockedPolicyMessage);
    }

    setMessages((prev) => [...prev, studentMsg]);
    setInputText('');
    setIsLoading(true);

    const isPracticeBankRequest =
      (!customPrompt && !inputText.trim() && currentMode === 'Practice') ||
      Boolean(customPrompt && customPrompt.includes('practice MCQ'));

    if (isPracticeBankRequest) {
      const targetChapter = (classification.hasChapterMatch && classification.detectedChapter)
        ? classification.detectedChapter
        : activeChapter;

      let bankQs = questionService.filterQuestions({
        subject: activeSubj,
        chapter: targetChapter
      });
      if (bankQs.length === 0) {
        bankQs = questionService.filterQuestions({ subject: activeSubj });
      }
      const q = bankQs[Math.floor(Math.random() * bankQs.length)] || questionService.getAllQuestions()[0];

      setTimeout(() => {
        setIsLoading(false);
        if (q) {
          const tutorMsg: ChatMessage = {
            id: `tutor-${Date.now()}`,
            sender: 'tutor',
            text: `Here is a high-yield practice question from **${q.chapter} — ${q.topic}**:`,
            mode: currentMode,
            question: q,
            options: q.options,
            correctOption: q.correctAnswer,
            explanation: q.explanation,
            provider: 'Prepora Question Bank',
            groundedInPrepora: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, tutorMsg]);
        }
      }, 500);
      return;
    }

    try {
      const recentHistory = messages.slice(-6).map((m) => ({
        role: (m.sender === 'student' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

      const response = await aiDoubtSolver.solveDoubtOnline(
        textToSend,
        activeSubj,
        activeChapter,
        {
          followUpMode: currentMode.toLowerCase(),
          requestFollowUp: currentMode.toLowerCase(),
          targetExam: user.targetExam,
          classLevel: user.classLevel,
          conversationHistory: recentHistory,
          aiMode: 'teacher',
          tutorMode: currentMode
        }
      );

      let replyText = '';
      if (response.answer) {
        replyText = response.answer;
      } else if (response.coreConcept) {
        replyText = response.coreConcept;
      } else {
        replyText = `Here is the explanation for **${activeChapter}**:`;
      }

      const isAlreadyStructured =
        replyText.includes('### 📚 Concept') ||
        replyText.includes('### Given') ||
        replyText.includes('### Correct Answer') ||
        replyText.includes('### 💡 Easy Explanation') ||
        replyText.includes('### 🧮 Formula') ||
        replyText.includes('Statement I');

      const isGreetingOrCasual =
        response.understanding?.intent === 'general_query' ||
        response.coreConcept === 'AI Study Assistant Greeting' ||
        response.coreConcept === 'Study Assistant Acknowledgement' ||
        response.coreConcept === 'Language Preference: English' ||
        replyText.startsWith('Hey! 👋') ||
        replyText.startsWith('Hello! 👋') ||
        replyText.startsWith("You're welcome!");

      if (!isAlreadyStructured && !isGreetingOrCasual) {
        if (
          response.coreConcept &&
          response.coreConcept !== 'Core Academic Principle' &&
          !replyText.includes(response.coreConcept)
        ) {
          replyText = `### ${response.coreConcept}\n\n${replyText}`;
        }

        if (response.keyFormula && !replyText.includes(response.keyFormula)) {
          replyText += `\n\n**📌 Governing Formula:**\n$$${response.keyFormula}$$`;
        }
        if (response.variables && !replyText.includes(response.variables)) {
          replyText += `\n\n**📝 Variables Explained:**\n${response.variables}`;
        }
        if (response.stepByStepSolution && response.stepByStepSolution.length > 0) {
          const firstStep = response.stepByStepSolution[0];
          if (!replyText.includes(firstStep)) {
            replyText += `\n\n**🔢 Step-by-Step Breakdown:**\n` + response.stepByStepSolution.map((s, i) => `${i + 1}. ${s}`).join('\n');
          }
        }
        if (response.examTip && !replyText.includes(response.examTip)) {
          replyText += `\n\n💡 **Exam Tip:** ${response.examTip}`;
        }
        if (response.examinerTrap && !replyText.includes(response.examinerTrap)) {
          replyText += `\n\n⚠️ **Common Trap:** ${response.examinerTrap}`;
        }
      }

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        mode: currentMode,
        provider: response.provider,
        providerError: response.providerError,
        isFallback: response.isFallback,
        groundedInPrepora: response.groundedInPrepora ?? true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      const fallbackFormula = searchFormulaKnowledge(textToSend, activeSubj, activeChapter, user.targetExam);
      let fallbackText = '';
      if (fallbackFormula && fallbackFormula.found) {
        fallbackText = fallbackFormula.formattedAnswer;
      } else {
        const fallbackAns = aiDoubtSolver.solveDoubt(textToSend, activeSubj, activeChapter);
        fallbackText = fallbackAns.answer || fallbackAns.coreConcept || `In **${activeChapter}**, master the foundational definitions, units, and sign conventions carefully.`;
        if (fallbackAns.keyFormula) {
          fallbackText += `\n\n**📌 Governing Formula:**\n$$${fallbackAns.keyFormula}$$`;
        }
      }
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: fallbackText,
        mode: currentMode,
        provider: 'Offline Engine',
        providerError: err?.message || 'Error communicating with AI service.',
        isFallback: true,
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
          : `✗ **Incorrect.** The correct answer is Option ${['A', 'B', 'C', 'D'][correctIdx]}.\n\nWould you like a step-by-step breakdown or another practice problem?`,
        mode: 'Explain',
        groundedInPrepora: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((p) => [...p, feedbackMsg]);
    }, 350);
  };

  const tutorModes: { mode: TutorMode; icon: any; label: string; desc: string }[] = [
    { mode: 'Learn', icon: BookOpen, label: 'Learn', desc: 'Core concept principles' },
    { mode: 'Explain', icon: Lightbulb, label: 'Explain', desc: 'Deep intuitive breakdown' },
    { mode: 'Example', icon: Calculator, label: 'Example', desc: 'Solved numerical problem' },
    { mode: 'Practice', icon: FileQuestion, label: 'Practice', desc: 'High-yield MCQ question' },
    { mode: 'Hint', icon: Compass, label: 'Hint', desc: 'Strategic solving hint' },
    { mode: 'Solution', icon: Layers, label: 'Formula & Solution', desc: 'Formulas & shortcuts' }
  ];

  const mathSymbols = ['π', 'θ', 'λ', 'Δ', 'α', 'β', '√', '∫', '±', 'μ', '°', '×', '÷', '²'];

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200 pb-16">
      {/* 1. Header with dynamic exam support and subject/chapter controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0c131a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>{examLabel} AI Teacher</span>
            </h1>
            <Badge variant="success" className="text-[10px] py-0.5 px-2">
              Online Mentor
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
              <span>AI Teacher Active & Ready</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Personalized AI Tutor for concept mastery, step-by-step numericals, and NCERT doubts in Hinglish & English.
          </p>
        </div>

        {/* Compact Subject & Chapter Selectors + Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value as SubjectName)}
            className="text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-[#131c26] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            {allowedSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-[#131c26] border border-slate-200 dark:border-slate-800 rounded-lg py-1.5 px-2.5 max-w-[170px] truncate focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            {chapters.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleResetChat}
            title="Reset Chat"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#131c26] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Tutor Mode Selector Toolbar */}
      <div className="bg-white dark:bg-[#0c131a] rounded-xl p-1.5 border border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none shadow-xs">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-2 shrink-0">
          Tutor Mode:
        </span>
        {tutorModes.map(({ mode, icon: Icon, label }) => {
          const isActive = activeMode === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#131c26]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Mismatch Advisory Banner */}
      {mismatchWarning && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
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

      {/* 3. Main Conversation Canvas */}
      <div className="bg-white dark:bg-[#0c131a] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 min-h-[460px] max-h-[640px] overflow-y-auto shadow-xs">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-2 text-xs sm:text-sm shadow-xs ${
                  isTutor
                    ? 'bg-slate-50 dark:bg-[#131c26] border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-100'
                    : 'bg-emerald-600 text-white ml-auto'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-75 pb-1 border-b border-black/5 dark:border-white/5">
                  <span className="font-semibold flex items-center gap-1.5 flex-wrap">
                    {isTutor ? (
                      <>
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span>AI Teacher</span>
                        {msg.mode && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 font-medium">
                            {msg.mode}
                          </span>
                        )}
                        {msg.provider && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-normal">
                            {msg.provider}
                          </span>
                        )}
                      </>
                    ) : (
                      <span>You</span>
                    )}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Provider Error / Offline Notice */}
                {msg.providerError && (
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{msg.providerError}</span>
                  </div>
                )}

                {/* Structured academic rendering */}
                <AcademicMessageRenderer text={msg.text} />

                {/* Inline Practice Question Block */}
                {msg.question && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-900 dark:text-white">
                    <div className="font-semibold">
                      <MathRenderer content={msg.question.question} />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {msg.options?.map((opt, oIdx) => {
                        const isChosen = msg.selectedOption === oIdx;
                        const isAnswer = msg.correctOption === oIdx;
                        const hasSelected = msg.selectedOption !== undefined;

                        let style = 'bg-slate-50 dark:bg-[#131c26] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70';
                        if (hasSelected) {
                          if (isAnswer) style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                          else if (isChosen && !isAnswer) style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200';
                          else style = 'bg-slate-50 dark:bg-[#131c26] border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={hasSelected}
                            onClick={() => handleOptionSelect(msg.id, oIdx, msg.correctOption ?? 0)}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-start gap-2 transition-colors text-xs cursor-pointer ${style}`}
                          >
                            <span className="font-semibold uppercase text-slate-500 dark:text-slate-400">
                              {['A', 'B', 'C', 'D'][oIdx]}.
                            </span>
                            <span className="flex-1">
                              <MathRenderer content={opt} />
                            </span>
                            {hasSelected && isAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            {hasSelected && isChosen && !isAnswer && (
                              <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
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
          <div className="flex gap-2 items-center text-xs text-slate-500 dark:text-slate-400 p-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Teacher is formulating step-by-step explanation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Secondary Actions & High-Yield Starters Bar */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-medium mr-1 text-[11px]">Quick starters:</span>
        <button
          type="button"
          onClick={() => handleSendMessage(`Explain the core concept and governing principles of ${selectedChapter} for ${examLabel}`, 'Learn')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#131c26] font-medium cursor-pointer transition-colors shadow-2xs"
        >
          📚 Concept
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a step-by-step solved numerical problem in ${selectedChapter}`, 'Example')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#131c26] font-medium cursor-pointer transition-colors shadow-2xs"
        >
          📝 Solved Numerical
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Give me a high-yield ${isJee ? 'JEE' : 'NEET'} practice MCQ question in ${selectedChapter}`, 'Practice')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#131c26] font-medium cursor-pointer transition-colors shadow-2xs"
        >
          🎯 {isJee ? 'JEE' : 'NEET'} MCQ Practice
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`Explain the governing formulas, derivations, and shortcuts for ${selectedChapter}`, 'Solution')}
          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#131c26] font-medium cursor-pointer transition-colors shadow-2xs"
        >
          🧮 Formulas & Tricks
        </button>
        <button
          type="button"
          onClick={() => handleSendMessage(`${selectedChapter} ke high-yield concepts aur examiner traps simple Hinglish me samjhao`, 'Learn')}
          className="px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 font-medium cursor-pointer transition-colors shadow-2xs"
        >
          🇮🇳 Hinglish me samjhao
        </button>
      </div>

      {/* 5. Math Symbols Quick Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold px-1 shrink-0">Symbols:</span>
        {mathSymbols.map((sym) => (
          <button
            key={sym}
            type="button"
            onClick={() => handleInsertSymbol(sym)}
            className="w-6 h-6 rounded-md bg-slate-100 dark:bg-[#131c26] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            {sym}
          </button>
        ))}
      </div>

      {/* 6. Expandable Input Bar with Keyboard Controls */}
      <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 shadow-xs flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={`Ask any ${examLabel} concept, numerical, formula, or doubt in Hinglish / English (Enter to send, Shift+Enter for new line)...`}
          className="flex-1 max-h-32 min-h-[38px] p-2 text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 resize-none"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() && activeMode !== 'Practice'}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-sm shadow-emerald-600/20 shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>

    </div>
  );
};

