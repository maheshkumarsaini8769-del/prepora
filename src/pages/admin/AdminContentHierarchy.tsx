import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  FolderTree,
  FileText,
  CreditCard,
  RefreshCw,
  X
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'flashcards'>('hierarchy');
  const [hierarchy, setHierarchy] = useState<HierarchyItem[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('JEE');
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  // New Node Modal
  const [nodeModalOpen, setNodeModalOpen] = useState(false);
  const [newExam, setNewExam] = useState('JEE');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newChapter, setNewChapter] = useState('');
  const [newTopic, setNewTopic] = useState('');

  // New Card Modal
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardType, setCardType] = useState<'formula' | 'flashcard'>('formula');
  const [cardSubject, setCardSubject] = useState('Physics');
  const [cardChapter, setCardChapter] = useState('');
  const [cardTopic, setCardTopic] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [cardExplanation, setCardExplanation] = useState('');

  const fetchHierarchy = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/hierarchy?exam=${selectedExam}&subject=${selectedSubject}`);
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
      const res = await fetch(`/api/admin/flashcards?subject=${selectedSubject}`);
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
    } else {
      fetchFlashcards();
    }
  }, [activeTab, selectedExam, selectedSubject]);

  const handleCreateNode = async () => {
    if (!newChapter || !newTopic) return;
    try {
      const res = await fetch('/api/admin/hierarchy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: newExam,
          classLevel: '11',
          board: 'CBSE',
          subject: newSubject,
          chapter: newChapter,
          topic: newTopic
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
      const res = await fetch(`/api/admin/hierarchy/${id}`, { method: 'DELETE' });
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
      const res = await fetch('/api/admin/flashcards', {
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
          difficulty: 'Medium',
          tags: [cardChapter, cardSubject]
        })
      });
      const data = await res.json();
      if (data.success) {
        setCardModalOpen(false);
        setCardFront('');
        setCardBack('');
        setCardExplanation('');
        fetchFlashcards();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/flashcards/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFlashcards((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-brand-400" />
            <span>Content & Hierarchy Manager</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Curate the hierarchical syllabus tree and study flashcard repository.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'hierarchy' ? (
            <button
              onClick={() => setNodeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg shadow-brand-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Syllabus Node</span>
            </button>
          ) : (
            <button
              onClick={() => setCardModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-lg shadow-brand-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Create Card</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'hierarchy'
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Syllabus Hierarchy (Exam → Subject → Chapter → Topic)</span>
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'flashcards'
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Formulas & Flashcards Repository</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>Target Exam:</span>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="JEE">JEE Main & Advanced</option>
            <option value="NEET">NEET UG</option>
            <option value="Board">CBSE / State Board</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>

        <button
          onClick={() => (activeTab === 'hierarchy' ? fetchHierarchy() : fetchFlashcards())}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload</span>
        </button>
      </div>

      {/* Tab 1: Hierarchy Tree */}
      {activeTab === 'hierarchy' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-850 text-xs">
            <span className="font-bold text-slate-200">
              {selectedExam} • {selectedSubject} Syllabus Structure ({hierarchy.length} Topics Mapped)
            </span>
            <span className="text-emerald-400 font-semibold">Synced with Practice & Test Blueprint</span>
          </div>

          <div className="divide-y divide-slate-800">
            {loading ? (
              <div className="text-center py-10 text-slate-500 text-xs">Loading hierarchy nodes...</div>
            ) : hierarchy.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No syllabus nodes found for {selectedExam} - {selectedSubject}. Click "Add Syllabus Node" to create one.
              </div>
            ) : (
              hierarchy.map((item, idx) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.chapter}</span>
                        <span className="text-slate-600">→</span>
                        <span className="text-brand-400 font-medium">{item.topic}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Class {item.classLevel} • {item.board} • Status: {item.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                    <button
                      onClick={() => handleDeleteNode(item.id)}
                      className="p-1.5 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition"
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

      {/* Tab 2: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 text-xs bg-slate-900 rounded-2xl border border-slate-800">
              No cards found for {selectedSubject}. Click "Create Card" above to add one.
            </div>
          ) : (
            flashcards.map((card) => (
              <div
                key={card.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-brand-500/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 pb-2 border-b border-slate-800">
                    <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400">{card.type}</span>
                    <span>{card.chapter}</span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Front (Prompt/Title)</div>
                      <div className="font-bold text-sm text-white mt-0.5">{card.front}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-750">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Back (Formula/Answer)</div>
                      <div className="font-mono text-xs text-brand-300 font-semibold mt-1">{card.back}</div>
                    </div>
                    {card.explanation && (
                      <div className="text-[11px] text-slate-400 italic">{card.explanation}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-500 text-[11px]">{card.topic || card.chapter}</span>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Node Modal */}
      {nodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Add Syllabus Node</h3>
              <button onClick={() => setNodeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Exam</label>
                <select
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="JEE">JEE</option>
                  <option value="NEET">NEET</option>
                  <option value="Board">Board</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Chapter Name</label>
                <input
                  type="text"
                  placeholder="e.g. Thermodynamics, Optics, Matrices"
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Specific Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Carnot Engine, Interference, Inverses"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNodeModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNode}
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
              >
                Save Node
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {cardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Create Formula / Flashcard</h3>
              <button onClick={() => setCardModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Type</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="formula">Formula Card</option>
                    <option value="flashcard">Flashcard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Subject</label>
                  <select
                    value={cardSubject}
                    onChange={(e) => setCardSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Chapter</label>
                <input
                  type="text"
                  placeholder="e.g. Kinematics"
                  value={cardChapter}
                  onChange={(e) => setCardChapter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Front (Title / Prompt)</label>
                <input
                  type="text"
                  placeholder="e.g. Maximum Range of Projectile on Horizontal Plane"
                  value={cardFront}
                  onChange={(e) => setCardFront(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Back (Formula / Solution)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. R_max = u^2 / g at theta = 45 degrees"
                  value={cardBack}
                  onChange={(e) => setCardBack(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Explanation / Derivation Tip</label>
                <input
                  type="text"
                  placeholder="Optional context or tip..."
                  value={cardExplanation}
                  onChange={(e) => setCardExplanation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCardModalOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCard}
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
