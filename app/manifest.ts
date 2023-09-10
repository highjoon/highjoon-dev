import { MetadataRoute } from 'next';

import { colors } from '@/styles/themes/foundations/colors';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'highJoon.dev',
    short_name: 'highJoon.dev',
    description: "highJoon's dev-log",
    start_url: '/',
    display: 'standalone',
    background_color: colors.white,
    theme_color: colors.white,
    icons: [
      {
        src: 'public/favicon/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
