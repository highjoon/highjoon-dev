import React from 'react';
import Image from 'next/image';
import { type Post } from '@highjoon-dev/prisma';

interface Props {
  bannerImageUrl: Post['bannerImageUrl'];
  title: Post['title'];
}

export default function PostBanner({ bannerImageUrl, title }: Props) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] mb-16 overflow-hidden rounded-3xl bg-vibrant-bg-base">
      <Image
        src={bannerImageUrl}
        fill
        alt={`${title} 배너 이미지`}
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
      <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
    </div>
  );
}
