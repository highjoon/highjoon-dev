import React from 'react';

import HomePageSchema from '@/page/home/model/HomePageSchema';
import IntroSection from '@/widgets/introSection/ui/IntroSection';
import LatestPostsSection from '@/widgets/latestPostsSection/ui/LatestPostsSection';

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      <IntroSection />
      <section className="py-16">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-end justify-between pb-8 border-b border-slate-200 dark:border-slate-800">
            <LatestPostsSection />
          </div>
        </div>
      </section>
    </>
  );
}
