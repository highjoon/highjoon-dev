import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://highjoon-dev.com',
      lastModified: new Date(),
    },
    {
      url: 'https://highjoon-dev.com/about',
      lastModified: new Date(),
    },
  ];
}
