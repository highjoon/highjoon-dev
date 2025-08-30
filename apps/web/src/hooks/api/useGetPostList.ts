import { useCallback, useEffect, useState } from 'react';
import { type Post } from '@highjoon-dev/prisma';

import { getPostList } from '@/apis/post';

export const useGetPostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostListHandler = useCallback(async () => {
    const postList = await getPostList();
    setPosts(postList.data);
  }, []);

  useEffect(() => {
    getPostListHandler();
  }, [getPostListHandler]);

  return posts;
};
