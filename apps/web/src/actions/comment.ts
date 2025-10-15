'use server';

import { commentApi } from '@/apis/comment';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const deleteReplyAction = async (replyId: string) => {
  await commentApi(serverApi).deleteReply({ replyId });
};
