'use client';

import React from 'react';
import { Flex } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import { useGetComments } from '@/entities/comment/api/getCommentsApi/useGetComments';
import CommentInput from '@/entities/comment/ui/CommentInput';
import Comments from '@/entities/comment/ui/Comments';

type Props = {
  postId: Post['id'];
};

export default function CommentSection({ postId }: Props) {
  const { comments, isLoading, refetch } = useGetComments(postId);

  return (
    <Flex w="100%" direction="column" gap="xl">
      <CommentInput postId={postId} refetch={refetch} />
      <Comments postId={postId} comments={comments} isLoading={isLoading} refetch={refetch} />
    </Flex>
  );
}
