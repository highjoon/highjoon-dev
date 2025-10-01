import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import FeaturedPost from '@/entities/post/ui/featuredPost/FeaturedPost';
import FeaturedPostErrorFallback from '@/entities/post/ui/featuredPost/FeaturedPostErrorFallback';
import FeaturedPostSkeleton from '@/entities/post/ui/featuredPost/FeaturedPostSkeleton';

export default function FeaturedPostSection() {
  return (
    <ErrorBoundary fallback={<FeaturedPostErrorFallback />}>
      <Suspense fallback={<FeaturedPostSkeleton />}>
        <FeaturedPost />
      </Suspense>
    </ErrorBoundary>
  );
}
