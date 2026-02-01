import React from 'react';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

import PageSection from '@/shared/ui/layout/PageSection';

export default function Loading() {
  return (
    <PageSection as="article" withContainer={false}>
      {/* Header Section */}
      <div className="max-w-4xl px-4 mx-auto md:px-6">
        <div className="mb-12">
          {/* Back to List */}
          <Skeleton className="w-28 h-5 mb-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-14 h-6 rounded-full" />
          </div>

          {/* Title */}
          <Skeleton className="w-full h-12 mb-6 md:h-14" />
          <Skeleton className="w-3/4 h-12 mb-6 md:h-14" />

          {/* Date and Views */}
          <div className="flex items-center gap-6 pb-8 border-b border-vibrant-border-color">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-16 overflow-hidden rounded-3xl">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-12 px-4 mx-auto md:px-6 max-w-7xl lg:flex-row">
        {/* Main Content */}
        <div className="w-full max-w-none lg:w-3/4">
          <div className="mb-20 space-y-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                className={`h-5 ${index % 4 === 0 ? 'w-2/3' : index % 4 === 1 ? 'w-full' : index % 4 === 2 ? 'w-5/6' : 'w-4/5'}`}
              />
            ))}
          </div>

          {/* Interaction Bar */}
          <div className="flex justify-center gap-4 py-8 mb-20 border-y border-vibrant-border-color">
            <Skeleton className="w-24 h-10 rounded-full" />
            <Skeleton className="w-24 h-10 rounded-full" />
          </div>

          {/* Comments Section */}
          <div className="mb-20">
            <Skeleton className="w-40 h-8 mb-8" />
            <Skeleton className="w-full h-32 mb-4 rounded-xl" />
            <Skeleton className="w-full h-24 rounded-xl" />
          </div>
        </div>

        {/* TOC Sidebar - Desktop only */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky space-y-4 top-32">
            <Skeleton className="w-24 h-4 mb-4" />
            <div className="pl-4 space-y-3 border-l border-vibrant-border-color">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className={`h-4 ${index % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
