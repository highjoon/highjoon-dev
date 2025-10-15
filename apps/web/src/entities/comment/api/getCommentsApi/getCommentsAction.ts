'use server';

import { getCommentsApi } from '@/entities/comment/api/getCommentsApi';
import { GetCommentsRequestDto } from '@/entities/comment/api/getCommentsApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const getCommentsAction = async (params: GetCommentsRequestDto) => {
  return await getCommentsApi(serverApi, params);
};
