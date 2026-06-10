import { db, schema, sql } from '@highjoon-dev/drizzle';

import { type Post } from '@/entities/post/model/types';

class PostViewStatsService {
  public async findOrCreateTodayStats(postId: Post['id'], date: Date) {
    return await db
      .insert(schema.postViewStats)
      .values({ postId, date, viewCount: 1 })
      .onConflictDoUpdate({
        target: [schema.postViewStats.postId, schema.postViewStats.date],
        set: { viewCount: sql`${schema.postViewStats.viewCount} + 1` },
      });
  }
}

export const postViewStatsService = new PostViewStatsService();
