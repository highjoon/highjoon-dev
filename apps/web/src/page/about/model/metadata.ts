import { type Metadata } from 'next';

export const generateAboutMetadata = (): Metadata => {
  return {
    title: 'About | highjoon-dev',
    description: '프론트엔드 개발자 highjoon 소개',
    keywords: ['프론트엔드', 'React', 'Next.js', 'TypeScript', 'highjoon', '윤상준'],
    openGraph: {
      title: 'About | highjoon-dev',
      description: '프론트엔드 개발자 highjoon 소개',
      type: 'website',
      url: 'https://highjoon-dev.com/about',
    },
    alternates: {
      canonical: 'https://highjoon-dev.com/about',
    },
  };
};
