'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/types';

import { increaseViewCount } from '@/apis/post';

export const increaseViewCountAction = async (slug: Post['slug']) => {
  await increaseViewCount(slug);
  revalidatePath(`/post/${slug}`);
};
