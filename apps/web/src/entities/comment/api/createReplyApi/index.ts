import { CreateReplyRequestDto, CreateReplyResponseDto } from '@/entities/comment/api/createReplyApi/dto';
import { ApiClient } from '@/shared/api';

export const createReplyApi = async (api: ApiClient, params: CreateReplyRequestDto) => {
  const response = await api.post<CreateReplyResponseDto>('/comment/reply', { json: params });

  return response.data;
};
