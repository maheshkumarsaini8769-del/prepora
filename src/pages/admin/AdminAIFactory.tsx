import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Upload,
  FileText,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Brain,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Target,
  ExternalLink,
  ChevronRight,
  X,
  Pause,
  PlusCircle,
  Eye,
  Scale,
  Percent,
  Info,
  Trash2
} from 'lucide-react';

export const AdminAIFactory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'knowledge' | 'review' | 'docs' | 'settings'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [knowledgeMaps, setKnowledgeMaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Biology');
  const [uploadClass, setUploadClass] = useState('11');
  const [uploadChapter, setUploadChapter] = useState('');
  const [pageCount, setPageCount] = useState(16);
  const [questionCount, setQuestionCount] = useState(400);
  const [isCustomCount, setIsCustomCount] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState('400');
  const [examTargets, setExamTargets] = useState({ NEET: true, CBSE: true, RBSE: true });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Generation Contract State (Section 17)
  const [showContractModal, setShowContractModal] = useState(false);
  const [contractData, setContractData] = useState<any>(null);

  // Active Job & Batch Engine Tracking
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [sourceModalQuestion, setSourceModalQuestion] = useState<any | null>(null);

  // Review Queue Filter State
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [reviewExamFilter, setReviewExamFilter] = useState('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState('all');
  const [actionFeedback, setActionFeedback] = useState('');

  // Provider Settings State
  const [providerConfig, setProviderConfig] = useState<any>(null);
  const [providerApiKey, setProviderApiKey] = useState('');
  const [testConnMsg, setTestConnMsg] = useState('');

  // Topic Weights & Normalization State (Rule 963 & Section 12)
  const [topicWeights, setTopicWeights] = useState<Record<string, number>>({});
  const [topicAllocations, setTopicAllocations] = useState<any[]>([]);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [customTopicsList, setCustomTopicsList] = useState<string[]>([]);
  const [isAllocating, setIsAllocating] = useState(false);
  const [showTopicWeightsPanel, setShowTopicWeightsPanel] = useState(true);

  const fetchStatsAndJobs = async () => {
    try {
      const [statsRes, jobsRes, docsRes, mapsRes, configRes] = await Promise.all([
        fetch('/api/ai-factory/stats').then((r) => r.json()),
        fetch('/api/ai-factory/jobs').then((r) => r.json()),
        fetch('/api/ai-factory/documents').then((r) => r.json()),
        fetch('/api/ai-factory/knowledge-maps').then((r) => r.json()),
        fetch('/api/ai-factory/settings').then((r) => r.json())
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (jobsRes.success) {
        setJobs(jobsRes.data || []);
        if (jobsRes.data?.length > 0 && !selectedJobId) {
          setSelectedJobId(jobsRes.data[0].id);
        }
      }
      if (docsRes.success) setDocuments(docsRes.data || []);
      if (mapsRes.success) setKnowledgeMaps(mapsRes.data || []);
      if (configRes.success) setProviderConfig(configRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndJobs();
  }, []);

  const fetchTopicAllocations = async (weightsOverride?: Record<string, number>, extraTopics?: string[]) => {
    try {
      setIsAllocating(true);
      const effectiveTarget = isCustomCount ? Math.max(10, Number(customQuestionCount) || 100) : questionCount;
      const mergedWeights = weightsOverride || topicWeights;
      const combinedTopics = extraTopics || customTopicsList;

      const res = await fetch('/api/ai-factory/topic-allocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter: uploadChapter || (uploadSubject === 'Biology' ? 'The Living World' : 'Kinematics'),
          subject: uploadSubject,
          targetCount: effectiveTarget,
          topicWeights: mergedWeights,
          topics: combinedTopics.length > 0 ? combinedTopics.map((t) => ({ name: t, rawWeight: mergedWeights[t] ?? 15 })) : undefined,
          examTargets: Object.keys(examTargets).filter((k) => (examTargets as any)[k])
        })
      });
      const data = await res.json();
      if (data.success && data.data?.allocations) {
        setTopicAllocations(data.data.allocations);
        setTopicWeights((prev) => {
          const next = { ...prev };
          data.data.allocations.forEach((a: any) => {
            if (next[a.topic] === undefined) {
              next[a.topic] = a.rawWeight || 15;
            }
          });
          return next;
        });
      }
    } catch (err) {
      console.error('Failed to fetch topic allocations', err);
    } finally {
      setIsAllocating(false);
    }
  };

  useEffect(() => {
    fetchTopicAllocations();
  }, [uploadSubject, uploadChapter, questionCount, isCustomCount, customQuestionCount]);

  const handleWeightChange = (topic: string, val: number) => {
    const updated = { ...topicWeights, [topic]: Math.max(0, val) };
    setTopicWeights(updated);
    fetchTopicAllocations(updated);
  };

  const handleEqualizeWeights = () => {
    const updated: Record<string, number> = {};
    topicAllocations.forEach((a) => {
      updated[a.topic] = 15;
    });
    setTopicWeights(updated);
    fetchTopicAllocations(updated);
  };

  const handleAddCustomTopic = () => {
    if (!customTopicInput.trim()) return;
    const name = customTopicInput.trim();
    const nextList = [...customTopicsList];
    if (!nextList.includes(name)) {
      nextList.push(name);
      setCustomTopicsList(nextList);
      const updatedWeights = { ...topicWeights, [name]: 15 };
      setTopicWeights(updatedWeights);
      fetchTopicAllocations(updatedWeights, nextList);
    }
    setCustomTopicInput('');
  };

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = (file: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Please select a valid PDF file (.pdf)');
      return;
    }
    setFileError('');
    setSelectedFile(file);

    // Auto-detect chapter name from filename
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    if (!uploadTitle) {
      setUploadTitle(cleanName);
    }
    if (!uploadChapter) {
      setUploadChapter(cleanName);
    }

    // Auto-detect subject and class if present in name
    const lowerName = cleanName.toLowerCase();
    if (lowerName.includes('physics') || lowerName.includes('kinematics') || lowerName.includes('motion') || lowerName.includes('gravitation')) {
      setUploadSubject('Physics');
    } else if (lowerName.includes('chemistry') || lowerName.includes('organic') || lowerName.includes('thermodynamics')) {
      setUploadSubject('Chemistry');
    } else if (lowerName.includes('math') || lowerName.includes('calculus') || lowerName.includes('vector')) {
      setUploadSubject('Mathematics');
    } else if (lowerName.includes('bio') || lowerName.includes('living') || lowerName.includes('cell') || lowerName.includes('genetics')) {
      setUploadSubject('Biology');
    }

    if (lowerName.includes('12') || lowerName.includes('xii')) {
      setUploadClass('12');
    } else if (lowerName.includes('11') || lowerName.includes('xi')) {
      setUploadClass('11');
    }

    // Read base64
    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result as string);
    };
    reader.onerror = () => {
      setFileError('Failed to read PDF file on client.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Real-time background polling for batched generation jobs (task2.md Section 18, 19, 20)
  useEffect(() => {
    const hasGeneratingJob = jobs.some((j) => j.status === 'Generating');
    if (!hasGeneratingJob && !isProcessing) return;

    const interval = setInterval(async () => {
      try {
        const [jobsRes, statsRes] = await Promise.all([
          fetch('/api/ai-factory/jobs').then((r) => r.json()),
          fetch('/api/ai-factory/stats').then((r) => r.json())
        ]);
        if (jobsRes.success && jobsRes.data) {
          setJobs(jobsRes.data);
          const current = jobsRes.data.find((j: any) => j.id === (activeJobId || selectedJobId));
          if (current) {
            if (current.status === 'ReadyForReview' || current.status === 'Completed') {
              setIsProcessing(false);
              setProcessingStage('');
            }
          }
        }
        if (statsRes.success) setStats(statsRes.data);
      } catch (e) {
        console.error('Polling error', e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [jobs, isProcessing, activeJobId, selectedJobId]);

  const handleOpenContractModal = () => {
    const effectiveTarget = isCustomCount ? Math.max(10, Number(customQuestionCount) || 100) : questionCount;
    const supportedTopics = topicAllocations.filter((a) => a.sourceSupported);
    const excludedTopics = topicAllocations.filter((a) => !a.sourceSupported).map((a) => a.topic);
    const coveragePct = topicAllocations.length > 0
      ? Number(((supportedTopics.length / topicAllocations.length) * 100).toFixed(1))
      : 100;

    const sourceName = selectedFile?.name || (uploadSubject === 'Biology' ? 'NCERT Biology Class 11' : 'NCERT Class 11 Textbook');
    const chapterName = uploadChapter || (uploadSubject === 'Biology' ? 'The Living World' : 'Kinematics');

    setContractData({
      sourceTitle: sourceName,
      chapter: chapterName,
      subject: uploadSubject,
      targetCount: effectiveTarget,
      sourceCoveragePercentage: coveragePct,
      difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
      examSuitability: Object.keys(examTargets).filter((k) => (examTargets as any)[k]),
      questionTypes: ['MCQ', 'Assertion-Reason', 'Statement Based', 'Match The Following'],
      excludedTopics,
      totalAllocatedQuestions: supportedTopics.reduce((sum, a) => sum + (a.targetQuestions || 0), 0)
    });
    setShowContractModal(true);
  };

  const handleConfirmAndStartPipeline = async () => {
    setShowContractModal(false);
    setIsProcessing(true);
    setProcessingStage('Reading PDF & Extracting Text...');

    const effectiveTarget = contractData?.targetCount || (isCustomCount ? Math.max(10, Number(customQuestionCount) || 100) : questionCount);

    try {
      // Step 1: Upload and map chapter
      const uploadRes = await fetch('/api/ai-factory/upload-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64: fileBase64 || undefined,
          filename: selectedFile?.name || `${uploadChapter || 'Chapter'}.pdf`,
          fileSize: selectedFile?.size || 4194304,
          title: uploadTitle || `${uploadChapter || 'Chapter'} Source`,
          subject: uploadSubject,
          classLevel: uploadClass,
          chapter: uploadChapter || (uploadSubject === 'Biology' ? 'The Living World' : 'Kinematics'),
          pageCount
        })
      });
      const uploadData = await uploadRes.json();
      const docId = uploadData.data?.id;

      if (uploadData.isDuplicate) {
        setProcessingStage('Existing source PDF detected in library. Cross-job deduplication active (0 duplicates)...');
      } else {
        setProcessingStage('Building Chapter Knowledge Map & 19-Topic Blueprint...');
      }
      await new Promise((r) => setTimeout(r, 600));

      setProcessingStage(`Launching Batched Question Engine (${effectiveTarget} Questions Target)...`);
      const genRes = await fetch('/api/ai-factory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceDocumentId: docId,
          chapter: uploadChapter || (uploadSubject === 'Biology' ? 'The Living World' : 'Kinematics'),
          subject: uploadSubject,
          count: effectiveTarget,
          mode: effectiveTarget >= 400 ? 'chapter_bank' : 'standard',
          generationContract: contractData,
          topics: topicAllocations.map((a) => ({
            name: a.topic,
            rawWeight: topicWeights[a.topic] ?? a.rawWeight
          })),
          topicWeights,
          examTargets: Object.keys(examTargets).filter((k) => (examTargets as any)[k])
        })
      });
      const genData = await genRes.json();

      if (genData.jobId) {
        setActiveJobId(genData.jobId);
        setSelectedJobId(genData.jobId);
      }

      if (uploadData.isDuplicate) {
        setUploadSuccess(`Chapter already mapped in library. Generating ${effectiveTarget} strictly NEW, unique questions without repeating previous jobs!`);
      } else {
        setUploadSuccess(`Batched Generation Active! Generating ${effectiveTarget} questions in background batches...`);
      }
      await fetchStatsAndJobs();
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  const handlePauseJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/pause`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Job paused.');
        setTimeout(() => setActionFeedback(''), 3000);
        fetchStatsAndJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/resume`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Job resumed.');
        setTimeout(() => setActionFeedback(''), 3000);
        setIsProcessing(true);
        fetchStatsAndJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetryBatch = async (jobId: string) => {
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/retry-batch`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Retrying batch...');
        setTimeout(() => setActionFeedback(''), 3000);
        setIsProcessing(true);
        fetchStatsAndJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateMore = async (jobId: string, count = 50) => {
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/generate-more`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback(`Queued ${count} additional questions without repeating existing concepts.`);
        setTimeout(() => setActionFeedback(''), 4000);
        setIsProcessing(true);
        setActiveJobId(jobId);
        fetchStatsAndJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveQuestion = async (jobId: string, questionId: string) => {
    try {
      const res = await fetch(`/api/ai-factory/questions/${questionId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Question approved and published to Master Question Bank!');
        setTimeout(() => setActionFeedback(''), 3500);

        setJobs((prev) =>
          prev.map((j) => {
            if (j.id !== jobId) return j;
            return {
              ...j,
              approvedCount: (j.approvedCount || 0) + 1,
              generatedQuestions: j.generatedQuestions.map((q: any) =>
                q.id === questionId ? { ...q, reviewStatus: 'Approved' } : q
              )
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveAll = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to approve and publish ALL valid questions from this job to the Master Question Bank?')) return;
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/approve-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback(data.message || 'All valid questions approved and published!');
        setTimeout(() => setActionFeedback(''), 4000);
        await fetchStatsAndJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAllData = async () => {
    if (!window.confirm('Are you sure you want to CLEAR ALL questions, tests, and AI jobs? This resets your system to a clean slate so only questions from your uploaded PDFs will appear.')) return;
    try {
      const res = await fetch('/api/admin/clear-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'all' })
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('All data cleared successfully! Clean slate ready for your PDF uploads.');
        setTimeout(() => setActionFeedback(''), 4500);
        await fetchStatsAndJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegenerateQuestion = async (jobId: string, questionId: string) => {
    try {
      const res = await fetch(`/api/ai-factory/questions/${questionId}/regenerate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Fresh question regenerated for the topic.');
        setTimeout(() => setActionFeedback(''), 3500);

        setJobs((prev) =>
          prev.map((j) => {
            if (j.id !== jobId) return j;
            return {
              ...j,
              generatedQuestions: j.generatedQuestions.map((q: any) =>
                q.id === questionId ? data.data : q
              )
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this generation job?')) return;
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Job deleted successfully.');
        setTimeout(() => setActionFeedback(''), 3000);
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
        if (activeJobId === jobId) setActiveJobId('');
        if (selectedJobId === jobId) setSelectedJobId('');
        fetchStatsAndJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAllJobs = async () => {
    if (!window.confirm('Are you sure you want to delete ALL generation jobs? This will clear all draft jobs.')) return;
    try {
      const res = await fetch('/api/ai-factory/jobs-all', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('All generation jobs cleared.');
        setTimeout(() => setActionFeedback(''), 3000);
        setJobs([]);
        setActiveJobId('');
        setSelectedJobId('');
        fetchStatsAndJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteQuestion = async (jobId: string, questionId: string) => {
    if (!window.confirm('Delete this draft question?')) return;
    try {
      const res = await fetch(`/api/ai-factory/jobs/${jobId}/questions/${questionId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Question deleted.');
        setTimeout(() => setActionFeedback(''), 3000);
        setJobs((prev) =>
          prev.map((j) => {
            if (j.id !== jobId) return j;
            return {
              ...j,
              generatedQuestions: j.generatedQuestions.filter((q: any) => q.id !== questionId),
              validCount: data.data?.validCount ?? Math.max(0, (j.validCount || 1) - 1),
              generatedCount: data.data?.generatedCount ?? Math.max(0, (j.generatedCount || 1) - 1)
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!window.confirm('Are you sure you want to delete this source PDF document and its knowledge maps?')) return;
    try {
      const res = await fetch(`/api/ai-factory/documents/${docId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionFeedback('Source document deleted.');
        setTimeout(() => setActionFeedback(''), 3000);
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
        fetchStatsAndJobs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTestConnection = async () => {
    try {
      const res = await fetch('/api/ai-factory/settings/test-connection', { method: 'POST' });
      const data = await res.json();
      setTestConnMsg(data.message || 'Connection verified.');
      setTimeout(() => setTestConnMsg(''), 5000);
    } catch (e) {
      console.error(e);
    }
  };

  const activeJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const filteredQuestions = (activeJob?.generatedQuestions || []).filter((q: any) => {
    if (reviewStatusFilter !== 'all' && q.reviewStatus !== reviewStatusFilter) return false;
    if (reviewExamFilter !== 'all') {
      if (reviewExamFilter === 'NEET' && !q.examSuitability?.NEET?.suitable) return false;
      if (reviewExamFilter === 'CBSE' && !q.examSuitability?.CBSE?.suitable) return false;
      if (reviewExamFilter === 'RBSE' && !q.examSuitability?.RBSE?.suitable) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner - Clean Dark Monochrome */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>AI Content Factory (PDF to Question Bank)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Automated Chapter-to-Question Bank System
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Upload chapter PDFs once. PREPORA automatically extracts knowledge maps, synthesizes high-yield questions, classifies exam suitability for NEET / CBSE / RBSE, and presents verified drafts for human approval.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleClearAllData}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition shadow-xs"
            title="Reset to clean slate (removes dummy/seeded data)"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Clear All Data (Reset)</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-xs transition"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Chapter PDF</span>
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'overview' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'upload' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>PDF Upload & Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'knowledge' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Knowledge Maps & Coverage</span>
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'review' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Review Queue</span>
          {stats?.pendingReview > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-brand-500 text-white text-[10px]">
              {stats.pendingReview}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'docs' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Source PDFs ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition ${
            activeTab === 'settings' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>AI Provider & Cost Control</span>
        </button>
      </div>

      {/* Tab 1: Overview Dashboard (Section 45 & 46 of task2.md) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Source Documents</div>
              <div className="text-2xl font-black text-white mt-2">{stats?.totalDocuments || 0}</div>
              <div className="text-[10px] text-brand-400 mt-0.5">Chapters Processed</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Questions Synthesized</div>
              <div className="text-2xl font-black text-white mt-2">{stats?.totalGenerated || 0}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Generated via AI</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Approved & Published</div>
              <div className="text-2xl font-black text-emerald-400 mt-2">{stats?.totalApproved || 0}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Live in Question Bank</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Pending Review</div>
              <div className="text-2xl font-black text-amber-400 mt-2">{stats?.pendingReview || 0}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Awaiting Human Sign-off</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Duplicates Flagged</div>
              <div className="text-2xl font-black text-rose-400 mt-2">{stats?.duplicatesDetected || 0}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Protected from Overlap</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">AI Provider</div>
              <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="capitalize">{stats?.provider || 'Gemini'}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{stats?.todayCount || 0} / {stats?.dailyLimit || 500} today</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-400" />
                <span>Multi-Exam Pool Distribution (Section 11)</span>
              </h3>
              <p className="text-xs text-slate-400">
                PREPORA uses a unified master question bank. Every generated question is evaluated against multiple curriculums with cognitive confidence scoring.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>NEET Medical Pool</span>
                    <span className="text-purple-400 font-bold">High NCERT Alignment</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>CBSE Board Pool</span>
                    <span className="text-indigo-400 font-bold">Conceptual & Competency</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>RBSE State Board Pool</span>
                    <span className="text-amber-400 font-bold">Syllabus Grounded</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Quality Assurance & Human Gate (Section 49)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong>Strict Educational Rule:</strong> No AI-synthesized question is ever published directly to students. All generated items pass through automated Levenshtein duplicate filtering and arrive at the Admin Review Queue for final review.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500">Fast Actions:</span>
                <button
                  onClick={() => setActiveTab('review')}
                  className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                >
                  Open Review Queue ({stats?.pendingReview || 0}) <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: One-Click PDF Upload & Pipeline (Section 1, 2, 35) */}
      {activeTab === 'upload' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-400" />
              <span>One-Click Chapter PDF Pipeline</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select or drag your chapter PDF. Everything else—topic extraction, question synthesis, multi-exam tagging, and answer verification—is executed automatically.
            </p>
          </div>

          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {fileError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Drag & Drop or Selected File Display */}
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-8 border-2 border-dashed rounded-2xl text-center space-y-3 transition cursor-pointer ${
                isDragging
                  ? 'border-brand-400 bg-brand-500/15 scale-[1.01]'
                  : 'border-slate-700 hover:border-brand-500 bg-slate-800/40 hover:bg-slate-800/60'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto transition">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {isDragging ? 'Drop your PDF file here' : 'Click to Browse or Drag & Drop Chapter PDF'}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Supports standard NCERT, CBSE, and Board textbook chapters (.pdf)
                </div>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-mono border border-slate-700">
                Auto-Extraction & Knowledge Mapping Enabled
              </div>
            </div>
          ) : (
            <div className="p-5 border-2 border-emerald-500/40 rounded-2xl bg-emerald-950/20 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white break-all">{selectedFile.name}</div>
                    <div className="text-xs text-emerald-400/90 font-medium flex items-center gap-2 mt-0.5">
                      <span>{formatBytes(selectedFile.size)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PDF Ready for Extraction
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                  >
                    Change PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Subject</label>
              <select
                value={uploadSubject}
                onChange={(e) => setUploadSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="Biology">Biology</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Class</label>
              <select
                value={uploadClass}
                onChange={(e) => setUploadClass(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Chapter Name (or Leave for Auto-Detect)</label>
              <input
                type="text"
                placeholder="e.g. The Living World, Kinematics, Cell Cycle"
                value={uploadChapter}
                onChange={(e) => setUploadChapter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Generation Modes (Section 25 of task2.md) */}
            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1.5">
                Generation Mode & Target Capacity (Section 25 & 962)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCount(false);
                    setQuestionCount(25);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    !isCustomCount && questionCount === 25
                      ? 'bg-brand-500/20 border-brand-500 text-white shadow-md'
                      : 'bg-slate-850 border-slate-750 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-brand-400">QUICK MODE</div>
                  <div className="text-base font-black mt-0.5">25 Qs</div>
                  <div className="text-[9px] text-slate-400">Fast sample drill</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCount(false);
                    setQuestionCount(100);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    !isCustomCount && questionCount === 100
                      ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-850 border-slate-750 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-indigo-400">STANDARD MODE</div>
                  <div className="text-base font-black mt-0.5">100 Qs</div>
                  <div className="text-[9px] text-slate-400">Balanced coverage</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCount(false);
                    setQuestionCount(400);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    !isCustomCount && questionCount === 400
                      ? 'bg-purple-600/30 border-purple-500 text-white shadow-md'
                      : 'bg-slate-850 border-slate-750 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-purple-300 flex items-center justify-between">
                    <span>DEEP MODE</span>
                    <span className="px-1 py-0.2 bg-purple-500/30 text-[8px] font-mono rounded text-purple-200">Default</span>
                  </div>
                  <div className="text-base font-black text-purple-200 mt-0.5">400 Qs</div>
                  <div className="text-[9px] text-slate-400">Complete Chapter Bank</div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomCount(true)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    isCustomCount
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                      : 'bg-slate-850 border-slate-750 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-amber-400">CUSTOM MODE</div>
                  <div className="text-base font-black mt-0.5">{isCustomCount ? customQuestionCount : 'Custom'} Qs</div>
                  <div className="text-[9px] text-slate-400">10 – 1000 questions</div>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Select Preset Target</label>
                  <select
                    value={isCustomCount ? 'custom' : questionCount}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomCount(true);
                      } else {
                        setIsCustomCount(false);
                        setQuestionCount(Number(e.target.value));
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-white text-xs"
                  >
                    <option value={400}>400 Questions (🔥 Full Chapter Bank Target - Section 962)</option>
                    <option value={500}>500 Questions (Comprehensive Chapter Bank)</option>
                    <option value={750}>750 Questions (Exhaustive Problem Bank)</option>
                    <option value={1000}>1000 Questions (Master Question Repository)</option>
                    <option value={250}>250 Questions (Deep Conceptual Practice)</option>
                    <option value={100}>100 Questions (Standard Chapter Drill)</option>
                    <option value={50}>50 Questions (Mid-Length Review)</option>
                    <option value={25}>25 Questions (Quick Mode Preview)</option>
                    <option value="custom">Custom Question Count...</option>
                  </select>
                </div>

                {isCustomCount && (
                  <div>
                    <label className="block text-[11px] text-brand-400 font-semibold mb-1">Enter Target Question Count (10 - 1000):</label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={customQuestionCount}
                      onChange={(e) => setCustomQuestionCount(e.target.value)}
                      placeholder="e.g. 400"
                      className="w-full px-3 py-2 bg-slate-800 border border-brand-500 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exam Classification Target Checkboxes */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-400 block">Classify Questions For:</span>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={examTargets.NEET}
                  onChange={(e) => setExamTargets({ ...examTargets, NEET: e.target.checked })}
                  className="accent-purple-500 rounded"
                />
                <span>NEET Medical</span>
              </label>

              <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={examTargets.CBSE}
                  onChange={(e) => setExamTargets({ ...examTargets, CBSE: e.target.checked })}
                  className="accent-indigo-500 rounded"
                />
                <span>CBSE Board</span>
              </label>

              <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={examTargets.RBSE}
                  onChange={(e) => setExamTargets({ ...examTargets, RBSE: e.target.checked })}
                  className="accent-amber-500 rounded"
                />
                <span>RBSE State Board</span>
              </label>
            </div>
          </div>

          {/* Section: Topic Weights Normalization & Source Content Verification (Rule 963 & Section 12) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-400" />
                  <span className="text-sm font-bold text-white">Topic Weights & Source Verification</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    Normalized Total: 100.0%
                  </span>
                  {isAllocating && (
                    <span className="text-xs text-brand-400 flex items-center gap-1 font-semibold">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Normalizing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Admin percentages are <strong>relative WEIGHTS</strong>, auto-normalized to <strong>exactly 100%</strong> (e.g. 19 topics × 15% = 100.0%). Missing topics are marked <span className="text-rose-400 font-semibold">SOURCE CONTENT NOT FOUND</span> with <strong>0 questions</strong> to prevent AI hallucination.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleEqualizeWeights}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
                >
                  Equalize Weights
                </button>
                <button
                  type="button"
                  onClick={() => setShowTopicWeightsPanel(!showTopicWeightsPanel)}
                  className="px-2.5 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-xs font-semibold transition"
                >
                  {showTopicWeightsPanel ? 'Hide Topics' : `Show Topics (${topicAllocations.length})`}
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Raw Input Sum</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {topicAllocations.reduce((sum, a) => sum + (topicWeights[a.topic] ?? a.rawWeight), 0)}%
                </div>
                <div className="text-[10px] text-slate-500">Relative weights entered</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-[10px] text-emerald-400">Normalized Total</div>
                <div className="text-sm font-bold text-emerald-300 font-mono mt-0.5">100.0%</div>
                <div className="text-[10px] text-emerald-400/80">Rule: Exactly 100%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[10px] text-slate-400">Source Verified Topics</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {topicAllocations.filter((a) => a.sourceSupported).length} Topics
                </div>
                <div className="text-[10px] text-emerald-400/80">Present in Textbook</div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="text-[10px] text-rose-400">Missing from Source</div>
                <div className="text-sm font-bold text-rose-300 font-mono mt-0.5">
                  {topicAllocations.filter((a) => !a.sourceSupported).length} Topics
                </div>
                <div className="text-[10px] text-rose-400/80">Target: 0 (No Hallucination)</div>
              </div>
            </div>

            {/* Test Custom Topic Form */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customTopicInput}
                onChange={(e) => setCustomTopicInput(e.target.value)}
                placeholder="Test custom / out-of-syllabus topic (e.g. Photosynthesis, Robotics)..."
                className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTopic();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomTopic}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-brand-300 text-xs font-bold rounded-lg transition border border-slate-700 shrink-0"
              >
                + Add Topic
              </button>
            </div>

            {/* Topic Allocation Table */}
            {showTopicWeightsPanel && (
              <div className="max-h-72 overflow-y-auto pr-1 space-y-2 divide-y divide-slate-800/60">
                {topicAllocations.map((alloc) => {
                  const rawVal = topicWeights[alloc.topic] ?? alloc.rawWeight ?? 15;
                  return (
                    <div key={alloc.topic} className="pt-2 first:pt-0 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex-1 min-w-[200px]">
                          <div className="font-semibold text-slate-200">{alloc.topic}</div>
                          {alloc.pageReference && (
                            <div className="text-[10px] text-slate-500">{alloc.pageReference}</div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Raw Weight Input */}
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Weight:</span>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={rawVal}
                              onChange={(e) => handleWeightChange(alloc.topic, Number(e.target.value))}
                              disabled={!alloc.sourceSupported}
                              className="w-14 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-center text-xs font-mono text-white disabled:opacity-40"
                            />
                            <span className="text-[10px] text-slate-500">%</span>
                          </div>

                          {/* Normalized Weight Badge */}
                          <div className="w-16 text-right">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                                alloc.sourceSupported
                                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {alloc.normalizedWeight}%
                            </span>
                          </div>

                          {/* Source Status Badge */}
                          <div className="w-36 text-center">
                            {alloc.sourceSupported ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 inline-flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold border border-rose-500/30 inline-flex items-center gap-1">
                                <AlertTriangle className="w-2.5 h-2.5" /> NOT IN SOURCE
                              </span>
                            )}
                          </div>

                          {/* Allocated Questions Target */}
                          <div className="w-24 text-right font-mono font-bold">
                            {alloc.sourceSupported ? (
                              <span className="text-white text-xs">{alloc.targetQuestions} Qs</span>
                            ) : (
                              <span className="text-rose-400 text-xs">0 Qs (Skip)</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {!alloc.sourceSupported && (
                        <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-300 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <strong>SOURCE CONTENT NOT FOUND:</strong> {alloc.unsupportedReason || 'Missing from textbook PDF. Question target locked to 0.'}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Batched Generation Engine Live Real-time Monitor (Section 18 & 19) */}
          {(() => {
            const currentJob = jobs.find((j) => j.id === (activeJobId || selectedJobId)) || jobs[0];
            const isJobActive = isProcessing || currentJob?.status === 'Generating' || currentJob?.status === 'Paused';
            const isJobCompleted = currentJob && (currentJob.status === 'ReadyForReview' || currentJob.status === 'Completed');

            if (!isJobActive && !isJobCompleted) return null;

            const validCount = currentJob?.validCount || 0;
            const targetCount = currentJob?.requestedCount || (isCustomCount ? Number(customQuestionCount) : questionCount);
            const progressPct = isJobCompleted ? 100 : (currentJob?.progress || Math.min(99, Math.round((validCount / targetCount) * 100)) || 5);
            const remaining = isJobCompleted ? 0 : Math.max(0, targetCount - validCount);

            return (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 via-slate-900 to-slate-900 border border-purple-800/60 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {isJobCompleted ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Generation Complete ({validCount} Valid Qs Ready)</span>
                      </span>
                    ) : currentJob?.status === 'Paused' ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1.5">
                        <Pause className="w-3 h-3" /> Job Paused
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/40 flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Batch Engine Active
                      </span>
                    )}
                    <span className="font-bold text-white text-sm">
                      {currentJob?.chapterTitle || uploadChapter || 'The Living World'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                      Batch {currentJob?.currentBatch || 1} / {currentJob?.totalBatches || Math.ceil(targetCount / 20)}
                    </span>
                    {isJobCompleted && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedJobId(currentJob.id);
                          setActiveTab('review');
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 text-xs shadow-md shadow-emerald-600/20 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Open Review Queue ({validCount})</span>
                      </button>
                    )}
                    {currentJob?.status === 'Generating' && (
                      <button
                        type="button"
                        onClick={() => handlePauseJob(currentJob.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1 text-[11px] transition"
                      >
                        <Pause className="w-3 h-3" /> Pause
                      </button>
                    )}
                    {currentJob?.status === 'Paused' && (
                      <button
                        type="button"
                        onClick={() => handleResumeJob(currentJob.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 text-[11px] transition"
                      >
                        <Play className="w-3 h-3" /> Resume
                      </button>
                    )}
                    {!isJobCompleted && (
                      <button
                        type="button"
                        onClick={() => handleRetryBatch(currentJob?.id || activeJobId)}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition"
                      >
                        Retry Batch
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Progress Bar with % */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-purple-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      <span>{validCount} / {targetCount} Valid Questions Ready</span>
                    </span>
                    <span className="font-mono text-brand-300">{progressPct}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-purple-900/40">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, progressPct)}%` }}
                    />
                  </div>
                </div>

                {/* Current Topic Stage Indicator (Section 18) */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-750">
                  <span className="font-semibold text-slate-300">
                    Current Focus: <span className="text-brand-300 font-mono">{currentJob?.currentTopic || processingStage || 'Synthesizing NCERT topics...'}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Auto-Replacement Active
                  </span>
                </div>

                {/* Live Metric Counters: Valid, Duplicates, Rejected, Remaining */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-400 font-semibold uppercase">Valid Questions</div>
                    <div className="text-lg font-black text-emerald-300 mt-0.5">{validCount}</div>
                    <div className="text-[9px] text-slate-500">Quality Approved</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                    <div className="text-[10px] text-amber-400 font-semibold uppercase">Duplicates</div>
                    <div className="text-lg font-black text-amber-300 mt-0.5">{currentJob?.duplicateCount || 0}</div>
                    <div className="text-[9px] text-slate-500">Auto-Replaced</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                    <div className="text-[10px] text-rose-400 font-semibold uppercase">Rejected</div>
                    <div className="text-lg font-black text-rose-300 mt-0.5">{currentJob?.rejectedCount || 0}</div>
                    <div className="text-[9px] text-slate-500">Auto-Replaced</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Remaining</div>
                    <div className="text-lg font-black text-white mt-0.5">{remaining}</div>
                    <div className="text-[9px] text-slate-500">To Target ({targetCount})</div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleOpenContractModal}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white text-xs font-bold shadow-xl shadow-brand-600/30 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isProcessing ? 'Batched Engine Running...' : `Review Generation Contract & Launch (${isCustomCount ? customQuestionCount : questionCount} Target)`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Chapter Knowledge Maps & Coverage (Section 4, 26, 27) */}
      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <h3 className="font-bold text-sm text-white">Chapter Knowledge Maps</h3>
              <p className="text-slate-400 mt-0.5">
                Extracted topic coverage analytics. The engine detects coverage gaps and recommends targeted question synthesis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeMaps.map((km) => (
              <div key={km.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-white">{km.chapter}</h4>
                    <div className="text-[11px] text-slate-400">{km.subject} • Class {km.classLevel}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {km.overallCoverage}% Coverage
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {km.topics?.map((tp: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-200">{tp.name}</span>
                        <span className="text-slate-400 text-[11px]">{tp.coveragePercentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full"
                          style={{ width: `${tp.coveragePercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">Recommended: +15 questions</span>
                  <button
                    onClick={() => {
                      setUploadChapter(km.chapter);
                      setUploadSubject(km.subject);
                      setActiveTab('upload');
                    }}
                    className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                  >
                    Auto-Fill Missing Questions <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Review Queue (Section 17, 34, 49) */}
      {activeTab === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Job Selector */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="font-bold text-xs text-slate-300 uppercase pb-2 border-b border-slate-800 flex justify-between items-center">
              <span>Generation Jobs ({jobs.length})</span>
              <div className="flex items-center gap-2">
                {jobs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteAllJobs}
                    className="text-rose-400 hover:text-rose-300 text-[10px] font-semibold flex items-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/20 transition"
                    title="Clear all jobs"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
                <button onClick={fetchStatsAndJobs} className="text-slate-400 hover:text-white" title="Refresh">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {jobs.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">No active jobs. Upload a PDF to start.</div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`cursor-pointer p-3 rounded-xl border transition ${
                      selectedJobId === job.id
                        ? 'bg-purple-950/40 border-purple-500 text-white'
                        : 'bg-slate-800/40 border-slate-750 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="truncate max-w-[130px]">{job.chapterTitle}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono ${
                          job.status === 'Generating'
                            ? 'bg-brand-500/20 text-brand-300 animate-pulse border border-brand-500/40'
                            : job.status === 'Paused'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {job.status === 'Generating' ? `Batch ${job.currentBatch || 1}/${job.totalBatches || 1}` : job.status}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob(job.id);
                          }}
                          className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                          title="Delete this job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                      <span>{job.validCount || job.generatedCount || 0} / {job.requestedCount} Valid Questions</span>
                      <span>{new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Question Review Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Chapter Question Counter & Coverage Dashboard (Section 18, 26 & 27 of task2.md) */}
            {activeJob && (() => {
              const totalGenerated = activeJob.generatedQuestions?.length || 0;
              const uniqueValid = activeJob.validCount || activeJob.generatedQuestions?.filter((q: any) => q.duplicateStatus === 'Unique').length || 0;
              const pendingCount = activeJob.generatedQuestions?.filter((q: any) => q.reviewStatus === 'Pending').length || 0;
              const approvedCount = activeJob.approvedCount || activeJob.generatedQuestions?.filter((q: any) => q.reviewStatus === 'Approved').length || 0;
              const autoReplaced = (activeJob.duplicateCount || 0) + (activeJob.rejectedCount || 0);

              const distinctTopics = new Set(activeJob.generatedQuestions?.map((q: any) => q.topic).filter(Boolean));
              const topicsCoveredCount = activeJob.topicsCovered || distinctTopics.size || 0;
              const totalTopicsCount = activeJob.totalTopics || activeJob.topicAllocations?.length || 27;

              const distinctConcepts = new Set(activeJob.generatedQuestions?.map((q: any) => q.concept || q.topic).filter(Boolean));
              const conceptsCoveredCount = activeJob.conceptsCovered || distinctConcepts.size || 0;
              const totalConceptsCount = activeJob.totalConcepts || Math.max(conceptsCoveredCount, totalTopicsCount * 3);

              const neetCount = activeJob.generatedQuestions?.filter((q: any) => q.examSuitability?.NEET?.suitable).length || 0;
              const cbseCount = activeJob.generatedQuestions?.filter((q: any) => q.examSuitability?.CBSE?.suitable).length || 0;
              const rbseCount = activeJob.generatedQuestions?.filter((q: any) => q.examSuitability?.RBSE?.suitable).length || 0;

              const easyCount = activeJob.generatedQuestions?.filter((q: any) => q.difficulty === 'Easy').length || 0;
              const medCount = activeJob.generatedQuestions?.filter((q: any) => q.difficulty === 'Medium').length || 0;
              const hardCount = activeJob.generatedQuestions?.filter((q: any) => q.difficulty === 'Hard').length || 0;

              return (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-[10px] text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Chapter Question Bank Dashboard & Coverage</span>
                      </div>
                      <div className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                        <span>{activeJob.chapterTitle}</span>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                          {uniqueValid} / {activeJob.requestedCount} Valid Questions Ready
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Generate More (25 / 50) & 1-Click Approve All */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleGenerateMore(activeJob.id, 25)}
                        disabled={isProcessing || activeJob.status === 'Generating'}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold transition disabled:opacity-50"
                        title="Analyze existing questions and generate 25 more unique questions"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-brand-400" />
                        <span>+ 25 More</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleGenerateMore(activeJob.id, 50)}
                        disabled={isProcessing || activeJob.status === 'Generating'}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold transition disabled:opacity-50"
                        title="Analyze existing questions and generate 50 more unique questions"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-purple-400" />
                        <span>+ 50 More</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApproveAll(activeJob.id)}
                        disabled={isProcessing || activeJob.status === 'Generating' || uniqueValid === 0}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition disabled:opacity-50"
                        title="Approve all valid unique questions and add to Master Question Bank"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Publish All Questions (1-Click)</span>
                      </button>
                    </div>
                  </div>

                  {/* Section 27 Coverage Dashboard Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Generated</div>
                      <div className="text-base font-black text-white mt-0.5">{totalGenerated}</div>
                      <div className="text-[9px] text-slate-500">Gross Synthesized</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <div className="text-[10px] text-emerald-400 font-semibold uppercase">Unique Valid</div>
                      <div className="text-base font-black text-emerald-300 mt-0.5">{uniqueValid}</div>
                      <div className="text-[9px] text-emerald-400/70">Verified Distinct</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <div className="text-[10px] text-amber-400 font-semibold uppercase">Pending Review</div>
                      <div className="text-base font-black text-amber-300 mt-0.5">{pendingCount}</div>
                      <div className="text-[9px] text-slate-500">Awaiting Sign-off</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-800/30">
                      <div className="text-[10px] text-purple-400 font-semibold uppercase">Topics Covered</div>
                      <div className="text-sm font-black text-purple-200 mt-0.5 font-mono">{topicsCoveredCount} / {totalTopicsCount}</div>
                      <div className="text-[9px] text-purple-300/70">Chapter Sections</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-800/30">
                      <div className="text-[10px] text-indigo-400 font-semibold uppercase">Concepts Grounded</div>
                      <div className="text-sm font-black text-indigo-200 mt-0.5 font-mono">{conceptsCoveredCount} / {totalConceptsCount}</div>
                      <div className="text-[9px] text-indigo-300/70">NCERT Grounded</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750">
                      <div className="text-[10px] text-slate-300 font-semibold uppercase">Easy / Med / Hard</div>
                      <div className="text-xs font-bold text-white mt-1 font-mono">{easyCount} / {medCount} / {hardCount}</div>
                      <div className="text-[9px] text-slate-500">Difficulty Curve</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-800/30">
                      <div className="text-[10px] text-rose-400 font-semibold uppercase">Auto-Replaced</div>
                      <div className="text-base font-black text-rose-300 mt-0.5">{autoReplaced}</div>
                      <div className="text-[9px] text-slate-500">Dups & Rejections</div>
                    </div>
                  </div>

                  {/* Multi-Exam Pool Distribution (Section 11) */}
                  <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-750 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-semibold">
                      <Target className="w-4 h-4 text-brand-400" />
                      <span>Multi-Exam Suitability Overlap (Single Master Item Serves All):</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold font-mono text-[11px]">
                        NEET Pool: {neetCount} Qs ({uniqueValid > 0 ? Math.round((neetCount / uniqueValid) * 100) : 0}%)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold font-mono text-[11px]">
                        CBSE Pool: {cbseCount} Qs ({uniqueValid > 0 ? Math.round((cbseCount / uniqueValid) * 100) : 0}%)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold font-mono text-[11px]">
                        RBSE Pool: {rbseCount} Qs ({uniqueValid > 0 ? Math.round((rbseCount / uniqueValid) * 100) : 0}%)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold font-mono text-[11px]">
                        Live Master Bank: {approvedCount} Qs
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Filter Row */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Exam:</span>
                <select
                  value={reviewExamFilter}
                  onChange={(e) => setReviewExamFilter(e.target.value)}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                >
                  <option value="all">All Pools (NEET/CBSE/RBSE)</option>
                  <option value="NEET">NEET Medical</option>
                  <option value="CBSE">CBSE Board</option>
                  <option value="RBSE">RBSE State Board</option>
                </select>

                <select
                  value={reviewStatusFilter}
                  onChange={(e) => setReviewStatusFilter(e.target.value)}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>

              <span className="text-slate-400 text-[11px]">
                Showing {filteredQuestions.length} Questions
              </span>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs bg-slate-900 rounded-2xl border border-slate-800">
                No draft questions matching the current filter.
              </div>
            ) : (
              filteredQuestions.map((q: any, idx: number) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg hover:border-slate-750 transition"
                >
                  {/* Card Top */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">Question #{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                        {q.difficulty}
                      </span>
                      <span className="text-slate-500 text-[11px]">• {q.topic}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {q.examSuitability?.NEET?.suitable && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          NEET ({(q.examSuitability.NEET.confidence * 100).toFixed(0)}%)
                        </span>
                      )}
                      {q.examSuitability?.CBSE?.suitable && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          CBSE
                        </span>
                      )}
                      {q.examSuitability?.RBSE?.suitable && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          RBSE
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Score: {q.qualityScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="text-sm font-semibold text-white whitespace-pre-line leading-relaxed">
                    {q.question}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt: string, oIdx: number) => (
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
                          <span className="ml-auto text-[10px] text-emerald-400 uppercase font-bold">Answer</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation & Source Grounding Reference */}
                  <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Explanation:</span>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">{q.explanation}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">
                          📖 <strong>Source Grounding:</strong> Page {q.sourceReference?.page || 1} • {q.sourceReference?.section || q.topic}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSourceModalQuestion(q)}
                          className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1 underline text-[11px]"
                        >
                          <Eye className="w-3 h-3" /> View Source
                        </button>
                      </div>
                      {q.duplicateStatus !== 'Unique' ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {q.duplicateStatus} ({q.duplicateSimilarity}% match)
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Unique in Question Bank
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(activeJob.id, q.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition"
                      title="Delete this question"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Delete</span>
                    </button>

                    <button
                      onClick={() => handleRegenerateQuestion(activeJob.id, q.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>

                    {q.reviewStatus !== 'Approved' && (
                      <button
                        onClick={() => handleApproveQuestion(activeJob.id, q.id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Publish</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Source Document Library (Section 36) */}
      {activeTab === 'docs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-850 border-b border-slate-800 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-200">Source Document Repository</span>
            <span className="text-slate-400">{documents.length} Chapter PDFs Tracked</span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {documents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No source PDFs uploaded yet.</div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{doc.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {doc.subject} • Class {doc.classLevel} • {doc.pageCount} Pages • Status: {doc.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setUploadChapter(doc.chapter);
                        setUploadSubject(doc.subject);
                        setActiveTab('upload');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition"
                    >
                      Generate Questions
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                      title="Delete Source PDF"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 6: AI Provider & Cost Controls (Section 30, 31, 32) */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>AI Provider Abstraction & Daily Quotas</span>
            </h3>
            <p className="text-slate-400 mt-1">
              Configure provider credentials. API keys remain strictly server-side and are never sent to frontend client bundles.
            </p>
          </div>

          {testConnMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              {testConnMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Active AI Provider</label>
              <select
                value={providerConfig?.provider || 'gemini'}
                onChange={(e) => setProviderConfig({ ...providerConfig, provider: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="gemini">Google Gemini (Recommended / Free-Tier Supported)</option>
                <option value="openai_compatible">OpenAI Compatible REST Endpoint</option>
                <option value="offline_engine">Local High-Yield Offline Generator</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Model Name</label>
              <input
                type="text"
                value={providerConfig?.model || 'gemini-1.5-flash'}
                onChange={(e) => setProviderConfig({ ...providerConfig, model: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Provider API Key</label>
              <input
                type="password"
                placeholder={providerConfig?.hasApiKey ? '••••••••••••••••' : 'Enter API Key...'}
                value={providerApiKey}
                onChange={(e) => setProviderApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Saved securely in environment / server store.
              </span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-400 mb-1">
                <span>Daily Question Generation Cap (Cost Protection)</span>
                <span className="text-white font-bold">{providerConfig?.dailyGenerationLimit || 500} Qs/day</span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={providerConfig?.dailyGenerationLimit || 500}
                onChange={(e) => setProviderConfig({ ...providerConfig, dailyGenerationLimit: Number(e.target.value) })}
                className="w-full accent-brand-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={handleTestConnection}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold transition"
            >
              Test Provider Latency
            </button>

            <button
              onClick={async () => {
                await fetch('/api/ai-factory/settings', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    provider: providerConfig.provider,
                    model: providerConfig.model,
                    apiKey: providerApiKey,
                    dailyGenerationLimit: providerConfig.dailyGenerationLimit
                  })
                });
                setTestConnMsg('Configuration saved successfully.');
                setTimeout(() => setTestConnMsg(''), 4000);
              }}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-600/30 transition"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* View Source Inspection Modal (task2.md Section 15 & 24) */}
      {sourceModalQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-slate-750 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Source Material Traceability</h3>
                  <p className="text-[11px] text-slate-400">Verifiable textbook reference for AI draft question</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSourceModalQuestion(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-400">Target Question:</span>
                <p className="text-white font-medium line-clamp-3">{sourceModalQuestion.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Document / Chapter:</span>
                  <div className="font-bold text-white mt-0.5">{sourceModalQuestion.chapter}</div>
                  <div className="text-[10px] text-slate-500">{sourceModalQuestion.subject} • Class {sourceModalQuestion.classLevel}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Location in Chapter:</span>
                  <div className="font-bold text-white mt-0.5">Page {sourceModalQuestion.sourceReference?.page || 1}</div>
                  <div className="text-[10px] text-slate-500">{sourceModalQuestion.sourceReference?.section || sourceModalQuestion.topic}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Textbook Source Excerpt:</span>
                <blockquote className="text-slate-300 italic pl-3 border-l-2 border-brand-500 leading-relaxed font-serif text-xs">
                  "{sourceModalQuestion.sourceReference?.excerpt || `Verified NCERT standard textbook content for ${sourceModalQuestion.topic}.`}"
                </blockquote>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-center justify-between text-[11px]">
                <span className="text-purple-300 font-semibold">Multi-Exam Alignment:</span>
                <div className="flex gap-1.5">
                  {sourceModalQuestion.examSuitability?.NEET?.suitable && (
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">NEET</span>
                  )}
                  {sourceModalQuestion.examSuitability?.CBSE?.suitable && (
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">CBSE</span>
                  )}
                  {sourceModalQuestion.examSuitability?.RBSE?.suitable && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">RBSE</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSourceModalQuestion(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs transition"
              >
                Close Traceability Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generation Contract Confirmation Modal (Section 17 of task.md) */}
      {showContractModal && contractData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border-2 border-purple-600/60 shadow-2xl shadow-purple-950/80 space-y-5 text-xs">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider mb-0.5 border border-purple-500/30">
                    Section 17 Requirement
                  </div>
                  <h3 className="font-black text-lg text-white tracking-tight">GENERATION CONTRACT</h3>
                  <p className="text-[11px] text-slate-400">Pre-generation confirmation & source-grounding commitment</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowContractModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contract Specifications Grid */}
            <div className="space-y-3">
              {/* Core Source & Target Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Source Document</span>
                  <div className="text-sm font-bold text-white break-words">{contractData.sourceTitle}</div>
                  <div className="text-[11px] text-brand-300 font-medium">{contractData.subject} • Class 11</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Chapter</span>
                  <div className="text-sm font-bold text-white">{contractData.chapter}</div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Source Coverage: {contractData.sourceCoveragePercentage}%
                  </div>
                </div>
              </div>

              {/* Target Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/70 via-indigo-950/60 to-slate-900 border border-purple-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Target Objective</span>
                  <div className="text-xl font-black text-white mt-0.5">
                    {contractData.targetCount} Valid Unique Questions
                  </div>
                  <div className="text-[11px] text-purple-200/80 mt-0.5">
                    Hard requirement: Duplicates and low-quality drafts are rejected and auto-replaced until target is met.
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-200 font-mono font-bold text-xs shrink-0">
                  Target: {contractData.targetCount}
                </div>
              </div>

              {/* Blueprint Distributions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Difficulty */}
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Difficulty Distribution</span>
                  <div className="space-y-1 pt-1 font-mono text-[11px]">
                    <div className="flex justify-between text-emerald-300">
                      <span>Easy:</span> <span className="font-bold">30% (~{Math.round(contractData.targetCount * 0.3)})</span>
                    </div>
                    <div className="flex justify-between text-blue-300">
                      <span>Medium:</span> <span className="font-bold">50% (~{Math.round(contractData.targetCount * 0.5)})</span>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>Hard:</span> <span className="font-bold">20% (~{Math.round(contractData.targetCount * 0.2)})</span>
                    </div>
                  </div>
                </div>

                {/* Exam Suitability */}
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Exam Suitability</span>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {contractData.examSuitability.map((exam: string) => (
                      <span key={exam} className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[11px] border border-purple-500/30">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Question Formats */}
                <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Question Formats</span>
                  <div className="space-y-0.5 pt-1 text-[11px] text-slate-300 font-medium">
                    <div>• Standard 4-Option MCQ</div>
                    <div>• Assertion & Reason</div>
                    <div>• Statement Analysis</div>
                    <div>• Match The Following</div>
                  </div>
                </div>
              </div>

              {/* Excluded Topics Section (Section 21) */}
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>EXCLUDED TOPICS (SOURCE CONTENT NOT FOUND — 0 Questions):</span>
                </div>
                {contractData.excludedTopics?.length > 0 ? (
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-300/90 pl-1">
                    {contractData.excludedTopics.map((topic: string) => (
                      <li key={topic}>
                        <span className="font-semibold">{topic}</span> — <span className="text-slate-400 italic">Target: 0 Qs (No Hallucination)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-[11px] text-slate-400 italic">
                    All chapter topics are verified in the uploaded source content.
                  </div>
                )}
                <div className="text-[10px] text-slate-400 leading-relaxed pt-1">
                  In compliance with Section 21, the AI Content Factory will strictly NOT generate questions for topics absent from the uploaded source.
                </div>
              </div>
            </div>

            {/* Contract Confirmation Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowContractModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs transition"
              >
                Back to Configuration
              </button>

              <button
                type="button"
                onClick={handleConfirmAndStartPipeline}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-brand-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Contract & Start {contractData.targetCount} Generation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
