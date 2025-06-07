'use client';

import React, { useEffect, useState } from 'react';
import { Button, Text, Tooltip } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import { type TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';
import { BiLike } from 'react-icons/bi';

import { likePost } from '@/actions/post';
import { githubLoginApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { useGetLikedPosts } from '@/hooks/api/useGetLikedPosts';

type Props = {
  postId: Post['id'];
  likeCount: Post['likeCount'];
};

const LikeButton = ({ postId, likeCount }: Props) => {
  const { likedPost, isLoading } = useGetLikedPosts();
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = async () => {
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

    await likePost(postId, userId);
    setIsLiked(true);
  };

  useEffect(() => {
    const isPostLiked = likedPost.some((post) => post.postId === postId);
    setIsLiked(isPostLiked);
  }, [likedPost, postId]);

  return (
    <Tooltip label={isLiked ? '이미 좋아요를 눌렀습니다.' : '좋아요를 눌러주세요!'} withArrow>
      <Button
        variant="default"
        size="sm"
        onClick={handleClick}
        disabled={isLiked}
        loading={isLoading}
        leftSection={<BiLike size={20} />}>
        <Text fw="bold">{likeCount}</Text>
      </Button>
    </Tooltip>
  );
};

export default LikeButton;
