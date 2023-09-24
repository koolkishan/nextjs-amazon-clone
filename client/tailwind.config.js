/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "amazon-dark": "#141B24",
        "amazon-background": "#eef3f9",
        "amazon-primary": "#ff9900",
        "amazon-secondary": "#ffb700",
        "amazon-blue": "#00a8e1",
      },
    },
  },
};
