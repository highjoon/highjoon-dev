import { type Metadata } from 'next';

export const generateHomeMetadata = (): Metadata => ({
  title: 'highjoon-dev',
  description: '프론트엔드 개발자 highjoon의 기술 블로그',
  keywords: ['highjoon', 'highjoon-dev', 'React', 'Next.js', 'TypeScript', '프론트엔드', '웹개발'],
  openGraph: {
    title: 'highjoon-dev',
    description: '프론트엔드 개발자 highjoon의 기술 블로그',
    type: 'website',
    url: 'https://highjoon-dev.com',
    images: ['https://highjoon-dev.com/images/img-profile.png'],
  },
  alternates: {
    canonical: 'https://highjoon-dev.com',
  },
});
