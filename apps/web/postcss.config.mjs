import baseConfig from '@highjoon-dev/ui/postcss.config';

/** @type {import('postcss-load-config').Config} */
const config = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    autoprefixer: {},
  },
};

export default config;
