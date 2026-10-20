import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Calculate appropriate base URL for deployment:
// 1. If BASE_URL is explicitly provided (e.g. in GitHub Actions or custom domain), use it.
// 2. If running inside GitHub Actions (GITHUB_REPOSITORY = "owner/repo"), use "/repo/".
// 3. Fallback to relative path './' for local preview / standalone hosts.
const getBase = () => {
  if (process.env.BASE_URL) {
    const b = process.env.BASE_URL;
    return b.endsWith('/') ? b : `${b}/`;
  }
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length > 1 && parts[1]) {
      return `/${parts[1]}/`;
    }
  }
  return './';
};

export default defineConfig(() => {
  return {
    base: getBase(),
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
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
