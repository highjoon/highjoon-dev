'use server';

import { serverApi } from '@/apis/apiClient/serverApi';
import { commentApi } from '@/apis/comment';

export const createCommentAction = async (postId: string, userId: string, content: string) => {
  await commentApi(serverApi).create({ postId, userId, content });
};

export const updateCommentAction = async (commentId: string, content: string) => {
  await commentApi(serverApi).update({ commentId, content });
};

export const deleteCommentAction = async (commentId: string) => {
  await commentApi(serverApi).delete({ commentId });
};

export const deleteReplyAction = async (replyId: string) => {
  await commentApi(serverApi).deleteReply({ replyId });
};
