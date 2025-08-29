import { Flex } from '@mantine/core';

import { getPostList } from '@/apis/post';
import BlogPosts from '@/components/blogPosts/BlogPosts';
import Pagination from '@/components/pagination/Pagination';
import { POSTS_PER_PAGE } from '@/constants/post';
import { ROUTES } from '@/constants/routes';

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Posts ${id} | highjoon-dev`,
  };
}

export default async function Page({ params }: Params) {
  const postList = await getPostList();
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(postList.responseObject.length / POSTS_PER_PAGE);
  const blogPosts = postList.responseObject.slice((currentPage - 1) * 9, 9 * currentPage);

  return (
    <Flex direction="column" gap={100}>
      <BlogPosts posts={blogPosts} />
      <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
    </Flex>
  );
}
