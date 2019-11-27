// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
      },
      spacing: {
        '80': '20rem',
        '96': '22rem',
      },
      borderRadius: {
        xl: '1rem',
      },
      maxWidth: {
        '0': '0rem',
      },
      maxHeight: {
        '96': '22rem',
      },
      fontFamily: {
        opensans: ['OpenSans-Bold'],
        default: ['Lato'],
      },
    },
  },
  variants: {
    maxWidth: ['group-hover', 'responsive'],
    border: ['responsive', 'hover', 'focus'],
    backgroundColor: ['responsive', 'group-hover', 'hover', 'focus'],
    display: ['responsive', 'group-hover', 'hover', 'focus'],
  },
}
