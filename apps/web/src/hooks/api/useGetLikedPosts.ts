import { useCallback, useEffect, useState } from 'react';
import { type LikedPost, type TokenData } from '@highjoon-dev/types';
import { getCookie } from 'cookies-next/client';
import jwt from 'jsonwebtoken';

import { clientApi } from '@/apis/apiClient/clientApi';
import { userApi } from '@/apis/user';
import { ACCESS_TOKEN_KEY } from '@/constants';

export const useGetLikedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [likedPost, setLikedPost] = useState<LikedPost[]>([]);

  const fetchLikedPosts = useCallback(async () => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      setIsLoading(false);

      return;
    }

    const decodedToken = jwt.decode(accessToken) as TokenData;
    if (!decodedToken || !decodedToken.userId) {
      setIsLoading(false);

      return;
    }
    const userId = decodedToken.userId;

    try {
      const response = await userApi(clientApi).getLikedPosts(userId);

      if (!response || !response.data || response.data.length === 0) {
        return;
      }

      setLikedPost(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLikedPosts();
  }, [fetchLikedPosts]);

  return { likedPost, isLoading };
};
