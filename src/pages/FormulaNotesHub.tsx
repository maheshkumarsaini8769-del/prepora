import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Layers,
  ChevronRight,
  Flame,
  Calendar,
  X,
  Download,
  Printer,
  PlusCircle,
  FileText,
  Ruler,
  Zap,
  Atom,
  Orbit,
  Dna,
  FlaskConical
} from 'lucide-react';
import { Button } from '../components/common/UIComponents';
import { MathRenderer } from '../components/common/MathRenderer';
import { userService } from '../services/userService';
import { ecosystemService } from '../services/ecosystemService';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { SubjectName, ClassLevel } from '../types';
import { continueLearningService } from '../services/continueLearningService';
import {
  comprehensiveFormulaNotes,
  TopicRevisionItem,
  TopicFormula
} from '../data/comprehensiveFormulaNotes';
import { sortChaptersCanonical } from '../utils/chapterOrder';

// Helper to return thematic icons for chapters
function getChapterIcon(chapter: string, subject: string) {
  const c = chapter.toLowerCase();
  if (c.includes('unit') || c.includes('measure') || c.includes('dimension') || c.includes('error')) {
    return <Ruler className="w-5 h-5 text-emerald-400" />;
  }
  if (c.includes('straight line') || c.includes('motion') || c.includes('kinematic') || c.includes('laws of motion')) {
    return <Zap className="w-5 h-5 text-emerald-400" />;
  }
  if (c.includes('plane') || c.includes('vector') || c.includes('projectile') || c.includes('circular') || c.includes('rotat')) {
    return <Orbit className="w-5 h-5 text-emerald-400" />;
  }
  if (c.includes('gravitat') || c.includes('planet') || c.includes('orbit')) {
    return <Orbit className="w-5 h-5 text-emerald-400" />;
  }
  if (c.includes('atom') || c.includes('nuclei') || c.includes('dual') || c.includes('ray') || c.includes('wave')) {
    return <Atom className="w-5 h-5 text-emerald-400" />;
  }
  if (subject === 'Biology' || c.includes('cell') || c.includes('reproduction') || c.includes('genet') || c.includes('plant') || c.includes('human')) {
    return <Dna className="w-5 h-5 text-emerald-400" />;
  }
  if (subject === 'Chemistry' || c.includes('thermo') || c.includes('equil') || c.includes('mole') || c.includes('bond') || c.includes('electro')) {
    return <FlaskConical className="w-5 h-5 text-emerald-400" />;
  }
  return <BookOpen className="w-5 h-5 text-emerald-400" />;
}

// Helper to merge dynamically fetched or admin-created formulas into master formula list
function mergeServerFormulas(
  base: TopicRevisionItem[],
  serverList: any[]
): TopicRevisionItem[] {
  if (!serverList || serverList.length === 0) return base;

  const result: TopicRevisionItem[] = base.map((item) => ({
    ...item,
    formulas: [...item.formulas]
  }));

  const itemMap = new Map<string, TopicRevisionItem>();
  result.forEach((item) => {
    const key = `${item.subject.toLowerCase()}:::${item.chapter.toLowerCase()}:::${item.topic.toLowerCase()}`;
    itemMap.set(key, item);
  });

  serverList.forEach((sf) => {
    if (!sf.formula || !sf.title || !sf.chapter) return;
    const sub = (sf.subject as SubjectName) || 'Physics';
    const ch = sf.chapter.trim();
    const top = sf.topic ? sf.topic.trim() : 'Core Concepts';
    const key = `${sub.toLowerCase()}:::${ch.toLowerCase()}:::${top.toLowerCase()}`;

    const existingItem = itemMap.get(key);

    const newFormula: TopicFormula = {
      name: sf.title,
      formula: sf.formula,
      variables: sf.variables || '',
      examTip: sf.examTip || sf.explanation || '',
      trap: sf.trap || undefined,
      example: sf.example || {
        problem: `Exam application for ${sf.title}: Calculate the target quantity when standard test parameters are given.`,
        solution: `1. Substitute values into formula: ${sf.formula.slice(0, 40)}.\n2. Calculate result with appropriate SI units.`
      }
    };

    if (existingItem) {
      const alreadyHas = existingItem.formulas.some(
        (f) =>
          f.name.toLowerCase() === newFormula.name.toLowerCase() ||
          f.formula.trim() === newFormula.formula.trim()
      );
      if (!alreadyHas) {
        existingItem.formulas.push(newFormula);
      }
    } else {
      const newItem: TopicRevisionItem = {
        id: `srv-${sf._id || sf.id || Math.random().toString(36).substring(2, 9)}`,
        subject: sub,
        classLevel: (sf.classLevel === '12' ? '12' : '11') as ClassLevel,
        chapter: ch,
        topic: top,
        weightage: (sf.importance as any) || 'Medium',
        examTarget: 'Both',
        concept: sf.explanation || `${ch} - ${top}`,
        shortNotes: sf.examTip ? [sf.examTip] : ['Key formula from curriculum.'],
        formulas: [newFormula],
        keyPoints: [sf.examTip || 'Important for exam revision.']
      };
      result.push(newItem);
      itemMap.set(key, newItem);
    }
  });

  return result;
}

// --- Intelligent Search Utilities with Stemming & LaTeX Formula Tolerance ---
export function cleanStemWord(w: string): string {
  let s = w.toLowerCase().replace(/[''’`]/g, '');
  if (s.endsWith('ies')) return s.slice(0, -3) + 'y';
  if (s.endsWith('es')) return s.slice(0, -2);
  if (s.endsWith('s') && !s.endsWith('ss')) return s.slice(0, -1);
  if (s.endsWith('ing')) return s.slice(0, -3);
  if (s.endsWith('tion')) return s.slice(0, -4);
  if (s.endsWith('ic')) return s.slice(0, -2);
  return s;
}

export function normalizeSearchText(text: string): string {
  return String(text || '')
    .toLowerCase()
    .replace(/[''’`]/g, '')
    .replace(/\\/g, ' ')
    .replace(/[^\w\s\+\-\*\/\=\^]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchSearchQuery(
  item: TopicRevisionItem,
  query: string
): { matches: boolean; matchingFormulaIndices: Set<number> } {
  const normQ = normalizeSearchText(query);
  if (!normQ) return { matches: true, matchingFormulaIndices: new Set() };

  const tokens = normQ.split(' ').filter(Boolean);
  if (tokens.length === 0) return { matches: true, matchingFormulaIndices: new Set() };

  // Compact alphanum string for matching formula codes (e.g. "pv=nrt", "v=ir", "f=ma", "e=mc2")
  const qAlphanum = normQ.replace(/[^a-z0-9]/g, '');

  const topicContext = normalizeSearchText(
    `${item.subject} ${item.chapter} ${item.topic} ${item.concept} ${(item.shortNotes || []).join(' ')} ${(item.keyPoints || []).join(' ')}`
  );

  const matchingFormulaIndices = new Set<number>();

  item.formulas.forEach((f, idx) => {
    const fFormulaAlphanum = (f.formula || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const formulaSelfText = normalizeSearchText(
      `${f.name} ${f.formula} ${f.variables || ''} ${f.examTip || ''} ${f.trap || ''} ${f.example?.problem || ''} ${f.example?.solution || ''}`
    );
    const combinedContext = `${topicContext} ${formulaSelfText}`;

    // 1. Direct alphanum formula code match
    if (qAlphanum.length >= 2 && fFormulaAlphanum.includes(qAlphanum)) {
      matchingFormulaIndices.add(idx);
      return;
    }

    // 2. All tokens present in formula combined context (including chapter/topic context)
    const allTokensMatch = tokens.every((tok) => {
      const tokClean = normalizeSearchText(tok);
      if (combinedContext.includes(tokClean)) return true;
      const st = cleanStemWord(tokClean);
      if (st.length >= 3 && combinedContext.includes(st)) return true;
      return false;
    });

    if (allTokensMatch) {
      matchingFormulaIndices.add(idx);
    }
  });

  // Topic-level match check (if user searched for the chapter or topic generally, e.g. "projectile motion")
  const topicMatches = tokens.every((tok) => {
    const tokClean = normalizeSearchText(tok);
    if (topicContext.includes(tokClean)) return true;
    const st = cleanStemWord(tokClean);
    if (st.length >= 3 && topicContext.includes(st)) return true;
    return false;
  });

  // If entire topic matched, tag all formula indices so all formulas are shown
  if (topicMatches && matchingFormulaIndices.size === 0) {
    item.formulas.forEach((_, idx) => matchingFormulaIndices.add(idx));
  }

  const matches = topicMatches || matchingFormulaIndices.size > 0;
  return { matches, matchingFormulaIndices };
}

// --- Main Formula & Short Notes Hub Component ---
export const FormulaNotesHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();

  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const initialSubject =
    (searchParams.get('subject') as SubjectName) ||
    (allowedSubjects.includes('Physics') ? 'Physics' : allowedSubjects[0]);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  // Dedicated Chapter View State (Synced with URL ?chapter=...)
  const [selectedChapter, setSelectedChapter] = useState<string>(() => {
    return searchParams.get('chapter') || '';
  });

  // Filter topics within the dedicated chapter view
  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('All');
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>('');

  // Bookmarks in localStorage
  const [bookmarkedFormulaIds, setBookmarkedFormulaIds] = useState<Set<string>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_bookmarked_formulas') || '[]');
      return new Set(stored);
    } catch {
      return new Set();
    }
  });

  const [copiedFormulaName, setCopiedFormulaName] = useState<string | null>(null);
  const [plannerMsg, setPlannerMsg] = useState<string | null>(null);

  // Dynamic Master Formulas (Merged with Server & Admin-created formulas)
  const [allNotes, setAllNotes] = useState<TopicRevisionItem[]>(() => {
    try {
      const localCustom = JSON.parse(localStorage.getItem('prepora_custom_formulas') || '[]');
      if (localCustom && localCustom.length > 0) {
        return mergeServerFormulas(comprehensiveFormulaNotes, localCustom);
      }
    } catch {}
    return comprehensiveFormulaNotes;
  });

  // Admin Add Formula Modal State
  const [addFormulaModalOpen, setAddFormulaModalOpen] = useState<boolean>(false);
  const [newFormulaForm, setNewFormulaForm] = useState<{
    subject: SubjectName;
    classLevel: ClassLevel;
    chapter: string;
    topic: string;
    title: string;
    formula: string;
    variables: string;
    examTip: string;
    trap: string;
    exampleProblem: string;
    exampleSolution: string;
    importance: 'High' | 'Medium' | 'Low';
  }>({
    subject: selectedSubject === 'All' ? 'Physics' : selectedSubject,
    classLevel: '11',
    chapter: '',
    topic: '',
    title: '',
    formula: '',
    variables: '',
    examTip: '',
    trap: '',
    exampleProblem: '',
    exampleSolution: '',
    importance: 'High'
  });
  const [savingFormula, setSavingFormula] = useState<boolean>(false);

  // Sync state when URL params change
  useEffect(() => {
    const ch = searchParams.get('chapter');
    if (ch !== null && ch !== selectedChapter) {
      setSelectedChapter(ch);
      setActiveTopicFilter('All');
    }
    const sub = searchParams.get('subject');
    if (sub && sub !== selectedSubject) {
      const match = allowedSubjects.find((s) => s.toLowerCase() === sub.toLowerCase());
      if (match) setSelectedSubject(match);
    }
  }, [searchParams]);

  const handleSelectChapter = (chapterName: string, subject: SubjectName) => {
    setSelectedChapter(chapterName);
    setActiveTopicFilter('All');
    setChapterSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.set('subject', subject);
    newParams.set('chapter', chapterName);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    continueLearningService.recordActivity({
      type: 'formula',
      title: `${subject} • ${chapterName}`,
      subtitle: 'Formula & Worked Examples Sheet',
      subject: subject,
      chapter: chapterName,
      url: `/formula-sheet?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapterName)}`
    });
  };

  const handleBackToChapters = () => {
    setSelectedChapter('');
    setActiveTopicFilter('All');
    setChapterSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('chapter');
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToPlanner = (chapterName: string, topicName?: string) => {
    const days: ('Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const currentDay = days[new Date().getDay()];

    const chItem = allNotes.find((it) => it.chapter === chapterName);
    const effectiveSubject = chItem?.subject || (selectedSubject === 'All' ? 'Physics' : selectedSubject);

    ecosystemService.addPlannerTask({
      day: currentDay,
      subject: effectiveSubject,
      chapter: chapterName,
      taskType: 'Revision',
      durationMinutes: 45,
      completed: false,
      notes: `Formula sheet revision: ${topicName || chapterName}`
    });
    setPlannerMsg(`Added "${topicName || chapterName}" to your Study Planner!`);
    setTimeout(() => setPlannerMsg(null), 3000);
  };

  const toggleBookmarkFormula = useCallback((formulaId: string) => {
    setBookmarkedFormulaIds((prev) => {
      const next = new Set(prev);
      if (next.has(formulaId)) next.delete(formulaId);
      else next.add(formulaId);
      localStorage.setItem('prepora_bookmarked_formulas', JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const handleCopyFormula = useCallback((f: TopicFormula) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(f.formula);
      } else {
        const ta = document.createElement('textarea');
        ta.value = f.formula;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {}
    setCopiedFormulaName(f.name);
    setTimeout(() => setCopiedFormulaName(null), 2000);
  }, []);

  // Sync Server Formulas from MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchFormulas = async () => {
      try {
        const res = await fetch('/api/formulas?limit=2000');
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.formulas || [];
        if (isMounted && list.length > 0) {
          setAllNotes((prev) => mergeServerFormulas(comprehensiveFormulaNotes, list));
        }
      } catch (err) {
        console.warn('Failed to load server formulas:', err);
      }
    };
    fetchFormulas();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler: Print / Save as PDF for Chapter with Worked Examples
  const handlePrintChapter = useCallback((chapterName: string, items: TopicRevisionItem[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print/download the chapter formula sheet.');
      return;
    }

    const totalFormulas = items.reduce((s, it) => s + it.formulas.length, 0);
    const classVal = items[0]?.classLevel || '11/12';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${chapterName} — Formula Sheet</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"><\/script>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 16px;
      margin: 0;
      font-size: 13px;
      line-height: 1.45;
    }
    .no-print {
      margin-bottom: 20px;
      padding: 12px 16px;
      background: #f1f5f9;
      border-radius: 10px;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .print-btn {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 8px 20px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
    }
    .header-banner {
      border-bottom: 3px solid #059669;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .chapter-title {
      font-size: 24px;
      margin: 0 0 6px 0;
      color: #0f172a;
      font-weight: 900;
    }
    .chapter-meta {
      font-size: 13px;
      color: #475569;
      font-weight: 600;
    }
    .brand-title {
      font-size: 14px;
      color: #059669;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: right;
    }
    .topic-block {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    .topic-header {
      font-size: 15px;
      font-weight: 800;
      color: #065f46;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }
    .formula-card {
      border: 1px solid #cbd5e1;
      border-left: 4px solid #059669;
      border-radius: 8px;
      padding: 12px 14px;
      background: #f8fafc;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .formula-name {
      font-weight: 800;
      font-size: 14px;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .formula-math {
      font-size: 16px;
      padding: 10px 14px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      margin: 8px 0;
      text-align: center;
    }
    .var-text {
      font-size: 12px;
      color: #334155;
      margin-top: 6px;
    }
    .example-box {
      font-size: 12px;
      color: #92400e;
      background: #fffbeb;
      border: 1px solid #fef3c7;
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 8px;
    }
    .example-solution {
      font-family: monospace;
      color: #1e293b;
      margin-top: 4px;
      white-space: pre-line;
      font-size: 11px;
    }
    .tip-box {
      font-size: 11.5px;
      color: #065f46;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 6px;
    }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="print-btn" style="background: #64748b" onclick="window.close()">Close</button>
  </div>

  <div class="header-banner">
    <div>
      <h1 class="chapter-title">${chapterName}</h1>
      <div class="chapter-meta">
        ${items[0]?.subject || 'Science'} • Class ${classVal} • ${items.length} Topics • ${totalFormulas} Formulas with Worked Examples
      </div>
    </div>
    <div class="brand-title">
      PREPORA / STUDY UP<br>
      <span style="font-size: 11px; color: #64748b; font-weight: 500;">High-Yield Formula Guide</span>
    </div>
  </div>

  ${items
    .map(
      (topicItem) => `
    <div class="topic-block">
      <div class="topic-header">📌 ${topicItem.topic} (${topicItem.formulas.length} Formulas)</div>
      ${topicItem.formulas
        .map(
          (f) => `
        <div class="formula-card">
          <div class="formula-name">${f.name}</div>
          <div class="formula-math">\\[${f.formula}\\]</div>
          ${f.variables ? `<div class="var-text"><strong>Variables:</strong> ${f.variables}</div>` : ''}
          ${
            f.example
              ? `<div class="example-box">
                  <strong>💡 Worked Example:</strong> ${f.example.problem}
                  <div class="example-solution"><strong>Step-by-Step Solution:</strong>\n${f.example.solution}</div>
                </div>`
              : ''
          }
          ${f.examTip ? `<div class="tip-box"><strong>Exam Tip:</strong> ${f.examTip}</div>` : ''}
        </div>
      `
        )
        .join('')}
    </div>
  `
    )
    .join('')}

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      renderMathInElement(document.body, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '\\[', right: '\\]', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false}
        ],
        throwOnError: false
      });
    });
  <\/script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }, []);

  // Handler: Download Markdown
  const handleDownloadMarkdown = useCallback((chapterName: string, items: TopicRevisionItem[]) => {
    let md = `# ${chapterName} — Formula Sheet\n\n`;
    md += `**Subject:** ${items[0]?.subject || 'Science'} | **Class:** ${items[0]?.classLevel || '11'}\n\n---\n\n`;

    items.forEach((it) => {
      md += `## 📌 ${it.topic}\n\n`;
      it.formulas.forEach((f, idx) => {
        md += `### ${idx + 1}. ${f.name}\n\n`;
        md += `$$\n${f.formula}\n$$\n\n`;
        if (f.variables) md += `**Variables:** ${f.variables}\n\n`;
        if (f.example) {
          md += `> **💡 Worked Example:**\n`;
          md += `> **Problem:** ${f.example.problem}\n>\n`;
          md += `> **Solution:**\n> ${f.example.solution.replace(/\n/g, '\n> ')}\n\n`;
        }
        if (f.examTip) md += `*Pro-Tip:* ${f.examTip}\n\n`;
        if (f.trap) md += `*Common Trap:* ${f.trap}\n\n`;
      });
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chapterName.replace(/[^a-zA-Z0-9]/g, '_')}_Formula_Sheet.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  // Exam-allowed master notes
  const examAllowedNotes = useMemo(() => {
    return allNotes.filter((item) => isSubjectAllowedForExam(item.subject, user.targetExam));
  }, [allNotes, user.targetExam]);

  // Subject match counts and matches for search query across all subjects
  const { allSearchMatchedItems, searchMatchMap, subjectMatchCounts, totalSearchMatches } = useMemo(() => {
    const counts: Record<string, number> = {};
    allowedSubjects.forEach((sub) => {
      counts[sub] = 0;
    });

    if (!searchQuery.trim()) {
      return {
        allSearchMatchedItems: [] as TopicRevisionItem[],
        searchMatchMap: new Map<string, Set<number>>(),
        subjectMatchCounts: counts,
        totalSearchMatches: 0
      };
    }

    const matchMap = new Map<string, Set<number>>();
    const matchedList: TopicRevisionItem[] = [];
    let totalHits = 0;

    examAllowedNotes.forEach((item) => {
      if (onlyBookmarked) {
        const hasBookmark = item.formulas.some((_, idx) => bookmarkedFormulaIds.has(`${item.id}-f-${idx}`));
        if (!hasBookmark) return;
      }
      if (selectedClass !== 'All' && item.classLevel !== selectedClass) return;

      const { matches, matchingFormulaIndices } = matchSearchQuery(item, searchQuery);
      if (matches) {
        matchedList.push(item);
        matchMap.set(item.id, matchingFormulaIndices);
        const hits = matchingFormulaIndices.size > 0 ? matchingFormulaIndices.size : item.formulas.length;
        counts[item.subject] = (counts[item.subject] || 0) + hits;
        totalHits += hits;
      }
    });

    return {
      allSearchMatchedItems: matchedList,
      searchMatchMap: matchMap,
      subjectMatchCounts: counts,
      totalSearchMatches: totalHits
    };
  }, [examAllowedNotes, searchQuery, onlyBookmarked, bookmarkedFormulaIds, selectedClass, allowedSubjects]);

  // Determine what filtered items to show based on search vs normal browse mode
  const { filteredItems, itemMatchMap, searchFallbackAll } = useMemo(() => {
    if (!searchQuery.trim()) {
      let list = examAllowedNotes.filter((item) => {
        if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;
        if (selectedClass !== 'All' && item.classLevel !== selectedClass) return false;
        return true;
      });

      if (onlyBookmarked) {
        list = list.filter((item) =>
          item.formulas.some((_, idx) => bookmarkedFormulaIds.has(`${item.id}-f-${idx}`))
        );
      }

      return {
        filteredItems: list,
        itemMatchMap: new Map<string, Set<number>>(),
        searchFallbackAll: false
      };
    }

    // Search query is active:
    if (selectedSubject === 'All') {
      return {
        filteredItems: allSearchMatchedItems,
        itemMatchMap: searchMatchMap,
        searchFallbackAll: false
      };
    }

    // Filter by selectedSubject if it has matches
    const subjectMatches = allSearchMatchedItems.filter((item) => item.subject === selectedSubject);
    if (subjectMatches.length > 0) {
      return {
        filteredItems: subjectMatches,
        itemMatchMap: searchMatchMap,
        searchFallbackAll: false
      };
    }

    // If selectedSubject has 0 matches, but other subjects have matches:
    // Automatically fallback to show all matches so the user doesn't see a blank page!
    if (totalSearchMatches > 0) {
      return {
        filteredItems: allSearchMatchedItems,
        itemMatchMap: searchMatchMap,
        searchFallbackAll: true
      };
    }

    return {
      filteredItems: [],
      itemMatchMap: searchMatchMap,
      searchFallbackAll: false
    };
  }, [
    searchQuery,
    examAllowedNotes,
    selectedSubject,
    selectedClass,
    onlyBookmarked,
    bookmarkedFormulaIds,
    allSearchMatchedItems,
    searchMatchMap,
    totalSearchMatches
  ]);

  // Group into Chapters
  const distinctChapters = useMemo(() => {
    const map = new Map<string, TopicRevisionItem[]>();
    filteredItems.forEach((item) => {
      if (!map.has(item.chapter)) map.set(item.chapter, []);
      map.get(item.chapter)!.push(item);
    });
    const chapters = Array.from(map.entries()).map(([chapter, items]) => ({
      chapter,
      items,
      subject: items[0]?.subject || (selectedSubject === 'All' ? 'Physics' : selectedSubject),
      classLevel: items[0]?.classLevel || '11',
      weightage: items[0]?.weightage || 'Medium',
      formulaCount: items.reduce((sum, it) => sum + it.formulas.length, 0)
    }));
    return sortChaptersCanonical(chapters, (c) => c.chapter, (c) => c.subject);
  }, [filteredItems, selectedSubject]);

  // Active Chapter Group when inside Dedicated Chapter View
  const currentChapterGroup = useMemo(() => {
    if (!selectedChapter) return null;
    const cleanSel = selectedChapter.toLowerCase().trim();
    // Always find all items for this chapter from examAllowedNotes to ensure complete chapter content
    const itemsForCh = examAllowedNotes.filter(
      (it) => it.chapter.toLowerCase() === cleanSel || it.chapter.toLowerCase().includes(cleanSel)
    );
    if (itemsForCh.length === 0) return null;

    return {
      chapter: itemsForCh[0].chapter,
      items: itemsForCh,
      subject: itemsForCh[0].subject,
      classLevel: itemsForCh[0].classLevel,
      weightage: itemsForCh[0].weightage || 'Medium',
      formulaCount: itemsForCh.reduce((sum, it) => sum + it.formulas.length, 0)
    };
  }, [selectedChapter, examAllowedNotes]);

  // Topics to display inside the dedicated chapter view (with in-chapter search filter)
  const { chapterTopicsToDisplay, chapterMatchMap, chapterMatchedFormulaCount } = useMemo(() => {
    if (!currentChapterGroup) {
      return {
        chapterTopicsToDisplay: [] as TopicRevisionItem[],
        chapterMatchMap: new Map<string, Set<number>>(),
        chapterMatchedFormulaCount: 0
      };
    }

    let items = currentChapterGroup.items;
    if (activeTopicFilter !== 'All') {
      items = items.filter((it) => it.topic === activeTopicFilter);
    }

    if (!chapterSearchQuery.trim()) {
      return {
        chapterTopicsToDisplay: items,
        chapterMatchMap: new Map<string, Set<number>>(),
        chapterMatchedFormulaCount: 0
      };
    }

    const matchMap = new Map<string, Set<number>>();
    const matchedList: TopicRevisionItem[] = [];
    let count = 0;

    items.forEach((item) => {
      const { matches, matchingFormulaIndices } = matchSearchQuery(item, chapterSearchQuery);
      if (matches) {
        matchedList.push(item);
        matchMap.set(item.id, matchingFormulaIndices);
        count += matchingFormulaIndices.size > 0 ? matchingFormulaIndices.size : item.formulas.length;
      }
    });

    return {
      chapterTopicsToDisplay: matchedList,
      chapterMatchMap: matchMap,
      chapterMatchedFormulaCount: count
    };
  }, [currentChapterGroup, activeTopicFilter, chapterSearchQuery]);

  const crossSubjectMatches = useMemo(() => {
    if (!searchQuery.trim() || selectedSubject === 'All') return [];
    const otherAllowed = allowedSubjects.filter((s) => s !== selectedSubject);
    const matches: Array<{ subject: SubjectName; count: number }> = [];

    otherAllowed.forEach((sub) => {
      const hits = subjectMatchCounts[sub] || 0;
      if (hits > 0) {
        matches.push({ subject: sub, count: hits });
      }
    });
    return matches;
  }, [searchQuery, allowedSubjects, selectedSubject, subjectMatchCounts]);

  // Popular search suggestions chips
  const popularChips = useMemo(() => {
    if (selectedSubject === 'Chemistry') {
      return ["Raoult's Law", 'Nernst Equation', 'Arrhenius Equation', 'First Order', 'Osmotic Pressure', 'Kohlrausch', 'CFSE'];
    }
    if (selectedSubject === 'Mathematics') {
      return ['Integration by Parts', 'Bayes Theorem', 'Quadratic Formula', 'Dot & Cross Product', 'Chain Rule', 'Binomial Theorem'];
    }
    if (selectedSubject === 'Biology') {
      return ['Hardy-Weinberg', 'Cardiac Output', 'Respiratory Quotient', '10% Law', 'Chargaff Rules'];
    }
    if (selectedSubject === 'Physics') {
      return ["Ohm's Law", 'Projectile Range', 'Bernoulli', 'Work-Energy Theorem', 'Coulombs Law', 'Doppler Effect', 'de Broglie'];
    }
    return ["Ohm's Law", 'Projectile Range', 'Nernst Equation', 'Integration by Parts', 'Bayes Theorem', 'Raoult Law', 'Bernoulli'];
  }, [selectedSubject]);

  const handleSaveNewFormula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormulaForm.chapter.trim() || !newFormulaForm.title.trim() || !newFormulaForm.formula.trim()) {
      alert('Please fill Chapter name, Formula Title, and LaTeX Equation.');
      return;
    }
    setSavingFormula(true);
    try {
      const serverItem = {
        id: `custom_${Date.now()}`,
        subject: newFormulaForm.subject,
        classLevel: newFormulaForm.classLevel,
        chapter: newFormulaForm.chapter.trim(),
        topic: newFormulaForm.topic.trim() || 'Core Concepts',
        title: newFormulaForm.title.trim(),
        formula: newFormulaForm.formula.trim(),
        variables: newFormulaForm.variables.trim(),
        examTip: newFormulaForm.examTip.trim(),
        trap: newFormulaForm.trap.trim(),
        example: {
          problem: newFormulaForm.exampleProblem.trim() || `Problem for ${newFormulaForm.title}`,
          solution: newFormulaForm.exampleSolution.trim() || `Step-by-step solution for ${newFormulaForm.title}`
        },
        importance: newFormulaForm.importance
      };

      setAllNotes((prev) => mergeServerFormulas(prev, [serverItem]));

      try {
        const stored = JSON.parse(localStorage.getItem('prepora_custom_formulas') || '[]');
        stored.push(serverItem);
        localStorage.setItem('prepora_custom_formulas', JSON.stringify(stored));
      } catch {}

      setPlannerMsg(`Formula "${newFormulaForm.title}" successfully added!`);
      setTimeout(() => setPlannerMsg(null), 3500);

      setAddFormulaModalOpen(false);
      setNewFormulaForm({
        subject: selectedSubject === 'All' ? 'Physics' : selectedSubject,
        classLevel: '11',
        chapter: '',
        topic: '',
        title: '',
        formula: '',
        variables: '',
        examTip: '',
        trap: '',
        exampleProblem: '',
        exampleSolution: '',
        importance: 'High'
      });
    } catch (err) {
      console.error('Failed to create formula:', err);
    } finally {
      setSavingFormula(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {plannerMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{plannerMsg}</span>
        </div>
      )}

      {/* VIEW MODE 1: DEDICATED CHAPTER FORMULA VIEW */}
      {selectedChapter && currentChapterGroup ? (
        <div className="space-y-4">
          {/* Unified Compact Chapter Header Card */}
          <div className="rounded-2xl bg-[#061817] dark:bg-[#061817] p-3.5 sm:p-5 border border-emerald-500/30 text-white space-y-3 shadow-lg shadow-emerald-950/20">
            {/* Top Navigation Row */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleBackToChapters}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>← All Chapters</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePrintChapter(currentChapterGroup.chapter, currentChapterGroup.items)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Print or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadMarkdown(currentChapterGroup.chapter, currentChapterGroup.items)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Export Markdown"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddToPlanner(currentChapterGroup.chapter)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1 transition shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>+ Planner</span>
                </button>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  {currentChapterGroup.subject}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-bold">
                  Class {currentChapterGroup.classLevel}
                </span>
                {currentChapterGroup.weightage === 'High' && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-400/30 text-rose-300 text-[11px] font-bold">
                    High Yield
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-xl font-black text-white tracking-tight leading-snug">
                {currentChapterGroup.chapter}
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  {currentChapterGroup.formulaCount} Formulas
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-teal-400" />
                  {currentChapterGroup.items.length} Topics
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Solved Numerical Examples
                </span>
              </div>
            </div>

            {/* In-Chapter Formula Search */}
            <div className="pt-1">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={chapterSearchQuery}
                  onChange={(e) => setChapterSearchQuery(e.target.value)}
                  placeholder={`Search formulas or terms within ${currentChapterGroup.chapter}...`}
                  className="w-full pl-8.5 pr-8 py-2 rounded-xl border border-emerald-500/30 bg-[#07131d] text-white text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 shadow-2xs"
                />
                {chapterSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setChapterSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Topic Filter Pills (Horizontal Scroll on Mobile) */}
            <div className="pt-2 border-t border-emerald-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setActiveTopicFilter('All')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                  activeTopicFilter === 'All'
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'bg-[#0f1723] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                All Topics ({currentChapterGroup.items.length})
              </button>
              {currentChapterGroup.items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActiveTopicFilter(it.topic)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    activeTopicFilter === it.topic
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-[#0f1723] text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {it.topic} ({it.formulas.length})
                </button>
              ))}
            </div>

            {chapterSearchQuery.trim() && (
              <div className="flex items-center justify-between text-[11px] text-emerald-300 font-semibold pt-1">
                <span>
                  Found <strong className="text-white font-bold">{chapterMatchedFormulaCount}</strong> formulas matching &ldquo;{chapterSearchQuery}&rdquo; in this chapter
                </span>
                <button
                  type="button"
                  onClick={() => setChapterSearchQuery('')}
                  className="text-emerald-400 hover:text-emerald-200 underline cursor-pointer"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* Sequential Topic-by-Topic Formula Blocks or In-Chapter Empty State */}
          {chapterTopicsToDisplay.length === 0 ? (
            <div className="bg-white dark:bg-[#0e1620] p-8 text-center rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No formulas in &ldquo;{currentChapterGroup.chapter}&rdquo; matched &ldquo;{chapterSearchQuery}&rdquo;.
              </p>
              <p className="text-xs text-slate-400">
                Want to search for this formula across the entire syllabus?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setChapterSearchQuery('')}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Clear In-Chapter Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = chapterSearchQuery;
                    setSelectedChapter('');
                    setSearchQuery(q);
                    setChapterSearchQuery('');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Across All Chapters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {chapterTopicsToDisplay.map((topicItem) => {
                const matchingFormulaIndices = chapterMatchMap.get(topicItem.id);
                const hasInChapterSearch = Boolean(chapterSearchQuery.trim());
                const formulasToDisplay = hasInChapterSearch && matchingFormulaIndices && matchingFormulaIndices.size > 0
                  ? topicItem.formulas.filter((_, idx) => matchingFormulaIndices.has(idx))
                  : topicItem.formulas;

                return (
                  <div
                    key={topicItem.id}
                    id={`topic-block-${encodeURIComponent(topicItem.topic)}`}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                  >
                {/* Topic Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs shrink-0" />
                    <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                      {topicItem.topic}
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {topicItem.formulas.length} Formulas
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToPlanner(topicItem.chapter, topicItem.topic)}
                    className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition cursor-pointer self-start sm:self-auto"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add Topic to Planner</span>
                  </button>
                </div>

                {/* Pure Formula Cards for this Topic */}
                <div className="space-y-4">
                  {formulasToDisplay.map((f, fIdx) => {
                    const originalIdx = topicItem.formulas.indexOf(f);
                    const effectiveIdx = originalIdx >= 0 ? originalIdx : fIdx;
                    const formulaUniqueId = `${topicItem.id}-f-${effectiveIdx}`;
                    const isBookmarked = bookmarkedFormulaIds.has(formulaUniqueId);
                    const isCopied = copiedFormulaName === f.name;
                    const isSearchMatch = hasInChapterSearch && matchingFormulaIndices?.has(effectiveIdx);

                    return (
                      <div
                        key={effectiveIdx}
                        className={`p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border ${
                          isSearchMatch
                            ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                            : 'border-slate-200/80 dark:border-slate-800'
                        } space-y-3.5 transition-all hover:border-emerald-300 dark:hover:border-emerald-800 shadow-xs`}
                      >
                        {/* Formula Title & Actions */}
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0">
                              {effectiveIdx + 1}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                              {f.name}
                            </h4>
                            {isSearchMatch && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0">
                                Match
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyFormula(f)}
                              title="Copy LaTeX Equation"
                              className="px-2 py-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-600 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Copy LaTeX</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBookmarkFormula(formulaUniqueId)}
                              title="Bookmark formula"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* KaTeX Math Box */}
                        <div className="p-4 rounded-xl bg-white dark:bg-[#0a1017] border border-emerald-200/60 dark:border-emerald-900/40 text-center overflow-x-auto shadow-2xs">
                          <MathRenderer math={`\\[${f.formula}\\]`} />
                        </div>

                        {/* Variables Breakdown */}
                        {f.variables && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white/70 dark:bg-[#0c141d]/70 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
                            <strong className="text-slate-800 dark:text-slate-200 font-bold block mb-0.5">
                              Variables & Quantities:
                            </strong>
                            <span>{f.variables}</span>
                          </div>
                        )}

                        {/* Concrete Worked Numerical Example */}
                        {f.example && (
                          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50 space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 font-black text-amber-900 dark:text-amber-300">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Solved Numerical Example / Exam Application</span>
                            </div>
                            <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                              <strong className="text-amber-800 dark:text-amber-300">Problem: </strong>
                              <span>{f.example.problem}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-white/90 dark:bg-[#0b121a]/90 border border-amber-200/60 dark:border-amber-900/40 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed whitespace-pre-line font-mono">
                              <span className="font-bold text-emerald-700 dark:text-emerald-400 font-sans block mb-1">
                                Step-by-Step Solution:
                              </span>
                              <span>{f.example.solution}</span>
                            </div>
                          </div>
                        )}

                        {/* Pro-Tip & Common Trap */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-1 text-xs">
                          {f.examTip && (
                            <div className="flex-1 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                              <strong>💡 Pro-Tip: </strong>
                              <span>{f.examTip}</span>
                            </div>
                          )}
                          {f.trap && (
                            <div className="flex-1 p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <span>
                                <strong>Common Trap: </strong>
                                {f.trap}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Quick Interactive Actions: Ask AI Doubt & Practice MCQs */}
                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              const q = `Explain formula "${f.name}" (${f.formula}) from chapter "${topicItem.chapter}" with mathematical steps, derivations, sign conventions, and numerical tips.`;
                              navigate(`/doubt-center?query=${encodeURIComponent(q)}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1.5 transition cursor-pointer text-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Ask AI Doubt</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigate(`/practice/session?subject=${encodeURIComponent(topicItem.subject)}&chapter=${encodeURIComponent(topicItem.chapter)}&topic=${encodeURIComponent(topicItem.topic)}&count=15`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5 transition cursor-pointer text-xs"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>Practice MCQs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer if filtered by in-chapter search */}
                {hasInChapterSearch && formulasToDisplay.length < topicItem.formulas.length && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Showing {formulasToDisplay.length} of {topicItem.formulas.length} formulas in this topic
                    </span>
                    <button
                      type="button"
                      onClick={() => setChapterSearchQuery('')}
                      className="text-emerald-500 hover:underline font-bold cursor-pointer"
                    >
                      Show all formulas
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
      ) : (
        /* VIEW MODE 2: CHAPTER DIRECTORY / SELECTOR HUB */
        <div className="space-y-6">
          {/* Top Hero Banner - Exact Mobile Match */}
          <div className="rounded-2xl bg-[#061817] dark:bg-[#061817] p-4 sm:p-5 border border-emerald-500/30 text-white space-y-3 shadow-lg shadow-emerald-950/20">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Formula Sheet & Worked Examples
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
                  Chapter-wise formulas, definitions and step-by-step solved examples for NEET, JEE & Board exams.
                </p>
              </div>
            </div>

            {/* Quick Stats Pill Badges */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              <div className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>{distinctChapters.length} Chapters</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>{filteredItems.length} Topics</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{distinctChapters.reduce((sum, ch) => sum + ch.formulaCount, 0)} Formulas</span>
              </div>
            </div>
          </div>

          {/* Controls Bar - Sleek Pills Layout Matching Image */}
          <div className="space-y-2.5">
            {/* Row 1: Subject Pill Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setSelectedSubject('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedSubject === 'All'
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'bg-[#0f1723] dark:bg-[#0f1723] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>All Subjects</span>
                {searchQuery.trim() && (
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    selectedSubject === 'All' ? 'bg-slate-900/30 text-slate-950' : 'bg-slate-800 text-emerald-400'
                  }`}>
                    {totalSearchMatches}
                  </span>
                )}
              </button>
              {allowedSubjects.map((sub) => {
                const subHits = subjectMatchCounts[sub] || 0;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedSubject === sub
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : 'bg-[#0f1723] dark:bg-[#0f1723] text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    {searchQuery.trim() && (
                      <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        selectedSubject === sub ? 'bg-slate-900/30 text-slate-950' : 'bg-slate-800 text-emerald-400'
                      }`}>
                        {subHits}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Class Level Pills + Add Formula */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {(['All', '11', '12'] as const).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedClass === cls
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-[#0f1723] dark:bg-[#0f1723] text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setNewFormulaForm((prev) => ({
                    ...prev,
                    subject: selectedSubject === 'All' ? 'Physics' : selectedSubject,
                    classLevel: selectedClass === 'All' ? '11' : selectedClass
                  }));
                  setAddFormulaModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Add Formula</span>
              </button>
            </div>

            {/* Row 3: Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, concepts or topics..."
                className="w-full pl-9 pr-9 py-2.5 rounded-full border border-slate-800 bg-[#0d1520] text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Row 4: Bookmarks Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyBookmarked((prev) => !prev)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  onlyBookmarked
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-[#0f1723] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
                <span>Bookmarks ({bookmarkedFormulaIds.size})</span>
              </button>
            </div>

            {/* Row 5: Popular Search Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Popular:</span>
              </span>
              {popularChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition border cursor-pointer ${
                    normalizeSearchText(searchQuery) === normalizeSearchText(chip)
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                      : 'bg-[#0f1723] hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Search Fallback Banner if selected subject has 0 matches */}
            {searchFallbackAll && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    No formulas matched &ldquo;{searchQuery}&rdquo; in <strong>{selectedSubject}</strong>. Showing <strong>{totalSearchMatches}</strong> matching formulas found across other subjects below:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSubject('All')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-xs cursor-pointer text-xs"
                >
                  Switch to All Subjects
                </button>
              </div>
            )}

            {/* Cross-Subject Search Match Alert Banner */}
            {!searchFallbackAll && crossSubjectMatches.length > 0 && selectedSubject !== 'All' && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-semibold text-amber-900 dark:text-amber-200">
                    Matching formulas also found in other subjects:
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {crossSubjectMatches.map((m) => (
                    <button
                      key={m.subject}
                      type="button"
                      onClick={() => setSelectedSubject(m.subject)}
                      className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition shadow-2xs cursor-pointer flex items-center gap-1 text-xs"
                    >
                      <span>Switch to {m.subject}</span>
                      <span className="text-[10px] bg-amber-800/40 px-1.5 py-0.2 rounded-full font-black">
                        {m.count}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedSubject('All')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-2xs cursor-pointer text-xs"
                  >
                    View All Subjects
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Search Results View (Shows direct matching formulas with chapter links) */}
          {searchQuery.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-xs text-emerald-900 dark:text-emerald-200">
                <span>
                  Found{' '}
                  <strong className="font-black text-emerald-700 dark:text-emerald-300">
                    {filteredItems.reduce((acc, it) => acc + (itemMatchMap.get(it.id)?.size || it.formulas.length), 0)}
                  </strong>{' '}
                  matching formulas across{' '}
                  <strong className="font-black text-emerald-700 dark:text-emerald-300">
                    {distinctChapters.length}
                  </strong>{' '}
                  chapters for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="font-bold underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-white dark:bg-[#0e1620] p-10 text-center rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    No formulas matched &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <p className="text-xs text-slate-400">
                    Try searching by chapter name or standard terms like Nernst, Ohm, Projectile, or Integration.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="bg-emerald-600 text-xs"
                  >
                    Reset Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => {
                    const matchingIndices = itemMatchMap.get(item.id);
                    const hasSpecificMatches = matchingIndices && matchingIndices.size > 0;
                    const formulasToDisplay = hasSpecificMatches
                      ? item.formulas.filter((_, idx) => matchingIndices.has(idx))
                      : item.formulas;

                    return (
                      <div
                        key={item.id}
                        className="p-5 rounded-3xl bg-white dark:bg-[#0e1620] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                          <div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-[11px]">
                                {item.subject}
                              </span>
                              <span>•</span>
                              <span>Class {item.classLevel}</span>
                            </div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                              {item.chapter} — {item.topic}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectChapter(item.chapter, item.subject)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-xs"
                          >
                            <span>Open Chapter Sheet</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formulasToDisplay.map((f, fIdx) => {
                            const originalIdx = item.formulas.indexOf(f);
                            const effectiveIdx = originalIdx >= 0 ? originalIdx : fIdx;
                            const formulaUniqueId = `${item.id}-f-${effectiveIdx}`;
                            const isBookmarked = bookmarkedFormulaIds.has(formulaUniqueId);
                            const isCopied = copiedFormulaName === f.name;

                            return (
                              <div
                                key={effectiveIdx}
                                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-emerald-500/30 dark:border-emerald-900/40 space-y-2.5 shadow-xs"
                              >
                                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                      {f.name}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 text-[10px] font-black border border-emerald-500/30 shrink-0">
                                      Formula Match
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyFormula(f)}
                                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                                    >
                                      {isCopied ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                                          <span className="text-emerald-600 font-bold">Copied!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span className="hidden sm:inline">Copy LaTeX</span>
                                        </>
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => toggleBookmarkFormula(formulaUniqueId)}
                                      title="Bookmark formula"
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
                                    >
                                      {isBookmarked ? (
                                        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                                      ) : (
                                        <Bookmark className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0a1017] border border-emerald-200/50 dark:border-emerald-900/40 text-center overflow-x-auto shadow-inner">
                                  <MathRenderer math={`\\[${f.formula}\\]`} />
                                </div>

                                {f.variables && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400">
                                    <strong className="text-slate-800 dark:text-slate-200">Variables: </strong>
                                    <span>{f.variables}</span>
                                  </div>
                                )}

                                {f.example && (
                                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/50 space-y-1 text-xs">
                                    <strong className="text-amber-800 dark:text-amber-300">💡 Example: </strong>
                                    <span className="text-slate-800 dark:text-slate-200">{f.example.problem}</span>
                                    <div className="mt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-line">
                                      {f.example.solution}
                                    </div>
                                  </div>
                                )}

                                {/* Interactive Actions */}
                                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const q = `Explain formula "${f.name}" (${f.formula}) from chapter "${item.chapter}" with mathematical steps, derivations, sign conventions, and numerical tips.`;
                                      navigate(`/doubt-center?query=${encodeURIComponent(q)}`);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1.5 transition cursor-pointer text-xs"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Ask AI Doubt</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigate(`/practice/session?subject=${encodeURIComponent(item.subject)}&chapter=${encodeURIComponent(item.chapter)}&topic=${encodeURIComponent(item.topic)}&count=15`);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5 transition cursor-pointer text-xs"
                                  >
                                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                                    <span>Practice MCQs</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Footer if there are other formulas in this topic */}
                        {hasSpecificMatches && formulasToDisplay.length < item.formulas.length && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-medium">
                              Showing {formulasToDisplay.length} matching of {item.formulas.length} total formulas in this topic
                            </span>
                            <button
                              type="button"
                              onClick={() => handleSelectChapter(item.chapter, item.subject)}
                              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <span>View complete chapter sheet</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Standard Chapter Directory Grid */
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Choose a Chapter to View Formulas</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {distinctChapters.length} Chapters Available
                  </p>
                </div>
                <div className="relative">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as any)}
                    className="text-xs text-slate-200 font-bold bg-[#0f1723] border border-slate-700/80 px-2.5 py-1.5 rounded-xl appearance-none pr-7 cursor-pointer focus:outline-none focus:border-emerald-500 shadow-2xs"
                  >
                    <option value="All" className="bg-slate-900 text-white">All Subjects</option>
                    {allowedSubjects.map((s) => (
                      <option key={s} value={s} className="bg-slate-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-3.5 h-3.5 rotate-90 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {distinctChapters.map((chGroup) => {
                  return (
                    <div
                      key={chGroup.chapter}
                      onClick={() => handleSelectChapter(chGroup.chapter, chGroup.subject as SubjectName)}
                      className="group p-4 rounded-2xl bg-[#0c121d] border border-slate-800/80 hover:border-emerald-500/50 hover:bg-[#0e1623] transition-all duration-200 cursor-pointer space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        {/* Leading Thematic Square Icon Box */}
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-2xs">
                          {getChapterIcon(chGroup.chapter, chGroup.subject)}
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-1.5">
                            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                              {chGroup.chapter}
                            </h3>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#151f2e] text-slate-300 border border-slate-750">
                                Class {chGroup.classLevel}
                              </span>
                              {chGroup.weightage === 'High' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                                  High Yield
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <Flame className="w-3 h-3 text-emerald-400" />
                              {chGroup.formulaCount} Formulas
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Layers className="w-3 h-3 text-teal-400" />
                              {chGroup.items.length} Topics
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Topic Tags Preview */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {chGroup.items.slice(0, 2).map((it) => (
                          <span
                            key={it.id}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#141d2a] text-slate-300 border border-slate-800/70 truncate max-w-[140px]"
                          >
                            {it.topic}
                          </span>
                        ))}
                        {chGroup.items.length > 2 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#141d2a] text-slate-400 border border-slate-800/70 font-medium">
                            +{chGroup.items.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Bottom Action Link */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                        <span>Open Chapter Formulas</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Admin Add Formula Modal */}
      {addFormulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  Add New Formula to Curriculum
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddFormulaModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewFormula} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={newFormulaForm.subject}
                    onChange={(e) =>
                      setNewFormulaForm((p) => ({ ...p, subject: e.target.value as any }))
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {allowedSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Level
                  </label>
                  <select
                    value={newFormulaForm.classLevel}
                    onChange={(e) =>
                      setNewFormulaForm((p) => ({ ...p, classLevel: e.target.value as any }))
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Chapter Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Current Electricity"
                  value={newFormulaForm.chapter}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, chapter: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kirchhoff's Laws"
                  value={newFormulaForm.topic}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, topic: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Formula Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kirchhoff Voltage Law (KVL)"
                  value={newFormulaForm.title}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  LaTeX Formula Equation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. \sum \Delta V = 0 \implies \sum \mathcal{E} = \sum I R"
                  value={newFormulaForm.formula}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, formula: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Variables Breakdown
                </label>
                <input
                  type="text"
                  placeholder="e.g. \mathcal{E} = EMF of cells, I = branch currents, R = loop resistances"
                  value={newFormulaForm.variables}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, variables: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Worked Example Problem
                </label>
                <input
                  type="text"
                  placeholder="e.g. In a single loop circuit with 10V battery and 2Ω, 3Ω resistors in series, find the current."
                  value={newFormulaForm.exampleProblem}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, exampleProblem: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Worked Example Solution
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 1. Total R = 2 + 3 = 5Ω\n2. By KVL: I = V / R = 10 / 5 = 2.0 A"
                  value={newFormulaForm.exampleSolution}
                  onChange={(e) =>
                    setNewFormulaForm((p) => ({ ...p, exampleSolution: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddFormulaModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={savingFormula}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {savingFormula ? 'Saving...' : 'Save Formula'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaNotesHub;
