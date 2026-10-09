import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  Clock,
  Plus,
  Lightbulb,
  Image as ImageIcon,
  Camera,
  X,
  Target,
  BookmarkPlus,
  Send,
  Sparkles,
  Key,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Card, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { aiDoubtSolver, SolvedDoubtResponse, ProgressiveHintsData } from '../services/aiDoubtSolver';
import { DoubtItem, SubjectName } from '../types';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { classifyAcademicQuery } from '../utils/aiAcademicClassifier';

export const DoubtCenter: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  const [activeMode, setActiveMode] = useState<'ai-solver' | 'community'>('ai-solver');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [doubts, setDoubts] = useState<DoubtItem[]>(() => ecosystemService.getDoubts());

  // AI Solver State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiSubject, setAiSubject] = useState<SubjectName>(allowedSubjects[0] || 'Physics');
  const [aiChapter, setAiChapter] = useState('Kinematics');
  const [isSolving, setIsSolving] = useState(false);
  const [policyBlockedError, setPolicyBlockedError] = useState<string | null>(null);
  const [autoSwitchedNotice, setAutoSwitchedNotice] = useState<string | null>(null);
  const [detectedChapterTag, setDetectedChapterTag] = useState<string>('Auto-detected by AI');
  const [currentSolution, setCurrentSolution] = useState<SolvedDoubtResponse | null>(null);
  const [savedToNotesMsg, setSavedToNotesMsg] = useState(false);
  const [addedToRevisionMsg, setAddedToRevisionMsg] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showWorkedExample, setShowWorkedExample] = useState(false);

  // Progressive Hints Mode State
  const [solverMode, setSolverMode] = useState<'direct' | 'hints'>('direct');
  const [hintsData, setHintsData] = useState<ProgressiveHintsData | null>(null);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(1);
  const [aiStatus, setAiStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/ai/status')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) setAiStatus(d.data);
      })
      .catch(() => {});
  }, []);

  // AI Configuration Modal State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configProviderInput, setConfigProviderInput] = useState<'openai' | 'gemini' | 'groq'>('gemini');
  const [configKeyInput, setConfigKeyInput] = useState('');
  const [configModelInput, setConfigModelInput] = useState('gemini-1.5-flash');
  const [configSaving, setConfigSaving] = useState(false);
  const [configMsg, setConfigMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleSaveAIConfig = async () => {
    const rawKey = configKeyInput.trim();
    if (!rawKey) return;
    setConfigSaving(true);
    setConfigMsg(null);
    try {
      const autoProvider = rawKey.startsWith('sk-') ? 'openai' : rawKey.startsWith('AIza') ? 'gemini' : configProviderInput;
      const res = await fetch('/api/ai/configure-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: autoProvider,
          apiKey: rawKey,
          model: configModelInput
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to configure AI provider');
      }
      if (data.warning) {
        setConfigMsg({ text: `Key saved to server! Note: ${data.warning}`, error: true });
      } else {
        setConfigMsg({ text: data.message || 'API key updated & activated!' });
      }
      if (data.data) setAiStatus(data.data);
      if (!data.warning) {
        setTimeout(() => {
          setShowConfigModal(false);
          setConfigKeyInput('');
          setConfigMsg(null);
        }, 1800);
      }
    } catch (err: any) {
      setConfigMsg({ text: err?.message || 'Error configuring provider', error: true });
    } finally {
      setConfigSaving(false);
    }
  };

  // Ask doubt modal state
  const [showAskModal, setShowAskModal] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<SubjectName>(allowedSubjects[0] || 'Physics');
  const [newChapter, setNewChapter] = useState<string>('Kinematics');
  const [newQuestionText, setNewQuestionText] = useState<string>('');

  const filteredDoubts = doubts.filter((d) => {
    if (!isSubjectAllowedForExam(d.subject, user.targetExam)) return false;
    if (selectedSubject !== 'All' && d.subject !== selectedSubject) return false;
    return true;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPEG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUploadedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSolveWithAI = async (e?: React.FormEvent, customQuery?: string, followUpPrompt?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || aiQuestion;
    if (!query.trim() && !uploadedImage) return;

    setPolicyBlockedError(null);
    setAutoSwitchedNotice(null);

    // AI Academic Classification & Policy Verification
    const classification = classifyAcademicQuery(query, aiSubject, user.targetExam);

    if (classification.isBlockedByExamPolicy) {
      setPolicyBlockedError(classification.blockedPolicyMessage || 'Exam syllabus restriction.');
      return;
    }

    let effectiveSubject = aiSubject;
    if (classification.autoSubjectConverted) {
      effectiveSubject = classification.detectedSubject;
      setAiSubject(classification.detectedSubject);
      setAutoSwitchedNotice(`Question belongs to ${classification.detectedSubject}! Subject automatically switched to ${classification.detectedSubject} (${classification.detectedChapter}).`);
    }

    const effectiveChapter = classification.detectedChapter || aiChapter || 'Fundamental Principles';
    setDetectedChapterTag(effectiveChapter);
    setAiChapter(effectiveChapter);

    setIsSolving(true);
    setShowWorkedExample(false);
    setSavedToNotesMsg(false);
    setAddedToRevisionMsg(false);

    try {
      if (solverMode === 'hints') {
        const hints = await aiDoubtSolver.getProgressiveHintsOnline(query, effectiveSubject, effectiveChapter);
        setHintsData(hints);
        setCurrentHintLevel(1);
      }

      const solution = await aiDoubtSolver.solveDoubtOnline(query, effectiveSubject, effectiveChapter, {
        imageBase64: uploadedImage || undefined,
        followUpMode: followUpPrompt
      });
      setCurrentSolution(solution);
    } catch (err) {
      console.error('Error solving doubt:', err);
    } finally {
      setIsSolving(false);
    }
  };

  const handleFollowUpClick = (action: string) => {
    if (!currentSolution) return;
    let followUpQuery = currentSolution.question;
    if (action === 'Explain simpler') {
      followUpQuery = `Explain this in simpler terms for a beginner: ${currentSolution.question}`;
    } else if (action === 'Give real-life example' || action === 'Give example') {
      followUpQuery = `${currentSolution.question} with example`;
    } else if (action === 'Step-by-step derivation') {
      followUpQuery = `Provide complete mathematical step-by-step derivation for: ${currentSolution.question}`;
    } else if (action === 'Test me on this') {
      followUpQuery = `Give me a 1-question conceptual challenge test on ${currentSolution.coreConcept}`;
    }
    setAiQuestion(followUpQuery);
    handleSolveWithAI(undefined, followUpQuery, action);
  };

  const handleSaveToNotes = () => {
    if (!currentSolution) return;
    aiDoubtSolver.saveDoubtToNotes(currentSolution);
    setSavedToNotesMsg(true);
    setTimeout(() => setSavedToNotesMsg(false), 3000);
  };

  const handleAddToRevision = () => {
    if (!currentSolution) return;
    aiDoubtSolver.addDoubtToRevision(currentSolution);
    setAddedToRevisionMsg(true);
    setTimeout(() => setAddedToRevisionMsg(false), 3000);
  };

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    ecosystemService.askDoubt(newSubject, newChapter, newQuestionText);
    setDoubts(ecosystemService.getDoubts());
    setNewQuestionText('');
    setShowAskModal(false);
  };

  interface SampleQuestion {
    text: string;
    sub: SubjectName;
    chap: string;
  }

  const sampleQuestions = useMemo<SampleQuestion[]>(() => {
    const list: SampleQuestion[] = [
      { text: 'What is gravity?', sub: 'Physics' as SubjectName, chap: 'Gravitation' },
      { text: 'Why does current flow?', sub: 'Physics' as SubjectName, chap: 'Current Electricity' },
      { text: 'Explain photosynthesis.', sub: 'Biology' as SubjectName, chap: 'Photosynthesis' },
      { text: 'Solve 2x + 5 = 15.', sub: 'Mathematics' as SubjectName, chap: 'Linear Equations' }
    ];
    return list.filter((sq) => allowedSubjects.includes(sq.sub));
  }, [allowedSubjects]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">AI Doubt Solver</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ask any academic question for step-by-step derivations or progressive hints.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMode('ai-solver')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'ai-solver'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            AI Solver
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('community')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'community'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            Teacher-Verified Doubts ({doubts.length})
          </button>
        </div>
      </div>

      {activeMode === 'ai-solver' ? (
        <div className="space-y-6">
          {/* Question Input Card */}
          <Card className="p-5 space-y-4">
            <form onSubmit={handleSolveWithAI} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSolverMode('direct')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      solverMode === 'direct'
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Full Solution
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolverMode('hints')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      solverMode === 'hints'
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Progressive Hints
                  </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {aiStatus?.hasOpenAIKey ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>OpenAI ({aiStatus.openAIModel})</span>
                    </span>
                  ) : aiStatus?.hasGeminiKey ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/30 flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Gemini AI</span>
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30 flex items-center gap-1 shadow-2xs">
                      <span>🟠 Study Up Academic Engine</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(true)}
                    className="text-[10px] px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium flex items-center gap-1 cursor-pointer transition"
                    title="Configure OpenAI or Gemini API Key"
                  >
                    <Key className="w-2.5 h-2.5 text-emerald-500" />
                    <span>Configure AI Key</span>
                  </button>
                </div>
              </div>

              {/* Policy Blocked Error Alert (e.g. JEE student asking Bio) */}
              {policyBlockedError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="text-base shrink-0">🚫</span>
                  <div>
                    <strong className="block font-black text-rose-900 dark:text-rose-100 mb-0.5">Syllabus Restriction</strong>
                    <span className="leading-relaxed">{policyBlockedError}</span>
                  </div>
                </div>
              )}

              {/* Auto-Switched Notice (e.g. user selected Physics but asked Chemistry) */}
              {autoSwitchedNotice && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="text-base shrink-0">🔄</span>
                  <span className="font-semibold leading-relaxed">{autoSwitchedNotice}</span>
                </div>
              )}

              {/* Simplified Selection: Student chooses Subject, AI Auto-Detects Chapter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Select Subject</label>
                  <select
                    value={aiSubject}
                    onChange={(e) => {
                      setAiSubject(e.target.value as SubjectName);
                      setPolicyBlockedError(null);
                      setAutoSwitchedNotice(null);
                    }}
                    className="w-full font-medium px-3 py-2 bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    {allowedSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    AI Chapter Auto-Detection
                  </label>
                  <div className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span className="truncate">{detectedChapterTag}</span>
                  </div>
                </div>
              </div>

              {/* Helpful Student Prompt */}
              <div className="p-2.5 rounded-xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-200 text-xs flex items-center gap-2 font-medium">
                <span className="text-sm">📸</span>
                <span className="leading-tight">
                  <strong>Photo ya Question likhein:</strong> AI turant formula, step-by-step breakdown aur correct answer batayega.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Question or Concept Statement
                </label>
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Type your question or concept statement here (e.g. 'What is work-energy theorem?', 'Calculate terminal velocity of a sphere')..."
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed resize-none font-medium"
                />
              </div>

              {uploadedImage && (
                <div className="relative inline-block border-2 border-brand-500 rounded-xl p-1 bg-white dark:bg-[#0c131a] shadow-xs">
                  <img src={uploadedImage} alt="Uploaded Doubt" className="h-24 max-w-xs object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    aria-label="Remove image"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Sample Questions (Horizontal scroll on mobile) */}
              <div className="flex items-center gap-1.5 text-[11px] pt-1 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-slate-400 font-semibold whitespace-nowrap shrink-0">Try Example:</span>
                {sampleQuestions.map((sq, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setAiQuestion(sq.text);
                      setAiSubject(sq.sub);
                      setAiChapter(sq.chap);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 font-medium transition-colors"
                  >
                    {sq.text}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Full-width on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto text-xs font-bold text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Camera className="w-4 h-4 text-brand-600" />
                    <span>{uploadedImage ? 'Change Photo' : 'Photo Kheecho / Upload'}</span>
                  </Button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSolving || (!aiQuestion.trim() && !uploadedImage)}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSolving ? 'Solving Doubt...' : 'Solve with AI'}</span>
                </Button>
              </div>
            </form>
          </Card>

          {/* Progressive Hints Mode Box */}
          {solverMode === 'hints' && hintsData && (
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">Progressive Hints</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCurrentHintLevel(lvl)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        currentHintLevel === lvl
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      Hint {lvl}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentHintLevel(4)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      currentHintLevel === 4
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Solution
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 leading-relaxed">
                {currentHintLevel === 1 && hintsData.hint1}
                {currentHintLevel === 2 && hintsData.hint2}
                {currentHintLevel === 3 && hintsData.hint3}
                {currentHintLevel === 4 && hintsData.fullSolution}
              </div>
            </Card>
          )}

          {/* Solution Presentation */}
          {currentSolution && (
            <Card className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400">
                      {currentSolution.subject} • {currentSolution.chapter}
                    </span>
                    {currentSolution.provider && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-medium">
                        {currentSolution.provider}
                      </span>
                    )}
                    {currentSolution.understanding?.intent && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        currentSolution.understanding.intent === 'example'
                          ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300'
                          : currentSolution.understanding.intent === 'formula'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : currentSolution.understanding.intent === 'derivation'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      }`}>
                        {currentSolution.understanding.intent === 'example' ? '📝 Worked Example' :
                         currentSolution.understanding.intent === 'formula' ? '📐 Formula Sheet' :
                         currentSolution.understanding.intent === 'derivation' ? '🔬 Derivation' :
                         '📘 Conceptual Guide'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                    {currentSolution.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={handleSaveToNotes}
                    variant="outline"
                    size="sm"
                    className="text-xs font-medium py-1 px-2.5"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
                    {savedToNotesMsg ? 'Saved!' : 'Save to Notes'}
                  </Button>
                  <Button
                    onClick={handleAddToRevision}
                    variant="outline"
                    size="sm"
                    className="text-xs font-medium py-1 px-2.5"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    {addedToRevisionMsg ? 'Added!' : 'Add to Revision'}
                  </Button>
                </div>
              </div>

              {/* Provider error / diagnostic notice */}
              {currentSolution.providerError && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  <span><strong>AI Provider Notice:</strong> {currentSolution.providerError}</span>
                </div>
              )}

              {/* Core Concept / Direct Answer */}
              {currentSolution.answer && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  <MathRenderer content={currentSolution.answer} />
                </div>
              )}

              {/* Governing Formula (only if not already included in direct answer) */}
              {currentSolution.keyFormula && (!currentSolution.answer || !currentSolution.answer.includes(currentSolution.keyFormula)) && (
                <div className="p-3 rounded-lg bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white text-xs space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Governing Relation
                  </span>
                  <div className="font-mono text-emerald-300 font-semibold overflow-x-auto">
                    <MathRenderer content={currentSolution.keyFormula} displayMode={true} />
                  </div>
                </div>
              )}

              {/* Worked Numerical Example:
                  - If user requested an example (intent === 'example'): show directly!
                  - If user asked for formula or concept, but an example exists: provide a clean collapsible toggle */}
              {(() => {
                const effectiveExample = currentSolution.example || currentSolution.optionalExample;
                const isExampleIntent = currentSolution.understanding?.intent === 'example' || !currentSolution.answer;

                if (!effectiveExample || effectiveExample === currentSolution.answer) return null;

                if (isExampleIntent) {
                  return (
                    <div className="p-4 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 dark:text-violet-300">
                        <span>📝</span>
                        <span>Worked Numerical Example</span>
                      </div>
                      <div className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                        <MathRenderer content={effectiveExample} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200/70 dark:border-violet-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                      <div className="flex items-center gap-2 text-violet-900 dark:text-violet-300">
                        <span>💡</span>
                        <span className="font-semibold">Solved numerical problem available for this concept</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowWorkedExample(!showWorkedExample)}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition cursor-pointer self-start sm:self-auto"
                      >
                        {showWorkedExample ? 'Hide Numerical Example ▲' : 'View Numerical Example ▼'}
                      </button>
                    </div>
                    {showWorkedExample && (
                      <div className="p-4 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 space-y-2 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 dark:text-violet-300">
                          <span>📝</span>
                          <span>Worked Numerical Example</span>
                        </div>
                        <div className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                          <MathRenderer content={effectiveExample} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Step-by-Step Breakdown (only if not already printed in the main answer) */}
              {currentSolution.stepByStepSolution && currentSolution.stepByStepSolution.length > 0 &&
               (!currentSolution.answer || !currentSolution.answer.includes(currentSolution.stepByStepSolution[0])) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Step-by-Step Breakdown
                  </h4>
                  <div className="space-y-1.5">
                    {currentSolution.stepByStepSolution.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 leading-relaxed">
                        <MathRenderer content={step} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examiner Trap & Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentSolution.examinerTrap && (
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200 text-xs leading-relaxed">
                    <strong className="font-semibold block mb-0.5">⚠️ Examiner Trap:</strong>
                    {currentSolution.examinerTrap}
                  </div>
                )}
                {currentSolution.examTip && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
                    <strong className="font-semibold block mb-0.5">💡 Exam Tip:</strong>
                    {currentSolution.examTip}
                  </div>
                )}
              </div>

              {/* Follow-up actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium mr-1 text-[11px]">Follow-up:</span>
                {['Explain simpler', 'Give example', 'Step-by-step derivation', 'Test me on this'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleFollowUpClick(action)}
                    className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-xs"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        /* Faculty / Community Doubts List */
        <div className="space-y-4">
          {/* Informational Guidance Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>👨‍🏫</span>
                <span>Teacher-Verified Doubts & Faculty Q&A</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Authentic doubts asked by students and answered with step-by-step derivations by senior academic faculty. Click &ldquo;Ask Question&rdquo; to submit your own doubt.
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
              100% Expert Verified Solutions
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              onClick={() => setShowAskModal(true)}
              className="font-semibold text-xs py-1.5 px-3 bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Ask Question
            </Button>
          </div>

          {filteredDoubts.length === 0 ? (
            <Card className="text-center py-12">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">No Questions Filed Yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Submit an academic question to receive detailed faculty clarification.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredDoubts.map((d) => (
                <Card key={d.id} className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{d.subject}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{d.chapter}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">{d.status}</span>
                  </div>

                  <p className="font-medium text-slate-800 dark:text-slate-100 text-xs sm:text-sm">{d.studentQuestion}</p>

                  {d.replies && d.replies.length > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 text-xs text-slate-700 dark:text-slate-200 mt-2">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">Faculty Solution:</div>
                      <p>{d.replies[0].message}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ask Question Modal */}
      <Modal
        isOpen={showAskModal}
        onClose={() => setShowAskModal(false)}
        title="Ask Faculty a Question"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAskModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePostDoubt} className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 cursor-pointer">
              Submit
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Subject</label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value as SubjectName)}
              className="w-full px-3 py-2 bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
            >
              {allowedSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Chapter</label>
            <input
              type="text"
              value={newChapter}
              onChange={(e) => setNewChapter(e.target.value)}
              placeholder="e.g. Thermodynamics"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Question Details</label>
            <textarea
              rows={4}
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="Describe what you find confusing or paste the problem text..."
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* 4. AI Provider Key Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0f1722] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Configure AI API Key</h3>
                  <p className="text-[11px] text-slate-500">Live connection to official OpenAI or Google Gemini</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setShowConfigModal(false); setConfigMsg(null); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  AI Provider
                </label>
                <select
                  value={configProviderInput}
                  onChange={(e) => {
                    const p = e.target.value as 'openai' | 'gemini' | 'groq';
                    setConfigProviderInput(p);
                    if (p === 'openai') setConfigModelInput('gpt-4o-mini');
                    else if (p === 'gemini') setConfigModelInput('gemini-1.5-flash');
                    else setConfigModelInput('llama-3.3-70b-versatile');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141e2b] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="gemini">Google Gemini (Gemini 1.5 Flash — 100% Free)</option>
                  <option value="groq">Groq Cloud (Llama 3.3 70B — 100% Free & Fast)</option>
                  <option value="openai">OpenAI (Official GPT-4o / GPT-4o-mini)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Model
                </label>
                <select
                  value={configModelInput}
                  onChange={(e) => setConfigModelInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141e2b] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium"
                >
                  {configProviderInput === 'openai' ? (
                    <>
                      <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                      <option value="gpt-4o">gpt-4o (High Intelligence)</option>
                      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    </>
                  ) : configProviderInput === 'gemini' ? (
                    <>
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Fast & 100% Free Tier)</option>
                      <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                    </>
                  ) : (
                    <>
                      <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Smart & Free)</option>
                      <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Fastest & Free)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                    Secret API Key
                  </label>
                  {configProviderInput === 'gemini' && (
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      Get Free Gemini Key ↗
                    </a>
                  )}
                  {configProviderInput === 'groq' && (
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      Get Free Groq Key ↗
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  placeholder={configProviderInput === 'openai' ? 'sk-...' : configProviderInput === 'gemini' ? 'AIza...' : 'gsk_...'}
                  value={configKeyInput}
                  onChange={(e) => setConfigKeyInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#141e2b] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-xs placeholder:text-slate-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Stored securely on the backend in database. Never exposed to browser.
                </span>
              </div>

              {configMsg && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    configMsg.error
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  {configMsg.error ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
                  <span>{configMsg.text}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setShowConfigModal(false); setConfigMsg(null); }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveAIConfig}
                disabled={configSaving || !configKeyInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                {configSaving ? 'Saving & Testing...' : 'Save & Activate'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
