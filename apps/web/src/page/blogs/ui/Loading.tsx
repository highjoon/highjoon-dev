import React from 'react';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

export default function Loading() {
  return (
    <div className="relative mb-5 flex w-full flex-col">
      {/* 제목 스켈레톤 */}
      <Skeleton className="mb-10 h-12 w-4/5 sm:mb-8 md:mb-10" />

      {/* 조회수 스켈레톤 */}
      <div className="mb-5 flex items-center gap-4 sm:mb-2.5 md:mb-5">
        <Skeleton className="h-5 w-24" />
      </div>

      {/* 배너 이미지 스켈레톤 */}
      <div className="relative mb-5 w-full">
        <Skeleton className="h-[200px] w-full sm:h-[300px] md:h-[500px]" />
      </div>

      {/* 콘텐츠 스켈레톤 */}
      <div id="page-content" className="mt-5 flex flex-col">
        {/* 여러 줄의 콘텐츠 스켈레톤 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className={`mb-4 ${index % 3 === 0 ? 'h-6 w-[90%]' : 'h-4 w-full'}`} />
        ))}
      </div>

      {/* 좋아요 및 댓글 섹션 스켈레톤 */}
      <div className="mb-5 mt-5 flex items-center justify-center gap-4">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
}
