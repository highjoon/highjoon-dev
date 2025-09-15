import React from 'react';
import { Flex, Title } from '@mantine/core';

import { postApi } from '@/apis/post';
import PostCard from '@/components/postCard/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { chunkPostsIntoGroups } from '@/utils/chunkArrayIntoGroups';
import sortPostsByDate from '@/utils/sortPostsByDate';

import styles from './LatestPosts.module.scss';

export default async function LatestPosts() {
  const postList = await postApi(serverApi).getAll();
  const sortedPostsByDate = sortPostsByDate(postList.data).slice(0, 9);
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
