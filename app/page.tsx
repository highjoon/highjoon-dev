import Link from 'next/link';
import { Button, Flex } from '@mantine/core';
import FeaturedPost from '@/components/featuredPost/FeaturedPost';
import LatestPosts from '@/components/latestPosts/LatestPosts';
import { ROUTES } from '@/constants/routes';

export default function HomePage() {
  return (
    <Flex direction="column" gap={100}>
      <Flex direction="column" gap={30}>
        <FeaturedPost />
        <LatestPosts />
      </Flex>
      <Link href={`${ROUTES.PAGES}/1`} style={{ margin: '0 auto' }}>
        <Button variant="default">게시물 전체 보기</Button>
      </Link>
    </Flex>
  );
}
