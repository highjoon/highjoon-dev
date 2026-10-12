/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';

import { GET } from './route';

jest.mock('../../../src/entities/post/api/getAllPostsApi');

const mockGetAllPostsApi = jest.mocked(getAllPostsApi);

const result = { posts: [], meta: { total: 0, skip: 0, take: 3, hasMore: false } };

describe('GET /api/post', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('{ data: { posts, meta } } 모양으로 응답한다 (useGetPosts 가 읽는 모양)', async () => {
    mockGetAllPostsApi.mockResolvedValue(result);

    const response = await GET(new NextRequest('http://localhost/api/post'));

    await expect(response.json()).resolves.toEqual({ data: result });
  });

  it('limit 이 take 보다 우선해 getAllPostsApi 의 take 로 넘어간다', async () => {
    mockGetAllPostsApi.mockResolvedValue(result);

    await GET(new NextRequest('http://localhost/api/post?skip=6&take=9&limit=3'));

    expect(mockGetAllPostsApi).toHaveBeenCalledWith({ skip: 6, take: 3 });
  });

  it('쿼리가 없으면 skip, take 는 undefined 이다', async () => {
    mockGetAllPostsApi.mockResolvedValue(result);

    await GET(new NextRequest('http://localhost/api/post'));

    expect(mockGetAllPostsApi).toHaveBeenCalledWith({ skip: undefined, take: undefined });
  });
});
