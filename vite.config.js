import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://github.com/Deepan27/cleaning-service-website',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
