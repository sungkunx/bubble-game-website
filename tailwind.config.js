/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#667eea',
          600: '#764ba2',
          700: '#5a67d8',
        }
      }
    },
  },
  plugins: [],
}