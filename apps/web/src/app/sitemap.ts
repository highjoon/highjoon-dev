import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://highjoon-dev.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://highjoon-dev.vercel.app/about',
      lastModified: new Date(),
    },
  ];
}
