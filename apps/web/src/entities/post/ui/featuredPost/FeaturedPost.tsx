import React from 'react';
import Link from 'next/link';
import { Card, Flex } from '@mantine/core';

import { getFeaturedPostApi } from '@/entities/post/api/getFeaturedPostApi';
import FeaturedPostCard from '@/entities/post/ui/featuredPost/FeaturedPostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import createPostPath from '@/utils/createPostPath';

import styles from './FeaturedPost.module.scss';

export default async function FeaturedPost() {
  const featuredPost = await getFeaturedPostApi(serverApi);

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
}
