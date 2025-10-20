'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/prisma';

import { likePostApi } from '@/entities/like/api/likePostApi';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const likePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await likePostApi(serverApi, { postId, userId, slug });
  revalidatePath(`/blogs/${slug}`);
};
