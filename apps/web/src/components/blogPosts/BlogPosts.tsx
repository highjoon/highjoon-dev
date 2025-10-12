import React from 'react';
import { Flex, Title } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';

import PostCard from '@/components/postCard/PostCard';

import styles from './BlogPosts.module.scss';

type Props = {
  posts: Post[];
};

export default function BlogPosts({ posts }: Props) {
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
