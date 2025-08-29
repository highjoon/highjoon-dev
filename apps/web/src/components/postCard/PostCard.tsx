'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Flex, Group, Image, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import dayjs from 'dayjs';

import createPostPath from '@/utils/createPostPath';

import styles from './PostCard.module.scss';

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <li className={styles.card}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ gap: 20 }}>
        <Link href={createPostPath(post.slug)}>
          <Group>
            <Card.Section className={styles.content}>
              <Image
                src={post.bannerImageUrl}
                alt={`${post.title} 썸네일 이미지`}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
              {!!post.publishedAt && (
                <Text size="sm" c="dimmed">
                  {dayjs(post.publishedAt).format('YYYY-MM-DD')}
                </Text>
              )}
            </Group>
          </Group>
        </Link>
      </Card>
    </li>
  );
};

export default PostCard;
