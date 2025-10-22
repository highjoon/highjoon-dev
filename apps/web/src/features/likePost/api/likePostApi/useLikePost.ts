import { useCallback } from 'react';

import { LikePostRequestDto } from '@/features/likePost/api/likePostApi/dto';
import { likePostAction } from '@/features/likePost/api/likePostApi/likePostAction';

export const useLikePost = () => {
  const likePost = useCallback(async (params: LikePostRequestDto) => {
    return await likePostAction(params.postId, params.userId, params.slug);
  }, []);

  return { likePost };
};
