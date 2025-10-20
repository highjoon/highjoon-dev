import { CreatePostRequestDto, CreatePostResponseDto } from '@/entities/post/api/createPostApi/dto';
import { ApiClient } from '@/shared/api';

export const createPostApi = async (api: ApiClient, params: CreatePostRequestDto) => {
  const response = await api.post<CreatePostResponseDto>('/post', { json: params });

  return response.data;
};
