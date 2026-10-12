/**
 * @jest-environment node
 */
import { getCategoryPostsApi } from '@/entities/category/api/getCategoryPostsApi';
import { categoryResponses } from '@/entities/category/lib/categoryResponse.fixture';
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

const mockResponses = (posts: unknown) => {
  mockFetchApi.mockImplementation(async (path: string) => (path === '/posts' ? posts : categoryResponses));
};

describe('getCategoryPostsApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('category 쿼리와 page, size 로 게시물을, /categories 로 카테고리를 요청한다', async () => {
    mockResponses({ content: [], page: { size: 6, number: 1, totalElements: 8, totalPages: 2 } });

    await getCategoryPostsApi({ slug: 'react', skip: 6, take: 6 });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { category: 'react', page: 1, size: 6 } });
    expect(mockFetchApi).toHaveBeenCalledWith('/categories');
  });

  it('한글, 공백 slug 는 가공하지 않고 query 로 넘기고 카테고리를 slug 로 찾는다', async () => {
    mockResponses({ content: [], page: { size: 6, number: 0, totalElements: 0, totalPages: 0 } });

    const result = await getCategoryPostsApi({ slug: '프론트 엔드', skip: 0, take: 6 });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { category: '프론트 엔드', page: 0, size: 6 } });
    expect(result?.category).toEqual({ id: 'c-ko', slug: '프론트 엔드', name: '프론트 엔드', parentId: null });
  });

  it('posts, meta, category(name 포함) 를 기존 모양으로 반환한다', async () => {
    mockResponses({
      content: [createPostResponse()],
      page: { size: 6, number: 0, totalElements: 1, totalPages: 1 },
    });

    const result = await getCategoryPostsApi({ slug: 'react', take: 6 });

    expect(result?.posts).toHaveLength(1);
    expect(result?.meta).toEqual({ total: 1, skip: 0, take: 6, hasMore: false });
    expect(result?.category).toEqual({ id: 'c-child', slug: 'react', name: 'React', parentId: 'c-parent' });
  });

  it('게시물이 없는 카테고리는 posts 가 빈 배열이고 total 이 0 이다', async () => {
    mockResponses({ content: [], page: { size: 6, number: 0, totalElements: 0, totalPages: 0 } });

    const result = await getCategoryPostsApi({ slug: 'frontend', take: 6 });

    expect(result?.posts).toEqual([]);
    expect(result?.meta.total).toBe(0);
  });

  it('범위를 벗어난 페이지는 빈 posts 와 실제 total 을 유지한다', async () => {
    mockResponses({ content: [], page: { size: 6, number: 9, totalElements: 8, totalPages: 2 } });

    const result = await getCategoryPostsApi({ slug: 'react', skip: 54, take: 6 });

    expect(result?.posts).toEqual([]);
    expect(result?.meta).toEqual({ total: 8, skip: 54, take: 6, hasMore: false });
  });

  it('백엔드가 카테고리를 404 로 돌려주면 null 이다', async () => {
    mockResponses(null);

    await expect(getCategoryPostsApi({ slug: 'react', take: 6 })).resolves.toBeNull();
  });

  it('목록에 없는 slug 는 null 이다', async () => {
    mockResponses({ content: [], page: { size: 6, number: 0, totalElements: 0, totalPages: 0 } });

    await expect(getCategoryPostsApi({ slug: 'unknown', take: 6 })).resolves.toBeNull();
  });

  it('서버 오류는 삼키지 않고 그대로 던진다', async () => {
    mockFetchApi.mockRejectedValue(new Error('boom'));

    await expect(getCategoryPostsApi({ slug: 'react', take: 6 })).rejects.toThrow('boom');
  });
});
