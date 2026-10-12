/**
 * @jest-environment node
 */
import { getCategoryApi } from '@/entities/category/api/getCategoryApi';
import { categoryResponses } from '@/entities/category/lib/categoryResponse.fixture';
import { fetchApi } from '@/shared/api/fetchApi';

jest.mock('../../../../shared/api/fetchApi');

const mockFetchApi = jest.mocked(fetchApi);

describe('getCategoryApi', () => {
  beforeEach(() => {
    mockFetchApi.mockResolvedValue(categoryResponses);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('하위 카테고리는 parentId 로 찾은 parent 를 함께 반환한다', async () => {
    await expect(getCategoryApi('react')).resolves.toEqual({
      id: 'c-child',
      slug: 'react',
      name: 'React',
      parentId: 'c-parent',
      parent: { id: 'c-parent', slug: 'frontend', name: 'Frontend', parentId: null },
    });
  });

  it('최상위 카테고리는 parent 가 null 이다', async () => {
    await expect(getCategoryApi('frontend')).resolves.toMatchObject({ name: 'Frontend', parent: null });
  });

  it('한글, 공백 slug 도 정확히 일치하면 찾는다', async () => {
    await expect(getCategoryApi('프론트 엔드')).resolves.toMatchObject({ id: 'c-ko' });
  });

  it('없는 slug 는 null 이다', async () => {
    await expect(getCategoryApi('unknown')).resolves.toBeNull();
  });

  it('카테고리 목록 응답이 null 이면 null 이다', async () => {
    mockFetchApi.mockResolvedValue(null);

    await expect(getCategoryApi('react')).resolves.toBeNull();
  });
});
