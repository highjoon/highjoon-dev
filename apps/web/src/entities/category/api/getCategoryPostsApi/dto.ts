import { Category, Post, PostTag, Tag } from '@highjoon-dev/prisma';
import { PaginationMeta, ServiceResponseInterface } from '@highjoon-dev/types';

export type CategoryPostsItem = Post & {
  postTags?: (PostTag & { tag: Tag })[];
  categoryRef?: Category | null;
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
