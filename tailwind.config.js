/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include root index.html
    "./public/**/*.{html,js}", // Include files in the public directory if necessary
    "./src/**/*.{html,js,jsx,ts,tsx,vue}", // Include source files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: ["@tailwindcss/aspect-ratio"],
};
