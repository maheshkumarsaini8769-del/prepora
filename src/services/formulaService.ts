import { FormulaCard, SubjectName } from '../types';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { getStorageItem, setStorageItem } from '../utils/storage';

const FORMULA_STATUS_KEY = 'prepora_formula_status';

export interface FormulaLearnedMap {
  [formulaId: string]: 'unlearned' | 'need-revision' | 'mastered';
}

// Convert all 922+ authentic formulas from comprehensiveFormulaNotes into FormulaCard format
const masterFormulas: Omit<FormulaCard, 'learnedStatus'>[] = [];
for (const item of comprehensiveFormulaNotes) {
  if (!item.formulas || item.formulas.length === 0) continue;
  const chapterId = item.chapter.toLowerCase().replace(/[^a-z0-9]/g, '-');
  item.formulas.forEach((f, idx) => {
    masterFormulas.push({
      id: `${item.id}-f-${idx}`,
      chapterId,
      chapterTitle: item.chapter,
      subject: item.subject as SubjectName,
      name: f.name,
      formula: f.formula,
      variables: f.variables || '',
      siUnit: '',
      importantNote: f.examTip || f.trap || item.concept
    });
  });
}

class MasterFormulaService {
  private getStatusMap(): FormulaLearnedMap {
    return getStorageItem<FormulaLearnedMap>(FORMULA_STATUS_KEY as any, {});
  }

  private saveStatusMap(map: FormulaLearnedMap): void {
    setStorageItem(FORMULA_STATUS_KEY as any, map);
  }

  public getAllFormulas(): FormulaCard[] {
    const statusMap = this.getStatusMap();
    return masterFormulas.map((f) => ({
      ...f,
      learnedStatus: statusMap[f.id] || 'unlearned'
    }));
  }

  public getFormulasByChapter(chapterIdOrTitle: string): FormulaCard[] {
    const all = this.getAllFormulas();
    if (!chapterIdOrTitle) return [];
    const cleanQuery = chapterIdOrTitle.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 1. First pass: exact or direct normalized substring match
    let matched = all.filter((f) => {
      const cleanId = f.chapterId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanTitle = f.chapterTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanId.includes(cleanQuery) || cleanTitle.includes(cleanQuery) || cleanQuery.includes(cleanId) || cleanQuery.includes(cleanTitle);
    });

    // 2. Second pass: keyword-based token match if direct query didn't catch (e.g. 'Kinematics' for 'Motion in a Straight Line')
    if (matched.length === 0) {
      const queryTokens = chapterIdOrTitle.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      matched = all.filter((f) => {
        const titleLower = f.chapterTitle.toLowerCase();
        return queryTokens.some((tok) => titleLower.includes(tok));
      });
    }

    return matched;
  }

  public getFormulasBySubject(subject: SubjectName): FormulaCard[] {
    return this.getAllFormulas().filter((f) => f.subject.toLowerCase() === subject.toLowerCase());
  }

  public searchFormulas(query: string, subjectFilter?: SubjectName): FormulaCard[] {
    if (!query || !query.trim()) return [];
    const norm = (s: string) => s.toLowerCase().replace(/['’`]/g, '').replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const tokens = norm(query).split(' ').filter(Boolean);
    if (tokens.length === 0) return [];

    let pool = this.getAllFormulas();
    if (subjectFilter) {
      pool = pool.filter(f => f.subject.toLowerCase() === subjectFilter.toLowerCase());
    }

    return pool.filter(f => {
      const text = norm(`${f.name} ${f.chapterTitle} ${f.subject} ${f.variables} ${f.importantNote || ''}`);
      const rawFormula = (f.formula || '').toLowerCase();
      return tokens.every(tok => {
        if (text.includes(tok) || rawFormula.includes(tok)) return true;
        if (tok.endsWith('s') && text.includes(tok.slice(0, -1))) return true;
        if (!tok.endsWith('s') && text.includes(tok + 's')) return true;
        return false;
      });
    });
  }

  public updateFormulaStatus(id: string, status: 'unlearned' | 'need-revision' | 'mastered'): void {
    const map = this.getStatusMap();
    map[id] = status;
    this.saveStatusMap(map);
  }

  public getQuickRevisionSet(count: number = 10, chapterFilter?: string): FormulaCard[] {
    const pool = chapterFilter ? this.getFormulasByChapter(chapterFilter) : this.getAllFormulas();
    // Prioritize need-revision, then unlearned, then mastered
    const sorted = [...pool].sort((a, b) => {
      const rank = { 'need-revision': 0, unlearned: 1, mastered: 2 };
      return (rank[a.learnedStatus || 'unlearned'] || 0) - (rank[b.learnedStatus || 'unlearned'] || 0);
    });
    return sorted.slice(0, count);
  }
}

export const formulaService = new MasterFormulaService();
