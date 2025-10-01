import React from 'react';
import { Flex } from '@mantine/core';

import HomePageSchema from '@/page/home/model/HomePageSchema';
import FeaturedPostSection from '@/page/home/ui/FeaturedPostSection';
import LatestPostsSection from '@/page/home/ui/LatestPostsSection';
import ViewAllPostsButton from '@/page/home/ui/ViewAllPostsButton';

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      <Flex direction="column" gap={100}>
        <Flex direction="column" gap={30}>
          <FeaturedPostSection />
          <LatestPostsSection />
        </Flex>
        <ViewAllPostsButton />
      </Flex>
    </>
  );
}
