import React from 'react';
import Link from 'next/link';
import { Card, Flex } from '@mantine/core';

import { getFeaturedPost } from '@/actions/post';
import FeaturedPostCard from '@/components/featuredPost/FeaturedPostCard';
import createPostPath from '@/utils/createPostPath';

import styles from './FeaturedPost.module.scss';

const FeaturedPost = async () => {
  const featuredPost = await getFeaturedPost();

  if (!featuredPost) {
    return null;
  }

  return (
    <Card className={styles.banner} shadow="md" radius="md" withBorder>
      <Link href={createPostPath(featuredPost?.slug)}>
        <Flex className={styles['banner-image']} pos="relative" w="100%">
          <FeaturedPostCard post={featuredPost} />
        </Flex>
      </Link>
    </Card>
  );
};

export default FeaturedPost;
