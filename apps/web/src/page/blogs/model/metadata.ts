import { Metadata } from 'next';
import { Post } from '@highjoon-dev/prisma';

import { postApi } from '@/apis/post';
import { serverApi } from '@/shared/api/apiClient/serverApi';

type Params = {
  params: { slug: Post['slug'] };
};

export const generateBlogsMetadata = async ({ params }: Params): Promise<Metadata> => {
  const post = await postApi(serverApi).get(params);

  return {
    title: `${post.data.title} | highjoon-dev`,
    description: post.data.description,
    openGraph: {
      title: `${post.data.title} | highjoon-dev`,
      description: post.data.description,
      type: 'article',
      url: `https://highjoon-dev.com/blogs/${params.slug}`,
      images: [post.data.bannerImageUrl],
      publishedTime: post.data.publishedAt.toString(),
      modifiedTime: post.data.updatedAt?.toString() || post.data.publishedAt.toString(),
      authors: ['highjoon'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.data.title} | highjoon-dev`,
      description: post.data.description,
      images: [post.data.bannerImageUrl],
    },
    alternates: {
      canonical: `https://highjoon-dev.com/blogs/${params.slug}`,
    },
  };
};
