import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';

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
  const [count, setCount] = useState(3);

  const [generating, setGenerating] = useState(false);
  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<AIJob | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/admin/ai/jobs');
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
    try {
      const res = await fetch('/api/admin/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject,
          chapter,
          topic,
          difficulty,
          count
        })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg(`Generated ${count} draft questions for review.`);
        setTimeout(() => setFeedbackMsg(''), 4000);
        await fetchJobs();
        setSelectedJob(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleApproveQuestion = async (jobId: string, questionId: string) => {
    try {
      const res = await fetch(`/api/admin/ai/jobs/${jobId}/approve-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId })
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg('Question approved and added to live Question Bank!');
        setTimeout(() => setFeedbackMsg(''), 4000);

        // Update local state
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
      {/* Header Banner - Clean Dark Monochrome */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
          <span>AI Content Engineering Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">AI Question Studio & Review Queue</h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          Generate high-yield draft questions with automated verification checks. In accordance with PREPORA quality rules, all AI drafts require human reviewer sign-off before entering live student tests.
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Generator Form */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="font-bold text-sm text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Draft Generation Parameters</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Exam</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            >
              <option value="JEE">JEE Main</option>
              <option value="NEET">NEET UG</option>
              <option value="Board">CBSE Board</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Chapter</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Kinematics"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Motion in 1D"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard (Advanced)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Count (1 - 10)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold transition shadow-xs disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Synthesizing Questions...' : 'Generate AI Draft Batch'}</span>
          </button>
        </div>
      </div>

      {/* Main Review Grid: Jobs on Left, Draft Questions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generation Batches */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Batch History</h3>
            <button onClick={fetchJobs} className="text-slate-400 hover:text-white text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">No batches generated yet.</div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`w-full text-left p-3 rounded-xl border transition text-xs ${
                    selectedJob?.id === job.id
                      ? 'bg-slate-800 border-slate-600 text-white shadow-xs'
                      : 'bg-slate-800/40 border-slate-750 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{job.subject} • {job.exam}</span>
                    <span className="text-[10px] text-slate-300">{job.difficulty}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">{job.chapter}</div>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                    <span>{job.generatedQuestions?.length || 0} Questions</span>
                    <span>{new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Question Review Queue */}
        <div className="lg:col-span-2 space-y-4">
          {selectedJob ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Batch: {selectedJob.subject} - {selectedJob.chapter}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400">
                      {selectedJob.exam}
                    </span>
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {selectedJob.generatedQuestions.filter((q) => q.status === 'Approved').length} of{' '}
                    {selectedJob.generatedQuestions.length} questions approved
                  </div>
                </div>
              </div>

              {selectedJob.generatedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 transition hover:border-slate-750"
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                    <span className="font-bold text-slate-300">Question #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                        {q.difficulty}
                      </span>
                      {q.status === 'Approved' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          Pending Approval
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="text-sm font-semibold text-white leading-relaxed">
                    {q.question}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                          oIdx === q.correctAnswer
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-bold'
                            : 'bg-slate-800/40 border-slate-750 text-slate-300'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                        {oIdx === q.correctAnswer && (
                          <span className="ml-auto text-[10px] text-emerald-400 uppercase font-bold">Correct</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation & Quality Flags */}
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Solution & Concept:</span>
                      <p className="text-slate-300 mt-0.5">{q.explanation}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Automated Checks:</span>
                      {q.qualityFlags?.map((flag, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> {flag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex justify-end gap-2 pt-2">
                    {q.status !== 'Approved' && (
                      <button
                        onClick={() => handleApproveQuestion(selectedJob.id, q.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20"
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
            <div className="p-12 text-center text-slate-500 text-xs bg-slate-900 rounded-2xl border border-slate-800">
              Select a generation batch from the left to inspect and approve questions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
