import { type Post } from '@highjoon-dev/prisma';

import { ROUTES } from '@/shared/routes/routes';

/**
 * 게시물을 발행일 기준으로 내림차순 정렬
 *
 * @param posts 정렬할 게시물 배열
 * @returns 발행일 기준 내림차순으로 정렬된 게시물 배열
 *
 * @example
 * ```typescript
 * const posts = [
 *   { title: 'Post 1', publishedAt: '2023-01-01' },
 *   { title: 'Post 2', publishedAt: '2023-01-03' },
 *   { title: 'Post 3', publishedAt: '2023-01-02' }
 * ];
 *
 * const sorted = sortPostsByDate(posts);
 * // 결과: [Post 2, Post 3, Post 1] (최신순)
 * ```
 */
export const sortPostsByDate = (posts: Post[]): Post[] => {
  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
};

/**
 * 게시물 배열을 3개씩 그룹으로 분할
 *
 * @param posts 그룹으로 나눌 게시물 배열
 * @returns 3개씩 나뉜 게시물 그룹 배열
 *
 * @example
 * ```typescript
 * const posts = [post1, post2, post3, post4, post5];
 * const groups = chunkPostsIntoGroups(posts);
 * // 결과: [[post1, post2, post3], [post4, post5]]
 * ```
 */
export const chunkPostsIntoGroups = (posts: Post[]) => {
  const result = [];

  for (let index = 0; index < posts.length; index += 3) {
    const tempArray = posts.slice(index, index + 3);
    result.push(tempArray);
  }

  return result;
};

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
