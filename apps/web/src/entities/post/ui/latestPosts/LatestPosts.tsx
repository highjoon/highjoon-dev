import React from 'react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function LatestPosts() {
  const response = await getAllPostsApi(serverApi, { limit: 6 });

  return (
    <section className="flex flex-col gap-6" aria-labelledby="latest-posts-title">
      <h2 id="latest-posts-title" className="text-xl font-semibold md:text-2xl">
        Latest Posts
      </h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {response.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
