/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#1D2243',
        secondary:'#5A69AF',
        tertiary:'#A6ABD7'

      }
    },
  },
  plugins: [],
}

