import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Layers,
  Trash2,
  Sliders,
  Check,
  HelpCircle
} from 'lucide-react';
import { adminFetch } from '../../utils/adminApi';

interface AIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  difficulty: string;
  qualityFlags: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface AIJob {
  _id: string;
  id: string;
  exam: string;
  subject: string;
  chapter: string;
  topic?: string;
  difficulty: string;
  count: number;
  status: string;
  generatedQuestions: AIQuestion[];
  createdAt: string;
}

export const AdminAIStudio: React.FC = () => {
  const [exam, setExam] = useState('JEE');
  const [subject, setSubject] = useState('Physics');
  const [chapter, setChapter] = useState('Kinematics');
  const [topic, setTopic] = useState('Motion in 1D');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(4);
  const [customInstructions, setCustomInstructions] = useState('');

  const [generating, setGenerating] = useState(false);
  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<AIJob | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await adminFetch('/api/admin/ai/jobs');
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
        if (data.data?.length > 0 && !selectedJob) {
          setSelectedJob(data.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setErrorMsg('');
    try {
      const res = await adminFetch('/api/admin/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject,
          chapter,
          topic,
          difficulty,
          count,
          customInstructions
        })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(`Generated ${data.data?.generatedQuestions?.length || count} draft questions with balanced answer keys.`);
        setTimeout(() => setFeedbackMsg(''), 5000);
        await fetchJobs();
        setSelectedJob(data.data);
      } else {
        setErrorMsg(data.message || 'Generation failed');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleSetCorrectAnswer = async (jobId: string, questionId: string, newIndex: number) => {
    try {
      const res = await adminFetch(`/api/admin/ai/jobs/${jobId}/question/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correctAnswer: newIndex })
      });
      const data = await res.json();
      if (data.success) {
        if (selectedJob && selectedJob.id === jobId) {
          const updated = selectedJob.generatedQuestions.map((q) =>
            q.id === questionId ? { ...q, correctAnswer: newIndex } : q
          );
          setSelectedJob({ ...selectedJob, generatedQuestions: updated });
        }
        setFeedbackMsg(`Updated correct answer to Option ${String.fromCharCode(65 + newIndex)}`);
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteQuestion = async (jobId: string, questionId: string) => {
    try {
      const res = await adminFetch(`/api/admin/ai/jobs/${jobId}/question/${questionId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        if (selectedJob && selectedJob.id === jobId) {
          const updated = selectedJob.generatedQuestions.filter((q) => q.id !== questionId);
          setSelectedJob({ ...selectedJob, generatedQuestions: updated });
        }
        setFeedbackMsg('Question removed from review batch.');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const res = await adminFetch(`/api/admin/ai/jobs/${jobId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setJobs(jobs.filter((j) => j.id !== jobId));
        if (selectedJob?.id === jobId) {
          setSelectedJob(jobs.find((j) => j.id !== jobId) || null);
        }
        setFeedbackMsg('Batch deleted.');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveQuestion = async (jobId: string, questionId: string) => {
    try {
      const res = await adminFetch(`/api/admin/ai/jobs/${jobId}/approve-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg('Question approved and added to live Question Bank!');
        setTimeout(() => setFeedbackMsg(''), 4000);

        if (selectedJob && selectedJob.id === jobId) {
          const updatedQuestions = selectedJob.generatedQuestions.map((q) =>
            q.id === questionId ? { ...q, status: 'Approved' as const } : q
          );
          setSelectedJob({ ...selectedJob, generatedQuestions: updatedQuestions });
        }
        fetchJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner - Dual Light/Dark Theme */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>AI Content Engineering Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          AI Studio Prompting & Review Queue
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Generate high-yield draft questions with randomized, balanced answer choices (A, B, C, D) and automated syllabus verification. Review and approve before publishing directly to the live Question Bank.
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Generator Form */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Draft Generation Parameters</span>
          </h2>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Answers evenly distributed across (A, B, C, D)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Exam</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            >
              <option value="JEE">JEE Main</option>
              <option value="NEET">NEET UG</option>
              <option value="Board">CBSE Board</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Chapter</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Kinematics"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Motion in 1D"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard (Advanced)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Count (1 - 10)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
            />
          </div>
        </div>

        {/* Custom Prompt Focus / Instructions */}
        <div className="pt-1">
          <label className="block text-slate-700 dark:text-slate-300 mb-1 text-xs font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>AI Prompting Focus Instructions (Optional):</span>
          </label>
          <input
            type="text"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g. Focus on NCERT numericals, assertion-reason statements, or real-life physics applications"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-medium"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-bold transition shadow-xs disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Synthesizing Questions...' : 'Generate AI Draft Batch'}</span>
          </button>
        </div>
      </div>

      {/* Main Review Grid: Jobs on Left, Draft Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generation Batches */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider">Batch History</h3>
            <button onClick={fetchJobs} title="Refresh batches" className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">No batches generated yet.</div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-3 rounded-xl border transition text-xs relative group ${
                    selectedJob?.id === job.id
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>{job.subject} • {job.exam}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {job.difficulty}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 truncate">{job.chapter}</div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 dark:text-slate-500">
                      <span>{job.generatedQuestions?.length || 0} Questions</span>
                      <span>{new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteJob(job.id);
                    }}
                    title="Delete batch"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Question Review Queue */}
        <div className="lg:col-span-2 space-y-4">
          {selectedJob ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Batch: {selectedJob.subject} - {selectedJob.chapter}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      {selectedJob.exam}
                    </span>
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedJob.generatedQuestions.filter((q) => q.status === 'Approved').length} of{' '}
                    {selectedJob.generatedQuestions.length} questions approved
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Click an option to change the answer</span>
                </div>
              </div>

              {selectedJob.generatedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 transition shadow-xs"
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Question #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400">
                        {q.difficulty}
                      </span>
                      {q.status === 'Approved' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                          Pending Approval
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteQuestion(selectedJob.id, q.id)}
                        title="Remove question from batch"
                        className="text-slate-400 hover:text-rose-500 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </div>

                  {/* Options with Interactive Click-to-Correct */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSetCorrectAnswer(selectedJob.id, q.id, oIdx)}
                          title="Click to mark as correct answer"
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition select-none ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isCorrect && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase font-bold flex items-center gap-1 shrink-0">
                              <Check className="w-3 h-3" /> Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation & Quality Flags */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] block">
                        Solution & Concept:
                      </span>
                      <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                        Automated Checks:
                      </span>
                      {q.qualityFlags?.map((flag, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold flex items-center gap-1 border border-emerald-200 dark:border-emerald-500/20"
                        >
                          <CheckCircle2 className="w-3 h-3" /> {flag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex justify-end gap-2 pt-1">
                    {q.status !== 'Approved' && (
                      <button
                        onClick={() => handleApproveQuestion(selectedJob.id, q.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Publish to Question Bank</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Select a generation batch from the left to inspect and approve questions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
