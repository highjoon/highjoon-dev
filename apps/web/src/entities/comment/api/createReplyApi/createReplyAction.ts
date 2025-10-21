'use server';

import { createReplyApi } from '@/entities/comment/api/createReplyApi';
import { CreateReplyRequestDto } from '@/entities/comment/api/createReplyApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const createReplyAction = async (params: CreateReplyRequestDto) => {
  return await createReplyApi(serverApi, params);
};
