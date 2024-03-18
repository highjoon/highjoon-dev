import { MetadataRoute } from 'next';

import { posts } from '@/data/posts';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';

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
    ...posts.map((post) => {
      return {
        url: `https://highjoon-dev.vercel.app/blogs/${post.fileName}`,
        lastModified: new Date(post.date),
      };
    }),
    ...getAllTagsFromPosts().map((tag) => {
      return {
        url: `https://highjoon-dev.vercel.app/tags/${tag}/1`,
        lastModified: new Date(),
      };
    }),
  ];
}
