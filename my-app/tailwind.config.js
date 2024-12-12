/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Usar la propiedad perspective 3d directamente aquí
      perspective: {
        '1000': '1000px', // Se agrega un valor explícito para la perspectiva
      },
    },
  },
  plugins: [],
  safelist: [
    "rotate-y-180", // Fuerza Tailwind a incluir esta clase
    "backface-hidden", // Asegúrate de que no se purgue
  ],
}
