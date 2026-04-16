import { Post, PostTag, Tag } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetPostRequestDto {
  slug: Post['slug'];
}

export type PostWithTags = Post & { postTags?: (PostTag & { tag: Tag })[] };

export type GetPostResponseDto = ServiceResponseInterface<PostWithTags>;

export interface AdjacentPost {
  slug: string;
  title: string;
}

export interface AdjacentPosts {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}
