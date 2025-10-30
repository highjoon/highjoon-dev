import { buildPageItems } from './model/buildPageItems';

describe('buildPageItems', () => {
  test('총 페이지가 0 이하이면 빈 배열을 반환한다', () => {
    expect(buildPageItems(1, 0)).toEqual([]);
  });

  test('페이지 수가 적으면 생략 없이 모든 페이지를 반환한다', () => {
    expect(buildPageItems(2, 3, 1)).toEqual([1, 2, 3]);
  });

  test('가운데 페이지에서는 양쪽에 ellipsis가 들어간다', () => {
    expect(buildPageItems(5, 10, 1)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);
  });

  test('첫 페이지 근처에서는 오른쪽에만 ellipsis가 들어간다', () => {
    expect(buildPageItems(1, 10, 1)).toEqual([1, 2, 'ellipsis', 10]);
  });

  test('마지막 페이지 근처에서는 왼쪽에만 ellipsis가 들어간다', () => {
    expect(buildPageItems(10, 10, 1)).toEqual([1, 'ellipsis', 9, 10]);
  });
});
