import { type LikedPost, type ServiceResponseInterface } from '@highjoon-dev/types';

import type { ApiClient } from '@/shared/api';

export const userApi = (api: ApiClient) => {
  return {
    getLikedPosts: (userId: string) => api.get<ServiceResponseInterface<LikedPost[]>>(`/user/${userId}/liked-posts`),
  };
};
