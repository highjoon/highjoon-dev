import React from 'react';
import { Flex, Text } from '@mantine/core';

import { getComments } from '@/actions/comment';
import Comment from '@/components/comments/Comment';

type Props = {
  postId: string;
};

const Comments = async ({ postId }: Props) => {
  const comments = await getComments(postId);

  return (
    <Flex direction="column">
      <Text size="lg" mb="md">
        {comments?.length || 0}개의 댓글
      </Text>

      <Flex direction="column" gap="lg">
        {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </Flex>
    </Flex>
  );
};

export default Comments;
