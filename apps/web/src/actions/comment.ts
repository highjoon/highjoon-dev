'use server';

import { serverApi } from '@/apis/apiClient/serverApi';
import { commentApi } from '@/apis/comment';

export const createComment = async (postId: string, userId: string, content: string) => {
  const data = await commentApi(serverApi).create({ postId, userId, content });

  return data;
};

export const updateCommentAction = async (commentId: string, content: string) => {
  const data = await commentApi(serverApi).update({ commentId, content });

  return data;
};

export const deleteCommentAction = async (commentId: string) => {
  const data = await commentApi(serverApi).delete({ commentId });

  return data;
};

export const deleteReplyAction = async (replyId: string) => {
  const data = await commentApi(serverApi).deleteReply({ replyId });

  return data;
};
