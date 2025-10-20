import { useCallback } from 'react';

import { createPostAction } from '@/entities/post/api/createPostApi/createPostAction';
import { CreatePostRequestDto } from '@/entities/post/api/createPostApi/dto';

export const useCreatePost = () => {
  const createPost = useCallback(async (params: CreatePostRequestDto) => {
    return await createPostAction(params);
  }, []);

  return { createPost };
};
