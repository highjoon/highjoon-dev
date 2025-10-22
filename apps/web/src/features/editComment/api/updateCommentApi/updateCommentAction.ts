'use server';

import { updateCommentApi } from '@/features/editComment/api/updateCommentApi';
import { UpdateCommentRequestDto } from '@/features/editComment/api/updateCommentApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const updateCommentAction = async (params: UpdateCommentRequestDto) => {
  await updateCommentApi(serverApi, params);
};
