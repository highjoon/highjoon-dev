import { type Metadata } from 'next';

export const generateHomeMetadata = (): Metadata => ({
  title: 'highjoon-dev',
  description: "highjoon's dev-log",
  keywords: ['highjoon', 'highjoon-dev', 'React', 'Next.js', 'TypeScript'],
  openGraph: {
    title: 'highjoon-dev',
    description: "highjoon's dev-log",
    type: 'website',
    url: 'https://highjoon-dev.com',
    images: ['https://highjoon-dev.com/images/img-profile.png'],
  },
  alternates: {
    canonical: 'https://highjoon-dev.com',
  },
});
