/**
 * 애플리케이션의 모든 라우트 경로를 중앙에서 관리합니다.\
 * FSD 아키텍처의 shared 레이어에 위치하여 여러 feature에서 공유됩니다.
 *
 * @example
 * ```ts
 * import { ROUTES } from '@/shared/routes/routes';
 *
 * // 사용 예시
 * router.push(ROUTES.BLOGS);
 * ```
 */
export const ROUTES = {
  HOME: '/',
  PAGES: '/pages',
  BLOGS: '/blogs',
  TAGS: '/tags',
  ABOUT: '/about',
} as const;

/**
 * ROUTES 객체의 키 타입을 추출합니다.
 */
export type RouteKey = keyof typeof ROUTES;

/**
 * ROUTES 객체의 값 타입을 추출합니다.
 */
export type RouteValue = (typeof ROUTES)[RouteKey];
