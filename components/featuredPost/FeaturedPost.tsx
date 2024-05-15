'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Badge, Card, Flex, Text } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import { POSTS_FILE_NAME } from '@/constants/blogPosts';
import { ROUTES } from '@/constants/routes';
import useGetRecentPosts from '@/hooks/useGetRecentPosts';
import createPostPath from '@/utils/createPostPath';
import styles from './FeaturedPost.module.scss';

const FeaturedPost = () => {
  const router = useRouter();
  const { recentPosts } = useGetRecentPosts();
  const featuredPost = recentPosts
    .flatMap((item) => item)
    .find((post) => post.fileName === POSTS_FILE_NAME.BUILDING_A_DESIGN_SYSTEM_IN_A_STARTUP);

  if (!featuredPost) {
    return null;
  }

  return (
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
