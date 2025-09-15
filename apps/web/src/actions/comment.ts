'use server';

import { commentApi } from '@/apis/comment';
import { serverApi } from '@/shared/api';

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
