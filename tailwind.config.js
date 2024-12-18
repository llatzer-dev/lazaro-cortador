/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#631111",
        secondary: "#254d02",
        "secondary-hover": "#618442",
        "primary-black": "#1a1a1a",
        "secondary-black": "#222",
        "tertiary-black": "#323232",
        "primary-white": "#fff",
        "secondary-white": "#ffffffb3",
        skeleton: "#E2E8F0",
      },
    },
  },
  plugins: [],
};
