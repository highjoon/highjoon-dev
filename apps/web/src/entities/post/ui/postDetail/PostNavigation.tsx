import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { type AdjacentPosts } from '@/entities/post/api/getPostApi/dto';
import { createPostPath } from '@/entities/post/lib/post';

interface Props {
  adjacentPosts: AdjacentPosts;
}

export default function PostNavigation({ adjacentPosts }: Props) {
  const { prev, next } = adjacentPosts;

  return (
    <nav className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-vibrant-border-color">
      <div>
        {prev ? (
          <Link
            href={createPostPath(prev.slug)}
            className="flex flex-col gap-2 p-4 transition-colors rounded-2xl border border-vibrant-border-color hover:border-vibrant-brand hover:bg-vibrant-brand-light dark:hover:bg-indigo-950 group">
            <span className="flex items-center gap-1 text-xs font-bold text-vibrant-text-muted group-hover:text-vibrant-brand">
              <ChevronLeft size={14} />
              이전글
            </span>
            <p className="text-sm font-semibold leading-snug text-vibrant-text-main line-clamp-2 group-hover:text-vibrant-brand">
              {prev.title}
            </p>
          </Link>
        ) : null}
      </div>

      <div>
        {next ? (
          <Link
            href={createPostPath(next.slug)}
            className="flex flex-col items-end gap-2 p-4 transition-colors rounded-2xl border border-vibrant-border-color hover:border-vibrant-brand hover:bg-vibrant-brand-light dark:hover:bg-indigo-950 group">
            <span className="flex items-center gap-1 text-xs font-bold text-vibrant-text-muted group-hover:text-vibrant-brand">
              다음글
              <ChevronRight size={14} />
            </span>
            <p className="text-sm font-semibold leading-snug text-right text-vibrant-text-main line-clamp-2 group-hover:text-vibrant-brand">
              {next.title}
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
