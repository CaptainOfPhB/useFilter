import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'playground/index.html'),
    },
  },
  server: {
    open: '/playground/index.html'
  },
  plugins: [
    react(),
  ],
});
