/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { postTagService } from './postTag.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
    },
    postTag: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('postTagService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findPostsByTag', () => {
    test('태그별 게시물을 조회한다', async () => {
      const mockPosts = [
        { id: '1', title: 'Post 1', postTags: [{ tag: { id: 't1', name: 'react' } }] },
        { id: '2', title: 'Post 2', postTags: [{ tag: { id: 't1', name: 'react' } }] },
      ];
      prisma.post.findMany.mockResolvedValue(mockPosts);

      const result = await postTagService.findPostsByTag('t1', { skip: 0, take: 10 });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPosts);
      expect(prisma.post.findMany).toHaveBeenCalledWith({
        where: { postTags: { some: { tagId: 't1' } } },
        orderBy: { publishedAt: 'desc' },
        skip: 0,
        take: 10,
        include: { postTags: { include: { tag: true } } },
      });
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.post.findMany.mockRejectedValue(new Error('DB error'));

      const result = await postTagService.findPostsByTag('t1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findTagsByPost', () => {
    test('게시물의 태그를 조회한다', async () => {
      const mockPostTags = [{ tag: { id: 't1', name: 'react' } }, { tag: { id: 't2', name: 'typescript' } }];
      prisma.postTag.findMany.mockResolvedValue(mockPostTags);

      const result = await postTagService.findTagsByPost('p1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual([
        { id: 't1', name: 'react' },
        { id: 't2', name: 'typescript' },
      ]);
    });
  });
});
