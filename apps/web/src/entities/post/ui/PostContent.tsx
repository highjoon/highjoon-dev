import React from 'react';
import Image from 'next/image';
import { type Post } from '@highjoon-dev/prisma';

import { MdxComponents } from '@/entities/post/lib/mdx/MdxComponents';
import MDXContent from '@/entities/post/lib/mdx/MDXContent';
import ViewCount from '@/entities/post/ui/ViewCount';
import TagBadgeList from '@/entities/tag/ui/TagBadgeList';

interface Props {
  title: Post['title'];
  bannerImageUrl: Post['bannerImageUrl'];
  content: string;
  viewCount: Post['viewCount'];
  slug: Post['slug'];
  postTags?: Array<{ tag: { id: string; name: string } }>;
}

export default function PostContent({ title, bannerImageUrl, content, viewCount, slug, postTags }: Props) {
  return (
    <div className="relative flex flex-col w-full mb-5">
      <h1 className="mb-10 text-3xl font-medium text-center sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl">{title}</h1>

      <TagBadgeList tags={postTags?.map((pt) => pt.tag) || []} variant="outline" className="justify-center mb-4" />

      <div className="mb-5 flex items-center justify-center gap-4 sm:mb-2.5 md:mb-5">
        <ViewCount viewCount={viewCount} slug={slug} />
      </div>

      <div className="relative w-full mb-5">
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg border sm:h-[300px] md:h-[500px]">
          <Image
            src={bannerImageUrl}
            fill
            alt={`${title} 배너 이미지`}
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      </div>

      <div id="page-content" className="flex flex-col">
        <MDXContent source={content} components={MdxComponents} />
      </div>
    </div>
  );
}
