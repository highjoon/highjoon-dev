'use server';

import { getLikedPostsApi } from '@/entities/user/api/getLikedPostsApi';
import { GetLikedPostsRequestDto } from '@/entities/user/api/getLikedPostsApi/dto';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export const getLikedPostsAction = async (params: GetLikedPostsRequestDto) => {
  return await getLikedPostsApi(serverApi, params);
};
