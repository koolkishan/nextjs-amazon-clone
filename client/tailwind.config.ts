import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff9900",
        "amazon-dark": "#141B24",
        "amazon-background": "#eef3f9",
        "amazon-primary": "#ff9900",
        "amazon-secondary": "#ffb700",
        "amazon-blue": "#00a8e1",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
