'use server';

import { getRepliesApi } from '@/entities/comment/api/getRepliesApi';
import { GetRepliesRequestDto } from '@/entities/comment/api/getRepliesApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const getRepliesAction = async (params: GetRepliesRequestDto) => {
  return await getRepliesApi(serverApi, params);
};
