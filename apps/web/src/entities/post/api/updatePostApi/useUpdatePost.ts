import { useCallback } from 'react';

import { UpdatePostRequestDto } from '@/entities/post/api/updatePostApi/dto';
import { updatePostAction } from '@/entities/post/api/updatePostApi/updatePostAction';

export const useUpdatePost = () => {
  const updatePost = useCallback(async (params: UpdatePostRequestDto) => {
    return await updatePostAction(params);
  }, []);

  return { updatePost };
};
