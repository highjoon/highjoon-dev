/**
 * @jest-environment node
 */
import { ApiError, fetchApi } from '@/shared/api/fetchApi';

const mockResponse = (status: number, body?: unknown) =>
  jest
    .spyOn(globalThis, 'fetch')
    .mockImplementation(
      async () =>
        new Response(typeof body === 'string' ? body : body === undefined ? null : JSON.stringify(body), { status }),
    );

describe('fetchApi', () => {
  const originalBaseUrl = process.env.API_BASE_URL;

  beforeEach(() => {
    process.env.API_BASE_URL = 'http://api.test';
  });

  afterEach(() => {
    process.env.API_BASE_URL = originalBaseUrl;
    jest.restoreAllMocks();
  });

  it('API_BASE_URL 과 /api/v1 을 붙여 GET 요청하고 ApiResult.data 를 반환한다', async () => {
    const fetchSpy = mockResponse(200, { success: true, data: { id: 1 }, timestamp: '2026-10-12T00:00:00Z' });

    const result = await fetchApi<{ id: number }>('/posts/hello');

    expect(result).toEqual({ id: 1 });
    expect(fetchSpy).toHaveBeenCalledWith('http://api.test/api/v1/posts/hello', { method: 'GET' });
  });

  it('query 를 붙이고 undefined 값은 제외한다', async () => {
    const fetchSpy = mockResponse(200, { success: true, data: [], timestamp: '' });

    await fetchApi('/posts', { query: { page: 0, size: 6, tag: undefined } });

    expect(fetchSpy).toHaveBeenCalledWith('http://api.test/api/v1/posts?page=0&size=6', { method: 'GET' });
  });

  it('한글, 공백, + 가 든 query 값을 encodeURIComponent 로 인코딩한다', async () => {
    const fetchSpy = mockResponse(200, { success: true, data: [], timestamp: '' });

    await fetchApi('/posts', { query: { category: '프론트 엔드', tag: 'c++' } });

    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toBe(`http://api.test/api/v1/posts?category=${encodeURIComponent('프론트 엔드')}&tag=c%2B%2B`);
    expect(url).toContain('%20');
    expect(url).not.toContain('+');
  });

  it('POST 메서드를 전달한다', async () => {
    const fetchSpy = mockResponse(200, { success: true, data: { viewCount: 3 }, timestamp: '' });

    const result = await fetchApi<{ viewCount: number }>('/posts/hello/views', { method: 'POST' });

    expect(result).toEqual({ viewCount: 3 });
    expect(fetchSpy).toHaveBeenCalledWith('http://api.test/api/v1/posts/hello/views', { method: 'POST' });
  });

  it('404 는 null 을 반환한다', async () => {
    mockResponse(404, {
      success: false,
      error: { code: 'POST_NOT_FOUND', message: '게시물을 찾을 수 없습니다: x', details: [] },
      timestamp: '',
    });

    await expect(fetchApi('/posts/x')).resolves.toBeNull();
  });

  it('5xx 는 status 와 code 를 담은 ApiError 를 던진다', async () => {
    mockResponse(500, {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다', details: [] },
      timestamp: '',
    });

    const error = await fetchApi('/posts').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 500, code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다' });
  });

  it('JSON 이 아닌 5xx 응답도 code 가 null 인 ApiError 를 던진다', async () => {
    mockResponse(502, '<html>Bad Gateway</html>');

    const error = await fetchApi('/posts').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 502, code: null });
  });
});
