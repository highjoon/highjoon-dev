/**
 * @jest-environment node
 */
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { getPostsByTagApi } from '@/entities/tag/api/getPostsByTagApi';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getPostsByTagApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('tagName 과 offset, limit 을 tag, page, size 로 변환해 요청한다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 9, number: 2, totalElements: 20, totalPages: 3 } });

    await getPostsByTagApi({ tagName: 'next', offset: 18, limit: 9 });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { tag: 'next', page: 2, size: 9 } });
  });

  it('offset 과 limit 을 생략하면 0, 9 를 쓴다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 9, number: 0, totalElements: 0, totalPages: 0 } });

    await getPostsByTagApi({ tagName: 'next' });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { tag: 'next', page: 0, size: 9 } });
  });

  it('한글, 공백, + 가 든 태그명은 가공하지 않고 query 로 넘긴다', async () => {
    mockFetchApi.mockResolvedValue({ content: [], page: { size: 9, number: 0, totalElements: 0, totalPages: 0 } });

    await getPostsByTagApi({ tagName: '리액트 c++' });

    expect(mockFetchApi).toHaveBeenCalledWith('/posts', { query: { tag: '리액트 c++', page: 0, size: 9 } });
  });

  it('응답 content 를 PostWithTags 목록으로 변환한다', async () => {
    mockFetchApi.mockResolvedValue({
      content: [createPostResponse()],
      page: { size: 9, number: 0, totalElements: 1, totalPages: 1 },
    });

    const result = await getPostsByTagApi({ tagName: 'next' });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ slug: 'hello-world', categoryRef: { name: 'React' } });
  });

  it('범위를 벗어난 페이지이거나 응답이 null 이면 빈 배열이다', async () => {
    mockFetchApi
      .mockResolvedValueOnce({ content: [], page: { size: 9, number: 9, totalElements: 3, totalPages: 1 } })
      .mockResolvedValueOnce(null);

    await expect(getPostsByTagApi({ tagName: 'next', offset: 81 })).resolves.toEqual([]);
    await expect(getPostsByTagApi({ tagName: 'next' })).resolves.toEqual([]);
  });
});
