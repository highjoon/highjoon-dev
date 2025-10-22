'use server';

import { deleteReplyApi } from '@/features/deleteComment/api/deleteReplyApi';
import { DeleteReplyRequestDto } from '@/features/deleteComment/api/deleteReplyApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const deleteReplyAction = async (params: DeleteReplyRequestDto) => {
  return await deleteReplyApi(serverApi, params);
};
