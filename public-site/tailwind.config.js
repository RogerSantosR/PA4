/** @type {import('tailwindcss').Config} */

// Configuración de Tailwind para el módulo público.
// Tema monocromático: blanco, negro y escala de grises neutros.
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
};
