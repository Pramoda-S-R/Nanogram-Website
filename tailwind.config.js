/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      screens: {
        hd: "1080px",
        xs: "480px",
      },
      colors: {
        primary: {
          DEFAULT: "#0D2DA2",
        },
        secondary: {
          DEFAULT: "#8DE3FF",
        },
        neutral: {
          white: "#FFFFFF",
          black: "#0A0A1A",
        },
        accent: {
          yellow: "#EAE38F",
          gray: "#E6E8E6",
        },
      },
      height: {
        "screen-top": "calc(100vh - 96px)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
