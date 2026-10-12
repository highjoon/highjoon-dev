/**
 * @jest-environment node
 */
import { getAllTagsApi } from '@/entities/tag/api/getAllTagsApi';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getAllTagsApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('/tags 응답을 id, name, postCount 로 변환한다', async () => {
    mockFetchApi.mockResolvedValue([
      { id: 't-1', name: 'next', postCount: 4, createdAt: '2026-01-01T00:00:00Z' },
      { id: 't-2', name: '리액트 훅', postCount: 0, createdAt: '2026-01-02T00:00:00Z' },
    ]);

    await expect(getAllTagsApi()).resolves.toEqual([
      { id: 't-1', name: 'next', postCount: 4 },
      { id: 't-2', name: '리액트 훅', postCount: 0 },
    ]);
    expect(mockFetchApi).toHaveBeenCalledWith('/tags');
  });

  it('응답이 null 이거나 빈 배열이면 빈 배열이다', async () => {
    mockFetchApi.mockResolvedValueOnce(null).mockResolvedValueOnce([]);

    await expect(getAllTagsApi()).resolves.toEqual([]);
    await expect(getAllTagsApi()).resolves.toEqual([]);
  });

  it('서버 오류는 삼키지 않고 그대로 던진다', async () => {
    mockFetchApi.mockRejectedValue(new Error('boom'));

    await expect(getAllTagsApi()).rejects.toThrow('boom');
  });
});
