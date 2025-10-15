import { GetPostRequestDto, GetPostResponseDto } from '@/entities/post/api/getPostApi/dto';
import { ApiClient } from '@/shared/api';

/**
 * 게시물 조회
 * @param api ApiClient
 * @param params GetPostRequestDto
 * @returns 게시물
 */
export const getPostApi = async (api: ApiClient, params: GetPostRequestDto) => {
  const response = await api.get<GetPostResponseDto>(`/post/${params.slug}`);

  return response.data;
};
