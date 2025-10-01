import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/shared/api';

export const getAllPosts = async (api: ApiClient) => {
  const response = await api.get<ServiceResponseInterface<Post[]>>('/post');

  return response.data;
};
