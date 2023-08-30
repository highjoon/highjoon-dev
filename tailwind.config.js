const { colors } = require('./styles/themes/foundations/colors');
const { boxShadow } = require('./styles/themes/foundations/boxShadow');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors,
    boxShadow,
    hljs: {
      theme: 'github-dark',
    },
  },
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  plugins: [require('@tailwindcss/typography'), require('tailwind-highlightjs')],
};
