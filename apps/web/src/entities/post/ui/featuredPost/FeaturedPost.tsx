import React from 'react';

import { getFeaturedPostApi } from '@/entities/post/api/getFeaturedPostApi';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function FeaturedPost() {
  const featuredPost = await getFeaturedPostApi(serverApi);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="featured-post-title">
      <h2 id="featured-post-title" className="text-xl font-semibold md:text-2xl">
        Featured Post
      </h2>
      <div className="p-0 m-0 list-none">
        <PostCard post={featuredPost} />
      </div>
    </section>
  );
}
