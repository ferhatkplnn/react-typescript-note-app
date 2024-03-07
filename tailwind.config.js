/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgNavy: "#160040",
        primary: "#9A0680",
        secondary: "#79018C",
        lightNavy: "#4C0070",
      },
      fontFamily: {
        kalam: ["Kalam", "cursive"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
