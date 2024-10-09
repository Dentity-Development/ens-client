import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    dedupe: ['react', 'react-dom'], //possibly needed due to duplicates from monorepo. supposedly plugin-react already does this? https://github.com/vitejs/vite/issues/8378
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    sourcemap: false,
    minify: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  optimizeDeps: {
    include: ['@dentity/ens-client'],
  },
});
