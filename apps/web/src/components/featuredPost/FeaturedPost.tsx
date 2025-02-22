'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, Card, Flex, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/types';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import createPostPath from '@/utils/createPostPath';

import styles from './FeaturedPost.module.scss';

type Props = {
  recentPosts: Post[][];
};

const FeaturedPost = ({ recentPosts }: Props) => {
  const featuredPost = recentPosts
    .flatMap((item) => item)
    .find((post) => post.slug === 'building-a-design-system-in-a-startup');

  if (!featuredPost) {
    return null;
  }

  return (
    <Card className={styles.banner} shadow="md" radius="md" withBorder>
      <Link href={createPostPath(featuredPost.slug)}>
        <Flex className={styles['banner-image']} pos="relative" w="100%">
          <Card.Section>
            <Image src={featuredPost.bannerImageUrl} fill alt={featuredPost.title} priority />
          </Card.Section>
          <Card className={styles.info} shadow="md" radius="md" withBorder pos="absolute" bottom={-90}>
            <Text fw={500}>{featuredPost.title}</Text>
            <Flex className={styles.description} w="100%" h={40}>
              <Text size="sm" c="dimmed">
                {featuredPost.description}
              </Text>
            </Flex>
            <Text size="sm" c="dimmed">
              {dayjs(featuredPost.publishedAt).format('YYYY-MM-DD')}
            </Text>
            <Flex className={styles['hashtag-list']} gap={5}>
              {featuredPost.tags.map((tag) => (
                <Badge key={uuid() + tag} className={styles.hashtag}>
                  #{tag}
                </Badge>
              ))}
            </Flex>
          </Card>
        </Flex>
      </Link>
    </Card>
  );
};

export default FeaturedPost;
