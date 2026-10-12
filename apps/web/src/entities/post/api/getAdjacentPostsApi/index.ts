import { type AdjacentPosts } from '@/entities/post/api/getPostApi/dto';
import { type PostDetailResponse } from '@/entities/post/model/response';
import { type Post } from '@/entities/post/model/types';
import { fetchApi } from '@/shared/api/fetchApi';

// getPostApi 와 같은 URL 이라 Next fetch 메모이제이션으로 요청 1회
export const getAdjacentPostsApi = async (slug: Post['slug']): Promise<AdjacentPosts> => {
  const data = await fetchApi<PostDetailResponse>(`/posts/${encodeURIComponent(slug)}`);

  if (!data) {
    return { prev: null, next: null };
  }

  return { prev: data.previous, next: data.next };
};
