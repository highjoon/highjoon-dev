import React from 'react';
import { notFound } from 'next/navigation';

import PostCard from '@/entities/post/ui/PostCard';
import { getAllTagsApi } from '@/entities/tag/api/getAllTagsApi';
import { getPostsByTagApi } from '@/entities/tag/api/getPostsByTagApi';
import { findTagByName, POSTS_PER_TAG_PAGE } from '@/entities/tag/lib/tag';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { name: string; page: string };
}

export default async function TagDetailPage({ params }: Props) {
  const tagName = decodeURIComponent(params.name);
  const currentPage = Number(params.page);

  // 태그 이름으로 태그 찾기
  const allTags = await getAllTagsApi(serverApi);
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
    <section className="py-2 md:py-4 lg:py-8">
      <div className="container flex flex-col gap-8">
        {/* 헤더 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold md:text-4xl">#{tag.name}</h1>
              </div>
              <p className="text-muted-foreground">총 {totalPosts}개 게시물</p>
            </div>
          </div>
        </div>

        {/* 게시물 그리드 */}
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">게시물이 존재하지 않습니다.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
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
      </div>
    </section>
  );
}
