import baseConfig from '@highjoon-dev/ui/postcss.config';

/** @type {import('postcss-load-config').Config} */
const config = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    autoprefixer: {},
  },
};

export default config;
