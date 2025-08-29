import React from 'react';
import { Flex, Title } from '@mantine/core';

import { getRecentPosts } from '@/actions/post';
import PostCard from '@/components/postCard/PostCard';

import styles from './LatestPosts.module.scss';

export default async function LatestPosts() {
  const recentPosts = await getRecentPosts();
  const posts = recentPosts.flatMap((posts) => posts);

  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        LATEST POSTS
      </Title>
      <ul className={styles['card-list']}>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
}
