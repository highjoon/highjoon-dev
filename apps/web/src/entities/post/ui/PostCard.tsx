'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { ChevronRight, Clock } from 'lucide-react';

import { PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { createPostPath } from '@/entities/post/lib/post';
import { ROUTES } from '@/shared/routes/routes';

interface Props {
  post: PostWithTags;
}

export default function PostCard({ post }: Props) {
  const router = useRouter();

  return (
    <li
      className="overflow-hidden transition-all duration-500 bg-white border cursor-pointer dark:bg-slate-900 group rounded-3xl hover:-translate-y-2 border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-500/10"
      onClick={() => router.push(createPostPath(post.slug))}>
      <div className="flex flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <Image
            src={post.bannerImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col flex-1 p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              {post.category}
            </span>
            <div className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400">
              <Clock size={14} className="mr-1.5" />
              <span>{dayjs(post.publishedAt).format('YYYY-MM-DD')}</span>
            </div>
          </div>

          <h3 className="mb-3 text-xl font-bold leading-snug transition-colors text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {post.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.postTags?.map((postTag) => (
              <Link
                key={postTag.tagId}
                href={`${ROUTES.TAGS}/${postTag.tag.name}/1`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md uppercase tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors border border-slate-200 dark:border-slate-700">
                #{postTag.tag.name}
              </Link>
            ))}
          </div>

          <p className="mb-6 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center justify-between h-16 pt-6 mt-auto border-t border-slate-200 dark:border-slate-800 group/footer">
            <span className="text-sm font-bold transition-colors text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Read more
            </span>
            <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 border rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white border-slate-200 dark:border-slate-700 group-hover:border-indigo-600">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
