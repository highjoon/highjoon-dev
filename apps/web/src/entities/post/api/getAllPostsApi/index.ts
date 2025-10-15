import { GetAllPostsResponseDto } from '@/entities/post/api/getAllPostsApi/dto';
import { ApiClient } from '@/shared/api';

/**
 * 게시물 전체 조회
 * @param api ApiClient
 * @returns 게시물 전체 조회
 */
export const getAllPostsApi = async (api: ApiClient) => {
  const response = await api.get<GetAllPostsResponseDto>('/post');

  return response.data;
};
