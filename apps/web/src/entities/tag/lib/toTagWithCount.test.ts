import { toTagWithCount } from '@/entities/tag/lib/toTagWithCount';

describe('toTagWithCount', () => {
  it('id, name, postCount 만 남긴다', () => {
    expect(toTagWithCount({ id: 't-1', name: 'next', postCount: 4, createdAt: '2026-01-01T00:00:00Z' })).toEqual({
      id: 't-1',
      name: 'next',
      postCount: 4,
    });
  });
});
