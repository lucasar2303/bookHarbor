/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-principal': '#0D5A93',
        'blue-secondary': '#237DBE',
        'black-principal': '#363636',
        'black-secondary': '#5B5B5B',
        'gray-principal': '#C7C7C7'
      },
      fontFamily: {
        'archivoB': ['"Archivo Black"', 'sans-serif'],
        'archivo': ['"Archivo"', 'sans-serif'],
      },
      inset: {
        'nfull': '-100%',
      }
      


    },
  },
  plugins: [],
}

