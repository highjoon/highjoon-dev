import React from 'react';
import { Flex, Title } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import { Post } from '@/types/post';
import styles from './TagPosts.module.scss';
import PostCard from '../postCard/PostCard';

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
