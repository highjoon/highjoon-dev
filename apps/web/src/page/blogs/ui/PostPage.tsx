import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import { getPost } from '@/entities/post/api/getPost';
import { getPostContent } from '@/entities/post/api/getPostContent';
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
  const post = await getPost(serverApi, params);
  const content = await getPostContent({ contentUrl: post.contentUrl });

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
