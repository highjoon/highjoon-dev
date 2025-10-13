import { Post } from '@highjoon-dev/prisma';

export interface GetPostDto {
  slug: Post['slug'];
}
