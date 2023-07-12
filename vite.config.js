import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/foo':'http://localhost:3000',
      '/api': {
        target: process.env.NODE_ENV,
        changeOrigin: true,
        secure: false,

        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})

