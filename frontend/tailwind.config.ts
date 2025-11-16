import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          25: '#f2f7ff',
          50: '#ecf3ff',
          100: '#e6f6ff',
          200: '#c7e3ff',
          300: '#9bc9ff',
          400: '#64aaff',
          500: '#2f8bff',
          600: '#216fe0',
          700: '#1757b4',
          800: '#104085',
          900: '#0a2b5c'
        },
        slate: {
          950: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 35px -15px rgba(15, 23, 42, 0.45)',
        card: '0 20px 45px -20px rgba(37, 99, 235, 0.25)'
      }
    }
  },
  plugins: []
}

export default config

