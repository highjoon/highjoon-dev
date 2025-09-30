import { type Metadata } from 'next';

import AboutPage from '@/page/about/ui/AboutPage';

export const metadata: Metadata = {
  title: 'About | highjoon-dev',
  description: 'About highjoon',
  keywords: ['프론트엔드', 'React', 'Next.js', 'TypeScript', 'highjoon'],
  openGraph: {
    title: 'About | highjoon-dev',
    description: 'About highjoon',
    type: 'website',
    url: 'https://highjoon-dev.com/about',
  },
  alternates: {
    canonical: 'https://highjoon-dev.com/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
