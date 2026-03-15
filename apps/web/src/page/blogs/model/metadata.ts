import { Metadata } from 'next';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';

type Params = {
  params: Promise<{ slug: Post['slug'] }>;
};

export const generateBlogsMetadata = async ({ params: paramsPromise }: Params): Promise<Metadata> => {
  const params = await paramsPromise;
  const post = await getPostApi(params);

  if (!post) {
    return { title: 'Not Found | highjoon-dev' };
  }

  return {
    title: `${post.title} | highjoon-dev`,
    description: post.description,
    openGraph: {
      title: `${post.title} | highjoon-dev`,
      description: post.description,
      type: 'article',
      url: `https://highjoon-dev.com/blogs/${params.slug}`,
      images: [post.bannerImageUrl],
      publishedTime: post.publishedAt.toString(),
      modifiedTime: post.updatedAt?.toString() || post.publishedAt.toString(),
      authors: ['highjoon'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | highjoon-dev`,
      description: post.description,
      images: [post.bannerImageUrl],
    },
    alternates: {
      canonical: `https://highjoon-dev.com/blogs/${params.slug}`,
    },
  };
};
