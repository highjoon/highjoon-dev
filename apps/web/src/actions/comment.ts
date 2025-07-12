'use server';

import { createCommentApi } from '@/apis/comment';

export const createComment = async (postId: string, userId: string, content: string) => {
  const data = await createCommentApi(postId, userId, content);

  return data;
};
