import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface UpdatePostRequestDto {
  slug: Post['slug'];
  post: Post;
}

export type UpdatePostResponseDto = ServiceResponseInterface<Post>;
