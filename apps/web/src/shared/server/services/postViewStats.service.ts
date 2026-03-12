import { type Post, prisma } from '@highjoon-dev/prisma';

class PostViewStatsService {
  public async findOrCreateTodayStats(postId: Post['id'], date: Date) {
    return await prisma.postViewStats.upsert({
      where: { postId_date: { postId, date } },
      update: { viewCount: { increment: 1 } },
      create: { postId, date, viewCount: 1 },
    });
  }
}

export const postViewStatsService = new PostViewStatsService();
