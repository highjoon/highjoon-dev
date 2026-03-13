/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { commentService } from './comment.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    comment: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

const mockUser = { id: 'user-1', name: 'Test User', avatarUrl: 'avatar.png', homeUrl: 'https://example.com' };

const mockComment = {
  id: 'comment-1',
  postId: 'post-1',
  userId: 'user-1',
  content: '테스트 댓글',
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('commentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    test('댓글을 생성하고 201 응답을 반환한다', async () => {
      prisma.comment.create.mockResolvedValue(mockComment);

      const result = await commentService.createComment(
        mockComment as Parameters<typeof commentService.createComment>[0],
      );

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
      expect(result.data).toEqual(mockComment);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.comment.create.mockRejectedValue(new Error('DB error'));

      const result = await commentService.createComment(
        mockComment as Parameters<typeof commentService.createComment>[0],
      );

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findCommentsByPost', () => {
    test('게시물의 댓글을 조회한다', async () => {
      const commentsFromDB = [{ ...mockComment, user: mockUser }];
      prisma.comment.findMany.mockResolvedValue(commentsFromDB);

      const result = await commentService.findCommentsByPost('post-1');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data![0].depth).toBe(0);
      expect(prisma.comment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { postId: 'post-1', parentId: null } }),
      );
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.comment.findMany.mockRejectedValue(new Error('DB error'));

      const result = await commentService.findCommentsByPost('post-1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('updateComment', () => {
    test('댓글을 수정한다', async () => {
      const updated = { ...mockComment, content: '수정된 댓글' };
      prisma.comment.update.mockResolvedValue(updated);

      const result = await commentService.updateComment('comment-1', '수정된 댓글');

      expect(result.success).toBe(true);
      expect(result.data?.content).toBe('수정된 댓글');
    });
  });

  describe('deleteComment', () => {
    test('댓글을 삭제하고 204 응답을 반환한다', async () => {
      prisma.comment.delete.mockResolvedValue({});

      const result = await commentService.deleteComment('comment-1');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });

  describe('createReply', () => {
    test('대댓글을 생성하고 201 응답을 반환한다', async () => {
      const reply = { ...mockComment, id: 'reply-1', parentId: 'comment-1' };
      prisma.comment.create.mockResolvedValue(reply);

      const result = await commentService.createReply({
        postId: 'post-1',
        userId: 'user-1',
        content: '대댓글',
        parentId: 'comment-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe('findRepliesByComment', () => {
    test('대댓글이 없으면 빈 배열을 반환한다', async () => {
      prisma.comment.findMany.mockResolvedValue([]);

      const result = await commentService.findRepliesByComment('comment-1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    test('대댓글에 depth 정보를 추가한다', async () => {
      const replies = [
        { id: 'reply-1', parentId: 'comment-1', user: mockUser, content: '대댓글1', createdAt: new Date() },
        { id: 'reply-2', parentId: 'reply-1', user: mockUser, content: '대댓글2', createdAt: new Date() },
      ];
      prisma.comment.findMany.mockResolvedValue(replies);

      const result = await commentService.findRepliesByComment('comment-1');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data![0].depth).toBe(1);
      expect(result.data![1].depth).toBe(2);
    });
  });

  describe('updateReply', () => {
    test('대댓글을 수정한다', async () => {
      const updated = { ...mockComment, content: '수정된 대댓글' };
      prisma.comment.update.mockResolvedValue(updated);

      const result = await commentService.updateReply('reply-1', '수정된 대댓글');

      expect(result.success).toBe(true);
      expect(result.data?.content).toBe('수정된 대댓글');
    });
  });

  describe('deleteReply', () => {
    test('대댓글을 삭제하고 204 응답을 반환한다', async () => {
      prisma.comment.delete.mockResolvedValue({});

      const result = await commentService.deleteReply('reply-1');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });
});
