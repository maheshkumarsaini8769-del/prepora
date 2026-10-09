import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('katex')) return 'vendor-katex';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react';
            return 'vendor-libs';
          }
          // Isolate question banks by subject for parallel download and caching
          if (id.includes('biologyBank')) return 'data-questions-biology';
          if (id.includes('chemistryBank')) return 'data-questions-chemistry';
          if (id.includes('physicsBank')) return 'data-questions-physics';
          if (id.includes('mathBank')) return 'data-questions-math';
          if (id.includes('/questions/') || id.includes('mockQuestions')) {
            return 'data-questions-core';
          }
          // Isolate syllabus databases
          if (
            id.includes('canonicalSyllabusData') ||
            id.includes('class11_syllabus') ||
            id.includes('class12_syllabus') ||
            id.includes('class11Syllabus') ||
            id.includes('class12Syllabus')
          ) {
            return 'data-syllabus';
          }
          // Isolate formula database
          if (id.includes('comprehensiveFormulaNotes')) {
            return 'data-formulas';
          }
          // Isolate real papers database
          if (id.includes('realPapersData')) {
            return 'data-papers';
          }
          // Isolate video lectures database
          if (id.includes('videoLectures') || id.includes('topicVideosData')) {
            return 'data-videos';
          }
        },
      },
    },
  },
});
