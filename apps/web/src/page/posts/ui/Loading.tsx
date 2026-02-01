import React from 'react';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

import PostCardSkeleton from '@/entities/post/ui/PostCardSkeleton';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageSection from '@/shared/ui/layout/PageSection';
import PostGrid from '@/shared/ui/layout/PostGrid';

export default function Loading() {
  return (
    <PageSection>
      <PageHeader
        label="Archive"
        title="ALL POSTS"
        description={
          <span className="block w-full h-7 bg-accent animate-pulse rounded-md relative aspect-[4/3] overflow-hidden border-slate-200 dark:border-slate-800" />
        }
      />
      <Skeleton />

      <PostGrid>
        {Array.from({ length: 9 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </PostGrid>
    </PageSection>
  );
}
