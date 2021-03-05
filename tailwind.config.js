const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./src/**/*.{vue,js,jsx}'],
  darkMode: false,
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      pink: colors.pink,
      teal: colors.teal
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
