import { type Metadata } from 'next';
import { type Post } from '@highjoon-dev/prisma';

import { getPost } from '@/apis/post';
import LikeCommentsSection from '@/components/pageContent/LikeCommentsSection';
import PageContent from '@/components/pageContent/PageContent';
import BlogPostSchema from '@/components/structuredData/BlogPostSchema';
import getBlogPost from '@/utils/getBlogPost';

export const dynamic = 'force-dynamic';

type Params = {
  params: { slug: Post['slug'] };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.responseObject.title} | highjoon-dev`,
    description: post.responseObject.description,
    openGraph: {
      title: `${post.responseObject.title} | highjoon-dev`,
      description: post.responseObject.description,
      type: 'article',
      url: `https://highjoon-dev.com/blogs/${params.slug}`,
      images: [post.responseObject.bannerImageUrl],
      publishedTime: post.responseObject.publishedAt.toString(),
      modifiedTime: post.responseObject.updatedAt?.toString() || post.responseObject.publishedAt.toString(),
      authors: ['highjoon'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.responseObject.title} | highjoon-dev`,
      description: post.responseObject.description,
      images: [post.responseObject.bannerImageUrl],
    },
    alternates: {
      canonical: `https://highjoon-dev.com/blogs/${params.slug}`,
    },
  };
}

export default async function Page({ params }: Params) {
  const { post, content } = await getBlogPost(params);

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
