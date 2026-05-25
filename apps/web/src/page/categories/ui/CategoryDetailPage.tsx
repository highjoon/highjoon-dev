import React from 'react';
import { notFound } from 'next/navigation';
import { FolderOpen } from 'lucide-react';

import { getCategoryPostsApi } from '@/entities/category/api/getCategoryPostsApi';
import { POSTS_PER_CATEGORY_PAGE } from '@/entities/category/lib/category';
import { getGiscusStatsApi } from '@/entities/giscus/api/getGiscusStatsApi';
import PostCard from '@/entities/post/ui/PostCard';
import { ROUTES } from '@/shared/routes/routes';
import EmptyState from '@/shared/ui/layout/EmptyState';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageSection from '@/shared/ui/layout/PageSection';
import PostGrid from '@/shared/ui/layout/PostGrid';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { slug: string; page: string };
}

export default async function CategoryDetailPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  const currentPage = Number(params.page);

  if (!Number.isFinite(currentPage) || currentPage < 1) {
    notFound();
  }

  const skip = (currentPage - 1) * POSTS_PER_CATEGORY_PAGE;

  const [result, giscusStats] = await Promise.all([
    getCategoryPostsApi({ slug, skip, take: POSTS_PER_CATEGORY_PAGE }),
    getGiscusStatsApi(),
  ]);

  if (!result) {
    notFound();
  }

  const { posts, meta, category } = result;
  const totalPages = Math.max(1, Math.ceil(meta.total / POSTS_PER_CATEGORY_PAGE));

  if (currentPage > totalPages && meta.total > 0) {
    notFound();
  }

  return (
    <PageSection>
      <PageHeader
        label="Category"
        title={category.name.toUpperCase()}
        description={
          <>
            총 <span className="text-indigo-600 dark:text-indigo-400">{meta.total}개</span>의 게시물이 있습니다.
          </>
        }
      />

      <div className="flex items-end justify-between mb-8">
        <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
          <FolderOpen className="text-indigo-600 dark:text-indigo-400" size={28} />
          <span className="text-indigo-600 dark:text-indigo-400">{category.name}</span>
          <span>카테고리 글</span>
          <span className="px-2 py-1 ml-2 text-sm font-bold rounded-lg text-slate-400 bg-slate-100 dark:bg-slate-800">
            {meta.total}
          </span>
        </h3>
      </div>

      {posts.length === 0 ? (
        <EmptyState message="게시물이 존재하지 않습니다." />
      ) : (
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} giscusStats={giscusStats[post.slug]} />
          ))}
        </PostGrid>
      )}

      {totalPages > 1 && (
        <div className="w-full mt-8">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            routerPath={`${ROUTES.CATEGORIES}/${encodeURIComponent(slug)}`}
          />
        </div>
      )}
    </PageSection>
  );
}
