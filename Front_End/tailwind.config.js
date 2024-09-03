/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'stadium' : "url(../public/img/bgStadium.png)"
    }
    },
  },
  plugins: [],
}