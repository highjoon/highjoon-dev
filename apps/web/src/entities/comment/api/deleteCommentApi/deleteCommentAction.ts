'use server';

import { deleteCommentApi } from '@/entities/comment/api/deleteCommentApi';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const deleteCommentAction = async (commentId: string) => {
  await deleteCommentApi(serverApi, { commentId });
};
