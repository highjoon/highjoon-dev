import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface CreatePostRequestDto {
  post: Post;
}

export type CreatePostResponseDto = ServiceResponseInterface<Post>;
