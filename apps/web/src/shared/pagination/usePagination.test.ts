import { act, renderHook } from '@testing-library/react';

import { usePagination } from './usePagination';
type UsePaginationProps = Parameters<typeof usePagination>[0];

const createNavMock = () => ({ goTo: jest.fn() });

describe('usePagination', () => {
  test('경계 플래그와 아이템이 올바르게 계산된다', () => {
    const nav = createNavMock();
    const { result, rerender } = renderHook((props: UsePaginationProps) => usePagination(props), {
      initialProps: { current: 1, total: 10, siblingCount: 1, nav },
    });

    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
    expect(result.current.items.length).toBeGreaterThan(0);

    rerender({ current: 10, total: 10, siblingCount: 1, nav });
    expect(result.current.isLast).toBe(true);
  });

  test('첫/마지막 페이지에서 이전/다음 이동은 호출되지 않는다', () => {
    const nav = createNavMock();
    const { result, rerender } = renderHook((props: UsePaginationProps) => usePagination(props), {
      initialProps: { current: 1, total: 3, siblingCount: 1, nav },
    });

    act(() => result.current.goPrev());
    expect(nav.goTo).not.toHaveBeenCalled();

    rerender({ current: 2, total: 3, siblingCount: 1, nav });
    act(() => result.current.goPrev());
    expect(nav.goTo).toHaveBeenCalledWith(1);

    act(() => result.current.goNext());
    expect(nav.goTo).toHaveBeenCalledWith(3);
  });
});
