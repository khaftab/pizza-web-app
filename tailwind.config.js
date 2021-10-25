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
      },
      colors: {
        trnasparent: 'transparent',
        current: 'currentColor',
        primary: '#FE5F1E',
        'primary-hover': '#b23301',
        secondary: '#F8F8F8',
        pure: '#fff',
        'pure-dark': '#232323',
        grey: '#ccc'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
