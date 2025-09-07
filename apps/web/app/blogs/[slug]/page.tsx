import { type Metadata } from 'next';
import { type Post } from '@highjoon-dev/prisma';
import matter from 'gray-matter';

import { serverApi } from '@/apis/apiClient/serverApi';
import { postApi } from '@/apis/post';
import LikeCommentsSection from '@/components/pageContent/LikeCommentsSection';
import PageContent from '@/components/pageContent/PageContent';
import BlogPostSchema from '@/components/structuredData/BlogPostSchema';

export const dynamic = 'force-dynamic';

type Params = {
  params: { slug: Post['slug'] };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
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
}

export default async function Page({ params }: Params) {
  const response = await postApi(serverApi).get(params);
  const post = response.data;
  const contentUrl = await fetch(post.contentUrl).then((res) => res.text());
  const { content } = matter(contentUrl);

  return (
    <>
      <BlogPostSchema post={post} />
      <PageContent
        title={post.title}
        bannerImageUrl={post.bannerImageUrl}
        content={content}
        viewCount={post.viewCount || 0}
        slug={post.slug}
      />

      <LikeCommentsSection post={post} />
    </>
  );
}
