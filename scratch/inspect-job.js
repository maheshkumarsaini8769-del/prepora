async function inspectJob() {
  const res = await fetch('http://localhost:5000/api/ai-factory/jobs/ai_job_1789371572134');
  const data = await res.json();
  const job = data.data;
  console.log('Job:', job?.id, 'Total:', job?.generatedCount, 'Valid:', job?.validCount);
  const rejected = job?.generatedQuestions?.filter(q => q.reviewStatus === 'Rejected') || [];
  console.log('Total Rejected:', rejected.length);

  for (let i = 0; i < Math.min(6, rejected.length); i++) {
    const q = rejected[i];
    console.log(`\nRejected #${i + 1}:`);
    console.log('Topic:', q.topic);
    console.log('Question:', q.question);
    console.log('Options:', q.options);
    console.log('RejectReason:', q.rejectReason);
    console.log('QualityFlags:', q.qualityFlags);
    console.log('DupStatus:', q.duplicateStatus, 'Sim:', q.duplicateSimilarity);
  }
}

inspectJob().catch(console.error);
