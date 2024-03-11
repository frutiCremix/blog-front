/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    theme:{
     
    },
    extend: { 
      fontSize:{
        small:'0.6rem'
      }
    },
  },
  plugins: [],
}