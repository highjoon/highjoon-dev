/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { postLikeService } from './postLike.service';

jest.mock('@highjoon-dev/prisma', () => {
  const mockPrismaClientKnownRequestError = class PrismaClientKnownRequestError extends Error {
    code: string;
    constructor(message: string, { code }: { code: string }) {
      super(message);
      this.code = code;
    }
  };

  return {
    prisma: {
      postLike: {
        count: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
      post: {
        update: jest.fn(),
      },
      $transaction: jest.fn(),
    },
    Prisma: {
      PrismaClientKnownRequestError: mockPrismaClientKnownRequestError,
    },
  };
});

const { prisma, Prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('postLikeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('likePost', () => {
    test('좋아요를 추가한다', async () => {
      prisma.postLike.count.mockResolvedValue(0);
      prisma.$transaction.mockResolvedValue([{}, {}]);

      const result = await postLikeService.likePost('user-1', 'post-1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('게시물에 좋아요가 추가되었습니다.');
    });

    test('이미 좋아요를 눌렀으면 400 응답을 반환한다', async () => {
      prisma.postLike.count.mockResolvedValue(1);

      const result = await postLikeService.likePost('user-1', 'post-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    test('P2002 에러 시 중복 좋아요 응답을 반환한다', async () => {
      prisma.postLike.count.mockResolvedValue(0);
      prisma.$transaction.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Unique', { code: 'P2002' }));

      const result = await postLikeService.likePost('user-1', 'post-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe('unlikePost', () => {
    test('좋아요를 취소한다', async () => {
      prisma.postLike.count.mockResolvedValue(1);
      prisma.$transaction.mockResolvedValue([{}, {}]);

      const result = await postLikeService.unlikePost('user-1', 'post-1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('게시물의 좋아요가 취소되었습니다.');
    });

    test('좋아요를 누르지 않았으면 400 응답을 반환한다', async () => {
      prisma.postLike.count.mockResolvedValue(0);

      const result = await postLikeService.unlikePost('user-1', 'post-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    test('P2025 에러 시 좋아요 없음 응답을 반환한다', async () => {
      prisma.postLike.count.mockResolvedValue(1);
      prisma.$transaction.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025' }));

      const result = await postLikeService.unlikePost('user-1', 'post-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});
