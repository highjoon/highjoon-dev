import { useCallback, useEffect, useState } from 'react';

import { type PostsWithMeta } from '@/entities/post/api/getAllPostsApi/dto';
import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<PostWithTags[]>([]);

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
