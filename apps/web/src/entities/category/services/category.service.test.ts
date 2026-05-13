/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { categoryService } from './category.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    post: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('categoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllCategories', () => {
    test('대분류와 그 자식 목록을 트리 구조로 반환한다', async () => {
      const mockTree = [
        {
          id: 'c1',
          slug: 'frontend',
          name: '프론트엔드',
          parentId: null,
          children: [
            { id: 'c2', slug: 'react', name: 'React', parentId: 'c1' },
            { id: 'c3', slug: 'react-query', name: 'React Query', parentId: 'c1' },
          ],
        },
        { id: 'c4', slug: 'infra', name: '인프라', parentId: null, children: [] },
      ];
      prisma.category.findMany.mockResolvedValue(mockTree);

      const result = await categoryService.findAllCategories();

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.OK);
      expect(result.data).toEqual(mockTree);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { parentId: null },
        include: { children: { orderBy: { name: 'asc' } } },
        orderBy: { name: 'asc' },
      });
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.category.findMany.mockRejectedValue(new Error('DB error'));

      const result = await categoryService.findAllCategories();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findCategoryBySlug', () => {
    test('카테고리를 찾으면 parent/children 포함하여 반환한다', async () => {
      const mockCategory = {
        id: 'c2',
        slug: 'react',
        name: 'React',
        parentId: 'c1',
        parent: { id: 'c1', slug: 'frontend', name: '프론트엔드', parentId: null },
        children: [],
      };
      prisma.category.findUnique.mockResolvedValue(mockCategory);

      const result = await categoryService.findCategoryBySlug('react');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.OK);
      expect(result.data).toEqual(mockCategory);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { slug: 'react' },
        include: { parent: true, children: { orderBy: { name: 'asc' } } },
      });
    });

    test('카테고리가 없으면 404 응답을 반환한다', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      const result = await categoryService.findCategoryBySlug('unknown');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.category.findUnique.mockRejectedValue(new Error('DB error'));

      const result = await categoryService.findCategoryBySlug('react');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findPostsByCategorySlug', () => {
    test('소분류 슬러그면 해당 카테고리 게시물만 페이지네이션으로 반환한다', async () => {
      const mockCategory = {
        id: 'c2',
        slug: 'react',
        name: 'React',
        parentId: 'c1',
        children: [],
      };
      const mockPosts = [{ id: 'p1', slug: 'a', title: 'A', categoryId: 'c2', isHidden: false }];
      prisma.category.findUnique.mockResolvedValue(mockCategory);
      prisma.$transaction.mockResolvedValue([mockPosts, 1]);

      const result = await categoryService.findPostsByCategorySlug('react', { skip: 0, take: 10 });

      expect(result.success).toBe(true);
      expect(result.data?.posts).toEqual(mockPosts);
      expect(result.data?.meta).toEqual({ total: 1, skip: 0, take: 10, hasMore: false });
      expect(result.data?.category).toEqual(mockCategory);
    });

    test('대분류 슬러그면 includeChildren 기본값(true)에 따라 자식 카테고리 게시물도 포함한다', async () => {
      const mockCategory = {
        id: 'c1',
        slug: 'frontend',
        name: '프론트엔드',
        parentId: null,
        children: [{ id: 'c2' }, { id: 'c3' }],
      };
      prisma.category.findUnique.mockResolvedValue(mockCategory);
      prisma.$transaction.mockResolvedValue([[], 0]);

      await categoryService.findPostsByCategorySlug('frontend');

      expect(prisma.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { categoryId: { in: ['c1', 'c2', 'c3'] }, isHidden: false },
        }),
      );
      expect(prisma.post.count).toHaveBeenCalledWith({
        where: { categoryId: { in: ['c1', 'c2', 'c3'] }, isHidden: false },
      });
    });

    test('카테고리가 없으면 404 응답을 반환한다', async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      const result = await categoryService.findPostsByCategorySlug('unknown');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('hasMore 플래그는 skip + posts.length < total 일 때 true', async () => {
      const mockCategory = {
        id: 'c2',
        slug: 'react',
        name: 'React',
        parentId: 'c1',
        children: [],
      };
      const mockPosts = Array.from({ length: 10 }, (_, i) => ({ id: `p${i}`, slug: `s${i}` }));
      prisma.category.findUnique.mockResolvedValue(mockCategory);
      prisma.$transaction.mockResolvedValue([mockPosts, 25]);

      const result = await categoryService.findPostsByCategorySlug('react', { skip: 0, take: 10 });

      expect(result.data?.meta.hasMore).toBe(true);
      expect(result.data?.meta.total).toBe(25);
    });
  });
});
