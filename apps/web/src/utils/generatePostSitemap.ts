import { type Post } from '@highjoon-dev/prisma';

/**
 * 블로그 포스트를 위한 사이트맵 데이터 생성
 * SEO 최적화를 위해 각 포스트의 메타데이터를 포함
 */
export default function generatePostSitemap(posts: Post[], baseUrl: string) {
  return posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    // 추가 메타데이터
    title: post.title,
    description: post.description,
    category: post.category,
    isFeatured: post.isFeatured,
  }));
}
