'use client';

import React from 'react';
import Link from 'next/link';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import { createTagPagePath } from '@/entities/tag/lib/tag';

interface Props {
  tag: TagWithCount;
}

export default function TagCard({ tag }: Props) {
  const postCount = tag._count.postTags;

  return (
    <Link href={createTagPagePath(tag.name, 1)}>
      <div className="bg-white border border-vibrant-border-color px-8 py-5 rounded-vibrant-lg shadow-sm hover:shadow-vibrant hover:scale-105 transition-all cursor-pointer flex items-center gap-4">
        <span className="text-xl font-black text-vibrant-text-main">#{tag.name}</span>
        <span className="px-3 py-1 text-xs font-bold text-vibrant-brand rounded-full bg-vibrant-brand-light">
          {postCount} articles
        </span>
      </div>
    </Link>
  );
}
