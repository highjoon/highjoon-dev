'use server';

import { createReplyApi } from '@/features/createReply/api/createReplyApi';
import { CreateReplyRequestDto } from '@/features/createReply/api/createReplyApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const createReplyAction = async (params: CreateReplyRequestDto) => {
  return await createReplyApi(serverApi, params);
};
