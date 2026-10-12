/**
 * @jest-environment node
 */
import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

const emptyPosts = { posts: [], meta: { total: 0, skip: 0, take: 10, hasMore: false } };

describe('getAllPostsApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('skip, take 를 page, size 로 변환해 요청한다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 6, number: 2, totalElements: 13, totalPages: 3 } });

    await getAllPostsApi({ skip: 12, take: 6 });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { page: 2, size: 6 } });
  });

  it('limit 이 take 보다 우선한다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 3, number: 0, totalElements: 0, totalPages: 0 } });

    await getAllPostsApi({ limit: 3, take: 6 });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { page: 0, size: 3 } });
  });

  it('인자가 없어도 size 를 10 으로 명시한다 (백엔드 기본값 20 과 다름)', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 10, number: 0, totalElements: 0, totalPages: 0 } });

    await getAllPostsApi();

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { page: 0, size: 10 } });
  });

  it('응답을 PostWithTags 목록과 meta 로 변환한다', async () => {
    mockFetchApi.mockResolvedValue({
      content: [createPostResponse()],
      page: { size: 6, number: 0, totalElements: 13, totalPages: 3 },
    });

    const result = await getAllPostsApi({ take: 6 });

    expect(result.posts).toHaveLength(1);
    expect(result.posts[0]).toMatchObject({ slug: 'hello-world', postTags: [{ tagId: 't-1' }, { tagId: 't-2' }] });
    expect(result.meta).toEqual({ total: 13, skip: 0, take: 6, hasMore: true });
  });

  it('빈 목록이면 posts 는 빈 배열이고 total 은 0 이다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 6, number: 0, totalElements: 0, totalPages: 0 } });

    const result = await getAllPostsApi({ take: 6 });

    expect(result).toEqual({ posts: [], meta: { total: 0, skip: 0, take: 6, hasMore: false } });
  });

  it('범위를 벗어난 페이지는 빈 posts 와 실제 total 을 돌려준다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 6, number: 10, totalElements: 13, totalPages: 3 } });

    const result = await getAllPostsApi({ skip: 60, take: 6 });

    expect(result.posts).toEqual([]);
    expect(result.meta).toEqual({ total: 13, skip: 60, take: 6, hasMore: false });
  });

  it('fetchApi 가 throw 하면 빈 목록으로 폴백한다', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchApi.mockRejectedValue(new Error('boom'));

    await expect(getAllPostsApi({ take: 6 })).resolves.toEqual(emptyPosts);
  });

  it('fetchApi 가 null 이면 빈 목록으로 폴백한다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(getAllPostsApi()).resolves.toEqual(emptyPosts);
  });
});
