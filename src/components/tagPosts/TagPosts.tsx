import React from 'react';
import { Flex, Title } from '@mantine/core';

import PostCard from '@/components/postCard/PostCard';
import { type Post } from '@/types/post';

import styles from './TagPosts.module.scss';

type Props = { currentTag: string; currentPagePosts: Post[] };

const TagPosts = ({ currentTag, currentPagePosts }: Props) => {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3} tt="uppercase">
        # {currentTag}
      </Title>
      <ul className={styles['card-list']}>
        {currentPagePosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
};

export default TagPosts;
