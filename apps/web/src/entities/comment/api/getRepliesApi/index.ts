import { GetRepliesRequestDto, GetRepliesResponseDto } from '@/entities/comment/api/getRepliesApi/dto';
import { ApiClient } from '@/shared/api';

export const getRepliesApi = async (api: ApiClient, params: GetRepliesRequestDto) => {
  const response = await api.get<GetRepliesResponseDto>(`/comment/replies/${params.parentId}`, { cache: 'no-store' });

  return response.data;
};
