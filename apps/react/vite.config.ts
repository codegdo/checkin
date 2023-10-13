import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Helpers': path.resolve(__dirname, './src/helpers'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      },
    },
  },
})
