import { Paper, ExamType, SubjectName, CanonicalContentType, CanonicalExam } from '../types';
import { mockPapers } from '../data/mockData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import manifestData from '../data/realPapersImportManifest.json';
import missingPapersData from '../data/missingRealPapers.json';
import verificationReportData from '../data/realPapersVerificationReport.json';

export interface PaperFilters {
  exam?: ExamType | 'All' | string;
  canonicalExam?: CanonicalExam | 'All' | string;
  board?: string | 'All';
  subject?: SubjectName | 'All' | string;
  year?: number | 'All';
  contentType?: CanonicalContentType | 'All';
  paperType?: string | 'All';
  classLevel?: string | 'All';
  session?: string | 'All';
  shift?: string | 'All';
  searchQuery?: string;
}

export interface PaperInventorySummary {
  totalPapers: number;
  realPYQs: {
    total: number;
    verified: number;
    unverified: number;
    needsReview: number;
    sourceOnly: number;
  };
  modelPapers: number;
  mockTests: number;
  samplePapers: number;
  byExam: Record<string, {
    realPYQs: number;
    modelPapers: number;
    mockTests: number;
    samplePapers: number;
    years: Record<number, number>;
  }>;
}

class MockPaperService {
  private cache: Paper[] = [];
  private hasFetched = false;

  private getCustomPapers(): Paper[] {
    return getStorageItem<Paper[]>('prepora_custom_papers', []);
  }

  public getAllPapers(): Paper[] {
    const custom = this.getCustomPapers();
    if (this.cache.length > 0) {
      // Merge unique
      const map = new Map<string, Paper>();
      mockPapers.forEach(p => map.set(p.id, p));
      custom.forEach(p => map.set(p.id, p));
      this.cache.forEach(p => map.set(p.id, p));
      return Array.from(map.values());
    }
    return [...mockPapers, ...custom];
  }

  /**
   * Strictly returns ONLY verified REAL_PYQ papers.
   * Model Papers, Mock Tests, and AI-Generated sets are 100% excluded.
   */
  public getRealPYQs(filters?: PaperFilters): Paper[] {
    const papers = this.getAllPapers().filter(
      p => p.contentType === 'REAL_PYQ' && p.verificationStatus === 'VERIFIED'
    );
    if (!filters) return papers;
    return this.applyFilters(papers, filters);
  }

  /**
   * Strictly returns Official Model Papers.
   */
  public getModelPapers(filters?: PaperFilters): Paper[] {
    const papers = this.getAllPapers().filter(p => p.contentType === 'MODEL_PAPER');
    if (!filters) return papers;
    return this.applyFilters(papers, filters);
  }

  /**
   * Strictly returns Simulated Mock Tests.
   */
  public getMockTests(filters?: PaperFilters): Paper[] {
    const papers = this.getAllPapers().filter(p => p.contentType === 'MOCK_TEST');
    if (!filters) return papers;
    return this.applyFilters(papers, filters);
  }

  /**
   * Strictly returns Official Sample Papers & School Practice Papers.
   */
  public getSamplePapers(filters?: PaperFilters): Paper[] {
    const papers = this.getAllPapers().filter(p => p.contentType === 'SAMPLE_PAPER');
    if (!filters) return papers;
    return this.applyFilters(papers, filters);
  }

  public filterPapers(filters: PaperFilters): Paper[] {
    return this.applyFilters(this.getAllPapers(), filters);
  }

  private applyFilters(papers: Paper[], filters: PaperFilters): Paper[] {
    return papers.filter(p => {
      // Strict ContentType matching
      if (filters.contentType && filters.contentType !== 'All') {
        if (p.contentType !== filters.contentType) return false;
      }
      
      // Canonical Exam / Exam Filter with robust alias matching
      const examFilter = filters.canonicalExam || filters.exam;
      if (examFilter && examFilter !== 'All') {
        const ef = String(examFilter).toUpperCase();
        if (ef === 'JEE_MAIN' || ef === 'JEE MAIN' || ef === 'JEE') {
          const isJeeMain = p.canonicalExam === 'JEE_MAIN' || (p.exam === 'JEE' && !p.title.toLowerCase().includes('advanced'));
          if (!isJeeMain) return false;
        } else if (ef === 'JEE_ADVANCED' || ef === 'JEE ADVANCED') {
          const isJeeAdv = p.canonicalExam === 'JEE_ADVANCED' || p.title.toLowerCase().includes('advanced');
          if (!isJeeAdv) return false;
        } else if (ef === 'NEET_UG' || ef === 'NEET' || ef === 'NEET-UG' || ef === 'NEET UG') {
          const isNeet = p.canonicalExam === 'NEET_UG' || p.exam === 'NEET';
          if (!isNeet) return false;
        } else if (ef === 'CBSE') {
          const isCbse = p.canonicalExam === 'CBSE' || p.exam === 'CBSE' || p.board === 'CBSE';
          if (!isCbse) return false;
        } else if (ef === 'RBSE') {
          const isRbse = p.canonicalExam === 'RBSE' || p.exam === 'RBSE' || p.board === 'RBSE';
          if (!isRbse) return false;
        } else if (ef === 'BOARD') {
          const isBoard = p.canonicalExam === 'CBSE' || p.canonicalExam === 'RBSE' || p.exam === 'Board' || p.exam === 'CBSE' || p.exam === 'RBSE';
          if (!isBoard) return false;
        } else if (p.exam !== examFilter && p.board !== examFilter && p.canonicalExam !== examFilter) {
          return false;
        }
      }

      if (filters.board && filters.board !== 'All' && p.board !== filters.board) return false;
      if (filters.subject && filters.subject !== 'All') {
        if (p.subject && p.subject !== 'Full Syllabus' && p.subject !== 'All' && p.subject !== filters.subject) {
          return false;
        }
        if (!p.subject && !p.title.toLowerCase().includes(String(filters.subject).toLowerCase())) {
          return false;
        }
      }
      if (filters.year && filters.year !== 'All' && p.year !== filters.year) return false;
      if (filters.paperType && filters.paperType !== 'All' && p.paperType !== filters.paperType) return false;
      if (filters.classLevel && filters.classLevel !== 'All' && String(p.classLevel) !== String(filters.classLevel)) return false;
      if (filters.session && filters.session !== 'All' && p.session !== filters.session) return false;
      if (filters.shift && filters.shift !== 'All' && p.shift !== filters.shift) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        const matchesSubject = p.subject ? p.subject.toLowerCase().includes(query) : false;
        if (!matchesTitle && !matchesDesc && !matchesSubject) return false;
      }
      return true;
    });
  }

  public getInventorySummary(): PaperInventorySummary {
    const papers = this.getAllPapers();
    const realPYQs = papers.filter(p => p.contentType === 'REAL_PYQ');
    const modelPapers = papers.filter(p => p.contentType === 'MODEL_PAPER');
    const mockTests = papers.filter(p => p.contentType === 'MOCK_TEST');
    const samplePapers = papers.filter(p => p.contentType === 'SAMPLE_PAPER');

    const byExam: PaperInventorySummary['byExam'] = {
      'JEE Main': { realPYQs: 0, modelPapers: 0, mockTests: 0, samplePapers: 0, years: {} },
      'JEE Advanced': { realPYQs: 0, modelPapers: 0, mockTests: 0, samplePapers: 0, years: {} },
      'NEET UG': { realPYQs: 0, modelPapers: 0, mockTests: 0, samplePapers: 0, years: {} },
      'CBSE': { realPYQs: 0, modelPapers: 0, mockTests: 0, samplePapers: 0, years: {} },
      'RBSE': { realPYQs: 0, modelPapers: 0, mockTests: 0, samplePapers: 0, years: {} }
    };

    papers.forEach(p => {
      let examKey = 'JEE Main';
      if (p.canonicalExam) {
        if (p.canonicalExam === 'JEE_MAIN') examKey = 'JEE Main';
        else if (p.canonicalExam === 'JEE_ADVANCED') examKey = 'JEE Advanced';
        else if (p.canonicalExam === 'NEET_UG') examKey = 'NEET UG';
        else if (p.canonicalExam === 'CBSE') examKey = 'CBSE';
        else if (p.canonicalExam === 'RBSE') examKey = 'RBSE';
      } else if (p.exam === 'JEE') {
        examKey = p.title.toLowerCase().includes('advanced') ? 'JEE Advanced' : 'JEE Main';
      } else if (p.exam === 'NEET') {
        examKey = 'NEET UG';
      } else if (p.exam === 'CBSE' || p.board === 'CBSE') {
        examKey = 'CBSE';
      } else if (p.exam === 'RBSE' || p.board === 'RBSE') {
        examKey = 'RBSE';
      }

      if (byExam[examKey]) {
        if (p.contentType === 'REAL_PYQ') byExam[examKey].realPYQs++;
        else if (p.contentType === 'MODEL_PAPER') byExam[examKey].modelPapers++;
        else if (p.contentType === 'MOCK_TEST') byExam[examKey].mockTests++;
        else if (p.contentType === 'SAMPLE_PAPER') byExam[examKey].samplePapers++;

        byExam[examKey].years[p.year] = (byExam[examKey].years[p.year] || 0) + 1;
      }
    });

    return {
      totalPapers: papers.length,
      realPYQs: {
        total: realPYQs.length,
        verified: realPYQs.filter(p => p.verificationStatus === 'VERIFIED').length,
        unverified: realPYQs.filter(p => p.verificationStatus === 'UNVERIFIED').length,
        needsReview: realPYQs.filter(p => p.verificationStatus === 'NEEDS_REVIEW').length,
        sourceOnly: realPYQs.filter(p => p.verificationStatus === 'SOURCE_ONLY').length
      },
      modelPapers: modelPapers.length,
      mockTests: mockTests.length,
      samplePapers: samplePapers.length,
      byExam
    };
  }

  public getPaperById(id: string): Paper | undefined {
    return this.getAllPapers().find(p => p.id === id);
  }

  public async syncWithBackend(): Promise<void> {
    try {
      const res = await fetch('/api/papers');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        this.cache = data.data;
        this.hasFetched = true;
      }
    } catch {
      // Keep static papers
    }
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

  public getImportManifest() {
    return manifestData;
  }

  public getMissingPapers() {
    return missingPapersData;
  }

  public getVerificationReport() {
    return verificationReportData;
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
paperService.syncWithBackend().catch(() => {});

