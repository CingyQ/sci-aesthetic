import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sci-aesthetic/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true,
  },
});
