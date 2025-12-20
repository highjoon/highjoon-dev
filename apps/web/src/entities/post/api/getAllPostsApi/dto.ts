import { Post } from '@highjoon-dev/prisma';
import { PaginationMeta, ServiceResponseInterface } from '@highjoon-dev/types';

// 페이지네이션 응답 타입
export interface PostsWithMeta {
  posts: Post[];
  meta: PaginationMeta;
}

export type GetAllPostsResponseDto = ServiceResponseInterface<PostsWithMeta>;

// API 파라미터 타입
export interface GetAllPostsParams {
  skip?: number;
  take?: number;
  limit?: number;
}
