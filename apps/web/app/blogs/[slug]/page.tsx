import { type Post } from '@highjoon-dev/prisma';

import LikeCommentsSection from '@/components/pageContent/LikeCommentsSection';
import PageContent from '@/components/pageContent/PageContent';
import BlogPostSchema from '@/components/structuredData/BlogPostSchema';
import { getPost } from '@/entities/post/api/getPost';
import { getPostContent } from '@/entities/post/api/getPostContent';
import { generateBlogsMetadata } from '@/page/blogs/model/metadata';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const dynamic = 'force-dynamic';

type Params = {
  params: { slug: Post['slug'] };
};

export const generateMetadata = generateBlogsMetadata;

export default async function Page({ params }: Params) {
  const post = await getPost(serverApi, params);
  const content = await getPostContent({ contentUrl: post.contentUrl });

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
