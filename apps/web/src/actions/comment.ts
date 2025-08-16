'use server';

import { createCommentApi, deleteCommentApi, deleteReplyApi, updateCommentApi } from '@/apis/comment';

export const createComment = async (postId: string, userId: string, content: string) => {
  const data = await createCommentApi(postId, userId, content);

  return data;
};

export const updateCommentAction = async (commentId: string, content: string) => {
  const data = await updateCommentApi(commentId, content);

  return data;
};

export const deleteCommentAction = async (commentId: string) => {
  const data = await deleteCommentApi(commentId);

  return data;
};

export const deleteReplyAction = async (replyId: string) => {
  const data = await deleteReplyApi(replyId);

  return data;
};
