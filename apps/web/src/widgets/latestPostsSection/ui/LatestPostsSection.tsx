import React, { Suspense } from 'react';

import LatestPosts from '@/entities/post/ui/latestPosts/LatestPosts';
import LatestPostsSkeleton from '@/entities/post/ui/latestPosts/LatestPostsSkeleton';

export default function LatestPostsSection() {
  return (
    <Suspense fallback={<LatestPostsSkeleton />}>
      <LatestPosts />
    </Suspense>
  );
}
