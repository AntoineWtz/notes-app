module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#FF0066',
        secondary: '#00FFFF',
        accent1: '#6A00FF',
        accent2: '#00FF88',
        backgroundLight: '#F3F3F3',
        backgroundDark: '#1A1A1A',
        textLight: '#FFFFFF',
        textDark: '#111111',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
