import Script from 'next/script';
import { type Post } from '@highjoon-dev/prisma';

type Props = {
  post: Post;
};

/**
 * 블로그 포스트를 위한 구조화된 데이터 (JSON-LD)
 * 검색 엔진이 콘텐츠를 더 잘 이해할 수 있도록 도움
 */
export default function BlogPostSchema({ post }: Props) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.bannerImageUrl,
    author: {
      '@type': 'Person',
      name: 'highjoon',
      url: 'https://github.com/highjoon',
    },
    publisher: {
      '@type': 'Organization',
      name: 'highjoon-dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://highjoon-dev.com/images/img-profile.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://highjoon-dev.com/blogs/${post.slug}`,
    },
  };

  // XSS 방지를 위해 HTML 태그 이스케이프
  const sanitizedData = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return (
    <Script id="blog-post-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizedData }} />
  );
}
