import { schema } from '@highjoon-dev/drizzle';

export type Category = typeof schema.category.$inferSelect;
