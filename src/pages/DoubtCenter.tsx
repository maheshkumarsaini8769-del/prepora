import React, { useState, useRef } from 'react';
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
  Send
} from 'lucide-react';
import { Card, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { aiDoubtSolver, SolvedDoubtResponse, ProgressiveHintsData } from '../services/aiDoubtSolver';
import { DoubtItem, SubjectName } from '../types';
import { MathRenderer } from '../components/common/MathRenderer';

export const DoubtCenter: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeMode, setActiveMode] = useState<'ai-solver' | 'community'>('ai-solver');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [doubts, setDoubts] = useState<DoubtItem[]>(() => ecosystemService.getDoubts());

  // AI Solver State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiSubject, setAiSubject] = useState<SubjectName>('Physics');
  const [aiChapter, setAiChapter] = useState('Kinematics');
  const [isSolving, setIsSolving] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<SolvedDoubtResponse | null>(null);
  const [savedToNotesMsg, setSavedToNotesMsg] = useState(false);
  const [addedToRevisionMsg, setAddedToRevisionMsg] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Progressive Hints Mode State
  const [solverMode, setSolverMode] = useState<'direct' | 'hints'>('direct');
  const [hintsData, setHintsData] = useState<ProgressiveHintsData | null>(null);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(1);

  // Ask doubt modal state
  const [showAskModal, setShowAskModal] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<SubjectName>('Physics');
  const [newChapter, setNewChapter] = useState<string>('Kinematics');
  const [newQuestionText, setNewQuestionText] = useState<string>('');

  const filteredDoubts = doubts.filter((d) => {
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
        const hints = await aiDoubtSolver.getProgressiveHintsOnline(query, aiSubject, aiChapter);
        setHintsData(hints);
        setCurrentHintLevel(1);
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

  const sampleQuestions = [
    { text: 'What is gravity?', sub: 'Physics' as SubjectName, chap: 'Gravitation' },
    { text: 'Why does current flow?', sub: 'Physics' as SubjectName, chap: 'Current Electricity' },
    { text: 'Explain photosynthesis.', sub: 'Biology' as SubjectName, chap: 'Photosynthesis' },
    { text: 'Solve 2x + 5 = 15.', sub: 'Mathematics' as SubjectName, chap: 'Linear Equations' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">AI Doubt Solver</h1>
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
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            AI Solver
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('community')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'community'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Faculty Questions ({doubts.length})
          </button>
        </div>
      </div>

      {activeMode === 'ai-solver' ? (
        <div className="space-y-6">
          {/* Question Input Card */}
          <Card className="p-5 space-y-4">
            <form onSubmit={handleSolveWithAI} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSolverMode('direct')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      solverMode === 'direct'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Full Solution
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolverMode('hints')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      solverMode === 'hints'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Progressive Hints
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Subject</label>
                  <select
                    value={aiSubject}
                    onChange={(e) => setAiSubject(e.target.value as SubjectName)}
                    className="w-full font-medium px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Chapter</label>
                  <input
                    type="text"
                    value={aiChapter}
                    onChange={(e) => setAiChapter(e.target.value)}
                    placeholder="e.g. Kinematics, Thermodynamics..."
                    className="w-full font-medium px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Helpful Student Prompt */}
              <div className="p-2.5 rounded-xl bg-cyan-50/80 border border-cyan-200 text-cyan-900 text-xs flex items-center gap-2 font-medium">
                <span className="text-sm">📸</span>
                <span className="leading-tight">
                  <strong>Photo ya Question likhein:</strong> AI turant formula, step-by-step breakdown aur correct answer batayega.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Question or Concept Statement
                </label>
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Yahan apna question likhein (e.g. 'What is work-energy theorem?', 'Calculate terminal velocity of a sphere')..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed resize-none font-medium"
                />
              </div>

              {uploadedImage && (
                <div className="relative inline-block border-2 border-brand-500 rounded-xl p-1 bg-white shadow-xs">
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
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap shrink-0 font-medium transition-colors"
                  >
                    {sq.text}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Full-width on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
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
                    className="w-full sm:w-auto text-xs font-bold text-slate-700 border-slate-300 py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50"
                  >
                    <Camera className="w-4 h-4 text-brand-600" />
                    <span>{uploadedImage ? 'Change Photo' : 'Photo Kheecho / Upload'}</span>
                  </Button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSolving || (!aiQuestion.trim() && !uploadedImage)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
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
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                <span className="font-semibold text-slate-900">Progressive Hints</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCurrentHintLevel(lvl)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        currentHintLevel === lvl
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700'
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
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Solution
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
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
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {currentSolution.subject} • {currentSolution.chapter}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
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

              {/* Core Concept / Direct Answer */}
              {currentSolution.answer && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <MathRenderer content={currentSolution.answer} />
                </div>
              )}

              {/* Governing Formula */}
              {currentSolution.keyFormula && (
                <div className="p-3 rounded-lg bg-slate-900 text-white text-xs space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Governing Relation
                  </span>
                  <div className="font-mono text-emerald-300 font-semibold overflow-x-auto">
                    <MathRenderer content={currentSolution.keyFormula} displayMode={true} />
                  </div>
                </div>
              )}

              {/* Step-by-Step Breakdown */}
              {currentSolution.stepByStepSolution && currentSolution.stepByStepSolution.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step-by-Step Breakdown
                  </h4>
                  <div className="space-y-1.5">
                    {currentSolution.stepByStepSolution.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 text-xs text-slate-800 leading-relaxed">
                        <MathRenderer content={step} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Tip */}
              {currentSolution.examTip && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                  <strong className="font-semibold block mb-0.5">Exam Tip:</strong>
                  {currentSolution.examTip}
                </div>
              )}

              {/* Follow-up actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium mr-1 text-[11px]">Follow-up:</span>
                {['Explain simpler', 'Give example', 'Step-by-step derivation', 'Test me on this'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleFollowUpClick(action)}
                    className="px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              onClick={() => setShowAskModal(true)}
              className="font-semibold text-xs py-1.5 px-3 bg-slate-900 hover:bg-black text-white"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Ask Question
            </Button>
          </div>

          {filteredDoubts.length === 0 ? (
            <Card className="text-center py-12">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-800 text-sm">No Questions Filed Yet</h3>
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
                      <span className="font-bold text-slate-900">{d.subject}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{d.chapter}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">{d.status}</span>
                  </div>

                  <p className="font-medium text-slate-800 text-xs sm:text-sm">{d.studentQuestion}</p>

                  {d.replies && d.replies.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 mt-2">
                      <div className="font-semibold text-slate-900 mb-1">Faculty Solution:</div>
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
            <Button variant="primary" onClick={handlePostDoubt} className="bg-slate-900 hover:bg-black text-white">
              Submit
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subject</label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value as SubjectName)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Chapter</label>
            <input
              type="text"
              value={newChapter}
              onChange={(e) => setNewChapter(e.target.value)}
              placeholder="e.g. Thermodynamics"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Question Details</label>
            <textarea
              rows={4}
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="Describe what you find confusing or paste the problem text..."
              className="w-full p-2.5 border border-slate-200 rounded-lg resize-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
