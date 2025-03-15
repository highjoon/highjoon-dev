import prisma from '@/client';

class PostViewLogService {
  public async logView(postId: string, ip: string, date: Date): Promise<boolean> {
    const existingLog = await prisma.postViewLog.findFirst({
      where: { postId, ip, date },
    });

    // 이미 조회한 경우
    if (!!existingLog) {
      return false;
    }

    await prisma.postViewLog.create({ data: { postId, ip, date } });

    // 오늘 첫 조회
    return true;
  }
}

export const postViewLogService = new PostViewLogService();
