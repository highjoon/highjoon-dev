/**
 * @jest-environment node
 */
import { getAdjacentPostsApi } from '@/entities/post/api/getAdjacentPostsApi';
import { getPostApi } from '@/entities/post/api/getPostApi';
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getAdjacentPostsApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('previous, next 를 prev, next 로 변환한다', async () => {
    mockFetchApi.mockResolvedValue({
      post: createPostResponse(),
      previous: { slug: 'older', title: 'Older' },
      next: { slug: 'newer', title: 'Newer' },
    });

    await expect(getAdjacentPostsApi('hello-world')).resolves.toEqual({
      prev: { slug: 'older', title: 'Older' },
      next: { slug: 'newer', title: 'Newer' },
    });
  });

  it('첫 글과 마지막 글은 해당 방향이 null 이다', async () => {
    mockFetchApi.mockResolvedValue({ post: createPostResponse(), previous: null, next: null });

    await expect(getAdjacentPostsApi('hello-world')).resolves.toEqual({ prev: null, next: null });
  });

  it('404 이면 prev, next 모두 null 이다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(getAdjacentPostsApi('hidden')).resolves.toEqual({ prev: null, next: null });
  });

  it('getPostApi 와 같은 인자로 fetchApi 를 호출한다 (fetch 메모이제이션 전제)', async () => {
    mockFetchApi.mockResolvedValue(null);

    await getPostApi({ slug: '한글 slug' });
    await getAdjacentPostsApi('한글 slug');

    expect(mockFetchApi.mock.calls[0]).toEqual(mockFetchApi.mock.calls[1]);
  });
});
