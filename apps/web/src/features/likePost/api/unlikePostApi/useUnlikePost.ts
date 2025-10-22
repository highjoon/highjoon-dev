import { useCallback } from 'react';

import { UnlikePostRequestDto } from '@/features/likePost/api/unlikePostApi/dto';
import { unlikePostAction } from '@/features/likePost/api/unlikePostApi/unlikePostAction';

export const useUnlikePost = () => {
  const unlikePost = useCallback(async (params: UnlikePostRequestDto) => {
    return await unlikePostAction(params.postId, params.userId, params.slug);
  }, []);

  return { unlikePost };
};
