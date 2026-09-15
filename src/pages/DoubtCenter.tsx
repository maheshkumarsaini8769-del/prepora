import React, { useState, useRef } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Filter, 
  Plus, 
  BookOpen,
  Sparkles,
  Zap,
  AlertTriangle,
  BookmarkPlus,
  Lightbulb,
  FileText,
  Image as ImageIcon,
  X,
  Target,
  RefreshCw,
  ChevronRight,
  BrainCircuit,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { aiDoubtSolver, SolvedDoubtResponse, ProgressiveHintsData } from '../services/aiDoubtSolver';
import { DoubtItem, SubjectName } from '../types';
import { useNavigate } from 'react-router-dom';

export const DoubtCenter: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeMode, setActiveMode] = useState<'ai-solver' | 'community'>('ai-solver');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [doubts, setDoubts] = useState<DoubtItem[]>(() => ecosystemService.getDoubts());

  // AI Solver State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiSubject, setAiSubject] = useState<SubjectName>('Physics');
  const [aiChapter, setAiChapter] = useState('Kinematics & Work-Energy');
  const [isSolving, setIsSolving] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<SolvedDoubtResponse | null>(null);
  const [savedToNotesMsg, setSavedToNotesMsg] = useState(false);
  const [addedToRevisionMsg, setAddedToRevisionMsg] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Progressive Hints Mode State
  const [solverMode, setSolverMode] = useState<'direct' | 'hints'>('direct');
  const [hintsData, setHintsData] = useState<ProgressiveHintsData | null>(null);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(1);
  const [isLoadingHints, setIsLoadingHints] = useState<boolean>(false);

  // Ask doubt modal state
  const [showAskModal, setShowAskModal] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<SubjectName>('Physics');
  const [newChapter, setNewChapter] = useState<string>('Kinematics');
  const [newQuestionText, setNewQuestionText] = useState<string>('');

  const filteredDoubts = doubts.filter(d => {
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

    setIsSolving(true);
    setSavedToNotesMsg(false);
    setAddedToRevisionMsg(false);

    try {
      if (solverMode === 'hints') {
        setIsLoadingHints(true);
        const hints = await aiDoubtSolver.getProgressiveHintsOnline(query, aiSubject, aiChapter);
        setHintsData(hints);
        setCurrentHintLevel(1);
        setIsLoadingHints(false);
      }

      const solution = await aiDoubtSolver.solveDoubtOnline(query, aiSubject, aiChapter, {
        imageBase64: uploadedImage || undefined,
        followUpMode: followUpPrompt
      });
      setCurrentSolution(solution);
    } catch (err) {
      console.error('Error solving doubt:', err);
    } finally {
      setIsSolving(false);
      setIsLoadingHints(false);
    }
  };

  const handleFollowUpClick = (action: string) => {
    if (!currentSolution) return;
    let followUpQuery = currentSolution.question;
    if (action === 'Explain simpler') {
      followUpQuery = `Explain this in simpler terms for a beginner: ${currentSolution.question}`;
    } else if (action === 'Give real-life example' || action === 'Give example') {
      followUpQuery = `Give a clear real-world practical example of: ${currentSolution.coreConcept || currentSolution.question}`;
    } else if (action === 'Step-by-step derivation') {
      followUpQuery = `Provide complete mathematical step-by-step derivation for: ${currentSolution.question}`;
    } else if (action === 'Test me on this') {
      followUpQuery = `Give me a 1-question conceptual challenge test on ${currentSolution.coreConcept}`;
    } else if (action === 'Why does this happen?') {
      followUpQuery = `Why does this physical/chemical phenomenon happen fundamentally? ${currentSolution.question}`;
    }
    setAiQuestion(followUpQuery);
    handleSolveWithAI(undefined, followUpQuery, action);
  };

  const handleSaveToNotes = () => {
    if (!currentSolution) return;
    aiDoubtSolver.saveDoubtToNotes(currentSolution);
    setSavedToNotesMsg(true);
    setTimeout(() => setSavedToNotesMsg(false), 3500);
  };

  const handleAddToRevision = () => {
    if (!currentSolution) return;
    aiDoubtSolver.addDoubtToRevision(currentSolution);
    setAddedToRevisionMsg(true);
    setTimeout(() => setAddedToRevisionMsg(false), 3500);
  };

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    ecosystemService.askDoubt(newSubject, newChapter, newQuestionText);
    setDoubts(ecosystemService.getDoubts());
    setNewQuestionText('');
    setShowAskModal(false);
  };

  const sampleQuestions = [
    { text: 'What is gravity?', sub: 'Physics' as SubjectName, chap: 'Gravitation' },
    { text: 'What is force?', sub: 'Physics' as SubjectName, chap: 'Laws of Motion' },
    { text: 'Explain photosynthesis.', sub: 'Biology' as SubjectName, chap: 'Photosynthesis in Higher Plants' },
    { text: 'Solve 2x + 5 = 15.', sub: 'Mathematics' as SubjectName, chap: 'Linear Equations' },
    { text: 'Why does current flow?', sub: 'Physics' as SubjectName, chap: 'Current Electricity' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Academic Mentorship & Intelligent Solver</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Doubt Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ask ANY academic question. Get instant step-by-step conceptual derivations, progressive hints, or human faculty clarifications.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant={activeMode === 'ai-solver' ? 'primary' : 'outline'}
            onClick={() => setActiveMode('ai-solver')}
            className="text-xs font-bold"
          >
            <Zap className="w-3.5 h-3.5 mr-1" /> Ask PREPORA AI
          </Button>
          <Button
            variant={activeMode === 'community' ? 'primary' : 'outline'}
            onClick={() => setActiveMode('community')}
            className="text-xs font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1" /> Faculty Doubts ({doubts.length})
          </Button>
        </div>
      </div>

      {activeMode === 'ai-solver' ? (
        <div className="space-y-6">
          {/* AI Input Form */}
          <Card className="p-5 border-purple-200/80 shadow-md shadow-purple-500/5 bg-gradient-to-b from-white to-purple-50/20">
            <form onSubmit={handleSolveWithAI} className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-purple-100/80 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSolverMode('direct')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      solverMode === 'direct'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Solution Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolverMode('hints')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      solverMode === 'hints'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Progressive Hints Mode
                  </button>
                </div>

                <span className="text-[11px] font-bold text-slate-400 hidden sm:inline-flex items-center gap-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-purple-500" /> Grounded & Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    value={aiSubject}
                    onChange={(e) => setAiSubject(e.target.value as SubjectName)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Chapter / Unit
                  </label>
                  <input
                    type="text"
                    value={aiChapter}
                    onChange={(e) => setAiChapter(e.target.value)}
                    placeholder="e.g. Kinematics, Gravitation, Thermodynamics..."
                    className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Problem Statement or Academic Doubt
                </label>
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask ANY educational question: e.g. 'What is gravity?', 'Solve 2x + 5 = 15', or describe a formula trap..."
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium leading-relaxed"
                />
              </div>

              {/* Uploaded Image Preview */}
              {uploadedImage && (
                <div className="relative inline-block border-2 border-purple-200 rounded-xl p-1 bg-white shadow-xs">
                  <img
                    src={uploadedImage}
                    alt="Uploaded question"
                    className="h-24 max-w-xs object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow hover:bg-rose-600"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* High-Yield Sample Questions */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" /> High-yield student queries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleQuestions.map((sq, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setAiQuestion(sq.text);
                        setAiSubject(sq.sub);
                        setAiChapter(sq.chap);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 transition-colors text-left"
                    >
                      {sq.chap}: {sq.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
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
                    className="text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                    {uploadedImage ? 'Change Image' : 'Upload Question Image'}
                  </Button>
                  <p className="text-[11px] text-slate-400 hidden md:block">
                    NCERT & JEE/NEET aligned
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSolving || (!aiQuestion.trim() && !uploadedImage)}
                  className="bg-purple-600 hover:bg-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 px-6 py-2.5 w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4" />
                  {isSolving ? 'Analyzing & Deriving...' : 'Solve with AI'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Progressive Hints Display (If Hints Mode) */}
          {solverMode === 'hints' && hintsData && (
            <Card className="p-5 border-amber-200 bg-amber-50/40 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Progressive Clues & Approach
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCurrentHintLevel(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentHintLevel === lvl
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-amber-200 text-amber-800'
                      }`}
                    >
                      Hint {lvl}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentHintLevel(4)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      currentHintLevel === 4
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white border border-purple-200 text-purple-800'
                    }`}
                  >
                    Full Solution
                  </button>
                </div>
              </div>

              {currentHintLevel === 1 && (
                <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                  <span className="font-bold block text-amber-800 mb-1">💡 Hint 1: Problem Clue</span>
                  {hintsData.hint1}
                </div>
              )}

              {currentHintLevel === 2 && (
                <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                  <span className="font-bold block text-amber-800 mb-1">📐 Hint 2: Concept & Governing Relation</span>
                  {hintsData.hint2}
                </div>
              )}

              {currentHintLevel === 3 && (
                <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                  <span className="font-bold block text-amber-800 mb-1">🎯 Hint 3: Strategic Approach</span>
                  {hintsData.hint3}
                </div>
              )}

              {currentHintLevel === 4 && (
                <div className="p-4 rounded-xl bg-white border border-purple-200 text-xs text-slate-800 leading-relaxed font-medium space-y-2">
                  <span className="font-bold block text-purple-800 mb-1">✅ Complete Solution</span>
                  <p>{hintsData.fullSolution}</p>
                  {hintsData.examinerTrap && (
                    <p className="text-amber-800 font-bold text-[11px] pt-1">
                      ⚠️ Trap: {hintsData.examinerTrap}
                    </p>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* AI Solution Presentation */}
          {currentSolution && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="p-6 border-purple-200 bg-white space-y-5 shadow-sm">
                {/* Meta & Actions Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        {currentSolution.subject}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        {currentSolution.chapter}
                      </span>
                      {currentSolution.understanding?.intent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase">
                          {currentSolution.understanding.intent}
                        </span>
                      )}
                      {currentSolution.groundedInPrepora && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Grounded in PREPORA
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentSolution.question}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      onClick={handleSaveToNotes}
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold text-purple-700 border-purple-200 hover:bg-purple-50"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5 mr-1 text-purple-600" />
                      {savedToNotesMsg ? 'Saved to Notes!' : 'Save to Notes'}
                    </Button>
                    <Button
                      onClick={handleAddToRevision}
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {addedToRevisionMsg ? 'Added to Revision!' : 'Add to Revision'}
                    </Button>
                  </div>
                </div>

                {/* Question Understanding Overview */}
                {currentSolution.understanding && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Intent</span>
                      <span className="font-semibold text-slate-800 capitalize">{currentSolution.understanding.intent}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Topic</span>
                      <span className="font-semibold text-slate-800">{currentSolution.understanding.topic || currentSolution.chapter}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Concept</span>
                      <span className="font-semibold text-slate-800">{currentSolution.understanding.concept || currentSolution.coreConcept}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Difficulty</span>
                      <span className="font-semibold text-slate-800">{currentSolution.understanding.difficulty || 'Medium'}</span>
                    </div>
                  </div>
                )}

                {/* Direct Clear Answer */}
                {currentSolution.answer && (
                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase tracking-wide">
                      <Lightbulb className="w-4 h-4 text-purple-600" /> Direct Answer & Principle
                    </div>
                    <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
                      {currentSolution.answer}
                    </p>
                  </div>
                )}

                {/* Key Formula (Rendered cleanly without boilerplate) */}
                {currentSolution.keyFormula && (
                  <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Mathematical Governing Relation
                    </span>
                    <code className="text-xs sm:text-sm font-mono text-emerald-300 font-bold block overflow-x-auto py-1">
                      {currentSolution.keyFormula}
                    </code>
                  </div>
                )}

                {/* Step-by-Step Derivation / Solution */}
                {currentSolution.stepByStepSolution && currentSolution.stepByStepSolution.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Step-by-Step Derivation & Explanation
                    </h3>
                    <div className="space-y-2">
                      {currentSolution.stepByStepSolution.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 font-medium leading-relaxed">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examiner Trap & Exam Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Typical Negative Trap
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                      {currentSolution.examinerTrap}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" /> Exam Scoring Tip
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                      {currentSolution.examTip}
                    </p>
                  </div>
                </div>

                {/* Follow-Up Action Chips */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Follow-up Clarifications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentSolution.suggestedFollowUps || [
                      'Explain simpler',
                      'Give real-life example',
                      'Step-by-step derivation',
                      'Why does this happen?',
                      'Test me on this'
                    ]).map((action, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleFollowUpClick(action)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 font-medium transition-colors"
                      >
                        {action} →
                      </button>
                    ))}
                  </div>
                </div>

                {/* Educational Action Connections */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-purple-50/40 p-4 rounded-2xl">
                  <div>
                    <span className="text-xs font-bold text-purple-950 block">Next Learning Step</span>
                    <p className="text-[11px] text-slate-500">Practice 5 targeted questions or fix recurring weaknesses on this topic.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const url = currentSolution.suggestedPractice?.actionUrl ||
                          `/practice?subject=${encodeURIComponent(currentSolution.subject)}&chapter=${encodeURIComponent(currentSolution.chapter)}&count=5`;
                        navigate(url);
                      }}
                      className="text-xs font-bold flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700"
                    >
                      <Target className="w-3.5 h-3.5" /> Practice 5 Similar Questions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/fix-weakness')}
                      className="text-xs font-bold text-slate-700 border-slate-200"
                    >
                      Fix My Weakness
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        /* Mentorship & Faculty Doubts */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {/* Subject Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              onClick={() => setShowAskModal(true)}
              className="font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Ask a Doubt
            </Button>
          </div>

          {filteredDoubts.length === 0 ? (
            <Card className="text-center py-16">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-base">No Doubts Filed</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 max-w-sm mx-auto">
                Have an academic question from your test results or textbooks? Submit it for mentor explanation.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAskModal(true)}
                className="text-xs font-bold"
              >
                Ask First Question
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredDoubts.map(d => (
                <Card key={d.id} className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                        {d.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {d.chapter}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      d.status === 'resolved' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {d.status === 'resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {d.status === 'resolved' ? 'Resolved' : 'Pending'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {d.studentQuestion}
                  </p>

                  {d.replies && d.replies.length > 0 ? (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1.5">
                      <span className="font-bold text-purple-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Mentor Solution:
                      </span>
                      <p className="leading-relaxed font-medium">{d.replies[0].message}</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/60 text-xs text-amber-800 flex items-center justify-between">
                      <span className="text-[11px]">Academic faculty is drafting an explanation.</span>
                      <span className="text-[10px] font-bold text-amber-600">Avg response &lt; 2 hrs</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Asked on {d.timestamp}</span>
                    <span>{d.replies?.length || 0} peer discussions</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ask Doubt Modal */}
      <Modal
        isOpen={showAskModal}
        onClose={() => setShowAskModal(false)}
        title="Ask an Academic Doubt"
      >
        <form onSubmit={handlePostDoubt} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Chapter
              </label>
              <input
                type="text"
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder="e.g. Thermodynamics"
                className="w-full text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Question / Doubt Details
            </label>
            <textarea
              rows={4}
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="Paste problem text or explain what concept you need clarified..."
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAskModal(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!newQuestionText.trim()}
              className="text-xs bg-purple-600 hover:bg-purple-700 font-bold"
            >
              Post Doubt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
