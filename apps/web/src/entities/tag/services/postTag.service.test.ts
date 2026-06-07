/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { postTagService } from './postTag.service';

// 쿼리 빌더 체인 mock.
// 빌더 메서드는 모두 체인을 돌려주고, 체인 자체가 thenable 이라 어디서 await 하든
// 큐(FIFO)에 쌓아둔 결과를 순서대로 내보낸다. 한 서비스 메서드가 쿼리를 여러 번 날리는
// findPostsByTag(① 게시물 목록 → ② 태그 행) 같은 경우를 위한 구조다.
jest.mock('@highjoon-dev/drizzle', () => {
  const queue: Array<{ value: unknown } | { error: unknown }> = [];

  const chain: Record<string, unknown> = {
    then(resolve: (value: unknown) => void, reject: (error: unknown) => void) {
      const next = queue.length ? queue.shift()! : { value: [] };
      if ('error' in next) reject(next.error);
      else resolve(next.value);
    },
  };
  const methods = [
    'select',
    'from',
    'innerJoin',
    'leftJoin',
    'where',
    'orderBy',
    'limit',
    'offset',
    'insert',
    'values',
    'onConflictDoNothing',
    'delete',
  ];
  for (const method of methods) {
    chain[method] = jest.fn(() => chain);
  }
  chain.transaction = jest.fn((callback: (tx: unknown) => unknown) => callback(chain));

  // schema.post.id 등 임의 깊이 접근을 허용
  const deep = (): object => new Proxy({}, { get: () => deep() });

  return {
    db: chain,
    schema: deep(),
    eq: jest.fn(),
    desc: jest.fn(),
    inArray: jest.fn(),
    getTableColumns: jest.fn(() => ({})),
    __enqueue: (...values: unknown[]) => values.forEach((value) => queue.push({ value })),
    __enqueueError: (error: unknown) => queue.push({ error }),
    __reset: () => {
      queue.length = 0;
    },
  };
});

const drizzle = jest.requireMock('@highjoon-dev/drizzle') as {
  db: Record<string, jest.Mock>;
  __enqueue: (...values: unknown[]) => void;
  __enqueueError: (error: unknown) => void;
  __reset: () => void;
};
const { db } = drizzle;

describe('postTagService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    drizzle.__reset();
  });

  describe('syncPostTags', () => {
    test('트랜잭션 안에서 기존 연결을 지우고 새 목록을 삽입한다', async () => {
      await postTagService.syncPostTags('p1', ['t1', 't2']);

      expect(db.transaction).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalled();
      expect(db.insert).toHaveBeenCalled();
      expect(db.values).toHaveBeenCalledWith([
        { postId: 'p1', tagId: 't1' },
        { postId: 'p1', tagId: 't2' },
      ]);
      expect(db.onConflictDoNothing).toHaveBeenCalled();
    });

    test('tagIds 가 비면 삭제만 하고 삽입하지 않는다', async () => {
      await postTagService.syncPostTags('p1', []);

      expect(db.delete).toHaveBeenCalled();
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('findTagsByPost', () => {
    test('게시물에 연결된 태그 목록을 반환한다', async () => {
      const tags = [
        { id: 't1', name: 'react', createdAt: new Date(), updatedAt: new Date() },
        { id: 't2', name: 'typescript', createdAt: new Date(), updatedAt: new Date() },
      ];
      drizzle.__enqueue(tags);

      const result = await postTagService.findTagsByPost('p1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(tags);
      expect(db.innerJoin).toHaveBeenCalled();
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await postTagService.findTagsByPost('p1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findPostsByTag', () => {
    test('태그별 게시물에 연결 태그를 중첩해 반환한다', async () => {
      const createdAt = new Date();
      const taggedPosts = [
        { id: '1', title: 'Post 1' },
        { id: '2', title: 'Post 2' },
      ];
      const reactTag = { id: 't1', name: 'react', createdAt, updatedAt: createdAt };
      const tagRows = [
        { postTag: { id: 'pt1', postId: '1', tagId: 't1', createdAt }, tag: reactTag },
        { postTag: { id: 'pt2', postId: '2', tagId: 't1', createdAt }, tag: reactTag },
      ];
      drizzle.__enqueue(taggedPosts, tagRows); // ① 목록 → ② 태그 행

      const result = await postTagService.findPostsByTag('t1', { offset: 0, limit: 10 });

      expect(result.success).toBe(true);
      expect(result.data).toEqual([
        { id: '1', title: 'Post 1', postTags: [{ id: 'pt1', postId: '1', tagId: 't1', createdAt, tag: reactTag }] },
        { id: '2', title: 'Post 2', postTags: [{ id: 'pt2', postId: '2', tagId: 't1', createdAt, tag: reactTag }] },
      ]);
    });

    test('해당 태그의 게시물이 없으면 빈 배열을 반환한다 (태그 조회 쿼리 스킵)', async () => {
      drizzle.__enqueue([]); // 게시물 목록이 비면 두 번째 쿼리를 날리지 않는다

      const result = await postTagService.findPostsByTag('t1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await postTagService.findPostsByTag('t1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
