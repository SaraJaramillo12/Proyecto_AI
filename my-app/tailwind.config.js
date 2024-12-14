/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Configuración de colores personalizados
      colors: {
        primary: {
          green: "#2D6A4F",
          lightGreen: "#74C69D",
        },
        secondary: {
          blue: "#0077B6",
          lightBlue: "#ADE8F4",
        },
        neutral: {
          gray: "#E5E5E5",
          beige: "#FFDDD2",
          brown: "#B5838D",
        },
        warning: {
          red: "#FF6347",
        },
      },
      // Configuración de fuentes personalizadas
      fontFamily: {
        sans: ["Roboto", "Open Sans", "sans-serif"],
        heading: ["Poppins", "Montserrat", "sans-serif"],
      },
      // Perspectiva 3D personalizada
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
  safelist: [
    "rotate-y-180", // Fuerza Tailwind a incluir esta clase
    "backface-hidden", // Asegúrate de que no se purgue
  ],
};
