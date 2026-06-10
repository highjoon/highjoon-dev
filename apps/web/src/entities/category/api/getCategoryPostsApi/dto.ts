import { PaginationMeta, ServiceResponseInterface } from '@highjoon-dev/types';

import { type Category } from '@/entities/category/model/types';
import type { CategoryRef } from '@/entities/post/api/getPostApi/dto';
import { type Post, type PostTag } from '@/entities/post/model/types';
import { type Tag } from '@/entities/tag/model/types';

export type CategoryPostsItem = Post & {
  postTags?: (PostTag & { tag: Tag })[];
  categoryRef?: CategoryRef | null;
};

export interface GetCategoryPostsRequestDto {
  slug: string;
  skip?: number;
  take?: number;
  includeChildren?: boolean;
}

export interface GetCategoryPostsResponseData {
  posts: CategoryPostsItem[];
  meta: PaginationMeta;
  category: Category;
}

export type GetCategoryPostsResponseDto = ServiceResponseInterface<GetCategoryPostsResponseData>;
