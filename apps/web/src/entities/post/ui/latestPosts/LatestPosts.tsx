import React from 'react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import PostCard from '@/entities/post/ui/PostCard';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function LatestPosts() {
  const { posts } = await getAllPostsApi(serverApi, { limit: 3 });

  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
