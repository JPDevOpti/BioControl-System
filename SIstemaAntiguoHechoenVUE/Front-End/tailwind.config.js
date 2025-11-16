/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'LIME-Azul-Claro': '#CAEAF2',
        'LIME-Azul-2': '#8FC8DE',
        'LIME-Azul-3': '#5CA6C9',
        'LIME-Azul-4': '#2974A3',
        'LIME-Azul-Oscuro': '#064D5F',
        brand: {
          25: '#f2f7ff',
          50: '#ecf3ff',
          100: '#E6FAEC',
          200: '#E6FAEC',
          300: '#B3EBC7',
          400: '#A4EAB5',
          500: '#7FCB97',
          600: '#7FCB97',
          700: '#3D8D5B',
          800: '#3D8D5B',
          900: '#3D8D5B',
          950: '#161950'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
        outfit: ['Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
}
