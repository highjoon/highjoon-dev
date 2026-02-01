import { NavigationPort } from './navigation.port';

/**
 * Next.js 라우터 어댑터 (페이지 이동 함수)
 * @param push - 페이지 이동 함수
 * @param basePath - 기본 경로
 * @returns - 페이지 이동 포트
 */
export function createNextRouterAdapter(push: (href: string) => void, basePath: string): NavigationPort {
  return {
    goTo(page: number) {
      push(`${basePath}/${page}`);
    },
  };
}

/**
 * Next.js 라우터 어댑터 (쿼리 파라미터 방식)
 * @param push - 페이지 이동 함수
 * @param basePath - 기본 경로
 * @returns - 페이지 이동 포트
 */
export function createNextRouterAdapterWithSearchParams(
  push: (href: string) => void,
  basePath: string,
): NavigationPort {
  return {
    goTo(page: number) {
      push(`${basePath}?page=${page}`);
    },
  };
}
