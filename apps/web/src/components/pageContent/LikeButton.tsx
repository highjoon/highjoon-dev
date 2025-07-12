'use client';

import React from 'react';
import { Button, Text, Tooltip } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import { BiLike } from 'react-icons/bi';

import { useGetLikedPosts } from '@/hooks/api/useGetLikedPosts';
import { useLikePost } from '@/hooks/useLikePost';
import { useSignIn } from '@/hooks/useSignIn';

type Props = {
  postId: Post['id'];
  likeCount: Post['likeCount'];
};

const LikeButton = ({ postId, likeCount }: Props) => {
  const { isSignedIn } = useSignIn();
  const { likedPost, isLoading } = useGetLikedPosts();
  const { isLiked, likePost } = useLikePost({ likedPost, postId });

  return (
    <Tooltip label={isLiked ? '이미 좋아요를 눌렀습니다.' : '좋아요를 눌러주세요!'} withArrow>
      <Button
        variant="default"
        size="sm"
        onClick={likePost}
        disabled={isLiked || !isSignedIn}
        loading={isLoading}
        leftSection={<BiLike size={20} />}>
        <Text fw="bold">{likeCount}</Text>
      </Button>
    </Tooltip>
  );
};

export default LikeButton;
