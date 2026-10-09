import class11Data from './class11_syllabus_database.json';

export interface Class11Subtopic {
  subtopicId: string;
  subtopicName: string;
  concepts: string[];
  formulas: string[];
  diagrams: string[];
  examples: string[];
  questionIds: string[];
}

export interface Class11Topic {
  topicId: string;
  topicName: string;
  subtopics: Class11Subtopic[];
}

export interface Class11Chapter {
  class: number;
  subject: string;
  chapterId: string;
  chapterName: string;
  unit: string;
  examTags: string[];
  academicYear: string;
  syllabusStatus: string;
  sourceReferences: string[];
  topics: Class11Topic[];
}

export const class11SyllabusDatabase: Class11Chapter[] = class11Data as Class11Chapter[];

export default class11SyllabusDatabase;
