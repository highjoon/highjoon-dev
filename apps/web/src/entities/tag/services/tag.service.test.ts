/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { tagService } from './tag.service';

jest.mock('@highjoon-dev/prisma', () => {
  const mockPrismaClientKnownRequestError = class PrismaClientKnownRequestError extends Error {
    code: string;
    constructor(message: string, { code }: { code: string }) {
      super(message);
      this.code = code;
      this.name = 'PrismaClientKnownRequestError';
    }
  };

  return {
    prisma: {
      tag: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        upsert: jest.fn(),
      },
    },
    Prisma: {
      PrismaClientKnownRequestError: mockPrismaClientKnownRequestError,
    },
  };
});

jest.mock('@highjoon-dev/drizzle', () => {
  type Chain = {
    select: jest.Mock;
    from: jest.Mock;
    leftJoin: jest.Mock;
    where: jest.Mock;
    groupBy: jest.Mock;
    orderBy: jest.Mock;
    limit: jest.Mock;
  };
  const chain: Chain = {
    select: jest.fn(() => chain),
    from: jest.fn(() => chain),
    leftJoin: jest.fn(() => chain),
    where: jest.fn(() => chain),
    groupBy: jest.fn(() => chain),
    orderBy: jest.fn(),
    limit: jest.fn(),
  };
  // schema.tag.id / schema.postTag.tagId 등 어떤 깊이 접근도 객체를 반환하도록
  const deep = (): object => new Proxy({}, { get: () => deep() });
  return {
    db: chain,
    schema: deep(),
    eq: jest.fn(),
    count: jest.fn(),
    asc: jest.fn(),
  };
});

jest.mock('drizzle-orm', () => ({
  eq: jest.fn(),
  count: jest.fn(),
  asc: jest.fn(),
}));

const { prisma, Prisma } = jest.requireMock('@highjoon-dev/prisma');
const { db } = jest.requireMock('@highjoon-dev/drizzle');

describe('tagService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllTags', () => {
    test('모든 태그를 postCount와 함께 조회한다', async () => {
      const mockTags = [
        { id: '1', name: 'react', createdAt: new Date(), updatedAt: new Date(), postCount: 5 },
        { id: '2', name: 'typescript', createdAt: new Date(), updatedAt: new Date(), postCount: 3 },
      ];
      db.orderBy.mockResolvedValue(mockTags);

      const result = await tagService.findAllTags();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockTags);
      // 모든 태그가 나오도록 leftJoin + 태그별 집계를 위해 groupBy 를 쓴다
      expect(db.leftJoin).toHaveBeenCalled();
      expect(db.groupBy).toHaveBeenCalled();
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      db.orderBy.mockRejectedValue(new Error('DB error'));

      const result = await tagService.findAllTags();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findTag', () => {
    test('태그를 찾으면 성공 응답을 반환한다', async () => {
      const mockTag = { id: '1', name: 'react', createdAt: new Date(), updatedAt: new Date() };
      db.limit.mockResolvedValue([mockTag]);

      const result = await tagService.findTag('1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockTag);
    });

    test('태그가 없으면 404 응답을 반환한다', async () => {
      db.limit.mockResolvedValue([]); // 빈 배열 = 미존재

      const result = await tagService.findTag('999');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('createTag', () => {
    test('태그를 생성하고 201 응답을 반환한다', async () => {
      const mockTag = { id: '1', name: 'react' };
      prisma.tag.create.mockResolvedValue(mockTag);

      const result = await tagService.createTag({ name: '  React  ' });

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
      expect(prisma.tag.create).toHaveBeenCalledWith({ data: { name: 'react' } });
    });

    test('중복 태그면 400 응답을 반환한다', async () => {
      prisma.tag.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Unique', { code: 'P2002' }));

      const result = await tagService.createTag({ name: 'react' });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(result.message).toBe('이미 존재하는 태그입니다.');
    });
  });

  describe('updateTag', () => {
    test('태그를 수정한다', async () => {
      const mockTag = { id: '1', name: 'typescript' };
      prisma.tag.update.mockResolvedValue(mockTag);

      const result = await tagService.updateTag('1', { name: 'TypeScript' });

      expect(result.success).toBe(true);
      expect(prisma.tag.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { name: 'typescript' } });
    });

    test('존재하지 않는 태그면 404 응답을 반환한다', async () => {
      prisma.tag.update.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025' }));

      const result = await tagService.updateTag('999', { name: 'test' });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('deleteTag', () => {
    test('태그를 삭제하고 204 응답을 반환한다', async () => {
      prisma.tag.delete.mockResolvedValue({});

      const result = await tagService.deleteTag('1');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    test('존재하지 않는 태그면 404 응답을 반환한다', async () => {
      prisma.tag.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025' }));

      const result = await tagService.deleteTag('999');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('findOrCreateTag', () => {
    test('태그명을 정규화해서 upsert한다', async () => {
      const mockTag = { id: '1', name: 'react' };
      prisma.tag.upsert.mockResolvedValue(mockTag);

      const result = await tagService.findOrCreateTag('  React  ');

      expect(result).toEqual(mockTag);
      expect(prisma.tag.upsert).toHaveBeenCalledWith({
        where: { name: 'react' },
        update: {},
        create: { name: 'react' },
      });
    });
  });
});
