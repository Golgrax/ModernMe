/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        primary: '#8b5cf6',
        secondary: '#3b82f6',
        accent: '#14b8a6', 
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}