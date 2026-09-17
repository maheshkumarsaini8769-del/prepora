import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  Filter,
  Save,
  ArrowLeft,
  History,
  AlertTriangle,
  Upload,
  Download,
  FileSpreadsheet,
  Check,
  X,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Card, Badge, Button, Modal } from '../../components/common/UIComponents';
import { questionService } from '../../services/questionService';
import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../../types';

export const AdminQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(() => questionService.getAllQuestions());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [selectedExam, setSelectedExam] = useState<ExamType | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeView, setActiveView] = useState<'all' | 'review_queue'>('all');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingQuestion, setRejectingQuestion] = useState<Question | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Wrong Answer');
  const [rejectCustomNotes, setRejectCustomNotes] = useState<string>('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // Form State
  const [formExam, setFormExam] = useState<ExamType>('JEE');
  const [formClass, setFormClass] = useState<ClassLevel>('12');
  const [formSubject, setFormSubject] = useState<SubjectName>('Physics');
  const [formChapter, setFormChapter] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('Medium');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptionA, setFormOptionA] = useState('');
  const [formOptionB, setFormOptionB] = useState('');
  const [formOptionC, setFormOptionC] = useState('');
  const [formOptionD, setFormOptionD] = useState('');
  const [formCorrectAns, setFormCorrectAns] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formConcept, setFormConcept] = useState('');

  // Duplicate Warning State
  const [duplicateWarningOpen, setDuplicateWarningOpen] = useState(false);
  const [duplicateMatch, setDuplicateMatch] = useState<any>(null);

  // Version History State
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [questionVersions, setQuestionVersions] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedHistoryQ, setSelectedHistoryQ] = useState<Question | null>(null);

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkEditModalOpen, setBulkEditModalOpen] = useState(false);
  const [bulkDifficulty, setBulkDifficulty] = useState<string>('keep');
  const [bulkStatus, setBulkStatus] = useState<string>('keep');
  const [bulkSubject, setBulkSubject] = useState<string>('keep');
  const [bulkChapter, setBulkChapter] = useState<string>('');

  // Bulk Import State
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importSummary, setImportSummary] = useState<any>(null);
  const [importErrors, setImportErrors] = useState<any[]>([]);
  const [rawImportedQuestions, setRawImportedQuestions] = useState<any[]>([]);
  const [importLoading, setImportLoading] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  // Sync questions from backend on mount
  useEffect(() => {
    fetch('/api/questions?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.questions?.length > 0) {
          setQuestions(data.questions);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = questions.filter((q) => {
    if (activeView === 'review_queue' && q.status !== 'Pending') return false;
    if (selectedSubject !== 'All' && q.subject !== selectedSubject) return false;
    if (selectedExam !== 'All' && q.exam !== selectedExam) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    if (selectedStatus !== 'All' && (q.status || 'Approved') !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchCh = q.chapter.toLowerCase().includes(query);
      const matchTop = q.topic.toLowerCase().includes(query);
      if (!matchQ && !matchCh && !matchTop) return false;
    }
    return true;
  });

  const handleApproveQuestion = async (q: Question) => {
    try {
      await fetch(`/api/questions/${q.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      });
      setQuestions(prev => prev.map(item => item.id === q.id ? { ...item, status: 'Approved' } : item));
    } catch {
      setQuestions(prev => prev.map(item => item.id === q.id ? { ...item, status: 'Approved' } : item));
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingQuestion) return;
    const reasonText = `${rejectReason}${rejectCustomNotes ? `: ${rejectCustomNotes}` : ''}`;
    try {
      await fetch(`/api/questions/${rejectingQuestion.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected', rejectionReason: reasonText })
      });
      setQuestions(prev => prev.map(item => item.id === rejectingQuestion.id ? { ...item, status: 'Rejected', rejectionReason: reasonText } : item));
    } catch {
      setQuestions(prev => prev.map(item => item.id === rejectingQuestion.id ? { ...item, status: 'Rejected', rejectionReason: reasonText } : item));
    } finally {
      setRejectModalOpen(false);
      setRejectingQuestion(null);
      setRejectCustomNotes('');
    }
  };

  const handleOpenCreate = () => {
    setActiveQuestion(null);
    setFormExam('JEE');
    setFormClass('12');
    setFormSubject('Physics');
    setFormChapter('Electromagnetism');
    setFormTopic("Ampere's Law");
    setFormDifficulty('Medium');
    setFormQuestion('');
    setFormOptionA('');
    setFormOptionB('');
    setFormOptionC('');
    setFormOptionD('');
    setFormCorrectAns(0);
    setFormExplanation('');
    setFormConcept('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (q: Question) => {
    setActiveQuestion(q);
    setFormExam(q.exam);
    setFormClass(q.class);
    setFormSubject(q.subject);
    setFormChapter(q.chapter);
    setFormTopic(q.topic);
    setFormDifficulty(q.difficulty);
    setFormQuestion(q.question);
    setFormOptionA(q.options[0] || '');
    setFormOptionB(q.options[1] || '');
    setFormOptionC(q.options[2] || '');
    setFormOptionD(q.options[3] || '');
    setFormCorrectAns(q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormConcept(q.concept);
    setIsEditorOpen(true);
  };

  // Check duplicate before saving
  const handleInitiateSave = async () => {
    if (!formQuestion.trim()) return;

    const payload = {
      question: formQuestion.trim(),
      options: [formOptionA.trim(), formOptionB.trim(), formOptionC.trim(), formOptionD.trim()],
      topic: formTopic.trim(),
      correctAnswer: formCorrectAns,
      excludeId: activeQuestion?.id
    };

    try {
      const res = await fetch('/api/questions/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.result?.isDuplicate && data.result.similarityScore >= 65) {
        setDuplicateMatch(data.result);
        setDuplicateWarningOpen(true);
        return;
      }
    } catch {
      // Continue to direct save if offline
    }

    commitSave();
  };

  const commitSave = async () => {
    setDuplicateWarningOpen(false);

    const payload = {
      exam: formExam,
      class: formClass,
      subject: formSubject,
      chapter: formChapter.trim() || 'General',
      topic: formTopic.trim() || 'General Practice',
      difficulty: formDifficulty,
      question: formQuestion.trim(),
      options: [
        formOptionA.trim() || 'Option A',
        formOptionB.trim() || 'Option B',
        formOptionC.trim() || 'Option C',
        formOptionD.trim() || 'Option D',
      ],
      correctAnswer: formCorrectAns,
      explanation: formExplanation.trim() || 'Comprehensive derivation provided.',
      concept: formConcept.trim() || formTopic.trim(),
      source: 'Original' as const,
      status: 'Approved' as const
    };

    if (activeQuestion) {
      // Update in local service
      questionService.updateQuestion(activeQuestion.id, payload);
      // Sync with backend API
      fetch(`/api/questions/${activeQuestion.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, changeReason: 'Edited by administrator in Admin Console' })
      }).catch(() => {});
    } else {
      const newQ = questionService.addQuestion(payload);
      fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQ)
      }).catch(() => {});
    }

    setQuestions(questionService.getAllQuestions());
    setIsEditorOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question permanently from the repository?')) {
      questionService.deleteQuestion(id);
      fetch(`/api/questions/${id}`, { method: 'DELETE' }).catch(() => {});
      setQuestions(questionService.getAllQuestions());
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleClearAllQuestions = async () => {
    if (!window.confirm('Are you sure you want to delete ALL questions from the repository? This resets the question bank to a clean slate.')) return;
    try {
      await fetch('/api/admin/clear-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'questions' })
      });
      localStorage.removeItem('prepora_questions');
      await questionService.fetchAllQuestionsAsync();
      setQuestions([]);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };

  // Version History Flow
  const handleOpenHistory = async (q: Question) => {
    setSelectedHistoryQ(q);
    setHistoryLoading(true);
    setHistoryModalOpen(true);

    try {
      const res = await fetch(`/api/questions/${q.id}/versions`);
      const data = await res.json();
      if (data.success) {
        setQuestionVersions(data.versions || []);
      }
    } catch {
      setQuestionVersions([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Bulk Selection Helpers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map(q => q.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApplyBulkEdit = async () => {
    if (selectedIds.length === 0) return;

    const updates: any = {};
    if (bulkDifficulty !== 'keep') updates.difficulty = bulkDifficulty;
    if (bulkStatus !== 'keep') updates.status = bulkStatus;
    if (bulkSubject !== 'keep') updates.subject = bulkSubject;
    if (bulkChapter.trim()) updates.chapter = bulkChapter.trim();

    try {
      await fetch('/api/questions/bulk-edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionIds: selectedIds, updates })
      });

      // Update in local state
      setQuestions(prev =>
        prev.map(q => selectedIds.includes(q.id) ? { ...q, ...updates } : q)
      );
      setBulkEditModalOpen(false);
      setSelectedIds([]);
    } catch (err) {
      alert('Failed to apply bulk edit');
    }
  };

  // Excel (.xlsx) and CSV Export
  const handleExportData = (type: 'csv' | 'xlsx') => {
    const exportRows = filtered.map(q => ({
      ID: q.id,
      Exam: q.exam,
      Class: q.class,
      Subject: q.subject,
      Chapter: q.chapter,
      Topic: q.topic,
      Difficulty: q.difficulty,
      Question: q.question,
      Option_A: q.options[0] || '',
      Option_B: q.options[1] || '',
      Option_C: q.options[2] || '',
      Option_D: q.options[3] || '',
      CorrectAnswerIndex: q.correctAnswer,
      Explanation: q.explanation,
      Concept: q.concept,
      Source: q.source,
      Status: (q as any).status || 'Approved'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');

    if (type === 'csv') {
      XLSX.writeFile(workbook, `PREPORA_Questions_${Date.now()}.csv`, { bookType: 'csv' });
    } else {
      XLSX.writeFile(workbook, `PREPORA_Questions_${Date.now()}.xlsx`, { bookType: 'xlsx' });
    }
  };

  // Excel (.xlsx) and CSV File Upload & Parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    setImportSummary(null);
    setImportErrors([]);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const formattedQuestions = rows.map((r, idx) => ({
          id: r.ID || `imp-${Date.now()}-${idx}`,
          exam: r.Exam || 'JEE',
          class: r.Class ? String(r.Class) : '12',
          subject: r.Subject || 'Physics',
          chapter: r.Chapter || 'General',
          topic: r.Topic || 'General Topic',
          difficulty: r.Difficulty || 'Medium',
          question: r.Question || '',
          options: [
            r.Option_A || r['Option A'] || '',
            r.Option_B || r['Option B'] || '',
            r.Option_C || r['Option C'] || '',
            r.Option_D || r['Option D'] || '',
          ].filter(Boolean),
          correctAnswer: r.CorrectAnswerIndex !== undefined ? Number(r.CorrectAnswerIndex) : 0,
          explanation: r.Explanation || 'Detailed step-by-step solution provided.',
          concept: r.Concept || r.Topic || '',
          source: r.Source || 'Original'
        }));

        setRawImportedQuestions(formattedQuestions);

        // Dry-run on backend to validate and detect duplicates
        const dryRes = await fetch('/api/questions/bulk-import?dryRun=true', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: formattedQuestions })
        });
        const dryData = await dryRes.json();

        if (dryData.success) {
          setImportSummary(dryData.summary);
          setImportErrors(dryData.invalidRows || []);
        } else {
          setImportSummary({
            totalRows: formattedQuestions.length,
            validCount: formattedQuestions.length,
            invalidCount: 0,
            duplicateCount: 0
          });
        }
      } catch (err: any) {
        alert(`Failed to parse file: ${err.message}`);
      } finally {
        setImportLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmImport = async () => {
    if (rawImportedQuestions.length === 0) return;
    setImportLoading(true);

    try {
      const res = await fetch('/api/questions/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: rawImportedQuestions })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setImportSuccessMsg(`Successfully imported ${data.summary?.importedCount || rawImportedQuestions.length} questions!`);
        setTimeout(() => {
          setImportSuccessMsg(null);
          setImportModalOpen(false);
          // Refresh list
          fetch('/api/questions?limit=100')
            .then(r => r.json())
            .then(d => { if (d.questions) setQuestions(d.questions); });
        }, 1800);
      }
    } catch {
      alert('Error during import execution.');
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-brand-600 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Question Pool Management</h1>
            <p className="text-xs text-slate-500">
              Audit, create, bulk edit, verify duplicate similarity, and export test questions
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export Dropdown Buttons */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportData('csv')}
            className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            title="Download questions as CSV"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> CSV
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportData('xlsx')}
            className="text-xs font-bold text-slate-700 hover:bg-slate-50"
            title="Download questions as Excel .xlsx"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Excel
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleClearAllQuestions}
            className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200"
            title="Reset repository to clean slate (removes all questions)"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1 text-rose-600" /> Clear All
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setImportSummary(null);
              setImportErrors([]);
              setImportModalOpen(true);
            }}
            className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200"
          >
            <Upload className="w-3.5 h-3.5 mr-1" /> Bulk Import
          </Button>

          <Button size="sm" variant="primary" onClick={handleOpenCreate} className="font-bold text-xs">
            <Plus className="w-4 h-4 mr-1" /> Add Question
          </Button>
        </div>
      </div>

      {/* Bulk Action Strip (When questions are selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-purple-900 text-white rounded-2xl flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-white/20 px-2 py-0.5 rounded-full">{selectedIds.length} Selected</span>
            <span className="hidden sm:inline text-purple-200">Questions ready for batch modification</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setBulkEditModalOpen(true)}
              className="text-xs font-bold bg-white text-purple-900 hover:bg-purple-50"
            >
              <Layers className="w-3.5 h-3.5 mr-1" /> Bulk Edit Fields
            </Button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-purple-300 hover:text-white text-xs px-2 py-1 font-semibold"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* View Switch: All Questions vs Review Queue (Task1.md Section 6) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveView('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition ${
            activeView === 'all'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <span>All Questions ({questions.length})</span>
        </button>
        <button
          onClick={() => setActiveView('review_queue')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition ${
            activeView === 'review_queue'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <span>Review Queue ({questions.filter(q => q.status === 'Pending').length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search statement, chapter, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedSubject === sub
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Exam, Difficulty, Status */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Exam:</span>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Exams</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="Board">Board</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending Review</option>
              <option value="Draft">Draft</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {(selectedExam !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All' || selectedSubject !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedExam('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setSelectedSubject('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-brand-600 hover:text-brand-800 font-bold ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </Card>

      {/* Questions Data Table */}
      <Card className="p-0 overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filtered.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                </th>
                <th className="py-3 px-3">Subject & Chapter</th>
                <th className="py-3 px-4">Statement</th>
                <th className="py-3 px-3">Difficulty</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(q.id)}
                      onChange={() => handleToggleSelect(q.id)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{q.subject}</div>
                    <div className="text-[11px] text-slate-500">{q.chapter}</div>
                  </td>
                  <td className="py-3 px-4 max-w-md font-medium text-slate-700 line-clamp-2">
                    {q.question}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'} size="sm">
                      {q.difficulty}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    {q.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Pending Review
                      </span>
                    ) : q.status === 'Draft' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        Draft
                      </span>
                    ) : q.status === 'Rejected' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200" title={q.rejectionReason || 'Rejected'}>
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Approved
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {q.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApproveQuestion(q)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50"
                            title="Approve and publish question"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setRejectingQuestion(q);
                              setRejectReason('Wrong Answer');
                              setRejectCustomNotes('');
                              setRejectModalOpen(true);
                            }}
                            className="p-1.5 text-rose-600 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                            title="Reject question with reason"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleOpenHistory(q)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                        title="View question version change history"
                      >
                        <History className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(q)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100"
                        title="Edit question"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 1. DUPLICATE WARNING MODAL (Task.md Section 4) */}
      <Modal
        isOpen={duplicateWarningOpen}
        onClose={() => setDuplicateWarningOpen(false)}
        title="⚠️ Possible Duplicate Question Detected"
        maxWidth="max-w-2xl"
        footer={
          <div className="flex flex-wrap gap-2 w-full justify-between items-center">
            <span className="text-[11px] text-amber-700 font-semibold">
              Similarity algorithm: Levenshtein + Jaccard Token Match
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setDuplicateWarningOpen(false)}>
                Edit New
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDuplicateWarningOpen(false);
                  setIsEditorOpen(false);
                }}
                className="border-amber-300 text-amber-900 bg-amber-50"
              >
                Use Existing
              </Button>
              <Button variant="primary" size="sm" onClick={commitSave} className="font-bold bg-amber-600 hover:bg-amber-700 text-white">
                Keep New & Ignore Warning
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-2 text-xs">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>A high-confidence duplicate or similar question already exists in the question bank.</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold font-mono">
              {duplicateMatch?.similarityScore}% Match
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                Existing Question in Database
              </div>
              <p className="text-slate-800 font-medium leading-relaxed">{duplicateMatch?.matchedQuestionText}</p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                <span>Topic: {duplicateMatch?.matchedTopic || 'General'}</span> • <span>ID: {duplicateMatch?.matchedQuestionId}</span>
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <div className="font-bold text-purple-700 uppercase tracking-wider text-[10px] mb-1">
                New Question Being Added
              </div>
              <p className="text-purple-950 font-medium leading-relaxed">{formQuestion}</p>
              <div className="mt-2 pt-2 border-t border-purple-200 text-[11px] text-purple-600">
                <span>Topic: {formTopic || 'General'}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 2. VERSION HISTORY MODAL (Task.md Section 6) */}
      <Modal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        title={`Question Change History: ${selectedHistoryQ?.id}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 py-2 text-xs">
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-900 text-xs">
            <strong>Content Versioning Guarantee:</strong> Historical student test attempts remain permanently linked to their respective version snapshot.
          </div>

          {historyLoading ? (
            <div className="text-center py-6 text-slate-500">Loading version log...</div>
          ) : questionVersions.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              No previous revisions recorded. This question is currently at initial Version 1.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {questionVersions.map((v) => (
                <div key={v.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700">Version {v.versionNumber} Snapshot</span>
                    <span className="text-[11px] text-slate-400">{new Date(v.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-700 font-medium">"{v.snapshot?.question}"</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600">
                    <div>Correct Answer: Option {['A', 'B', 'C', 'D'][v.snapshot?.correctAnswer || 0]}</div>
                    <div>Difficulty: {v.snapshot?.difficulty}</div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Changed by: {v.changedBy} • Reason: {v.changeReason}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* 3. BULK EDIT MODAL (Task.md Section 8) */}
      <Modal
        isOpen={bulkEditModalOpen}
        onClose={() => setBulkEditModalOpen(false)}
        title={`Bulk Edit ${selectedIds.length} Selected Questions`}
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setBulkEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApplyBulkEdit} className="font-bold">
              Apply Changes to {selectedIds.length} Questions
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2 text-xs">
          <p className="text-slate-500">
            Select the fields you want to batch update. Fields left as "Keep Existing" will not be altered.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
              <select
                value={bulkSubject}
                onChange={(e) => setBulkSubject(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              >
                <option value="keep">Keep Existing</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Difficulty</label>
              <select
                value={bulkDifficulty}
                onChange={(e) => setBulkDifficulty(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
              >
                <option value="keep">Keep Existing</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chapter Name (Optional)</label>
            <input
              type="text"
              placeholder="Leave empty to keep existing chapter"
              value={bulkChapter}
              onChange={(e) => setBulkChapter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            />
          </div>
        </div>
      </Modal>

      {/* 4. BULK IMPORT MODAL (Task.md Section 8) */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="Bulk Import Questions (CSV / Excel .xlsx)"
        maxWidth="max-w-2xl"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setImportModalOpen(false)}>
              Cancel
            </Button>
            {importSummary && importSummary.validCount > 0 && (
              <Button
                variant="primary"
                onClick={handleConfirmImport}
                disabled={importLoading}
                className="font-bold bg-emerald-600 hover:bg-emerald-700"
              >
                {importLoading ? 'Importing...' : `Confirm & Import ${importSummary.validCount} Valid Questions`}
              </Button>
            )}
          </div>
        }
      >
        <div className="space-y-4 py-2 text-xs">
          {importSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{importSuccessMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Select CSV or Excel Spreadsheet
            </label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 border border-slate-200 rounded-xl p-2 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              File must contain columns: Subject, Chapter, Topic, Question, Option_A, Option_B, Option_C, Option_D, CorrectAnswerIndex.
            </p>
          </div>

          {importSummary && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Import Validation Summary
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="text-lg font-black text-slate-800">{importSummary.totalRows}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Total Rows</div>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-lg font-black text-emerald-700">{importSummary.validCount}</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Valid</div>
                </div>
                <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
                  <div className="text-lg font-black text-rose-700">{importSummary.invalidCount}</div>
                  <div className="text-[10px] text-rose-600 font-bold">Invalid</div>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-lg font-black text-amber-700">{importSummary.duplicateCount}</div>
                  <div className="text-[10px] text-amber-600 font-bold">Duplicates</div>
                </div>
              </div>

              {importErrors.length > 0 && (
                <div className="mt-3 p-3 bg-rose-50/70 rounded-xl border border-rose-200 text-rose-800 text-[11px] max-h-32 overflow-y-auto">
                  <strong className="block mb-1">Invalid Row Errors:</strong>
                  {importErrors.map((err, i) => (
                    <div key={i}>Row {err.rowNum}: {err.errors?.join(', ')}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* 5. ADD / EDIT QUESTION MODAL */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={activeQuestion ? 'Edit Question' : 'Add New Question to Pool'}
        maxWidth="max-w-2xl"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleInitiateSave} className="font-bold">
              <Save className="w-4 h-4 mr-1" /> Save Question
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Exam</label>
              <select
                value={formExam}
                onChange={(e) => setFormExam(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {['JEE', 'NEET', 'Board'].map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class</label>
              <select
                value={formClass}
                onChange={(e) => setFormClass(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {['11', '12'].map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chapter</label>
              <input
                type="text"
                value={formChapter}
                onChange={(e) => setFormChapter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Difficulty</label>
              <select
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {['Easy', 'Medium', 'Hard'].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Topic</label>
            <input
              type="text"
              value={formTopic}
              onChange={(e) => setFormTopic(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Question Statement</label>
            <textarea
              rows={3}
              value={formQuestion}
              onChange={(e) => setFormQuestion(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800"
            />
          </div>

          {/* 4 Options */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">Options (Select correct option radio)</label>
            {[
              { letter: 'A', val: formOptionA, set: setFormOptionA, idx: 0 },
              { letter: 'B', val: formOptionB, set: setFormOptionB, idx: 1 },
              { letter: 'C', val: formOptionC, set: setFormOptionC, idx: 2 },
              { letter: 'D', val: formOptionD, set: setFormOptionD, idx: 3 },
            ].map((opt) => (
              <div key={opt.letter} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOpt"
                  checked={formCorrectAns === opt.idx}
                  onChange={() => setFormCorrectAns(opt.idx)}
                  className="w-4 h-4 text-brand-600"
                />
                <span className="w-5 text-xs font-bold text-slate-500">{opt.letter}</span>
                <input
                  type="text"
                  value={opt.val}
                  onChange={(e) => opt.set(e.target.value)}
                  placeholder={`Option ${opt.letter} content`}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Explanation</label>
            <textarea
              rows={2}
              value={formExplanation}
              onChange={(e) => setFormExplanation(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
            />
          </div>
        </div>
      </Modal>

      {/* 5. REJECTION REASON MODAL (Task1.md Section 6) */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Question Draft"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Select the primary reason for rejecting this question:
          </p>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Rejection Category</label>
            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Wrong Answer">Wrong Answer</option>
              <option value="Wrong Explanation">Wrong Explanation</option>
              <option value="Ambiguous">Ambiguous Question</option>
              <option value="Duplicate">Duplicate Question</option>
              <option value="Typo">Typo / Grammatical Error</option>
              <option value="Incorrect Concept">Incorrect Concept / Out of Syllabus</option>
              <option value="Poor Quality">Poor Quality Options / Distractors</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Reviewer Notes (Optional)</label>
            <textarea
              rows={3}
              value={rejectCustomNotes}
              onChange={(e) => setRejectCustomNotes(e.target.value)}
              placeholder="Provide specific guidance to help authors correct the question..."
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" onClick={handleConfirmReject}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
