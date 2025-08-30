import { type LikedPost, type ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';

export const userApi = (api: ApiClient) => {
  return {
    getLikedPosts: (userId: string) => api.get<ServiceResponseInterface<LikedPost[]>>(`/user/${userId}/liked-posts`),
  };
};
