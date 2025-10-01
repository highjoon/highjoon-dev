import React from 'react';
import { Flex, Title } from '@mantine/core';

import PostCard from '@/components/postCard/PostCard';
import { getAllPosts } from '@/entities/post/api/getAllPosts';
import { chunkPostsIntoGroups, sortPostsByDate } from '@/entities/post/lib/post';
import { serverApi } from '@/shared/api/apiClient/serverApi';

import styles from './LatestPosts.module.scss';

export default async function LatestPosts() {
  const postList = await getAllPosts(serverApi);
  const sortedPostsByDate = sortPostsByDate(postList).slice(0, 9);
  const postsByGroups = chunkPostsIntoGroups(sortedPostsByDate);
  const recentPosts = postsByGroups.flatMap((posts) => posts);

  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        LATEST POSTS
      </Title>
      <ul className={styles['card-list']}>
        {recentPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
}
