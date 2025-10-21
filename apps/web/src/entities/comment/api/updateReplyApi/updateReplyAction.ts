'use server';

import { updateReplyApi } from '@/entities/comment/api/updateReplyApi';
import { UpdateReplyRequestDto } from '@/entities/comment/api/updateReplyApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const updateReplyAction = async (params: UpdateReplyRequestDto) => {
  return await updateReplyApi(serverApi, params);
};
