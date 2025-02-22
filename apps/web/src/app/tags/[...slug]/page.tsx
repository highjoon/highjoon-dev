import { Flex } from '@mantine/core';

import { getPostList } from '@/apis/post';
import Pagination from '@/components/pagination/Pagination';
import TagPosts from '@/components/tagPosts/TagPosts';
import { POSTS_PER_PAGE } from '@/constants/post';
import { ROUTES } from '@/constants/routes';

interface Params {
  params: {
    slug: [string, string];
  };
}

export async function generateMetadata({ params: { slug } }: Params) {
  const [tag, id] = slug;

  return {
    title: `#${tag.toUpperCase()} - ${id} | highjoon-dev`,
  };
}

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: [string, string];
  };
}) {
  const postList = await getPostList();
  const [currentTag, id] = slug;
  const currentPage = Number(id);
  const postsWithTag = postList.responseObject.filter((post) =>
    post.tags.find((tag) => tag === currentTag.toLowerCase()),
  );
  const currentPagePosts = postsWithTag.slice((currentPage - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * currentPage);
  const totalPage = Math.ceil(postsWithTag.length / POSTS_PER_PAGE);

  return (
    <Flex direction="column" gap={100}>
      <TagPosts currentTag={currentTag} currentPagePosts={currentPagePosts} />
      <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.TAGS}/${currentTag}`} />
    </Flex>
  );
}
