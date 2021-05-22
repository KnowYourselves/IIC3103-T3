module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwind-scrollbar'),
  ],
};
