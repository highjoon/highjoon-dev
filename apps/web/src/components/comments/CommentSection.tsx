import React from 'react';
import { Flex } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import CommentInput from '@/components/comments/CommentInput';
import Comments from '@/components/comments/Comments';

type Props = {
  postId: Post['id'];
  slug: Post['slug'];
};

const CommentSection = ({ postId, slug }: Props) => {
  return (
    <Flex w="100%" direction="column" gap="xl">
      <CommentInput postId={postId} slug={slug} />
      <Comments postId={postId} />
    </Flex>
  );
};

export default CommentSection;
