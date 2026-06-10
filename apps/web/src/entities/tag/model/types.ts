import { schema } from '@highjoon-dev/drizzle';

export type Tag = typeof schema.tag.$inferSelect;

export type TagWithCount = Tag & {
  postCount: number;
};
