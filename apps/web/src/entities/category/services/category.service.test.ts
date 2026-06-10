/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { categoryService } from './category.service';

// 쿼리 빌더 체인 mock (postTag.service.test 와 동일 구조).
// 빌더 메서드는 모두 체인을 돌려주고, 체인 자체가 thenable 이라 await/Promise.all 어디서 풀든
// 큐(FIFO)에 쌓아둔 결과를 순서대로 내보낸다. Promise.all 은 배열 순서대로 then 을 구독하므로
// enqueue 순서 = (await 순서 → 그 다음 Promise.all 의 배열 순서) 로 결정된다.
jest.mock('@highjoon-dev/drizzle', () => {
  const queue: Array<{ value: unknown } | { error: unknown }> = [];

  const chain: Record<string, unknown> = {
    then(resolve: (value: unknown) => void, reject: (error: unknown) => void) {
      const next = queue.length ? queue.shift()! : { value: [] };
      if ('error' in next) reject(next.error);
      else resolve(next.value);
    },
  };
  const methods = ['select', 'from', 'innerJoin', 'leftJoin', 'where', 'orderBy', 'limit', 'offset'];
  for (const method of methods) {
    chain[method] = jest.fn(() => chain);
  }

  // schema.post.id / alias 결과 등 임의 깊이 접근을 허용
  const deep = (): object => new Proxy({}, { get: () => deep() });

  return {
    db: chain,
    schema: deep(),
    alias: jest.fn(() => deep()),
    and: jest.fn(),
    asc: jest.fn(),
    count: jest.fn(),
    desc: jest.fn(),
    eq: jest.fn(),
    getTableColumns: jest.fn(() => ({})),
    inArray: jest.fn(),
    isNotNull: jest.fn(),
    isNull: jest.fn(),
    __enqueue: (...values: unknown[]) => values.forEach((value) => queue.push({ value })),
    __enqueueError: (error: unknown) => queue.push({ error }),
    __reset: () => {
      queue.length = 0;
    },
  };
});

const drizzle = jest.requireMock('@highjoon-dev/drizzle') as {
  inArray: jest.Mock;
  __enqueue: (...values: unknown[]) => void;
  __enqueueError: (error: unknown) => void;
  __reset: () => void;
};

describe('categoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    drizzle.__reset();
  });

  describe('findAllCategories', () => {
    test('대분류와 그 자식 목록을 트리 구조로 조립해 반환한다', async () => {
      const parents = [
        { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null },
        { id: 'c4', slug: 'infra', name: '인프라', parentId: null },
      ];
      const children = [
        { id: 'c2', slug: 'react', name: 'React', parentId: 'c1' },
        { id: 'c3', slug: 'react-query', name: 'React Query', parentId: 'c1' },
      ];
      drizzle.__enqueue(parents, children); // ① 부모 → ② 자식

      const result = await categoryService.findAllCategories();

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.OK);
      expect(result.data).toEqual([
        { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null, children },
        { id: 'c4', slug: 'infra', name: '인프라', parentId: null, children: [] },
      ]);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await categoryService.findAllCategories();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findCategoryBySlug', () => {
    test('카테고리를 찾으면 parent/children 포함하여 반환한다', async () => {
      const category = { id: 'c2', slug: 'react', name: 'React', parentId: 'c1' };
      const parent = { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null };
      drizzle.__enqueue([category], [parent], []); // ① 본체 → ② parent → ③ children

      const result = await categoryService.findCategoryBySlug('react');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.OK);
      expect(result.data).toEqual({ ...category, parent, children: [] });
    });

    test('parentId 가 없으면 parent 는 null 로 반환한다', async () => {
      const category = { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null };
      const children = [{ id: 'c2', slug: 'react', name: 'React', parentId: 'c1' }];
      drizzle.__enqueue([category], children); // parentId 없으면 parent 쿼리는 건너뜀

      const result = await categoryService.findCategoryBySlug('frontend');

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...category, parent: null, children });
    });

    test('카테고리가 없으면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await categoryService.findCategoryBySlug('unknown');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      drizzle.__enqueueError(new Error('DB error'));

      const result = await categoryService.findCategoryBySlug('react');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findPostsByCategorySlug', () => {
    test('소분류 슬러그면 해당 카테고리 게시물에 태그/카테고리 참조를 붙여 반환한다', async () => {
      const category = { id: 'c2', slug: 'react', name: 'React', parentId: 'c1' };
      const posts = [{ id: 'p1', slug: 'a', title: 'A', categoryId: 'c2' }];
      const categoryRefRows = [
        {
          id: 'c2',
          slug: 'react',
          name: 'React',
          parentId: 'c1',
          parentRefId: 'c1',
          parentRefSlug: 'frontend',
          parentRefName: '프론트엔드',
        },
      ];
      // ① 본체 → ② posts → ③ count → ④ tagRows → ⑤ categoryRefRows
      drizzle.__enqueue([category], posts, [{ value: 1 }], [], categoryRefRows);

      const result = await categoryService.findPostsByCategorySlug('react', { skip: 0, take: 10 });

      expect(result.success).toBe(true);
      expect(result.data?.posts).toEqual([
        {
          id: 'p1',
          slug: 'a',
          title: 'A',
          categoryId: 'c2',
          postTags: [],
          categoryRef: {
            id: 'c2',
            slug: 'react',
            name: 'React',
            parentId: 'c1',
            parent: { id: 'c1', slug: 'frontend', name: '프론트엔드' },
          },
        },
      ]);
      expect(result.data?.meta).toEqual({ total: 1, skip: 0, take: 10, hasMore: false });
      expect(result.data?.category).toEqual(category);
    });

    test('대분류 슬러그면 includeChildren 기본값(true)에 따라 자식 카테고리 id 까지 필터에 포함한다', async () => {
      const category = { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null };
      // ① 본체 → ② 자식 id → ③ posts(빈) → ④ count
      drizzle.__enqueue([category], [{ id: 'c2' }, { id: 'c3' }], [], [{ value: 0 }]);

      await categoryService.findPostsByCategorySlug('frontend');

      expect(drizzle.inArray).toHaveBeenCalledWith(expect.anything(), ['c1', 'c2', 'c3']);
    });

    test('카테고리가 없으면 404 응답을 반환한다', async () => {
      drizzle.__enqueue([]);

      const result = await categoryService.findPostsByCategorySlug('unknown');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('hasMore 플래그는 skip + posts.length < total 일 때 true', async () => {
      const category = { id: 'c2', slug: 'react', name: 'React', parentId: 'c1' };
      const posts = Array.from({ length: 10 }, (_, i) => ({ id: `p${i}`, slug: `s${i}`, categoryId: 'c2' }));
      // ① 본체 → ② posts → ③ count → ④ tagRows → ⑤ categoryRefRows
      drizzle.__enqueue([category], posts, [{ value: 25 }], [], []);

      const result = await categoryService.findPostsByCategorySlug('react', { skip: 0, take: 10 });

      expect(result.data?.meta.hasMore).toBe(true);
      expect(result.data?.meta.total).toBe(25);
    });
  });
});
