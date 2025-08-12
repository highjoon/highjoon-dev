'use client';

import React from 'react';
import { Flex } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import CommentInput from '@/components/comments/CommentInput';
import Comments from '@/components/comments/Comments';
import { useGetComments } from '@/hooks/api/useGetComments';

type Props = {
  postId: Post['id'];
};

const CommentSection = ({ postId }: Props) => {
  const { comments, isLoading, refetch } = useGetComments(postId);

  return (
    <Flex w="100%" direction="column" gap="xl">
      <CommentInput postId={postId} refetch={refetch} />
      <Comments postId={postId} comments={comments} isLoading={isLoading} refetch={refetch} />
    </Flex>
  );
};

export default CommentSection;
