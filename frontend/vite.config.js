import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import typography from '@tailwindcss/typography';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), typography],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // proxy /api requests to backend
    },
  },
});
