import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Button, Flex } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';

import FeaturedPost from '@/components/featuredPost/FeaturedPost';
import FeaturedPostErrorFallback from '@/components/featuredPost/FeaturedPostErrorFallback';
import FeaturedPostSkeleton from '@/components/featuredPost/FeaturedPostSkeleton';
import LatestPosts from '@/components/latestPosts/LatestPosts';
import LatestPostsErrorFallback from '@/components/latestPosts/LatestPostsErrorFallback';
import LatestPostsSkeleton from '@/components/latestPosts/LatestPostsSkeleton';
import HomePageSchema from '@/components/structuredData/HomePageSchema';
import { ROUTES } from '@/shared/routes';

export const metadata: Metadata = {
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
};

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      <Flex direction="column" gap={100}>
        <Flex direction="column" gap={30}>
          <ErrorBoundary fallback={<FeaturedPostErrorFallback />}>
            <Suspense fallback={<FeaturedPostSkeleton />}>
              <FeaturedPost />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<LatestPostsErrorFallback />}>
            <Suspense fallback={<LatestPostsSkeleton />}>
              <LatestPosts />
            </Suspense>
          </ErrorBoundary>
        </Flex>
        <Link href={`${ROUTES.PAGES}/1`} style={{ margin: '0 auto' }}>
          <Button variant="default">게시물 전체 보기</Button>
        </Link>
      </Flex>
    </>
  );
}
