import { GetCommentsRequestDto, GetCommentsResponseDto } from '@/entities/comment/api/getCommentsApi/dto';
import { ApiClient } from '@/shared/api';

export const getCommentsApi = async (api: ApiClient, params: GetCommentsRequestDto) => {
  const response = await api.get<GetCommentsResponseDto>(`/comment/${params.postId}`, { cache: 'no-store' });

  return response.data;
};
