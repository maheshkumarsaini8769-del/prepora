import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ExternalLink,
  BookOpen,
  CheckSquare,
  FileText,
  FileEdit
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';

export const Bookmarks: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'question' | 'test' | 'paper' | 'note'>('all');

  const bookmarks = userService.getBookmarks();

  const filtered = bookmarks.filter((b) => {
    if (activeTab !== 'all' && b.type !== activeTab) return false;
    return true;
  });

  const handleRemove = (type: any, targetId: string) => {
    userService.toggleBookmark({ type, targetId, title: '' });
    window.location.reload();
  };

  const handleNavigate = (b: any) => {
    if (b.type === 'question') navigate(`/practice`);
    else if (b.type === 'test') navigate(`/tests`);
    else if (b.type === 'paper') navigate(`/papers`);
    else if (b.type === 'note') navigate(`/notes`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5 fill-amber-600" />
          <span>Saved Collections</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Bookmarks</h1>
        <p className="text-sm text-slate-500 mt-1">
          Quickly access bookmarked high-yield questions, mock tests, and revision notes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { key: 'all', label: 'All Items' },
          { key: 'question', label: 'Questions' },
          { key: 'test', label: 'Tests' },
          { key: 'paper', label: 'Papers' },
          { key: 'note', label: 'Notes' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookmarks Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800">No Bookmarks Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Bookmark tricky questions or mock papers while practicing to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <Card key={b.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-brand-600">
                  {b.type === 'question' && <BookOpen className="w-4 h-4" />}
                  {b.type === 'test' && <CheckSquare className="w-4 h-4" />}
                  {b.type === 'paper' && <FileText className="w-4 h-4" />}
                  {b.type === 'note' && <FileEdit className="w-4 h-4" />}
                </div>

                <div>
                  <div className="font-bold text-sm text-slate-900">{b.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {b.subtitle} • Saved on {b.dateAdded}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleNavigate(b)}
                  className="text-xs font-semibold"
                >
                  Open <ExternalLink className="w-3.5 h-3.5" />
                </Button>

                <button
                  onClick={() => handleRemove(b.type, b.targetId)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
