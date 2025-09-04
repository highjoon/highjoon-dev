import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config) => {
    // PostCSS 설정 추가
    config.css = {
      ...config.css,
      postcss: {
        plugins: [await import('@tailwindcss/postcss').then((mod) => mod.default ?? mod)],
      },
    };

    // Path alias 설정 추가
    const srcPath = join(__dirname, '../src');
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': srcPath,
        '@highjoon-dev/ui': srcPath,
        '@highjoon-dev/ui/lib': join(srcPath, 'lib'),
        '@highjoon-dev/ui/components': join(srcPath, 'components'),
      },
    };

    return config;
  },
};
export default config;
