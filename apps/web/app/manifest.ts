import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'highjoon-dev',
    description: "highjoon's dev-log",
    short_name: 'highjoon-dev',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    orientation: 'portrait',
    scope: '/',
    lang: 'ko',
    icons: [
      {
        sizes: '72x72',
        src: 'favicon/icon-72x72.png',
        type: 'image/png',
      },
      {
        sizes: '96x96',
        src: 'favicon/icon-96x96.png',
        type: 'image/png',
      },
      {
        sizes: '128x128',
        src: 'favicon/icon-128x128.png',
        type: 'image/png',
      },
      {
        sizes: '144x144',
        src: 'favicon/icon-144x144.png',
        type: 'image/png',
      },
      {
        sizes: '152x152',
        src: 'favicon/icon-152x152.png',
        type: 'image/png',
      },
      {
        sizes: '192x192',
        src: 'favicon/icon-192x192.png',
        type: 'image/png',
      },
      {
        sizes: '384x384',
        src: 'favicon/icon-384x384.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: 'favicon/icon-512x512.png',
        type: 'image/png',
      },
    ],
  };
}
