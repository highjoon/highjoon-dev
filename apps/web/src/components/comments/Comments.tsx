'use client';

import React from 'react';
import { Flex, Loader, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';

import Comment from '@/components/comments/Comment';

type Props = {
  comments: CommentWithUser[];
  postId: string;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const Comments = ({ comments, postId, isLoading, refetch }: Props) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100px' }}>
        <Loader />
      </Flex>
    );
  }

  return (
    <>
      <Text size="sm" c="dimmed" mb="md">
        {(comments?.length || 0).toLocaleString('ko-KR')}개의 댓글
      </Text>
      {comments?.map((comment) => <Comment key={comment.id} comment={comment} postId={postId} refetch={refetch} />)}
    </>
  );
};

export default Comments;
