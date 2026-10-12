import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';
import { type PostResponse } from '@/entities/post/model/response';
import { type Post } from '@/entities/post/model/types';
import { fetchApi } from '@/shared/api/fetchApi';

export const getFeaturedPostApi = async (): Promise<Post | null> => {
  const data = await fetchApi<PostResponse>('/posts/featured');

  if (!data) {
    return null;
  }

  return toPostWithTags(data);
};
