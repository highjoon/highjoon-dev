'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/prisma';

import { postLikeService } from '@/entities/post/services/postLike.service';

export const likePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await postLikeService.likePost(userId, postId);
  revalidatePath(`/blogs/${slug}`);
};
