import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  FolderTree,
  CreditCard,
  RefreshCw,
  X,
  Tv,
  Calculator,
  Sparkles
} from 'lucide-react';
import { adminFetch } from '../../utils/adminApi';
import { AdminLectureDiscovery } from './AdminLectureDiscovery';
import { MathRenderer } from '../../components/common/MathRenderer';

interface HierarchyItem {
  _id: string;
  id: string;
  exam: string;
  classLevel: string;
  board: string;
  subject: string;
  chapter: string;
  topic: string;
  orderIndex: number;
  status: string;
}

interface FlashcardItem {
  _id: string;
  id: string;
  type: 'formula' | 'flashcard';
  subject: string;
  chapter: string;
  topic?: string;
  front: string;
  back: string;
  explanation?: string;
  difficulty: string;
  tags: string[];
}

export const AdminContentHierarchy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'flashcards' | 'lectures'>('hierarchy');
  const [hierarchy, setHierarchy] = useState<HierarchyItem[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('JEE');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [searchQuery, setSearchQuery] = useState('');

  // New Node Modal
  const [nodeModalOpen, setNodeModalOpen] = useState(false);
  const [newExam, setNewExam] = useState('JEE');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newChapter, setNewChapter] = useState('');
  const [newTopic, setNewTopic] = useState('');

  // New Card Modal (Formula / Flashcard)
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardType, setCardType] = useState<'formula' | 'flashcard'>('formula');
  const [cardSubject, setCardSubject] = useState('Physics');
  const [cardClassLevel, setCardClassLevel] = useState<'11' | '12'>('11');
  const [cardChapter, setCardChapter] = useState('');
  const [cardTopic, setCardTopic] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [cardVariables, setCardVariables] = useState('');
  const [cardExamTip, setCardExamTip] = useState('');
  const [cardExplanation, setCardExplanation] = useState('');
  const [cardDifficulty, setCardDifficulty] = useState<'High' | 'Medium' | 'Low'>('High');

  const fetchHierarchy = async () => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/hierarchy?exam=${selectedExam}&subject=${selectedSubject}`);
      const data = await res.json();
      if (data.success) {
        setHierarchy(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchFlashcards = async () => {
    try {
      const res = await adminFetch(`/api/admin/flashcards?subject=${selectedSubject}`);
      const data = await res.json();
      if (data.success) {
        setFlashcards(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeTab === 'hierarchy') {
      fetchHierarchy();
    } else if (activeTab === 'flashcards') {
      fetchFlashcards();
    }
  }, [selectedExam, selectedSubject, activeTab]);

  const handleCreateNode = async () => {
    if (!newChapter || !newTopic) return;
    try {
      const res = await adminFetch('/api/admin/hierarchy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: newExam,
          subject: newSubject,
          chapter: newChapter,
          topic: newTopic,
          classLevel: '11',
          board: 'CBSE'
        })
      });
      const data = await res.json();
      if (data.success) {
        setNodeModalOpen(false);
        setNewChapter('');
        setNewTopic('');
        fetchHierarchy();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNode = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/hierarchy/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setHierarchy((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCard = async () => {
    if (!cardFront || !cardBack || !cardChapter) return;
    try {
      // 1. If formula, also register in student canonical Formula repository
      if (cardType === 'formula') {
        await fetch('/api/formulas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: cardFront,
            formula: cardBack,
            subject: cardSubject,
            chapter: cardChapter,
            topic: cardTopic || `${cardChapter} Key Concepts`,
            classLevel: cardClassLevel,
            variables: cardVariables,
            explanation: cardExplanation,
            examTip: cardExamTip,
            importance: cardDifficulty
          })
        }).catch(() => null);
      }

      // 2. Register in Flashcard repository
      const res = await adminFetch('/api/admin/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: cardType,
          subject: cardSubject,
          chapter: cardChapter,
          topic: cardTopic,
          front: cardFront,
          back: cardBack,
          explanation: cardExplanation,
          difficulty: cardDifficulty,
          tags: [cardChapter, cardSubject, cardClassLevel]
        })
      });
      const data = await res.json();
      if (data.success) {
        setCardModalOpen(false);
        setCardFront('');
        setCardBack('');
        setCardVariables('');
        setCardExamTip('');
        setCardExplanation('');
        fetchFlashcards();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/flashcards/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFlashcards((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter hierarchy and flashcards by search query
  const filteredHierarchy = hierarchy.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.chapter.toLowerCase().includes(q) || item.topic.toLowerCase().includes(q);
  });

  const filteredFlashcards = flashcards.filter((card) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      card.front.toLowerCase().includes(q) ||
      card.back.toLowerCase().includes(q) ||
      card.chapter.toLowerCase().includes(q) ||
      (card.topic && card.topic.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner - Dual Light/Dark Theme */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Curriculum & Knowledge Tree</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Content & Hierarchy Manager
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage the full hierarchical syllabus tree (Exam → Subject → Chapter → Topic) and review the formula & flashcard repository across all competitive exams.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'hierarchy' && (
            <button
              onClick={() => setNodeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Syllabus Node</span>
            </button>
          )}
          {activeTab === 'flashcards' && (
            <button
              onClick={() => setCardModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Card</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'hierarchy'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Syllabus Hierarchy Tree</span>
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'flashcards'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Formulas & Flashcards Repository</span>
        </button>
        <button
          onClick={() => setActiveTab('lectures')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'lectures'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4 text-emerald-500" />
          <span>Lecture Discovery & YouTube Management</span>
        </button>
      </div>

      {/* Filter & Search Row (Only for hierarchy & flashcards) */}
      {activeTab !== 'lectures' && (
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Target Exam:</span>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="JEE">JEE Main & Advanced</option>
              <option value="NEET">NEET UG</option>
              <option value="Board">CBSE / State Board</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <span>Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter chapter or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => (activeTab === 'hierarchy' ? fetchHierarchy() : fetchFlashcards())}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
        </div>
      )}

      {/* Tab 1: Hierarchy Tree */}
      {activeTab === 'hierarchy' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-850 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {selectedExam} • {selectedSubject} Syllabus Structure ({filteredHierarchy.length} of {hierarchy.length} Topics Mapped)
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fully Mapped to Practice & Formulas</span>
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[700px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">Loading syllabus tree...</div>
            ) : filteredHierarchy.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">
                No syllabus nodes found matching your filter.
              </div>
            ) : (
              filteredHierarchy.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.chapter}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{item.topic}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Class {item.classLevel} • {item.board} • Status: {item.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                      Active
                    </span>
                    <button
                      onClick={() => handleDeleteNode(item.id)}
                      className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition"
                      title="Delete Node"
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

      {/* Tab 2: Flashcards & Formulas Repository */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing {filteredFlashcards.length} cards for {selectedSubject}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlashcards.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400 dark:text-slate-500 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                No cards found matching your query.
              </div>
            ) : (
              filteredFlashcards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-brand-500/40 transition shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        {card.type}
                      </span>
                      <span className="truncate max-w-[150px]">{card.chapter}</span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                          Front (Concept / Law)
                        </div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                          {card.front}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-750 overflow-x-auto">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                          Back (Formula / Identity)
                        </div>
                        {card.type === 'formula' ? (
                          <div className="text-emerald-800 dark:text-emerald-300 font-semibold py-1">
                            <MathRenderer math={card.back} displayMode={true} />
                          </div>
                        ) : (
                          <div className="font-mono text-xs text-emerald-800 dark:text-emerald-300 font-semibold break-words">
                            {card.back}
                          </div>
                        )}
                      </div>
                      {card.explanation && (
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                          {card.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
                      {card.topic || card.chapter}
                    </span>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Lecture Discovery & YouTube Management */}
      {activeTab === 'lectures' && <AdminLectureDiscovery />}

      {/* Node Modal */}
      {nodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Syllabus Node</h3>
              <button onClick={() => setNodeModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Exam</label>
                <select
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="JEE">JEE</option>
                  <option value="NEET">NEET</option>
                  <option value="Board">Board</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Chapter Name</label>
                <input
                  type="text"
                  placeholder="e.g. Thermodynamics, Optics, Matrices"
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Specific Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Carnot Engine, Interference, Inverses"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNodeModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNode}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs"
              >
                Save Node
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {cardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-600/20 text-emerald-500 flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {cardType === 'formula' ? 'Add Master Formula' : 'Create Flashcard'}
                </h3>
              </div>
              <button onClick={() => setCardModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Type</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  >
                    <option value="formula">Formula Card</option>
                    <option value="flashcard">Flashcard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Subject</label>
                  <select
                    value={cardSubject}
                    onChange={(e) => setCardSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Class</label>
                  <select
                    value={cardClassLevel}
                    onChange={(e) => setCardClassLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Priority</label>
                  <select
                    value={cardDifficulty}
                    onChange={(e) => setCardDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                  >
                    <option value="High">High Yield</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Chapter</label>
                  <input
                    type="text"
                    placeholder="e.g. Thermodynamics, Solutions"
                    value={cardChapter}
                    onChange={(e) => setCardChapter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Carnot Engine, Henry's Law"
                    value={cardTopic}
                    onChange={(e) => setCardTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Formula Name / Concept Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Carnot Engine Efficiency & Work Done"
                  value={cardFront}
                  onChange={(e) => setCardFront(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold flex items-center justify-between">
                  <span>LaTeX Math Formula Expression</span>
                  <span className="text-[10px] text-emerald-500 font-bold">Standard LaTeX / Math syntax</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. \eta = 1 - \frac{T_2}{T_1} = \frac{W}{Q_1}"
                  value={cardBack}
                  onChange={(e) => setCardBack(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              {/* Live KaTeX Preview */}
              {cardBack.trim() && (
                <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Math Equation Preview (KaTeX)</span>
                  </div>
                  <div className="py-1 text-center overflow-x-auto text-slate-900 dark:text-white font-semibold">
                    <MathRenderer math={cardBack} displayMode={true} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Variables Definition</label>
                  <input
                    type="text"
                    placeholder="e.g. T1 = Source Temp (K), T2 = Sink Temp (K)"
                    value={cardVariables}
                    onChange={(e) => setCardVariables(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Exam Tip / Trap Warning</label>
                  <input
                    type="text"
                    placeholder="e.g. Always convert temperatures into Kelvin!"
                    value={cardExamTip}
                    onChange={(e) => setCardExamTip(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Short Note / Theory Concept</label>
                <input
                  type="text"
                  placeholder="Optional theoretical derivation or definition..."
                  value={cardExplanation}
                  onChange={(e) => setCardExplanation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCardModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCard}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-xs transition cursor-pointer"
              >
                Save & Publish Formula
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
