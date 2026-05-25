import { Category, Post, PostTag, Tag } from '@highjoon-dev/prisma';
import { PaginationMeta, ServiceResponseInterface } from '@highjoon-dev/types';

import type { CategoryRef } from '@/entities/post/api/getPostApi/dto';

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
