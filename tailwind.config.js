module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darky: "#202125"
      },
      dropShadow: {
        'darky': '0 8px 8px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif']
      },
      backgroundImage: {
        'witcher-image': "url('/witcher.png')"
      }
    },
  },
  plugins: [],
}
