import { UnlikePostRequestDto, UnlikePostResponseDto } from '@/features/likePost/api/unlikePostApi/dto';
import { ApiClient } from '@/shared/api';

export const unlikePostApi = async (api: ApiClient, params: UnlikePostRequestDto) => {
  const response = await api.post<UnlikePostResponseDto>(`/post/${params.postId}/unlike`, {
    json: { userId: params.userId },
  });

  return response.data;
};
