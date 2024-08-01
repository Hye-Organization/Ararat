/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 0.3s",
      },
      colors: {
        "slate-925": "#080F21",
        "slate-850": "#172033",
        "slate-825": "#1A2537",
        "slate-750": "#293548",
        "slate-725": "#2E3B4E",
      },
    },
  },
  darkMode: "selector",
  plugins: [require("tailwindcss-animated")],
};
