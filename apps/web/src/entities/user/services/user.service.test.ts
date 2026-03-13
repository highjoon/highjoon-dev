/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { userService } from './user.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    postLike: {
      findMany: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

const mockUser = {
  id: 'user-1',
  githubId: 12345,
  name: 'Test User',
  avatarUrl: 'avatar.png',
  homeUrl: 'https://example.com',
  role: 'USER',
};

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findOrCreateUser', () => {
    test('기존 사용자가 있으면 해당 사용자를 반환한다', async () => {
      prisma.user.findFirst.mockResolvedValue(mockUser);

      const result = await userService.findOrCreateUser(mockUser as Parameters<typeof userService.findOrCreateUser>[0]);

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    test('기존 사용자가 없으면 새로 생성한다', async () => {
      prisma.user.findFirst.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await userService.findOrCreateUser(mockUser as Parameters<typeof userService.findOrCreateUser>[0]);

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    test('사용자를 찾으면 성공 응답을 반환한다', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.findUserById('user-1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
    });

    test('사용자가 없으면 실패 응답을 반환한다', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.findUserById('not-found');

      expect(result.success).toBe(false);
    });
  });

  describe('findLikedPostsByUserId', () => {
    test('좋아요한 게시물 목록을 반환한다', async () => {
      const likedPosts = [
        { userId: 'user-1', postId: 'post-1' },
        { userId: 'user-1', postId: 'post-2' },
      ];
      prisma.postLike.findMany.mockResolvedValue(likedPosts);

      const result = await userService.findLikedPostsByUserId('user-1');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.postLike.findMany.mockRejectedValue(new Error('DB error'));

      const result = await userService.findLikedPostsByUserId('user-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
