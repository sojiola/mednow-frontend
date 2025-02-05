// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  // Optionally, you can include server settings if needed
  server: {
    port: 5173, // Default Vite port
    host: true, // Allow access from the local network
    build: {
      outDir: 'dist',
    },
    // You can add more server configurations here if necessary
  },
});
