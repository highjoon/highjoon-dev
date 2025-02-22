import { type MetadataRoute } from 'next';
import dayjs from 'dayjs';

import { getPostList } from '@/apis/post';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postList = await getPostList();
  const allTags = getAllTagsFromPosts({ postList: postList.responseObject });

  return [
    {
      url: 'https://highjoon-dev.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://highjoon-dev.vercel.app/about',
      lastModified: new Date(),
    },
    ...postList.responseObject.map((post) => {
      return {
        url: `https://highjoon-dev.vercel.app/blogs/${post.slug}`,
        lastModified: dayjs(!!post.updatedAt ? post.updatedAt : post.createdAt).toDate(),
      };
    }),
    ...allTags.map((tag) => {
      return {
        url: `https://highjoon-dev.vercel.app/tags/${tag}/1`,
        lastModified: new Date(),
      };
    }),
  ];
}
