import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';
import { getPostContentApi } from '@/entities/post/api/getPostContentApi';
import PostSchema from '@/entities/post/lib/PostSchema';
import { extractHeadings } from '@/entities/post/lib/toc/extractHeadings';
import PostContent from '@/entities/post/ui/PostContent';
import TableOfContentsModal from '@/entities/post/ui/TableOfContentsModal';
import { serverApi } from '@/shared/api/apiClient/serverApi';
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
    <>
      <PostSchema post={post} />
      <PostContent
        title={post.title}
        bannerImageUrl={post.bannerImageUrl}
        content={content}
        viewCount={post.viewCount || 0}
        slug={post.slug}
        postTags={post.postTags}
      />
      <TableOfContentsModal headings={headings} />
      <LikeCommentsSection post={post} />
    </>
  );
}
