'use client';

import React, { useState } from 'react';
import { Button, Flex, Textarea } from '@mantine/core';
import { Post } from '@highjoon-dev/prisma';
import { TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';

import { createComment } from '@/actions/comment';
import { githubLoginApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

type Props = {
  postId: Post['id'];
  slug: Post['slug'];
};

const CommentInput = ({ postId, slug }: Props) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim()) {
      return;
    }

    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      const loginUrl = await githubLoginApi(window.location.href);

      if (!loginUrl) {
        return;
      }

      window.location.replace(loginUrl);

      return;
    }

    const { userId } = jwt.decode(accessToken) as TokenData;

    await createComment(postId, userId, comment, slug);
    setComment('');
  };

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
          onChange={(e) => setComment(e.target.value)}
          styles={{
            input: {
              height: '100px',
            },
          }}
        />
        <Flex ml="auto">
          <Button onClick={handleSubmit} disabled={!comment}>
            등록
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommentInput;
