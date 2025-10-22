'use server';

import { createCommentApi } from '@/features/createComment/api/createCommentApi';
import { CreateCommentRequestDto } from '@/features/createComment/api/createCommentApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const createCommentAction = async (params: CreateCommentRequestDto) => {
  return await createCommentApi(serverApi, params);
};
