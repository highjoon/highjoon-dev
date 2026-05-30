import { createId } from '@paralleldrive/cuid2';
import { date, foreignKey, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

import { post } from './post';

export const postViewLog = pgTable(
  'PostViewLog',
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    postId: text().notNull(),
    ip: text().notNull(),
    date: date({ mode: 'date' }).notNull(),
    expiredAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [
    uniqueIndex('PostViewLog_postId_ip_date_key').using(
      'btree',
      table.postId.asc().nullsLast().op('date_ops'),
      table.ip.asc().nullsLast().op('date_ops'),
      table.date.asc().nullsLast().op('date_ops'),
    ),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: 'PostViewLog_postId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
