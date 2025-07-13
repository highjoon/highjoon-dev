'use server';

import { Comment } from '@highjoon-dev/prisma';
import { CommentWithUser, ServiceResponseInterface } from '@highjoon-dev/types';

import { fetchClient } from '@/apis/apiClient/fetchClient';
import { fetchServer } from '@/apis/apiClient/fetchServer';

export const getCommentsApi = async (postId: string) => {
  try {
    const response = await fetchClient(`${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}`, {
      cache: 'no-store',
    });

    const data: ServiceResponseInterface<CommentWithUser[]> = await response.json();

    return data.responseObject;
  } catch {
    /* empty */
  }
};

export const createCommentApi = async (postId: string, userId: string, content: string) => {
  try {
    const response = await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        userId,
        content,
      }),
    });

    const data: ServiceResponseInterface<Comment> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};

export const updateCommentApi = async (commentId: string, content: string) => {
  try {
    const response = await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });

    const data: ServiceResponseInterface<Comment> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};

export const deleteCommentApi = async (commentId: string) => {
  try {
    const response = await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment/${commentId}`, {
      method: 'DELETE',
    });

    const data: ServiceResponseInterface<null> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};
