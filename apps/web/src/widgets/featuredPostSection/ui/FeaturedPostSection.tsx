import React, { Suspense } from 'react';

import FeaturedPost from '@/entities/post/ui/featuredPost/FeaturedPost';
import FeaturedPostSkeleton from '@/entities/post/ui/featuredPost/FeaturedPostSkeleton';

export default function FeaturedPostSection() {
  return (
    <Suspense fallback={<FeaturedPostSkeleton />}>
      <FeaturedPost />
    </Suspense>
  );
}
