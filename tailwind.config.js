module.exports = {
  // mode: 'jit',
  purge: [
    './client/resources/views/**/*.ejs'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato' sans-serif"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
