import { Flex } from '@mantine/core';

import BlogPosts from '@/components/blogPosts/BlogPosts';
import Pagination from '@/components/pagination/Pagination';
import { POSTS_PER_PAGE } from '@/constants/blogPosts';
import { posts } from '@/constants/posts';
import { ROUTES } from '@/constants/routes';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Posts ${id} | highjoon-dev`,
  };
}

export function generateStaticParams() {
  const postsPerPage = new Array(Math.ceil(posts.length / POSTS_PER_PAGE)).keys();
  const params = [...postsPerPage].map((index) => ({ id: `${index + 1}` }));

  return params;
}

export default function Page({ params }: Params) {
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(posts.length / POSTS_PER_PAGE);
  const blogPosts = posts.slice((currentPage - 1) * 9, 9 * currentPage);

  return (
    <Flex direction="column" gap={100}>
      <BlogPosts title="POSTS" posts={blogPosts} />
      <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
    </Flex>
  );
}
