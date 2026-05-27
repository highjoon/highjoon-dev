import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const role = pgEnum("Role", ["USER", "ADMIN"]);

export const category = pgTable(
  "Category",
  {
    id: text().primaryKey().notNull(),
    slug: text().notNull(),
    name: text().notNull(),
    parentId: text(),
    createdAt: timestamp({ precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => [
    index("Category_parentId_idx").using(
      "btree",
      table.parentId.asc().nullsLast().op("text_ops"),
    ),
    index("Category_slug_idx").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("Category_slug_key").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "Category_parentId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const tag = pgTable(
  "Tag",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    createdAt: timestamp({ precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => [
    index("Tag_name_idx").using(
      "btree",
      table.name.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("Tag_name_key").using(
      "btree",
      table.name.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const postTag = pgTable(
  "PostTag",
  {
    id: text().primaryKey().notNull(),
    postId: text().notNull(),
    tagId: text().notNull(),
    createdAt: timestamp({ precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("PostTag_postId_idx").using(
      "btree",
      table.postId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("PostTag_postId_tagId_key").using(
      "btree",
      table.postId.asc().nullsLast().op("text_ops"),
      table.tagId.asc().nullsLast().op("text_ops"),
    ),
    index("PostTag_tagId_idx").using(
      "btree",
      table.tagId.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: "PostTag_postId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tag.id],
      name: "PostTag_tagId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const user = pgTable("User", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  avatarUrl: text().notNull(),
  homeUrl: text().notNull(),
  role: role().default("USER").notNull(),
  githubId: integer().notNull(),
});

export const post = pgTable(
  "Post",
  {
    id: text().primaryKey().notNull(),
    slug: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    contentUrl: text().notNull(),
    bannerImageUrl: text().notNull(),
    publishedAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).notNull(),
    createdAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp({ precision: 6, withTimezone: true, mode: "string" }),
    viewCount: integer().default(0),
    likeCount: integer().default(0),
    isFeatured: boolean().default(false).notNull(),
    isHidden: boolean().default(false).notNull(),
    categoryId: text(),
  },
  (table) => [
    index("Post_categoryId_idx").using(
      "btree",
      table.categoryId.asc().nullsLast().op("text_ops"),
    ),
    index("Post_publishedAt_idx").using(
      "btree",
      table.publishedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    uniqueIndex("Post_slug_key").using(
      "btree",
      table.slug.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [category.id],
      name: "Post_categoryId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const postViewLog = pgTable(
  "PostViewLog",
  {
    id: text().primaryKey().notNull(),
    postId: text().notNull(),
    ip: text().notNull(),
    date: date().notNull(),
    expiredAt: timestamp({
      precision: 6,
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => [
    uniqueIndex("PostViewLog_postId_ip_date_key").using(
      "btree",
      table.postId.asc().nullsLast().op("date_ops"),
      table.ip.asc().nullsLast().op("date_ops"),
      table.date.asc().nullsLast().op("date_ops"),
    ),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: "PostViewLog_postId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const postViewStats = pgTable(
  "PostViewStats",
  {
    id: text().primaryKey().notNull(),
    postId: text().notNull(),
    date: date().notNull(),
    viewCount: integer().default(0).notNull(),
  },
  (table) => [
    uniqueIndex("PostViewStats_postId_date_key").using(
      "btree",
      table.postId.asc().nullsLast().op("date_ops"),
      table.date.asc().nullsLast().op("date_ops"),
    ),
    foreignKey({
      columns: [table.postId],
      foreignColumns: [post.id],
      name: "PostViewStats_postId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);
