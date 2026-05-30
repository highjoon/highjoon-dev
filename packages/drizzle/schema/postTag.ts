import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { foreignKey, index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

import { post } from './post';
import { tag } from './tag';

export const postTag = pgTable(
  'PostTag',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    postId: text().notNull(),
    tagId: text().notNull(),
    createdAt: timestamp({ precision: 6, withTimezone: true, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('PostTag_postId_idx').using('btree', table.postId.asc().nullsLast().op('text_ops')),
    uniqueIndex('PostTag_postId_tagId_key').using(
      'btree',
      table.postId.asc().nullsLast().op('text_ops'),
      table.tagId.asc().nullsLast().op('text_ops'),
    ),
    index('PostTag_tagId_idx').using('btree', table.tagId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: 'PostTag_postId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tag.id],
      name: 'PostTag_tagId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
