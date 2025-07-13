import React from 'react';
import { Group } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import CommentSection from '@/components/comments/CommentSection';
import LikeButton from '@/components/pageContent/LikeButton';

type Props = {
  post: Post;
};

const LikeCommentsSection = ({ post }: Props) => {
  return (
    <Group justify="center" align="center" mt={20} mb={20}>
      <LikeButton postId={post.id} likeCount={post.likeCount} />
      <CommentSection postId={post.id} />
    </Group>
  );
};

export default LikeCommentsSection;
