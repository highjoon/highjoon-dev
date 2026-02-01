'use client';

import React from 'react';
import { type Post } from '@highjoon-dev/prisma';
import { Eye } from 'lucide-react';

import { useIncreaseViewCount } from '@/entities/post/api/increaseViewCountApi/useIncreaseViewCount';

interface Props {
  slug: Post['slug'];
  viewCount: Post['viewCount'];
}

export default function ViewCount({ viewCount, slug }: Props) {
  useIncreaseViewCount({ slug });

  return (
    <div className="flex items-center gap-2.5 text-sm font-bold text-vibrant-text-muted">
      <Eye className="size-5" />
      <span>{viewCount?.toLocaleString()}</span>
    </div>
  );
}
