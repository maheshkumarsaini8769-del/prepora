import { Paper, ExamType, SubjectName } from '../types';
import { mockPapers } from '../data/mockData';
import { getStorageItem, setStorageItem } from '../utils/storage';

export interface PaperFilters {
  exam?: ExamType | 'All';
  board?: string | 'All';
  subject?: SubjectName | 'All';
  year?: number | 'All';
  paperType?: string | 'All';
  searchQuery?: string;
}

class MockPaperService {
  private getCustomPapers(): Paper[] {
    return getStorageItem<Paper[]>('prepora_custom_papers', []);
  }

  public getAllPapers(): Paper[] {
    const custom = this.getCustomPapers();
    return [...mockPapers, ...custom];
  }

  public getPaperById(id: string): Paper | undefined {
    return this.getAllPapers().find(p => p.id === id);
  }

  public filterPapers(filters: PaperFilters): Paper[] {
    return this.getAllPapers().filter(p => {
      if (filters.exam && filters.exam !== 'All' && p.exam !== filters.exam) return false;
      if (filters.board && filters.board !== 'All' && p.board !== filters.board) return false;
      if (filters.subject && filters.subject !== 'All' && p.subject !== filters.subject) return false;
      if (filters.year && filters.year !== 'All' && p.year !== filters.year) return false;
      if (filters.paperType && filters.paperType !== 'All' && p.paperType !== filters.paperType) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }

  public addPaper(paper: Omit<Paper, 'id'>): Paper {
    const custom = this.getCustomPapers();
    const newPaper: Paper = {
      ...paper,
      id: `paper-custom-${Date.now()}`
    };
    custom.unshift(newPaper);
    setStorageItem('prepora_custom_papers', custom);
    return newPaper;
  }

  public deletePaper(id: string): boolean {
    const custom = this.getCustomPapers();
    const filtered = custom.filter(p => p.id !== id);
    if (filtered.length !== custom.length) {
      setStorageItem('prepora_custom_papers', filtered);
      return true;
    }
    return false;
  }
}

export const paperService = new MockPaperService();
