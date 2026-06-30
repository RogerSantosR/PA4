import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuracion de Vite para la SPA del Portal del Estudiante.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
