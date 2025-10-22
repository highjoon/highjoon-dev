import { CreateCommentRequestDto, CreateCommentResponseDto } from '@/features/createComment/api/createCommentApi/dto';
import { ApiClient } from '@/shared/api';

export const createCommentApi = async (api: ApiClient, params: CreateCommentRequestDto) => {
  const response = await api.post<CreateCommentResponseDto>('/comment', { json: params });

  return response.data;
};
