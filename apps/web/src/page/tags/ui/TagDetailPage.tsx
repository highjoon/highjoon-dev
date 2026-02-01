import React from 'react';
import { notFound } from 'next/navigation';
import { Tag } from 'lucide-react';

import PostCard from '@/entities/post/ui/PostCard';
import { getAllTagsApi } from '@/entities/tag/api/getAllTagsApi';
import { getPostsByTagApi } from '@/entities/tag/api/getPostsByTagApi';
import { findTagByName, POSTS_PER_TAG_PAGE, sortTagsByPopularity } from '@/entities/tag/lib/tag';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import EmptyState from '@/shared/ui/layout/EmptyState';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageSection from '@/shared/ui/layout/PageSection';
import PostGrid from '@/shared/ui/layout/PostGrid';
import Pagination from '@/widgets/ui/Pagination';

import TagPosts from './TagPosts';

interface Props {
  params: { name: string; page: string };
}

export default async function TagDetailPage({ params }: Props) {
  const tagName = decodeURIComponent(params.name);
  const currentPage = Number(params.page);

  // 태그 이름으로 태그 찾기
  const allTags = await getAllTagsApi(serverApi);
  const sortedTags = sortTagsByPopularity(allTags);
  const tag = findTagByName(allTags, tagName);

  if (!tag) {
    return notFound();
  }

  // 페이지네이션 계산
  const skip = (currentPage - 1) * POSTS_PER_TAG_PAGE;
  const take = POSTS_PER_TAG_PAGE;

  // 태그별 게시물 조회
  const posts = await getPostsByTagApi(serverApi, {
    tagId: tag.id,
    skip,
    take,
  });

  // 전체 페이지 수 계산
  const totalPosts = tag._count.postTags;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_TAG_PAGE);

  // 페이지 번호 유효성 검증
  if (currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  return (
    <PageSection>
      <PageHeader
        label="Curated Topics"
        title="TAGS"
        description={
          <>
            총 <span className="text-indigo-600 dark:text-indigo-400">{allTags.length}개</span>의 태그가 있습니다.
          </>
        }
      />

      {/* 태그 검색 & 클라우드 영역 */}
      <div className="mb-14">
        <TagPosts tags={sortedTags} selectedTag={tagName} />
      </div>

      {/* Filtered Posts Header */}
      <div className="flex items-end justify-between mb-8">
        <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
          <Tag className="text-indigo-600 dark:text-indigo-400" size={28} />
          <span className="text-indigo-600 dark:text-indigo-400">#{tag.name}</span>
          <span>관련 글</span>
          <span className="px-2 py-1 ml-2 text-sm font-bold rounded-lg text-slate-400 bg-slate-100 dark:bg-slate-800">
            {totalPosts}
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
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            routerPath={`${ROUTES.TAGS}/${encodeURIComponent(tagName)}`}
          />
        </div>
      )}
    </PageSection>
  );
}
