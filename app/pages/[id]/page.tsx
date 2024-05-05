import { Flex } from '@mantine/core';
import AllPosts from '@/components/allPosts/AllPosts';
import Pagination from '@/components/pagination/Pagination';
import { ROUTES } from '@/constants/routes';
import { posts } from '@/data/posts';

const POSTS_PER_PAGE = 9;

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

  return (
    <Flex direction="column" gap={100}>
      <AllPosts currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
    </Flex>
  );
}
