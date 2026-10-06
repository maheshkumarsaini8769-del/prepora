const BASE_URL = 'http://localhost:5001/api';

async function testImageDoubt() {
  console.log('==================================================================');
  console.log('🖼️ TESTING PREPORA IMAGE DOUBT SOLVER & MULTIMODAL PIPELINE');
  console.log('==================================================================\n');

  // Step 1: Check AI Engine Status
  const statusRes = await fetch(`${BASE_URL}/ai/status`).then(r => r.json());
  console.log('1. AI Engine Current Status:');
  console.log('   Active Provider:', statusRes.data.activeProvider);
  console.log('   Has Gemini Key:', statusRes.data.hasGeminiKey);
  console.log('   Has Groq Key:', statusRes.data.hasGroqKey);

  // Step 2: Create a sample base64 test image
  // Minimal 1x1 transparent PNG or real base64 image
  const sample1x1Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  // Step 3: Test POST /api/ai/solve-doubt WITH imageBase64
  console.log('\n2. Sending Image Doubt Request to POST /api/ai/solve-doubt...');
  const testPayload = {
    question: 'A ball is thrown vertically upwards with a velocity of 20 m/s. Find the maximum height reached. (g = 10 m/s^2)',
    subject: 'Physics',
    chapter: 'Motion in a Straight Line',
    topic: 'Motion Under Gravity',
    classLevel: '11',
    targetExam: 'NEET',
    imageBase64: sample1x1Png,
    imageMimeType: 'image/png'
  };

  const solveRes = await fetch(`${BASE_URL}/ai/solve-doubt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload)
  });

  const solveData = await solveRes.json();
  console.log(`\n3. Backend Response (Status: ${solveRes.status}):`);
  console.log('   Success:', solveData.success);
  if (solveData.data) {
    console.log('   Core Concept:', solveData.data.coreConcept);
    console.log('   Key Formula:', solveData.data.keyFormula);
    console.log('   Answer Summary:', solveData.data.answer);
    console.log('   Step-by-Step Solution:');
    (solveData.data.stepByStepSolution || []).forEach((s: string) => console.log('     •', s));
  } else {
    console.log('   Error Details:', solveData);
  }

  // Step 4: Test Image ONLY (Without Question Text)
  console.log('\n4. Testing Image-Only Doubt (Question text empty, student uploaded only photo)...');
  const imageOnlyPayload = {
    question: '',
    subject: 'Physics',
    chapter: 'Kinematics',
    imageBase64: sample1x1Png,
    imageMimeType: 'image/png'
  };

  const imgOnlyRes = await fetch(`${BASE_URL}/ai/solve-doubt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageOnlyPayload)
  });

  const imgOnlyData = await imgOnlyRes.json();
  console.log(`   Image-Only Response Status: ${imgOnlyRes.status}`);
  console.log('   Success:', imgOnlyData.success);
  if (imgOnlyData.data) {
    console.log('   Core Concept:', imgOnlyData.data.coreConcept);
    console.log('   Answer:', imgOnlyData.data.answer);
    console.log('   Solution Steps:');
    (imgOnlyData.data.stepByStepSolution || []).forEach((s: string) => console.log('     •', s));
  }
}

testImageDoubt().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
