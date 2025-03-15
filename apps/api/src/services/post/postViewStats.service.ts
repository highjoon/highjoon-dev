import prisma from '@/client';
import { getTomorrowMidnight } from '@/utils/getTomorrowMidnight';

class PostViewStatsService {
  public async findOrCreateTodayStats(slug: string, date: Date) {
    const existingView = await prisma.postViewStats.findFirst({
      where: { post: { slug }, date },
    });

    if (existingView) {
      return existingView;
    }

    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) {
      throw new Error('게시물이 존재하지 않습니다.');
    }

    const expiredAt = getTomorrowMidnight();

    return await prisma.postViewStats.create({
      data: { postId: post.id, viewCount: 1, date, expiredAt },
    });
  }
}

export const postViewStatsService = new PostViewStatsService();
