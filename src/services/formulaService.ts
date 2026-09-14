import { FormulaCard } from '../types';
import { mockFormulas } from '../data/mockData';
import { getStorageItem, setStorageItem } from '../utils/storage';

const FORMULA_STATUS_KEY = 'prepora_formula_status';

export interface FormulaLearnedMap {
  [formulaId: string]: 'unlearned' | 'need-revision' | 'mastered';
}

class MockFormulaService {
  private getStatusMap(): FormulaLearnedMap {
    return getStorageItem<FormulaLearnedMap>(FORMULA_STATUS_KEY as any, {});
  }

  private saveStatusMap(map: FormulaLearnedMap): void {
    setStorageItem(FORMULA_STATUS_KEY as any, map);
  }

  public getAllFormulas(): FormulaCard[] {
    const statusMap = this.getStatusMap();
    return mockFormulas.map(f => ({
      ...f,
      learnedStatus: statusMap[f.id] || 'unlearned'
    }));
  }

  public getFormulasByChapter(chapterIdOrTitle: string): FormulaCard[] {
    const all = this.getAllFormulas();
    const cleanQuery = chapterIdOrTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
    return all.filter(f => {
      const cleanId = f.chapterId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanTitle = f.chapterTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanId.includes(cleanQuery) || cleanTitle.includes(cleanQuery) || cleanQuery.includes(cleanId);
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
      const rank = { 'need-revision': 0, 'unlearned': 1, 'mastered': 2 };
      return (rank[a.learnedStatus || 'unlearned'] || 0) - (rank[b.learnedStatus || 'unlearned'] || 0);
    });
    return sorted.slice(0, count);
  }
}

export const formulaService = new MockFormulaService();
