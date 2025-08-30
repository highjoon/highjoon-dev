import { type MetadataRoute } from 'next';

import { getPostList } from '@/apis/post';
import { POSTS_PER_PAGE } from '@/constants/post';
import { ROUTES } from '@/constants/routes';

/**
 * 동적 sitemap 생성
 * 모든 블로그 포스트와 페이지를 포함하여 SEO 최적화
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://highjoon-dev.com';
  const currentDate = new Date();

  // 기본 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}${ROUTES.ABOUT}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  try {
    // 블로그 포스트 목록 가져오기
    const postListResponse = await getPostList();
    const posts = postListResponse.data || [];

    // 블로그 포스트 URL들
    const blogPostUrls = posts.map((post) => ({
      url: `${baseUrl}${ROUTES.BLOGS}/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || currentDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // 페이지네이션 URL들 계산
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginationUrls = Array.from({ length: totalPages }, (_, index) => ({
      url: `${baseUrl}${ROUTES.PAGES}/${index + 1}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // 모든 URL을 우선순위별로 정렬
    const allUrls = [...staticPages, ...blogPostUrls, ...paginationUrls];

    // 우선순위가 높은 순서대로 정렬 (1.0 -> 0.8 -> 0.7 -> 0.6)
    return allUrls.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  } catch (error) {
    console.error('Sitemap 생성 중 오류 발생:', error);
    // 오류 발생 시 기본 페이지만 반환
    return staticPages;
  }
}
