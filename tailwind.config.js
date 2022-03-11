module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'first': '#f2f2f2',
        'accent': '#f96d00',
        'dark-first': '#222831',
        'dark-second': '#393e46',
        'dark-third': '#444a54',
        'dark-accent': ' #f96d00',
        'dark-secondAccent': '#f2f2f2',
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
}
