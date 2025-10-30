import React from 'react';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

export default function Loading() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center gap-16">
        <div className="grid w-full gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="order-last w-full sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2">
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                <div className="space-y-4 sm:col-span-5">
                  <div className="flex flex-wrap gap-3 md:gap-5 lg:gap-6">
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                  <Skeleton className="w-3/4 h-7" />
                  <div className="space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-5/6 h-4" />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>

                <div className="order-first sm:order-last sm:col-span-5">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full gap-2 mt-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-9" />
          ))}
        </div>
      </div>
    </section>
  );
}
