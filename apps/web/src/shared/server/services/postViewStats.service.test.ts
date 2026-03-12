/**
 * @jest-environment node
 */
import { postViewStatsService } from './postViewStats.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    postViewStats: {
      upsert: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('postViewStatsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOrCreateTodayStats', () => {
    const today = new Date('2026-03-13');

    test('오늘의 통계를 생성하거나 업데이트한다', async () => {
      const mockStats = { postId: 'post-1', date: today, viewCount: 1 };
      prisma.postViewStats.upsert.mockResolvedValue(mockStats);

      const result = await postViewStatsService.findOrCreateTodayStats('post-1', today);

      expect(result).toEqual(mockStats);
      expect(prisma.postViewStats.upsert).toHaveBeenCalledWith({
        where: { postId_date: { postId: 'post-1', date: today } },
        update: { viewCount: { increment: 1 } },
        create: { postId: 'post-1', date: today, viewCount: 1 },
      });
    });
  });
});
