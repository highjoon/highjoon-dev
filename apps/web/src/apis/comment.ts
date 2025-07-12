import { cookies } from 'next/headers';
import { Comment } from '@highjoon-dev/prisma';
import { CommentWithUser, ServiceResponseInterface } from '@highjoon-dev/types';

import { ACCESS_TOKEN_KEY } from '@/constants';

export const getCommentsApi = async (postId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get(ACCESS_TOKEN_KEY)?.value}`,
      },
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
