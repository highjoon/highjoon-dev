/**
 * @jest-environment node
 */
import { getPostApi } from '@/entities/post/api/getPostApi';
import { createPostResponse } from '@/entities/post/lib/postResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getPostApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('slug 를 encodeURIComponent 로 인코딩해 요청한다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await getPostApi({ slug: '한글 slug/with space' });

    expect(mockFetchApi).toHaveBeenCalledWith(`/posts/${encodeURIComponent('한글 slug/with space')}`);
    expect(mockFetchApi.mock.calls[0][0]).not.toContain(' ');
    expect(mockFetchApi.mock.calls[0][0]).not.toContain('slug/with');
  });

  it('응답의 post 를 PostWithTags 로 변환한다', async () => {
    mockFetchApi.mockResolvedValue({ post: createPostResponse(), previous: null, next: null });

    const result = await getPostApi({ slug: 'hello-world' });

    expect(result).toMatchObject({ slug: 'hello-world', title: 'Hello World', categoryRef: { name: 'React' } });
  });

  it('숨김 게시물이나 없는 slug 는 404 로 null 이 되어 호출부가 notFound 처리한다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(getPostApi({ slug: 'hidden' })).resolves.toBeNull();
  });

  it('서버 오류는 삼키지 않고 그대로 던진다', async () => {
    mockFetchApi.mockRejectedValue(new Error('boom'));

    await expect(getPostApi({ slug: 'hello-world' })).rejects.toThrow('boom');
  });
});
