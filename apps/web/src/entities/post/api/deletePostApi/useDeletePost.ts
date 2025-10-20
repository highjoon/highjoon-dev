import { useCallback } from 'react';

import { deletePostAction } from '@/entities/post/api/deletePostApi/deletePostAction';
import { DeletePostRequestDto } from '@/entities/post/api/deletePostApi/dto';

export const useDeletePost = () => {
  const deletePost = useCallback(async (params: DeletePostRequestDto) => {
    return await deletePostAction(params);
  }, []);

  return { deletePost };
};
