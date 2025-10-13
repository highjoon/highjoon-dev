import { Post } from '@highjoon-dev/prisma';

export interface IncreaseViewCountDto {
  slug: Post['slug'];
}
