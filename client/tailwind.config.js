/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      COLORS: {
        homeclr: "#1A6093",
        secondary: "#444262",
        tertiary: "#FF7754",
        gray: "#83829A",
        gray2: "#C1C0C8",
        white: "#F3F4F8",
        lightWhite: "#FAFAFC",
      },
      SIZES: {
        xSmall: 10,
        small: 12,
        medium: 16,
        large: 20,
        xLarge: 24,
        xxLarge: 32,
      },
    },
  },
  plugins: [require("daisyui")],
}

