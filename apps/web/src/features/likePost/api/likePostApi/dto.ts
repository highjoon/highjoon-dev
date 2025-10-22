import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface LikePostRequestDto {
  postId: Post['id'];
  userId: string;
  slug: Post['slug'];
}

export type LikePostResponseDto = ServiceResponseInterface<Post>;
