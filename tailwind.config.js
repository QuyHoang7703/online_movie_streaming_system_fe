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
      },
    },
  },
  plugins: [],
};
