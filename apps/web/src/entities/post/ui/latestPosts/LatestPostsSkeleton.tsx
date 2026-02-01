import React from 'react';

import PostCardSkeleton from '@/entities/post/ui/PostCardSkeleton';

export default function LatestPostsSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </ul>
  );
}
