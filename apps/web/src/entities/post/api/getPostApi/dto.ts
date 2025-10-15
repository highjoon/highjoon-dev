import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetPostRequestDto {
  slug: Post['slug'];
}

export type GetPostResponseDto = ServiceResponseInterface<Post>;
