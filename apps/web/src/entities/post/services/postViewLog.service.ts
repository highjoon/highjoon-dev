import { and, db, eq, lt, schema } from '@highjoon-dev/drizzle';

import { getTomorrowMidnight } from '@/entities/post/lib/getTomorrowMidnight';
import type { Post, PostViewLog } from '@/entities/post/model/types';

class PostViewLogService {
  public async hasViewed(postId: Post['id'], ip: PostViewLog['ip'], date: PostViewLog['date']) {
    const [existingLog] = await db
      .select()
      .from(schema.postViewLog)
      .where(
        and(eq(schema.postViewLog.postId, postId), eq(schema.postViewLog.ip, ip), eq(schema.postViewLog.date, date)),
      )
      .limit(1);

    return !!existingLog;
  }

  public async createLog(postId: Post['id'], ip: PostViewLog['ip'], date: PostViewLog['date']) {
    const expiredAt = getTomorrowMidnight();

    await db.insert(schema.postViewLog).values({ postId, ip, date, expiredAt });
  }

  public async logView(postId: Post['id'], ip: PostViewLog['ip'], date: PostViewLog['date']) {
    const hasViewed = await this.hasViewed(postId, ip, date);

    if (hasViewed) {
      return false;
    }

    await this.createLog(postId, ip, date);

    if (Math.random() < 0.01) {
      this.cleanupExpiredLogs().catch(() => {});
    }

    return true;
  }

  public async cleanupExpiredLogs() {
    await db.delete(schema.postViewLog).where(lt(schema.postViewLog.expiredAt, new Date()));
  }
}

export const postViewLogService = new PostViewLogService();
