import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1'
  },
  optimizeDeps: {
    include: ['react-window']   // ← вот эта строчка заставит Vite правильно обработать библиотеку
  }
})
