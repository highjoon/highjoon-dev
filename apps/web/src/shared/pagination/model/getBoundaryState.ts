/**
 * 첫 페이지인지, 마지막 페이지인지 확인
 * @param current - 현재 페이지
 * @param total - 총 페이지 수
 * @returns - 첫 페이지인지, 마지막 페이지인지
 */
export const getBoundaryState = (current: number, total: number) => {
  const isFirst = current <= 1 || total <= 0;
  const isLast = current >= total || total <= 0;
  return { isFirst, isLast };
};
