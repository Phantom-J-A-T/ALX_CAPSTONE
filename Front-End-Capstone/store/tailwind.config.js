/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#0B4A8C',   // Taken from your logo's shield
        'royal-gold': '#C5A059',   // Taken from the crowns/trim
        'royal-light': '#FAF9F6',  // Off-white for page backgrounds
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'], // For titles
        'sans': ['Inter', 'sans-serif'],           // For UI/Body
      }
    },
  },
  plugins: [],
}