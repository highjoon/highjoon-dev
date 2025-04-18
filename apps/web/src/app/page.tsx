import Link from 'next/link';
import { Button, Flex } from '@mantine/core';

import { getRecentPosts } from '@/actions/post';
import BlogPosts from '@/components/blogPosts/BlogPosts';
import FeaturedPost from '@/components/featuredPost/FeaturedPost';
import { ROUTES } from '@/constants/routes';

export default async function HomePage() {
  const recentPosts = await getRecentPosts();
  const flattenedPosts = recentPosts.flatMap((posts) => posts);

  return (
    <Flex direction="column" gap={100}>
      <Flex direction="column" gap={30}>
        <FeaturedPost />
        <BlogPosts title="LATEST POSTS" posts={flattenedPosts} />
      </Flex>
      <Link href={`${ROUTES.PAGES}/1`} style={{ margin: '0 auto' }}>
        <Button variant="default">게시물 전체 보기</Button>
      </Link>
    </Flex>
  );
}
