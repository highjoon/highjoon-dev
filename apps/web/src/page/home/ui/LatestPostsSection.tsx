import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import LatestPosts from '@/entities/post/ui/latestPosts/LatestPosts';
import LatestPostsErrorFallback from '@/entities/post/ui/latestPosts/LatestPostsErrorFallback';
import LatestPostsSkeleton from '@/entities/post/ui/latestPosts/LatestPostsSkeleton';

export default function LatestPostsSection() {
  return (
    <ErrorBoundary fallback={<LatestPostsErrorFallback />}>
      <Suspense fallback={<LatestPostsSkeleton />}>
        <LatestPosts />
      </Suspense>
    </ErrorBoundary>
  );
}
