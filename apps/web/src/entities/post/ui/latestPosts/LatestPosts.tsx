import React from 'react';
import { Flex, Title } from '@mantine/core';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';

import styles from './LatestPosts.module.scss';

export default async function LatestPosts() {
  const allPosts = await getAllPostsApi(serverApi);
  const latestPosts = allPosts.slice(0, 6); // 최신 6개만 표시

  return (
    <Flex direction="column" gap={30}>
      <Title component="h2" order={2}>
        LATEST POSTS
      </Title>
      <ul className={styles['card-list']}>
        {latestPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </Flex>
  );
}
