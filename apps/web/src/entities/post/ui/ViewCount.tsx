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
    <div className="flex items-center justify-center gap-2.5">
      <Eye className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{viewCount?.toLocaleString()}</span>
    </div>
  );
}
