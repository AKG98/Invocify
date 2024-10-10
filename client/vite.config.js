import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://invocify-modern-invoicing.onrender.com', //'https://invocify-server.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
