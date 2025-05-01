import React from 'react';
import { Flex, Title } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';

import PostCard from '@/components/postCard/PostCard';

import styles from './BlogPosts.module.scss';

type Props = {
  title: string;
  posts: Post[];
};

const BlogPosts = ({ title, posts }: Props) => {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        {title}
      </Title>
      <ul className={styles['card-list']}>
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
};

export default BlogPosts;
