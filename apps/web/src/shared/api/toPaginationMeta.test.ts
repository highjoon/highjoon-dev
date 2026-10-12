import { toPaginationMeta } from '@/shared/api/toPaginationMeta';

describe('toPaginationMeta', () => {
  it('첫 페이지는 skip 0, hasMore true 로 변환한다', () => {
    expect(toPaginationMeta({ size: 6, number: 0, totalElements: 13, totalPages: 3 })).toEqual({
      total: 13,
      skip: 0,
      take: 6,
      hasMore: true,
    });
  });

  it('마지막 페이지는 hasMore false 이다', () => {
    expect(toPaginationMeta({ size: 6, number: 2, totalElements: 13, totalPages: 3 })).toEqual({
      total: 13,
      skip: 12,
      take: 6,
      hasMore: false,
    });
  });

  it('빈 목록은 total 0, hasMore false 이다', () => {
    expect(toPaginationMeta({ size: 20, number: 0, totalElements: 0, totalPages: 0 })).toEqual({
      total: 0,
      skip: 0,
      take: 20,
      hasMore: false,
    });
  });

  it('범위를 벗어난 페이지도 total 은 유지하고 hasMore 는 false 이다', () => {
    expect(toPaginationMeta({ size: 6, number: 5, totalElements: 13, totalPages: 3 })).toEqual({
      total: 13,
      skip: 30,
      take: 6,
      hasMore: false,
    });
  });
});
