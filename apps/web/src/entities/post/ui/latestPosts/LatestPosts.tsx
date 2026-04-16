import React from 'react';

import { getGiscusStatsApi } from '@/entities/giscus/api/getGiscusStatsApi';
import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import PostCard from '@/entities/post/ui/PostCard';

export default async function LatestPosts() {
  const [{ posts }, giscusStats] = await Promise.all([getAllPostsApi({ limit: 3 }), getGiscusStatsApi()]);

  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} giscusStats={giscusStats[post.slug]} />
      ))}
    </ul>
  );
}
