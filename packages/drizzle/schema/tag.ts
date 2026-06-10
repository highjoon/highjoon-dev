import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const tag = pgTable(
  'Tag',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    name: text().notNull(),
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
    index('Tag_name_idx').using('btree', table.name.asc().nullsLast().op('text_ops')),
    uniqueIndex('Tag_name_key').using('btree', table.name.asc().nullsLast().op('text_ops')),
  ],
);
