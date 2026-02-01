import React, { Suspense } from 'react';

import LatestPosts from '@/entities/post/ui/latestPosts/LatestPosts';
import LatestPostsSkeleton from '@/entities/post/ui/latestPosts/LatestPostsSkeleton';
import ViewAllLink from '@/entities/post/ui/latestPosts/ViewAllLink';

export default function LatestPostsSection() {
  return (
    <section className="flex flex-col w-full" aria-labelledby="latest-posts-title">
      <div className="flex flex-col justify-between gap-2 pb-8 mb-12 border-b sm:gap-0 sm:items-end sm:flex-row border-slate-200 dark:border-slate-800">
        <div className="flex flex-col">
          <div className="flex items-center mb-3 space-x-2 text-xs font-black tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            <div className="w-6 h-[2px] bg-indigo-600 dark:bg-indigo-400" />
            <span>The Journal</span>
          </div>
          <h3 className="text-4xl italic font-black tracking-tighter uppercase md:text-5xl text-slate-900 dark:text-slate-50">
            LATEST POSTS
          </h3>
        </div>

        <ViewAllLink />
      </div>
      <Suspense fallback={<LatestPostsSkeleton />}>
        <LatestPosts />
      </Suspense>
    </section>
  );
}
