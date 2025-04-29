module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '100': '100',
        '9999': '9999',
      }
    },
  },
  plugins: [],
}
