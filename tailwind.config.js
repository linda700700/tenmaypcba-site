/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0A3D26',
          800: '#0B5A34',
          700: '#0E5C38',
          600: '#126B3F',
          500: '#1B7A4B',
          400: '#3E9A5E',
          300: '#5BAC5D',
          200: '#A9D3B0',
          100: '#E4F1E8',
          50: '#F2F8F4',
        },
        tealbrand: {
          700: '#0B6E86',
          600: '#118AA7',
          500: '#189DBD',
          100: '#E4F3F8',
          50: '#F2FAFC',
        },
        foxconn: {
          blue: '#005BAC',          // 经典富士康/鸿海深科技蓝
          'blue-dark': '#003E7E',
          'blue-light': '#EBF4FC',
          navy: '#0B2545',
          accent: '#0284C7',
          orange: '#FF5500',
        },
      },
      fontFamily: {
        display: ['"Barlow Semi Condensed"', '"IBM Plex Sans"', 'sans-serif'],
        sans: [
          '"IBM Plex Sans"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace'
        ]
      }
    },
  },
  plugins: [],
};
