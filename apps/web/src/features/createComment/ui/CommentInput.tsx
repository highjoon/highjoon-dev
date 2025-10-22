'use client';

import React from 'react';
import { Button, Flex, Loader, Textarea } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import { useSignIn } from '@/features/auth/model/useSignIn';
import RequiredSignIn from '@/features/auth/ui/RequiredSignIn';
import SignOutButton from '@/features/auth/ui/SignOutButton';
import { useCommentInput } from '@/features/createComment/model/useCommentInput';

type Props = {
  postId: Post['id'];
  refetch: () => void;
};

export default function CommentInput({ postId, refetch }: Props) {
  const { isSignedIn } = useSignIn();
  const { comment, handleChangeComment, submitComment } = useCommentInput(postId);

  const handleSubmit = async () => {
    await submitComment();
    refetch();
  };

  // 로딩 상태 처리
  if (isSignedIn === undefined) {
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
          <Flex
            style={{
              height: '100px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#f8f9fa',
            }}
            align="center"
            justify="center">
            <Loader size="sm" />
          </Flex>
          <Flex justify="space-between">
            <div style={{ width: '80px' }} />
            <Button disabled>등록</Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  if (isSignedIn === false) {
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
        <Flex justify="space-between">
          {isSignedIn && <SignOutButton />}
          <Button onClick={handleSubmit} disabled={!comment || !isSignedIn}>
            등록
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
