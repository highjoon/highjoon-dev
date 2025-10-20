import { IncreaseViewCountRequestDto } from '@/entities/post/api/increaseViewCountApi/dto';
import { ApiClient } from '@/shared/api';

/**
 * 게시물 조회수 증가
 * @param api ApiClient
 * @param params IncreaseViewCountRequestDto
 * @returns 게시물 조회수 증가
 */
export const increaseViewCountApi = async (api: ApiClient, params: IncreaseViewCountRequestDto) => {
  await api.put(`/post/${params.slug}/view`, { cache: 'no-store' });
};
