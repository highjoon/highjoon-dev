'use server';

import { createPostApi } from '@/entities/post/api/createPostApi';
import { CreatePostRequestDto } from '@/entities/post/api/createPostApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const createPostAction = async (params: CreatePostRequestDto) => {
  return await createPostApi(serverApi, params);
};
