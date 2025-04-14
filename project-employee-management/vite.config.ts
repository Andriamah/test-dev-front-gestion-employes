import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: '0.0.0.0',  // Permet d'écouter sur toutes les interfaces réseau
    port: 5173         // Assure-toi que le port correspond à ce que tu as exposé
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
