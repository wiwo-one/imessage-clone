module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "imessage-gray": "#F1F1F1", //rgb(241,241,241)
        "imessage-gray-2": "rgb(211,211,211)", // lines
        "imessage-dark-gray": "rgb(221,221,221)", //rgb(221,221,221)
        "imessage-dark-gray-2": "rgb(121,121,121)", //icons bg
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
