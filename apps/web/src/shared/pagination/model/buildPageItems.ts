export type PaginationItem = number | 'ellipsis';

/**
 * 페이지 리스트 계산
 */
export const buildPageItems = (current: number, total: number, siblingCount: number = 1): PaginationItem[] => {
  const items: PaginationItem[] = [];

  if (total <= 0) return items;

  const normalizedCurrent = Math.min(Math.max(current, 1), total);
  const left = Math.max(normalizedCurrent - siblingCount, 1);
  const right = Math.min(normalizedCurrent + siblingCount, total);

  if (left > 1) items.push(1);
  if (left > 2) items.push('ellipsis');

  for (let p = left; p <= right; p += 1) {
    items.push(p);
  }

  if (right < total - 1) items.push('ellipsis');
  if (right < total) items.push(total);

  return items;
};
