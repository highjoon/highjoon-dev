'use server';

import { deleteReplyApi } from '@/entities/comment/api/deleteReplyApi';
import { DeleteReplyRequestDto } from '@/entities/comment/api/deleteReplyApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const deleteReplyAction = async (params: DeleteReplyRequestDto) => {
  return await deleteReplyApi(serverApi, params);
};
