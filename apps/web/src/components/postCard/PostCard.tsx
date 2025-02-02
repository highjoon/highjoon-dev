'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Card, Flex, Group, Image, Text } from '@mantine/core';

import { ROUTES } from '@/constants/routes';
import { type Post } from '@/types/post';
import createPostPath from '@/utils/createPostPath';

import styles from './PostCard.module.scss';

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <li className={styles.card}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ gap: 20 }}>
        <Link href={createPostPath(post.fileName)}>
          <Group>
            <Card.Section className={styles.content}>
              <Image src={post.bannerImg} alt={post.title} className={styles.image} />
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
        </Link>
        <Flex className={styles['hashtag-list']} gap={5}>
          {post.tags.map((tag) => (
            <Link key={tag} href={`${ROUTES.TAGS}/${tag}/1`}>
              <Badge className={styles.hashtag}>#{tag}</Badge>
            </Link>
          ))}
        </Flex>
      </Card>
    </li>
  );
};

export default PostCard;
