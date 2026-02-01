import React from 'react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { POSTS_PER_PAGE } from '@/entities/post/lib/post';
import PostsSchema from '@/entities/post/lib/PostsSchema';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import PageHeader from '@/shared/ui/layout/PageHeader';
import PageSection from '@/shared/ui/layout/PageSection';
import PostGrid from '@/shared/ui/layout/PostGrid';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { id: string };
}

export default async function PostsPage({ params }: Props) {
  const currentPage = Number(params.id);
  const { posts, meta } = await getAllPostsApi(serverApi, {
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
  });

  const totalPage = Math.ceil(meta.total / POSTS_PER_PAGE);

  return (
    <>
      <PostsSchema posts={posts} pageNumber={currentPage} />
      <PageSection>
        <PageHeader
          label="Archive"
          title="ALL POSTS"
          description={
            <>
              총 <span className="text-indigo-600 dark:text-indigo-400">{meta.total}개</span>의 글이 있습니다.
            </>
          }
        />

        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostGrid>

        <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={ROUTES.PAGES} />
      </PageSection>
    </>
  );
}
