module.exports = {
  './src/**/*.{js,jsx,ts,tsx}': [() => 'pnpm prettier:fix', () => 'pnpm lint:fix'],
  './src/**/*.{ts,tsx}': [() => 'pnpm tsc --pretty --skipLibCheck --noEmit'],
};
