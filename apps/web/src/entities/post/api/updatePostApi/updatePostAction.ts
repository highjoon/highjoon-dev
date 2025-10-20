'use server';

import { updatePostApi } from '@/entities/post/api/updatePostApi';
import { UpdatePostRequestDto } from '@/entities/post/api/updatePostApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const updatePostAction = async (params: UpdatePostRequestDto) => {
  return await updatePostApi(serverApi, params);
};
