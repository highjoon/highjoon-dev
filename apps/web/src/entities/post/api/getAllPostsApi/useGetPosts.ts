import { useCallback, useEffect, useState } from 'react';
import { type Post } from '@highjoon-dev/prisma';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { clientApi } from '@/shared/api';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostListHandler = useCallback(async () => {
    const posts = await getAllPostsApi(clientApi);
    setPosts(posts);
  }, []);

  useEffect(() => {
    getPostListHandler();
  }, [getPostListHandler]);

  return posts;
};
