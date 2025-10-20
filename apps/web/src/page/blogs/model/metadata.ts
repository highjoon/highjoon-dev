import { Metadata } from 'next';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';
import { serverApi } from '@/shared/api/apiClient/serverApi';

type Params = {
  params: { slug: Post['slug'] };
};

export const generateBlogsMetadata = async ({ params }: Params): Promise<Metadata> => {
  const post = await getPostApi(serverApi, params);

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
