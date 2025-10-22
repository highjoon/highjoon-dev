import React from 'react';
import { Flex, Title } from '@mantine/core';

import { getFeaturedPostApi } from '@/entities/post/api/getFeaturedPostApi';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function FeaturedPost() {
  const featuredPost = await getFeaturedPostApi(serverApi);

  return (
    <Flex direction="column" gap={30}>
      <Title component="h2" order={2}>
        FEATURED POST
      </Title>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <PostCard post={featuredPost} />
      </ul>
    </Flex>
  );
}
