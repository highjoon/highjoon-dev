import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';
import { getPostContentApi } from '@/entities/post/api/getPostContentApi';
import PostSchema from '@/entities/post/lib/PostSchema';
import { extractHeadings } from '@/entities/post/lib/toc/extractHeadings';
import PostArticleContent from '@/entities/post/ui/postDetail/PostArticleContent';
import PostBanner from '@/entities/post/ui/postDetail/PostBanner';
import PostDetailHeader from '@/entities/post/ui/postDetail/PostDetailHeader';
import TableOfContentsSidebar from '@/entities/post/ui/postDetail/TableOfContentsSidebar';
import TableOfContentsModal from '@/entities/post/ui/TableOfContentsModal';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import PageSection from '@/shared/ui/layout/PageSection';
import LikeCommentsSection from '@/widgets/likeCommentsSection/ui/LikeCommentsSection';

interface Props {
  params: {
    slug: Post['slug'];
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostApi(serverApi, params);
  const content = await getPostContentApi({ contentUrl: post.contentUrl });
  const headings = extractHeadings(content);

  return (
    <PageSection as="article" withContainer={false}>
      <PostSchema post={post} />

      <div className="max-w-4xl px-4 mx-auto md:px-6">
        <PostDetailHeader
          title={post.title}
          viewCount={post.viewCount || 0}
          createdAt={post.createdAt}
          slug={post.slug}
          postTags={post.postTags}
        />
      </div>

      <PostBanner bannerImageUrl={post.bannerImageUrl} title={post.title} />

      <div className="flex flex-col gap-12 px-4 mx-auto md:px-6 max-w-7xl lg:flex-row">
        <div className="w-full max-w-none lg:w-3/4">
          <PostArticleContent content={content} />
          <LikeCommentsSection post={post} />
        </div>

        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32">
            <TableOfContentsSidebar headings={headings} />
          </div>
        </div>
      </div>

      <TableOfContentsModal headings={headings} />
    </PageSection>
  );
}
