import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  // 重要：部署到 GitHub Pages 時，如果您的 Repo 名稱是 'fukuoka-trip'，這裡通常設為 '/fukuoka-trip/'
  // 如果是使用者頁面 (username.github.io)，則設為 '/'
  base: './', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'icon.svg'],
      manifest: {
        name: '2025福岡之旅_',
        short_name: '福岡2025',
        description: '2025 Winter Trip to Fukuoka Itinerary',
        theme_color: '#234787',
        background_color: '#234787',
        display: 'standalone',
        orientation: 'portrait',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});