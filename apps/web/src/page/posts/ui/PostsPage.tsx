import React from 'react';
import { Flex } from '@mantine/core';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { POSTS_PER_PAGE } from '@/entities/post/lib/post';
import PostsSchema from '@/entities/post/lib/PostsSchema';
import PostsSection from '@/page/posts/ui/PostsSection';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { id: string };
}

export default async function PostsPage({ params }: Props) {
  const postList = await getAllPostsApi(serverApi);
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(postList.length / POSTS_PER_PAGE);
  const blogPosts = postList.slice((currentPage - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * currentPage);

  return (
    <>
      <PostsSchema posts={blogPosts} pageNumber={currentPage} />
      <Flex direction="column" gap={100}>
        <PostsSection posts={blogPosts} />
        <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
      </Flex>
    </>
  );
}
