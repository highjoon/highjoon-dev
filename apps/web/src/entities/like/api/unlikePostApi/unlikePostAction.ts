'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/prisma';

import { unlikePostApi } from '@/entities/like/api/unlikePostApi';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const unlikePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await unlikePostApi(serverApi, { postId, userId, slug });
  revalidatePath(`/blogs/${slug}`);
};
