import class12Data from './class12_syllabus_database.json';

export interface Class12Subtopic {
  subtopicId: string;
  subtopicName: string;
  concepts: string[];
  formulas: string[];
  examples: string[];
  questionIds: string[];
}

export interface Class12Topic {
  topicId: string;
  topicName: string;
  subtopics: Class12Subtopic[];
}

export interface Class12Chapter {
  class: number;
  subject: string;
  chapterId: string;
  chapterName: string;
  unit: string;
  examTags: string[];
  academicYear: string;
  syllabusStatus: string;
  sourceReferences: string[];
  topics: Class12Topic[];
}

export const class12SyllabusDatabase: Class12Chapter[] = class12Data as Class12Chapter[];

export default class12SyllabusDatabase;
