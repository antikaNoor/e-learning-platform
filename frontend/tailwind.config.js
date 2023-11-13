/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#333333",
        tertiary: "#242424",
        tPrimary: "#FCFCFC",
        tSecondary: "#5C5C5C",
        btnDanger: "#ED2A26",
        btnDangerHover: "#C21E1A",
        btnYellow: "#FFC700",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};