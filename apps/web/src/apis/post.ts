import { type Post } from '@highjoon-dev/prisma';
import { type ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';

import { PostApiRequest } from './../types/post';

export const postApi = (api: ApiClient) => {
  return {
    /** 게시물 전체 조회 */
    getAll: () => api.get<ServiceResponseInterface<Post[]>>('/post', { cache: 'no-store' }),
    /** 게시물 조회 */
    get: (params: PostApiRequest['get']) =>
      api.get<ServiceResponseInterface<Post>>(`/post/${params.slug}`, { cache: 'no-store' }),
    /** 게시물 생성 */
    create: (params: PostApiRequest['create']) =>
      api.post<ServiceResponseInterface<Post>>('/post', { json: params.post }),
    /** 게시물 수정 */
    update: (params: PostApiRequest['update']) =>
      api.put<ServiceResponseInterface<Post>>(`/post/${params.slug}`, { json: params.post }),
    /** 게시물 삭제 */
    delete: (params: PostApiRequest['delete']) => api.del<ServiceResponseInterface<Post>>(`/post/${params.slug}`),
    /** 게시물 조회수 증가 */
    increaseViewCount: (params: PostApiRequest['increaseViewCount']) =>
      api.put<ServiceResponseInterface<Post>>(`/post/${params.slug}/view`, { cache: 'no-store' }),
    /** 게시물 좋아요 */
    like: (params: PostApiRequest['like']) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${params.postId}/like`, { json: { userId: params.userId } }),
    /** 게시물 좋아요 취소 */
    unlike: (params: PostApiRequest['unlike']) =>
      api.post<ServiceResponseInterface<Post>>(`/post/${params.postId}/unlike`, { json: { userId: params.userId } }),
    /** 추천 게시물 조회 */
    getFeatured: () => api.get<ServiceResponseInterface<Post>>(`/post/featured`, { cache: 'no-store' }),
  };
};
