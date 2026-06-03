/**
 * @jest-environment node
 */
import { postViewLogService } from './postViewLog.service';

jest.mock('@highjoon-dev/drizzle', () => {
  type Chain = {
    select: jest.Mock;
    from: jest.Mock;
    where: jest.Mock;
    limit: jest.Mock;
    insert: jest.Mock;
    values: jest.Mock;
    delete: jest.Mock;
  };
  const chain: Chain = {
    select: jest.fn(() => chain),
    from: jest.fn(() => chain),
    where: jest.fn(() => chain),
    limit: jest.fn(),
    insert: jest.fn(() => chain),
    values: jest.fn(),
    delete: jest.fn(() => chain),
  };
  // schema.postViewLog.postId 등 어떤 깊이 접근도 객체 반환
  const deep = (): object => new Proxy({}, { get: () => deep() });
  return {
    db: chain,
    schema: deep(),
    and: jest.fn(),
    eq: jest.fn(),
    lt: jest.fn(),
  };
});

const { db, lt } = jest.requireMock('@highjoon-dev/drizzle');

describe('postViewLogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const today = new Date('2026-03-13');

  describe('hasViewed', () => {
    test('조회 기록이 있으면 true를 반환한다', async () => {
      db.limit.mockResolvedValue([{ id: '1' }]);

      const result = await postViewLogService.hasViewed('post-1', '127.0.0.1', today);

      expect(result).toBe(true);
    });

    test('조회 기록이 없으면(빈 배열) false를 반환한다', async () => {
      db.limit.mockResolvedValue([]); // 빈 배열 = 미존재

      const result = await postViewLogService.hasViewed('post-1', '127.0.0.1', today);

      expect(result).toBe(false);
    });
  });

  describe('logView', () => {
    test('첫 조회 시 로그를 생성하고 true를 반환한다', async () => {
      db.limit.mockResolvedValue([]); // 기록 없음

      const result = await postViewLogService.logView('post-1', '127.0.0.1', today);

      expect(result).toBe(true);
      expect(db.insert).toHaveBeenCalled();
      expect(db.values).toHaveBeenCalledWith(
        expect.objectContaining({ postId: 'post-1', ip: '127.0.0.1', date: today }),
      );
    });

    test('이미 조회한 경우 로그를 생성하지 않고 false를 반환한다', async () => {
      db.limit.mockResolvedValue([{ id: '1' }]); // 기록 있음

      const result = await postViewLogService.logView('post-1', '127.0.0.1', today);

      expect(result).toBe(false);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('cleanupExpiredLogs', () => {
    test('만료된(expiredAt < now) 로그를 삭제한다', async () => {
      await postViewLogService.cleanupExpiredLogs();

      expect(db.delete).toHaveBeenCalled();
      // eq 가 아니라 lt(expiredAt, 현재시각)로 만료분을 지운다
      expect(lt).toHaveBeenCalledWith(expect.anything(), expect.any(Date));
    });
  });
});
