import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { Tag } from '@/entities/tag/model/types';

export type GetPostsByTagResponseDto = ServiceResponseInterface<PostWithTags[]>;

export interface GetPostsByTagParams {
  tagId: Tag['id'];
  offset?: number;
  limit?: number;
}
