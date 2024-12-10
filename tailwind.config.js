/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#631111",
        secondary: "#2c5b02",
        "secondary-hover": "#618442",
        "primary-black": "#000",
        "secondary-black": "#222",
        "tertiary-black": "#323232",
        "primary-white": "#fff",
        "secondary-white": "#a1a1aa",
      },
    },
  },
  plugins: [],
};
