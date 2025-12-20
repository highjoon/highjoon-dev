import { GetPostsByTagParams, GetPostsByTagResponseDto } from '@/entities/tag/api/getPostsByTagApi/dto';
import { ApiClient } from '@/shared/api';

export const getPostsByTagApi = async (api: ApiClient, params: GetPostsByTagParams) => {
  const { tagId, skip = 0, take = 9 } = params;

  const queryParams = new URLSearchParams({
    skip: skip.toString(),
    take: take.toString(),
  });

  const response = await api.get<GetPostsByTagResponseDto>(`/tag/${tagId}/posts?${queryParams}`, {
    next: { revalidate: false, tags: [`tag-posts-${tagId}`] },
  });

  return response.data;
};
