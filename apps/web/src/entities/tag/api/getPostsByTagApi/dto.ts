import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export type GetPostsByTagResponseDto = ServiceResponseInterface<Post[]>;

export interface GetPostsByTagParams {
  tagId: string;
  skip?: number;
  take?: number;
}
