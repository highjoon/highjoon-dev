import React from 'react';

import HomePageSchema from '@/page/home/model/HomePageSchema';
import ViewAllPostsButton from '@/page/home/ui/ViewAllPostsButton';
import FeaturedPostSection from '@/widgets/featuredPostSection/ui/FeaturedPostSection';
import LatestPostsSection from '@/widgets/latestPostsSection/ui/LatestPostsSection';

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      <div className="flex flex-col gap-16 py-4 md:py-8">
        <div className="flex flex-col gap-10">
          <FeaturedPostSection />
          <LatestPostsSection />
        </div>
        <ViewAllPostsButton />
      </div>
    </>
  );
}
