import { schema } from '@highjoon-dev/drizzle';

export type Post = typeof schema.post.$inferSelect;

export type PostViewLog = typeof schema.postViewLog.$inferSelect;
