import { type Metadata } from 'next';
import { type Post } from '@highjoon-dev/prisma';

import { getPost } from '@/apis/post';
import LikeCommentsSection from '@/components/pageContent/LikeCommentsSection';
import PageContent from '@/components/pageContent/PageContent';
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
  };
}

export default async function Page({ params }: Params) {
  const { post, content } = await getBlogPost(params);

  return (
    <>
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
