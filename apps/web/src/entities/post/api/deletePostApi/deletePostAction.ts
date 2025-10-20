'use server';

import { deletePostApi } from '@/entities/post/api/deletePostApi';
import { DeletePostRequestDto } from '@/entities/post/api/deletePostApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const deletePostAction = async (params: DeletePostRequestDto) => {
  return await deletePostApi(serverApi, params);
};
