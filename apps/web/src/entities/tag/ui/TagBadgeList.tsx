'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@highjoon-dev/ui/components/Badge';

import { createTagPagePath } from '@/entities/tag/lib/tag';

interface TagBadgeListProps {
  tags: Array<{ id: string; name: string }>;
  variant?: 'secondary' | 'outline' | 'default' | 'destructive';
  showHash?: boolean;
  onTagClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function TagBadgeList({
  tags,
  variant = 'secondary',
  showHash = true,
  onTagClick,
  className = '',
}: TagBadgeListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link key={tag.id} href={createTagPagePath(tag.name, 1)} onClick={onTagClick}>
          <Badge variant={variant} className="cursor-pointer hover:opacity-80">
            {showHash && '#'}
            {tag.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
