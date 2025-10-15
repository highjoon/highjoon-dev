import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import { getPostApi } from '@/entities/post/api/getPostApi';
import { getPostContentApi } from '@/entities/post/api/getPostContentApi';
import PostSchema from '@/entities/post/lib/PostSchema';
import LikeCommentsSection from '@/entities/post/ui/LikeCommentsSection';
import PostContent from '@/entities/post/ui/PostContent';
import { serverApi } from '@/shared/api/apiClient/serverApi';

interface Props {
  params: {
    slug: Post['slug'];
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostApi(serverApi, params);
  const content = await getPostContentApi({ contentUrl: post.contentUrl });

  return (
    <>
      <PostSchema post={post} />
      <PostContent
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
