async function test400() {
  console.log('--- Testing Section 962: 400 Questions Target ---');
  const res = await fetch('http://localhost:5000/api/ai-factory/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chapter: 'The Living World',
      subject: 'Biology',
      count: 400,
      mode: 'chapter_bank'
    })
  });
  const data = await res.json();
  console.log('Generate 400 response:', data.message, 'JobId:', data.jobId);

  const jobId = data.jobId;
  if (!jobId) return;

  // Poll job status until it reaches 400 or max iterations
  for (let i = 0; i < 45; i++) {
    await new Promise(r => setTimeout(r, 700));
    const jobRes = await fetch(`http://localhost:5000/api/ai-factory/jobs/${jobId}`);
    const jobData = await jobRes.json();
    const j = jobData.data;
    console.log(`Poll #${i + 1}: Status=${j?.status}, Batch=${j?.currentBatch}/${j?.totalBatches}, Valid=${j?.validCount}/${j?.requestedCount}, Dups=${j?.duplicateCount}, Rejected=${j?.rejectedCount}, Progress=${j?.progress}% [${j?.currentTopic}]`);
    if (j?.status === 'ReadyForReview' || j?.status === 'Completed') {
      console.log(`\nSUCCESS: 400 Questions Target Reached! Total Valid: ${j?.validCount}/${j?.requestedCount}`);
      console.log('Total Generated Count:', j?.generatedCount);
      console.log('Total Duplicates Replaced:', j?.duplicateCount);
      console.log('Total Rejected Replaced:', j?.rejectedCount);
      break;
    }
  }
}

test400().catch(console.error);
