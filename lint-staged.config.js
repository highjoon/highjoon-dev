module.exports = {
  './app/**/*.{js,jsx,ts,tsx}': [() => 'pnpm prettier:fix', () => 'pnpm lint:fix'],
  './app/**/*.{ts,tsx}': [() => 'pnpm tsc --pretty --skipLibCheck --noEmit'],
};
