import { prisma } from '@highjoon-dev/prisma';

import { getTomorrowMidnight } from '@/utils/getTomorrowMidnight';

/**
 * 게시물 조회 로그 서비스
 * - IP 기반의 게시물 조회 로그를 기록
 */
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

    // 확률적으로 만료된 로그 정리 (약 1/100 요청마다)
    if (Math.random() < 0.01) {
      this.cleanupExpiredLogs().catch(() => {});
    }

    // 오늘 첫 조회
    return true;
  }

  public async cleanupExpiredLogs(): Promise<void> {
    await prisma.postViewLog.deleteMany({
      where: { expiredAt: { lt: new Date() } },
    });
  }
}

export const postViewLogService = new PostViewLogService();
