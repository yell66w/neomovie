/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",
];
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
export const theme = {
  colors: {
    primary: "#08D9D6",
    secondary: "#AAAAAA",
    neutral: "#23232D",
    white: "#fff",
    black: "#0F1015",
    transparent: colors.transparent,
  },
  screens: {
    xxs: "300px",
    xs: "475px",
    ...defaultTheme.screens,
  },
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
  },
};
export const plugins = [];
