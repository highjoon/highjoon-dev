import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Post } from '@highjoon-dev/prisma';
import { type LikedPost, type TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';

import { likePostAction, unlikePostAction } from '@/actions/post';
import { clientApi } from '@/apis/apiClient/clientApi';
import { authApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

type Args = {
  likedPost: LikedPost[];
  postId: Post['id'];
  slug: Post['slug'];
};

export const useLikePost = ({ likedPost, postId, slug }: Args) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = async () => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    try {
      if (!accessToken) {
        const response = await authApi(clientApi).githubLogin({ returnUrl: window.location.href });
        const loginUrl = response.data;

        if (!loginUrl) {
          notifications.show({
            title: '좋아요 누르기에 실패했습니다.',
            message: '잠시 후 다시 시도해주세요.',
            color: 'red',
          });

          return;
        }

        window.location.replace(loginUrl);

        return;
      }

      const { userId } = jwt.decode(accessToken) as TokenData;

      await likePostAction(postId, userId, slug);
      setIsLiked(true);
    } catch {
      notifications.show({
        title: '좋아요 누르기에 실패했습니다.',
        message: '잠시 후 다시 시도해주세요.',
        color: 'red',
      });
    }
  };

  const handleUnlikePost = async () => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      notifications.show({
        title: '좋아요 취소에 실패했습니다.',
        message: '잠시 후 다시 시도해주세요.',
        color: 'red',
      });

      return;
    }

    try {
      const { userId } = jwt.decode(accessToken) as TokenData;

      await unlikePostAction(postId, userId, slug);
      setIsLiked(false);
    } catch {
      notifications.show({
        title: '좋아요 취소에 실패했습니다.',
        message: '잠시 후 다시 시도해주세요.',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    const isPostLiked = likedPost.some((post) => post.postId === postId);
    setIsLiked(isPostLiked);
  }, [likedPost, postId]);

  return {
    isLiked,
    likePost: handleLikePost,
    unlikePost: handleUnlikePost,
  };
};
