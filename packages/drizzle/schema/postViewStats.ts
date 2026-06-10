import { createId } from '@paralleldrive/cuid2';
import { date, foreignKey, integer, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';

import { post } from './post';

export const postViewStats = pgTable(
  'PostViewStats',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    postId: text().notNull(),
    date: date({ mode: 'date' }).notNull(),
    viewCount: integer().default(0).notNull(),
  },
  (table) => [
    uniqueIndex('PostViewStats_postId_date_key').using(
      'btree',
      table.postId.asc().nullsLast().op('date_ops'),
      table.date.asc().nullsLast().op('date_ops'),
    ),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: 'PostViewStats_postId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
