import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src', '!src/**/*.spec.*', '!src/tests/**'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true
});
