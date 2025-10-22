import { LikePostRequestDto, LikePostResponseDto } from '@/features/likePost/api/likePostApi/dto';
import { ApiClient } from '@/shared/api';

export const likePostApi = async (api: ApiClient, params: LikePostRequestDto) => {
  const response = await api.post<LikePostResponseDto>(`/post/${params.postId}/like`, {
    json: { userId: params.userId },
  });

  return response.data;
};
