import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        {
            ...obfuscator({
                options: {
                    compact: true,
                    controlFlowFlattening: true,
                    deadCodeInjection: true,
                    debugProtection: true,
                    disableConsoleOutput: true,
                    identifierNamesGenerator: 'hexadecimal',
                    numbersToExpressions: true,
                    simplify: true,
                    splitStrings: true,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    stringArrayThreshold: 0.75,
                    selfDefending: true,
                    rotateStringArray: true,
                },
            }),
            apply: 'build',
        },
    ],
    build: {
        sourcemap: false,
    },
});
