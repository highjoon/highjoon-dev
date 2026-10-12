/**
 * @jest-environment node
 */
import { revalidatePath } from 'next/cache';

import { increaseViewCountAction } from '@/entities/post/api/increaseViewCountApi/increaseViewCountAction';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));
jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);
const mockRevalidatePath = jest.mocked(revalidatePath);

describe('increaseViewCountAction', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('slug 를 인코딩해 POST /posts/{slug}/views 를 호출한다', async () => {
    mockFetchApi.mockResolvedValue({ viewCount: 8 });

    await increaseViewCountAction({ slug: '한글 slug' });

    expect(mockFetchApi).toHaveBeenCalledWith(`/posts/${encodeURIComponent('한글 slug')}/views`, { method: 'POST' });
  });

  it('호출 후 기존과 같은 네 경로를 revalidate 한다', async () => {
    mockFetchApi.mockResolvedValue({ viewCount: 8 });

    await increaseViewCountAction({ slug: 'hello-world' });

    expect(mockRevalidatePath.mock.calls).toEqual([
      ['/blogs/hello-world'],
      ['/'],
      ['/pages/[id]', 'page'],
      ['/tags/[name]/[page]', 'page'],
    ]);
  });

  it('백엔드 오류가 나도 throw 하지 않고 revalidate 는 수행한다 (기존 동작 유지)', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchApi.mockRejectedValue(new Error('boom'));

    await expect(increaseViewCountAction({ slug: 'hello-world' })).resolves.toBeUndefined();
    expect(mockRevalidatePath).toHaveBeenCalledTimes(4);
  });

  it('404 로 null 이 와도 throw 하지 않는다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(increaseViewCountAction({ slug: 'hidden' })).resolves.toBeUndefined();
  });
});
