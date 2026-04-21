'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { type IncreaseViewCountRequestDto } from '@/entities/post/api/increaseViewCountApi/dto';
import { postService } from '@/entities/post/services/post.service';

export const increaseViewCountAction = async (params: IncreaseViewCountRequestDto) => {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || '';

  await postService.increaseViewCount(params.slug, ip);
  revalidatePath(`/blogs/${params.slug}`);
  revalidatePath('/');
  revalidatePath('/pages/[id]', 'page');
  revalidatePath('/tags/[name]/[page]', 'page');
};
