import Script from 'next/script';

/**
 * 홈페이지를 위한 구조화된 데이터 (JSON-LD)
 * 검색 엔진이 홈페이지의 구조와 콘텐츠를 이해할 수 있도록 도움
 */
export default function HomePageSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'highjoon-dev',
    description: "highjoon's dev-log",
    url: 'https://highjoon-dev.com',
    mainEntity: {
      '@type': 'WebSite',
      name: 'highjoon-dev',
      description: "highjoon's dev-log",
      url: 'https://highjoon-dev.com',
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
      inLanguage: 'ko',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: 'https://highjoon-dev.com',
        },
      ],
    },
  };

  return (
    <Script
      id="homepage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
