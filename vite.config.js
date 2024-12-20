import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    build: {
        outDir: 'dist', // Make sure this matches your Vercel output directory
    },
    server: {
        hmr: true, // Ensure HMR is enabled
    },
})
