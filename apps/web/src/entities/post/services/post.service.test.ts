/**
 * @jest-environment node
 */
import { type Post } from '@highjoon-dev/prisma';
import { StatusCodes } from 'http-status-codes';

import { postService } from './post.service';

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      createManyAndReturn: jest.fn(),
    },
    postTag: {
      createMany: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      code: string;
      constructor(message: string, { code }: { code: string }) {
        super(message);
        this.code = code;
      }
    },
  },
}));

jest.mock('./postViewLog.service', () => ({
  postViewLogService: {
    logView: jest.fn(),
  },
}));

jest.mock('./postViewStats.service', () => ({
  postViewStatsService: {
    findOrCreateTodayStats: jest.fn(),
  },
}));

jest.mock('../../tag/services/postTag.service', () => ({
  postTagService: {
    syncPostTags: jest.fn(),
  },
}));

jest.mock('../../tag/services/tag.service', () => ({
  tagService: {
    findOrCreateTags: jest.fn(),
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');
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
  category: null,
  viewCount: 10,
  likeCount: 5,
  isFeatured: false,
  isHidden: false,
  postTags: [],
} satisfies Post & { postTags: never[] };

describe('postService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllPosts', () => {
    test('게시물 목록을 페이지네이션으로 조회한다', async () => {
      prisma.$transaction.mockResolvedValue([[mockPost], 1]);

      const result = await postService.findAllPosts({ skip: 0, take: 10 });

      expect(result.success).toBe(true);
      expect(result.data?.posts).toHaveLength(1);
      expect(result.data?.meta).toEqual({ total: 1, skip: 0, take: 10, hasMore: false });
    });

    test('게시물이 없으면 404 응답을 반환한다', async () => {
      prisma.$transaction.mockResolvedValue([[], 0]);

      const result = await postService.findAllPosts({ skip: 0, take: 10 });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.$transaction.mockRejectedValue(new Error('DB error'));

      const result = await postService.findAllPosts();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findPost', () => {
    test('slug로 게시물을 조회한다', async () => {
      prisma.post.findUnique.mockResolvedValue(mockPost);

      const result = await postService.findPost('test-post');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPost);
    });

    test('게시물이 없으면 404 응답을 반환한다', async () => {
      prisma.post.findUnique.mockResolvedValue(null);

      const result = await postService.findPost('not-found');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('숨겨진 게시물이면 404 응답을 반환한다', async () => {
      prisma.post.findUnique.mockResolvedValue({ ...mockPost, isHidden: true });

      const result = await postService.findPost('hidden-post');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('findFeaturedPost', () => {
    test('추천 게시물을 조회한다', async () => {
      const featured = { ...mockPost, isFeatured: true };
      prisma.post.findFirst.mockResolvedValue(featured);

      const result = await postService.findFeaturedPost();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(featured);
    });

    test('추천 게시물이 없으면 404 응답을 반환한다', async () => {
      prisma.post.findFirst.mockResolvedValue(null);

      const result = await postService.findFeaturedPost();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('increaseViewCount', () => {
    test('첫 조회 시 조회수를 증가시킨다', async () => {
      prisma.post.findUnique.mockResolvedValue(mockPost);
      postViewLogService.logView.mockResolvedValue(true);
      prisma.post.update.mockResolvedValue({ ...mockPost, viewCount: 11 });
      postViewStatsService.findOrCreateTodayStats.mockResolvedValue({});

      const result = await postService.increaseViewCount('test-post', '127.0.0.1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('조회수가 증가되었습니다.');
    });

    test('같은 날 재조회 시 조회수를 증가시키지 않는다', async () => {
      prisma.post.findUnique.mockResolvedValue(mockPost);
      postViewLogService.logView.mockResolvedValue(false);

      const result = await postService.increaseViewCount('test-post', '127.0.0.1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('오늘 이미 조회된 게시물입니다.');
      expect(prisma.post.update).not.toHaveBeenCalled();
    });

    test('존재하지 않는 게시물이면 404 응답을 반환한다', async () => {
      prisma.post.findUnique.mockResolvedValue(null);

      const result = await postService.increaseViewCount('not-found', '127.0.0.1');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('createManyPosts', () => {
    test('여러 게시물을 생성한다', async () => {
      const posts = [mockPost];
      prisma.post.createManyAndReturn.mockResolvedValue(posts);

      const result = await postService.createManyPosts(posts as Post[]);

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
    });
  });
});
