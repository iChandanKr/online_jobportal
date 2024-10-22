/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        width: {
          '96': '28rem',
        },
        height: {
          '80': '20rem',
          '96':'24rem',
        },
      },
    },
    plugins: [],
  }
