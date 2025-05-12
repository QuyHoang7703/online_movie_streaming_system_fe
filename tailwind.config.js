/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
      },
      colors: {
        mainColor: "#ECE000",
        mainColorHover: "#d4c900",
        primary: "#1B2431",
        secondary: "#f6f2ee",
        accent: "#ECE000",
        textPrimary: "#FFFFFF",
        textSecondary: "#000000",
        borderColor: "#4B5563",
        createButton: "#4880FF",
        dark: {
          100: "#273142",
          200: "#1B2431",
          300: "#272a38",
          400: "#191b24",
        },
        mainUserColor: {
          100: "#ffd875",
          200: "#ffe49e",
        },
      },
    },
  },
  plugins: [],
};
