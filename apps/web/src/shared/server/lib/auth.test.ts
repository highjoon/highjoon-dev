/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';

import { signToken } from '@/shared/server/lib/jwt';

import { authenticate, verifyCommentAuthor } from './auth';

const TEST_SECRET = 'test-secret-key';

beforeAll(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    comment: {
      findUnique: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('authenticate', () => {
  test('유효한 Bearer 토큰이면 userId를 반환한다', () => {
    const token = signToken({ userId: 'user-1', role: 'USER' });
    const request = new NextRequest('http://localhost', {
      headers: { authorization: `Bearer ${token}` },
    });

    const result = authenticate(request);

    expect(result).toEqual({ userId: 'user-1' });
    expect(result).not.toHaveProperty('error');
  });

  test('Authorization 헤더가 없으면 에러 응답을 반환한다', () => {
    const request = new NextRequest('http://localhost');

    const result = authenticate(request);

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  test('Bearer 접두사가 없으면 에러 응답을 반환한다', () => {
    const request = new NextRequest('http://localhost', {
      headers: { authorization: 'Basic token123' },
    });

    const result = authenticate(request);

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  test('만료되거나 잘못된 토큰이면 에러 응답을 반환한다', () => {
    const request = new NextRequest('http://localhost', {
      headers: { authorization: 'Bearer invalid-token' },
    });

    const result = authenticate(request);

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe('verifyCommentAuthor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('댓글 작성자와 요청 사용자가 같으면 성공을 반환한다', async () => {
    prisma.comment.findUnique.mockResolvedValue({ id: 'comment-1', userId: 'user-1' });

    const result = await verifyCommentAuthor('comment-1', 'user-1');

    expect(result).toEqual({ success: true });
  });

  test('댓글이 존재하지 않으면 404 에러를 반환한다', async () => {
    prisma.comment.findUnique.mockResolvedValue(null);

    const result = await verifyCommentAuthor('comment-999', 'user-1');

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.NOT_FOUND);
  });

  test('작성자가 아니면 403 에러를 반환한다', async () => {
    prisma.comment.findUnique.mockResolvedValue({ id: 'comment-1', userId: 'user-2' });

    const result = await verifyCommentAuthor('comment-1', 'user-1');

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.FORBIDDEN);
  });

  test('commentId가 빈 문자열이면 400 에러를 반환한다', async () => {
    const result = await verifyCommentAuthor('', 'user-1');

    expect(result).toHaveProperty('error');
    expect(result.error!.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
