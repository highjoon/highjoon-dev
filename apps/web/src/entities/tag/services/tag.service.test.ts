/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { tagService } from './tag.service';

jest.mock('@highjoon-dev/drizzle', () => {
  type Chain = {
    select: jest.Mock;
    from: jest.Mock;
    leftJoin: jest.Mock;
    where: jest.Mock;
    groupBy: jest.Mock;
    orderBy: jest.Mock;
    limit: jest.Mock;
    insert: jest.Mock;
    values: jest.Mock;
    onConflictDoNothing: jest.Mock;
    update: jest.Mock;
    set: jest.Mock;
    delete: jest.Mock;
    returning: jest.Mock;
  };
  const chain: Chain = {
    select: jest.fn(() => chain),
    from: jest.fn(() => chain),
    leftJoin: jest.fn(() => chain),
    where: jest.fn(() => chain),
    groupBy: jest.fn(() => chain),
    orderBy: jest.fn(),
    limit: jest.fn(),
    insert: jest.fn(() => chain),
    values: jest.fn(() => chain),
    onConflictDoNothing: jest.fn(() => chain),
    update: jest.fn(() => chain),
    set: jest.fn(() => chain),
    delete: jest.fn(() => chain),
    returning: jest.fn(),
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
      const mockTag = { id: '1', name: 'react', createdAt: new Date(), updatedAt: new Date() };
      db.returning.mockResolvedValue([mockTag]);

      const result = await tagService.createTag({ name: '  React  ' });

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.CREATED);
      expect(db.values).toHaveBeenCalledWith({ name: 'react' }); // 정규화된 이름
    });

    test('중복 태그면 400 응답을 반환한다', async () => {
      db.returning.mockResolvedValue([]); // onConflictDoNothing → 빈 배열

      const result = await tagService.createTag({ name: 'react' });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(result.message).toBe('이미 존재하는 태그입니다.');
    });
  });

  describe('updateTag', () => {
    test('태그를 수정한다', async () => {
      const mockTag = { id: '1', name: 'typescript', createdAt: new Date(), updatedAt: new Date() };
      db.returning.mockResolvedValue([mockTag]);

      const result = await tagService.updateTag('1', { name: 'TypeScript' });

      expect(result.success).toBe(true);
      expect(db.set).toHaveBeenCalledWith({ name: 'typescript' });
    });

    test('존재하지 않는 태그면 404 응답을 반환한다', async () => {
      db.returning.mockResolvedValue([]); // 매칭 행 없음

      const result = await tagService.updateTag('999', { name: 'test' });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    test('이름이 중복되면 400 응답을 반환한다', async () => {
      db.returning.mockRejectedValue(Object.assign(new Error('dup'), { code: '23505' }));

      const result = await tagService.updateTag('1', { name: 'react' });

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(result.message).toBe('이미 존재하는 태그입니다.');
    });
  });

  describe('deleteTag', () => {
    test('태그를 삭제하고 204 응답을 반환한다', async () => {
      db.returning.mockResolvedValue([{ id: '1' }]);

      const result = await tagService.deleteTag('1');

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    test('존재하지 않는 태그면 404 응답을 반환한다', async () => {
      db.returning.mockResolvedValue([]); // 삭제된 행 없음

      const result = await tagService.deleteTag('999');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('findOrCreateTag', () => {
    test('새 태그면 생성해서 반환한다', async () => {
      const mockTag = { id: '1', name: 'react', createdAt: new Date(), updatedAt: new Date() };
      db.returning.mockResolvedValue([mockTag]);

      const result = await tagService.findOrCreateTag('  React  ');

      expect(result).toEqual(mockTag);
      expect(db.values).toHaveBeenCalledWith({ name: 'react' }); // 정규화된 이름
      expect(db.onConflictDoNothing).toHaveBeenCalled();
    });

    test('이미 존재하면 수정 없이 기존 태그를 조회해 반환한다', async () => {
      const existing = { id: '1', name: 'react', createdAt: new Date(), updatedAt: new Date() };
      db.returning.mockResolvedValue([]); // onConflictDoNothing → 충돌 시 빈 배열
      db.limit.mockResolvedValue([existing]); // 기존 행 조회

      const result = await tagService.findOrCreateTag('react');

      expect(result).toEqual(existing);
      expect(db.update).not.toHaveBeenCalled(); // 찾기일 땐 update 안 함
    });
  });
});
