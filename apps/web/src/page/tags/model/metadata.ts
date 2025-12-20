import { Metadata } from 'next';

export const generateTagsMetadata = (): Metadata => {
  return {
    title: 'Tags | highjoon-dev',
    description: `highjoon's dev-log 태그 모아보기`,
    keywords: ['태그', 'tags', 'highjoon-dev'],
    openGraph: {
      title: 'Tags | highjoon-dev',
      description: `highjoon's dev-log 태그 모아보기`,
      type: 'website',
      url: 'https://highjoon-dev.com/tags',
    },
    alternates: {
      canonical: 'https://highjoon-dev.com/tags',
    },
  };
};

interface TagDetailParams {
  params: { name: string; page: string };
}

export const generateTagDetailMetadata = ({ params }: TagDetailParams): Metadata => {
  const tagName = decodeURIComponent(params.name);
  const pageNumber = Number(params.page);

  return {
    title: `${tagName} - ${pageNumber}페이지 | highjoon-dev`,
    description: `#${tagName} 태그가 포함된 게시물 목록`,
    keywords: [tagName, 'highjoon-dev', '블로그', '태그'],
    openGraph: {
      title: `${tagName} - ${pageNumber}페이지 | highjoon-dev`,
      description: `#${tagName} 태그가 포함된 게시물 목록`,
      type: 'website',
      url: `https://highjoon-dev.com/tags/${encodeURIComponent(tagName)}/${pageNumber}`,
    },
    alternates: {
      canonical: `https://highjoon-dev.com/tags/${encodeURIComponent(tagName)}/${pageNumber}`,
    },
  };
};
