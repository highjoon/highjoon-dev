import { useEffect, useState } from 'react';
import { type LikedPost, type TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';

import { likePost } from '@/actions/post';
import { githubLoginApi } from '@/apis/auth';
import { ACCESS_TOKEN_KEY } from '@/constants';

type Args = {
  likedPost: LikedPost[];
  postId: string;
};

export const useLikePost = ({ likedPost, postId }: Args) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePost = async () => {
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

  return {
    isLiked,
    likePost: handleLikePost,
  };
};
