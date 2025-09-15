'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/prisma';

import { postApi } from '@/apis/post';
import { serverApi } from '@/shared/api';

export const increaseViewCountAction = async (slug: Post['slug']) => {
  await postApi(serverApi).increaseViewCount({ slug });
  revalidatePath(`/blogs/${slug}`);
};

export const likePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await postApi(serverApi).like({ postId, userId });
  revalidatePath(`/blogs/${slug}`);
};

export const unlikePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await postApi(serverApi).unlike({ postId, userId });
  revalidatePath(`/blogs/${slug}`);
};
