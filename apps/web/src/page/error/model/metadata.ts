import { Metadata } from 'next';

export const generateNotFoundMetadata = (): Metadata => {
  return {
    title: '비밀 장소 | highjoon-dev',
    description: '비밀 장소를 발견하셨군요!',
    robots: 'noindex, nofollow',
    openGraph: {
      title: '비밀 장소 | highjoon-dev',
      description: '비밀 장소를 발견하셨군요!',
      type: 'website',
      url: 'https://highjoon-dev.com/404',
      images: ['https://highjoon-dev.com/images/img-profile.png'],
    },
    alternates: {
      canonical: 'https://highjoon-dev.com/404',
    },
  };
};
