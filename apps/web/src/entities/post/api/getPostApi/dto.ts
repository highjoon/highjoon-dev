import { Category, PostTag, Tag } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type Post } from '@/entities/post/model/types';

export interface GetPostRequestDto {
  slug: Post['slug'];
}

export type CategoryRef = Pick<Category, 'id' | 'slug' | 'name' | 'parentId'> & {
  parent: Pick<Category, 'id' | 'slug' | 'name'> | null;
};

export type PostWithTags = Post & {
  postTags?: (PostTag & { tag: Tag })[];
  categoryRef?: CategoryRef | null;
};

export type GetPostResponseDto = ServiceResponseInterface<PostWithTags>;

export interface AdjacentPost {
  slug: string;
  title: string;
}

export interface AdjacentPosts {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}
