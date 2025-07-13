'use client';

import React from 'react';
import { Flex, Loader, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';

import Comment from '@/components/comments/Comment';

type Props = {
  comments: CommentWithUser[];
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const Comments = ({ comments, isLoading, refetch }: Props) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100px' }}>
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <Text size="lg" mb="md">
        {(comments?.length || 0).toLocaleString('ko-KR')}개의 댓글
      </Text>

      <Flex direction="column" gap="lg">
        {comments?.map((comment) => <Comment key={comment.id} comment={comment} refetch={refetch} />)}
      </Flex>
    </Flex>
  );
};

export default Comments;
