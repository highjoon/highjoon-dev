'use server';

import { revalidatePath } from 'next/cache';

import { createCommentApi, getCommentsApi } from '@/apis/comment';

export const createComment = async (postId: string, userId: string, content: string, slug: string) => {
  const data = await createCommentApi(postId, userId, content);

  revalidatePath(`/blogs/${slug}`);

  return data;
};

export const getComments = async (postId: string) => {
  const comments = await getCommentsApi(postId);

  return comments;
};
