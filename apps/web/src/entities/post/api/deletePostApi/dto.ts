import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface DeletePostRequestDto {
  slug: Post['slug'];
}

export type DeletePostResponseDto = ServiceResponseInterface<Post>;
