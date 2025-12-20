'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@highjoon-dev/ui/components/Badge';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import { createTagPagePath } from '@/entities/tag/lib/tag';

interface Props {
  tag: TagWithCount;
}

export default function TagCard({ tag }: Props) {
  const postCount = tag._count.postTags;

  return (
    <Link href={createTagPagePath(tag.name, 1)}>
      <Badge variant="outline" className="justify-between px-4 py-2 text-sm cursor-pointer hover:bg-secondary/80">
        <span>
          #<span className="text-primary">{tag.name}</span>
        </span>
        <span className="text-muted-foreground">{postCount}</span>
      </Badge>
    </Link>
  );
}
