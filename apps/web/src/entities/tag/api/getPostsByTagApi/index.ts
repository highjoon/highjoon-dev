import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';
import { type PostResponse } from '@/entities/post/model/response';
import { type GetPostsByTagParams } from '@/entities/tag/api/getPostsByTagApi/dto';
import { fetchApi } from '@/shared/api/fetchApi';
import { type PagedModel } from '@/shared/api/types';

export const getPostsByTagApi = async (params: GetPostsByTagParams): Promise<PostWithTags[]> => {
  const { tagName, offset = 0, limit = 9 } = params;

  const data = await fetchApi<PagedModel<PostResponse>>('/posts', {
    query: { tag: tagName, page: Math.floor(offset / limit), size: limit },
  });

  if (!data) {
    return [];
  }

  return data.content.map(toPostWithTags);
};
