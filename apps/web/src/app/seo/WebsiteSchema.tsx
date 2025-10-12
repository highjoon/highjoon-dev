import Script from 'next/script';

/**
 * 웹사이트 전체를 위한 구조화된 데이터 (JSON-LD)
 * 검색 엔진이 웹사이트의 전반적인 정보를 이해할 수 있도록 도움
 */
export default function WebsiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://highjoon-dev.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // XSS 방지를 위해 HTML 태그 이스케이프
  const sanitizedData = JSON.stringify(structuredData).replace(/</g, '\\u003c');

  return <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizedData }} />;
}
