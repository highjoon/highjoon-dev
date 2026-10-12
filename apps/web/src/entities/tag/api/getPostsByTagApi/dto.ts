import { Tag } from '@/entities/tag/model/types';

export interface GetPostsByTagParams {
  tagName: Tag['name'];
  offset?: number;
  limit?: number;
}
