/**
 * @jest-environment node
 */
import { postViewStatsService } from './postViewStats.service';

jest.mock('@highjoon-dev/drizzle', () => {
  type Chain = {
    insert: jest.Mock;
    values: jest.Mock;
    onConflictDoUpdate: jest.Mock;
  };
  const chain: Chain = {
    insert: jest.fn(() => chain),
    values: jest.fn(() => chain),
    onConflictDoUpdate: jest.fn(),
  };
  // schema.postViewStats.postId 등 어떤 깊이 접근도 객체 반환
  const deep = (): object => new Proxy({}, { get: () => deep() });
  return {
    db: chain,
    schema: deep(),
    sql: jest.fn(() => 'SQL'),
  };
});

const { db } = jest.requireMock('@highjoon-dev/drizzle');

describe('postViewStatsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOrCreateTodayStats', () => {
    const today = new Date('2026-03-13');

    test('오늘의 통계를 upsert 한다 (없으면 생성, 있으면 +1)', async () => {
      const mockResult = { rowCount: 1 };
      db.onConflictDoUpdate.mockResolvedValue(mockResult);

      const result = await postViewStatsService.findOrCreateTodayStats('post-1', today);

      expect(result).toEqual(mockResult);
      // viewCount 1 로 insert 시도
      expect(db.values).toHaveBeenCalledWith({ postId: 'post-1', date: today, viewCount: 1 });
      // (postId, date) 충돌 시 update 분기를 탄다
      expect(db.onConflictDoUpdate).toHaveBeenCalled();
    });
  });
});
