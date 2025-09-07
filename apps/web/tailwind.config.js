const baseConfig = require('@highjoon-dev/ui/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', ...baseConfig.content],
  plugins: [...baseConfig.plugins, require('@tailwindcss/typography')],
};
