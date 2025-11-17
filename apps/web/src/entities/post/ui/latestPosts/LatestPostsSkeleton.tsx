import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@highjoon-dev/ui/components/Card';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

export default function LatestPostsSkeleton() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="latest-posts-title">
      <h2 id="latest-posts-title" className="text-xl font-semibold md:text-2xl">
        Latest Posts
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="h-full">
            <Card className="grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0">
              <div className="w-full overflow-hidden aspect-video">
                <Skeleton className="w-full h-full" />
              </div>
              <CardHeader>
                <Skeleton className="w-3/4 h-6 md:h-7" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4 mt-2" />
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-4" />
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
