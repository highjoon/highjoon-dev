import React from 'react';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

export default function PostCardSkeleton() {
  return (
    <li className="overflow-hidden bg-white border dark:bg-slate-900 group rounded-3xl border-slate-200 dark:border-slate-800">
      <div className="flex flex-col h-full">
        <Skeleton className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 dark:border-slate-800" />
        <div className="flex flex-col flex-1 p-8">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-16 h-6" />
            <div className="flex items-center text-xs font-bold">
              <Skeleton className="w-24 h-4" />
            </div>
          </div>

          <Skeleton className="w-full mb-3 h-7" />

          <ul className="flex flex-wrap gap-2 mb-4">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton
                key={index}
                className="inline-flex items-center w-16 h-5 px-2 py-1 tracking-tight uppercase transition-colors rounded-md"
              />
            ))}
          </ul>

          <Skeleton className="w-full mb-6 h-14" />

          <div className="flex items-center justify-between h-16 pt-6 mt-auto border-t border-slate-200 dark:border-slate-800 group/footer">
            <Skeleton className="w-[73px] h-5" />
            <Skeleton className="flex items-center justify-center w-8 h-8 transition-all duration-300 border rounded-full" />
          </div>
        </div>
      </div>
    </li>
  );
}
