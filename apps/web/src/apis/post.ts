import { type Post } from '@highjoon-dev/prisma';
import { type ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';

export const postApi = (api: ApiClient) => {
  return {
    getAll: () => api.get<ServiceResponseInterface<Post[]>>('/post', { cache: 'no-store' }),
    get: (slug: string) => api.get<ServiceResponseInterface<Post>>(`/post/${slug}`, { cache: 'no-store' }),
    create: (post: Post) => api.post<ServiceResponseInterface<Post>>('/post', { json: post }),
    update: (slug: string, post: Post) => api.put<ServiceResponseInterface<Post>>(`/post/${slug}`, { json: post }),
    delete: (slug: string) => api.del<ServiceResponseInterface<Post>>(`/post/${slug}`),
    increaseViewCount: (slug: string) =>
      api.put<ServiceResponseInterface<Post>>(`/post/${slug}/view`, { cache: 'no-store' }),
    like: (postId: string, userId: string) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${postId}/like`, { json: { userId } }),
    unlike: (postId: string, userId: string) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${postId}/unlike`, { json: { userId } }),
    getFeatured: () => api.get<ServiceResponseInterface<Post>>(`/post/featured`, { cache: 'no-store' }),
  };
};
