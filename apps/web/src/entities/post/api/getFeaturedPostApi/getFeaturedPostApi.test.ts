/**
 * @jest-environment node
 */
import { getFeaturedPostApi } from '@/entities/post/api/getFeaturedPostApi';
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getFeaturedPostApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('/posts/featured 응답을 변환해 반환한다', async () => {
    mockFetchApi.mockResolvedValue(createPostResponse());

    const result = await getFeaturedPostApi();

    expect(mockFetchApi).toHaveBeenCalledWith('/posts/featured');
    expect(result).toMatchObject({ slug: 'hello-world' });
  });

  it('추천 게시물이 없어 404 이면 null 이다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(getFeaturedPostApi()).resolves.toBeNull();
  });
});
