/**
 * @jest-environment node
 */
import { shapePostsWithRelations } from './shapePostsWithRelations';

// 쿼리 빌더 체인 mock — FIFO 큐로 (tag 조인 → categoryRef 조인) 순서대로 결과를 내보낸다.
jest.mock('@highjoon-dev/drizzle', () => {
  const queue: unknown[] = [];

  const chain: Record<string, unknown> = {
    then(resolve: (value: unknown) => void) {
      resolve(queue.length ? queue.shift() : []);
    },
  };
  for (const method of ['select', 'from', 'innerJoin', 'leftJoin', 'where']) {
    chain[method] = jest.fn(() => chain);
  }

  const deep = (): object => new Proxy({}, { get: () => deep() });

  return {
    db: chain,
    schema: deep(),
    alias: jest.fn(() => deep()),
    eq: jest.fn(),
    inArray: jest.fn(),
    getTableColumns: jest.fn(() => ({})),
    __enqueue: (...values: unknown[]) => values.forEach((value) => queue.push(value)),
    __reset: () => {
      queue.length = 0;
    },
  };
});

const drizzle = jest.requireMock('@highjoon-dev/drizzle') as {
  __enqueue: (...values: unknown[]) => void;
  __reset: () => void;
};

describe('shapePostsWithRelations', () => {
  beforeEach(() => {
    drizzle.__reset();
  });

  test('게시물에 태그와 카테고리 참조(부모 포함)를 붙인다', async () => {
    const posts = [{ id: 'p1', categoryId: 'c1', title: 'A' }];
    const tagRows = [{ postTag: { id: 'pt1', postId: 'p1', tagId: 't1' }, tag: { id: 't1', name: 'react' } }];
    const categoryRefRows = [
      {
        id: 'c1',
        slug: 'react',
        name: 'React',
        parentId: 'cp',
        parentRefId: 'cp',
        parentRefSlug: 'frontend',
        parentRefName: '프론트엔드',
      },
    ];
    drizzle.__enqueue(tagRows, categoryRefRows); // ① 태그 조인 → ② 카테고리 참조

    const result = await shapePostsWithRelations(posts);

    expect(result).toEqual([
      {
        id: 'p1',
        categoryId: 'c1',
        title: 'A',
        postTags: [{ id: 'pt1', postId: 'p1', tagId: 't1', tag: { id: 't1', name: 'react' } }],
        categoryRef: {
          id: 'c1',
          slug: 'react',
          name: 'React',
          parentId: 'cp',
          parent: { id: 'cp', slug: 'frontend', name: '프론트엔드' },
        },
      },
    ]);
  });

  test('부모가 없는 카테고리는 parent를 null로 정규화한다', async () => {
    const posts = [{ id: 'p1', categoryId: 'c1' }];
    const categoryRefRows = [
      {
        id: 'c1',
        slug: 'frontend',
        name: '프론트엔드',
        parentId: null,
        parentRefId: null,
        parentRefSlug: null,
        parentRefName: null,
      },
    ];
    drizzle.__enqueue([], categoryRefRows); // 태그 없음 → 카테고리 참조

    const result = await shapePostsWithRelations(posts);

    expect(result[0].categoryRef).toEqual({
      id: 'c1',
      slug: 'frontend',
      name: '프론트엔드',
      parentId: null,
      parent: null,
    });
    expect(result[0].postTags).toEqual([]);
  });

  test('categoryId가 없으면 categoryRef는 null이다', async () => {
    const posts = [{ id: 'p1', categoryId: null }];
    drizzle.__enqueue([]); // 태그 조인만 (categoryRef 쿼리는 스킵)

    const result = await shapePostsWithRelations(posts);

    expect(result[0].categoryRef).toBeNull();
    expect(result[0].postTags).toEqual([]);
  });

  test('빈 목록이면 쿼리 없이 빈 배열을 반환한다', async () => {
    const result = await shapePostsWithRelations([]);

    expect(result).toEqual([]);
  });
});
