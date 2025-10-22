import React from 'react';
import { Flex } from '@mantine/core';

import HomePageSchema from '@/page/home/model/HomePageSchema';
import ViewAllPostsButton from '@/page/home/ui/ViewAllPostsButton';
import FeaturedPostSection from '@/widgets/featuredPostSection/ui/FeaturedPostSection';
import LatestPostsSection from '@/widgets/latestPostsSection/ui/LatestPostsSection';

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
