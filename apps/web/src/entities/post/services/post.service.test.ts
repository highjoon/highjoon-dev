/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { type Post } from '@/entities/post/model/types';

import { postService } from './post.service';

// 쿼리 빌더 체인 mock (postTag/category 서비스 테스트와 동일 구조).
// 빌더 메서드는 모두 체인을 돌려주고, 체인 자체가 thenable 이라 await/Promise.all 어디서 풀든
// 큐(FIFO)에 쌓아둔 결과를 순서대로 내보낸다.
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
    'where',
    'orderBy',
    'limit',
    'offset',
    'insert',
    'values',
    'returning',
    'onConflictDoNothing',
    'update',
    'set',
    'delete',
  ];
  for (const method of methods) {
    chain[method] = jest.fn(() => chain);
  }
  chain.transaction = jest.fn((callback: (tx: unknown) => unknown) => callback(chain));

  const deep = (): object => new Proxy({}, { get: () => deep() });

  return {
    db: chain,
    schema: deep(),
    and: jest.fn(),
    asc: jest.fn(),
    count: jest.fn(),
    desc: jest.fn(),
    eq: jest.fn(),
    gt: jest.fn(),
    lt: jest.fn(),
    sql: jest.fn(),
    __enqueue: (...values: unknown[]) => values.forEach((value) => queue.push({ value })),
    __enqueueError: (error: unknown) => queue.push({ error }),
    __reset: () => {
      queue.length = 0;
    },
  };
});

// 관계 셰이핑은 자체 테스트(shapePostsWithRelations.test)로 검증하므로 여기서는 패스스루로 mock.
jest.mock('../../../shared/server/lib/shapePostsWithRelations', () => ({
  shapePostsWithRelations: jest.fn((posts: Array<Record<string, unknown>>) =>
    Promise.resolve(posts.map((post) => ({ ...post, postTags: [], categoryRef: null }))),
  ),
}));

jest.mock('./postViewLog.service', () => ({ postViewLogService: { logView: jest.fn() } }));
jest.mock('./postViewStats.service', () => ({ postViewStatsService: { findOrCreateTodayStats: jest.fn() } }));
jest.mock('../../tag/services/postTag.service', () => ({ postTagService: { syncPostTags: jest.fn() } }));
jest.mock('../../tag/services/tag.service', () => ({ tagService: { findOrCreateTags: jest.fn() } }));

const drizzle = jest.requireMock('@highjoon-dev/drizzle') as {
  db: Record<string, jest.Mock>;
  __enqueue: (...values: unknown[]) => void;
  __enqueueError: (error: unknown) => void;
  __reset: () => void;
};
const { db } = drizzle;
const { shapePostsWithRelations } = jest.requireMock('../../../shared/server/lib/shapePostsWithRelations');
const { postViewLogService } = jest.requireMock('./postViewLog.service');
const { postViewStatsService } = jest.requireMock('./postViewStats.service');

const mockPost = {
  id: 'post-1',
  slug: 'test-post',
  title: 'Test Post',
  description: 'desc',
  contentUrl: 'url',
  bannerImageUrl: 'img',
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: null,
  viewCount: 10,
  isFeatured: false,
  isHidden: false,
} satisfies Post;

describe('postService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    drizzle.__reset();
  });

  describe('findAllPosts', () => {
    test('게시물 목록을 페이지네이션으로 조회하고 관계를 셰이핑한다', async () => {
      drizzle.__enqueue([mockPost], [{ value: 1 }]); // ① posts → ② count

      const result = await postService.findAllPosts({ skip: 0, take: 10 });

      expect(result.success).toBe(true);
      expect(result.data?.posts).toHaveLength(1);
      expect(result.data?.meta).toEqual({ total: 1, skip: 0, take: 10, hasMore: false });
      expect(shapePostsWithRelations).toHaveBeenCalledWith([mockPost]);
    });

    test('게시물이 없으면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([], [{ value: 0 }]);

      const result = await postService.findAllPosts({ skip: 0, take: 10 });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await postService.findAllPosts();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findPost', () => {
    test('slug로 게시물을 조회하고 셰이핑 헬퍼로 관계를 붙인다', async () => {
      drizzle.__enqueue([mockPost]);

      const result = await postService.findPost('test-post');

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...mockPost, postTags: [], categoryRef: null });
      expect(shapePostsWithRelations).toHaveBeenCalledWith([mockPost]);
    });

    test('게시물이 없으면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await postService.findPost('not-found');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('숨겨진 게시물이면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([{ ...mockPost, isHidden: true }]);

      const result = await postService.findPost('hidden-post');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('findFeaturedPost', () => {
    test('추천 게시물을 조회한다', async () => {
      const featured = { ...mockPost, isFeatured: true };
      drizzle.__enqueue([featured]);

      const result = await postService.findFeaturedPost();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...featured, postTags: [], categoryRef: null });
    });

    test('추천 게시물이 없으면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await postService.findFeaturedPost();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('increaseViewCount', () => {
    test('첫 조회 시 조회수를 증가시킨다', async () => {
      drizzle.__enqueue([mockPost], [{ ...mockPost, viewCount: 11 }]); // ① 게시물 조회 → ② update returning
      postViewLogService.logView.mockResolvedValue(true);
      postViewStatsService.findOrCreateTodayStats.mockResolvedValue({});

      const result = await postService.increaseViewCount('test-post', '127.0.0.1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('조회수가 증가되었습니다.');
      expect(db.update).toHaveBeenCalled();
    });

    test('같은 날 재조회 시 조회수를 증가시키지 않는다', async () => {
      drizzle.__enqueue([mockPost]);
      postViewLogService.logView.mockResolvedValue(false);

      const result = await postService.increaseViewCount('test-post', '127.0.0.1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('오늘 이미 조회된 게시물입니다.');
      expect(db.update).not.toHaveBeenCalled();
    });

    test('존재하지 않는 게시물이면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await postService.increaseViewCount('not-found', '127.0.0.1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('createManyPosts', () => {
    test('여러 게시물을 생성한다', async () => {
      const posts = [mockPost];
      drizzle.__enqueue(posts);

      const result = await postService.createManyPosts(posts as Post[]);

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
      expect(result.data).toEqual(posts);
    });
  });

  describe('findAdjacentPosts', () => {
    const olderPost = { slug: 'older-post', title: 'Older Post' };
    const newerPost = { slug: 'newer-post', title: 'Newer Post' };

    test('이전글과 다음글이 모두 있을 때 반환한다', async () => {
      drizzle.__enqueue([mockPost], [olderPost], [newerPost]); // ① 본체 → ② prev → ③ next

      const result = await postService.findAdjacentPosts('test-post');

      expect(result.success).toBe(true);
      expect(result.data?.prev).toEqual(olderPost);
      expect(result.data?.next).toEqual(newerPost);
    });

    test('이전글이 없을 때 prev가 null이다', async () => {
      drizzle.__enqueue([mockPost], [], [newerPost]);

      const result = await postService.findAdjacentPosts('test-post');

      expect(result.success).toBe(true);
      expect(result.data?.prev).toBeNull();
      expect(result.data?.next).toEqual(newerPost);
    });

    test('다음글이 없을 때 next가 null이다', async () => {
      drizzle.__enqueue([mockPost], [olderPost], []);

      const result = await postService.findAdjacentPosts('test-post');

      expect(result.success).toBe(true);
      expect(result.data?.prev).toEqual(olderPost);
      expect(result.data?.next).toBeNull();
    });

    test('존재하지 않는 게시물이면 404를 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await postService.findAdjacentPosts('not-found');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('숨겨진 게시물이면 404를 반환한다', async () => {
      drizzle.__enqueue([{ ...mockPost, isHidden: true }]);

      const result = await postService.findAdjacentPosts('hidden-post');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('DB 에러 발생 시 500을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await postService.findAdjacentPosts('test-post');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
