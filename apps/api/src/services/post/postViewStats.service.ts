import { type Post, prisma } from '@highjoon-dev/prisma';

/**
 * 게시물 조회 통계 서비스
 * - 게시물의 하루치 조회수를 기록하고 통계를 제공
 */
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
