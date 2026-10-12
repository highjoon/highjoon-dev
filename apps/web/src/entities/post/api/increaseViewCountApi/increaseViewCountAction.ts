'use server';

import { revalidatePath } from 'next/cache';

import { type IncreaseViewCountRequestDto } from '@/entities/post/api/increaseViewCountApi/dto';
import { fetchApi } from '@/shared/api/fetchApi';

export const increaseViewCountAction = async (params: IncreaseViewCountRequestDto) => {
  try {
    await fetchApi(`/posts/${encodeURIComponent(params.slug)}/views`, { method: 'POST' });
  } catch (error) {
    // 조회수 실패가 화면을 막지 않음
    console.error('increaseViewCountAction 실패:', error);
  }

  revalidatePath(`/blogs/${params.slug}`);
  revalidatePath('/');
  revalidatePath('/pages/[id]', 'page');
  revalidatePath('/tags/[name]/[page]', 'page');
};
