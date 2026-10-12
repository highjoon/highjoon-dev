import { type GetPostRequestDto, type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { toPostWithTags } from '@/entities/post/lib/toPostWithTags';
import { type PostDetailResponse } from '@/entities/post/model/response';
import { fetchApi } from '@/shared/api/fetchApi';

export const getPostApi = async (params: GetPostRequestDto): Promise<PostWithTags | null> => {
  const data = await fetchApi<PostDetailResponse>(`/posts/${encodeURIComponent(params.slug)}`);

  if (!data) {
    return null;
  }

  return toPostWithTags(data.post);
};
