import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { boolean, foreignKey, index, integer, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

import { category } from './category';

export const post = pgTable(
  'Post',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    slug: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    contentUrl: text().notNull(),
    bannerImageUrl: text().notNull(),
    publishedAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    createdAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp({ precision: 6, withTimezone: true, mode: 'date' })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
    viewCount: integer().default(0),
    isFeatured: boolean().default(false).notNull(),
    isHidden: boolean().default(false).notNull(),
    categoryId: text(),
  },
  (table) => [
    index('Post_categoryId_idx').using('btree', table.categoryId.asc().nullsLast().op('text_ops')),
    index('Post_publishedAt_idx').using('btree', table.publishedAt.asc().nullsLast().op('timestamptz_ops')),
    uniqueIndex('Post_slug_key').using('btree', table.slug.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [category.id],
      name: 'Post_categoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);
