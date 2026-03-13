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

const { prisma, Prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('tagService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllTags', () => {
    test('모든 태그를 조회한다', async () => {
      const mockTags = [
        { id: '1', name: 'react', _count: { postTags: 5 } },
        { id: '2', name: 'typescript', _count: { postTags: 3 } },
      ];
      prisma.tag.findMany.mockResolvedValue(mockTags);

      const result = await tagService.findAllTags();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockTags);
      expect(prisma.tag.findMany).toHaveBeenCalledWith({
        include: { _count: { select: { postTags: true } } },
        orderBy: { name: 'asc' },
      });
    });

    test('에러 발생 시 500 응답을 반환한다', async () => {
      prisma.tag.findMany.mockRejectedValue(new Error('DB error'));

      const result = await tagService.findAllTags();

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('findTag', () => {
    test('태그를 찾으면 성공 응답을 반환한다', async () => {
      const mockTag = { id: '1', name: 'react' };
      prisma.tag.findUnique.mockResolvedValue(mockTag);

      const result = await tagService.findTag('1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockTag);
    });

    test('태그가 없으면 404 응답을 반환한다', async () => {
      prisma.tag.findUnique.mockResolvedValue(null);

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
