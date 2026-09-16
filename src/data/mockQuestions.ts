import { Question } from '../types';
import { physicsBank } from './questions/physicsBank';
import { chemistryBank } from './questions/chemistryBank';
import { biologyBank } from './questions/biologyBank';
import { mathBank } from './questions/mathBank';

export { physicsBank, chemistryBank, biologyBank, mathBank };

export const mockQuestions: Question[] = [
  ...physicsBank,
  ...chemistryBank,
  ...biologyBank,
  ...mathBank
];
