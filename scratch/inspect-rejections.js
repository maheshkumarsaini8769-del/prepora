import mongoose from 'mongoose';
import { AIFactoryJob } from '../server/models/AIFactory.js';

async function inspectRejections() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://prepora:prepora123@ac-hus39cd-shard-00-00.077ex67.mongodb.net/prepore_db?retryWrites=true&w=majority&appName=prepore');
  const job = await AIFactoryJob.findOne().sort({ createdAt: -1 });
  console.log('Job:', job?.id, 'Total:', job?.generatedCount, 'Valid:', job?.validCount);

  const rejected = job?.generatedQuestions.filter(q => q.reviewStatus === 'Rejected') || [];
  console.log('Total Rejected:', rejected.length);

  for (let i = 0; i < Math.min(5, rejected.length); i++) {
    const q = rejected[i];
    console.log(`\nRejected #${i + 1}:`);
    console.log('Question:', q.question);
    console.log('Options:', q.options);
    console.log('QualityFlags:', q.qualityFlags);
    console.log('RejectReason:', q.rejectReason);
    console.log('DuplicateStatus:', q.duplicateStatus, 'Similarity:', q.duplicateSimilarity, 'Ref:', q.duplicateQuestionRef);
  }
  await mongoose.disconnect();
}

inspectRejections().catch(console.error);
