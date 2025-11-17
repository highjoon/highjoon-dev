import { useEffect, useState } from 'react';
import { Post } from '@highjoon-dev/prisma';
import { type LikedPost, type TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';
import { toast } from 'sonner';

import { githubLoginAction } from '@/features/auth/api/githubLoginApi/githubLoginAction';
import { ACCESS_TOKEN_KEY } from '@/features/auth/model/constants';
import { likePostAction } from '@/features/likePost/api/likePostApi/likePostAction';
import { unlikePostAction } from '@/features/likePost/api/unlikePostApi/unlikePostAction';

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
        const response = await githubLoginAction({ returnUrl: window.location.href });
        const loginUrl = response;

        if (!loginUrl) {
          toast.error('좋아요 누르기에 실패했습니다.', {
            description: '잠시 후 다시 시도해주세요.',
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
      toast.error('좋아요 누르기에 실패했습니다.', {
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  };

  const handleUnlikePost = async () => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      toast.error('좋아요 취소에 실패했습니다.', {
        description: '잠시 후 다시 시도해주세요.',
      });

      return;
    }

    try {
      const { userId } = jwt.decode(accessToken) as TokenData;

      await unlikePostAction(postId, userId, slug);
      setIsLiked(false);
    } catch {
      toast.error('좋아요 취소에 실패했습니다.', {
        description: '잠시 후 다시 시도해주세요.',
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
