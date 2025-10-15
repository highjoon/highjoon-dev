'use server';

import { revalidatePath } from 'next/cache';

import { increaseViewCountApi } from '@/entities/post/api/increaseViewCountApi';
import { IncreaseViewCountRequestDto } from '@/entities/post/api/increaseViewCountApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const increaseViewCountAction = async (params: IncreaseViewCountRequestDto) => {
  await increaseViewCountApi(serverApi, params);
  revalidatePath(`/blogs/${params.slug}`);
};
