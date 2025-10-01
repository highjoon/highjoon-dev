import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/shared/api';

/**
 * 추천 게시물 조회
 * @param api ApiClient
 * @returns 추천 게시물
 */
export const getFeaturedPost = async (api: ApiClient) => {
  const response = await api.get<ServiceResponseInterface<Post>>('/post/featured');

  return response.data;
};
