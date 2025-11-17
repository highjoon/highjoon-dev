'use client';

import React from 'react';
import { Button, Text, Tooltip } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import { overlay } from 'overlay-kit';
import { BiLike } from 'react-icons/bi';
import { CiWarning } from 'react-icons/ci';

import { useGetLikedPosts } from '@/entities/user/lib/useGetLikedPosts';
import { useSignIn } from '@/features/auth/model/useSignIn';
import { useLikePost } from '@/features/likePost/model/useLikePost';
import ConfirmModal from '@/shared/ui/ConfirmModal';

type Props = {
  postId: Post['id'];
  likeCount: Post['likeCount'];
  slug: string;
};

export default function LikeButton({ postId, likeCount, slug }: Props) {
  const { isSignedIn } = useSignIn();
  const { likedPost, isLoading } = useGetLikedPosts();
  const { isLiked, likePost, unlikePost } = useLikePost({ likedPost, postId, slug });

  const handleUnlikeClick = async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <ConfirmModal
        icon={<CiWarning size={20} color="var(--mantine-color-red-6)" />}
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close(false);
        }}
        onConfirm={() => close(true)}
        title="좋아요 취소"
        message="좋아요를 취소하시겠습니까?"
        confirmText="취소"
        cancelText="아니오"
        confirmColor="destructive"
      />
    ));

    if (result) {
      await unlikePost();
    }
  };

  /**
   * 좋아요 버튼 클릭 핸들러
   */
  const handleLikeClick = async () => {
    if (isLiked) {
      await handleUnlikeClick();
    } else {
      await likePost();
    }
  };

  return (
    <Tooltip label="좋아요를 눌러주세요!" withArrow hidden={isLiked}>
      <Button
        variant="default"
        size="sm"
        onClick={handleLikeClick}
        disabled={!isSignedIn}
        loading={isLoading}
        leftSection={<BiLike size={20} />}>
        <Text fw="bold">{likeCount}</Text>
      </Button>
    </Tooltip>
  );
}
