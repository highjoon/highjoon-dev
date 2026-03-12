import { prisma } from '@highjoon-dev/prisma';

import { getTomorrowMidnight } from '@/shared/server/lib/getTomorrowMidnight';

class PostViewLogService {
  public async hasViewed(postId: string, ip: string, date: Date): Promise<boolean> {
    const existingLog = await prisma.postViewLog.findFirst({
      where: { postId, ip, date },
    });

    return !!existingLog;
  }

  public async createLog(postId: string, ip: string, date: Date): Promise<void> {
    const expiredAt = getTomorrowMidnight();

    await prisma.postViewLog.create({ data: { postId, ip, date, expiredAt } });
  }

  public async logView(postId: string, ip: string, date: Date): Promise<boolean> {
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

  public async cleanupExpiredLogs(): Promise<void> {
    await prisma.postViewLog.deleteMany({
      where: { expiredAt: { lt: new Date() } },
    });
  }
}

export const postViewLogService = new PostViewLogService();
