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
});
