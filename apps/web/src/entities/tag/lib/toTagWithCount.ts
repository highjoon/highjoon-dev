import { type TagResponse } from '@/entities/tag/model/response';
import { type TagWithCount } from '@/entities/tag/model/types';

export const toTagWithCount = (response: TagResponse): TagWithCount => ({
  id: response.id,
  name: response.name,
  postCount: response.postCount,
});
