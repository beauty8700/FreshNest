/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Earthy Greens
        'forest-green': '#2d5016',
        'sage-green': '#4a7c59',
        'moss-green': '#6b9e6f',
        'leaf-green': '#8fbc8f',
        'mint-green': '#a8d5ba',
        // Earthy Browns & Tans
        'earth-brown': '#8b7355',
        'warm-brown': '#a0826d',
        'sand-tan': '#c4a574',
        'cream-tan': '#d4c4a8',
        'light-beige': '#e8ddd4',
        // Natural Backgrounds
        'nature-beige': '#f5f5dc',
        'off-white': '#faf9f6',
        'soil-brown': '#6b5b4f',
        // Accents
        'accent-green': '#4a7c59',
        'dark-green': '#2d5016',
        'light-green': '#a8d5ba',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

