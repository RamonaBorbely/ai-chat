/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b32c7',
        secondary: '#fe6602',
        neutralWhite: '#fff',
        neutralGrey: '#d0d5dd '
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': '48px',
        'h2': '32px',
        'body': '16px'
      }
    },
  },
  plugins: [],
}

