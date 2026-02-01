'use client';

import React from 'react';
import { type Post } from '@highjoon-dev/prisma';
import { Share2 } from 'lucide-react';

import LikeButton from '@/features/likePost/ui/LikeButton';

interface Props {
  postId: Post['id'];
  likeCount: Post['likeCount'];
  slug: Post['slug'];
}

export default function InteractionBar({ postId, likeCount, slug }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex items-center justify-between py-8 mb-20 border-t border-b border-vibrant-border-color">
      <LikeButton postId={postId} likeCount={likeCount} slug={slug} />

      <button
        onClick={handleShare}
        className="flex items-center gap-3 px-6 py-3 font-bold transition-all bg-white border rounded-2xl dark:bg-slate-900 text-vibrant-text-muted border-vibrant-border-color hover:bg-slate-50 dark:hover:bg-slate-800">
        <Share2 size={24} />
        <span className="hidden font-bold sm:inline">Share</span>
      </button>
    </div>
  );
}
