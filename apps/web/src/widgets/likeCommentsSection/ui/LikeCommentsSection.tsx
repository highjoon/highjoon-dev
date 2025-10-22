import React from 'react';
import { Group } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import LikeButton from '@/features/likePost/ui/LikeButton';
import CommentSection from '@/widgets/commentSection/ui/CommentSection';

type Props = {
  post: Post;
};

export default function LikeCommentsSection({ post }: Props) {
  return (
    <Group justify="center" align="center" mt={20} mb={20}>
      <LikeButton postId={post.id} likeCount={post.likeCount} slug={post.slug} />
      <CommentSection postId={post.id} />
    </Group>
  );
}
