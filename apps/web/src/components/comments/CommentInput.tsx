'use client';

import React from 'react';
import { Button, Flex, Textarea } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import RequiredSignIn from '@/components/comments/RequiredSignIn';
import { useCommentInput } from '@/hooks/useCommentInput';
import { useSignIn } from '@/hooks/useSignIn';

type Props = {
  postId: Post['id'];
  refetch: () => void;
};

const CommentInput = ({ postId, refetch }: Props) => {
  const { isSignedIn } = useSignIn();
  const { comment, handleChangeComment, submitComment } = useCommentInput(postId);

  const handleSubmit = async () => {
    await submitComment();
    refetch();
  };

  if (!isSignedIn) {
    return <RequiredSignIn />;
  }

  return (
    <Flex
      w="100%"
      direction="column"
      p="xs"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
      }}>
      <Flex direction="column" gap="sm">
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleChangeComment}
          styles={{
            input: {
              height: '100px',
            },
          }}
          disabled={!isSignedIn}
        />
        <Flex ml="auto">
          <Button onClick={handleSubmit} disabled={!comment || !isSignedIn}>
            등록
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommentInput;
