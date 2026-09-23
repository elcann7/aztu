import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: process.env.AZTU_API_PROXY ? {
    proxy: { '/api': { target: process.env.AZTU_API_PROXY, changeOrigin: true } },
  } : undefined,
})
