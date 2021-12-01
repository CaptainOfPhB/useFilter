import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    outDir: 'lib',
    polyfillModulePreload: false,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'components/index.ts')
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'object-assign', 'antd']
    }
  },
  server: {
    open: '/playground/index.html'
  },
  plugins: [
    react(),
    typescript({
      tsconfig: 'tsconfig.build.json'
    }),
    visualizer({
      open: true
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src', 'playground']
    })
  ]
});
