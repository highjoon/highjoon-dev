'use client';

import React from 'react';
import { Flex, Loader, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';

import Comment from '@/components/comments/Comment';

type Props = {
  comments: CommentWithUser[];
  isLoading: boolean;
};

const Comments = ({ comments, isLoading }: Props) => {
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
        {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </Flex>
    </Flex>
  );
};

export default Comments;
