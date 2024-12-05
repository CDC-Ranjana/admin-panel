
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }), // Ensure compatibility
  ],
  variants: {
    scrollbar: ['rounded'], // Add 'rounded' scrollbar support
  },
};
