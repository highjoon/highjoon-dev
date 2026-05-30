import { type Post } from '@/entities/post/model/types';

export interface IncreaseViewCountRequestDto {
  slug: Post['slug'];
}
