/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-pattern': "url('/src/assets/images/background.png')"
      },
      fontFamily: {
        'pangolin': ["Pangolin", "serif"],
        'leckerli-one': ["Leckerli One", "serif"],
        'nunito': ["Nunito", "sans-serif"],
        'roboto': ["Roboto", "sans-serif"],
        'comic': ["'Comic Sans MS'", "'Cambria'", "'Roboto'", "sans-serif", "'Times New Roman'", "cursive"]
      }
    },
  },
  plugins: [],
}

