import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true, // IPアクセス対応
    port: 5173,
    watch: {
      usePolling: true, // Docker/WSL対策
    },
  },
})