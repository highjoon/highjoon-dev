import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type Post } from '@/entities/post/model/types';

export type GetPostsByTagResponseDto = ServiceResponseInterface<Post[]>;

export interface GetPostsByTagParams {
  tagId: string;
  skip?: number;
  take?: number;
}
