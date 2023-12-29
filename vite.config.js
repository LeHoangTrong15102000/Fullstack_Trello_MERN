import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép thầng vite sử dụng được process.env, mặc đinh phải dùng import.meta.env
  define: {
    'process.env': process.env
  },
  plugins: [react(), svgr()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  base: './',
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
