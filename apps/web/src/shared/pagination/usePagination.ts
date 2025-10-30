import { useCallback, useMemo } from 'react';

import { buildPageItems } from './model/buildPageItems';
import { getBoundaryState } from './model/getBoundaryState';
import type { NavigationPort } from './model/navigation.port';

type Params = {
  current: number;
  total: number;
  siblingCount?: number;
  nav: NavigationPort;
};

/**
 * 페이지네이션 커스텀 훅
 * @param current - 현재 페이지
 * @param total - 총 페이지 수
 * @param siblingCount - 썸프리 카운트
 * @param nav - 페이지 이동 포트
 * @returns - 페이지네이션 상태
 */
export const usePagination = ({ current, total, siblingCount = 1, nav }: Params) => {
  const items = useMemo(() => buildPageItems(current, total, siblingCount), [current, total, siblingCount]);
  const { isFirst, isLast } = useMemo(() => getBoundaryState(current, total), [current, total]);

  const goTo = useCallback((page: number) => nav.goTo(page), [nav]);
  const goPrev = useCallback(() => {
    if (!isFirst) nav.goTo(current - 1);
  }, [isFirst, current, nav]);
  const goNext = useCallback(() => {
    if (!isLast) nav.goTo(current + 1);
  }, [isLast, current, nav]);

  return { items, isFirst, isLast, goPrev, goNext, goTo } as const;
};
