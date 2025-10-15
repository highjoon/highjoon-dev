import { GetFeaturedPostResponseDto } from '@/entities/post/api/getFeaturedPostApi/dto';
import { ApiClient } from '@/shared/api';

/**
 * 추천 게시물 조회
 * @param api ApiClient
 * @returns 추천 게시물
 */
export const getFeaturedPostApi = async (api: ApiClient) => {
  const response = await api.get<GetFeaturedPostResponseDto>('/post/featured');

  return response.data;
};
