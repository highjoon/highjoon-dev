import { schema } from '@highjoon-dev/drizzle';

export type Post = typeof schema.post.$inferSelect;

export type PostTag = typeof schema.postTag.$inferSelect;

export type PostViewLog = typeof schema.postViewLog.$inferSelect;
