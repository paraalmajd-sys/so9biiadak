import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode, command }) => {
  // Determine base path:
  // 1. Explicit BASE_URL from environment
  // 2. GitHub Actions environment variable GITHUB_REPOSITORY (e.g. "owner/repo" -> "/repo/")
  // 3. In production build for GitHub Pages, use "/so9biiadak/"
  // 4. In development server, use "/"
  let base = './';

  if (process.env.BASE_URL) {
    const b = process.env.BASE_URL;
    base = b.endsWith('/') ? b : `${b}/`;
  } else if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length > 1 && parts[1]) {
      base = `/${parts[1]}/`;
    }
  } else if (command === 'build' || mode === 'production') {
    base = '/so9biiadak/';
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.'),
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
