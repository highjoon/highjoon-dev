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

/** 대댓글 생성 */
export const createReplyApi = async (postId: string, userId: string, content: string, parentId: string) => {
  try {
    const response = await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment/reply`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        userId,
        content,
        parentId,
      }),
    });

    const data: ServiceResponseInterface<Comment> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};

/** 특정 댓글의 대댓글 조회 */
export const getRepliesApi = async (parentId: string) => {
  try {
    const response = await fetchClient(`${process.env.NEXT_PUBLIC_API_URL}/comment/replies/${parentId}`, {
      cache: 'no-store',
    });

    const data: ServiceResponseInterface<CommentWithUser[]> = await response.json();

    return data.responseObject;
  } catch {
    /* empty */
  }
};

/** 대댓글 수정 */
export const updateReplyApi = async (replyId: string, content: string) => {
  try {
    const response = await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment/reply/${replyId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });

    const data: ServiceResponseInterface<Comment> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};

/** 대댓글 삭제 */
export const deleteReplyApi = async (replyId: string) => {
  try {
    await fetchServer(`${process.env.NEXT_PUBLIC_API_URL}/comment/reply/${replyId}`, {
      method: 'DELETE',
    });
  } catch {
    /* empty */
  }
};
