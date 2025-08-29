import { Suspense } from 'react';
import Link from 'next/link';
import { Button, Flex } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';

import FeaturedPost from '@/components/featuredPost/FeaturedPost';
import FeaturedPostErrorFallback from '@/components/featuredPost/FeaturedPostErrorFallback';
import FeaturedPostSkeleton from '@/components/featuredPost/FeaturedPostSkeleton';
import LatestPosts from '@/components/latestPosts/LatestPosts';
import LatestPostsErrorFallback from '@/components/latestPosts/LatestPostsErrorFallback';
import LatestPostsSkeleton from '@/components/latestPosts/LatestPostsSkeleton';
import { ROUTES } from '@/constants/routes';

export default function HomePage() {
  return (
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
  );
}
