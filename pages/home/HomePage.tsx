'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge, Card, Flex, Text } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import Title from '@/components/Common/title/Title';
import PageContentsList from '@/components/Post/pageContentsList/PageContentsList';
import { ROUTES } from '@/constants/routes';
import useRecentPosts from '@/hooks/useRecentPosts';
import createPostPath from '@/utils/createPostPath';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const router = useRouter();
  const { recentPosts } = useRecentPosts();
  const featuredPost = recentPosts[0][0];

  return (
    <>
      <Card className={styles.banner} shadow="md" radius="md" withBorder>
        <Link href={createPostPath(featuredPost.fileName)}>
          <Flex className={styles['banner-image']} pos="relative" w="100%">
            <Card.Section>
              <Image src={featuredPost.bannerImg} fill alt={featuredPost.title} priority />
            </Card.Section>
            <Card className={styles.info} shadow="md" radius="md" withBorder pos="absolute" bottom={-90}>
              <Text fw={500}>{featuredPost.title}</Text>
              <Flex className={styles.description} w="100%" h={40}>
                <Text size="sm" c="dimmed">
                  {featuredPost.description}
                </Text>
              </Flex>
              <Text size="sm" c="dimmed">
                {featuredPost.date}
              </Text>
              <Flex className={styles['hashtag-list']} gap={5}>
                {featuredPost.tags.map((tag) => (
                  <Badge
                    key={uuid() + tag}
                    className={styles.hashtag}
                    onClick={() => router.push(`${ROUTES.TAGS}/${tag}/1`)}>
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            </Card>
          </Flex>
        </Link>
      </Card>
      <Title title="Latest Post" />
      <PageContentsList posts={recentPosts} />
    </>
  );
}
