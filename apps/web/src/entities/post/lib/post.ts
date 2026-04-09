import { type Post } from '@highjoon-dev/prisma';

import { ROUTES } from '@/shared/routes/routes';

/**
 * 게시물 경로 생성
 * @param slug 게시물 슬러그
 * @returns 게시물 경로
 */
export const createPostPath = (slug: Post['slug']) => {
  return ROUTES.BLOGS + `/${slug}`;
};

/**
 * 게시물 페이지당 게시물 수
 */
export const POSTS_PER_PAGE = 9;
