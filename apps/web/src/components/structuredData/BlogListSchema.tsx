import Script from 'next/script';
import { type Post } from '@highjoon-dev/prisma';

type Props = {
  posts: Post[];
  pageNumber?: number;
};

/**
 * 블로그 포스트 목록을 위한 구조화된 데이터 (JSON-LD)
 * 검색 엔진이 블로그 목록 페이지를 이해할 수 있도록 도움
 */
export default function BlogListSchema({ posts, pageNumber = 1 }: Props) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageNumber > 1 ? `블로그 포스트 - ${pageNumber}페이지` : '블로그 포스트 목록',
    description: '블로그 포스트 목록',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.bannerImageUrl,
        author: {
          '@type': 'Person',
          name: 'highjoon',
          url: 'https://github.com/highjoon',
        },
        datePublished: post.publishedAt,
        url: `https://highjoon-dev.com/blogs/${post.slug}`,
      },
    })),
  };

  return (
    <Script
      id="blog-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
