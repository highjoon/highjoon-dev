import React from 'react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import PostCard from '@/entities/post/ui/PostCard';
import { getAllTagsApi } from '@/entities/tag/api/getAllTagsApi';
import { POSTS_PER_TAG_PAGE, sortTagsByPopularity } from '@/entities/tag/lib/tag';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import EmptyState from '@/shared/ui/layout/EmptyState';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageSection from '@/shared/ui/layout/PageSection';
import PostGrid from '@/shared/ui/layout/PostGrid';
import Pagination from '@/widgets/ui/Pagination';

import TagPosts from './TagPosts';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function TagsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const tags = await getAllTagsApi(serverApi);
  const sortedTags = sortTagsByPopularity(tags);

  // 페이지네이션된 게시물 조회
  const skip = (currentPage - 1) * POSTS_PER_TAG_PAGE;
  const { posts, meta } = await getAllPostsApi(serverApi, {
    skip,
    take: POSTS_PER_TAG_PAGE,
  });

  const totalPages = Math.ceil(meta.total / POSTS_PER_TAG_PAGE);

  return (
    <PageSection>
      <PageHeader
        label="Curated Topics"
        title="TAGS"
        description={
          <>
            총 <span className="text-indigo-600 dark:text-indigo-400">{tags.length}개</span>의 태그가 있습니다.
          </>
        }
      />

      {/* 태그 검색 & 클라우드 영역 */}
      <div className="mb-14">
        <TagPosts tags={sortedTags} selectedTag={null} />
      </div>

      {/* 전체 글 목록 헤더 */}
      <div className="flex items-end justify-between mb-8">
        <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
          <span>전체 글 목록</span>
          <span className="px-2 py-1 ml-2 text-sm font-bold rounded-lg text-slate-400 bg-slate-100 dark:bg-slate-800">
            {meta.total}
          </span>
        </h3>
      </div>

      {/* 게시물 그리드 */}
      {posts.length === 0 ? (
        <EmptyState message="게시물이 존재하지 않습니다." />
      ) : (
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostGrid>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="w-full mt-8">
          <Pagination currentPage={currentPage} totalPage={totalPages} routerPath={ROUTES.TAGS} useSearchParams />
        </div>
      )}
    </PageSection>
  );
}
