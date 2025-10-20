import { useCallback } from 'react';

import { LikePostRequestDto } from '@/entities/like/api/likePostApi/dto';
import { likePostAction } from '@/entities/like/api/likePostApi/likePostAction';

export const useLikePost = () => {
  const likePost = useCallback(async (params: LikePostRequestDto) => {
    return await likePostAction(params.postId, params.userId, params.slug);
  }, []);

  return { likePost };
};
