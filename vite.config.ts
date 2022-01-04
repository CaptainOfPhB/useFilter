import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: 'lib',
      polyfillModulePreload: false,
      lib: {
        formats: ['es'],
        entry: resolve(__dirname, 'src/index.ts')
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'antd']
      }
    },
    server: {
      hmr: false,
      open: '/playground/index.html'
    },
    plugins: [
      react(),
      typescript({
        tsconfig: mode === 'development' ? 'tsconfig.json' : 'tsconfig.build.json'
      }),
      visualizer({
        open: true
      }),
      eslint({
        cache: false,
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'playground/**/*.ts', 'playground/**/*.tsx']
      })
    ]
  };
});
