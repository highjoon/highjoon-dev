'use client';

import React from 'react';
import Link from 'next/link';
import { type Post } from '@highjoon-dev/prisma';
import { Calendar, ChevronLeft, Eye } from 'lucide-react';

import { useIncreaseViewCount } from '@/entities/post/api/increaseViewCountApi/useIncreaseViewCount';
import TagBadgeList from '@/entities/tag/ui/TagBadgeList';
import { ROUTES } from '@/shared/routes/routes';

interface Props {
  title: Post['title'];
  viewCount: Post['viewCount'];
  createdAt: Post['createdAt'];
  slug: Post['slug'];
  postTags?: Array<{ tag: { id: string; name: string } }>;
}

export default function PostDetailHeader({ title, viewCount, createdAt, slug, postTags }: Props) {
  useIncreaseViewCount({ slug });

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <div className="mb-12">
      <Link
        href={`${ROUTES.PAGES}/1`}
        className="inline-flex items-center mb-8 text-sm font-bold transition-colors text-vibrant-text-muted hover:text-vibrant-brand group">
        <ChevronLeft size={20} className="mr-1 transition-transform group-hover:-translate-x-1" />
        Back to List
      </Link>

      <div className="flex flex-wrap gap-2 mb-6">
        <TagBadgeList tags={postTags?.map((post) => post.tag) || []} variant="secondary" className="gap-2" />
      </div>

      <h1 className="mb-6 text-4xl font-black leading-tight break-words text-vibrant-text-main md:text-5xl">{title}</h1>

      <div className="flex items-center gap-6 pb-8 text-sm font-medium border-b text-vibrant-text-muted border-vibrant-border-color">
        <span className="flex items-center gap-2">
          <Calendar size={16} /> {formattedDate}
        </span>
        <span className="flex items-center gap-2">
          <Eye size={16} /> {viewCount?.toLocaleString()} reads
        </span>
      </div>
    </div>
  );
}
