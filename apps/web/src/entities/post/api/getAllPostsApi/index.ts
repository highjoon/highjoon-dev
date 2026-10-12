import { type GetAllPostsParams, type PostsWithMeta } from '@/entities/post/api/getAllPostsApi/dto';
import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';
import { type PostResponse } from '@/entities/post/model/response';
import { fetchApi } from '@/shared/api/fetchApi';
import { toPaginationMeta } from '@/shared/api/toPaginationMeta';
import { type PagedModel } from '@/shared/api/types';

const DEFAULT_TAKE = 10;

const EMPTY_POSTS: PostsWithMeta = { posts: [], meta: { total: 0, skip: 0, take: DEFAULT_TAKE, hasMore: false } };

export const getAllPostsApi = async (params?: GetAllPostsParams): Promise<PostsWithMeta> => {
  const size = params?.limit ?? params?.take ?? DEFAULT_TAKE;
  const page = Math.floor((params?.skip ?? 0) / size);

  try {
    const data = await fetchApi<PagedModel<PostResponse>>('/posts', { query: { page, size } });

    if (!data) {
      return EMPTY_POSTS;
    }

    return { posts: data.content.map(toPostWithTags), meta: toPaginationMeta(data.page) };
  } catch (error) {
    console.error('getAllPostsApi 실패:', error);
    return EMPTY_POSTS;
  }
};
