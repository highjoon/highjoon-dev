'use client';

import React from 'react';
import Image from 'next/image';
import { Card, Flex, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import dayjs from 'dayjs';

import styles from './FeaturedPostCard.module.scss';

type Props = {
  post: Post;
};

const FeaturedPostCard = ({ post }: Props) => {
  return (
    <>
      <Card.Section>
        <Image
          src={post.bannerImageUrl}
          fill
          alt={`${post.title} 피처드 포스트 이미지`}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </Card.Section>
      <Card className={styles.info} shadow="md" radius="md" withBorder pos="absolute" bottom={-90}>
        <Text fw={500}>{post.title}</Text>
        <Flex className={styles.description} w="100%" h={40}>
          <Text size="sm" c="dimmed">
            {post.description}
          </Text>
        </Flex>
        <Text size="sm" c="dimmed">
          {dayjs(post.publishedAt).format('YYYY-MM-DD')}
        </Text>
        {/* <Flex className={styles['hashtag-list']} gap={5}>
          {post.tags.map((tag) => (
            <Badge key={uuid() + tag} className={styles.hashtag}>
              #{tag}
            </Badge>
          ))}
        </Flex> */}
      </Card>
    </>
  );
};

export default FeaturedPostCard;
