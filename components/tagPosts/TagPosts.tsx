'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Badge, Card, Flex, Group, Image, Text, Title } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import { ROUTES } from '@/constants/routes';
import { Post } from '@/types/post';
import createPostPath from '@/utils/createPostPath';
import styles from './TagPosts.module.scss';

type Props = { currentTag: string; currentPagePosts: Post[] };

const TagPosts = ({ currentTag, currentPagePosts }: Props) => {
  const router = useRouter();

  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3} tt="uppercase">
        # {currentTag}
      </Title>
      <ul className={styles['card-list']}>
        {currentPagePosts.map((post, index) => (
          <li className={styles.card} key={uuid() + index}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ gap: 20 }}>
              <Group className={styles.content} onClick={() => router.push(createPostPath(post.fileName))}>
                <Card.Section key={uuid()}>
                  <Image src={post.bannerImg} height={160} alt={post.title} />
                </Card.Section>
                <Group gap={10}>
                  <Flex className={styles.title} w="100%" h={50} align="center">
                    <Text fw={500}>{post.title}</Text>
                  </Flex>
                  <Flex className={styles.description} w="100%" h={40}>
                    <Text size="sm" c="dimmed">
                      {post.description}
                    </Text>
                  </Flex>
                  <Text size="sm" c="dimmed">
                    {post.date}
                  </Text>
                </Group>
              </Group>
              <Flex className={styles['hashtag-list']} gap={5}>
                {post.tags.map((tag) => (
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
        ))}
      </ul>
    </Flex>
  );
};

export default TagPosts;
