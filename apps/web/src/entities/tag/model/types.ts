import { type Tag } from '@highjoon-dev/prisma';

export type TagWithCount = Tag & {
  postCount: number;
};
