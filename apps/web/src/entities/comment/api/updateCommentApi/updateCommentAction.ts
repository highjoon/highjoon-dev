'use server';

import { updateCommentApi } from '@/entities/comment/api/updateCommentApi';
import { UpdateCommentRequestDto } from '@/entities/comment/api/updateCommentApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const updateCommentAction = async (params: UpdateCommentRequestDto) => {
  await updateCommentApi(serverApi, params);
};
