'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@highjoon-dev/ui/components/Card';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';

import { PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { createPostPath } from '@/entities/post/lib/post';
import TagBadgeList from '@/entities/tag/ui/TagBadgeList';

interface Props {
  post: PostWithTags;
}

export default function PostCard({ post }: Props) {
  return (
    <li className="h-full">
      <Card className="grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0 transition-all duration-150 hover:shadow-md">
        <div className="w-full overflow-hidden aspect-video">
          <Link href={createPostPath(post.slug)} className="block transition-opacity duration-200 hover:opacity-70">
            <Image
              src={post.bannerImageUrl}
              alt={`${post.title} 썸네일 이미지`}
              width={800}
              height={450}
              className="object-cover object-center w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold break-words break-all whitespace-pre-wrap hover:underline md:text-xl">
            <Link href={createPostPath(post.slug)} className="block">
              {post.title}
            </Link>
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{post.description}</p>
          <TagBadgeList
            tags={post.postTags?.map((pt) => pt.tag) || []}
            variant="secondary"
            className="mt-3"
            onTagClick={(e) => e.stopPropagation()}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          {!!post.publishedAt && (
            <time className="text-sm text-muted-foreground">{dayjs(post.publishedAt).format('YYYY-MM-DD')}</time>
          )}
          <Link href={createPostPath(post.slug)} className="flex items-center text-foreground hover:underline">
            Read more
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </CardFooter>
      </Card>
    </li>
  );
}
