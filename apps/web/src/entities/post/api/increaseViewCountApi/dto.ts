import { Post } from '@highjoon-dev/prisma';

export interface IncreaseViewCountRequestDto {
  slug: Post['slug'];
}
