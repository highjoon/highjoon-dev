import React from 'react';
import { Flex, Title } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';

import PostCard from '@/entities/post/ui/PostCard';

import styles from './PostsSection.module.scss';

type Props = {
  posts: Post[];
};

export default function PostsSection({ posts }: Props) {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={1}>
        POSTS
      </Title>
      <ul className={styles['card-list']}>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
}
