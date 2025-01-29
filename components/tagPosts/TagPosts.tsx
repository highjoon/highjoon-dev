import React from 'react';
import { Flex, Title } from '@mantine/core';
import { Post } from '@/types/post';
import PostCard from '../postCard/PostCard';
import styles from './TagPosts.module.scss';

type Props = { currentTag: string; currentPagePosts: Post[] };

const TagPosts = ({ currentTag, currentPagePosts }: Props) => {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3} tt="uppercase">
        # {currentTag}
      </Title>
      <ul className={styles['card-list']}>
        {currentPagePosts.map((post, index) => (
          <PostCard key={post.title} post={post} />
        ))}
      </ul>
    </Flex>
  );
};

export default TagPosts;
