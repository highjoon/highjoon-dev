import { Flex } from '@mantine/core';

import { getPostList } from '@/apis/post';
import BlogPosts from '@/components/blogPosts/BlogPosts';
import Pagination from '@/components/pagination/Pagination';
import BlogListSchema from '@/components/structuredData/BlogListSchema';
import { POSTS_PER_PAGE } from '@/constants/post';
import { ROUTES } from '@/constants/routes';

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Posts ${id} | highjoon-dev`,
    description: `highjoon's dev-log ${id} 페이지`,
    openGraph: {
      title: `Posts ${id} | highjoon-dev`,
      description: `highjoon's dev-log ${id} 페이지`,
      type: 'website',
      url: `https://highjoon-dev.com/pages/${id}`,
    },
    alternates: {
      canonical: `https://highjoon-dev.com/pages/${id}`,
    },
  };
}

export default async function Page({ params }: Params) {
  const postList = await getPostList();
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(postList.data.length / POSTS_PER_PAGE);
  const blogPosts = postList.data.slice((currentPage - 1) * 9, 9 * currentPage);

  return (
    <>
      <BlogListSchema posts={blogPosts} pageNumber={currentPage} />
      <Flex direction="column" gap={100}>
        <BlogPosts posts={blogPosts} />
        <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
      </Flex>
    </>
  );
}
