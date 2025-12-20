import { GetAllPostsParams, GetAllPostsResponseDto } from '@/entities/post/api/getAllPostsApi/dto';
import { ApiClient } from '@/shared/api';

/**
 * 게시물 전체 조회 (페이지네이션 지원)
 * @param api ApiClient
 * @param params 페이지네이션 파라미터 (선택적)
 * @returns 게시물 목록과 페이지네이션 메타데이터
 */
export const getAllPostsApi = async (api: ApiClient, params?: GetAllPostsParams) => {
  const queryParams = new URLSearchParams();
  if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
  if (params?.take !== undefined) queryParams.append('take', params.take.toString());
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());

  const url = queryParams.toString() ? `/post?${queryParams.toString()}` : '/post';

  const response = await api.get<GetAllPostsResponseDto>(url, {
    next: { revalidate: false, tags: ['all-posts'] },
  });

  return response.data;
};
