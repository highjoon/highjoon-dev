import { useCallback, useEffect, useState } from 'react';
import { type Post } from '@highjoon-dev/prisma';

import { postApi } from '@/apis/post';
import { clientApi } from '@/shared/api';

export const useGetPostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostListHandler = useCallback(async () => {
    const postList = await postApi(clientApi).getAll();
    setPosts(postList.data);
  }, []);

  useEffect(() => {
    getPostListHandler();
  }, [getPostListHandler]);

  return posts;
};
