import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileEdit,
  Plus,
  Search,
  Trash2,
  Edit3,
  BookOpen,
  Tag,
  Save,
  X,
  Sparkles,
  BookMarked,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Layers,
  Flame,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { StudyNote, SubjectName, ClassLevel } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import {
  comprehensiveFormulaNotes,
  TopicRevisionItem
} from '../data/comprehensiveFormulaNotes';
import { sortChaptersCanonical } from '../utils/chapterOrder';

export const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  // URL Query Sync
  const urlSubject = searchParams.get('subject') as SubjectName | null;
  const urlChapter = searchParams.get('chapter') || '';
  const urlQ = searchParams.get('q') || '';

  const initialSubject =
    urlSubject && allowedSubjects.includes(urlSubject)
      ? urlSubject
      : 'All';

  const [activeTab, setActiveTab] = useState<'curated' | 'personal'>('curated');
  const [searchQuery, setSearchQuery] = useState(urlQ || urlChapter);
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');

  // Personal Notes State
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState<SubjectName>(allowedSubjects[0] || 'Physics');
  const [formChapter, setFormChapter] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');

  // Personal Notes from user service
  const [personalNotes, setPersonalNotes] = useState<StudyNote[]>(() => userService.getNotes());

  // Re-read personal notes when updated
  const refreshPersonalNotes = () => {
    setPersonalNotes(userService.getNotes());
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Sync state if URL query param changes
  useEffect(() => {
    const s = searchParams.get('subject') as SubjectName | null;
    const c = searchParams.get('chapter') || '';
    const q = searchParams.get('q') || '';
    if (s && allowedSubjects.includes(s)) {
      setSelectedSubject(s);
    }
    if (q || c) {
      setSearchQuery(q || c);
    }
  }, [searchParams, allowedSubjects]);

  // 1. FILTER CURATED HIGH-YIELD REVISION NOTES
  const filteredCuratedNotes = useMemo(() => {
    const filtered = comprehensiveFormulaNotes.filter((item) => {
      if (!isSubjectAllowedForExam(item.subject, user.targetExam)) return false;
      if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;
      if (!searchQuery.trim() && selectedClass !== 'All' && item.classLevel !== selectedClass) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesChapter = item.chapter.toLowerCase().includes(q);
        const matchesTopic = item.topic.toLowerCase().includes(q);
        const matchesConcept = item.concept.toLowerCase().includes(q);
        const matchesNotes = item.shortNotes.some((n) => n.toLowerCase().includes(q));
        const matchesKeyPoints = item.keyPoints?.some((k) => k.toLowerCase().includes(q));
        const matchesFormulas = item.formulas.some(
          (f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q)
        );

        // Also check individual words for multi-word phrases
        const words = q.split(/\s+/).filter((w) => w.length > 2);
        const wordMatch =
          words.length > 1 &&
          words.some(
            (w) =>
              item.chapter.toLowerCase().includes(w) ||
              item.topic.toLowerCase().includes(w) ||
              item.concept.toLowerCase().includes(w)
          );

        return matchesChapter || matchesTopic || matchesConcept || matchesNotes || matchesKeyPoints || matchesFormulas || wordMatch;
      }

      return true;
    });

    return sortChaptersCanonical(filtered, (item) => item.chapter, (item) => item.subject);
  }, [selectedSubject, selectedClass, searchQuery, user.targetExam]);

  // 2. FILTER PERSONAL USER NOTES
  const filteredPersonalNotes = useMemo(() => {
    return personalNotes.filter((n) => {
      if (!isSubjectAllowedForExam(n.subject, user.targetExam)) return false;
      if (selectedSubject !== 'All' && n.subject !== selectedSubject) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mTitle = n.title.toLowerCase().includes(q);
        const mContent = n.content.toLowerCase().includes(q);
        const mChapter = n.chapter.toLowerCase().includes(q);
        if (!mTitle && !mContent && !mChapter) return false;
      }
      return true;
    });
  }, [personalNotes, selectedSubject, searchQuery, user.targetExam]);

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormSubject(allowedSubjects[0] || 'Physics');
    setFormChapter('');
    setFormContent('');
    setFormTags('Formulas, Notes');
    setIsNewModalOpen(true);
  };

  const handleOpenEdit = (note: StudyNote) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormSubject(note.subject);
    setFormChapter(note.chapter);
    setFormContent(note.content);
    setFormTags(note.tags.join(', '));
  };

  const handleSaveNote = () => {
    if (!formTitle.trim() || !formContent.trim()) return;

    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    userService.saveNote({
      id: editingNote?.id,
      title: formTitle.trim(),
      subject: formSubject,
      chapter: formChapter.trim() || 'General',
      content: formContent.trim(),
      tags: tagsArray
    });

    setIsNewModalOpen(false);
    setEditingNote(null);
    refreshPersonalNotes();
    showToast(editingNote ? 'Note updated successfully!' : 'Note saved to your personal journal!');
  };

  const handleDelete = (id: string) => {
    userService.deleteNote(id);
    refreshPersonalNotes();
    showToast('Note deleted.');
  };

  // One-click save curated note to personal notes
  const handleSaveCuratedToPersonal = (item: TopicRevisionItem) => {
    const formattedContent = [
      `CONCEPT: ${item.concept}`,
      '',
      'KEY POINTS:',
      ...item.shortNotes.map((n) => `• ${n}`),
      ...(item.keyPoints ? ['', 'EXAM TAKEAWAYS:', ...item.keyPoints.map((k) => `★ ${k}`)] : []),
      ...(item.formulas.length > 0
        ? ['', 'FORMULAS:', ...item.formulas.map((f) => `${f.name}: ${f.formula}`)]
        : [])
    ].join('\n');

    userService.saveNote({
      title: `${item.topic} — High Yield Notes`,
      subject: item.subject,
      chapter: item.chapter,
      content: formattedContent,
      tags: ['Curated', 'HighYield', item.weightage]
    });

    refreshPersonalNotes();
    showToast(`Copied "${item.topic}" to your Personal Notes!`);
  };

  const handleCopySummary = (item: TopicRevisionItem) => {
    const text = `${item.topic} (${item.chapter} - ${item.subject})\n\n${item.concept}\n\nKey Points:\n${item.shortNotes.map((n) => `- ${n}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2">
            <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
            <span>High-Yield Topper Notes & Personal Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Comprehensive Study Notes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Curated chapter revision notes for {user.targetExam || 'JEE & NEET'} plus your custom study journal.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="primary"
            onClick={handleOpenCreate}
            className="font-bold shadow-md shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" /> Create My Note
          </Button>
        </div>
      </div>

      {/* Main Mode Toggle: Curated Chapter Notes vs Personal Journal */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('curated')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'curated'
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Curated Chapter Notes ({filteredCuratedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'personal'
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>My Personal Journal ({personalNotes.length})</span>
        </button>
      </div>

      {/* Search & Subject Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeTab === 'curated'
                ? "Search 530+ chapter notes by topic or keyword (e.g. Mole Concept, Kinematics)..."
                : "Search your personal notes..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-8 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubject === sub
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}

          {activeTab === 'curated' && (
            <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
              {(['All', '11', '12'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                    selectedClass === cls
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: CURATED CHAPTER NOTES (530+ Topics) */}
      {/* ======================================================== */}
      {activeTab === 'curated' && (
        <div>
          {filteredCuratedNotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#0c131a] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                No matching curriculum notes found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with a broader keyword (e.g. "Kinematics", "Thermodynamics", "Bonding").
              </p>
              <Button size="sm" variant="outline" onClick={() => { setSearchQuery(''); setSelectedSubject('All'); }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCuratedNotes.map((item) => (
                <Card
                  key={item.id}
                  className="p-5 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-xs"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="brand" size="sm">{item.subject}</Badge>
                        <span className="text-[10px] font-bold text-slate-400">Class {item.classLevel}</span>
                        {item.weightage === 'High' && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Flame className="w-3 h-3 text-amber-500" />
                            <span>High Weightage</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{item.chapter}</span>
                    </div>

                    {/* Topic Title */}
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                      {item.topic}
                    </h3>

                    {/* Core Concept Box */}
                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                      <strong>Concept: </strong>{item.concept}
                    </div>

                    {/* Short Notes Bullets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        High-Yield Revision Points:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {item.shortNotes.slice(0, 3).map((sn, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{sn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Formula Snippet preview if available */}
                    {item.formulas && item.formulas.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 space-y-1 overflow-x-auto">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>Key Formula: {item.formulas[0].name}</span>
                        </div>
                        <div className="text-center py-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                          <MathRenderer math={`\\[${item.formulas[0].formula}\\]`} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSaveCuratedToPersonal(item)}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Copy into your personal notes editor"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to My Notes</span>
                      </button>

                      <button
                        onClick={() => handleCopySummary(item)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          navigate(
                            `/formula-sheet?subject=${encodeURIComponent(item.subject)}&chapter=${encodeURIComponent(item.chapter)}`
                          )
                        }
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span>Formula Sheet</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MY PERSONAL JOURNAL */}
      {/* ======================================================== */}
      {activeTab === 'personal' && (
        <div>
          {filteredPersonalNotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#0c131a] rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <FileEdit className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                Your Personal Notebook is Empty
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Write your own custom memory shortcuts, or save any curated note from the "Curated Chapter Notes" tab!
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button size="sm" onClick={handleOpenCreate}>
                  <Plus className="w-4 h-4" /> Create Custom Note
                </Button>
                <Button size="sm" variant="outline" onClick={() => setActiveTab('curated')}>
                  Explore Curated Notes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPersonalNotes.map((note) => (
                <Card key={note.id} hoverEffect className="flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <Badge variant="brand">{note.subject}</Badge>
                      <span className="text-[11px] text-slate-400">{note.updatedAt}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        {note.title}
                      </h3>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{note.chapter}</div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 max-h-48 overflow-y-auto">
                      {note.content}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {note.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleOpenEdit(note)}
                      className="p-2 text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Note Modal */}
      <Modal
        isOpen={isNewModalOpen || Boolean(editingNote)}
        onClose={() => {
          setIsNewModalOpen(false);
          setEditingNote(null);
        }}
        title={editingNote ? 'Edit Study Note' : 'Create New Note'}
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsNewModalOpen(false);
                setEditingNote(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveNote} className="font-bold">
              <Save className="w-4 h-4" /> Save Note
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              Note Title
            </label>
            <input
              type="text"
              placeholder="e.g. Carnot Cycle Thermodynamics Equations"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value as SubjectName)}
                className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {allowedSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                Chapter
              </label>
              <input
                type="text"
                placeholder="e.g. Thermodynamics"
                value={formChapter}
                onChange={(e) => setFormChapter(e.target.value)}
                className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              Content / Formulas
            </label>
            <textarea
              rows={5}
              placeholder="Write formulas, key takeaways, and mnemonics here..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="Formulas, Shortcut, Must-Revise"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
