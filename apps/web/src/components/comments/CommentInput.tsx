'use client';

import React from 'react';
import { Button, Flex, Textarea } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';

import { useCommentInput } from '@/hooks/useCommentInput';

type Props = {
  postId: Post['id'];
  slug: Post['slug'];
};

const CommentInput = ({ postId, slug }: Props) => {
  const { comment, handleChangeComment, submitComment } = useCommentInput(postId, slug);

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
        />
        <Flex ml="auto">
          <Button onClick={submitComment} disabled={!comment}>
            등록
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommentInput;
