import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@context': '/src/context',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@data': '/src/data',
      '@types': '/src/types'
    }
  }
})