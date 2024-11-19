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
      },
      backgroundImage: {
        'heroImg': "url('/src/assets/heroImg.jpg')",
        'heroImg2': "url('/src/assets/heroImg2.jpg')",
      },
      textShadow: {
        lg: "4px 4px 6px rgba(0, 0, 0, 0.8)",
      },
      screens: {
        'xs': '475px', // Extra small screens
        'sm': '640px', // Small screens (default Tailwind breakpoint)
        'md': '768px', // Medium screens (default Tailwind breakpoint)
        'lg': '1024px', // Large screens (default Tailwind breakpoint)
        'xl': '1280px', // Extra large screens (default Tailwind breakpoint)
        '2xl': '1536px', // 2x Extra large screens (default Tailwind breakpoint)
        '3xl': '1920px' // For ultra-wide screens
      },
    },
  },
  plugins: [],
}

