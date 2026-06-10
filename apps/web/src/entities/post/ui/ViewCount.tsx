'use client';

import React from 'react';
import { Eye } from 'lucide-react';

import { useIncreaseViewCount } from '@/entities/post/api/increaseViewCountApi/useIncreaseViewCount';
import { type Post } from '@/entities/post/model/types';

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
