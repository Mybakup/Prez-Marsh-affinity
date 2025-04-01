/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mybakup-coral': '#ff3c00',
        'mybakup-blue': '#424e6f',
        'mybakup-light-coral': '#fff5f2',
        'mybakup-light-blue': '#f5f6f9'
      }
    },
  },
  plugins: [],
};