/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ["json-summary", "lcov", "text", "html"],
    },
  },
});
