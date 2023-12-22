/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{html,js}",
  "./components/**/*.{html,js}",
  "./index.html",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require("@tailwindcss/forms"),
  require("@tailwindcss/aspect-ratio"),
  require("@tailwindcss/typography"),
  require("tailwindcss-children"),
];
