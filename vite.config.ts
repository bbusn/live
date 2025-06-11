import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import PurgeIcons from 'vite-plugin-purge-icons';
import PurgeCSS from 'vite-plugin-purgecss';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        createHtmlPlugin({
            minify: true,
            entry: 'src/main.tsx',
            template: './index.html',
        }),
        PurgeIcons({
            content: ['./index.html', './src/**/*.{ts,tsx}'],
        }),
        PurgeCSS({
            content: ['./index.html', './src/**/*.{ts,tsx}'],
        }),
    ],
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
                    icons: ['@iconify/react'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', '@iconify/react'],
    },
});
