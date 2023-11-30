import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd(), '');

  console.log('Port:', env.PORT);

  return {
    plugins: [react()],
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@Components': path.resolve(__dirname, './src/components'),
        '@Helpers': path.resolve(__dirname, './src/helpers'),
        '@Hooks': path.resolve(__dirname, './src/hooks'),
        '@Utils': path.resolve(__dirname, './src/utils'),
        '@Stores': path.resolve(__dirname, './src/stores'),
        '@Constants': path.resolve(__dirname, './src/constants'),
      },
    },
  }
})
