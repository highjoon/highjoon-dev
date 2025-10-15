import React from 'react';
import { Flex } from '@mantine/core';

import { postApi } from '@/apis/post';
import BlogPosts from '@/components/blogPosts/BlogPosts';
import Pagination from '@/components/pagination/Pagination';
import { POSTS_PER_PAGE } from '@/constants/post';
import PostsSchema from '@/entities/post/lib/PostsSchema';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';

interface Props {
  params: { id: string };
}

export default async function PostsPage({ params }: Props) {
  const postList = await postApi(serverApi).getAll();
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(postList.data.length / POSTS_PER_PAGE);
  const blogPosts = postList.data.slice((currentPage - 1) * 9, 9 * currentPage);

  return (
    <>
      <PostsSchema posts={blogPosts} pageNumber={currentPage} />
      <Flex direction="column" gap={100}>
        <BlogPosts posts={blogPosts} />
        <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
      </Flex>
    </>
  );
}
