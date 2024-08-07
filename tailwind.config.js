/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const Myclass = plugin(function({ addUtilities }) {
  addUtilities({
    '.perspective-container': {
      perspective: '1000px',
    },
    '.card': {
      position: 'relative',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.8s',
    },
    '.do-flip': {
      transform: 'rotateY(180deg)',
    },
    '.front, .back': {
      backfaceVisibility: 'hidden',
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  });
});

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-principal': '#0D5A93',
        'blue-secondary': '#237DBE',
        'blue-third': '#5492BE',
        'black-principal': '#363636',
        'black-secondary': '#5B5B5B',
        'gray-principal': '#C7C7C7',
        'gray-secondary': '#C2C2C2',
        'red-principal': '#EB4335',
        'red-google': '#EA4335',
        'green-principal': '#34A853',
        'green-secondary': '#289E47'
      },
      fontFamily: {
        'archivoB': ['"Archivo Black"', 'sans-serif'],
        'archivo': ['"Archivo"', 'sans-serif'],
      },
      inset: {
        'nfull': '-100%',
      },
      height: {
        'screen-dynamic': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [Myclass],
}
