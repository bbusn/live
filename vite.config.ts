import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import PurgeIcons from 'vite-plugin-purge-icons';

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
            iconLibraries: ['@iconify/json/hugeicons', '@iconify/json/lucide', '@iconify/json/fa-solid'],
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
    },
});
