const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sapphire: {
          50: '#e6f0ff',
          100: '#b3ccff',
          200: '#80a6ff',
          300: '#4d82ff',
          400: '#1a5eff',
          500: '#0046e6', 
          600: '#0039b3',
          700: '#002d80',
          800: '#00204d',
          900: '#001233',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
