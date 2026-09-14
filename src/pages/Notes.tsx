import React, { useState } from 'react';
import {
  FileEdit,
  Plus,
  Search,
  Trash2,
  Edit3,
  BookOpen,
  Tag,
  Save,
  X
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { StudyNote, SubjectName } from '../types';

export const Notes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState<SubjectName>('Physics');
  const [formChapter, setFormChapter] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');

  const notes = userService.getNotes();

  const filteredNotes = notes.filter((n) => {
    if (selectedSubject !== 'All' && n.subject !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const mTitle = n.title.toLowerCase().includes(q);
      const mContent = n.content.toLowerCase().includes(q);
      const mChapter = n.chapter.toLowerCase().includes(q);
      if (!mTitle && !mContent && !mChapter) return false;
    }
    return true;
  });

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormSubject('Physics');
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

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

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
    window.location.reload();
  };

  const handleDelete = (id: string) => {
    userService.deleteNote(id);
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-2">
            <FileEdit className="w-3.5 h-3.5" />
            <span>Digital Study Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Study Notes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Personal formula sheets, memory shortcuts, and reaction diagrams stored locally.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="font-bold self-start sm:self-auto shadow-md shadow-brand-500/20"
        >
          <Plus className="w-4 h-4" /> Create Note
        </Button>
      </div>

      {/* Search & Subject Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes by keyword or formula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
          {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as (SubjectName | 'All')[]).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubject === sub
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <FileEdit className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800">No Notes Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Click "Create Note" to add your first high-yield note.</p>
          <Button size="sm" onClick={handleOpenCreate}>Create Note Now</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <Card key={note.id} hoverEffect className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <Badge variant="brand">{note.subject}</Badge>
                  <span className="text-[11px] text-slate-400">{note.updatedAt}</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">{note.title}</h3>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{note.chapter}</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-100 max-h-36 overflow-y-auto">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {note.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end gap-1">
                <button
                  onClick={() => handleOpenEdit(note)}
                  className="p-2 text-slate-400 hover:text-brand-600 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Edit note"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Note Title
            </label>
            <input
              type="text"
              placeholder="e.g. Carnot Cycle Thermodynamics Equations"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value as SubjectName)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Chapter
              </label>
              <input
                type="text"
                placeholder="e.g. Thermodynamics"
                value={formChapter}
                onChange={(e) => setFormChapter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Content / Formulas
            </label>
            <textarea
              rows={5}
              placeholder="Write formulas, key takeaways, and mnemonics here..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="Formulas, Shortcut, Must-Revise"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
