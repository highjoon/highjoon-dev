import { PaginationMeta } from '@highjoon-dev/types';

import type { PostWithTags } from '@/entities/post/api/getPostApi/dto';

// 페이지네이션 응답 타입
export interface PostsWithMeta {
  posts: PostWithTags[];
  meta: PaginationMeta;
}

// API 파라미터 타입
export interface GetAllPostsParams {
  skip?: number;
  take?: number;
  limit?: number;
}
