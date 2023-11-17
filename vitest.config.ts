import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ['json-summary', 'lcov', 'text', 'html']
    }
  }
});
