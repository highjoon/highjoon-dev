import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { foreignKey, index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const category = pgTable(
  'Category',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    slug: text().notNull(),
    name: text().notNull(),
    parentId: text(),
    createdAt: timestamp({ precision: 6, withTimezone: true, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('Category_parentId_idx').using('btree', table.parentId.asc().nullsLast().op('text_ops')),
    index('Category_slug_idx').using('btree', table.slug.asc().nullsLast().op('text_ops')),
    uniqueIndex('Category_slug_key').using('btree', table.slug.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'Category_parentId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);
