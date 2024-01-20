import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'], // additional assets to precache
      manifest: {
        name: 'Nom de l\'App',
        short_name: 'NomCourt',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/azerty.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/azerty.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // ... other sizes or icons for different devices
        ],
      },
    }),
  ],
});