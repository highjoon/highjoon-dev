import Pagination from '@/components/pagination/Pagination';
import TagPosts from '@/components/tagPosts/TagPosts';
import { POSTS_PER_PAGE } from '@/constants/blogPosts';
import { posts } from '@/constants/posts';
import { ROUTES } from '@/constants/routes';
import calculateNumberOfTags from '@/utils/calculateNumberOfTags';
import calculateTagPageCount from '@/utils/calculateTagPageCount';
import generateTagPaths from '@/utils/generateTagPaths';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';
import { Flex } from '@mantine/core';

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

export async function generateStaticParams() {
  const allTags = getAllTagsFromPosts();

  const pathsPerTag = allTags.map((tag) => {
    const numberOfTags = calculateNumberOfTags(posts, tag);
    const tagPageCount = calculateTagPageCount(numberOfTags);

    return generateTagPaths(tag, tagPageCount);
  });

  const paths = pathsPerTag.flat();

  return paths;
}

export default function Page({
  params: { slug },
}: {
  params: {
    slug: [string, string];
  };
}) {
  const [currentTag, id] = slug;
  const currentPage = Number(id);
  const postsWithTag = posts.filter((post) => post.tags.find((tag) => tag === currentTag.toLowerCase()));
  const currentPagePosts = postsWithTag.slice((currentPage - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * currentPage);
  const totalPage = Math.ceil(postsWithTag.length / POSTS_PER_PAGE);

  return (
    <Flex direction="column" gap={100}>
      <TagPosts currentTag={currentTag} currentPagePosts={currentPagePosts} />
      <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.TAGS}/${currentTag}`} />
    </Flex>
  );
}
