import { type Post } from '@highjoon-dev/prisma';
import { type ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';

import { PostApiRequest } from './../types/post';

export const postApi = (api: ApiClient) => {
  return {
    getAll: () => api.get<ServiceResponseInterface<Post[]>>('/post', { cache: 'no-store' }),
    get: (params: PostApiRequest['get']) =>
      api.get<ServiceResponseInterface<Post>>(`/post/${params.slug}`, { cache: 'no-store' }),
    create: (params: PostApiRequest['create']) =>
      api.post<ServiceResponseInterface<Post>>('/post', { json: params.post }),
    update: (params: PostApiRequest['update']) =>
      api.put<ServiceResponseInterface<Post>>(`/post/${params.slug}`, { json: params.post }),
    delete: (params: PostApiRequest['delete']) => api.del<ServiceResponseInterface<Post>>(`/post/${params.slug}`),
    increaseViewCount: (params: PostApiRequest['increaseViewCount']) =>
      api.put<ServiceResponseInterface<Post>>(`/post/${params.slug}/view`, { cache: 'no-store' }),
    like: (params: PostApiRequest['like']) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${params.postId}/like`, { json: { userId: params.userId } }),
    unlike: (params: PostApiRequest['unlike']) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${params.postId}/unlike`, { json: { userId: params.userId } }),
    getFeatured: () => api.get<ServiceResponseInterface<Post>>(`/post/featured`, { cache: 'no-store' }),
  };
};
