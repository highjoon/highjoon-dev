import { relations } from "drizzle-orm/relations";

import {
  category,
  post,
  postTag,
  postViewLog,
  postViewStats,
  tag,
} from "./schema";

export const categoryRelations = relations(category, ({ one, many }) => ({
  category: one(category, {
    fields: [category.parentId],
    references: [category.id],
    relationName: "category_parentId_category_id",
  }),
  categories: many(category, {
    relationName: "category_parentId_category_id",
  }),
  posts: many(post),
}));

export const postTagRelations = relations(postTag, ({ one }) => ({
  post: one(post, {
    fields: [postTag.postId],
    references: [post.id],
  }),
  tag: one(tag, {
    fields: [postTag.tagId],
    references: [tag.id],
  }),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  postTags: many(postTag),
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
  postViewLogs: many(postViewLog),
  postViewStats: many(postViewStats),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  postTags: many(postTag),
}));

export const postViewLogRelations = relations(postViewLog, ({ one }) => ({
  post: one(post, {
    fields: [postViewLog.postId],
    references: [post.id],
  }),
}));

export const postViewStatsRelations = relations(postViewStats, ({ one }) => ({
  post: one(post, {
    fields: [postViewStats.postId],
    references: [post.id],
  }),
}));
