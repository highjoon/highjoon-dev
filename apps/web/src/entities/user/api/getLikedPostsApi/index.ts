import { GetLikedPostsRequestDto, GetLikedPostsResponseDto } from '@/entities/user/api/getLikedPostsApi/dto';
import { ApiClient } from '@/shared/api';

export const getLikedPostsApi = async (api: ApiClient, params: GetLikedPostsRequestDto) => {
  const response = await api.get<GetLikedPostsResponseDto>(`/user/${params.userId}/liked-posts`);

  return response.data;
};
