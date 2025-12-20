import { Post, PostTag, Tag } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetPostRequestDto {
  slug: Post['slug'];
}

export type PostWithTags = Post & { postTags?: (PostTag & { tag: Tag })[] };

export type GetPostResponseDto = ServiceResponseInterface<PostWithTags>;
