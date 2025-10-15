'use server';

import { createCommentApi } from '@/entities/comment/api/createCommentApi';
import { CreateCommentRequestDto } from '@/entities/comment/api/createCommentApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const createCommentAction = async (params: CreateCommentRequestDto) => {
  return await createCommentApi(serverApi, params);
};
