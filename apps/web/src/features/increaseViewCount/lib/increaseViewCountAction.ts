'use server';

import { revalidatePath } from 'next/cache';

import { increaseViewCountApi } from '@/features/api/increaseViewCountApi';
import { IncreaseViewCountDto } from '@/features/api/increaseViewCountDto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const increaseViewCountAction = async (params: IncreaseViewCountDto) => {
  await increaseViewCountApi(serverApi, params);
  revalidatePath(`/blogs/${params.slug}`);
};
