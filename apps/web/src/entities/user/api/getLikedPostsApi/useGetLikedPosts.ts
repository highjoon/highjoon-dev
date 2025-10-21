import { useCallback, useEffect, useState } from 'react';
import { LikedPost } from '@highjoon-dev/types';

import { getLikedPostsAction } from '@/entities/user/api/getLikedPostsApi/getLikedPostsAction';

export const useGetLikedPosts = (userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);

  const fetchLikedPosts = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getLikedPostsAction({ userId });
      setLikedPosts(response || []);
    } catch (error) {
      console.error('좋아요한 게시물을 불러오는 중 오류가 발생했습니다:', error);
      setLikedPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const refetchLikedPosts = useCallback(async () => {
    await fetchLikedPosts();
  }, [fetchLikedPosts]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchLikedPosts();
      setIsLoading(false);
    })();
  }, [fetchLikedPosts]);

  return { likedPosts, isLoading, refetch: refetchLikedPosts };
};
