import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface UnlikePostRequestDto {
  postId: Post['id'];
  userId: string;
  slug: Post['slug'];
}

export type UnlikePostResponseDto = ServiceResponseInterface<Post>;
