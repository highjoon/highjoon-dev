import { Flex } from '@mantine/core';
import Pagination from '@/components/Common/pagination/Pagination';
import Posts from '@/components/posts/posts/Posts';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Posts ${id} | highjoon-dev`,
  };
}

// export function generateStaticParams() {
//   const postsPerPage = new Array(Math.ceil(posts.length / POSTS_PER_PAGE)).keys();
//   const params = [...postsPerPage].map((index) => ({ id: `${index + 1}` }));
//   return params;
// }

export default function Page({ params }: Params) {
  const currentPage = Number(params.id);

  return (
    <Flex direction="column" gap={100}>
      <Posts currentPage={currentPage} />
      <Pagination currentPage={currentPage} />
    </Flex>
  );
}
