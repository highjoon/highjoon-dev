import { useCallback, useEffect, useState } from 'react';
import { type Post } from '@highjoon-dev/prisma';

import { type PostsWithMeta } from '@/entities/post/api/getAllPostsApi/dto';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostListHandler = useCallback(async () => {
    const response = await fetch('/api/post');
    const data: { data: PostsWithMeta } = await response.json();
    setPosts(data.data?.posts ?? []);
  }, []);

  useEffect(() => {
    getPostListHandler();
  }, [getPostListHandler]);

  return posts;
};
