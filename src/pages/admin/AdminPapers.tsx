import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  ArrowLeft,
  Trash2,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Card, Badge, Button } from '../../components/common/UIComponents';
import { paperService } from '../../services/paperService';

export const AdminPapers: React.FC = () => {
  const navigate = useNavigate();
  const papers = paperService.getAllPapers();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Paper Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Maintain curated sample question sets, board model papers, and official pattern archives.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => alert('New demo paper creation wizard available in Phase 2.')}
          className="font-bold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Upload Sample Paper
        </Button>
      </div>

      {/* Papers Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Paper Title</th>
                <th className="py-3 px-4">Exam</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Questions</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {papers.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{p.title}</td>
                  <td className="py-3 px-4">
                    <Badge variant="brand" size="sm">{p.exam}</Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{p.year}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{p.totalQuestions} Qs</td>
                  <td className="py-3 px-4 font-medium text-slate-600">{p.paperType}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate(`/papers/${p.id}`)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100"
                      title="View Paper"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
