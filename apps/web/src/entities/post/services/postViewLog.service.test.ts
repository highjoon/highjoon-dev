/**
 * @jest-environment node
 */
import { postViewLogService } from './postViewLog.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    postViewLog: {
      findFirst: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('postViewLogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const today = new Date('2026-03-13');

  describe('hasViewed', () => {
    test('조회 기록이 있으면 true를 반환한다', async () => {
      prisma.postViewLog.findFirst.mockResolvedValue({ id: '1' });

      const result = await postViewLogService.hasViewed('post-1', '127.0.0.1', today);

      expect(result).toBe(true);
    });

    test('조회 기록이 없으면 false를 반환한다', async () => {
      prisma.postViewLog.findFirst.mockResolvedValue(null);

      const result = await postViewLogService.hasViewed('post-1', '127.0.0.1', today);

      expect(result).toBe(false);
    });
  });

  describe('logView', () => {
    test('첫 조회 시 로그를 생성하고 true를 반환한다', async () => {
      prisma.postViewLog.findFirst.mockResolvedValue(null);
      prisma.postViewLog.create.mockResolvedValue({});

      const result = await postViewLogService.logView('post-1', '127.0.0.1', today);

      expect(result).toBe(true);
      expect(prisma.postViewLog.create).toHaveBeenCalled();
    });

    test('이미 조회한 경우 false를 반환한다', async () => {
      prisma.postViewLog.findFirst.mockResolvedValue({ id: '1' });

      const result = await postViewLogService.logView('post-1', '127.0.0.1', today);

      expect(result).toBe(false);
      expect(prisma.postViewLog.create).not.toHaveBeenCalled();
    });
  });

  describe('cleanupExpiredLogs', () => {
    test('만료된 로그를 삭제한다', async () => {
      prisma.postViewLog.deleteMany.mockResolvedValue({ count: 5 });

      await postViewLogService.cleanupExpiredLogs();

      expect(prisma.postViewLog.deleteMany).toHaveBeenCalledWith({
        where: { expiredAt: { lt: expect.any(Date) } },
      });
    });
  });
});
