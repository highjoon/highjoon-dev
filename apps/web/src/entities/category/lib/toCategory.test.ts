import { toCategory } from '@/entities/category/lib/toCategory';

describe('toCategory', () => {
  it('title 을 name 으로 바꾸고 createdAt 은 버린다', () => {
    expect(
      toCategory({ id: 'c-1', title: 'React', slug: 'react', parentId: 'c-0', createdAt: '2026-01-01T00:00:00Z' }),
    ).toEqual({ id: 'c-1', slug: 'react', name: 'React', parentId: 'c-0' });
  });

  it('최상위 카테고리는 parentId 가 null 이다', () => {
    expect(
      toCategory({ id: 'c-0', title: 'Frontend', slug: 'frontend', parentId: null, createdAt: '2026-01-01T00:00:00Z' })
        .parentId,
    ).toBeNull();
  });
});
