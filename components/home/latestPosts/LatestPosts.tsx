'use client';

import { useRouter } from 'next/navigation';
import { Badge, Button, Image } from '@mantine/core';
import { Card, Flex, Group, Text } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import Title from '@/components/Common/title/Title';
import { ROUTES } from '@/constants/routes';
import useRecentPosts from '@/hooks/useRecentPosts';
import createPostPath from '@/utils/createPostPath';
import styles from './LatestPosts.module.scss';

const LatestPosts = () => {
  const router = useRouter();
  const { recentPosts } = useRecentPosts();

  return (
    <>
      <Title title="Latest Post" />
      <ul className={styles['card-list']}>
        {recentPosts.map((post) =>
          post.map((item, index) => (
            <li className={styles.card} key={uuid() + index}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ gap: 20 }}>
                <Group className={styles.content} onClick={() => router.push(createPostPath(item.fileName))}>
                  <Card.Section key={uuid()}>
                    <Image src={item.bannerImg} height={160} alt={item.title} />
                  </Card.Section>
                  <Group gap={10}>
                    <Flex className={styles.title} w="100%" h={50} align="center">
                      <Text fw={500}>{item.title}</Text>
                    </Flex>
                    <Flex className={styles.description} w="100%" h={40}>
                      <Text size="sm" c="dimmed">
                        {item.description}
                      </Text>
                    </Flex>
                    <Text size="sm" c="dimmed">
                      {item.date}
                    </Text>
                  </Group>
                </Group>
                <Flex className={styles['hashtag-list']} gap={5}>
                  {item.tags.map((tag) => (
                    <Badge
                      key={uuid() + tag}
                      className={styles.hashtag}
                      onClick={() => router.push(`${ROUTES.TAGS}/${tag}/1`)}>
                      #{tag}
                    </Badge>
                  ))}
                </Flex>
              </Card>
            </li>
          )),
        )}
      </ul>
      <Flex w="100%" justify="center" align="center" key={uuid()}>
        <Button variant="default" onClick={() => router.push(`${ROUTES.PAGES}/1`)}>
          게시물 전체 보기
        </Button>
      </Flex>
    </>
  );
};

export default LatestPosts;
