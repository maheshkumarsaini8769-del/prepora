async function inspectIndex() {
  const res = await fetch('http://localhost:5000/api/ai-factory/jobs/ai_job_1789371572134');
  const data = await res.json();
  const job = data.data;
  const questions = job?.generatedQuestions || [];
  console.log('Total questions in job:', questions.length);

  const firstRejectedIndex = questions.findIndex(q => q.reviewStatus === 'Rejected');
  console.log('First rejected question index:', firstRejectedIndex);
  if (firstRejectedIndex >= 0) {
    const q = questions[firstRejectedIndex];
    console.log('First rejected question:', q.question);
    console.log('First rejected options:', q.options);
    console.log('DuplicateQuestionRef:', q.duplicateQuestionRef);
    console.log('DuplicateSimilarity:', q.duplicateSimilarity);
  }
}

inspectIndex().catch(console.error);
