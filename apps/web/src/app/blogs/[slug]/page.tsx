import { type Metadata } from 'next';
import { type Post } from '@highjoon-dev/types';

import { getPost } from '@/apis/post';
import Comments from '@/components/comments/Comments';
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
      <Comments />
    </>
  );
}
