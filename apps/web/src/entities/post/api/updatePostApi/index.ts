import { UpdatePostRequestDto, UpdatePostResponseDto } from '@/entities/post/api/updatePostApi/dto';
import { ApiClient } from '@/shared/api';

export const updatePostApi = async (api: ApiClient, params: UpdatePostRequestDto) => {
  const response = await api.put<UpdatePostResponseDto>(`/post/${params.slug}`, { json: { post: params.post } });

  return response.data;
};
