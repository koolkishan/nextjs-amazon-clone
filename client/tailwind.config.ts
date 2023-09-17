import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [],
};
export default config;
