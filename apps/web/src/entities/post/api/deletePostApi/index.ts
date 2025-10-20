import { DeletePostRequestDto, DeletePostResponseDto } from '@/entities/post/api/deletePostApi/dto';
import { ApiClient } from '@/shared/api';

export const deletePostApi = async (api: ApiClient, params: DeletePostRequestDto) => {
  const response = await api.del<DeletePostResponseDto>(`/post/${params.slug}`);

  return response.data;
};
