import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_NORA_ENV === 'production' ? './' : './',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: undefined,
          assetFileNames: '[name].dreams-ad-engine.[ext]',
          entryFileNames: '[name].dreams-ad-engine.js',
          chunkFileNames: '[name].dreams-ad-engine.js',
        },
      },
      cssCodeSplit: false,
      chunkSizeWarningLimit: 1000,
    },
  });
};
