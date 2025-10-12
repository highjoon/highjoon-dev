import { type Post } from '@highjoon-dev/prisma';
import matter from 'gray-matter';

import { postApi } from '@/apis/post';
import LikeCommentsSection from '@/components/pageContent/LikeCommentsSection';
import PageContent from '@/components/pageContent/PageContent';
import BlogPostSchema from '@/components/structuredData/BlogPostSchema';
import { generateBlogsMetadata } from '@/page/blogs/model/metadata';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const dynamic = 'force-dynamic';

type Params = {
  params: { slug: Post['slug'] };
};

export const generateMetadata = generateBlogsMetadata;

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
